<?php

namespace App\Models;

use App\Traits\DispatchesWebhooks;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Website extends Model
{
    use HasUuids, DispatchesWebhooks;

    protected $fillable = [
        'customer_id',
        'project_id',
        'type',
        'url',
        'notes',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Get the organisation ID for webhook dispatching.
     * Website doesn't have organisation_id directly, so we get it through the customer relationship.
     */
    public function getWebhookOrganisationId(): ?string
    {
        return $this->customer?->organisation_id;
    }
}
