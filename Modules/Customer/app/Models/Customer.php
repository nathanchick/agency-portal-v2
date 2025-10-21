<?php

namespace Modules\Customer\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Traits\DispatchesWebhooks;
use App\Models\User;
use Modules\Customer\Models\Project;
use Modules\Customer\Models\Website;
use Modules\Document\Models\DocumentRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Customer extends Model
{
    use HasUuids, BelongsToTenant, DispatchesWebhooks;

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
