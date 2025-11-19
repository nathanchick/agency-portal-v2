<?php

namespace Modules\ClickUp\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Modules\ClickUp\Exceptions\ClickUpTokenException;
use Modules\ClickUp\Jobs\SyncClickUpSpaces;
use Modules\ClickUp\Services\ClickUpOAuthService;
use Modules\ClickUp\Services\ClickUpTokenService;

/**
 * ClickUpOAuthController
 *
 * Handles the OAuth 2.0 flow for connecting to ClickUp.
 */
class ClickUpOAuthController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Create a new controller instance.
     */
    public function __construct(
        private ClickUpOAuthService $oauthService,
        private ClickUpTokenService $tokenService
    ) {
    }

    /**
     * Initiate the OAuth connection to ClickUp.
     *
     * Redirects the user to ClickUp's authorization page where they can
     * grant the application access to their workspace.
     */
    public function connect(Request $request): RedirectResponse
    {
        try {
            $organisation = $this->getCurrentDirectOrganisation();

            // Generate state parameter for CSRF protection
            $state = bin2hex(random_bytes(16));

            // Store state in session for verification on callback
            $request->session()->put('clickup_oauth_state', $state);
            $request->session()->put('clickup_oauth_organisation_id', $organisation->id);

            // Get authorization URL
            $authorizationUrl = $this->oauthService->getAuthorizationUrl($organisation, $state);

            Log::info('ClickUp OAuth: Initiating connection', [
                'organisation_id' => $organisation->id,
            ]);

            return redirect($authorizationUrl);

        } catch (ClickUpTokenException $e) {
            Log::error('ClickUp OAuth: Failed to initiate connection', [
                'error' => $e->getMessage(),
            ]);

            return redirect()->route('dashboard')
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Handle the OAuth callback from ClickUp.
     *
     * This is called after the user authorizes the application.
     * Exchanges the authorization code for access token.
     */
    public function callback(Request $request): RedirectResponse
    {
        // Verify state parameter (CSRF protection)
        $storedState = $request->session()->get('clickup_oauth_state');
        $returnedState = $request->query('state');

        if (! $storedState || $storedState !== $returnedState) {
            Log::warning('ClickUp OAuth: State mismatch detected', [
                'stored_state' => $storedState,
                'returned_state' => $returnedState,
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'OAuth state mismatch. Please try connecting again.');
        }

        // Check for errors from ClickUp
        if ($request->query('error')) {
            Log::warning('ClickUp OAuth: Error from ClickUp', [
                'error' => $request->query('error'),
                'error_description' => $request->query('error_description'),
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'ClickUp authorization failed: '.$request->query('error_description'));
        }

        // Get the authorization code
        $code = $request->query('code');

        if (! $code) {
            return redirect()->route('dashboard')
                ->with('error', 'No authorization code received from ClickUp.');
        }

        try {
            $organisationId = $request->session()->get('clickup_oauth_organisation_id');
            $organisation = \Modules\Organisation\Models\Organisation::findOrFail($organisationId);

            // Exchange code for access token and store it
            $metadata = $this->oauthService->handleCallback($organisation, $code);

            // Clear session data
            $request->session()->forget(['clickup_oauth_state', 'clickup_oauth_organisation_id']);

            // Dispatch background job to sync spaces
            SyncClickUpSpaces::dispatch($organisation);

            Log::info('ClickUp OAuth: Connection successful', [
                'organisation_id' => $organisation->id,
                'team_name' => $metadata['team_name'],
            ]);

            return redirect()->route('dashboard')
                ->with('success', 'Successfully connected to ClickUp workspace: '.$metadata['team_name'].'!');

        } catch (ClickUpTokenException $e) {
            Log::error('ClickUp OAuth: Failed to complete connection', [
                'error' => $e->getMessage(),
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'Failed to connect to ClickUp: '.$e->getMessage());
        }
    }

    /**
     * Disconnect from ClickUp by revoking the token.
     */
    public function disconnect(Request $request): RedirectResponse
    {
        try {
            $organisation = $this->getCurrentDirectOrganisation();

            $this->oauthService->revokeToken($organisation);

            Log::info('ClickUp OAuth: Disconnected', [
                'organisation_id' => $organisation->id,
            ]);

            return redirect()->route('dashboard')
                ->with('success', 'Disconnected from ClickUp.');

        } catch (\Exception $e) {
            Log::error('ClickUp OAuth: Failed to disconnect', [
                'error' => $e->getMessage(),
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'Failed to disconnect: '.$e->getMessage());
        }
    }
}
