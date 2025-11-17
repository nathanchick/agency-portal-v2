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
        'github_repository_id',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function githubRepository(): BelongsTo
    {
        return $this->belongsTo(\Modules\GitHub\Models\GitHubRepository::class, 'github_repository_id');
    }
}
