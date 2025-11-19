<?php

namespace Modules\ClickUp\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Modules\ClickUp\Exceptions\ClickUpApiException;
use Modules\ClickUp\Exceptions\ClickUpRateLimitException;
use Modules\Organisation\Models\Organisation;

/**
 * ClickUpApiService
 *
 * Wrapper around ClickUp API v2.
 * Implements rate limiting, caching, and error handling.
 *
 * Rate Limits (ClickUp):
 * - 100 requests per minute (Free/Unlimited/Business)
 * - 1,000 requests per minute (Business Plus)
 * - 10,000 requests per minute (Enterprise)
 */
class ClickUpApiService
{
    /**
     * Create a new service instance.
     */
    public function __construct(
        private ClickUpTokenService $tokenService
    ) {
    }

    /**
     * Get authorized teams/workspaces for the organisation.
     *
     * @param Organisation $organisation
     * @param bool $forceRefresh Force refresh from API (bypass cache)
     * @return array
     * @throws ClickUpApiException
     */
    public function getTeams(Organisation $organisation, bool $forceRefresh = false): array
    {
        $cacheKey = "clickup.org.{$organisation->id}.teams";
        $cacheTtl = config('clickup.cache_ttl.teams');

        if ($forceRefresh) {
            Cache::forget($cacheKey);
        }

        return Cache::remember($cacheKey, $cacheTtl, function () use ($organisation) {
            try {
                $response = $this->makeRequest($organisation, 'GET', '/team');

                Log::debug('ClickUp API: Fetched teams', [
                    'organisation_id' => $organisation->id,
                    'count' => count($response['teams'] ?? []),
                ]);

                return $response['teams'] ?? [];

            } catch (GuzzleException $e) {
                throw new ClickUpApiException(
                    'Failed to fetch ClickUp teams: '.$e->getMessage(),
                    $e->getCode(),
                    $e,
                    ['organisation_id' => $organisation->id]
                );
            }
        });
    }

    /**
     * Get spaces for a specific team/workspace.
     *
     * @param Organisation $organisation
     * @param string $teamId
     * @param bool $forceRefresh
     * @return array
     * @throws ClickUpApiException
     */
    public function getSpaces(Organisation $organisation, string $teamId, bool $forceRefresh = false): array
    {
        $cacheKey = "clickup.org.{$organisation->id}.team.{$teamId}.spaces";
        $cacheTtl = config('clickup.cache_ttl.spaces');

        if ($forceRefresh) {
            Cache::forget($cacheKey);
        }

        return Cache::remember($cacheKey, $cacheTtl, function () use ($organisation, $teamId) {
            try {
                $response = $this->makeRequest($organisation, 'GET', "/team/{$teamId}/space");

                Log::debug('ClickUp API: Fetched spaces', [
                    'organisation_id' => $organisation->id,
                    'team_id' => $teamId,
                    'count' => count($response['spaces'] ?? []),
                ]);

                return $response['spaces'] ?? [];

            } catch (GuzzleException $e) {
                throw new ClickUpApiException(
                    'Failed to fetch ClickUp spaces: '.$e->getMessage(),
                    $e->getCode(),
                    $e,
                    ['organisation_id' => $organisation->id, 'team_id' => $teamId]
                );
            }
        });
    }

    /**
     * Get a single space by ID.
     *
     * @param Organisation $organisation
     * @param string $spaceId
     * @return array
     * @throws ClickUpApiException
     */
    public function getSpace(Organisation $organisation, string $spaceId): array
    {
        $cacheKey = "clickup.space.{$spaceId}";
        $cacheTtl = config('clickup.cache_ttl.spaces');

        return Cache::remember($cacheKey, $cacheTtl, function () use ($organisation, $spaceId) {
            try {
                $response = $this->makeRequest($organisation, 'GET', "/space/{$spaceId}");

                return $response;

            } catch (GuzzleException $e) {
                throw new ClickUpApiException(
                    'Failed to fetch ClickUp space: '.$e->getMessage(),
                    $e->getCode(),
                    $e,
                    ['organisation_id' => $organisation->id, 'space_id' => $spaceId]
                );
            }
        });
    }

