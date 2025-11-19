<?php

namespace Modules\ClickUp\Services;

use Illuminate\Support\Facades\Cache;
use Modules\ClickUp\Exceptions\ClickUpTokenException;
use Modules\ClickUp\Models\ClickUpOAuthToken;
use Modules\Organisation\Models\Organisation;

class ClickUpTokenService
{
    /**
     * Cache TTL in minutes (55 minutes to be safe)
     */
    private const CACHE_TTL = 55;

    /**
     * Get access token for an organisation
     *
     * @throws ClickUpTokenException
     */
    public function getAccessToken(Organisation $organisation): string
    {
        $cacheKey = $this->getCacheKey($organisation->id);

        return Cache::remember($cacheKey, self::CACHE_TTL * 60, function () use ($organisation) {
            $token = ClickUpOAuthToken::where('organisation_id', $organisation->id)->first();

            if (! $token) {
                throw new ClickUpTokenException('No ClickUp token found for this organisation. Please connect ClickUp first.');
            }

            if ($token->isExpired()) {
                throw new ClickUpTokenException('ClickUp token has expired. Please reconnect ClickUp.');
            }

            return $token->access_token;
        });
    }

    /**
     * Check if token exists and is valid for an organisation
     */
    public function isTokenValid(Organisation $organisation): bool
    {
        try {
            $this->getAccessToken($organisation);

            return true;
        } catch (ClickUpTokenException $e) {
            return false;
        }
    }

    /**
     * Clear cached token for an organisation
     */
    public function clearCache(Organisation $organisation): void
    {
        $cacheKey = $this->getCacheKey($organisation->id);
        Cache::forget($cacheKey);
    }

    /**
     * Get the token model for an organisation
     */
    public function getToken(Organisation $organisation): ?ClickUpOAuthToken
    {
        return ClickUpOAuthToken::where('organisation_id', $organisation->id)->first();
    }

    /**
     * Store or update token for an organisation
     */
    public function storeToken(
        Organisation $organisation,
        string $accessToken,
        ?string $refreshToken = null,
        ?array $metadata = []
    ): ClickUpOAuthToken {
        $token = ClickUpOAuthToken::updateOrCreate(
            ['organisation_id' => $organisation->id],
            [
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
                'token_type' => $metadata['token_type'] ?? 'Bearer',
                'scope' => $metadata['scope'] ?? null,
                'access_token_expires_at' => $metadata['expires_at'] ?? null,
                'clickup_team_id' => $metadata['team_id'] ?? null,
                'clickup_team_name' => $metadata['team_name'] ?? null,
                'clickup_account_email' => $metadata['account_email'] ?? null,
            ]
        );

        $this->clearCache($organisation);

        return $token;
    }

    /**
     * Revoke token for an organisation
     */
    public function revokeToken(Organisation $organisation): bool
    {
        $token = $this->getToken($organisation);

        if ($token) {
            $token->delete();
            $this->clearCache($organisation);

            return true;
        }

        return false;
    }

    /**
     * Get cache key for organisation token
     */
    private function getCacheKey(string $organisationId): string
    {
        return "clickup.token.{$organisationId}";
    }
}
