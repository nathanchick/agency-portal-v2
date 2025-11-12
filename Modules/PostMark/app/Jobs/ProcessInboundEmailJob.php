<?php

namespace Modules\PostMark\Jobs;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Modules\PostMark\Models\InboundEmail;
use Modules\PostMark\Services\InboundEmailProcessor;

class ProcessInboundEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds the job can run before timing out.
     */
    public int $timeout = 60;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public InboundEmail $inboundEmail
    ) {
        $this->onQueue('webhooks');
    }

    /**
     * Execute the job.
     */
    public function handle(InboundEmailProcessor $processor): void
    {
        try {
            Log::info('ProcessInboundEmailJob started', [
                'inbound_email_id' => $this->inboundEmail->id,
                'attempt' => $this->attempts(),
            ]);

            // Process the inbound email
            $processor->process($this->inboundEmail);

            Log::info('ProcessInboundEmailJob completed successfully', [
                'inbound_email_id' => $this->inboundEmail->id,
            ]);
        } catch (Exception $e) {
            Log::error('ProcessInboundEmailJob failed', [
                'inbound_email_id' => $this->inboundEmail->id,
                'attempt' => $this->attempts(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Mark as failed if we've exhausted retries
            if ($this->attempts() >= $this->tries) {
                $this->inboundEmail->markAsFailed('Job failed after '.$this->tries.' attempts: '.$e->getMessage());
            }

            // Re-throw to let Laravel handle retry logic
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(?Exception $exception): void
    {
        Log::error('ProcessInboundEmailJob failed permanently', [
            'inbound_email_id' => $this->inboundEmail->id,
            'error' => $exception?->getMessage(),
        ]);

        // Ensure the inbound email is marked as failed
        if ($this->inboundEmail->processing_status !== 'failed') {
            $this->inboundEmail->markAsFailed('Job failed permanently: '.($exception?->getMessage() ?? 'Unknown error'));
        }
    }
}
