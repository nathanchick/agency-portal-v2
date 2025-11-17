<?php

namespace Modules\OpenAi\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Customer\Models\Customer;

class CspViolationAnalysis extends Model
{
    use HasUuids;

    protected $fillable = [
        'customer_id',
        'host',
        'directive',
        'blocked_urls',
        'trust_assessment',
        'risk_level',
        'findings',
        'recommendations',
        'tokens_used',
        'cost',
        'model',
    ];

    protected $casts = [
        'blocked_urls' => 'array',
        'findings' => 'array',
        'recommendations' => 'array',
        'tokens_used' => 'integer',
        'cost' => 'decimal:6',
    ];

    /**
     * Get the customer that owns this analysis
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Scope to filter by customer ID
     */
    public function scopeForCustomer($query, string $customerId)
    {
        return $query->where('customer_id', $customerId);
    }

    /**
     * Scope to filter by host
     */
    public function scopeForHost($query, string $host)
    {
        return $query->where('host', $host);
    }

    /**
     * Scope to filter by directive
     */
    public function scopeForDirective($query, string $directive)
    {
        return $query->where('directive', $directive);
    }

    /**
     * Scope to get recent analyses (last 90 days)
     */
    public function scopeRecent($query)
    {
        return $query->where('created_at', '>=', now()->subDays(90));
    }

    /**
     * Get the risk level as a human-readable string
     */
    public function getRiskLevelLabelAttribute(): string
    {
        return match($this->risk_level) {
            'low' => 'Low Risk',
            'medium' => 'Medium Risk',
            'high' => 'High Risk',
            default => 'Unknown Risk',
        };
    }

    /**
     * Get the trust assessment as a human-readable string
     */
    public function getTrustAssessmentLabelAttribute(): string
    {
        return match($this->trust_assessment) {
            'trusted' => 'Trusted',
            'caution' => 'Use Caution',
            'risky' => 'Risky',
            'unknown' => 'Unknown',
            default => 'Unknown',
        };
    }
}
