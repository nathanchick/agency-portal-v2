<?php

namespace Modules\GitHub\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Organisation\Models\Organisation;

class GitHubSyncLog extends Model
{
    use BelongsToTenant;
    use HasUuids;

    protected $table = 'github_sync_logs';

    protected $fillable = [
        'organisation_id',
        'repository_id',
        'sync_type',
        'status',
        'message',
        'error_details',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'error_details' => 'array',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * Sync status constants
     */
    const STATUS_PENDING = 'pending';
    const STATUS_SUCCESS = 'success';
    const STATUS_FAILED = 'failed';

    /**
     * Sync type constants
     */
    const TYPE_FETCH_REPOS = 'fetch_repos';
    const TYPE_SYNC_METADATA = 'sync_metadata';
    const TYPE_SYNC_ISSUES = 'sync_issues';
    const TYPE_SYNC_PRS = 'sync_pull_requests';

    /**
     * Get the organisation that owns the sync log
     */
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Get the repository associated with this sync log
     */
    public function repository(): BelongsTo
    {
        return $this->belongsTo(GitHubRepository::class, 'repository_id');
    }

    /**
     * Mark sync as started
     */
    public function markAsStarted(): void
    {
        $this->update([
            'status' => self::STATUS_PENDING,
            'started_at' => now(),
        ]);
    }

    /**
     * Mark sync as successful
     */
    public function markAsSuccess(?string $message = null): void
    {
        $this->update([
            'status' => self::STATUS_SUCCESS,
            'message' => $message ?? 'Sync completed successfully',
            'completed_at' => now(),
        ]);
    }

    /**
     * Mark sync as failed
     */
    public function markAsFailed(string $message, ?array $errorDetails = null): void
    {
        $this->update([
            'status' => self::STATUS_FAILED,
            'message' => $message,
            'error_details' => $errorDetails,
            'completed_at' => now(),
        ]);
    }

    /**
     * Get duration of sync in seconds
     */
    public function getDurationAttribute(): ?int
    {
        if (! $this->started_at || ! $this->completed_at) {
            return null;
        }

        return $this->started_at->diffInSeconds($this->completed_at);
    }

    /**
     * Check if sync was successful
     */
    public function isSuccessful(): bool
    {
        return $this->status === self::STATUS_SUCCESS;
    }

    /**
     * Check if sync failed
     */
    public function isFailed(): bool
    {
        return $this->status === self::STATUS_FAILED;
    }

    /**
     * Check if sync is pending
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Scope for recent logs
     */
    public function scopeRecent($query, int $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days))
            ->orderBy('created_at', 'desc');
    }

    /**
     * Scope for failed syncs
     */
    public function scopeFailed($query)
    {
        return $query->where('status', self::STATUS_FAILED);
    }

    /**
     * Scope for successful syncs
     */
    public function scopeSuccessful($query)
    {
        return $query->where('status', self::STATUS_SUCCESS);
    }
}
