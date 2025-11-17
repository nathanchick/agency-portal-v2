<?php

namespace Modules\OpenAi\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Customer\Models\Customer;
use Modules\Ticket\Models\Ticket;
use Modules\Website\Models\Website;

class TicketQualityAnalysis extends Model
{
    use HasUuids;

    protected $fillable = [
        'ticket_id',
        'customer_id',
        'website_id',
        'analysis_data',
        'suggestions',
        'accepted_suggestions',
        'dismissed_suggestions',
        'tokens_used',
        'estimated_cost',
    ];

    protected $casts = [
        'analysis_data' => 'array',
        'suggestions' => 'array',
        'accepted_suggestions' => 'array',
        'dismissed_suggestions' => 'array',
        'tokens_used' => 'integer',
        'estimated_cost' => 'decimal:6',
    ];

    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function website(): BelongsTo
    {
        return $this->belongsTo(Website::class);
    }

    /**
     * Scope to get recent analyses (last 90 days)
     */
    public function scopeRecent($query)
    {
        return $query->where('created_at', '>=', now()->subDays(90));
    }

    /**
     * Calculate acceptance rate for this analysis
     */
    public function getAcceptanceRateAttribute(): float
    {
        $suggestions = $this->suggestions ?? [];
        $accepted = $this->accepted_suggestions ?? [];

        if (empty($suggestions)) {
            return 0.0;
        }

        $totalSuggestions = count($suggestions);
        $acceptedCount = count($accepted);

        return round(($acceptedCount / $totalSuggestions) * 100, 2);
    }

    /**
     * Get overall quality score from suggestions
     */
    public function getQualityScoreAttribute(): ?int
    {
        $suggestions = $this->suggestions ?? [];

        return $suggestions['overallScore'] ?? null;
    }
}
