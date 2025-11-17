<?php

namespace Modules\GitHub\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Modules\Customer\Models\Project;
use Modules\Organisation\Models\Organisation;

class GitHubRepository extends Model
{
    use BelongsToTenant;
    use HasUuids;

    protected $table = 'github_repositories';

    protected $fillable = [
        'organisation_id',
        'github_repo_id',
        'owner',
        'name',
        'full_name',
        'description',
        'is_private',
        'is_fork',
        'default_branch',
        'html_url',
        'clone_url',
        'language',
        'stars_count',
        'forks_count',
        'open_issues_count',
        'watchers_count',
        'size_kb',
        'pushed_at',
        'github_created_at',
        'github_updated_at',
        'last_synced_at',
        'metadata',
    ];

    protected $casts = [
        'is_private' => 'boolean',
        'is_fork' => 'boolean',
        'github_repo_id' => 'integer',
        'stars_count' => 'integer',
        'forks_count' => 'integer',
        'open_issues_count' => 'integer',
        'watchers_count' => 'integer',
        'size_kb' => 'integer',
        'pushed_at' => 'datetime',
        'github_created_at' => 'datetime',
        'github_updated_at' => 'datetime',
        'last_synced_at' => 'datetime',
        'metadata' => 'array',
    ];

    /**
     * Get the organisation that owns the repository
     */
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Get the project linked to this repository (reverse relationship)
     * Note: Project has the foreign key, not Repository
     */
    public function project(): HasOne
    {
        return $this->hasOne(Project::class, 'github_repository_id');
    }

    /**
     * Get all sync logs for this repository
     */
    public function syncLogs(): HasMany
    {
        return $this->hasMany(GitHubSyncLog::class, 'repository_id');
    }

    /**
     * Check if repository needs sync (based on last sync time)
     */
    public function needsSync(int $hours = 6): bool
    {
        if (! $this->last_synced_at) {
            return true;
        }

        return $this->last_synced_at->addHours($hours)->isPast();
    }

    /**
     * Mark repository as synced
     */
    public function markAsSynced(): void
    {
        $this->update(['last_synced_at' => now()]);
    }

    /**
     * Get repository display name
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->full_name;
    }

    /**
     * Get repository visibility badge text
     */
    public function getVisibilityBadgeAttribute(): string
    {
        return $this->is_private ? 'Private' : 'Public';
    }
}
