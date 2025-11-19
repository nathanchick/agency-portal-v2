<?php

namespace Modules\Timesheet\Http\Controllers\Api\Extension;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Timesheet\Http\Requests\Api\Extension\CreateEntryRequest;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\TimeEntry;

class TimesheetExtensionController extends Controller
{
    /**
     * Get user's assigned services (lightweight response for extension)
     */
    public function services(Request $request): JsonResponse
    {
        $user = $request->user();
        $organisationId = $user->current_organisation_id;

        $services = Service::query()
            ->where('organisation_id', $organisationId)
            ->where('status', 'Active')
            ->whereHas('users', function ($query) use ($user) {
                $query->where('users.id', $user->id);
            })
            ->with([
                'customer:id,name',
                'project:id,name,github_repository_id',
                'project.githubRepository:id,full_name,html_url',
                'tasks' => fn ($query) => $query->where('is_active', true)->orderBy('name'),
            ])
            ->orderBy('name')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'customer_name' => $service->customer?->name ?? 'No Customer',
                    'project_name' => $service->project?->name,
                    'billing_type' => $service->billing_type,
                    'github_repo' => $service->project?->githubRepository?->full_name,
                    'tasks' => $service->tasks->map(fn ($task) => [
                        'id' => $task->id,
                        'name' => $task->name,
                        'billable' => $task->billable,
                    ]),
                ];
            });

        return response()->json([
            'services' => $services,
        ]);
    }

    /**
     * Get recent time entries for the user
     */
    public function recentEntries(Request $request): JsonResponse
    {
        $user = $request->user();
        $limit = $request->input('limit', 10);

        $entries = TimeEntry::query()
            ->where('user_id', $user->id)
            ->where('organisation_id', $user->current_organisation_id)
            ->with(['service:id,name', 'customer:id,name', 'task:id,name'])
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($entry) {
                return [
                    'id' => $entry->id,
                    'service_id' => $entry->service_id,
                    'service_name' => $entry->service?->name ?? 'Unknown Service',
                    'task_id' => $entry->task_id,
                    'task_name' => $entry->task?->name,
                    'customer_name' => $entry->customer?->name,
                    'duration_hours' => $entry->duration_hours,
                    'date' => $entry->date->format('Y-m-d'),
                    'description' => $entry->description,
                    'created_at' => $entry->created_at->toIso8601String(),
                ];
            });

        return response()->json([
            'entries' => $entries,
        ]);
    }

    /**
     * Create a new time entry
     */
    public function createEntry(CreateEntryRequest $request): JsonResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        // Get the service to populate customer_id and project_id
        $service = Service::findOrFail($validated['service_id']);

        // Create the time entry
        $entry = TimeEntry::create([
            'organisation_id' => $user->current_organisation_id,
            'user_id' => $user->id,
            'service_id' => $validated['service_id'],
            'customer_id' => $service->customer_id,
            'project_id' => $service->project_id,
            'duration_hours' => $validated['duration_hours'],
            'date' => $validated['date'],
            'description' => $validated['description'] ?? null,
            'billable' => $service->billing_type !== 'Non-Billable',
            'hourly_rate' => $service->default_hourly_rate ?? 0,
            'source' => 'extension',
            'timer_running' => false,
        ]);

        // Load relationships for response
        $entry->load(['service:id,name', 'customer:id,name']);

        return response()->json([
            'success' => true,
            'message' => 'Time entry created successfully',
            'entry' => [
                'id' => $entry->id,
                'service_name' => $entry->service->name,
                'customer_name' => $entry->customer?->name,
                'duration_hours' => $entry->duration_hours,
                'date' => $entry->date->format('Y-m-d'),
                'description' => $entry->description,
                'created_at' => $entry->created_at->toIso8601String(),
            ],
        ], 201);
    }

    /**
     * Get user information for the extension
     */
    public function user(Request $request): JsonResponse
    {
        $user = $request->user();
        $user->load('currentOrganisation:id,name');

        $servicesCount = Service::query()
            ->where('organisation_id', $user->current_organisation_id)
            ->whereHas('users', function ($query) use ($user) {
                $query->where('users.id', $user->id);
            })
            ->count();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'organisation' => [
                'id' => $user->currentOrganisation->id,
                'name' => $user->currentOrganisation->name,
            ],
            'services_count' => $servicesCount,
            'timezone' => $user->timezone ?? 'UTC',
            'last_login_at' => $user->last_login_at?->toIso8601String(),
        ]);
    }

    /**
     * Get current running timer for user
     */
    public function currentTimer(Request $request): JsonResponse
    {
        $user = $request->user();

        $runningTimer = TimeEntry::query()
            ->where('user_id', $user->id)
            ->where('organisation_id', $user->current_organisation_id)
            ->where('timer_running', true)
            ->with(['service:id,name', 'task:id,name', 'customer:id,name', 'project:id,name'])
            ->first();

        if (!$runningTimer) {
            return response()->json([
                'running' => false,
                'timer' => null,
            ]);
        }

        return response()->json([
            'running' => true,
            'timer' => [
                'id' => $runningTimer->id,
                'service_id' => $runningTimer->service_id,
                'service_name' => $runningTimer->service->name,
                'task_id' => $runningTimer->task_id,
                'task_name' => $runningTimer->task->name ?? null,
                'customer_name' => $runningTimer->customer->name ?? null,
                'project_name' => $runningTimer->project->name ?? null,
                'description' => $runningTimer->description,
                'started_at' => $runningTimer->start_time->toIso8601String(),
                'elapsed_seconds' => $runningTimer->getElapsedSeconds(),
                'elapsed_formatted' => $runningTimer->getElapsedFormatted(),
            ],
        ]);
    }

    /**
     * Start a new timer
     */
    public function startTimer(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'service_id' => ['required', 'uuid', 'exists:timesheet_services,id'],
            'task_id' => ['required', 'uuid', 'exists:timesheet_tasks,id'],
            'description' => ['nullable', 'string', 'max:1000'],
            'external_reference' => ['nullable', 'array'],
            'external_reference.id' => ['nullable', 'string'],
            'external_reference.group_id' => ['nullable', 'string'],
            'external_reference.permalink' => ['nullable', 'string', 'url'],
            'external_reference.service' => ['nullable', 'string'],
            'external_reference.service_icon_url' => ['nullable', 'string', 'url'],
        ]);

        $user = $request->user();

        // Stop any currently running timer for this user
        TimeEntry::query()
            ->where('user_id', $user->id)
            ->where('organisation_id', $user->current_organisation_id)
            ->where('timer_running', true)
            ->each(function ($entry) {
                $entry->stopTimer();
            });

        // Get the service to populate customer_id, project_id
        $service = Service::findOrFail($validated['service_id']);

        // Validate that the task belongs to this service and is active
        $task = $service->tasks()
            ->where('timesheet_tasks.id', $validated['task_id'])
            ->where('is_active', true)
            ->first();

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid task or task not active for this service.',
            ], 400);
        }

        // Create new time entry with timer running
        $entry = TimeEntry::create([
            'organisation_id' => $user->current_organisation_id,
            'user_id' => $user->id,
            'service_id' => $validated['service_id'],
            'task_id' => $task->id,
            'customer_id' => $service->customer_id,
            'project_id' => $service->project_id,
            'description' => $validated['description'] ?? null,
            'date' => now()->toDateString(),
            'billable' => $service->billing_type !== 'Non-Billable',
            'hourly_rate' => $service->default_hourly_rate ?? 0,
            'source' => 'extension',
            'timer_running' => false, // Will be set to true by startTimer()
            'duration_hours' => 0,
            'external_reference' => $validated['external_reference'] ?? null,
        ]);

        $entry->startTimer();
        $entry->load(['service:id,name', 'task:id,name', 'customer:id,name', 'project:id,name']);

        return response()->json([
            'success' => true,
            'message' => 'Timer started successfully',
            'timer' => [
                'id' => $entry->id,
                'service_id' => $entry->service_id,
                'service_name' => $entry->service->name,
                'task_id' => $entry->task_id,
                'task_name' => $entry->task->name ?? null,
                'customer_name' => $entry->customer->name ?? null,
                'project_name' => $entry->project->name ?? null,
                'description' => $entry->description,
                'started_at' => $entry->start_time->toIso8601String(),
                'elapsed_seconds' => 0,
                'elapsed_formatted' => '00:00:00',
            ],
        ], 201);
    }

    /**
     * Stop a running timer
     */
    public function stopTimer(Request $request, string $timerId): JsonResponse
    {
        $user = $request->user();

        $timer = TimeEntry::query()
            ->where('id', $timerId)
            ->where('user_id', $user->id)
            ->where('organisation_id', $user->current_organisation_id)
            ->where('timer_running', true)
            ->firstOrFail();

        $timer->stopTimer();
        $timer->load(['service:id,name', 'customer:id,name']);

        return response()->json([
            'success' => true,
            'message' => 'Timer stopped successfully',
            'entry' => [
                'id' => $timer->id,
                'service_name' => $timer->service->name,
                'customer_name' => $timer->customer->name ?? null,
                'duration_hours' => $timer->duration_hours,
                'date' => $timer->date->format('Y-m-d'),
                'description' => $timer->description,
                'created_at' => $timer->created_at->toIso8601String(),
            ],
        ]);
    }
}