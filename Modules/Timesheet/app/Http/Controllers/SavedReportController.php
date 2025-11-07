<?php

namespace Modules\Timesheet\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Timesheet\Models\SavedTimesheetReport;

class SavedReportController extends Controller
{
    use HasCurrentOrganisation;

    public function index(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;
        $userId = auth()->id();

        $savedReports = SavedTimesheetReport::accessibleBy($userId, $organisationId)
            ->with('createdBy:id,name,email')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('timesheet/reports/saved', [
            'savedReports' => $savedReports,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'filters' => 'required|array',
            'is_public' => 'boolean',
        ]);

        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $savedReport = SavedTimesheetReport::create([
            'organisation_id' => $organisationId,
            'created_by' => auth()->id(),
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'filters' => $validated['filters'],
            'is_public' => $validated['is_public'] ?? false,
        ]);

        return back()->with('success', 'Report saved successfully.');
    }

    public function update(Request $request, SavedTimesheetReport $savedReport)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($savedReport->organisation_id !== $organisationId) {
            abort(403);
        }

        // Only creator can update
        if ($savedReport->created_by !== auth()->id()) {
            abort(403, 'Only the report creator can update it.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'filters' => 'required|array',
            'is_public' => 'boolean',
        ]);

        $savedReport->update($validated);

        return back()->with('success', 'Report updated successfully.');
    }

    public function destroy(SavedTimesheetReport $savedReport)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($savedReport->organisation_id !== $organisationId) {
            abort(403);
        }

        // Only creator can delete
        if ($savedReport->created_by !== auth()->id()) {
            abort(403, 'Only the report creator can delete it.');
        }

        $savedReport->delete();

        return back()->with('success', 'Report deleted successfully.');
    }

    public function load(SavedTimesheetReport $savedReport)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;
        $userId = auth()->id();

        if ($savedReport->organisation_id !== $organisationId) {
            abort(403);
        }

        // Check if user has access (creator or public)
        if ($savedReport->created_by !== $userId && !$savedReport->is_public) {
            abort(403, 'You do not have access to this report.');
        }

        return response()->json([
            'filters' => $savedReport->filters,
        ]);
    }
}
