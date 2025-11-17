<?php

namespace Modules\GitHub\Services;

use Github\Client as GitHubClient;
use Github\Exception\RuntimeException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Modules\GitHub\Exceptions\GitHubApiException;
use Modules\GitHub\Models\GitHubSyncLog;
use Modules\Organisation\Models\Organisation;

/**
 * GitHubApiService
 *
 * Wrapper around KnpLabs GitHub API client.
 * Implements rate limiting, caching, and error handling.
 *
 * Rate Limits (GitHub.com):
 * - 5,000 requests per hour for authenticated users
 * - 60 requests per hour for unauthenticated users
 */
class GitHubApiService
{
    /**
     * Rate limit: calls per hour for authenticated requests.
     */
    private const RATE_LIMIT_PER_HOUR = 5000;

    /**
     * Cache TTL for repository list (15 minutes).
     */
    private const CACHE_REPO_LIST_TTL = 900;

    /**
     * Cache TTL for repository metadata (1 hour).
     */
    private const CACHE_REPO_METADATA_TTL = 3600;

    /**
     * Create a new service instance.
     */
    public function __construct(
        private GitHubTokenService $tokenService
    ) {
    }

    /**
     * List all accessible repositories for the authenticated user.
     *
     * @param Organisation $organisation
     * @param bool $forceRefresh Force refresh from API (bypass cache)
     * @return array Array of repository data
     * @throws GitHubApiException
     */
    public function listRepositories(Organisation $organisation, bool $forceRefresh = false): array
    {
        $cacheKey = "github.org.{$organisation->id}.repos";

        if ($forceRefresh) {
            Cache::forget($cacheKey);
        }

        return Cache::remember($cacheKey, self::CACHE_REPO_LIST_TTL, function () use ($organisation) {
            $this->checkRateLimit($organisation);

            try {
                $client = $this->getClient($organisation);

                // Get all repositories using ResultPager for proper pagination
                // This includes owner, organization member, and collaborator repos
                $paginator = new \Github\ResultPager($client);
                $api = $client->api('current_user');

                // Fetch all repos with affiliation: owner, collaborator, organization_member
                $repos = $paginator->fetchAll($api, 'repositories', ['owner,collaborator,organization_member']);

                $this->recordApiCall($organisation, 'list_repositories');

                Log::debug('GitHub API: Fetched repositories', [
                    'organisation_id' => $organisation->id,
                    'count' => count($repos),
                ]);

                return $repos;

            } catch (RuntimeException $e) {
                Log::error('GitHub API: Failed to fetch repositories', [
                    'organisation_id' => $organisation->id,
                    'error' => $e->getMessage(),
                    'code' => $e->getCode(),
                ]);

                throw GitHubApiException::requestFailed($organisation, 'GET /user/repos', $e);
            }
        });
    }

    /**
     * Get a single repository by owner and name.
     *
     * @param Organisation $organisation
     * @param string $owner Repository owner (user or organization)
     * @param string $name Repository name
     * @return array Repository data
     * @throws GitHubApiException
     */
    public function getRepository(Organisation $organisation, string $owner, string $name): array
    {
        $cacheKey = "github.repo.{$owner}.{$name}.metadata";

        return Cache::remember($cacheKey, self::CACHE_REPO_METADATA_TTL, function () use ($organisation, $owner, $name) {
            $this->checkRateLimit($organisation);

            try {
                $client = $this->getClient($organisation);
                $repo = $client->api('repo')->show($owner, $name);

                $this->recordApiCall($organisation, 'get_repository');

                Log::debug('GitHub API: Fetched repository', [
                    'organisation_id' => $organisation->id,
                    'repo' => "{$owner}/{$name}",
                ]);

                return $repo;

            } catch (RuntimeException $e) {
                Log::error('GitHub API: Failed to fetch repository', [
                    'organisation_id' => $organisation->id,
                    'repo' => "{$owner}/{$name}",
                    'error' => $e->getMessage(),
                ]);

                throw GitHubApiException::requestFailed($organisation, "GET /repos/{$owner}/{$name}", $e);
            }
        });
    }

