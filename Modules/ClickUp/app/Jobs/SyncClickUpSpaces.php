<?php

namespace Modules\ClickUp\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Modules\ClickUp\Services\ClickUpSpaceSyncService;
use Modules\Organisation\Models\Organisation;

class SyncClickUpSpaces implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     *
     * @var int
     */
    public $backoff = 60;

    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 120;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Organisation $organisation
    ) {
        $this->onQueue('clickup');
    }

    /**
     * Execute the job.
     */
    public function handle(ClickUpSpaceSyncService $syncService): void
    {
        try {
            Log::info('ClickUp Sync Job: Starting space sync', [
                'organisation_id' => $this->organisation->id,
            ]);

            $syncCount = $syncService->syncSpacesForOrganisation($this->organisation);

            Log::info('ClickUp Sync Job: Completed successfully', [
                'organisation_id' => $this->organisation->id,
                'spaces_synced' => $syncCount,
            ]);

        } catch (\Exception $e) {
            Log::error('ClickUp Sync Job: Failed', [
                'organisation_id' => $this->organisation->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('ClickUp Sync Job: Failed permanently', [
            'organisation_id' => $this->organisation->id,
            'error' => $exception->getMessage(),
        ]);
    }
}
