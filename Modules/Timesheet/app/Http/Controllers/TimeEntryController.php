<?php

namespace Modules\Timesheet\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\Task;
use Modules\Timesheet\Models\TimeEntry;

class TimeEntryController extends Controller
{
    use HasCurrentOrganisation;

    public function index(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;
        $currentUser = Auth::user();
        $currentUserId = $currentUser->id;

        // Calculate week start (Monday) and end (Sunday)
        $weekStart = $request->input('week_start')
            ? \Carbon\Carbon::parse($request->input('week_start'))->startOfWeek()
            : \Carbon\Carbon::now()->startOfWeek();
        $weekEnd = $weekStart->copy()->endOfWeek();

        // Get current user's role for the organisation
        $userRole = \DB::table('model_has_roles')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('model_has_roles.model_type', \App\Models\User::class)
            ->where('model_has_roles.model_id', $currentUserId)
            ->where('model_has_roles.team_id', $organisationId)
            ->value('roles.name');

        // Determine which user's entries to show based on role
        $selectedUserId = $currentUserId; // Default to current user

        // Get available users based on role
        $organisationUsers = collect();

        if ($userRole === 'Admin') {
            // Admins can view all organisation users
            $organisationUsers = \DB::table('users')
                ->join('organisation_user', 'users.id', '=', 'organisation_user.user_id')
                ->join('model_has_roles', function ($join) use ($organisationId) {
                    $join->on('users.id', '=', 'model_has_roles.model_id')
                        ->where('model_has_roles.model_type', '=', \App\Models\User::class)
                        ->where('model_has_roles.team_id', '=', $organisationId);
                })
                ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
                ->where('organisation_user.organisation_id', $organisationId)
                ->select('users.id', 'users.name', 'users.email', 'roles.name as role')
                ->distinct()
                ->get();

            if ($request->input('user_id')) {
                $selectedUserId = $request->input('user_id');
            }
        } elseif ($userRole === 'Manager') {
            // Managers can view all users except Admins
            $organisationUsers = \DB::table('users')
                ->join('organisation_user', 'users.id', '=', 'organisation_user.user_id')
                ->join('model_has_roles', function ($join) use ($organisationId) {
                    $join->on('users.id', '=', 'model_has_roles.model_id')
                        ->where('model_has_roles.model_type', '=', \App\Models\User::class)
                        ->where('model_has_roles.team_id', '=', $organisationId);
                })
                ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
                ->where('organisation_user.organisation_id', $organisationId)
                ->where('roles.name', '!=', 'Admin')
                ->select('users.id', 'users.name', 'users.email', 'roles.name as role')
                ->distinct()
                ->get();

            if ($request->input('user_id')) {
                $selectedUserId = $request->input('user_id');
            }
        }
        // User role: can only view themselves, no user selection

        // Get time entries for the selected user and week
        $timeEntries = TimeEntry::query()
            ->where('organisation_id', $organisationId)
            ->where('user_id', $selectedUserId)
            ->whereBetween('date', [$weekStart->toDateString(), $weekEnd->toDateString()])
            ->with(['service.customer', 'task'])
            ->orderBy('date')
            ->orderBy('created_at')
            ->get()
            ->groupBy(function($entry) {
                return $entry->date->format('Y-m-d');
            });

        // Get active services - filter based on user role
        $servicesQuery = Service::where('organisation_id', $organisationId)
            ->where('status', 'Active')
            ->with(['customer', 'tasks' => fn($q) => $q->where('is_active', true)]);

        // Non-admin users only see services they're assigned to
        if ($userRole !== 'Admin') {
            $servicesQuery->whereHas('users', function($q) use ($selectedUserId) {
                $q->where('users.id', $selectedUserId);
            });
        }

        $services = $servicesQuery->orderBy('name')->get();

        // Check for running timer for the selected user
        $runningTimer = TimeEntry::where('organisation_id', $organisationId)
            ->where('user_id', $selectedUserId)
            ->where('timer_running', true)
            ->with(['service.customer', 'task'])
            ->first();

        // Calculate navigation dates
        $previousWeek = $weekStart->copy()->subWeek()->toDateString();
        $nextWeek = $weekStart->copy()->addWeek()->toDateString();
        $isCurrentWeek = $weekStart->isSameWeek(\Carbon\Carbon::now());

        // Calculate daily and weekly totals
        $dailyTotals = [];
        for ($date = $weekStart->copy(); $date->lte($weekEnd); $date->addDay()) {
            $dateString = $date->format('Y-m-d');
            $total = $timeEntries->get($dateString)?->sum('duration_hours') ?? 0;
            $dailyTotals[$dateString] = $total;
        }
        $weeklyTotal = array_sum($dailyTotals);

        return Inertia::render('timesheet/entries/index', [
            'timeEntries' => $timeEntries,
            'services' => $services,
            'runningTimer' => $runningTimer,
            'weekStart' => $weekStart->toDateString(),
            'weekEnd' => $weekEnd->toDateString(),
            'previousWeek' => $previousWeek,
            'nextWeek' => $nextWeek,
            'isCurrentWeek' => $isCurrentWeek,
            'dailyTotals' => $dailyTotals,
            'weeklyTotal' => $weeklyTotal,
            'currentUserRole' => $userRole,
            'organisationUsers' => $organisationUsers,
            'selectedUserId' => $selectedUserId,
        ]);
    }

