<?php

namespace Modules\Timesheet\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScheduledTimesheetReport extends Model
{
    use BelongsToTenant, HasFactory, HasUuids;

    protected $table = 'timesheet_scheduled_reports';

    protected $fillable = [
        'organisation_id',
        'saved_report_id',
        'created_by',
        'recipients',
        'schedule_frequency',
        'schedule_day',
        'schedule_time',
        'last_sent_at',
        'next_run_at',
        'is_active',
        'format',
    ];

    protected $casts = [
        'recipients' => 'array',
        'schedule_time' => 'datetime:H:i',
        'last_sent_at' => 'datetime',
        'next_run_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Organisation::class);
    }

    public function savedReport(): BelongsTo
    {
        return $this->belongsTo(SavedTimesheetReport::class, 'saved_report_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeForOrganisation($query, string $organisationId)
    {
        return $query->where('organisation_id', $organisationId);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeDueToRun($query)
    {
        return $query->where('is_active', true)
            ->where('next_run_at', '<=', now());
    }

    /**
     * Calculate next run time based on schedule
     */
    public function calculateNextRun(): \Carbon\Carbon
    {
        $now = now();
        $time = \Carbon\Carbon::parse($this->schedule_time);

        switch ($this->schedule_frequency) {
            case 'daily':
                $next = $now->copy()->setTime($time->hour, $time->minute, 0);
                if ($next->isPast()) {
                    $next->addDay();
                }
                break;

            case 'weekly':
                // Convert integer day (0-6) to day name for Carbon
                $dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                $dayName = $dayNames[$this->schedule_day] ?? 'Monday';

                $next = $now->copy()->next($dayName)->setTime($time->hour, $time->minute, 0);
                // If we're on the same day but past the time, move to next week
                if ($now->dayOfWeek === $this->schedule_day && $now->format('H:i') >= $time->format('H:i')) {
                    $next->addWeek();
                }
                break;

            case 'monthly':
                $next = $now->copy()->day($this->schedule_day)->setTime($time->hour, $time->minute, 0);
                // If we're past the day or on the day but past the time, move to next month
                if ($now->day > $this->schedule_day ||
                    ($now->day === $this->schedule_day && $now->format('H:i') >= $time->format('H:i'))) {
                    $next->addMonth();
                }
                break;

            default:
                $next = $now->addDay();
        }

        return $next;
    }

    /**
     * Mark report as sent and calculate next run
     */
    public function markAsSent(): void
    {
        $this->update([
            'last_sent_at' => now(),
            'next_run_at' => $this->calculateNextRun(),
        ]);
    }
}
