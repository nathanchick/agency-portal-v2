<?php

namespace Modules\Timesheet\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Customer\Models\Customer;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\Task;
use Modules\Timesheet\Services\ReportService;

class ReportController extends Controller
{
    use HasCurrentOrganisation;

    protected ReportService $reportService;

    public function __construct(ReportService $reportService)
    {
        $this->reportService = $reportService;
    }

    public function index(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        // Get filter options
        $customers = Customer::where('organisation_id', $organisationId)
            ->orderBy('name')
            ->get(['id', 'name']);

        $services = Service::where('organisation_id', $organisationId)
            ->with('customer:id,name')
            ->orderBy('name')
            ->get(['id', 'name', 'customer_id']);

        $tasks = Task::where('organisation_id', $organisationId)
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $users = $this->getCurrentDirectOrganisation()->users()
            ->orderBy('name')
            ->get(['id', 'name', 'email']);

        return Inertia::render('timesheet/reports/index', [
            'customers' => $customers,
            'services' => $services,
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }

    public function generate(Request $request)
    {
        $validated = $request->validate([
            'time_frame' => 'required|in:current_period,last_period,this_month,last_month,this_year,last_year,custom',
            'start_date' => 'required_if:time_frame,custom|nullable|date',
            'end_date' => 'required_if:time_frame,custom|nullable|date|after_or_equal:start_date',
            'customer_ids' => 'nullable|array',
            'customer_ids.*' => 'uuid|exists:customers,id',
            'service_ids' => 'nullable|array',
            'service_ids.*' => 'uuid|exists:timesheet_services,id',
            'task_ids' => 'nullable|array',
            'task_ids.*' => 'uuid|exists:timesheet_tasks,id',
            'user_ids' => 'nullable|array',
            'user_ids.*' => 'uuid|exists:users,id',
            'service_id_for_period' => 'required_if:time_frame,current_period,last_period|nullable|uuid|exists:timesheet_services,id',
        ]);

        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $reportData = $this->reportService->generateReport($validated, $organisationId);

        return response()->json($reportData);
    }

    public function export(Request $request)
    {
        $validated = $request->validate([
            'time_frame' => 'required|in:current_period,last_period,this_month,last_month,this_year,last_year,custom',
            'start_date' => 'required_if:time_frame,custom|nullable|date',
            'end_date' => 'required_if:time_frame,custom|nullable|date|after_or_equal:start_date',
            'customer_ids' => 'nullable|array',
            'customer_ids.*' => 'uuid|exists:customers,id',
            'service_ids' => 'nullable|array',
            'service_ids.*' => 'uuid|exists:timesheet_services,id',
            'task_ids' => 'nullable|array',
            'task_ids.*' => 'uuid|exists:timesheet_tasks,id',
            'user_ids' => 'nullable|array',
            'user_ids.*' => 'uuid|exists:users,id',
            'service_id_for_period' => 'required_if:time_frame,current_period,last_period|nullable|uuid|exists:timesheet_services,id',
            'format' => 'required|in:csv,pdf',
        ]);

        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($validated['format'] === 'csv') {
            $csv = $this->reportService->exportToCsv($validated, $organisationId);
            $filename = $this->reportService->getExportFilename($validated) . '.csv';

            return response()->streamDownload(function () use ($csv) {
                echo $csv;
            }, $filename, [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => "attachment; filename=\"$filename\"",
            ]);
        }

        // PDF export would go here in the future
        return response()->json(['error' => 'PDF export not yet implemented'], 501);
    }
}
