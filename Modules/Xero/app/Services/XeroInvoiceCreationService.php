<?php

namespace Modules\Xero\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\Customer\Models\Customer;
use Modules\Organisation\Models\Organisation;
use Modules\Timesheet\Models\ServiceBudgetChange;
use Modules\Timesheet\Models\ServiceBudgetPeriod;
use Modules\Xero\Exceptions\XeroApiException;
use Modules\Xero\Models\XeroInvoice;
use Modules\Xero\Models\XeroSyncLog;
use XeroAPI\XeroPHP\Models\Accounting\Invoice;

/**
 * XeroInvoiceCreationService
 *
 * Handles creating invoices in Xero from portal data.
 * Supports two creation scenarios:
 * 1. From budget period reconciliation (when "invoice_separately" is selected)
 * 2. From budget adjustments (with support for one-time and recurring invoices)
 *
 * Usage:
 * - createInvoiceFromBudgetPeriod($budgetPeriod) - Create invoice from reconciled period
 * - createInvoiceFromBudgetChange($budgetChange) - Create invoice from budget adjustment
 */
class XeroInvoiceCreationService
{
    /**
     * Default tax type for UK VAT.
     */
    private const DEFAULT_TAX_TYPE = 'OUTPUT2'; // 20% UK VAT

    /**
     * Create a new XeroInvoiceCreationService instance.
     */
    public function __construct(
        private XeroApiService $apiService,
        private XeroInvoiceSyncService $syncService
    ) {
    }

