<?php

namespace Modules\Timesheet\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentCustomer;
use Illuminate\Http\Request;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\TimeEntry;
use Modules\Timesheet\Services\CustomerReportService;

class CustomerReportController extends Controller
{
    use HasCurrentCustomer;

    protected $reportService;

    public function __construct(CustomerReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    public function generate($serviceId, Request $request)
    {
        $currentCustomer = $this->getCurrentCustomer();

        if (!$currentCustomer) {
            abort(403, 'No customer associated with this user');
        }

        // Verify service belongs to customer
        $service = Service::where('id', $serviceId)
            ->where('customer_id', $currentCustomer->id)
            ->firstOrFail();

        $validated = $request->validate([
            'time_frame' => 'required|in:this_month,last_month,this_year,last_year,custom',
            'start_date' => 'required_if:time_frame,custom|nullable|date',
            'end_date' => 'required_if:time_frame,custom|nullable|date|after_or_equal:start_date',
        ]);

        $reportData = $this->reportService->generateReport($validated, $serviceId);

        return response()->json($reportData);
    }

    public function export($serviceId, Request $request)
    {
        $currentCustomer = $this->getCurrentCustomer();

        if (!$currentCustomer) {
            abort(403, 'No customer associated with this user');
        }

        $service = Service::where('id', $serviceId)
            ->where('customer_id', $currentCustomer->id)
            ->firstOrFail();

        $validated = $request->validate([
            'time_frame' => 'required|in:this_month,last_month,this_year,last_year,custom',
            'start_date' => 'required_if:time_frame,custom|nullable|date',
            'end_date' => 'required_if:time_frame,custom|nullable|date|after_or_equal:start_date',
        ]);

        $csv = $this->reportService->exportToCsv($validated, $serviceId);
        $filename = 'timesheet-report-' . $service->name . '-' . date('Y-m-d') . '.csv';

        return response()->streamDownload(function () use ($csv) {
            echo $csv;
        }, $filename, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ]);
    }

    public function getExternalReferenceReport($serviceId, Request $request)
    {
        $currentCustomer = $this->getCurrentCustomer();

        if (!$currentCustomer) {
            abort(403, 'No customer associated with this user');
        }

        $service = Service::where('id', $serviceId)
            ->where('customer_id', $currentCustomer->id)
            ->firstOrFail();

        $permalink = $request->input('permalink');

        if (!$permalink) {
            return response()->json(['error' => 'Permalink is required'], 400);
        }

        // Find all entries with this permalink
        // Use JSON search to handle escaped characters properly
        $entries = TimeEntry::where('service_id', $serviceId)
            ->whereNotNull('external_reference')
            ->get()
            ->filter(function ($entry) use ($permalink) {
                $ref = json_decode($entry->external_reference, true);
                return isset($ref['permalink']) && $ref['permalink'] === $permalink;
            })
            ->sortByDesc('date')
            ->values();

        // Load relationships
        $entries->load(['user', 'task']);

        if ($entries->isEmpty()) {
            // Parse the permalink to get service info for empty state
            $parsedUrl = parse_url($permalink);
            $host = $parsedUrl['host'] ?? 'External Service';

            return response()->json([
                'external_reference' => [
                    'service' => $host,
                    'id' => basename($permalink),
                    'permalink' => $permalink,
                ],
                'total_hours' => 0,
                'total_cost' => 0,
                'entry_count' => 0,
                'date_range' => [
                    'start' => now()->format('Y-m-d'),
                    'end' => now()->format('Y-m-d'),
                ],
                'time_entries' => [],
            ]);
        }

        $totalHours = $entries->sum('duration_hours');
        $totalCost = $entries->sum(fn($e) => $e->duration_hours * $e->hourly_rate);

        // Parse external reference from first entry
        $externalRef = json_decode($entries->first()->external_reference, true);

        return response()->json([
            'external_reference' => $externalRef,
            'total_hours' => round($totalHours, 2),
            'total_cost' => round($totalCost, 2),
            'entry_count' => $entries->count(),
            'date_range' => [
                'start' => $entries->last()->date->format('Y-m-d'),
                'end' => $entries->first()->date->format('Y-m-d'),
            ],
            'time_entries' => $entries,
        ]);
    }
}