    /**
     * Get folders in a space.
     *
     * @param Organisation $organisation
     * @param string $spaceId
     * @return array
     * @throws ClickUpApiException
     */
    public function getFolders(Organisation $organisation, string $spaceId): array
    {
        $cacheKey = "clickup.space.{$spaceId}.folders";
        $cacheTtl = config('clickup.cache_ttl.folders');

        return Cache::remember($cacheKey, $cacheTtl, function () use ($organisation, $spaceId) {
            try {
                $response = $this->makeRequest($organisation, 'GET', "/space/{$spaceId}/folder");

                return $response['folders'] ?? [];

            } catch (GuzzleException $e) {
                throw new ClickUpApiException(
                    'Failed to fetch ClickUp folders: '.$e->getMessage(),
                    $e->getCode(),
                    $e,
                    ['organisation_id' => $organisation->id, 'space_id' => $spaceId]
                );
            }
        });
    }

    /**
     * Get lists in a folder.
     *
     * @param Organisation $organisation
     * @param string $folderId
     * @return array
     * @throws ClickUpApiException
     */
    public function getLists(Organisation $organisation, string $folderId): array
    {
        $cacheKey = "clickup.folder.{$folderId}.lists";
        $cacheTtl = config('clickup.cache_ttl.lists');

        return Cache::remember($cacheKey, $cacheTtl, function () use ($organisation, $folderId) {
            try {
                $response = $this->makeRequest($organisation, 'GET', "/folder/{$folderId}/list");

                return $response['lists'] ?? [];

            } catch (GuzzleException $e) {
                throw new ClickUpApiException(
                    'Failed to fetch ClickUp lists: '.$e->getMessage(),
                    $e->getCode(),
                    $e,
                    ['organisation_id' => $organisation->id, 'folder_id' => $folderId]
                );
            }
        });
    }

    /**
     * Get lists in a space (folderless).
     *
     * @param Organisation $organisation
     * @param string $spaceId
     * @return array
     * @throws ClickUpApiException
     */
    public function getFolderlessLists(Organisation $organisation, string $spaceId): array
    {
        $cacheKey = "clickup.space.{$spaceId}.folderless_lists";
        $cacheTtl = config('clickup.cache_ttl.lists');

        return Cache::remember($cacheKey, $cacheTtl, function () use ($organisation, $spaceId) {
            try {
                $response = $this->makeRequest($organisation, 'GET', "/space/{$spaceId}/list");

                return $response['lists'] ?? [];

            } catch (GuzzleException $e) {
                throw new ClickUpApiException(
                    'Failed to fetch folderless lists: '.$e->getMessage(),
                    $e->getCode(),
                    $e,
                    ['organisation_id' => $organisation->id, 'space_id' => $spaceId]
                );
            }
        });
    }

    /**
     * Get a single list by ID.
     *
     * @param Organisation $organisation
     * @param string $listId
     * @return array
     * @throws ClickUpApiException
     */
    public function getList(Organisation $organisation, string $listId): array
    {
        $cacheKey = "clickup.list.{$listId}";
        $cacheTtl = config('clickup.cache_ttl.lists');

        return Cache::remember($cacheKey, $cacheTtl, function () use ($organisation, $listId) {
            try {
                $response = $this->makeRequest($organisation, 'GET', "/list/{$listId}");

                return $response;

            } catch (GuzzleException $e) {
                throw new ClickUpApiException(
                    'Failed to fetch ClickUp list: '.$e->getMessage(),
                    $e->getCode(),
                    $e,
                    ['organisation_id' => $organisation->id, 'list_id' => $listId]
                );
            }
        });
    }

    /**
     * Create a task in a list.
     *
     * @param Organisation $organisation
     * @param string $listId
     * @param array $data Task data (name, description, assignees, priority, status, tags)
     * @return array Created task data
     * @throws ClickUpApiException
     */
    public function createTask(Organisation $organisation, string $listId, array $data): array
    {
        try {
            $response = $this->makeRequest($organisation, 'POST', "/list/{$listId}/task", $data);

            Log::info('ClickUp API: Task created', [
                'organisation_id' => $organisation->id,
                'list_id' => $listId,
                'task_id' => $response['id'] ?? null,
            ]);

            return $response;

        } catch (GuzzleException $e) {
            throw new ClickUpApiException(
                'Failed to create ClickUp task: '.$e->getMessage(),
                $e->getCode(),
                $e,
                ['organisation_id' => $organisation->id, 'list_id' => $listId, 'data' => $data]
            );
        }
    }

