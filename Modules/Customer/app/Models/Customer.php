<?php

namespace Modules\Customer\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Models\User;
use App\Traits\DispatchesWebhooks;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Document\Models\DocumentRequest;

class Customer extends Model
{
    use BelongsToTenant;
    use DispatchesWebhooks;
    use HasUuids;

    protected $fillable = [
        'organisation_id',
        'name',
        'status',
        'allow_all_users',
    ];

    protected $casts = [
        'status' => 'integer',
        'allow_all_users' => 'boolean',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function websites(): HasMany
    {
        return $this->hasMany(Website::class);
    }

    public function documentRequests(): HasMany
    {
        return $this->hasMany(DocumentRequest::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withPivot('role_id');
    }
}
