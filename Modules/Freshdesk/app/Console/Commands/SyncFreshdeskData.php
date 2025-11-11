<?php

namespace Modules\Freshdesk\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Modules\Freshdesk\Services\FreshdeskSyncService;
use Modules\Organisation\Models\Organisation;

class SyncFreshdeskData extends Command
{
    protected $signature = 'freshdesk:sync {organisation_id? : Organisation ID to sync (syncs all orgs if omitted)} {--force : Force sync all historic tickets}';

    protected $description = 'Sync Freshdesk tickets and conversations (hourly incremental sync, use --force for full historic sync)';

    public function handle(): int
    {
        $organisationId = $this->argument('organisation_id');

        if ($organisationId) {
            // Sync specific organisation
            return $this->syncOrganisation($organisationId);
        }

        // Sync all organisations with Freshdesk enabled
        $this->info('Syncing Freshdesk data for all organisations with Freshdesk enabled...');

        $organisations = Organisation::whereHas('settings', function ($query) {
            $query->where('module', 'Freshdesk')
                ->where('key', 'status')
                ->where('value', '1');
        })->get();

        if ($organisations->isEmpty()) {
            $this->info('No organisations with Freshdesk enabled found.');

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
        $this->info('=== Sync Summary ===');
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

        // Check if Freshdesk module is enabled
        $freshdeskEnabled = $organisation->settings()
            ->where('module', 'Freshdesk')
            ->where('key', 'status')
            ->first()?->value;

        if ($freshdeskEnabled !== '1') {
            $this->warn("Freshdesk module is not enabled for organisation: {$organisation->name}");

            return 1;
        }

        // Load Freshdesk credentials from organisation settings
        $freshdeskDomain = $organisation->settings()
            ->where('module', 'Freshdesk')
            ->where('key', 'FRESHDESK_DOMAIN')
            ->first()?->value;

        $freshdeskApiKey = $organisation->settings()
            ->where('module', 'Freshdesk')
            ->where('key', 'FRESHDESK_API_KEY')
            ->first()?->value;

        // Validate credentials are configured
        if (! $freshdeskDomain || ! $freshdeskApiKey) {
            $this->error("Freshdesk credentials not configured for organisation: {$organisation->name}");

            return 1;
        }

        try {
            // Create the service instance
            $service = new FreshdeskSyncService($organisation, $freshdeskDomain, $freshdeskApiKey);

            // Set output callback to relay messages to console
            $service->setOutputCallback(function ($message, $type) {
                match ($type) {
                    'error' => $this->error($message),
                    'warn' => $this->warn($message),
                    default => $this->info($message),
                };
            });

            // Determine sync period based on --force flag
            $force = $this->option('force');
            $since = $force ? Carbon::now()->subYears(10) : Carbon::now()->subHours(24);

            if ($force) {
                $this->warn('Running FULL HISTORIC SYNC - this may take a while...');
            }

            // Run sync
            $statistics = $service->run($since);

            $this->info("\n=== Sync Complete for {$organisation->name} ===");
            $this->info("Tickets: {$statistics['tickets']}");
            $this->info("Messages: {$statistics['messages']}");
            $this->info("Users: {$statistics['users']}");

            return 0;
        } catch (\Exception $e) {
            $this->error("Sync failed for {$organisation->name}: {$e->getMessage()}");

            return 1;
        }
    }
}
