<?php

namespace Modules\GitHub\Services;

use Illuminate\Support\Facades\Cache;
use Modules\GitHub\Exceptions\GitHubTokenException;
use Modules\GitHub\Models\GitHubOAuthToken;
use Modules\Organisation\Models\Organisation;

class GitHubTokenService
{
    /**
     * Cache TTL in minutes (55 minutes to be safe before potential expiration)
     */
    private const CACHE_TTL = 55;

    /**
     * Get access token for an organisation
     *
     * @throws GitHubTokenException
     */
    public function getAccessToken(Organisation $organisation): string
    {
        $cacheKey = $this->getCacheKey($organisation->id);

        return Cache::remember($cacheKey, self::CACHE_TTL * 60, function () use ($organisation) {
            $token = GitHubOAuthToken::where('organisation_id', $organisation->id)->first();

            if (! $token) {
                throw new GitHubTokenException('No GitHub token found for this organisation. Please connect GitHub first.');
            }

            if ($token->isExpired()) {
                throw new GitHubTokenException('GitHub token has expired. Please reconnect GitHub.');
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
        } catch (GitHubTokenException $e) {
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
    public function getToken(Organisation $organisation): ?GitHubOAuthToken
    {
        return GitHubOAuthToken::where('organisation_id', $organisation->id)->first();
    }

    /**
     * Store or update token for an organisation
     */
    public function storeToken(
        Organisation $organisation,
        string $accessToken,
        ?string $refreshToken = null,
        ?array $metadata = []
    ): GitHubOAuthToken {
        $token = GitHubOAuthToken::updateOrCreate(
            ['organisation_id' => $organisation->id],
            [
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
                'token_type' => $metadata['token_type'] ?? 'bearer',
                'scope' => $metadata['scope'] ?? null,
                'access_token_expires_at' => $metadata['expires_at'] ?? null,
                'github_installation_id' => $metadata['installation_id'] ?? null,
                'github_account_login' => $metadata['account_login'] ?? null,
                'github_account_type' => $metadata['account_type'] ?? null,
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
        return "github.token.{$organisationId}";
    }
}
