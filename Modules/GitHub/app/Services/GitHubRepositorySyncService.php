<?php

namespace Modules\GitHub\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\GitHub\Exceptions\GitHubApiException;
use Modules\GitHub\Models\GitHubRepository;
use Modules\GitHub\Models\GitHubSyncLog;
use Modules\Organisation\Models\Organisation;

/**
 * GitHubRepositorySyncService
 *
 * Handles synchronization of repository metadata from GitHub to the local database.
 */
class GitHubRepositorySyncService
{
    /**
     * Create a new service instance.
     */
    public function __construct(
        private GitHubApiService $apiService
    ) {
    }

    /**
     * Sync metadata for a single repository.
     *
     * @param GitHubRepository $repository
     * @return bool Success status
     */
    public function syncMetadata(GitHubRepository $repository): bool
    {
        $syncLog = $this->createSyncLog($repository->organisation, $repository, 'sync_metadata');

        try {
            // Fetch latest data from GitHub API
            $repoData = $this->apiService->getRepository(
                $repository->organisation,
                $repository->owner,
                $repository->name
            );

            // Update repository with fresh data
            DB::transaction(function () use ($repository, $repoData) {
                $repository->update($this->mapRepositoryData($repoData));
                $repository->markAsSynced();
            });

            $this->completeSyncLog($syncLog, 'success', 'Repository metadata synced successfully');

            Log::info('GitHub Sync: Repository metadata synced', [
                'organisation_id' => $repository->organisation_id,
                'repository_id' => $repository->id,
                'full_name' => $repository->full_name,
            ]);

            return true;

        } catch (GitHubApiException $e) {
            $this->completeSyncLog($syncLog, 'failed', $e->getMessage(), [
                'error' => $e->getMessage(),
                'code' => $e->getCode(),
            ]);

            Log::error('GitHub Sync: Failed to sync repository metadata', [
                'organisation_id' => $repository->organisation_id,
                'repository_id' => $repository->id,
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Sync all repositories for an organisation.
     *
     * @param Organisation $organisation
     * @return array Summary of sync operation
     */
    public function syncAllRepositories(Organisation $organisation): array
    {
        $syncLog = $this->createSyncLog($organisation, null, 'sync_all_repositories');

        $repositories = GitHubRepository::where('organisation_id', $organisation->id)->get();

        $results = [
            'total' => $repositories->count(),
            'success' => 0,
            'failed' => 0,
            'errors' => [],
        ];

        foreach ($repositories as $repository) {
            try {
                if ($this->syncMetadata($repository)) {
                    $results['success']++;
                } else {
                    $results['failed']++;
                }
            } catch (\Exception $e) {
                $results['failed']++;
                $results['errors'][] = [
                    'repository' => $repository->full_name,
                    'error' => $e->getMessage(),
                ];

                Log::error('GitHub Sync: Exception during repository sync', [
                    'organisation_id' => $organisation->id,
                    'repository_id' => $repository->id,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        $status = $results['failed'] === 0 ? 'success' : ($results['success'] > 0 ? 'partial' : 'failed');
        $message = "Synced {$results['success']} of {$results['total']} repositories";

        $this->completeSyncLog($syncLog, $status, $message, $results);

        Log::info('GitHub Sync: Completed bulk repository sync', [
            'organisation_id' => $organisation->id,
            'results' => $results,
        ]);

        return $results;
    }

    /**
     * Create or update a repository from GitHub API data.
     *
     * @param Organisation $organisation
     * @param array $repoData Repository data from GitHub API
     * @return GitHubRepository
     */
    public function createOrUpdateRepository(Organisation $organisation, array $repoData): GitHubRepository
    {
        $mappedData = $this->mapRepositoryData($repoData);
        $mappedData['organisation_id'] = $organisation->id;

        $repository = GitHubRepository::updateOrCreate(
            [
                'organisation_id' => $organisation->id,
                'github_repo_id' => $repoData['id'],
            ],
            $mappedData
        );

        $repository->markAsSynced();

        Log::debug('GitHub Sync: Repository created/updated', [
            'organisation_id' => $organisation->id,
            'repository_id' => $repository->id,
            'full_name' => $repository->full_name,
        ]);

        return $repository;
    }

    /**
     * Fetch and sync all accessible repositories for an organisation.
     *
     * @param Organisation $organisation
     * @return array Summary of import operation
     */
    public function fetchRepositories(Organisation $organisation): array
    {
        $syncLog = $this->createSyncLog($organisation, null, 'fetch_repositories');

        try {
            // Fetch all accessible repositories from GitHub
            $repos = $this->apiService->listRepositories($organisation, true);

            $results = [
                'total' => count($repos),
                'created' => 0,
                'updated' => 0,
                'errors' => [],
            ];

            foreach ($repos as $repoData) {
                try {
                    $existingRepo = GitHubRepository::where('organisation_id', $organisation->id)
                        ->where('github_repo_id', $repoData['id'])
                        ->first();

                    $this->createOrUpdateRepository($organisation, $repoData);

                    if ($existingRepo) {
                        $results['updated']++;
                    } else {
                        $results['created']++;
                    }

                } catch (\Exception $e) {
                    $results['errors'][] = [
                        'repository' => $repoData['full_name'] ?? 'unknown',
                        'error' => $e->getMessage(),
                    ];

                    Log::error('GitHub Sync: Failed to import repository', [
                        'organisation_id' => $organisation->id,
                        'repo_data' => $repoData,
                        'error' => $e->getMessage(),
                    ]);
                }
            }

            $message = "Fetched {$results['total']} repositories: {$results['created']} new, {$results['updated']} updated";
            $this->completeSyncLog($syncLog, 'success', $message, $results);

            Log::info('GitHub Sync: Repositories fetched and imported', [
                'organisation_id' => $organisation->id,
                'results' => $results,
            ]);

            return $results;

        } catch (GitHubApiException $e) {
            $this->completeSyncLog($syncLog, 'failed', $e->getMessage(), [
                'error' => $e->getMessage(),
            ]);

            Log::error('GitHub Sync: Failed to fetch repositories', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Map GitHub API repository data to database fields.
     *
     * @param array $repoData
     * @return array
     */
    private function mapRepositoryData(array $repoData): array
    {
        return [
            'github_repo_id' => $repoData['id'],
            'owner' => $repoData['owner']['login'] ?? null,
            'name' => $repoData['name'],
            'full_name' => $repoData['full_name'],
            'description' => $repoData['description'],
            'is_private' => $repoData['private'] ?? false,
            'is_fork' => $repoData['fork'] ?? false,
            'default_branch' => $repoData['default_branch'] ?? 'main',
            'html_url' => $repoData['html_url'],
            'clone_url' => $repoData['clone_url'],
            'language' => $repoData['language'],
            'stars_count' => $repoData['stargazers_count'] ?? 0,
            'forks_count' => $repoData['forks_count'] ?? 0,
            'open_issues_count' => $repoData['open_issues_count'] ?? 0,
            'watchers_count' => $repoData['watchers_count'] ?? 0,
            'size_kb' => $repoData['size'] ?? 0,
            'pushed_at' => isset($repoData['pushed_at']) ? Carbon::parse($repoData['pushed_at']) : null,
            'github_created_at' => isset($repoData['created_at']) ? Carbon::parse($repoData['created_at']) : null,
            'github_updated_at' => isset($repoData['updated_at']) ? Carbon::parse($repoData['updated_at']) : null,
            'metadata' => $repoData, // Store full API response for future reference
        ];
    }

    /**
     * Create a sync log entry.
     *
     * @param Organisation $organisation
     * @param GitHubRepository|null $repository
     * @param string $syncType
     * @return GitHubSyncLog
     */
    private function createSyncLog(
        Organisation $organisation,
        ?GitHubRepository $repository,
        string $syncType
    ): GitHubSyncLog {
        return GitHubSyncLog::create([
            'organisation_id' => $organisation->id,
            'repository_id' => $repository?->id,
            'sync_type' => $syncType,
            'status' => 'pending',
            'started_at' => now(),
        ]);
    }

    /**
     * Complete a sync log entry.
     *
     * @param GitHubSyncLog $syncLog
     * @param string $status
     * @param string $message
     * @param array|null $errorDetails
     */
    private function completeSyncLog(
        GitHubSyncLog $syncLog,
        string $status,
        string $message,
        ?array $errorDetails = null
    ): void {
        $syncLog->update([
            'status' => $status,
            'message' => $message,
            'error_details' => $errorDetails,
            'completed_at' => now(),
        ]);
    }
}
