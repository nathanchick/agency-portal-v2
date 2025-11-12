<?php

namespace Modules\Xero\Console;

use Illuminate\Console\Command;
use Modules\Organisation\Models\Organisation;
use Modules\Xero\Jobs\SyncXeroInvoicesJob;
use Modules\Xero\Services\XeroTokenService;

/**
 * SyncXeroInvoicesCommand
 *
 * Artisan command for manually syncing Xero invoices.
 * Can sync for all organisations or a specific organisation.
 *
 * Usage:
 * - php artisan xero:sync-invoices
 * - php artisan xero:sync-invoices --organisation=<uuid>
 * - php artisan xero:sync-invoices --incremental
 */
class SyncXeroInvoicesCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'xero:sync-invoices
                            {--organisation= : UUID of specific organisation to sync}
                            {--incremental : Only sync invoices modified since last sync}';

    /**
     * The console command description.
     */
    protected $description = 'Sync invoices from Xero to the portal database';

    /**
     * Execute the console command.
     */
    public function handle(XeroTokenService $tokenService): int
    {
        $organisationId = $this->option('organisation');
        $incremental = $this->option('incremental');

        if ($organisationId) {
            // Sync for specific organisation
            return $this->syncForOrganisation($organisationId, $incremental, $tokenService);
        }

        // Sync for all organisations with valid Xero tokens
        return $this->syncForAllOrganisations($incremental, $tokenService);
    }

    /**
     * Sync invoices for a specific organisation.
     */
    private function syncForOrganisation(string $organisationId, bool $incremental, XeroTokenService $tokenService): int
    {
        $organisation = Organisation::find($organisationId);

        if (! $organisation) {
            $this->error("Organisation {$organisationId} not found.");

            return self::FAILURE;
        }

        if (! $tokenService->hasValidTokens($organisation)) {
            $this->error("Organisation {$organisation->name} does not have valid Xero tokens.");

            return self::FAILURE;
        }

        $this->info("Dispatching invoice sync job for organisation: {$organisation->name}");

        SyncXeroInvoicesJob::dispatch($organisation->id, null, $incremental);

        $this->info('Sync job dispatched successfully.');

        return self::SUCCESS;
    }

    /**
     * Sync invoices for all organisations with valid Xero tokens.
     */
    private function syncForAllOrganisations(bool $incremental, XeroTokenService $tokenService): int
    {
        $this->info('Finding organisations with valid Xero connections...');

        $organisations = Organisation::all();
        $syncedCount = 0;
        $skippedCount = 0;

        foreach ($organisations as $organisation) {
            // Check if credentials are configured
            $hasCredentials = $organisation->settings()
                ->where('module', 'Xero')
                ->where('key', 'XERO_CLIENT_ID')
                ->exists();

            if (! $hasCredentials) {
                $this->line("Skipping {$organisation->name} (Xero credentials not configured)");
                $skippedCount++;
                continue;
            }

            // Check if OAuth tokens exist
            if ($tokenService->hasValidTokens($organisation)) {
                $this->info("Dispatching sync for: {$organisation->name}");

                SyncXeroInvoicesJob::dispatch($organisation->id, null, $incremental);

                $syncedCount++;
            } else {
                $this->warn("Skipping {$organisation->name} (credentials configured but not connected - visit /xero/oauth/connect)");
                $skippedCount++;
            }
        }

        $this->newLine();
        $this->info("Dispatched sync jobs for {$syncedCount} organisation(s).");

        if ($skippedCount > 0) {
            $this->line("Skipped {$skippedCount} organisation(s) without Xero connection.");
        }

        return self::SUCCESS;
    }
}
