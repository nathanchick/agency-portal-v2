<?php

namespace Modules\Timesheet\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\ServiceBudgetChange;
use Modules\Timesheet\Models\ServiceBudgetPeriod;

class ServiceBudgetPeriodController extends Controller
{
    use HasCurrentOrganisation;

    public function index(Request $request, Service $service)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $periods = $service->budgetPeriods()
            ->orderBy('period_start', 'desc')
            ->with(['reconciledBy'])
            ->paginate(20);

        // Get unreconciled periods that have ended
        $unreconciledPeriods = $service->budgetPeriods()
            ->where('reconciled', false)
            ->where('period_end', '<', now()->toDateString())
            ->orderBy('period_end', 'asc')
            ->get();

        return Inertia::render('timesheet/budget-periods/index', [
            'service' => $service->load(['customer', 'project', 'serviceManager']),
            'periods' => $periods,
            'unreconciledPeriods' => $unreconciledPeriods,
        ]);
    }

    public function show(Request $request, Service $service, ServiceBudgetPeriod $period)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        if ($period->service_id !== $service->id) {
            abort(404);
        }

        // Get time entries for this period
        $timeEntries = $service->timeEntries()
            ->whereBetween('date', [$period->period_start, $period->period_end])
            ->with(['user', 'task'])
            ->orderBy('date', 'desc')
            ->get();

        // Get related budget changes
        $budgetChanges = $service->budgetChanges()
            ->where('effective_from', '<=', $period->period_end)
            ->where(function ($q) use ($period) {
                $q->whereNull('effective_to')
                    ->orWhere('effective_to', '>=', $period->period_start);
            })
            ->orderBy('effective_from', 'desc')
            ->get();

        return Inertia::render('timesheet/budget-periods/show', [
            'service' => $service->load(['customer', 'project', 'serviceManager']),
            'period' => $period->load(['reconciledBy']),
            'timeEntries' => $timeEntries,
            'budgetChanges' => $budgetChanges,
        ]);
    }

    public function reconcile(Request $request, Service $service, ServiceBudgetPeriod $period)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        if ($period->service_id !== $service->id) {
            abort(404);
        }

        if ($period->reconciled) {
            return back()->withErrors(['error' => 'This period has already been reconciled.']);
        }

        if ($period->period_end >= now()->toDateString()) {
            return back()->withErrors(['error' => 'Cannot reconcile a period that has not ended yet.']);
        }

        $remainingHours = $period->remaining_hours;
        $isOverBudget = $period->isOverBudget();
        $overageHours = $isOverBudget ? abs($remainingHours) : 0;
        $unusedHours = !$isOverBudget && $remainingHours > 0 ? $remainingHours : 0;

        // Determine valid actions based on budget status
        $validActions = $this->getValidReconciliationActions($isOverBudget, $unusedHours, $overageHours);

        $validated = $request->validate([
            'reconciliation_action' => 'required|in:' . implode(',', $validActions),
            'reconciliation_notes' => 'nullable|string',
        ]);

        if (!in_array($validated['reconciliation_action'], $validActions)) {
            return back()->withErrors(['reconciliation_action' => 'This action is not valid for the current budget status.']);
        }

        // Mark current period as reconciled
        $period->update([
            'reconciled' => true,
            'reconciliation_action' => $validated['reconciliation_action'],
            'reconciliation_notes' => $validated['reconciliation_notes'] ?? null,
            'reconciled_at' => now(),
            'reconciled_by_user_id' => Auth::id(),
        ]);

        // Handle rollover/deduction to next period
        if (in_array($validated['reconciliation_action'], ['rollover', 'deduct_next'])) {
            $nextPeriod = $this->getOrCreateNextPeriod($service, $period);

            if ($validated['reconciliation_action'] === 'rollover' && $unusedHours > 0) {
                $period->hours_rollover_to_next = $unusedHours;
                $period->save();

                $nextPeriod->hours_rollover_from_previous += $unusedHours;
                $nextPeriod->save();
            }

            if ($validated['reconciliation_action'] === 'deduct_next' && $overageHours > 0) {
                $period->hours_rollover_to_next = -$overageHours;
                $period->save();

                $nextPeriod->hours_rollover_from_previous -= $overageHours;
                $nextPeriod->save();
            }
        }

        return redirect()->route('timesheet.services.budget-periods.index', $service)
            ->with('success', 'Period reconciled successfully.');
    }

    public function ledger(Request $request, Service $service)
    {
        if ($service->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        // Get all periods with time entries aggregated
        $periods = $service->budgetPeriods()
            ->orderBy('period_start', 'desc')
            ->with(['reconciledBy'])
            ->get()
            ->map(function ($period) use ($service) {
                $timeEntriesStats = $service->timeEntries()
                    ->whereBetween('date', [$period->period_start, $period->period_end])
                    ->selectRaw('
                        COUNT(*) as entry_count,
                        COUNT(DISTINCT user_id) as user_count,
                        SUM(CASE WHEN billable = true THEN duration_hours ELSE 0 END) as billable_hours,
                        SUM(CASE WHEN billable = false THEN duration_hours ELSE 0 END) as non_billable_hours
                    ')
                    ->first();

                return [
                    'period' => $period,
                    'stats' => $timeEntriesStats,
                ];
            });

        // Get all budget changes
        $budgetChanges = $service->budgetChanges()
            ->orderBy('effective_from', 'desc')
            ->with(['createdByUser'])
            ->get();

        return Inertia::render('timesheet/budget-periods/ledger', [
            'service' => $service->load(['customer', 'project', 'serviceManager']),
            'periods' => $periods,
            'budgetChanges' => $budgetChanges,
        ]);
    }

    protected function getOrCreateNextPeriod(Service $service, ServiceBudgetPeriod $currentPeriod): ServiceBudgetPeriod
    {
        // Try to find existing next period
        $nextPeriod = $service->budgetPeriods()
            ->where('period_start', '>', $currentPeriod->period_end)
            ->orderBy('period_start', 'asc')
            ->first();

        if ($nextPeriod) {
            return $nextPeriod;
        }

        // Create new next period
        $periodStart = \Carbon\Carbon::parse($currentPeriod->period_end)->addDay();
        $periodEnd = $this->calculatePeriodEnd($periodStart, $service->budget_period);

        return ServiceBudgetPeriod::create([
            'service_id' => $service->id,
            'period_start' => $periodStart->toDateString(),
            'period_end' => $periodEnd,
            'budget_hours' => $service->current_budget_hours ?? 0,
            'budget_amount' => $service->current_budget_amount ?? 0,
            'hours_rollover_from_previous' => 0,
        ]);
    }

    protected function calculatePeriodEnd($startDate, $budgetPeriod): string
    {
        $start = \Carbon\Carbon::parse($startDate);

        return match ($budgetPeriod) {
            'Monthly' => $start->copy()->endOfMonth()->toDateString(),
            'Quarterly' => $start->copy()->addMonths(3)->subDay()->toDateString(),
            'Yearly' => $start->copy()->addYear()->subDay()->toDateString(),
            'OneTime' => $start->copy()->addYears(10)->toDateString(),
        };
    }

    /**
     * Get valid reconciliation actions based on budget status
     */
    protected function getValidReconciliationActions(bool $isOverBudget, float $unusedHours, float $overageHours): array
    {
        // Under budget (has unused hours)
        if (!$isOverBudget && $unusedHours > 0) {
            // Only rollover and lose are valid
            // invoice_separately doesn't make sense when under budget
            // deduct_next doesn't make sense when under budget
            return ['rollover', 'lose'];
        }

        // Over budget
        if ($isOverBudget && $overageHours > 0) {
            // deduct_next, invoice_separately, and lose are valid
            // rollover doesn't make sense when over budget
            return ['deduct_next', 'invoice_separately', 'lose'];
        }

        // Fully utilized (no unused, not over) or edge cases
        // All actions available except those that do nothing
        return ['lose', 'invoice_separately'];
    }
}
