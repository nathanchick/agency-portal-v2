<?php

namespace Modules\Timesheet\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Customer\Models\Customer;
use Modules\Customer\Models\Project;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\ServiceBudgetChange;
use Modules\Timesheet\Models\ServiceBudgetPeriod;
use Modules\Timesheet\Models\Task;
use App\Models\User;

class ServiceController extends Controller
{
    use HasCurrentOrganisation;

    public function index(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        // Default to Active status unless explicitly filtered
        $statusFilter = $request->input('status', 'Active');

        $services = Service::query()
            ->where('timesheet_services.organisation_id', $organisationId)
            ->with([
                'customer',
                'project',
                'serviceManager',
                'budgetPeriods' => fn($q) => $q->currentPeriod()
            ])
            ->when($statusFilter, fn($q, $status) => $q->where('timesheet_services.status', $status))
            ->when($request->input('customer_id'), fn($q, $customerId) => $q->where('timesheet_services.customer_id', $customerId))
            ->join('customers', 'timesheet_services.customer_id', '=', 'customers.id')
            ->select('timesheet_services.*')
            ->orderBy('customers.name', 'asc')
            ->orderBy('timesheet_services.name', 'asc')
            ->get()
            ->map(function ($service) {
                // Add current period data to service
                $currentPeriod = $service->budgetPeriods->first();
                $service->current_period_hours_used = $currentPeriod->hours_used ?? 0;
                $service->current_period_amount_used = $currentPeriod->amount_used ?? 0;
                $service->current_period_budget_hours = $currentPeriod->budget_hours ?? $service->current_budget_hours ?? 0;
                $service->current_period_budget_amount = $currentPeriod->budget_amount ?? $service->current_budget_amount ?? 0;
                return $service;
            });

        $customers = Customer::where('organisation_id', $organisationId)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('timesheet/services/index', [
            'services' => $services,
            'customers' => $customers,
            'filters' => [
                'status' => $statusFilter,
                'customer_id' => $request->input('customer_id'),
            ],
        ]);
    }

    public function create(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $customers = Customer::where('organisation_id', $organisationId)
            ->orderBy('name')
            ->get(['id', 'name']);

        $projects = Project::whereHas('customer', function ($query) use ($organisationId) {
            $query->where('organisation_id', $organisationId);
        })->with('customer')->orderBy('name')->get(['id', 'customer_id', 'name']);

        $users = $this->getCurrentDirectOrganisation()->users()->get(['id', 'name', 'email']);

        return Inertia::render('timesheet/services/create', [
            'customers' => $customers,
            'projects' => $projects,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|uuid|exists:customers,id',
            'project_id' => 'nullable|uuid|exists:projects,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:Active,Archived,Completed',
            'billing_type' => 'required|in:Hourly,FixedFee,NonBillable',
            'budget_period' => 'required|in:Monthly,Quarterly,Yearly,OneTime',
            'current_budget_hours' => 'nullable|numeric|min:0',
            'current_budget_amount' => 'nullable|numeric|min:0',
            'budget_include_expenses' => 'boolean',
            'budget_rollover_enabled' => 'boolean',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'default_hourly_rate' => 'nullable|numeric|min:0',
            'service_manager_id' => 'nullable|uuid|exists:users,id',
        ]);

        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $service = Service::create([
            'organisation_id' => $organisationId,
            ...$validated,
        ]);

        // Create initial budget period
        $this->createInitialBudgetPeriod($service);

        return redirect()->route('timesheet.services.index')
            ->with('success', 'Service created successfully.');
    }

    public function edit(Request $request, Service $service)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $customers = Customer::where('organisation_id', $organisationId)
            ->orderBy('name')
            ->get(['id', 'name']);

        $projects = Project::whereHas('customer', function ($query) use ($organisationId) {
            $query->where('organisation_id', $organisationId);
        })->with('customer')->orderBy('name')->get(['id', 'customer_id', 'name']);

        $users = $this->getCurrentDirectOrganisation()->users()->get(['id', 'name', 'email']);

        // Get all tasks for the organisation
        $tasks = Task::where('organisation_id', $organisationId)
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('timesheet/services/edit', [
            'service' => $service->load(['customer', 'project', 'serviceManager', 'tasks', 'users']),
            'customers' => $customers,
            'projects' => $projects,
            'users' => $users,
            'tasks' => $tasks,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'customer_id' => 'required|uuid|exists:customers,id',
            'project_id' => 'nullable|uuid|exists:projects,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:Active,Archived,Completed',
            'billing_type' => 'required|in:Hourly,FixedFee,NonBillable',
            'budget_period' => 'required|in:Monthly,Quarterly,Yearly,OneTime',
            'current_budget_hours' => 'nullable|numeric|min:0',
            'current_budget_amount' => 'nullable|numeric|min:0',
            'budget_include_expenses' => 'boolean',
            'budget_rollover_enabled' => 'boolean',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'default_hourly_rate' => 'nullable|numeric|min:0',
            'service_manager_id' => 'nullable|uuid|exists:users,id',
        ]);

