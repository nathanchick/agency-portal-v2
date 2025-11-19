<?php

namespace Modules\ClickUp\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Organisation\Models\Organisation;

class ClickUpSpace extends Model
{
    use BelongsToTenant;
    use HasUuids;

    protected $table = 'clickup_spaces';

    protected $fillable = [
        'organisation_id',
        'clickup_space_id',
        'clickup_team_id',
        'name',
        'is_private',
        'color',
        'avatar_url',
        'metadata',
        'last_synced_at',
    ];

    protected $casts = [
        'is_private' => 'boolean',
        'metadata' => 'array',
        'last_synced_at' => 'datetime',
    ];

    /**
     * Get the organisation that owns the space
     */
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Scope a query to only include spaces for a specific organisation
     */
    public function scopeByOrganisation(Builder $query, string $organisationId): Builder
    {
        return $query->where('organisation_id', $organisationId);
    }

    /**
     * Scope a query to only include spaces with a specific ClickUp Space ID
     */
    public function scopeByClickUpSpaceId(Builder $query, string $clickupSpaceId): Builder
    {
        return $query->where('clickup_space_id', $clickupSpaceId);
    }

    /**
     * Check if the space needs syncing (last synced > 30 minutes ago)
     */
    public function needsSync(): bool
    {
        if (! $this->last_synced_at) {
            return true;
        }

        return $this->last_synced_at->addMinutes(30)->isPast();
    }
}
