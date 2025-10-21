<?php

namespace Modules\Customer\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Traits\DispatchesWebhooks;
use Modules\Customer\Models\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasUuids, BelongsToTenant, DispatchesWebhooks;

    protected $fillable = [
        'organisation_id',
        'customer_id',
        'name',
        'notes',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
