<?php

namespace Modules\Website\Models;

use App\Traits\DispatchesWebhooks;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Modules\Customer\Models\Customer;
use Modules\Customer\Models\Project;
use Modules\Ohdear\Models\OhdearWebsite;

class Website extends Model
{
    use DispatchesWebhooks;
    use HasUuids;

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

    public function ohdearWebsites(): HasMany
    {
        return $this->hasMany(OhdearWebsite::class);
    }

    // Backwards compatibility: get first monitor
    public function ohdearWebsite(): HasOne
    {
        return $this->hasOne(OhdearWebsite::class)->oldest();
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
