<?php

namespace Modules\CspManagement\Models;

use App\Models\User;
use Modules\Customer\Models\Customer;
use Modules\Website\Models\Website;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CspViolation extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'customer_id',
        'website_id',
        'directive',
        'host',
        'blocked_uri',
        'document_uri',
        'violated_directive',
        'effective_directive',
        'source_file',
        'line_number',
        'column_number',
        'disposition',
        'status',
        'decided_by',
        'decided_at',
        'decision_notes',
        'occurrence_count',
        'first_seen_at',
        'last_seen_at',
        'raw_report',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'raw_report' => 'array',
        'first_seen_at' => 'datetime',
        'last_seen_at' => 'datetime',
        'decided_at' => 'datetime',
        'line_number' => 'integer',
        'column_number' => 'integer',
        'occurrence_count' => 'integer',
    ];

    /**
     * Get the customer that owns the violation.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the website that owns the violation.
     */
    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class);
    }

    /**
     * Get the user who decided on this violation.
     */
    public function decider(): BelongsTo
    {
        return $this->belongsTo(User::class, 'decided_by');
    }

    /**
     * Get the decisions for this violation.
     */
    public function decisions(): HasMany
    {
        return $this->hasMany(CspViolationDecision::class);
    }

    /**
     * Scope a query to only include violations for a specific customer.
     */
    public function scopeForCustomer($query, string $customerId)
    {
        return $query->where('customer_id', $customerId);
    }

    /**
     * Scope a query to only include violations for a specific website.
     */
    public function scopeForWebsite($query, string $websiteId)
    {
        return $query->where('website_id', $websiteId);
    }

    /**
     * Scope a query to only include new violations.
     */
    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    /**
     * Scope a query to only include resolved violations (approved, rejected, or ignored).
     */
    public function scopeResolved($query)
    {
        return $query->whereIn('status', ['approved', 'rejected', 'ignored']);
    }

    /**
     * Scope a query to order by most recent occurrences.
     */
    public function scopeRecentOccurrences($query)
    {
        return $query->orderByDesc('last_seen_at');
    }

    /**
     * Scope a query to order by most occurrences.
     */
    public function scopeMostFrequent($query)
    {
        return $query->orderByDesc('occurrence_count');
    }

    /**
     * Scope a query to only include violations for a specific host and directive.
     */
    public function scopeForHost($query, string $host, string $directive)
    {
        return $query->where('host', $host)->where('directive', $directive);
    }

    /**
     * Scope a query to group violations by host and directive.
     * Returns aggregated data with violation counts and timestamps.
     */
    public function scopeGroupedByHost($query)
    {
        return $query->selectRaw('
                host,
                directive,
                status,
                COUNT(*) as url_count,
                SUM(occurrence_count) as total_occurrences,
                MAX(last_seen_at) as last_seen_at,
                MIN(first_seen_at) as first_seen_at
            ')
            ->groupBy('host', 'directive', 'status');
    }

    /**
     * Generate a hash for deduplication purposes.
     */
    public static function generateHash(string $customerId, string $directive, string $blockedUri, string $documentUri): string
    {
        return hash('sha256', $customerId . $directive . $blockedUri . $documentUri);
    }
}
