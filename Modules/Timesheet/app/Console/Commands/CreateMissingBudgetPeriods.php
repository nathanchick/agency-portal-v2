<?php

namespace Modules\Timesheet\Console\Commands;

use Illuminate\Console\Command;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\ServiceBudgetPeriod;
use Modules\Timesheet\Models\TimeEntry;

class CreateMissingBudgetPeriods extends Command
{
    protected $signature = 'timesheet:create-missing-budget-periods {organisation_id?}';

    protected $description = 'Create budget periods for services that are missing them';

    public function handle(): int
    {
        $organisationId = $this->argument('organisation_id');

        $query = Service::query();

        if ($organisationId) {
            $query->where('organisation_id', $organisationId);
        }

        $services = $query->get();

        $this->info("Checking {$services->count()} services...");

        $created = 0;
        $updated = 0;

        foreach ($services as $service) {
            $this->info("Processing: {$service->name} ({$service->customer->name})");

            // Create all missing periods from start_date to now
            $currentDate = \Carbon\Carbon::parse($service->start_date);
            $today = \Carbon\Carbon::now();

            while ($currentDate->lte($today)) {
                $periodStart = $currentDate->copy();
                $periodEnd = $this->calculatePeriodEnd($periodStart, $service->budget_period);

                // Check if this period already exists
                $existingPeriod = ServiceBudgetPeriod::where('service_id', $service->id)
                    ->where('period_start', $periodStart->toDateString())
                    ->first();

                if (!$existingPeriod) {
                    // Create budget period
                    $period = ServiceBudgetPeriod::create([
                        'service_id' => $service->id,
                        'period_start' => $periodStart->toDateString(),
                        'period_end' => $periodEnd,
                        'budget_hours' => $service->current_budget_hours ?? 0,
                        'budget_amount' => $service->current_budget_amount ?? 0,
                        'hours_used' => 0,
                        'amount_used' => 0,
                        'hours_rollover_from_previous' => 0,
                    ]);

                    $this->line("  Created period: {$periodStart->format('Y-m-d')} to {$periodEnd}");
                    $created++;

                    $existingPeriod = $period;
                }

                // Calculate and update hours_used from time entries
                $stats = TimeEntry::where('service_id', $service->id)
                    ->whereBetween('date', [$existingPeriod->period_start, $existingPeriod->period_end])
                    ->selectRaw('
                        SUM(duration_hours) as total_hours,
                        SUM(duration_hours * hourly_rate) as total_amount
                    ')
                    ->first();

                $hoursUsed = $stats->total_hours ?? 0;
                $amountUsed = $stats->total_amount ?? 0;

                if ($existingPeriod->hours_used != $hoursUsed || $existingPeriod->amount_used != $amountUsed) {
                    $existingPeriod->update([
                        'hours_used' => $hoursUsed,
                        'amount_used' => $amountUsed,
                    ]);

                    $this->line("  Updated hours: {$hoursUsed} / Budget: {$existingPeriod->budget_hours}");
                    $updated++;
                }

                // Move to next period
                $currentDate = $this->getNextPeriodStart($periodStart, $service->budget_period);

                // Safety check: if next period is same as current, break to avoid infinite loop
                if ($currentDate->lte($periodStart)) {
                    break;
                }
            }
        }

        $this->info("\n=== Summary ===");
        $this->info("Budget periods created: {$created}");
        $this->info("Budget periods updated: {$updated}");

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

    private function getNextPeriodStart($currentStart, $budgetPeriod): \Carbon\Carbon
    {
        $start = \Carbon\Carbon::parse($currentStart);

        return match ($budgetPeriod) {
            'Monthly' => $start->copy()->addMonth()->startOfMonth(),
            'Quarterly' => $start->copy()->addMonths(3),
            'Yearly' => $start->copy()->addYear(),
            'OneTime' => $start->copy()->addYears(100), // OneTime should only have one period
        };
    }
}
