<?php

namespace Modules\Customer\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Traits\DispatchesWebhooks;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use BelongsToTenant;
    use DispatchesWebhooks;
    use HasUuids;

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
