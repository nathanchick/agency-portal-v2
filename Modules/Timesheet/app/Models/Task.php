<?php

namespace Modules\Timesheet\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use BelongsToTenant, HasFactory, HasUuids;

    protected $table = 'timesheet_tasks';

    protected $fillable = [
        'organisation_id',
        'name',
        'description',
        'billable',
        'hourly_rate_override',
        'is_active',
    ];

    protected $casts = [
        'billable' => 'boolean',
        'hourly_rate_override' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Organisation::class);
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'timesheet_service_task')
            ->withTimestamps();
    }

    public function timeEntries(): HasMany
    {
        return $this->hasMany(TimeEntry::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeForOrganisation($query, string $organisationId)
    {
        return $query->where('organisation_id', $organisationId);
    }
}
