<?php

namespace Modules\GitHub\Services;

use Illuminate\Support\Facades\Log;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use League\OAuth2\Client\Provider\GenericProvider;
use League\OAuth2\Client\Token\AccessToken;
use Modules\GitHub\Exceptions\GitHubTokenException;
use Modules\Organisation\Models\Organisation;

/**
 * GitHubOAuthService
 *
 * Handles the OAuth 2.0 flow for connecting to GitHub.
 * Manages authorization URL generation, token exchange, and storage.
 */
class GitHubOAuthService
{
    /**
     * Create a new service instance.
     */
    public function __construct(
        private GitHubTokenService $tokenService
    ) {
    }

    /**
     * Get the authorization URL to initiate OAuth flow.
     *
     * @param Organisation $organisation
     * @param string $state CSRF protection state parameter
     * @return string Authorization URL
     * @throws GitHubTokenException
     */
    public function getAuthorizationUrl(Organisation $organisation, string $state): string
    {
        $provider = $this->getProvider($organisation);

        if (! $provider) {
            throw new GitHubTokenException('GitHub credentials not configured. Please add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to your .env file.');
        }

        $authorizationUrl = $provider->getAuthorizationUrl([
            'scope' => implode(' ', config('github.scopes')),
            'state' => $state,
        ]);

        Log::info('GitHub OAuth: Generated authorization URL', [
            'organisation_id' => $organisation->id,
        ]);

        return $authorizationUrl;
    }

    /**
     * Handle OAuth callback and exchange code for access token.
     *
     * @param Organisation $organisation
     * @param string $code Authorization code from GitHub
     * @return array Token metadata including account info
     * @throws GitHubTokenException
     */
    public function handleCallback(Organisation $organisation, string $code): array
    {
        $provider = $this->getProvider($organisation);

        if (! $provider) {
            throw new GitHubTokenException('GitHub credentials not configured.');
        }

        try {
            // Exchange authorization code for access token
            $accessToken = $provider->getAccessToken('authorization_code', [
                'code' => $code,
            ]);

            // Get GitHub user information
            $accountInfo = $this->getAccountInfo($accessToken->getToken());

            // Prepare token metadata
            $metadata = [
                'token_type' => 'bearer',
                'scope' => $accessToken->getValues()['scope'] ?? implode(',', config('github.scopes')),
                'account_login' => $accountInfo['login'] ?? null,
                'account_type' => $accountInfo['type'] ?? 'User',
            ];

            // Store the token
            $this->tokenService->storeToken(
                $organisation,
                $accessToken->getToken(),
                null, // GitHub OAuth tokens don't have refresh tokens
                $metadata
            );

            Log::info('GitHub OAuth: Connection successful', [
                'organisation_id' => $organisation->id,
                'account_login' => $metadata['account_login'],
                'account_type' => $metadata['account_type'],
            ]);

            return $metadata;

        } catch (IdentityProviderException $e) {
            Log::error('GitHub OAuth: Failed to get access token', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
            ]);

            throw new GitHubTokenException('Failed to connect to GitHub: '.$e->getMessage(), 0, $e);
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

        Log::info('GitHub OAuth: Token revoked', [
            'organisation_id' => $organisation->id,
        ]);

        return $result;
    }

    /**
     * Get account information from GitHub API using access token.
     *
     * @param string $accessToken
     * @return array
     */
    private function getAccountInfo(string $accessToken): array
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->get('https://api.github.com/user', [
                'headers' => [
                    'Authorization' => "Bearer {$accessToken}",
                    'Accept' => 'application/vnd.github.v3+json',
                    'User-Agent' => config('app.name', 'Laravel'),
                ],
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            return [
                'login' => $data['login'] ?? null,
                'type' => $data['type'] ?? 'User',
                'name' => $data['name'] ?? null,
                'email' => $data['email'] ?? null,
                'avatar_url' => $data['avatar_url'] ?? null,
            ];

        } catch (\Exception $e) {
            Log::warning('GitHub OAuth: Failed to get account info', [
                'error' => $e->getMessage(),
            ]);

            return [];
        }
    }

    /**
     * Get the GitHub OAuth provider for an organisation.
     *
     * Creates a new provider instance using the application's GitHub
     * client ID and secret from .env configuration.
     *
     * @param Organisation $organisation
     * @return GenericProvider|null Returns null if credentials not configured
     */
    private function getProvider(Organisation $organisation): ?GenericProvider
    {
        $clientId = config('github.client_id');
        $clientSecret = config('github.client_secret');

        if (! $clientId || ! $clientSecret) {
            Log::warning('GitHub OAuth: Missing credentials in configuration', [
                'organisation_id' => $organisation->id,
            ]);

            return null;
        }

        return new GenericProvider([
            'clientId' => $clientId,
            'clientSecret' => $clientSecret,
            'redirectUri' => config('github.redirect_uri'),
            'urlAuthorize' => 'https://github.com/login/oauth/authorize',
            'urlAccessToken' => 'https://github.com/login/oauth/access_token',
            'urlResourceOwnerDetails' => 'https://api.github.com/user',
        ]);
    }
}
