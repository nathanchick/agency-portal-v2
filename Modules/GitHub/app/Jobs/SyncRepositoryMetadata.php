<?php

namespace Modules\GitHub\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Modules\GitHub\Models\GitHubRepository;
use Modules\GitHub\Services\GitHubRepositorySyncService;

/**
 * SyncRepositoryMetadata Job
 *
 * Background job to sync repository metadata from GitHub API.
 */
class SyncRepositoryMetadata implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     */
    public int $backoff = 60;

    /**
     * The maximum number of seconds the job should run.
     */
    public int $timeout = 60;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public GitHubRepository $repository
    ) {
        $this->onQueue('github');
    }

    /**
     * Execute the job.
     */
    public function handle(GitHubRepositorySyncService $syncService): void
    {
        Log::info('GitHub Job: Starting repository metadata sync', [
            'repository_id' => $this->repository->id,
            'full_name' => $this->repository->full_name,
            'organisation_id' => $this->repository->organisation_id,
        ]);

        $success = $syncService->syncMetadata($this->repository);

        if ($success) {
            Log::info('GitHub Job: Repository metadata sync completed successfully', [
                'repository_id' => $this->repository->id,
                'full_name' => $this->repository->full_name,
            ]);
        } else {
            Log::warning('GitHub Job: Repository metadata sync completed with errors', [
                'repository_id' => $this->repository->id,
                'full_name' => $this->repository->full_name,
            ]);
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('GitHub Job: Repository metadata sync failed', [
            'repository_id' => $this->repository->id,
            'full_name' => $this->repository->full_name,
            'error' => $exception->getMessage(),
            'trace' => $exception->getTraceAsString(),
        ]);
    }
}
