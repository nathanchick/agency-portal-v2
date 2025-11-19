<?php

namespace Modules\ClickUp\Services;

use Illuminate\Support\Facades\Log;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use League\OAuth2\Client\Provider\GenericProvider;
use League\OAuth2\Client\Token\AccessToken;
use Modules\ClickUp\Exceptions\ClickUpTokenException;
use Modules\Organisation\Models\Organisation;

/**
 * ClickUpOAuthService
 *
 * Handles the OAuth 2.0 flow for connecting to ClickUp.
 * Manages authorization URL generation, token exchange, and storage.
 */
class ClickUpOAuthService
{
    /**
     * Create a new service instance.
     */
    public function __construct(
        private ClickUpTokenService $tokenService
    ) {
    }

    /**
     * Get the authorization URL to initiate OAuth flow.
     *
     * @param Organisation $organisation
     * @param string $state CSRF protection state parameter
     * @return string Authorization URL
     * @throws ClickUpTokenException
     */
    public function getAuthorizationUrl(Organisation $organisation, string $state): string
    {
        $provider = $this->getProvider($organisation);

        if (! $provider) {
            throw new ClickUpTokenException('ClickUp credentials not configured. Please add CLICKUP_CLIENT_ID and CLICKUP_CLIENT_SECRET to your .env file.');
        }

        $authorizationUrl = $provider->getAuthorizationUrl([
            'state' => $state,
        ]);

        Log::info('ClickUp OAuth: Generated authorization URL', [
            'organisation_id' => $organisation->id,
        ]);

        return $authorizationUrl;
    }

    /**
     * Handle OAuth callback and exchange code for access token.
     *
     * @param Organisation $organisation
     * @param string $code Authorization code from ClickUp
     * @return array Token metadata including account info
     * @throws ClickUpTokenException
     */
    public function handleCallback(Organisation $organisation, string $code): array
    {
        $provider = $this->getProvider($organisation);

        if (! $provider) {
            throw new ClickUpTokenException('ClickUp credentials not configured.');
        }

        try {
            // Exchange authorization code for access token
            $accessToken = $provider->getAccessToken('authorization_code', [
                'code' => $code,
            ]);

            // Get ClickUp user/team information
            $accountInfo = $this->getAuthorizedTeams($accessToken->getToken());

            // Extract primary team info
            $primaryTeam = $accountInfo['teams'][0] ?? null;

            // Prepare token metadata
            $metadata = [
                'token_type' => 'Bearer',
                'scope' => null, // ClickUp doesn't use scopes in the same way
                'team_id' => $primaryTeam['id'] ?? null,
                'team_name' => $primaryTeam['name'] ?? null,
                'account_email' => $accountInfo['user']['email'] ?? null,
            ];

            // Store the token
            $this->tokenService->storeToken(
                $organisation,
                $accessToken->getToken(),
                null, // ClickUp OAuth tokens don't have refresh tokens currently
                $metadata
            );

            Log::info('ClickUp OAuth: Connection successful', [
                'organisation_id' => $organisation->id,
                'team_id' => $metadata['team_id'],
                'team_name' => $metadata['team_name'],
            ]);

            return $metadata;

        } catch (IdentityProviderException $e) {
            Log::error('ClickUp OAuth: Failed to get access token', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
            ]);

            throw new ClickUpTokenException('Failed to connect to ClickUp: '.$e->getMessage(), 0, $e);
        }
    }

    /**
     * Revoke OAuth token for an organisation.
     *
     * @param Organisation $organisation
     * @return bool
     */
    public function revokeToken(Organisation $organisation): bool
    {
        $result = $this->tokenService->revokeToken($organisation);

        Log::info('ClickUp OAuth: Token revoked', [
            'organisation_id' => $organisation->id,
        ]);

        return $result;
    }

    /**
     * Get authorized teams from ClickUp API using access token.
     *
     * @param string $accessToken
     * @return array
     */
    public function getAuthorizedTeams(string $accessToken): array
    {
        try {
            $client = new \GuzzleHttp\Client();

            // Get user info
            $userResponse = $client->get(config('clickup.api_url').'/user', [
                'headers' => [
                    'Authorization' => $accessToken,
                    'Content-Type' => 'application/json',
                ],
            ]);

            $userData = json_decode($userResponse->getBody()->getContents(), true);

            // Get teams
            $teamsResponse = $client->get(config('clickup.api_url').'/team', [
                'headers' => [
                    'Authorization' => $accessToken,
                    'Content-Type' => 'application/json',
                ],
            ]);

            $teamsData = json_decode($teamsResponse->getBody()->getContents(), true);

            return [
                'user' => $userData['user'] ?? [],
                'teams' => $teamsData['teams'] ?? [],
            ];

        } catch (\Exception $e) {
            Log::warning('ClickUp OAuth: Failed to get authorized teams', [
                'error' => $e->getMessage(),
            ]);

            return [
                'user' => [],
                'teams' => [],
            ];
        }
    }

    /**
     * Get the ClickUp OAuth provider for an organisation.
     *
     * Creates a new provider instance using the application's ClickUp
     * client ID and secret from .env configuration.
     *
     * @param Organisation $organisation
     * @return GenericProvider|null Returns null if credentials not configured
     */
    private function getProvider(Organisation $organisation): ?GenericProvider
    {
        $clientId = config('clickup.client_id');
        $clientSecret = config('clickup.client_secret');

        if (! $clientId || ! $clientSecret) {
            Log::warning('ClickUp OAuth: Missing credentials in configuration', [
                'organisation_id' => $organisation->id,
            ]);

            return null;
        }

        return new GenericProvider([
            'clientId' => $clientId,
            'clientSecret' => $clientSecret,
            'redirectUri' => config('clickup.redirect_uri'),
            'urlAuthorize' => config('clickup.authorize_url'),
            'urlAccessToken' => config('clickup.token_url'),
            'urlResourceOwnerDetails' => config('clickup.api_url').'/user',
        ]);
    }
}
