<?php

namespace Modules\Timesheet\Console\Commands;

use Illuminate\Console\Command;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\ServiceBudgetPeriod;

class GenerateNextBudgetPeriods extends Command
{
    protected $signature = 'timesheet:generate-next-periods {--days-ahead=7 : Create periods for services ending within this many days}';

    protected $description = 'Automatically generate next budget periods for services';

    public function handle(): int
    {
        $daysAhead = (int) $this->option('days-ahead');
        $cutoffDate = now()->addDays($daysAhead);

        $this->info("Checking for services with periods ending before {$cutoffDate->toDateString()}...");

        // Find all active recurring services
        $services = Service::whereIn('budget_period', ['Monthly', 'Quarterly', 'Yearly'])
            ->where('status', 'Active')
            ->with(['budgetPeriods' => fn($q) => $q->orderBy('period_end', 'desc'), 'customer'])
            ->get();

        $servicesNeedingPeriods = $services->filter(function ($service) use ($cutoffDate) {
            // Get the latest period
            $latestPeriod = $service->budgetPeriods->first();

            if (!$latestPeriod) {
                return false; // No periods exist
            }

            // Check if period is ending soon
            if (\Carbon\Carbon::parse($latestPeriod->period_end)->greaterThan($cutoffDate)) {
                return false; // Period not ending yet
            }

            // Check if next period already exists
            $nextPeriodStart = \Carbon\Carbon::parse($latestPeriod->period_end)->addDay();
            $hasNextPeriod = $service->budgetPeriods->contains(function ($period) use ($nextPeriodStart) {
                return \Carbon\Carbon::parse($period->period_start)->greaterThanOrEqualTo($nextPeriodStart);
            });

            return !$hasNextPeriod;
        });

        if ($servicesNeedingPeriods->isEmpty()) {
            $this->info("No services need new periods.");
            return 0;
        }

        $created = 0;

        foreach ($servicesNeedingPeriods as $service) {
            $lastPeriod = $service->budgetPeriods->first();

            if (!$lastPeriod) {
                continue;
            }

            // Create periods in a loop until we catch up to today
            $currentPeriodEnd = \Carbon\Carbon::parse($lastPeriod->period_end);
            $maxPeriodsToCreate = 100; // Safety limit to prevent infinite loops
            $periodsCreatedForService = 0;

            while ($currentPeriodEnd->lessThan(now()) && $periodsCreatedForService < $maxPeriodsToCreate) {
                $nextPeriodStart = $currentPeriodEnd->copy()->addDay();

                // Check if next period already exists
                $existingNextPeriod = ServiceBudgetPeriod::where('service_id', $service->id)
                    ->where('period_start', $nextPeriodStart->toDateString())
                    ->first();

                if ($existingNextPeriod) {
                    break; // Period already exists, stop
                }

                // Create next period with 0 rollover initially
                // Rollover will be updated retroactively when previous period is reconciled
                $periodEnd = $this->calculatePeriodEnd($nextPeriodStart, $service->budget_period);

                $newPeriod = ServiceBudgetPeriod::create([
                    'service_id' => $service->id,
                    'period_start' => $nextPeriodStart->toDateString(),
                    'period_end' => $periodEnd,
                    'budget_hours' => $service->current_budget_hours ?? 0,
                    'budget_amount' => $service->current_budget_amount ?? 0,
                    'hours_used' => 0,
                    'amount_used' => 0,
                    'hours_rollover_from_previous' => 0, // Always 0 initially, updated on reconciliation
                ]);

                if ($periodsCreatedForService === 0) {
                    $this->info("Creating periods for {$service->name} ({$service->customer->name}):");
                }
                $this->info("  {$nextPeriodStart->toDateString()} to {$periodEnd}");

                $currentPeriodEnd = \Carbon\Carbon::parse($periodEnd);
                $periodsCreatedForService++;
                $created++;
            }

            if ($periodsCreatedForService > 0) {
                $this->info("  Total: {$periodsCreatedForService} periods created");
            }
        }

        $this->info("\n=== Summary ===");
        $this->info("New budget periods created: {$created}");

        return 0;
    }

    private function calculatePeriodEnd($startDate, $budgetPeriod): string
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
