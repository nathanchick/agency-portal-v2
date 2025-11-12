<?php

namespace Modules\Xero\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use League\OAuth2\Client\Provider\GenericProvider;
use League\OAuth2\Client\Token\AccessToken;
use Modules\Organisation\Models\Organisation;
use Modules\Xero\Exceptions\XeroTokenException;
use Modules\Xero\Models\XeroOAuthToken;
use XeroAPI\XeroPHP\Configuration;

/**
 * XeroTokenService
 *
 * Manages OAuth 2.0 token lifecycle for Xero API authentication.
 * Handles token storage, retrieval, refresh, and validation.
 *
 * Tokens are cached to reduce database queries and stored encrypted in the database.
 *
 * Note: Each organisation has their own Xero app credentials, so the OAuth
 * provider is created dynamically per-organisation rather than injected.
 */
class XeroTokenService
{
    /**
     * Access token cache TTL in minutes (25 minutes, tokens expire after 30).
     */
    private const ACCESS_TOKEN_CACHE_TTL = 25;

    /**
     * Buffer time before token expiry to trigger refresh (in minutes).
     */
    private const TOKEN_EXPIRY_BUFFER = 5;

    /**
     * Get a valid access token for the organisation.
     *
     * This method ensures a valid token is always returned by:
     * 1. Checking the cache first
     * 2. Checking the database
     * 3. Refreshing if expired
     * 4. Throwing exception if refresh fails
     *
     * @throws XeroTokenException
     */
    public function getAccessToken(Organisation $organisation): string
    {
        // Try cache first for performance
        $cacheKey = $this->getCacheKey($organisation);
        $cachedToken = Cache::get($cacheKey);

        if ($cachedToken) {
            return $cachedToken;
        }

        // Get from database
        $tokenRecord = $this->getTokenRecord($organisation);

        if (! $tokenRecord) {
            throw XeroTokenException::noTokensFound($organisation);
        }

        // Check if access token is expired or expiring soon
        if ($tokenRecord->isAccessTokenExpired(self::TOKEN_EXPIRY_BUFFER)) {
            Log::info('Xero access token expired, refreshing', [
                'organisation_id' => $organisation->id,
            ]);

            $tokenRecord = $this->refreshToken($organisation, $tokenRecord);
        }

        // Cache the access token
        $this->cacheAccessToken($organisation, $tokenRecord->access_token);

        return $tokenRecord->access_token;
    }