        $service->update($validated);

        return redirect()->route('timesheet.services.index')
            ->with('success', 'Service updated successfully.');
    }

    public function destroy(Request $request, Service $service)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $service->delete();

        return redirect()->route('timesheet.services.index')
            ->with('success', 'Service deleted successfully.');
    }

    public function show(Request $request, Service $service)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $service->load([
            'customer',
            'project',
            'serviceManager',
            'budgetPeriods' => fn($q) => $q->orderBy('period_start', 'desc'),
            'budgetChanges' => fn($q) => $q->with('createdByUser')->orderBy('effective_from', 'desc'),
            'tasks' => fn($q) => $q->where('is_active', true),
        ]);

        // Get current period
        $currentPeriod = $service->budgetPeriods()
            ->currentPeriod()
            ->first();

        // Get time entries stats
        $timeEntriesStats = $service->timeEntries()
            ->selectRaw('
                SUM(duration_hours) as total_hours,
                SUM(CASE WHEN billable = true THEN duration_hours ELSE 0 END) as billable_hours,
                SUM(duration_hours * hourly_rate) as total_amount
            ')
            ->first();

        return Inertia::render('timesheet/services/show', [
            'service' => $service,
            'currentPeriod' => $currentPeriod,
            'timeEntriesStats' => $timeEntriesStats,
            'budgetPeriods' => $service->budgetPeriods,
            'budgetChanges' => $service->budgetChanges,
        ]);
    }

    public function attachTask(Request $request, Service $service)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'task_id' => 'required|uuid|exists:timesheet_tasks,id',
        ]);

        $task = Task::findOrFail($validated['task_id']);

        if ($task->organisation_id !== $service->organisation_id) {
            abort(403, 'Task does not belong to this organisation.');
        }

        if (!$service->tasks->contains($task->id)) {
            $service->tasks()->attach($task->id);
        }

        return back()->with('success', 'Task added to service successfully.');
    }

    public function detachTask(Request $request, Service $service, Task $task)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $service->tasks()->detach($task->id);

        return back()->with('success', 'Task removed from service successfully.');
    }

    public function attachUser(Request $request, Service $service)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'user_id' => 'required|uuid|exists:users,id',
        ]);

        $user = User::findOrFail($validated['user_id']);

        // Verify user belongs to the organisation
        if (!$this->getCurrentDirectOrganisation()->users->contains($user->id)) {
            abort(403, 'User does not belong to this organisation.');
        }

        if (!$service->users->contains($user->id)) {
            $service->users()->attach($user->id);
        }

        return back()->with('success', 'User added to service successfully.');
    }

    public function detachUser(Request $request, Service $service, User $user)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $service->users()->detach($user->id);

        return back()->with('success', 'User removed from service successfully.');
    }

    protected function createInitialBudgetPeriod(Service $service): void
    {
        $periodStart = $service->start_date;
        $periodEnd = $this->calculatePeriodEnd($periodStart, $service->budget_period);

        ServiceBudgetPeriod::create([
            'service_id' => $service->id,
            'period_start' => $periodStart,
            'period_end' => $periodEnd,
            'budget_hours' => $service->current_budget_hours ?? 0,
            'budget_amount' => $service->current_budget_amount ?? 0,
            'hours_rollover_from_previous' => 0,
        ]);
    }

    protected function calculatePeriodEnd($startDate, $budgetPeriod): string
    {
        $start = \Carbon\Carbon::parse($startDate);

        return match ($budgetPeriod) {
            'Monthly' => $start->copy()->endOfMonth()->toDateString(),
            'Quarterly' => $start->copy()->addMonths(3)->subDay()->toDateString(),
            'Yearly' => $start->copy()->addYear()->subDay()->toDateString(),
            'OneTime' => $start->copy()->addYears(10)->toDateString(), // Far future date
        };
    }

    public function storeBudgetAdjustment(Request $request, Service $service)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'new_budget_hours' => 'nullable|numeric|min:0',
            'new_budget_amount' => 'nullable|numeric|min:0',
            'effective_from' => 'required|date',
            'effective_to' => 'nullable|date|after:effective_from',
            'reason' => 'required|string|max:500',
            'apply_to_existing_periods' => 'boolean',
        ]);

        // Find the budget that will be active on the effective_from date
        $effectiveDate = \Carbon\Carbon::parse($validated['effective_from']);

        // Get active budget change on the effective_from date
        $activeBudgetChange = $service->budgetChanges()
            ->where('effective_from', '<=', $effectiveDate)
            ->where(function ($q) use ($effectiveDate) {
                $q->whereNull('effective_to')
                    ->orWhere('effective_to', '>=', $effectiveDate);
            })
            ->orderBy('effective_from', 'desc')
            ->first();

        // Determine the budget that will be active on effective_from date
        if ($activeBudgetChange) {
            // If there's an active change, use its new values as the baseline
            $oldBudgetHours = $activeBudgetChange->new_budget_hours;
            $oldBudgetAmount = $activeBudgetChange->new_budget_amount;
        } else {
            // No active change, use service's base budget
            $oldBudgetHours = $service->current_budget_hours;
            $oldBudgetAmount = $service->current_budget_amount;
        }

        // Record the budget change
        ServiceBudgetChange::create([
            'service_id' => $service->id,
            'changed_by' => auth()->id(),
            'effective_from' => $validated['effective_from'],
            'effective_to' => $validated['effective_to'] ?? null,
            'old_budget_hours' => $oldBudgetHours,
            'new_budget_hours' => $validated['new_budget_hours'] ?? $oldBudgetHours,
            'old_budget_amount' => $oldBudgetAmount,
            'new_budget_amount' => $validated['new_budget_amount'] ?? $oldBudgetAmount,
            'reason' => $validated['reason'],
        ]);

        // Update the service's current budget only if this is the most recent change
        $latestChange = $service->budgetChanges()
            ->orderBy('effective_from', 'desc')
            ->first();

        if ($latestChange && $latestChange->effective_from === $validated['effective_from']) {
            $service->update([
                'current_budget_hours' => $validated['new_budget_hours'] ?? $oldBudgetHours,
                'current_budget_amount' => $validated['new_budget_amount'] ?? $oldBudgetAmount,
            ]);
        }

        // If apply_to_existing_periods is true, update existing periods
        if ($validated['apply_to_existing_periods'] ?? false) {
            $query = $service->budgetPeriods()
                ->where('period_start', '>=', $validated['effective_from']);

            if (isset($validated['effective_to'])) {
                $query->where('period_start', '<=', $validated['effective_to']);
            }

            $query->update([
                'budget_hours' => $validated['new_budget_hours'] ?? $oldBudgetHours,
                'budget_amount' => $validated['new_budget_amount'] ?? $oldBudgetAmount,
            ]);
        }

        return back()->with('success', 'Budget adjustment recorded successfully.');
    }

    public function destroyBudgetAdjustment(Request $request, Service $service, ServiceBudgetChange $budgetChange)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        if ($budgetChange->service_id !== $service->id) {
            abort(403, 'Budget change does not belong to this service.');
        }

        // Check if this adjustment affects any reconciled periods
        $affectedReconciledPeriods = $service->budgetPeriods()
            ->where('reconciled', true)
            ->where('period_start', '>=', $budgetChange->effective_from)
            ->when($budgetChange->effective_to, fn($q) => $q->where('period_start', '<=', $budgetChange->effective_to))
            ->exists();

        if ($affectedReconciledPeriods) {
            return back()->withErrors([
                'budget_adjustment' => 'Cannot delete budget adjustment that affects reconciled periods. Please unreconcile those periods first.'
            ]);
        }

        // Find what the budget should revert to after deletion
        $effectiveDate = \Carbon\Carbon::parse($budgetChange->effective_from);

        // Get the previous active budget change before this one
        $previousBudgetChange = $service->budgetChanges()
            ->where('id', '!=', $budgetChange->id)
            ->where('effective_from', '<=', $effectiveDate)
            ->where(function ($q) use ($effectiveDate) {
                $q->whereNull('effective_to')
                    ->orWhere('effective_to', '>=', $effectiveDate);
            })
            ->orderBy('effective_from', 'desc')
            ->first();

        // Determine what budget to revert to
        if ($previousBudgetChange) {
            $revertBudgetHours = $previousBudgetChange->new_budget_hours;
            $revertBudgetAmount = $previousBudgetChange->new_budget_amount;
        } else {
            // No previous change, use the original budget stored in the change being deleted
            $revertBudgetHours = $budgetChange->old_budget_hours;
            $revertBudgetAmount = $budgetChange->old_budget_amount;
        }

        // If this was the most recent change, update the service's current budget
        $latestChange = $service->budgetChanges()
            ->orderBy('effective_from', 'desc')
            ->first();

        if ($latestChange && $latestChange->id === $budgetChange->id) {
            $service->update([
                'current_budget_hours' => $revertBudgetHours,
                'current_budget_amount' => $revertBudgetAmount,
            ]);
        }

        // Revert budget periods that were affected by this adjustment
        $affectedPeriods = $service->budgetPeriods()
            ->where('period_start', '>=', $budgetChange->effective_from)
            ->when($budgetChange->effective_to, fn($q) => $q->where('period_start', '<=', $budgetChange->effective_to));

        $affectedPeriods->update([
            'budget_hours' => $revertBudgetHours,
            'budget_amount' => $revertBudgetAmount,
        ]);

        // Delete the budget change
        $budgetChange->delete();

        return back()->with('success', 'Budget adjustment deleted successfully. Budget has been reverted.');
    }
}