    public function create(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;
        $currentUserId = Auth::id();

        // Get current user's role for the organisation
        $userRole = \DB::table('model_has_roles')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('model_has_roles.model_type', \App\Models\User::class)
            ->where('model_has_roles.model_id', $currentUserId)
            ->where('model_has_roles.team_id', $organisationId)
            ->value('roles.name');

        // Get active services - filter based on user role
        $servicesQuery = Service::where('organisation_id', $organisationId)
            ->where('status', 'Active')
            ->with(['customer', 'tasks' => fn($q) => $q->where('is_active', true)]);

        // Non-admin users only see services they're assigned to
        if ($userRole !== 'Admin') {
            $servicesQuery->whereHas('users', function($q) use ($currentUserId) {
                $q->where('users.id', $currentUserId);
            });
        }

        $services = $servicesQuery->orderBy('name')->get();

        return Inertia::render('timesheet/entries/create', [
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|uuid|exists:timesheet_services,id',
            'task_id' => 'required|uuid|exists:timesheet_tasks,id',
            'date' => 'required|date',
            'duration_hours' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
            'billable' => 'boolean',
        ]);

        $organisationId = $this->getCurrentDirectOrganisation()->id;
        $userId = Auth::id();

        // Load service and task to get rate and customer info
        $service = Service::findOrFail($validated['service_id']);
        $task = Task::findOrFail($validated['task_id']);

        // Determine hourly rate (priority: task override > service default > 0)
        $hourlyRate = $task->hourly_rate_override ?? $service->default_hourly_rate ?? 0;

        // Determine billable status (default from task if not provided)
        $billable = $validated['billable'] ?? $task->billable;

        $timeEntry = TimeEntry::create([
            'organisation_id' => $organisationId,
            'user_id' => $userId,
            'service_id' => $service->id,
            'task_id' => $task->id,
            'customer_id' => $service->customer_id,
            'project_id' => $service->project_id,
            'date' => $validated['date'],
            'duration_hours' => $validated['duration_hours'],
            'description' => $validated['description'] ?? null,
            'billable' => $billable,
            'hourly_rate' => $hourlyRate,
        ]);

        // Update budget period hours_used
        $this->updateBudgetPeriodUsage($service, $validated['date'], $validated['duration_hours'], $hourlyRate);

        return back()->with('success', 'Time entry created successfully.');
    }

