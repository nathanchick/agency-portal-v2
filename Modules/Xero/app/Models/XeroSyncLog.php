<?php

namespace Modules\Xero\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Organisation\Models\Organisation;

/**
 * XeroSyncLog Model
 *
 * Tracks all synchronization operations with Xero API.
 * Provides audit trail and helps diagnose integration issues.
 *
 * @property string $id
 * @property string $organisation_id
 * @property string $sync_type
 * @property string $status
 * @property string|null $message
 * @property int $records_processed
 * @property int $records_succeeded
 * @property int $records_failed
 * @property array|null $error_details
 * @property \Carbon\Carbon $started_at
 * @property \Carbon\Carbon|null $completed_at
 */
class XeroSyncLog extends Model
{
    use BelongsToTenant, HasFactory, HasUuids;

    /**
     * Sync type constants for consistent usage.
     */
    public const TYPE_FETCH_INVOICES = 'fetch_invoices';
    public const TYPE_CREATE_INVOICE = 'create_invoice';
    public const TYPE_UPDATE_INVOICE = 'update_invoice';
    public const TYPE_REFRESH_TOKEN = 'refresh_token';

    /**
     * Status constants.
     */
    public const STATUS_PENDING = 'pending';
    public const STATUS_SUCCESS = 'success';
    public const STATUS_FAILED = 'failed';
    public const STATUS_PARTIAL = 'partial';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'organisation_id',
        'sync_type',
        'status',
        'message',
        'records_processed',
        'records_succeeded',
        'records_failed',
        'error_details',
        'started_at',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'records_processed' => 'integer',
        'records_succeeded' => 'integer',
        'records_failed' => 'integer',
        'error_details' => 'array',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the organisation that owns the sync log.
     */
    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Scope to filter by sync type.
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('sync_type', $type);
    }

    /**
     * Scope to filter by status.
     */
    public function scopeWithStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to get successful syncs.
     */
    public function scopeSuccessful($query)
    {
        return $query->where('status', self::STATUS_SUCCESS);
    }

    /**
     * Scope to get failed syncs.
     */
    public function scopeFailed($query)
    {
        return $query->where('status', self::STATUS_FAILED);
    }

    /**
     * Scope to get recent syncs.
     */
    public function scopeRecent($query, int $days = 7)
    {
        return $query->where('started_at', '>=', now()->subDays($days));
    }

    /**
     * Mark the sync as completed with success status.
     */
    public function markAsSuccessful(?string $message = null): void
    {
        $this->update([
            'status' => self::STATUS_SUCCESS,
            'message' => $message,
            'completed_at' => now(),
        ]);
    }

    /**
     * Mark the sync as failed.
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
     * Mark the sync as partially successful.
     */
    public function markAsPartial(string $message, ?array $errorDetails = null): void
    {
        $this->update([
            'status' => self::STATUS_PARTIAL,
            'message' => $message,
            'error_details' => $errorDetails,
            'completed_at' => now(),
        ]);
    }

    /**
     * Calculate the duration of the sync in seconds.
     */
    public function getDurationInSeconds(): ?int
    {
        if (! $this->completed_at) {
            return null;
        }

        return $this->started_at->diffInSeconds($this->completed_at);
    }

    /**
     * Check if the sync is still running.
     */
    public function isRunning(): bool
    {
        return $this->completed_at === null;
    }

    /**
     * Check if the sync was successful.
     */
    public function wasSuccessful(): bool
    {
        return $this->status === self::STATUS_SUCCESS;
    }

    /**
     * Get success rate as percentage.
     */
    public function getSuccessRateAttribute(): ?float
    {
        if ($this->records_processed === 0) {
            return null;
        }

        return ($this->records_succeeded / $this->records_processed) * 100;
    }
}
