<?php

namespace Modules\Timesheet\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\Task;

class TaskController extends Controller
{
    use HasCurrentOrganisation;

    public function index(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $tasks = Task::query()
            ->where('organisation_id', $organisationId)
            ->with('services.customer')
            ->when($request->input('is_active') !== null, fn($q) => $q->where('is_active', $request->input('is_active')))
            ->orderBy('name')
            ->paginate(20);

        return Inertia::render('timesheet/tasks/index', [
            'tasks' => $tasks,
            'filters' => $request->only(['is_active']),
        ]);
    }

    public function create(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $services = Service::where('organisation_id', $organisationId)
            ->where('status', 'Active')
            ->with('customer')
            ->orderBy('name')
            ->get(['id', 'name', 'customer_id']);

        return Inertia::render('timesheet/tasks/create', [
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_ids' => 'nullable|array',
            'service_ids.*' => 'uuid|exists:timesheet_services,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'billable' => 'boolean',
            'hourly_rate_override' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $task = Task::create([
            'organisation_id' => $organisationId,
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'billable' => $validated['billable'] ?? true,
            'hourly_rate_override' => $validated['hourly_rate_override'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        // Attach services if provided
        if (!empty($validated['service_ids'])) {
            $task->services()->attach($validated['service_ids']);
        }

        return redirect()->route('timesheet.tasks.index')
            ->with('success', 'Task created successfully.');
    }

    public function edit(Request $request, Task $task)
    {
        if ($task->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $services = Service::where('organisation_id', $organisationId)
            ->where('status', 'Active')
            ->with('customer')
            ->orderBy('name')
            ->get(['id', 'name', 'customer_id']);

        return Inertia::render('timesheet/tasks/edit', [
            'task' => $task->load('services.customer'),
            'services' => $services,
        ]);
    }

    public function update(Request $request, Task $task)
    {
        if ($task->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'service_ids' => 'nullable|array',
            'service_ids.*' => 'uuid|exists:timesheet_services,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'billable' => 'boolean',
            'hourly_rate_override' => 'nullable|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $task->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'billable' => $validated['billable'] ?? true,
            'hourly_rate_override' => $validated['hourly_rate_override'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        // Sync services
        $task->services()->sync($validated['service_ids'] ?? []);

        return redirect()->route('timesheet.tasks.index')
            ->with('success', 'Task updated successfully.');
    }

    public function destroy(Request $request, Task $task)
    {
        if ($task->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $task->delete();

        return redirect()->route('timesheet.tasks.index')
            ->with('success', 'Task deleted successfully.');
    }
}
