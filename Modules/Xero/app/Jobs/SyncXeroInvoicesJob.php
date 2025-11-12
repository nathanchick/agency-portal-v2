<?php

namespace Modules\Xero\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Modules\Customer\Models\Customer;
use Modules\Organisation\Models\Organisation;
use Modules\Xero\Services\XeroInvoiceSyncService;

/**
 * SyncXeroInvoicesJob
 *
 * Background job for syncing invoices from Xero to the portal database.
 *
 * Can sync invoices for:
 * - A specific customer (provide customer_id)
 * - An entire organisation (provide organisation_id only)
 *
 * Supports incremental sync to only fetch recently modified invoices.
 *
 * Usage:
 * - SyncXeroInvoicesJob::dispatch($organisationId) - Sync all invoices
 * - SyncXeroInvoicesJob::dispatch($organisationId, $customerId) - Sync for specific customer
 * - SyncXeroInvoicesJob::dispatch($organisationId, null, true) - Incremental sync
 */
class SyncXeroInvoicesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds the job can run before timing out.
     */
    public int $timeout = 300; // 5 minutes

    /**
     * Create a new job instance.
     *
     * @param  string  $organisationId  UUID of the organisation
     * @param  string|null  $customerId  UUID of specific customer (optional)
     * @param  bool  $incrementalOnly  If true, only sync recently modified invoices
     */
    public function __construct(
        public string $organisationId,
        public ?string $customerId = null,
        public bool $incrementalOnly = false
    ) {
    }

    /**
     * Execute the job.
     *
     * @param  XeroInvoiceSyncService  $syncService
     * @return void
     */
    public function handle(XeroInvoiceSyncService $syncService): void
    {
        try {
            // Load organisation
            $organisation = Organisation::findOrFail($this->organisationId);

            if ($this->customerId) {
                // Sync for specific customer
                $customer = Customer::findOrFail($this->customerId);

                Log::info('Xero Sync Job: Starting customer invoice sync', [
                    'organisation_id' => $this->organisationId,
                    'customer_id' => $this->customerId,
                    'incremental' => $this->incrementalOnly,
                ]);

                $result = $syncService->syncInvoicesForCustomer($customer, $this->incrementalOnly);

                Log::info('Xero Sync Job: Customer invoice sync completed', [
                    'organisation_id' => $this->organisationId,
                    'customer_id' => $this->customerId,
                    'result' => $result,
                ]);

            } else {
                // Sync for entire organisation
                Log::info('Xero Sync Job: Starting organisation invoice sync', [
                    'organisation_id' => $this->organisationId,
                    'incremental' => $this->incrementalOnly,
                ]);

                $result = $syncService->syncInvoicesForOrganisation($organisation, $this->incrementalOnly);

                Log::info('Xero Sync Job: Organisation invoice sync completed', [
                    'organisation_id' => $this->organisationId,
                    'result' => $result,
                ]);
            }

        } catch (\Exception $e) {
            Log::error('Xero Sync Job: Failed to sync invoices', [
                'organisation_id' => $this->organisationId,
                'customer_id' => $this->customerId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Re-throw to allow Laravel to handle retry logic
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Xero Sync Job: Job failed after all retries', [
            'organisation_id' => $this->organisationId,
            'customer_id' => $this->customerId,
            'incremental' => $this->incrementalOnly,
            'error' => $exception->getMessage(),
        ]);

        // Could send notification to admin here
        // Could also update a status flag somewhere
    }
}