    /**
     * Create a Xero invoice from a reconciled budget period.
     *
     * This is called when a budget period is reconciled with "invoice_separately" option.
     * Creates an invoice in Xero and links it back to the budget period.
     *
     * @param  ServiceBudgetPeriod  $budgetPeriod  The reconciled budget period
     * @param  array  $options  Additional options:
     *                          - reference: Custom invoice reference
     *                          - due_days: Days until invoice is due (default: 30)
     *                          - send_email: Whether to email invoice to customer (default: false)
     * @return array Result with invoice details
     *
     * @throws XeroApiException
     * @throws \InvalidArgumentException
     */
    public function createInvoiceFromBudgetPeriod(ServiceBudgetPeriod $budgetPeriod, array $options = []): array
    {
        // Validate budget period is reconciled
        if (! $budgetPeriod->reconciled_at) {
            throw new \InvalidArgumentException(
                "Budget period {$budgetPeriod->id} has not been reconciled yet."
            );
        }

        // Get customer and validate Xero connection
        $customer = $budgetPeriod->serviceBudget->service->customer;
        $organisation = $customer->organisation;

        $this->validateCustomerXeroConnection($customer);

        // Create sync log
        $syncLog = XeroSyncLog::create([
            'organisation_id' => $organisation->id,
            'sync_type' => XeroSyncLog::TYPE_CREATE_INVOICE,
            'status' => XeroSyncLog::STATUS_PENDING,
            'entity_type' => 'budget_period',
            'entity_id' => $budgetPeriod->id,
            'started_at' => now(),
        ]);

        try {
            // Build invoice data from budget period
            $invoiceData = $this->buildInvoiceDataFromBudgetPeriod($budgetPeriod, $options);

            // Create invoice in Xero
            $xeroInvoice = $this->apiService->createInvoice($organisation, $invoiceData);

            // Store invoice in portal database
            $portalInvoice = $this->syncService->syncInvoicesForCustomer($customer, false);

            // Link invoice to budget period
            $budgetPeriod->update([
                'xero_invoice_id' => $portalInvoice['stats']['created'] > 0
                    ? XeroInvoice::where('xero_invoice_id', $xeroInvoice->getInvoiceId())->first()?->id
                    : null,
            ]);

            // Optionally send email
            if ($options['send_email'] ?? false) {
                $this->apiService->emailInvoice($organisation, $xeroInvoice->getInvoiceId());
            }

            // Mark sync as successful
            $syncLog->markAsSuccessful(
                "Created invoice {$xeroInvoice->getInvoiceNumber()} for budget period"
            );

            Log::info('Xero: Created invoice from budget period', [
                'organisation_id' => $organisation->id,
                'budget_period_id' => $budgetPeriod->id,
                'xero_invoice_id' => $xeroInvoice->getInvoiceId(),
                'xero_invoice_number' => $xeroInvoice->getInvoiceNumber(),
            ]);

            return [
                'success' => true,
                'xero_invoice_id' => $xeroInvoice->getInvoiceId(),
                'xero_invoice_number' => $xeroInvoice->getInvoiceNumber(),
                'total' => $xeroInvoice->getTotal(),
                'url' => $this->apiService->getOnlineInvoiceUrl($organisation, $xeroInvoice->getInvoiceId()),
            ];

        } catch (\Exception $e) {
            $syncLog->markAsFailed($e->getMessage());

            Log::error('Xero: Failed to create invoice from budget period', [
                'organisation_id' => $organisation->id,
                'budget_period_id' => $budgetPeriod->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Create a Xero invoice from a budget adjustment.
     *
     * This is called when a budget change requires invoicing.
     * Supports both one-time and recurring invoice creation.
     *
     * @param  ServiceBudgetChange  $budgetChange  The budget adjustment
     * @param  array  $options  Additional options:
     *                          - invoice_type: 'one_time' or 'recurring'
     *                          - reference: Custom invoice reference
     *                          - due_days: Days until invoice is due (default: 30)
     *                          - send_email: Whether to email invoice to customer (default: false)
     *                          - repeating_schedule: For recurring invoices (WEEKLY, MONTHLY, etc.)
     * @return array Result with invoice details
     *
     * @throws XeroApiException
     * @throws \InvalidArgumentException
     */
    public function createInvoiceFromBudgetChange(ServiceBudgetChange $budgetChange, array $options = []): array
    {
        // Get customer and validate Xero connection
        $customer = $budgetChange->serviceBudget->service->customer;
        $organisation = $customer->organisation;

        $this->validateCustomerXeroConnection($customer);

        // Create sync log
        $syncLog = XeroSyncLog::create([
            'organisation_id' => $organisation->id,
            'sync_type' => XeroSyncLog::TYPE_CREATE_INVOICE,
            'status' => XeroSyncLog::STATUS_PENDING,
            'entity_type' => 'budget_change',
            'entity_id' => $budgetChange->id,
            'started_at' => now(),
        ]);

        try {
            $invoiceType = $options['invoice_type'] ?? 'one_time';

            // Build invoice data from budget change
            $invoiceData = $this->buildInvoiceDataFromBudgetChange($budgetChange, $options);

            // Create invoice in Xero
            $xeroInvoice = $this->apiService->createInvoice($organisation, $invoiceData);

            // Store invoice in portal database
            $portalInvoice = $this->syncService->syncInvoicesForCustomer($customer, false);

            // Link invoice to budget change
            $budgetChange->update([
                'xero_invoice_id' => $portalInvoice['stats']['created'] > 0
                    ? XeroInvoice::where('xero_invoice_id', $xeroInvoice->getInvoiceId())->first()?->id
                    : null,
                'xero_invoice_type' => $invoiceType,
            ]);

            // Optionally send email
            if ($options['send_email'] ?? false) {
                $this->apiService->emailInvoice($organisation, $xeroInvoice->getInvoiceId());
            }

            // Mark sync as successful
            $syncLog->markAsSuccessful(
                "Created {$invoiceType} invoice {$xeroInvoice->getInvoiceNumber()} for budget change"
            );

            Log::info('Xero: Created invoice from budget change', [
                'organisation_id' => $organisation->id,
                'budget_change_id' => $budgetChange->id,
                'invoice_type' => $invoiceType,
                'xero_invoice_id' => $xeroInvoice->getInvoiceId(),
                'xero_invoice_number' => $xeroInvoice->getInvoiceNumber(),
            ]);

            return [
                'success' => true,
                'xero_invoice_id' => $xeroInvoice->getInvoiceId(),
                'xero_invoice_number' => $xeroInvoice->getInvoiceNumber(),
                'invoice_type' => $invoiceType,
                'total' => $xeroInvoice->getTotal(),
                'url' => $this->apiService->getOnlineInvoiceUrl($organisation, $xeroInvoice->getInvoiceId()),
            ];

        } catch (\Exception $e) {
            $syncLog->markAsFailed($e->getMessage());

            Log::error('Xero: Failed to create invoice from budget change', [
                'organisation_id' => $organisation->id,
                'budget_change_id' => $budgetChange->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Build invoice data array from a budget period.
     */
    private function buildInvoiceDataFromBudgetPeriod(ServiceBudgetPeriod $budgetPeriod, array $options): array
    {
        $customer = $budgetPeriod->serviceBudget->service->customer;
        $service = $budgetPeriod->serviceBudget->service;

        // Calculate due date
        $dueDate = now()->addDays($options['due_days'] ?? 30);

        // Build reference
        $reference = $options['reference'] ?? "Period {$budgetPeriod->period_start->format('Y-m-d')} to {$budgetPeriod->period_end->format('Y-m-d')}";

        // Build line items from reconciliation
        $lineItems = [];

        // Add actual hours worked
        if ($budgetPeriod->actual_hours > 0) {
            $lineItems[] = [
                'description' => "{$service->name} - Hours Worked ({$budgetPeriod->period_start->format('M d')} - {$budgetPeriod->period_end->format('M d, Y')})",
                'quantity' => $budgetPeriod->actual_hours,
                'unit_amount' => $budgetPeriod->serviceBudget->hourly_rate ?? 0,
                'account_code' => $this->getAccountCode($customer),
                'tax_type' => self::DEFAULT_TAX_TYPE,
            ];
        }

        // Add reconciliation notes as description if present
        if ($budgetPeriod->reconciliation_notes) {
            $lineItems[0]['description'] .= "\n\n{$budgetPeriod->reconciliation_notes}";
        }

        return [
            'contact_id' => $customer->xero_contact_id,
            'date' => now()->format('Y-m-d'),
            'due_date' => $dueDate->format('Y-m-d'),
            'reference' => $reference,
            'line_items' => $lineItems,
            'status' => 'AUTHORISED', // Auto-approve invoices
        ];
    }

    /**
     * Build invoice data array from a budget change.
     */
    private function buildInvoiceDataFromBudgetChange(ServiceBudgetChange $budgetChange, array $options): array
    {
        $customer = $budgetChange->serviceBudget->service->customer;
        $service = $budgetChange->serviceBudget->service;

        // Calculate due date
        $dueDate = now()->addDays($options['due_days'] ?? 30);

        // Build reference
        $reference = $options['reference'] ?? "Budget Adjustment - {$budgetChange->change_type}";

        // Build line item from budget change
        $lineItems = [];

        $description = "{$service->name} - Budget Adjustment";

        if ($budgetChange->reason) {
            $description .= "\n\n{$budgetChange->reason}";
        }

        // Calculate amount based on change type
        $amount = match ($budgetChange->change_type) {
            'increase' => abs($budgetChange->hours_change * ($budgetChange->serviceBudget->hourly_rate ?? 0)),
            'decrease' => -abs($budgetChange->hours_change * ($budgetChange->serviceBudget->hourly_rate ?? 0)),
            'rate_change' => $budgetChange->hours_change * ($budgetChange->new_hourly_rate ?? $budgetChange->serviceBudget->hourly_rate ?? 0),
            default => 0,
        };

        $lineItems[] = [
            'description' => $description,
            'quantity' => abs($budgetChange->hours_change),
            'unit_amount' => $budgetChange->new_hourly_rate ?? $budgetChange->serviceBudget->hourly_rate ?? 0,
            'account_code' => $this->getAccountCode($customer),
            'tax_type' => self::DEFAULT_TAX_TYPE,
        ];

        return [
            'contact_id' => $customer->xero_contact_id,
            'date' => now()->format('Y-m-d'),
            'due_date' => $dueDate->format('Y-m-d'),
            'reference' => $reference,
            'line_items' => $lineItems,
            'status' => 'AUTHORISED', // Auto-approve invoices
        ];
    }

    /**
     * Validate that a customer has a valid Xero connection.
     *
     * @throws \InvalidArgumentException
     */
    private function validateCustomerXeroConnection(Customer $customer): void
    {
        if (! $customer->xero_contact_id) {
            throw new \InvalidArgumentException(
                "Customer {$customer->name} does not have a xero_contact_id set. ".
                'Please link the customer to a Xero contact first.'
            );
        }
    }

    /**
     * Get the default account code for a customer.
     *
     * This should be configured per customer or organisation.
     * Falls back to a default sales account code.
     */
    private function getAccountCode(Customer $customer): ?string
    {
        // Check for customer-specific account code
        $accountCode = $customer->settings()
            ->where('module', 'Xero')
            ->where('key', 'XERO_ACCOUNT_CODE')
            ->first()?->value;

        if ($accountCode) {
            return $accountCode;
        }

        // Check for organisation-wide default
        $accountCode = $customer->organisation->settings()
            ->where('module', 'Xero')
            ->where('key', 'XERO_DEFAULT_ACCOUNT_CODE')
            ->first()?->value;

        return $accountCode;
    }
}
