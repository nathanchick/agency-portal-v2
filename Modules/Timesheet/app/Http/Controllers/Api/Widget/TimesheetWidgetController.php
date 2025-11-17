<?php

namespace Modules\Timesheet\Http\Controllers\Api\Widget;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Timesheet\Models\TimeEntry;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * Timesheet Widget API Controller
 *
 * Provides data endpoints for dashboard widgets related to timesheets.
 * These endpoints are designed to be lightweight and return minimal data
 * optimized for widget display.
 */
class TimesheetWidgetController extends Controller
{
    /**
     * Get weekly summary for the widget
     *
     * Returns aggregated timesheet data for the current week including:
     * - Total hours worked
     * - Billable vs non-billable hours
     * - Daily breakdown
     * - Service/Customer/Project summary
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function weeklySummary(Request $request): JsonResponse
    {
        // Validate request parameters
        $validated = $request->validate([
            'group_by' => ['sometimes', 'string', 'in:day,service,customer'],
        ]);

        $groupBy = $validated['group_by'] ?? 'day';

        // Get current organisation or customer context
        $organisationId = session('current_organisation_id');
        $customerId = session('current_customer_id');
        $userId = auth()->id();

        if (!$organisationId && !$customerId) {
            return response()->json([
                'error' => 'No organisation or customer context',
            ], 400);
        }

        // Get current week date range (Monday to Sunday)
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();

        // Build base query
        $query = TimeEntry::query()
            ->whereBetween('date', [$startOfWeek->toDateString(), $endOfWeek->toDateString()]);

        // Apply context filter
        if ($customerId) {
            // Customer users see only their customer's entries
            $query->where('customer_id', $customerId);
        } elseif ($organisationId) {
            // Organisation users see all entries for their organisation
            $query->where('organisation_id', $organisationId);
            // Optionally filter by current user if not Admin/Manager
            // For now, show all organisation entries
        }

        // Get all entries with relationships
        $entries = $query->with(['service:id,name', 'customer:id,name', 'project:id,name'])
            ->select([
                'id',
                'date',
                'service_id',
                'customer_id',
                'project_id',
                'duration_hours',
                'billable',
                'description',
            ])
            ->get();

        // Calculate totals
        $totalHours = $entries->sum('duration_hours');
        $billableHours = $entries->where('billable', true)->sum('duration_hours');
        $nonBillableHours = $entries->where('billable', false)->sum('duration_hours');

        // Daily summary
        $dailySummary = $entries->groupBy(fn($entry) => $entry->date->toDateString())
            ->map(function ($dayEntries, $date) {
                return [
                    'date' => $date,
                    'total_hours' => round($dayEntries->sum('duration_hours'), 2),
                    'billable_hours' => round($dayEntries->where('billable', true)->sum('duration_hours'), 2),
                    'non_billable_hours' => round($dayEntries->where('billable', false)->sum('duration_hours'), 2),
                    'entries_count' => $dayEntries->count(),
                ];
            })
            ->values()
            ->sortBy('date')
            ->values()
            ->all();

        // Service/Customer/Project summary based on group_by
        $serviceSummary = [];
        if ($groupBy === 'service') {
            $serviceSummary = $entries->groupBy('service_id')
                ->map(function ($serviceEntries) {
                    $service = $serviceEntries->first()->service;
                    return [
                        'id' => $service?->id ?? 'unknown',
                        'name' => $service?->name ?? 'No Service',
                        'hours' => round($serviceEntries->sum('duration_hours'), 2),
                        'type' => 'service',
                    ];
                })
                ->values()
                ->sortByDesc('hours')
                ->values()
                ->all();
        } elseif ($groupBy === 'customer') {
            $serviceSummary = $entries->groupBy('customer_id')
                ->map(function ($customerEntries) {
                    $customer = $customerEntries->first()->customer;
                    return [
                        'id' => $customer?->id ?? 'unknown',
                        'name' => $customer?->name ?? 'No Customer',
                        'hours' => round($customerEntries->sum('duration_hours'), 2),
                        'type' => 'customer',
                    ];
                })
                ->values()
                ->sortByDesc('hours')
                ->values()
                ->all();
        } else {
            // Default: group by project
            $serviceSummary = $entries->groupBy('project_id')
                ->map(function ($projectEntries) {
                    $project = $projectEntries->first()->project;
                    $customer = $projectEntries->first()->customer;
                    return [
                        'id' => $project?->id ?? $customer?->id ?? 'unknown',
                        'name' => $project?->name ?? $customer?->name ?? 'No Project',
                        'hours' => round($projectEntries->sum('duration_hours'), 2),
                        'type' => 'project',
                    ];
                })
                ->values()
                ->sortByDesc('hours')
                ->values()
                ->all();
        }

        // Transform entries for widget consumption (minimal data)
        $entriesData = $entries->map(function ($entry) {
            return [
                'id' => $entry->id,
                'date' => $entry->date->toDateString(),
                'service' => $entry->service ? [
                    'id' => $entry->service->id,
                    'name' => $entry->service->name,
                ] : null,
                'customer' => $entry->customer ? [
                    'id' => $entry->customer->id,
                    'name' => $entry->customer->name,
                ] : null,
                'project' => $entry->project ? [
                    'id' => $entry->project->id,
                    'name' => $entry->project->name,
                ] : null,
                'duration_hours' => round($entry->duration_hours, 2),
                'billable' => $entry->billable,
                'description' => $entry->description,
            ];
        });

        return response()->json([
            'current_week' => [
                'start_date' => $startOfWeek->toDateString(),
                'end_date' => $endOfWeek->toDateString(),
            ],
            'total_hours' => round($totalHours, 2),
            'billable_hours' => round($billableHours, 2),
            'non_billable_hours' => round($nonBillableHours, 2),
            'standard_hours' => 40, // Standard 40-hour work week
            'daily_summary' => $dailySummary,
            'service_summary' => $serviceSummary,
            'entries' => $entriesData,
        ]);
    }
}
