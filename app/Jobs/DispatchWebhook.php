<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Modules\Webhook\Models\Webhook;
use Spatie\Multitenancy\Jobs\NotTenantAware;
use Spatie\WebhookServer\WebhookCall;

class DispatchWebhook implements NotTenantAware, ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;

    public $timeout = 30;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $webhookId,
        public string $organisationId,
        public string $event,
        public array $payload
    ) {
        $this->onQueue('webhooks');
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Fetch the webhook without any tenant scopes (jobs don't have tenant context)
        $webhook = Webhook::withoutGlobalScopes()->find($this->webhookId);

        if (! $webhook) {
            Log::error('Webhook not found', ['webhook_id' => $this->webhookId]);

            return;
        }

        // Verify the webhook belongs to the expected organisation (security check)
        if ($webhook->organisation_id !== $this->organisationId) {
            Log::error('Webhook organisation mismatch', [
                'webhook_id' => $this->webhookId,
                'expected_org' => $this->organisationId,
                'actual_org' => $webhook->organisation_id,
            ]);

            return;
        }

        try {
            $webhookPayload = [
                'event' => $this->event,
                'model' => $webhook->model,
                'data' => $this->payload,
                'timestamp' => now()->toIso8601String(),
                'webhook_id' => $webhook->id,
            ];

            $webhookCall = WebhookCall::create()
                ->url($webhook->url)
                ->payload($webhookPayload)
                ->useSecret($webhook->secret)
                ->timeoutInSeconds(25);

            // Add custom headers if specified
            if ($webhook->headers) {
                foreach ($webhook->headers as $key => $value) {
                    $webhookCall->withHeaders([$key => $value]);
                }
            }

            $webhookCall->dispatch();

            Log::info('Webhook dispatched successfully', [
                'webhook_id' => $webhook->id,
                'event' => $this->event,
                'model' => $webhook->model,
                'url' => $webhook->url,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to dispatch webhook', [
                'webhook_id' => $webhook->id,
                'event' => $this->event,
                'model' => $webhook->model,
                'url' => $webhook->url,
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
        Log::error('Webhook job failed after all retries', [
            'webhook_id' => $this->webhookId,
            'event' => $this->event,
            'organisation_id' => $this->organisationId,
            'error' => $exception->getMessage(),
        ]);
    }
}