    /**
     * Get repository by GitHub ID.
     *
     * @param Organisation $organisation
     * @param int $githubRepoId
     * @return array|null
     * @throws GitHubApiException
     */
    public function getRepositoryById(Organisation $organisation, int $githubRepoId): ?array
    {
        $this->checkRateLimit($organisation);

        try {
            $client = $this->getClient($organisation);

            // GitHub API v3 doesn't have a direct endpoint to get repo by ID
            // We need to get all repos and find the matching one
            $repos = $this->listRepositories($organisation);

            foreach ($repos as $repo) {
                if ($repo['id'] === $githubRepoId) {
                    return $repo;
                }
            }

            return null;

        } catch (RuntimeException $e) {
            Log::error('GitHub API: Failed to fetch repository by ID', [
                'organisation_id' => $organisation->id,
                'github_repo_id' => $githubRepoId,
                'error' => $e->getMessage(),
            ]);

            throw GitHubApiException::requestFailed($organisation, "GET repository by ID {$githubRepoId}", $e);
        }
    }

    /**
     * Get current rate limit information.
     *
     * @param Organisation $organisation
     * @return array Rate limit information
     * @throws GitHubApiException
     */
    public function getRateLimit(Organisation $organisation): array
    {
        try {
            $client = $this->getClient($organisation);
            $rateLimit = $client->api('rate_limit')->getRateLimits();

            return [
                'limit' => $rateLimit['resources']['core']['limit'] ?? 0,
                'remaining' => $rateLimit['resources']['core']['remaining'] ?? 0,
                'reset_at' => $rateLimit['resources']['core']['reset'] ?? null,
                'used' => ($rateLimit['resources']['core']['limit'] ?? 0) - ($rateLimit['resources']['core']['remaining'] ?? 0),
            ];

        } catch (RuntimeException $e) {
            Log::error('GitHub API: Failed to fetch rate limit', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
            ]);

            throw GitHubApiException::requestFailed($organisation, 'GET /rate_limit', $e);
        }
    }

    /**
     * Clear cached data for an organisation.
     *
     * @param Organisation $organisation
     * @param string|null $cacheType Specific cache to clear (repos, metadata) or null for all
     */
    public function clearCache(Organisation $organisation, ?string $cacheType = null): void
    {
        if ($cacheType === 'repos' || $cacheType === null) {
            Cache::forget("github.org.{$organisation->id}.repos");
        }

        // Clear all repository metadata cache if requested
        if ($cacheType === 'metadata' || $cacheType === null) {
            // This would require tracking all cached repos, which is complex
            // For now, just log it - specific repo caches will expire naturally
            Log::debug('GitHub API: Metadata cache clear requested', [
                'organisation_id' => $organisation->id,
            ]);
        }
    }

    /**
     * Get authenticated GitHub client for an organisation.
     *
     * @param Organisation $organisation
     * @return GitHubClient
     * @throws GitHubApiException
     */
    private function getClient(Organisation $organisation): GitHubClient
    {
        try {
            $accessToken = $this->tokenService->getAccessToken($organisation);

            $client = new GitHubClient();
            $client->authenticate($accessToken, null, GitHubClient::AUTH_ACCESS_TOKEN);

            return $client;

        } catch (\Exception $e) {
            Log::error('GitHub API: Failed to create authenticated client', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
            ]);

            throw new GitHubApiException('Failed to authenticate with GitHub: '.$e->getMessage(), 0, $e);
        }
    }

    /**
     * Check if rate limit allows making another API call.
     *
     * @param Organisation $organisation
     * @throws GitHubApiException
     */
    private function checkRateLimit(Organisation $organisation): void
    {
        $cacheKey = "github.org.{$organisation->id}.api_calls";
        $currentCount = Cache::get($cacheKey, 0);

        // Simple check: if we've made more than 80% of allowed calls, warn
        if ($currentCount > (self::RATE_LIMIT_PER_HOUR * 0.8)) {
            Log::warning('GitHub API: Approaching rate limit', [
                'organisation_id' => $organisation->id,
                'calls_made' => $currentCount,
                'limit' => self::RATE_LIMIT_PER_HOUR,
            ]);
        }

        // Don't block calls, just log - GitHub API will return 403 if limit exceeded
        // and we'll handle that in the catch block
    }

    /**
     * Record an API call for rate limiting tracking.
     *
     * @param Organisation $organisation
     * @param string $endpoint
     */
    private function recordApiCall(Organisation $organisation, string $endpoint): void
    {
        $cacheKey = "github.org.{$organisation->id}.api_calls";

        // Increment counter with 1-hour TTL
        $currentCount = Cache::get($cacheKey, 0);
        Cache::put($cacheKey, $currentCount + 1, 3600);

        Log::debug('GitHub API: Call recorded', [
            'organisation_id' => $organisation->id,
            'endpoint' => $endpoint,
            'total_calls' => $currentCount + 1,
        ]);
    }
}
