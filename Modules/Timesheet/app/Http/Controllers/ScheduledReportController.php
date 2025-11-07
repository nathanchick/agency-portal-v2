<?php

namespace Modules\Timesheet\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Timesheet\Models\SavedTimesheetReport;
use Modules\Timesheet\Models\ScheduledTimesheetReport;

class ScheduledReportController extends Controller
{
    use HasCurrentOrganisation;

    public function index(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $scheduledReports = ScheduledTimesheetReport::forOrganisation($organisationId)
            ->with([
                'savedReport:id,name,description',
                'createdBy:id,name,email',
            ])
            ->orderBy('created_at', 'desc')
            ->get();

        // Get available saved reports for creating new schedules
        $userId = auth()->id();
        $savedReports = SavedTimesheetReport::accessibleBy($userId, $organisationId)
            ->orderBy('name')
            ->get(['id', 'name', 'description']);

        return Inertia::render('timesheet/reports/scheduled', [
            'scheduledReports' => $scheduledReports,
            'savedReports' => $savedReports,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'saved_report_id' => 'required|uuid|exists:timesheet_saved_reports,id',
            'recipients' => 'required|array|min:1',
            'recipients.*' => 'required|email',
            'schedule_frequency' => 'required|in:daily,weekly,monthly',
            'schedule_day' => 'nullable|integer|min:0|max:31',
            'schedule_time' => 'required|date_format:H:i',
            'format' => 'required|in:csv,pdf',
        ]);

        $organisationId = $this->getCurrentDirectOrganisation()->id;

        // Verify saved report belongs to this organisation
        $savedReport = SavedTimesheetReport::findOrFail($validated['saved_report_id']);
        if ($savedReport->organisation_id !== $organisationId) {
            abort(403, 'Saved report does not belong to your organisation.');
        }

        // Validate schedule_day based on frequency
        if ($validated['schedule_frequency'] === 'weekly') {
            $request->validate([
                'schedule_day' => 'required|integer|min:0|max:6', // 0 = Sunday, 6 = Saturday
            ]);
        } elseif ($validated['schedule_frequency'] === 'monthly') {
            $request->validate([
                'schedule_day' => 'required|integer|min:1|max:31', // Day of month
            ]);
        }

        $scheduledReport = new ScheduledTimesheetReport([
            'organisation_id' => $organisationId,
            'saved_report_id' => $validated['saved_report_id'],
            'created_by' => auth()->id(),
            'recipients' => $validated['recipients'],
            'schedule_frequency' => $validated['schedule_frequency'],
            'schedule_day' => $validated['schedule_day'] ?? null,
            'schedule_time' => $validated['schedule_time'],
            'format' => $validated['format'],
            'is_active' => true,
        ]);

        // Calculate next run time
        $scheduledReport->next_run_at = $scheduledReport->calculateNextRun();
        $scheduledReport->save();

        return back()->with('success', 'Scheduled report created successfully.');
    }

    public function update(Request $request, ScheduledTimesheetReport $scheduledReport)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($scheduledReport->organisation_id !== $organisationId) {
            abort(403);
        }

        // Only creator can update
        if ($scheduledReport->created_by !== auth()->id()) {
            abort(403, 'Only the schedule creator can update it.');
        }

        $validated = $request->validate([
            'recipients' => 'required|array|min:1',
            'recipients.*' => 'required|email',
            'schedule_frequency' => 'required|in:daily,weekly,monthly',
            'schedule_day' => 'nullable|integer|min:0|max:31',
            'schedule_time' => 'required|date_format:H:i',
            'format' => 'required|in:csv,pdf',
        ]);

        // Validate schedule_day based on frequency
        if ($validated['schedule_frequency'] === 'weekly') {
            $request->validate([
                'schedule_day' => 'required|integer|min:0|max:6',
            ]);
        } elseif ($validated['schedule_frequency'] === 'monthly') {
            $request->validate([
                'schedule_day' => 'required|integer|min:1|max:31',
            ]);
        }

        $scheduledReport->update($validated);

        // Recalculate next run time if schedule changed
        $scheduledReport->next_run_at = $scheduledReport->calculateNextRun();
        $scheduledReport->save();

        return back()->with('success', 'Scheduled report updated successfully.');
    }

    public function destroy(ScheduledTimesheetReport $scheduledReport)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($scheduledReport->organisation_id !== $organisationId) {
            abort(403);
        }

        // Only creator can delete
        if ($scheduledReport->created_by !== auth()->id()) {
            abort(403, 'Only the schedule creator can delete it.');
        }

        $scheduledReport->delete();

        return back()->with('success', 'Scheduled report deleted successfully.');
    }

    public function toggle(Request $request, ScheduledTimesheetReport $scheduledReport)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($scheduledReport->organisation_id !== $organisationId) {
            abort(403);
        }

        // Only creator can toggle
        if ($scheduledReport->created_by !== auth()->id()) {
            abort(403, 'Only the schedule creator can toggle it.');
        }

        $scheduledReport->update([
            'is_active' => !$scheduledReport->is_active,
        ]);

        $status = $scheduledReport->is_active ? 'activated' : 'deactivated';

        return back()->with('success', "Scheduled report {$status} successfully.");
    }
}
