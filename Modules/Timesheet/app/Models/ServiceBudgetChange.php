<?php

namespace Modules\Timesheet\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceBudgetChange extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'timesheet_service_budget_changes';

    protected $fillable = [
        'service_id',
        'changed_by',
        'effective_from',
        'effective_to',
        'old_budget_hours',
        'new_budget_hours',
        'old_budget_amount',
        'new_budget_amount',
        'reason',
    ];

    protected $casts = [
        'effective_from' => 'date',
        'effective_to' => 'date',
        'old_budget_hours' => 'decimal:2',
        'new_budget_hours' => 'decimal:2',
        'old_budget_amount' => 'decimal:2',
        'new_budget_amount' => 'decimal:2',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function changedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }

    public function scopeActive($query, $date = null)
    {
        $date = $date ?? now();

        return $query->where('effective_from', '<=', $date)
            ->where(function ($q) use ($date) {
                $q->whereNull('effective_to')
                    ->orWhere('effective_to', '>=', $date);
            });
    }

    public function scopeForService($query, string $serviceId)
    {
        return $query->where('service_id', $serviceId);
    }
}