    public function startTimer(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|uuid|exists:timesheet_services,id',
            'task_id' => 'required|uuid|exists:timesheet_tasks,id',
            'description' => 'nullable|string',
        ]);

        $organisationId = $this->getCurrentDirectOrganisation()->id;
        $userId = Auth::id();

        // Check if user already has a running timer
        $existingTimer = TimeEntry::where('organisation_id', $organisationId)
            ->where('user_id', $userId)
            ->where('timer_running', true)
            ->first();

        if ($existingTimer) {
            return back()->withErrors(['error' => 'You already have a running timer. Please stop it first.']);
        }

        // Load service and task
        $service = Service::findOrFail($validated['service_id']);
        $task = Task::findOrFail($validated['task_id']);

        $hourlyRate = $task->hourly_rate_override ?? $service->default_hourly_rate ?? 0;

        $timeEntry = TimeEntry::create([
            'organisation_id' => $organisationId,
            'user_id' => $userId,
            'service_id' => $service->id,
            'task_id' => $task->id,
            'customer_id' => $service->customer_id,
            'project_id' => $service->project_id,
            'date' => now()->toDateString(),
            'start_time' => now(),
            'duration_hours' => 0,
            'description' => $validated['description'] ?? null,
            'billable' => $task->billable,
            'hourly_rate' => $hourlyRate,
            'timer_running' => true,
        ]);

        return back()->with('success', 'Timer started successfully.');
    }

    public function stopTimer(Request $request, TimeEntry $timeEntry)
    {
        if ($timeEntry->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        if ($timeEntry->user_id !== Auth::id()) {
            abort(403, 'You can only stop your own timer.');
        }

        if (!$timeEntry->timer_running) {
            return back()->withErrors(['error' => 'This timer is not running.']);
        }

        $validated = $request->validate([
            'description' => 'nullable|string',
        ]);

        // Stop timer and calculate duration
        $timeEntry->end_time = now();
        $timeEntry->duration_hours = $timeEntry->start_time->diffInHours($timeEntry->end_time, true);
        $timeEntry->timer_running = false;

        if (isset($validated['description'])) {
            $timeEntry->description = $validated['description'];
        }

        $timeEntry->save();

        // Update budget period usage
        $this->updateBudgetPeriodUsage(
            $timeEntry->service,
            $timeEntry->date,
            $timeEntry->duration_hours,
            $timeEntry->hourly_rate
        );

        return back()->with('success', 'Timer stopped successfully.');
    }

    public function edit(Request $request, TimeEntry $timeEntry)
    {
        if ($timeEntry->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        if ($timeEntry->user_id !== Auth::id()) {
            abort(403, 'You can only edit your own time entries.');
        }

        $organisationId = $this->getCurrentDirectOrganisation()->id;
        $currentUserId = Auth::id();

        // Get current user's role for the organisation
        $userRole = \DB::table('model_has_roles')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('model_has_roles.model_type', \App\Models\User::class)
            ->where('model_has_roles.model_id', $currentUserId)
            ->where('model_has_roles.team_id', $organisationId)
            ->value('roles.name');

        // Get active services - filter based on user role
        $servicesQuery = Service::where('organisation_id', $organisationId)
            ->where('status', 'Active')
            ->with(['customer', 'tasks' => fn($q) => $q->where('is_active', true)]);

        // Non-admin users only see services they're assigned to
        if ($userRole !== 'Admin') {
            $servicesQuery->whereHas('users', function($q) use ($currentUserId) {
                $q->where('users.id', $currentUserId);
            });
        }

        $services = $servicesQuery->orderBy('name')->get();

        return Inertia::render('timesheet/entries/edit', [
            'timeEntry' => $timeEntry->load(['service', 'task']),
            'services' => $services,
        ]);
    }

    public function update(Request $request, TimeEntry $timeEntry)
    {
        if ($timeEntry->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        if ($timeEntry->user_id !== Auth::id()) {
            abort(403, 'You can only edit your own time entries.');
        }

        if ($timeEntry->timer_running) {
            return back()->withErrors(['error' => 'Cannot edit a running timer. Please stop it first.']);
        }

        $validated = $request->validate([
            'service_id' => 'required|uuid|exists:timesheet_services,id',
            'task_id' => 'required|uuid|exists:timesheet_tasks,id',
            'date' => 'required|date',
            'duration_hours' => 'required|numeric|min:0.01',
            'description' => 'nullable|string',
            'billable' => 'boolean',
        ]);

        $oldDuration = $timeEntry->duration_hours;
        $oldDate = $timeEntry->date;

        $timeEntry->update($validated);

        // Update budget period - remove old usage and add new
        if ($oldDate != $validated['date'] || $oldDuration != $validated['duration_hours']) {
            $this->updateBudgetPeriodUsage($timeEntry->service, $oldDate, -$oldDuration, $timeEntry->hourly_rate);
            $this->updateBudgetPeriodUsage($timeEntry->service, $validated['date'], $validated['duration_hours'], $timeEntry->hourly_rate);
        }

        return back()->with('success', 'Time entry updated successfully.');
    }

    public function destroy(Request $request, TimeEntry $timeEntry)
    {
        if ($timeEntry->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        if ($timeEntry->user_id !== Auth::id()) {
            abort(403, 'You can only delete your own time entries.');
        }

        // Update budget period - remove usage
        $this->updateBudgetPeriodUsage($timeEntry->service, $timeEntry->date, -$timeEntry->duration_hours, $timeEntry->hourly_rate);

        $timeEntry->delete();

        return back()->with('success', 'Time entry deleted successfully.');
    }

    protected function updateBudgetPeriodUsage(Service $service, $date, $hours, $rate): void
    {
        $period = $service->budgetPeriods()
            ->where('period_start', '<=', $date)
            ->where('period_end', '>=', $date)
            ->first();

        if ($period) {
            $period->hours_used += $hours;
            $period->amount_used += ($hours * $rate);
            $period->save();
        }
    }
}
