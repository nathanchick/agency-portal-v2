<?php

namespace App\Observers;

use App\Jobs\DispatchWebhook;
use App\Models\Webhook;
use Illuminate\Database\Eloquent\Model;

class WebhookObserver
{
    /**
     * Handle the model "created" event.
     */
    public function created(Model $model): void
    {
        $this->dispatchWebhooks($model, 'created');
    }

    /**
     * Handle the model "updated" event.
     */
    public function updated(Model $model): void
    {
        $this->dispatchWebhooks($model, 'updated');
    }

    /**
     * Handle the model "deleted" event.
     */
    public function deleted(Model $model): void
    {
        $this->dispatchWebhooks($model, 'deleted');
    }

    /**
     * Dispatch webhooks for the given model and event
     */
    protected function dispatchWebhooks(Model $model, string $event): void
    {
        // Check if model should dispatch webhooks
        if (method_exists($model, 'shouldDispatchWebhooks') && !$model->shouldDispatchWebhooks()) {
            return;
        }

        // Get organisation ID
        $organisationId = method_exists($model, 'getWebhookOrganisationId')
            ? $model->getWebhookOrganisationId()
            : null;

        if (!$organisationId) {
            return;
        }

        // Get model name
        $modelName = method_exists($model, 'getWebhookModelName')
            ? $model->getWebhookModelName()
            : class_basename($model);

        // Find active webhooks for this model and event
        $webhooks = Webhook::where('organisation_id', $organisationId)
            ->where('model', $modelName)
            ->where('active', true)
            ->get()
            ->filter(function ($webhook) use ($event) {
                return in_array($event, $webhook->events);
            });

        // Get payload
        $payload = method_exists($model, 'getWebhookPayload')
            ? $model->getWebhookPayload()
            : $model->toArray();

        // Dispatch job for each webhook
        foreach ($webhooks as $webhook) {
            DispatchWebhook::dispatch($webhook->id, $organisationId, $event, $payload);
        }
    }
}