<?php

namespace Modules\Ticket\Http\Controllers\Api\Widget;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Ticket\Models\Ticket;

/**
 * Ticket Widget API Controller
 *
 * Provides data endpoints for dashboard widgets related to tickets.
 * These endpoints are designed to be lightweight and return minimal data
 * optimized for widget display.
 */
class TicketWidgetController extends Controller
{
    /**
     * Get recent tickets for the widget
     *
     * Returns a list of recent tickets filtered by status and limited to
     * a configurable number. The results are scoped to the current organisation.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function recent(Request $request): JsonResponse
    {
        // Validate request parameters
        $validated = $request->validate([
            'limit' => ['sometimes', 'integer', 'min:5', 'max:50'],
            'status' => ['sometimes', 'string', 'in:all,open,closed'],
        ]);

        $limit = $validated['limit'] ?? 10;
        $statusFilter = $validated['status'] ?? 'open';

        // Get current organisation ID from session
        $organisationId = session('current_organisation_id');

        if (!$organisationId) {
            return response()->json([
                'error' => 'No organisation context',
                'tickets' => [],
            ], 400);
        }

        // Build query
        $query = Ticket::query()
            ->where('organisation_id', $organisationId)
            ->with(['customer:id,name'])
            ->select([
                'id',
                'title',
                'status',
                'priority',
                'customer_id',
                'created_at',
                'updated_at',
            ])
            ->orderBy('created_at', 'desc');

        // Apply status filter
        if ($statusFilter === 'open') {
            $query->where('is_resolved', false);
        } elseif ($statusFilter === 'closed') {
            $query->where('is_resolved', true);
        }
        // 'all' means no status filter

        // Limit results
        $tickets = $query->limit($limit)->get();

        // Transform data for widget consumption
        $ticketData = $tickets->map(function ($ticket) {
            return [
                'id' => $ticket->id,
                'title' => $ticket->title,
                'status' => $ticket->status ?? 'open',
                'priority' => $ticket->priority ?? 'medium',
                'customer' => $ticket->customer ? [
                    'id' => $ticket->customer->id,
                    'name' => $ticket->customer->name,
                ] : null,
                'created_at' => $ticket->created_at->toIso8601String(),
                'updated_at' => $ticket->updated_at->toIso8601String(),
            ];
        });

        return response()->json([
            'tickets' => $ticketData,
        ]);
    }

    /**
     * Get ticket statistics for the widget
     *
     * Returns aggregated ticket metrics for display in statistics widgets.
     * Metrics include counts by status, priority, and time-based trends.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function statistics(Request $request): JsonResponse
    {
        // Validate request parameters
        $validated = $request->validate([
            'date_range' => ['sometimes', 'integer', 'in:7,30,90'],
        ]);

        $dateRange = $validated['date_range'] ?? 30;

        // Get current organisation ID from session
        $organisationId = session('current_organisation_id');

        if (!$organisationId) {
            return response()->json([
                'error' => 'No organisation context',
                'statistics' => [],
            ], 400);
        }

        $startDate = now()->subDays($dateRange);

        // Get base query for the time period
        $baseQuery = Ticket::where('organisation_id', $organisationId)
            ->where('created_at', '>=', $startDate);

        // Get total count
        $total = (clone $baseQuery)->count();

        // Get counts by status
        $openCount = (clone $baseQuery)->where('is_resolved', false)->count();
        $closedCount = (clone $baseQuery)->where('is_resolved', true)->count();

        // Calculate in_progress and pending (if applicable)
        // Assuming status field exists and has these values
        $inProgressCount = (clone $baseQuery)
            ->where('is_resolved', false)
            ->where('status', 'in_progress')
            ->count();
        $pendingCount = (clone $baseQuery)
            ->where('is_resolved', false)
            ->where('status', 'pending')
            ->count();

        // Calculate statistics
        $stats = [
            'total' => $total,
            'by_status' => [
                'open' => $openCount,
                'closed' => $closedCount,
                'in_progress' => $inProgressCount,
                'pending' => $pendingCount,
            ],
            'by_priority' => [
                'low' => (clone $baseQuery)->where('priority', 'low')->count(),
                'medium' => (clone $baseQuery)->where('priority', 'medium')->count(),
                'high' => (clone $baseQuery)->where('priority', 'high')->count(),
                'critical' => (clone $baseQuery)->where('priority', 'critical')->count(),
            ],
        ];

        return response()->json([
            'stats' => $stats,
            'date_range' => "{$dateRange} days",
        ]);
    }
}
