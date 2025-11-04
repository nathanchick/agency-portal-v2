<?php

namespace Modules\Harvest\Console\Commands;

use Illuminate\Console\Command;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\ServiceBudgetPeriod;
use Modules\Timesheet\Models\TimeEntry;

class CreateMissingBudgetPeriods extends Command
{
    protected $signature = 'harvest:create-missing-budget-periods {organisation_id?}';

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
            // Check if budget period exists
            $existingPeriod = ServiceBudgetPeriod::where('service_id', $service->id)
                ->where('period_start', '<=', now())
                ->where('period_end', '>=', now())
                ->first();

            if (!$existingPeriod) {
                // Create budget period
                $periodStart = $service->start_date;
                $periodEnd = $this->calculatePeriodEnd($periodStart, $service->budget_period);

                $period = ServiceBudgetPeriod::create([
                    'service_id' => $service->id,
                    'period_start' => $periodStart,
                    'period_end' => $periodEnd,
                    'budget_hours' => $service->current_budget_hours ?? 0,
                    'budget_amount' => $service->current_budget_amount ?? 0,
                    'hours_used' => 0,
                    'amount_used' => 0,
                    'hours_rollover_from_previous' => 0,
                ]);

                $this->info("Created budget period for: {$service->name} ({$service->customer->name})");
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

                $this->info("  Updated hours: {$hoursUsed} / Budget: {$existingPeriod->budget_hours}");
                $updated++;
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
}
