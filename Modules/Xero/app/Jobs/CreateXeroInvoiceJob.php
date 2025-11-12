<?php

namespace Modules\Xero\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Modules\Timesheet\Models\ServiceBudgetChange;
use Modules\Timesheet\Models\ServiceBudgetPeriod;
use Modules\Xero\Services\XeroInvoiceCreationService;

/**
 * CreateXeroInvoiceJob
 *
 * Background job for creating invoices in Xero from portal data.
 *
 * Supports creating invoices from:
 * - Budget period reconciliation (provide budget_period_id)
 * - Budget adjustments/changes (provide budget_change_id)
 *
 * Usage:
 * - CreateXeroInvoiceJob::dispatch('budget_period', $periodId, $options)
 * - CreateXeroInvoiceJob::dispatch('budget_change', $changeId, $options)
 */
class CreateXeroInvoiceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds the job can run before timing out.
     */
    public int $timeout = 120; // 2 minutes

    /**
     * Create a new job instance.
     *
     * @param  string  $sourceType  'budget_period' or 'budget_change'
     * @param  string  $sourceId  UUID of the source entity
     * @param  array  $options  Invoice creation options
     */
    public function __construct(
        public string $sourceType,
        public string $sourceId,
        public array $options = []
    ) {
    }

    /**
     * Execute the job.
     *
     * @param  XeroInvoiceCreationService  $creationService
     * @return void
     */
    public function handle(XeroInvoiceCreationService $creationService): void
    {
        try {
            Log::info('Xero Invoice Creation Job: Starting', [
                'source_type' => $this->sourceType,
                'source_id' => $this->sourceId,
                'options' => $this->options,
            ]);

            $result = match ($this->sourceType) {
                'budget_period' => $this->createFromBudgetPeriod($creationService),
                'budget_change' => $this->createFromBudgetChange($creationService),
                default => throw new \InvalidArgumentException("Invalid source type: {$this->sourceType}"),
            };

            Log::info('Xero Invoice Creation Job: Completed', [
                'source_type' => $this->sourceType,
                'source_id' => $this->sourceId,
                'result' => $result,
            ]);

        } catch (\Exception $e) {
            Log::error('Xero Invoice Creation Job: Failed', [
                'source_type' => $this->sourceType,
                'source_id' => $this->sourceId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Re-throw to allow Laravel to handle retry logic
            throw $e;
        }
    }

    /**
     * Create invoice from a budget period.
     */
    private function createFromBudgetPeriod(XeroInvoiceCreationService $creationService): array
    {
        $budgetPeriod = ServiceBudgetPeriod::findOrFail($this->sourceId);

        return $creationService->createInvoiceFromBudgetPeriod($budgetPeriod, $this->options);
    }

    /**
     * Create invoice from a budget change.
     */
    private function createFromBudgetChange(XeroInvoiceCreationService $creationService): array
    {
        $budgetChange = ServiceBudgetChange::findOrFail($this->sourceId);

        return $creationService->createInvoiceFromBudgetChange($budgetChange, $this->options);
    }

    /**
     * Handle a job failure.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Xero Invoice Creation Job: Job failed after all retries', [
            'source_type' => $this->sourceType,
            'source_id' => $this->sourceId,
            'options' => $this->options,
            'error' => $exception->getMessage(),
        ]);

        // Could send notification to admin here
        // Could also update a status flag on the source entity
    }
}
