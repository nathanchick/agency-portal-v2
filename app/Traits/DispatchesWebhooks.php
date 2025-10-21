<?php

namespace App\Traits;

use App\Observers\WebhookObserver;

trait DispatchesWebhooks
{
    /**
     * Boot the trait
     */
    protected static function bootDispatchesWebhooks(): void
    {
        static::observe(WebhookObserver::class);
    }

    /**
     * Get the model name for webhooks
     */
    public function getWebhookModelName(): string
    {
        return class_basename($this);
    }

    /**
     * Get the organisation ID for this model (override if needed)
     */
    public function getWebhookOrganisationId(): ?string
    {
        // Try to get organisation_id from the model
        if (isset($this->organisation_id)) {
            return $this->organisation_id;
        }

        // Try to get it from a relationship
        if (method_exists($this, 'organisation') && $this->organisation) {
            return $this->organisation->id;
        }

        return null;
    }

    /**
     * Get the payload for the webhook
     */
    public function getWebhookPayload(): array
    {
        return $this->toArray();
    }

    /**
     * Check if this model should dispatch webhooks
     */
    public function shouldDispatchWebhooks(): bool
    {
        return true;
    }
}