<?php

namespace Modules\Harvest\Console\Commands;

use Illuminate\Console\Command;
use Modules\Timesheet\Models\Service;
use Modules\Timesheet\Models\ServiceBudgetPeriod;
use Modules\Timesheet\Models\TimeEntry;

class DebugService extends Command
{
    protected $signature = 'harvest:debug-service {service_name}';

    protected $description = 'Debug a service to see budget periods and time entries';

    public function handle(): int
    {
        $serviceName = $this->argument('service_name');

        $service = Service::where('name',  $serviceName)->first();

        if (! $service) {
            $this->error("Service not found: {$serviceName}");
            return 1;
        }

        $this->info("Service: {$service->name} (ID: {$service->id})");
        $this->info("Customer: {$service->customer->name}");
        $this->info("Budget Period: {$service->budget_period}");
        $this->info("Current Budget Hours: {$service->current_budget_hours}");
        $this->info("Start Date: {$service->start_date}");

        $this->info("\n--- Budget Periods ---");
        $periods = ServiceBudgetPeriod::where('service_id', $service->id)->get();

        if ($periods->isEmpty()) {
            $this->warn("NO BUDGET PERIODS FOUND!");
        } else {
            foreach ($periods as $period) {
                $this->info("Period: {$period->period_start} to {$period->period_end}");
                $this->info("  Budget Hours: {$period->budget_hours}");
                $this->info("  Hours Used: {$period->hours_used}");
                $this->info("  Amount Used: {$period->amount_used}");
            }
        }

        $this->info("\n--- Time Entries ---");
        $entries = TimeEntry::where('service_id', $service->id)
            ->with('user')
            ->orderBy('date')
            ->get();

        if ($entries->isEmpty()) {
            $this->warn("NO TIME ENTRIES FOUND!");
        } else {
            $this->info("Total entries: {$entries->count()}");
            $totalHours = $entries->sum('duration_hours');
            $this->info("Total hours: {$totalHours}");

            $this->info("\nRecent entries:");
            foreach ($entries->take(10) as $entry) {
                $this->info("  {$entry->date} - {$entry->user->name} - {$entry->duration_hours}h - {$entry->description}");
            }
        }

        return 0;
    }
}
