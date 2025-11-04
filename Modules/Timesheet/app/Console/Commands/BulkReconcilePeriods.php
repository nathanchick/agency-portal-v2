<?php

namespace Modules\Timesheet\Console\Commands;

use Illuminate\Console\Command;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\ServiceBudgetPeriod;

class BulkReconcilePeriods extends Command
{
    protected $signature = 'timesheet:bulk-reconcile-periods
                            {--action=rollover : Default reconciliation action (rollover, lose, invoice_separately, deduct_next)}
                            {--organisation_id= : Limit to specific organisation}
                            {--service_id= : Limit to specific service}
                            {--dry-run : Preview actions without making changes}';

    protected $description = 'Bulk reconcile ended budget periods';

    public function handle(): int
    {
        $action = $this->option('action');
        $organisationId = $this->option('organisation_id');
        $serviceId = $this->option('service_id');
        $dryRun = $this->option('dry-run');

        // Validate action
        if (!in_array($action, ['rollover', 'lose', 'invoice_separately', 'deduct_next'])) {
            $this->error("Invalid action: {$action}");
            $this->info("Valid actions: rollover, lose, invoice_separately, deduct_next");
            return 1;
        }

        // Find unreconciled periods that have ended
        $query = ServiceBudgetPeriod::where('reconciled', false)
            ->where('period_end', '<', now()->toDateString())
            ->with(['service.customer']);

        if ($organisationId) {
            $query->whereHas('service', fn($q) => $q->where('organisation_id', $organisationId));
        }

        if ($serviceId) {
            $query->where('service_id', $serviceId);
        }

        $periods = $query->orderBy('period_end', 'asc')->get();

        if ($periods->isEmpty()) {
            $this->info("No unreconciled periods found.");
            return 0;
        }

        $this->info("Found {$periods->count()} unreconciled periods ending before today.");

        if ($dryRun) {
            $this->warn("DRY RUN MODE - No changes will be made\n");
        }

        $reconciled = 0;

        foreach ($periods as $period) {
            $service = $period->service;
            $remainingHours = $period->remaining_hours;
            $isOverBudget = $period->isOverBudget();
            $overageHours = $isOverBudget ? abs($remainingHours) : 0;
            $unusedHours = !$isOverBudget && $remainingHours > 0 ? $remainingHours : 0;

            $this->info("Service: {$service->name} ({$service->customer->name})");
            $this->info("  Period: {$period->period_start} to {$period->period_end}");
            $this->info("  Budget: {$period->budget_hours}h + {$period->hours_rollover_from_previous}h rollover");
            $this->info("  Used: {$period->hours_used}h");

            if ($isOverBudget) {
                $this->warn("  Over budget by: {$overageHours}h");
            } else if ($unusedHours > 0) {
                $this->info("  Unused: {$unusedHours}h");
            } else {
                $this->info("  Fully utilized");
            }

            // Validate action is appropriate for the budget status
            $validAction = $this->validateActionForBudgetStatus($action, $isOverBudget, $unusedHours, $overageHours);

            if (!$validAction) {
                $this->warn("  Skipping: Action '{$action}' not appropriate for this budget status\n");
                continue;
            }

            $this->info("  Action: {$action}");

            if (!$dryRun) {
                // Mark period as reconciled
                $period->update([
                    'reconciled' => true,
                    'reconciliation_action' => $action,
                    'reconciliation_notes' => 'Bulk reconciled via CLI command',
                    'reconciled_at' => now(),
                    'reconciled_by_user_id' => null, // System reconciliation
                ]);

                // Handle rollover/deduction to next period
                if (in_array($action, ['rollover', 'deduct_next'])) {
                    $nextPeriod = $this->getOrCreateNextPeriod($service, $period);

                    if ($action === 'rollover' && $unusedHours > 0) {
                        $period->hours_rollover_to_next = $unusedHours;
                        $period->save();

                        $nextPeriod->hours_rollover_from_previous += $unusedHours;
                        $nextPeriod->save();

                        $this->info("  Rolled over {$unusedHours}h to next period");
                    }

                    if ($action === 'deduct_next' && $overageHours > 0) {
                        $period->hours_rollover_to_next = -$overageHours;
                        $period->save();

                        $nextPeriod->hours_rollover_from_previous -= $overageHours;
                        $nextPeriod->save();

                        $this->info("  Deducted {$overageHours}h from next period");
                    }
                }

                $reconciled++;
            }

            $this->newLine();
        }

        $this->info("=== Summary ===");
        if ($dryRun) {
            $this->info("Would reconcile {$periods->count()} periods (dry run)");
        } else {
            $this->info("Successfully reconciled {$reconciled} periods");

            if ($reconciled < $periods->count()) {
                $skipped = $periods->count() - $reconciled;
                $this->warn("Skipped {$skipped} periods (action not appropriate)");
            }
        }

        return 0;
    }

    /**
     * Validate if the action is appropriate for the budget status
     */
    protected function validateActionForBudgetStatus(string $action, bool $isOverBudget, float $unusedHours, float $overageHours): bool
    {
        // Under budget (has unused hours)
        if (!$isOverBudget && $unusedHours > 0) {
            // Only rollover and lose are valid
            return in_array($action, ['rollover', 'lose']);
        }

        // Over budget
        if ($isOverBudget && $overageHours > 0) {
            // deduct_next, invoice_separately, and lose are valid
            return in_array($action, ['deduct_next', 'invoice_separately', 'lose']);
        }

        // Fully utilized (no unused, not over)
        // All actions are technically valid, but rollover/deduct_next do nothing
        return in_array($action, ['lose', 'invoice_separately']);
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
}
