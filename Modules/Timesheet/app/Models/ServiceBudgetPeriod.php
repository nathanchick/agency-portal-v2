<?php

namespace Modules\Timesheet\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceBudgetPeriod extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'timesheet_service_budget_periods';

    protected $fillable = [
        'service_id',
        'period_start',
        'period_end',
        'budget_hours',
        'budget_amount',
        'hours_used',
        'amount_used',
        'hours_rollover_from_previous',
        'hours_rollover_to_next',
        'reconciled',
        'reconciled_by',
        'reconciled_at',
        'reconciliation_action',
        'reconciliation_notes',
    ];

    protected $casts = [
        'period_start' => 'date',
        'period_end' => 'date',
        'budget_hours' => 'decimal:2',
        'budget_amount' => 'decimal:2',
        'hours_used' => 'decimal:2',
        'amount_used' => 'decimal:2',
        'hours_rollover_from_previous' => 'decimal:2',
        'hours_rollover_to_next' => 'decimal:2',
        'reconciled' => 'boolean',
        'reconciled_at' => 'datetime',
    ];

    protected $appends = [
        'total_available_hours',
        'remaining_hours',
        'usage_percentage',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function reconciledBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reconciled_by');
    }

    public function scopePendingReconciliation($query)
    {
        return $query->where('reconciled', false)
            ->where('period_end', '<', now());
    }

    public function scopeReconciled($query)
    {
        return $query->where('reconciled', true);
    }

    public function scopeCurrentPeriod($query)
    {
        return $query->where('period_start', '<=', now())
            ->where('period_end', '>=', now());
    }

    /**
     * Calculate total available hours including rollover
     */
    public function getTotalAvailableHoursAttribute(): float
    {
        return $this->budget_hours + $this->hours_rollover_from_previous;
    }

    /**
     * Calculate remaining hours
     */
    public function getRemainingHoursAttribute(): float
    {
        return $this->getTotalAvailableHoursAttribute() - $this->hours_used;
    }

    /**
     * Calculate usage percentage
     */
    public function getUsagePercentageAttribute(): float
    {
        $total = $this->getTotalAvailableHoursAttribute();
        return $total > 0 ? ($this->hours_used / $total) * 100 : 0;
    }

    /**
     * Check if period is over budget
     */
    public function isOverBudget(): bool
    {
        return $this->hours_used > $this->getTotalAvailableHoursAttribute();
    }

    /**
     * Check if period is under budget
     */
    public function isUnderBudget(): bool
    {
        return $this->hours_used < $this->getTotalAvailableHoursAttribute();
    }
}
