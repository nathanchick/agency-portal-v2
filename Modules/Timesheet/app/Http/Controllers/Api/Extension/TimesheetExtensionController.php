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
            ->with(['customer:id,name', 'project:id,name'])
            ->orderBy('name')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'customer_name' => $service->customer?->name ?? 'No Customer',
                    'project_name' => $service->project?->name,
                    'billing_type' => $service->billing_type,
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
            ->with(['service:id,name', 'customer:id,name'])
            ->orderBy('date', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get()
            ->map(function ($entry) {
                return [
                    'id' => $entry->id,
                    'service_name' => $entry->service?->name ?? 'Unknown Service',
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
}