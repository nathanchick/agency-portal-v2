<?php

namespace Modules\Timesheet\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Modules\Customer\Models\Customer;
use Modules\Customer\Models\Project;

class TimeEntry extends Model
{
    use BelongsToTenant, HasFactory, HasUuids;

    protected $table = 'timesheet_time_entries';

    protected $fillable = [
        'organisation_id',
        'user_id',
        'service_id',
        'task_id',
        'customer_id',
        'project_id',
        'start_time',
        'end_time',
        'duration_hours',
        'date',
        'description',
        'billable',
        'hourly_rate',
        'approved',
        'approved_by',
        'approved_at',
        'timer_running',
        'external_reference',
        'source',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'duration_hours' => 'float',
        'date' => 'date',
        'billable' => 'boolean',
        'hourly_rate' => 'float',
        'approved' => 'boolean',
        'approved_at' => 'datetime',
        'timer_running' => 'boolean',
    ];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Organisation::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function scopeRunningTimer($query)
    {
        return $query->where('timer_running', true);
    }

    public function scopeApproved($query)
    {
        return $query->where('approved', true);
    }

    public function scopePendingApproval($query)
    {
        return $query->where('approved', false);
    }

    public function scopeBillable($query)
    {
        return $query->where('billable', true);
    }

    public function scopeNonBillable($query)
    {
        return $query->where('billable', false);
    }

    public function scopeForUser($query, string $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeForService($query, string $serviceId)
    {
        return $query->where('service_id', $serviceId);
    }

    public function scopeForCustomer($query, string $customerId)
    {
        return $query->where('customer_id', $customerId);
    }

    public function scopeForPeriod($query, $startDate, $endDate)
    {
        return $query->whereBetween('date', [$startDate, $endDate]);
    }

    public function scopeForOrganisation($query, string $organisationId)
    {
        return $query->where('organisation_id', $organisationId);
    }

    /**
     * Calculate the total amount for this entry
     */
    public function getTotalAmountAttribute(): float
    {
        return $this->duration_hours * $this->hourly_rate;
    }

    /**
     * Stop a running timer and calculate duration
     */
    public function stopTimer(): void
    {
        if ($this->timer_running && $this->start_time) {
            $this->end_time = now();
            $this->duration_hours = $this->start_time->diffInHours($this->end_time, true);
            $this->timer_running = false;
            $this->save();
        }
    }

    /**
     * Start a timer
     */
    public function startTimer(): void
    {
        $this->start_time = now();
        $this->timer_running = true;
        $this->save();
    }

    /**
     * Get elapsed time in seconds
     */
    public function getElapsedSeconds(): int
    {
        if (!$this->timer_running || !$this->start_time) {
            return 0;
        }

        return $this->start_time->diffInSeconds(now());
    }

    /**
     * Get elapsed time formatted as HH:MM:SS
     */
    public function getElapsedFormatted(): string
    {
        $seconds = $this->getElapsedSeconds();
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $secs = $seconds % 60;

        return sprintf('%02d:%02d:%02d', $hours, $minutes, $secs);
    }
}
