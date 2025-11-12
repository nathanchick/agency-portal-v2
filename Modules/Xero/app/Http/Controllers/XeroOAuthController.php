<?php

namespace Modules\Xero\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Modules\Organisation\Models\Organisation;
use Modules\Organisation\Models\OrganisationSetting;
use Modules\Xero\Services\XeroTokenService;
use League\OAuth2\Client\Provider\GenericProvider;
use XeroAPI\XeroPHP\Api\IdentityApi;

/**
 * XeroOAuthController
 *
 * Handles the OAuth 2.0 flow for connecting to Xero.
 * Implements PKCE (Proof Key for Code Exchange) for enhanced security.
 *
 * Note: Each organisation has their own Xero app credentials stored in
 * organisation settings (XERO_CLIENT_ID and XERO_CLIENT_SECRET).
 */
class XeroOAuthController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Create a new controller instance.
     */
    public function __construct(
        private XeroTokenService $tokenService
    ) {
    }

    /**
     * Initiate the OAuth connection to Xero.
     *
     * Redirects the user to Xero's authorization page where they can
     * grant the application access to their Xero organisation.
     */
    public function connect(Request $request): RedirectResponse
    {
        $organisation = $this->getCurrentDirectOrganisation();

        // Get Xero provider for this organisation
        $provider = $this->getProvider($organisation);

        if (! $provider) {
            return redirect()->route('dashboard')
                ->with('error', 'Xero credentials not configured. Please add your Xero Client ID and Secret in organisation settings.');
        }

        // Generate state parameter for CSRF protection
        $state = bin2hex(random_bytes(16));

        // Store state in session for verification on callback
        $request->session()->put('xero_oauth_state', $state);
        $request->session()->put('xero_oauth_organisation_id', $organisation->id);

        // Get authorization URL with required scopes
        // Xero requires scopes as space-separated string, not array
        $authorizationUrl = $provider->getAuthorizationUrl([
            'scope' => implode(' ', config('xero.scopes')),
            'state' => $state,
        ]);

        Log::info('Xero OAuth: Initiating connection', [
            'organisation_id' => $organisation->id,
        ]);

        return redirect($authorizationUrl);
    }

    /**
     * Handle the OAuth callback from Xero.
     *
     * This is called after the user authorizes the application.
     * Exchanges the authorization code for access and refresh tokens.
     */
    public function callback(Request $request): RedirectResponse
    {
        // Verify state parameter (CSRF protection)
        $storedState = $request->session()->get('xero_oauth_state');
        $returnedState = $request->query('state');

        if (! $storedState || $storedState !== $returnedState) {
            Log::warning('Xero OAuth: State mismatch detected', [
                'stored_state' => $storedState,
                'returned_state' => $returnedState,
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'OAuth state mismatch. Please try connecting again.');
        }

        // Check for errors from Xero
        if ($request->query('error')) {
            Log::warning('Xero OAuth: Error from Xero', [
                'error' => $request->query('error'),
                'error_description' => $request->query('error_description'),
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'Xero authorization failed: '.$request->query('error_description'));
        }

        // Get the authorization code
        $code = $request->query('code');

        if (! $code) {
            return redirect()->route('dashboard')
                ->with('error', 'No authorization code received from Xero.');
        }

        $organisationId = $request->session()->get('xero_oauth_organisation_id');
        $organisation = Organisation::findOrFail($organisationId);

        // Get Xero provider for this organisation
        $provider = $this->getProvider($organisation);

        if (! $provider) {
            return redirect()->route('dashboard')
                ->with('error', 'Xero credentials not configured.');
        }

        try {
            // Exchange authorization code for access token
            $accessToken = $provider->getAccessToken('authorization_code', [
                'code' => $code,
            ]);

            // Store the tokens
            $this->tokenService->storeTokens($organisation, $accessToken);

            // Get and store the tenant ID (Xero organisation ID)
            $tenantId = $this->getTenantId($accessToken->getToken());

            if ($tenantId) {
                OrganisationSetting::updateOrCreate(
                    [
                        'organisation_id' => $organisation->id,
                        'module' => 'Xero',
                        'key' => 'XERO_TENANT_ID',
                    ],
                    [
                        'value' => $tenantId,
                        'type' => 'text',
                    ]
                );
            }

            // Clear session data
            $request->session()->forget(['xero_oauth_state', 'xero_oauth_organisation_id']);

            Log::info('Xero OAuth: Connection successful', [
                'organisation_id' => $organisation->id,
                'tenant_id' => $tenantId,
            ]);

            return redirect()->route('dashboard')
                ->with('success', 'Successfully connected to Xero!');

        } catch (IdentityProviderException $e) {
            Log::error('Xero OAuth: Failed to get access token', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
            ]);

            return redirect()->route('dashboard')
                ->with('error', 'Failed to connect to Xero: '.$e->getMessage());
        }
    }

    /**
     * Disconnect from Xero by revoking tokens.
     */
    public function disconnect(Request $request): RedirectResponse
    {
        $organisation = $this->getCurrentDirectOrganisation();

        $this->tokenService->revokeTokens($organisation);

        // Also clear the tenant ID from settings
        OrganisationSetting::where('organisation_id', $organisation->id)
            ->where('module', 'Xero')
            ->where('key', 'XERO_TENANT_ID')
            ->delete();

        Log::info('Xero OAuth: Disconnected', [
            'organisation_id' => $organisation->id,
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Disconnected from Xero.');
    }

    /**
     * Get the connection status for the current organisation.
     *
     * Returns information about whether Xero is connected,
     * token expiry, and last sync details.
     */
    public function status(Request $request): Response
    {
        $organisation = $this->getCurrentDirectOrganisation();

        $hasValidTokens = $this->tokenService->hasValidTokens($organisation);

        $tokenData = null;
        if ($hasValidTokens) {
            $tokenRecord = \Modules\Xero\Models\XeroOAuthToken::where('organisation_id', $organisation->id)->first();

            if ($tokenRecord) {
                $tokenData = [
                    'access_token_expires_at' => $tokenRecord->access_token_expires_at->toIso8601String(),
                    'refresh_token_expires_at' => $tokenRecord->refresh_token_expires_at->toIso8601String(),
                    'days_until_refresh_expires' => $tokenRecord->refresh_token_expires_at->diffInDays(now()),
                ];
            }
        }

        // Get last sync log
        $lastSync = \Modules\Xero\Models\XeroSyncLog::where('organisation_id', $organisation->id)
            ->orderBy('started_at', 'desc')
            ->first();

        return Inertia::render('xero/status', [
            'connected' => $hasValidTokens,
            'tokenData' => $tokenData,
            'lastSync' => $lastSync ? [
                'sync_type' => $lastSync->sync_type,
                'status' => $lastSync->status,
                'started_at' => $lastSync->started_at->toIso8601String(),
                'records_processed' => $lastSync->records_processed,
            ] : null,
        ]);
    }

    /**
     * Get the Xero tenant ID from the access token.
     *
     * Makes a call to the Identity API to get the list of tenant connections,
     * and returns the first tenant ID (most organisations only have one).
     */
    private function getTenantId(string $accessToken): ?string
    {
        try {
            $config = \XeroAPI\XeroPHP\Configuration::getDefaultConfiguration();
            $config->setAccessToken($accessToken);

            $identityApi = new IdentityApi(null, $config);
            $connections = $identityApi->getConnections();

            if (empty($connections)) {
                return null;
            }

            // Return the first tenant ID (most users only have one)
            return $connections[0]->getTenantId();

        } catch (\Exception $e) {
            Log::error('Failed to get Xero tenant ID', [
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Get the Xero OAuth provider for an organisation.
     *
     * Creates a new provider instance using the organisation's stored
     * client ID and secret from organisation settings.
     *
     * @param  Organisation  $organisation
     * @return GenericProvider|null Returns null if credentials not configured
     */
    private function getProvider(Organisation $organisation): ?GenericProvider
    {
        $clientId = $organisation->settings()
            ->where('module', 'Xero')
            ->where('key', 'XERO_CLIENT_ID')
            ->first()?->value;

        $clientSecret = $organisation->settings()
            ->where('module', 'Xero')
            ->where('key', 'XERO_CLIENT_SECRET')
            ->first()?->value;

        if (! $clientId || ! $clientSecret) {
            Log::warning('Xero OAuth: Missing credentials for organisation', [
                'organisation_id' => $organisation->id,
            ]);

            return null;
        }

        return new GenericProvider([
            'clientId' => $clientId,
            'clientSecret' => $clientSecret,
            'redirectUri' => config('xero.redirect_uri'),
            'urlAuthorize' => 'https://login.xero.com/identity/connect/authorize',
            'urlAccessToken' => 'https://identity.xero.com/connect/token',
            'urlResourceOwnerDetails' => 'https://api.xero.com/api.xro/2.0/Organisation',
        ]);
    }
}
