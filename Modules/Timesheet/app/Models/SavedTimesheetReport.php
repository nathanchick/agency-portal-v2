<?php

namespace Modules\Timesheet\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SavedTimesheetReport extends Model
{
    use BelongsToTenant, HasFactory, HasUuids;

    protected $table = 'timesheet_saved_reports';

    protected $fillable = [
        'organisation_id',
        'created_by',
        'name',
        'description',
        'filters',
        'is_public',
    ];

    protected $casts = [
        'filters' => 'array',
        'is_public' => 'boolean',
    ];

    protected $appends = ['created_by_user'];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Organisation::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getCreatedByUserAttribute()
    {
        return $this->createdBy;
    }

    public function scheduledReports(): HasMany
    {
        return $this->hasMany(ScheduledTimesheetReport::class, 'saved_report_id');
    }

    public function scopeForOrganisation($query, string $organisationId)
    {
        return $query->where('organisation_id', $organisationId);
    }

    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    public function scopeOwnedBy($query, string $userId)
    {
        return $query->where('created_by', $userId);
    }

    public function scopeAccessibleBy($query, string $userId, string $organisationId)
    {
        return $query->where('organisation_id', $organisationId)
            ->where(function ($q) use ($userId) {
                $q->where('created_by', $userId)
                    ->orWhere('is_public', true);
            });
    }
}
