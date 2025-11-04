<?php

namespace Modules\Timesheet\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Customer\Models\Customer;
use Modules\Customer\Models\Project;

class Service extends Model
{
    use BelongsToTenant, HasFactory, HasUuids;

    protected $table = 'timesheet_services';

    protected $fillable = [
        'organisation_id',
        'customer_id',
        'project_id',
        'name',
        'description',
        'status',
        'billing_type',
        'budget_period',
        'current_budget_hours',
        'current_budget_amount',
        'budget_include_expenses',
        'budget_rollover_enabled',
        'start_date',
        'end_date',
        'default_hourly_rate',
        'service_manager_id',
    ];

    protected $casts = [
        'current_budget_hours' => 'decimal:2',
        'current_budget_amount' => 'decimal:2',
        'budget_include_expenses' => 'boolean',
        'budget_rollover_enabled' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'default_hourly_rate' => 'decimal:2',
    ];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Organisation::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function serviceManager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'service_manager_id');
    }

    public function budgetPeriods(): HasMany
    {
        return $this->hasMany(ServiceBudgetPeriod::class);
    }

    public function budgetChanges(): HasMany
    {
        return $this->hasMany(ServiceBudgetChange::class);
    }

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class, 'timesheet_service_task')
            ->withTimestamps();
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'timesheet_service_user')
            ->withTimestamps();
    }

    public function timeEntries(): HasMany
    {
        return $this->hasMany(TimeEntry::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }

    public function scopeForOrganisation($query, string $organisationId)
    {
        return $query->where('organisation_id', $organisationId);
    }

    public function scopeForCustomer($query, string $customerId)
    {
        return $query->where('customer_id', $customerId);
    }
}
