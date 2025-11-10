<?php

namespace Modules\Harvest\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Modules\Harvest\Services\HarvestImportService;
use Modules\Organisation\Models\Organisation;

class SyncHarvestData extends Command
{
    protected $signature = 'harvest:sync {organisation_id? : Organisation ID to sync (syncs all orgs if omitted)}';

    protected $description = 'Incrementally sync Harvest data (tasks, projects, time entries only - does not create users or customers)';

    public function handle(): int
    {
        $organisationId = $this->argument('organisation_id');

        if ($organisationId) {
            // Sync specific organisation
            return $this->syncOrganisation($organisationId);
        }

        // Sync all organisations with Harvest enabled
        $this->info('Syncing Harvest data for all organisations with Harvest enabled...');

        $organisations = Organisation::whereHas('settings', function ($query) {
            $query->where('module', 'Harvest')
                ->where('key', 'status')
                ->where('value', '1');
        })->get();

        if ($organisations->isEmpty()) {
            $this->info('No organisations with Harvest enabled found.');

            return 0;
        }

        $successCount = 0;
        $failedCount = 0;

        foreach ($organisations as $organisation) {
            $result = $this->syncOrganisation($organisation->id);

            if ($result === 0) {
                $successCount++;
            } else {
                $failedCount++;
            }
        }

        $this->newLine();
        $this->info("=== Sync Summary ===");
        $this->info("Successful: {$successCount}");
        if ($failedCount > 0) {
            $this->warn("Failed: {$failedCount}");
        }

        return $failedCount > 0 ? 1 : 0;
    }

    private function syncOrganisation(string $organisationId): int
    {
        // Validate organisation exists and load settings
        $organisation = Organisation::with('settings')->find($organisationId);
        if (! $organisation) {
            $this->error("Organisation with ID {$organisationId} not found.");

            return 1;
        }

        // Check if Harvest module is enabled
        $harvestEnabled = $organisation->settings()
            ->where('module', 'Harvest')
            ->where('key', 'status')
            ->first()?->value;

        if ($harvestEnabled !== '1') {
            $this->warn("Harvest module is not enabled for organisation: {$organisation->name}");

            return 1;
        }

        // Load Harvest credentials from organisation settings
        $harvestAccountId = $organisation->settings()
            ->where('module', 'Harvest')
            ->where('key', 'HARVEST_ACCOUNT_ID')
            ->first()?->value;

        $harvestToken = $organisation->settings()
            ->where('module', 'Harvest')
            ->where('key', 'HARVEST_BEARER')
            ->first()?->value;

        // Validate credentials are configured
        if (! $harvestAccountId || ! $harvestToken) {
            $this->error("Harvest API credentials not configured for organisation: {$organisation->name}");

            return 1;
        }

        try {
            // Create the service instance
            $service = new HarvestImportService($organisation, $harvestAccountId, $harvestToken);

            // Set output callback to relay messages to console
            $service->setOutputCallback(function ($message, $type) {
                match ($type) {
                    'error' => $this->error($message),
                    'warn' => $this->warn($message),
                    default => $this->info($message),
                };
            });

            // Run incremental sync - skip users and customers, filter time entries to last 7 days
            $statistics = $service->run([
                'users' => false,
                'tasks' => true,
                'clients' => false,
                'projects' => true,
                'time_entries' => true,
                'time_entries_since' => Carbon::now()->subDays(7),
            ]);

            // Create missing budget periods and update hours used
            $this->info("\nUpdating budget periods...");
            $this->call('timesheet:create-missing-budget-periods', [
                'organisation_id' => $organisationId,
            ]);

            $this->info("\n=== Sync Complete for {$organisation->name} ===");
            $this->info("Tasks: {$statistics['tasks']}");
            $this->info("Projects: {$statistics['projects']}");
            $this->info("Task Assignments: {$statistics['task_assignments']}");
            $this->info("Time Entries: {$statistics['time_entries']}");

            return 0;
        } catch (\Exception $e) {
            $this->error("Sync failed for {$organisation->name}: {$e->getMessage()}");

            return 1;
        }
    }
}