    /**
     * Refresh the access token using the refresh token.
     *
     * @throws XeroTokenException
     */
    public function refreshToken(Organisation $organisation, ?XeroOAuthToken $tokenRecord = null): XeroOAuthToken
    {
        if (! $tokenRecord) {
            $tokenRecord = $this->getTokenRecord($organisation);
        }

        if (! $tokenRecord) {
            throw XeroTokenException::noTokensFound($organisation);
        }

        if ($tokenRecord->isRefreshTokenExpired()) {
            throw XeroTokenException::refreshTokenExpired($organisation);
        }

        // Get Xero provider for this organisation
        $provider = $this->getProvider($organisation);

        if (! $provider) {
            throw XeroTokenException::noTokensFound($organisation);
        }

        try {
            // Create access token object for refresh
            $existingAccessToken = new AccessToken([
                'access_token' => $tokenRecord->access_token,
                'refresh_token' => $tokenRecord->refresh_token,
                'expires' => $tokenRecord->access_token_expires_at->timestamp,
            ]);

            // Request new tokens from Xero
            $newAccessToken = $provider->getAccessToken('refresh_token', [
                'refresh_token' => $existingAccessToken->getRefreshToken(),
            ]);

            // Store the new tokens
            $this->storeTokens($organisation, $newAccessToken);

            Log::info('Xero access token refreshed successfully', [
                'organisation_id' => $organisation->id,
            ]);

            // Return updated token record
            return $this->getTokenRecord($organisation);

        } catch (IdentityProviderException $e) {
            Log::error('Failed to refresh Xero access token', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
            ]);

            throw XeroTokenException::refreshFailed($organisation, $e);
        }
    }

    /**
     * Store OAuth tokens for an organisation.
     *
     * Creates or updates the token record and invalidates the cache.
     */
    public function storeTokens(Organisation $organisation, AccessToken $accessToken): XeroOAuthToken
    {
        $tokenData = [
            'organisation_id' => $organisation->id,
            'access_token' => $accessToken->getToken(),
            'refresh_token' => $accessToken->getRefreshToken(),
            'access_token_expires_at' => Carbon::createFromTimestamp($accessToken->getExpires()),
            'refresh_token_expires_at' => $this->calculateRefreshTokenExpiry($accessToken),
        ];

        $tokenRecord = XeroOAuthToken::updateOrCreate(
            ['organisation_id' => $organisation->id],
            $tokenData
        );

        // Cache the access token
        $this->cacheAccessToken($organisation, $tokenRecord->access_token);

        Log::info('Xero tokens stored successfully', [
            'organisation_id' => $organisation->id,
            'access_token_expires_at' => $tokenRecord->access_token_expires_at,
        ]);

        return $tokenRecord;
    }

    /**
     * Check if the organisation has valid tokens stored.
     */
    public function hasValidTokens(Organisation $organisation): bool
    {
        $tokenRecord = $this->getTokenRecord($organisation);

        if (! $tokenRecord) {
            return false;
        }

        return $tokenRecord->areTokensValid();
    }

    /**
     * Revoke the tokens for an organisation.
     *
     * Deletes the token record and clears the cache.
     */
    public function revokeTokens(Organisation $organisation): void
    {
        XeroOAuthToken::where('organisation_id', $organisation->id)->delete();

        $this->clearCache($organisation);

        Log::info('Xero tokens revoked', [
            'organisation_id' => $organisation->id,
        ]);
    }

    /**
     * Get the token record from the database.
     */
    private function getTokenRecord(Organisation $organisation): ?XeroOAuthToken
    {
        return XeroOAuthToken::where('organisation_id', $organisation->id)->first();
    }

    /**
     * Cache the access token for performance.
     */
    private function cacheAccessToken(Organisation $organisation, string $accessToken): void
    {
        $cacheKey = $this->getCacheKey($organisation);
        Cache::put($cacheKey, $accessToken, now()->addMinutes(self::ACCESS_TOKEN_CACHE_TTL));
    }

    /**
     * Clear the cached access token.
     */
    private function clearCache(Organisation $organisation): void
    {
        $cacheKey = $this->getCacheKey($organisation);
        Cache::forget($cacheKey);
    }

    /**
     * Get the cache key for an organisation's access token.
     */
    private function getCacheKey(Organisation $organisation): string
    {
        return "xero_access_token_{$organisation->id}";
    }

    /**
     * Calculate when the refresh token expires.
     *
     * Xero refresh tokens expire after 60 days.
     */
    private function calculateRefreshTokenExpiry(AccessToken $accessToken): Carbon
    {
        // Check if the token has refresh_expires_in value
        $refreshExpiresIn = $accessToken->getValues()['refresh_expires_in'] ?? null;

        if ($refreshExpiresIn) {
            return Carbon::now()->addSeconds($refreshExpiresIn);
        }

        // Default to 60 days if not provided
        return Carbon::now()->addDays(60);
    }

    /**
     * Get the Xero API configuration object with a valid access token.
     *
     * @throws XeroTokenException
     */
    public function getConfiguration(Organisation $organisation): Configuration
    {
        $accessToken = $this->getAccessToken($organisation);

        $config = Configuration::getDefaultConfiguration();
        $config->setAccessToken($accessToken);

        return $config;
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
            Log::warning('Xero: Missing credentials for organisation', [
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
