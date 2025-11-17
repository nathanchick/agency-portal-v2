<?php

namespace Modules\GitHub\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Modules\GitHub\Exceptions\GitHubTokenException;
use Modules\GitHub\Services\GitHubOAuthService;
use Modules\GitHub\Services\GitHubTokenService;

/**
 * GitHubOAuthController
 *
 * Handles the OAuth 2.0 flow for connecting to GitHub.
 */
class GitHubOAuthController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Create a new controller instance.
     */
    public function __construct(
        private GitHubOAuthService $oauthService,
        private GitHubTokenService $tokenService
    ) {
    }

    /**
     * Initiate the OAuth connection to GitHub.
     *
     * Redirects the user to GitHub's authorization page where they can
     * grant the application access to their repositories.
     */
    public function connect(Request $request): RedirectResponse
    {
        try {
            $organisation = $this->getCurrentDirectOrganisation();

            // Generate state parameter for CSRF protection
            $state = bin2hex(random_bytes(16));

            // Store state in session for verification on callback
            $request->session()->put('github_oauth_state', $state);
            $request->session()->put('github_oauth_organisation_id', $organisation->id);

            // Get authorization URL
            $authorizationUrl = $this->oauthService->getAuthorizationUrl($organisation, $state);

            Log::info('GitHub OAuth: Initiating connection', [
                'organisation_id' => $organisation->id,
            ]);

            return redirect($authorizationUrl);

        } catch (GitHubTokenException $e) {
            Log::error('GitHub OAuth: Failed to initiate connection', [
                'error' => $e->getMessage(),
            ]);

            return redirect()->route('dashboard')
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Handle the OAuth callback from GitHub.
     *
     * This is called after the user authorizes the application.
     * Exchanges the authorization code for access token.
     */
    public function callback(Request $request): RedirectResponse
    {
        // Verify state parameter (CSRF protection)
        $storedState = $request->session()->get('github_oauth_state');
        $returnedState = $request->query('state');

        if (! $storedState || $storedState !== $returnedState) {
            Log::warning('GitHub OAuth: State mismatch detected', [
                'stored_state' => $storedState,
                'returned_state' => $returnedState,
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'OAuth state mismatch. Please try connecting again.');
        }

        // Check for errors from GitHub
        if ($request->query('error')) {
            Log::warning('GitHub OAuth: Error from GitHub', [
                'error' => $request->query('error'),
                'error_description' => $request->query('error_description'),
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'GitHub authorization failed: '.$request->query('error_description'));
        }

        // Get the authorization code
        $code = $request->query('code');

        if (! $code) {
            return redirect()->route('dashboard')
                ->with('error', 'No authorization code received from GitHub.');
        }

        try {
            $organisationId = $request->session()->get('github_oauth_organisation_id');
            $organisation = \Modules\Organisation\Models\Organisation::findOrFail($organisationId);

            // Exchange code for access token and store it
            $metadata = $this->oauthService->handleCallback($organisation, $code);

            // Clear session data
            $request->session()->forget(['github_oauth_state', 'github_oauth_organisation_id']);

            Log::info('GitHub OAuth: Connection successful', [
                'organisation_id' => $organisation->id,
                'account_login' => $metadata['account_login'],
            ]);

            return redirect()->route('dashboard')
                ->with('success', 'Successfully connected to GitHub as '.$metadata['account_login'].'!');

        } catch (GitHubTokenException $e) {
            Log::error('GitHub OAuth: Failed to complete connection', [
                'error' => $e->getMessage(),
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'Failed to connect to GitHub: '.$e->getMessage());
        }
    }

    /**
     * Disconnect from GitHub by revoking the token.
     */
    public function disconnect(Request $request): RedirectResponse
    {
        try {
            $organisation = $this->getCurrentDirectOrganisation();

            $this->oauthService->revokeToken($organisation);

            Log::info('GitHub OAuth: Disconnected', [
                'organisation_id' => $organisation->id,
            ]);

            return redirect()->route('dashboard')
                ->with('success', 'Disconnected from GitHub.');

        } catch (\Exception $e) {
            Log::error('GitHub OAuth: Failed to disconnect', [
                'error' => $e->getMessage(),
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'Failed to disconnect: '.$e->getMessage());
        }
    }
}
