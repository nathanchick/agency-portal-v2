<?php

namespace Modules\Xero\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\Customer\Models\Customer;
use Modules\Organisation\Models\Organisation;
use Modules\Xero\Exceptions\XeroApiException;
use Modules\Xero\Models\XeroInvoice;
use Modules\Xero\Models\XeroInvoiceLineItem;
use Modules\Xero\Models\XeroSyncLog;
use XeroAPI\XeroPHP\Models\Accounting\Invoice;

/**
 * XeroInvoiceSyncService
 *
 * Handles synchronization of invoices from Xero to the portal database.
 * Supports both full and incremental syncs for individual customers or entire organisations.
 *
 * Usage:
 * - syncInvoicesForCustomer($customer) - Sync invoices for a specific customer
 * - syncInvoicesForOrganisation($organisation) - Sync all invoices for an organisation
 * - syncInvoicesIncremental($organisation) - Sync only recently modified invoices
 */
class XeroInvoiceSyncService
{
    /**
     * Create a new XeroInvoiceSyncService instance.
     */
    public function __construct(
        private XeroApiService $apiService
    ) {
    }

    /**
     * Sync all invoices for a specific customer.
     *
     * Fetches all invoices from Xero for the customer's xero_contact_id
     * and stores them in the portal database.
     *
     * @param  Customer  $customer  Customer with valid xero_contact_id
     * @param  bool  $incrementalOnly  If true, only sync invoices modified since last sync
     * @return array Sync results with counts and log ID
     *
     * @throws XeroApiException
     */
    public function syncInvoicesForCustomer(Customer $customer, bool $incrementalOnly = false): array
    {
        if (! $customer->xero_contact_id) {
            throw new \InvalidArgumentException(
                "Customer {$customer->id} does not have a xero_contact_id set."
            );
        }

        $organisation = $customer->organisation;

        // Create sync log
        $syncLog = XeroSyncLog::create([
            'organisation_id' => $organisation->id,
            'sync_type' => XeroSyncLog::TYPE_FETCH_INVOICES,
            'status' => XeroSyncLog::STATUS_PENDING,
            'entity_type' => 'customer',
            'entity_id' => $customer->id,
            'started_at' => now(),
        ]);

        try {
            // Build filters
            $filters = [
                'contact_ids' => [$customer->xero_contact_id],
            ];

            // Add incremental sync filter if requested
            if ($incrementalOnly) {
                $lastSync = $this->getLastSuccessfulSync($organisation, 'customer', $customer->id);
                if ($lastSync && $lastSync->started_at) {
                    $filters['modified_after'] = $lastSync->started_at->toIso8601String();
                }
            }

            // Fetch invoices from Xero
            $xeroInvoices = $this->apiService->getInvoices($organisation, $filters);

            // Process and store invoices
            $stats = $this->processInvoices($organisation, $customer, $xeroInvoices);

            // Mark sync as successful
            $syncLog->markAsSuccessful(
                "Synced {$stats['created']} new and {$stats['updated']} updated invoices for customer {$customer->name}"
            );

            Log::info('Xero Sync: Customer invoices synced successfully', [
                'organisation_id' => $organisation->id,
                'customer_id' => $customer->id,
                'stats' => $stats,
            ]);

            return [
                'success' => true,
                'sync_log_id' => $syncLog->id,
                'stats' => $stats,
            ];

        } catch (\Exception $e) {
            // Mark sync as failed
            $syncLog->markAsFailed($e->getMessage());

            Log::error('Xero Sync: Customer invoice sync failed', [
                'organisation_id' => $organisation->id,
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Sync all invoices for an organisation.
     *
     * Fetches all invoices from Xero for all customers that have a xero_contact_id.
     * This is useful for initial bulk import or full refresh.
     *
     * @param  Organisation  $organisation
     * @param  bool  $incrementalOnly  If true, only sync invoices modified since last sync
     * @return array Sync results with counts and log ID
     *
     * @throws XeroApiException
     */
    public function syncInvoicesForOrganisation(Organisation $organisation, bool $incrementalOnly = false): array
    {
        // Create sync log
        $syncLog = XeroSyncLog::create([
            'organisation_id' => $organisation->id,
            'sync_type' => XeroSyncLog::TYPE_FETCH_INVOICES,
            'status' => XeroSyncLog::STATUS_PENDING,
            'entity_type' => 'organisation',
            'entity_id' => $organisation->id,
            'started_at' => now(),
        ]);

        try {
            // Get all customers with xero_contact_id configured
            $customersWithXero = Customer::where('organisation_id', $organisation->id)
                ->whereHas('settings', function ($query) {
                    $query->where('module', 'Xero')
                        ->where('key', 'xero_contact_id')
                        ->whereNotNull('value');
                })
                ->get();

            if ($customersWithXero->isEmpty()) {
                $syncLog->markAsSuccessful('No customers with Xero contact IDs configured');

                return [
                    'success' => true,
                    'sync_log_id' => $syncLog->id,
                    'stats' => ['created' => 0, 'updated' => 0, 'skipped' => 0],
                ];
            }

            // Build filters with contact IDs
            $contactIds = $customersWithXero->map(fn ($c) => $c->xero_contact_id)->filter()->values()->all();
            $filters = [
                'contact_ids' => $contactIds,
            ];

            // Add incremental sync filter if requested
            if ($incrementalOnly) {
                $lastSync = $this->getLastSuccessfulSync($organisation, 'organisation', $organisation->id);
                if ($lastSync && $lastSync->started_at) {
                    $filters['modified_after'] = $lastSync->started_at->toIso8601String();
                }
            }

            // Fetch invoices from Xero for configured customers only
            $xeroInvoices = $this->apiService->getInvoices($organisation, $filters);

            // Process and store invoices
            $stats = $this->processInvoices($organisation, null, $xeroInvoices);

            // Mark sync as successful
            $syncLog->markAsSuccessful(
                "Synced {$stats['created']} new and {$stats['updated']} updated invoices for organisation"
            );

            Log::info('Xero Sync: Organisation invoices synced successfully', [
                'organisation_id' => $organisation->id,
                'stats' => $stats,
            ]);

            return [
                'success' => true,
                'sync_log_id' => $syncLog->id,
                'stats' => $stats,
            ];

        } catch (\Exception $e) {
            // Mark sync as failed
            $syncLog->markAsFailed($e->getMessage());

            Log::error('Xero Sync: Organisation invoice sync failed', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Process an array of Xero invoices and store them in the database.
     *
     * Handles both creating new invoices and updating existing ones.
     * Only processes invoices that belong to customers with xero_contact_id set.
     *
     * @param  Organisation  $organisation
     * @param  Customer|null  $customer  If provided, only process invoices for this customer
     * @param  array  $xeroInvoices  Array of XeroAPI Invoice objects
     * @return array Stats: ['created' => int, 'updated' => int, 'skipped' => int]
     */
    private function processInvoices(Organisation $organisation, ?Customer $customer, array $xeroInvoices): array
    {
        $stats = [
            'created' => 0,
            'updated' => 0,
            'skipped' => 0,
        ];

        // Get all customers with xero_contact_id for this organisation
        $customersByXeroId = Customer::where('organisation_id', $organisation->id)
            ->whereHas('settings', function ($query) {
                $query->where('module', 'Xero')
                    ->where('key', 'xero_contact_id')
                    ->whereNotNull('value');
            })
            ->get()
            ->keyBy(function ($customer) {
                return $customer->xero_contact_id; // Uses accessor
            });

        foreach ($xeroInvoices as $xeroInvoice) {
            try {
                // Get the Xero contact ID from the invoice
                $xeroContactId = $xeroInvoice->getContact()?->getContactId();

                if (! $xeroContactId) {
                    $stats['skipped']++;
                    continue;
                }

                // Find the matching customer
                $invoiceCustomer = $customersByXeroId->get($xeroContactId);

                if (! $invoiceCustomer) {
                    // Skip invoices for contacts not in our system
                    $stats['skipped']++;
                    continue;
                }

                // If we're processing for a specific customer, skip others
                if ($customer && $invoiceCustomer->id !== $customer->id) {
                    continue;
                }

                // Process the invoice
                $wasCreated = $this->processInvoice($organisation, $invoiceCustomer, $xeroInvoice);

                if ($wasCreated) {
                    $stats['created']++;
                } else {
                    $stats['updated']++;
                }

            } catch (\Exception $e) {
                Log::warning('Xero Sync: Failed to process individual invoice', [
                    'organisation_id' => $organisation->id,
                    'xero_invoice_id' => $xeroInvoice->getInvoiceId(),
                    'error' => $e->getMessage(),
                ]);

                $stats['skipped']++;
            }
        }

        return $stats;
    }

    /**
     * Process a single Xero invoice and store it in the database.
     *
     * Creates or updates the invoice record and all associated line items.
     * Uses database transactions to ensure data consistency.
     *
     * Note: The bulk getInvoices() endpoint returns empty LineItems arrays.
     * We must fetch individual invoice details to get line items.
     *
     * @param  Organisation  $organisation
     * @param  Customer  $customer
     * @param  Invoice  $xeroInvoice  XeroAPI Invoice object from bulk endpoint
     * @return bool True if created, false if updated
     */
    private function processInvoice(Organisation $organisation, Customer $customer, Invoice $xeroInvoice): bool
    {
        return DB::transaction(function () use ($organisation, $customer, $xeroInvoice) {
            // Fetch full invoice details including line items
            // The bulk getInvoices() endpoint doesn't return line items, so we need to fetch individually
            try {
                $fullInvoice = $this->apiService->getInvoice($organisation, $xeroInvoice->getInvoiceId());

                // Add small delay to avoid rate limits (60 calls/minute = ~1 second per call)
                // This ensures we stay under the rate limit during bulk syncs
                usleep(1000000); // 1 second delay
            } catch (\Exception $e) {
                Log::warning('Xero Sync: Failed to fetch full invoice details, using bulk data', [
                    'organisation_id' => $organisation->id,
                    'xero_invoice_id' => $xeroInvoice->getInvoiceId(),
                    'error' => $e->getMessage(),
                ]);
                // Fall back to the bulk invoice data (won't have line items)
                $fullInvoice = $xeroInvoice;
            }

            // Extract invoice data
            $invoiceData = $this->extractInvoiceData($organisation, $customer, $fullInvoice);

            // Create or update invoice
            $invoice = XeroInvoice::updateOrCreate(
                ['xero_invoice_id' => $fullInvoice->getInvoiceId()],
                $invoiceData
            );

            $wasCreated = $invoice->wasRecentlyCreated;

            // Delete existing line items (easier than trying to match and update)
            if (! $wasCreated) {
                $invoice->lineItems()->delete();
            }

            // Create line items
            $lineItems = $this->extractLineItems($invoice, $fullInvoice);
            if (count($lineItems) > 0) {
                $invoice->lineItems()->createMany($lineItems);
            } else {
                Log::debug('Xero Sync: No line items found for invoice', [
                    'organisation_id' => $organisation->id,
                    'xero_invoice_id' => $fullInvoice->getInvoiceId(),
                    'invoice_number' => $fullInvoice->getInvoiceNumber(),
                ]);
            }

            return $wasCreated;
        });
    }

    /**
     * Extract invoice data from a Xero Invoice object.
     *
     * Transforms the XeroAPI Invoice object into an array suitable for database storage.
     *
     * @param  Organisation  $organisation
     * @param  Customer  $customer
     * @param  Invoice  $xeroInvoice
     * @return array Invoice data for database storage
     */
    private function extractInvoiceData(Organisation $organisation, Customer $customer, Invoice $xeroInvoice): array
    {
        // Skip fetching online invoice URL during bulk sync to avoid rate limits
        // The online invoice URL is not critical for core functionality
        $onlineInvoiceUrl = null;

        return [
            'organisation_id' => $organisation->id,
            'customer_id' => $customer->id,
            'xero_invoice_id' => $xeroInvoice->getInvoiceId(),
            'xero_invoice_number' => $xeroInvoice->getInvoiceNumber(),
            'invoice_type' => $xeroInvoice->getType(),
            'status' => $xeroInvoice->getStatus(),
            'date' => $this->formatDate($xeroInvoice->getDate()),
            'due_date' => $this->formatDate($xeroInvoice->getDueDate()),
            'fully_paid_at' => $this->formatDate($xeroInvoice->getFullyPaidOnDate()),
            'subtotal' => $xeroInvoice->getSubTotal() ?? 0,
            'total_tax' => $xeroInvoice->getTotalTax() ?? 0,
            'total' => $xeroInvoice->getTotal() ?? 0,
            'amount_due' => $xeroInvoice->getAmountDue() ?? 0,
            'amount_paid' => $xeroInvoice->getAmountPaid() ?? 0,
            'currency_code' => $xeroInvoice->getCurrencyCode() ?? 'GBP',
            'reference' => $xeroInvoice->getReference(),
            'online_invoice_url' => $onlineInvoiceUrl,
            'raw_data' => json_decode($xeroInvoice->__toString(), true), // Store raw JSON for debugging
            'last_synced_at' => now(),
        ];
    }

    /**
     * Extract line items from a Xero Invoice object.
     *
     * Transforms the XeroAPI LineItem objects into arrays suitable for database storage.
     *
     * @param  XeroInvoice  $invoice  The parent invoice model
     * @param  Invoice  $xeroInvoice  XeroAPI Invoice object
     * @return array Array of line item data
     */
    private function extractLineItems(XeroInvoice $invoice, Invoice $xeroInvoice): array
    {
        $lineItems = [];
        $xeroLineItems = $xeroInvoice->getLineItems() ?? [];

        foreach ($xeroLineItems as $index => $xeroLineItem) {
            $lineItems[] = [
                'xero_invoice_id' => $invoice->id,
                'xero_line_item_id' => $xeroLineItem->getLineItemId(),
                'description' => $xeroLineItem->getDescription(),
                'quantity' => $xeroLineItem->getQuantity() ?? 1,
                'unit_amount' => $xeroLineItem->getUnitAmount() ?? 0,
                'line_amount' => $xeroLineItem->getLineAmount() ?? 0,
                'tax_amount' => $xeroLineItem->getTaxAmount() ?? 0,
                'account_code' => $xeroLineItem->getAccountCode(),
                'tax_type' => $xeroLineItem->getTaxType(),
                'item_code' => $xeroLineItem->getItemCode(),
                'line_order' => $index + 1,
            ];
        }

        return $lineItems;
    }

    /**
     * Get the last successful sync log for a given entity.
     *
     * @param  Organisation  $organisation
     * @param  string  $entityType  'customer' or 'organisation'
     * @param  string  $entityId  UUID of the entity
     * @return XeroSyncLog|null
     */
    private function getLastSuccessfulSync(Organisation $organisation, string $entityType, string $entityId): ?XeroSyncLog
    {
        return XeroSyncLog::where('organisation_id', $organisation->id)
            ->where('sync_type', XeroSyncLog::TYPE_FETCH_INVOICES)
            ->where('entity_type', $entityType)
            ->where('entity_id', $entityId)
            ->where('status', XeroSyncLog::STATUS_SUCCESS)
            ->orderBy('started_at', 'desc')
            ->first();
    }

    /**
     * Format a date value from Xero API.
     *
     * Handles DateTime objects, standard date strings, and .NET JSON date format.
     * .NET JSON dates come as: /Date(1701907200000+0000)/
     *
     * @param  mixed  $date  DateTime object, string, or null
     * @return string|null  Formatted date string (Y-m-d) or null
     */
    private function formatDate($date): ?string
    {
        if (! $date) {
            return null;
        }

        if ($date instanceof \DateTime) {
            return $date->format('Y-m-d');
        }

        if (is_string($date)) {
            // Handle .NET JSON date format: /Date(1701907200000+0000)/
            if (preg_match('/\/Date\((\d+)([\+\-]\d+)?\)\//', $date, $matches)) {
                $timestamp = (int) $matches[1];
                // Convert milliseconds to seconds
                $timestamp = $timestamp / 1000;

                return \Carbon\Carbon::createFromTimestamp($timestamp)->format('Y-m-d');
            }

            // Try standard date parsing
            try {
                return \Carbon\Carbon::parse($date)->format('Y-m-d');
            } catch (\Exception $e) {
                Log::warning('Xero Sync: Failed to parse date string', [
                    'date' => $date,
                    'error' => $e->getMessage(),
                ]);

                return null;
            }
        }

        return null;
    }
}