    /**
     * Get a task by ID.
     *
     * @param Organisation $organisation
     * @param string $taskId
     * @return array
     * @throws ClickUpApiException
     */
    public function getTask(Organisation $organisation, string $taskId): array
    {
        try {
            $response = $this->makeRequest($organisation, 'GET', "/task/{$taskId}");

            return $response;

        } catch (GuzzleException $e) {
            throw new ClickUpApiException(
                'Failed to fetch ClickUp task: '.$e->getMessage(),
                $e->getCode(),
                $e,
                ['organisation_id' => $organisation->id, 'task_id' => $taskId]
            );
        }
    }

    /**
     * Update a task.
     *
     * @param Organisation $organisation
     * @param string $taskId
     * @param array $data Task data to update
     * @return array Updated task data
     * @throws ClickUpApiException
     */
    public function updateTask(Organisation $organisation, string $taskId, array $data): array
    {
        try {
            $response = $this->makeRequest($organisation, 'PUT', "/task/{$taskId}", $data);

            Log::info('ClickUp API: Task updated', [
                'organisation_id' => $organisation->id,
                'task_id' => $taskId,
            ]);

            return $response;

        } catch (GuzzleException $e) {
            throw new ClickUpApiException(
                'Failed to update ClickUp task: '.$e->getMessage(),
                $e->getCode(),
                $e,
                ['organisation_id' => $organisation->id, 'task_id' => $taskId]
            );
        }
    }

    /**
     * Make an authenticated API request to ClickUp.
     *
     * @param Organisation $organisation
     * @param string $method HTTP method
     * @param string $endpoint API endpoint (without base URL)
     * @param array $data Request data
     * @return array Response data
     * @throws ClickUpRateLimitException
     * @throws GuzzleException
     */
    private function makeRequest(Organisation $organisation, string $method, string $endpoint, array $data = []): array
    {
        $this->checkRateLimit($organisation);

        $accessToken = $this->tokenService->getAccessToken($organisation);

        $client = new Client([
            'base_uri' => config('clickup.api_url'),
            'timeout' => 30,
        ]);

        $options = [
            'headers' => [
                'Authorization' => $accessToken,
                'Content-Type' => 'application/json',
            ],
        ];

        if (! empty($data) && in_array($method, ['POST', 'PUT', 'PATCH'])) {
            $options['json'] = $data;
        }

        $response = $client->request($method, $endpoint, $options);

        $this->recordApiCall($organisation);

        return json_decode($response->getBody()->getContents(), true);
    }

    /**
     * Check if rate limit is approaching and throw exception if needed.
     *
     * @param Organisation $organisation
     * @throws ClickUpRateLimitException
     */
    private function checkRateLimit(Organisation $organisation): void
    {
        $cacheKey = "clickup.rate_limit.{$organisation->id}";
        $currentCount = Cache::get($cacheKey, 0);

        $limit = config('clickup.rate_limit.requests_per_minute');
        $threshold = config('clickup.rate_limit.warning_threshold');

        if ($currentCount >= $threshold) {
            Log::warning('ClickUp API: Rate limit threshold reached', [
                'organisation_id' => $organisation->id,
                'current_count' => $currentCount,
                'limit' => $limit,
            ]);

            throw new ClickUpRateLimitException(
                "ClickUp API rate limit approaching ({$currentCount}/{$limit} requests). Please try again in a moment.",
                429,
                null,
                60 // Retry after 60 seconds
            );
        }
    }

    /**
     * Record an API call for rate limiting.
     *
     * @param Organisation $organisation
     */
    private function recordApiCall(Organisation $organisation): void
    {
        $cacheKey = "clickup.rate_limit.{$organisation->id}";
        $currentCount = Cache::get($cacheKey, 0);

        Cache::put($cacheKey, $currentCount + 1, 60); // TTL: 60 seconds (1 minute)
    }
}
