<?php

namespace Modules\Xero\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Modules\Organisation\Models\Organisation;
use Modules\Xero\Exceptions\XeroApiException;
use XeroAPI\XeroPHP\Api\AccountingApi;
use XeroAPI\XeroPHP\ApiException;
use XeroAPI\XeroPHP\Models\Accounting\Invoice;
use XeroAPI\XeroPHP\Models\Accounting\Invoices;

/**
 * XeroApiService
 *
 * Handles all communication with the Xero API.
 * Implements rate limiting and comprehensive error handling.
 *
 * Rate Limits:
 * - 60 calls per minute per organisation
 * - 5000 calls per day per organisation
 */
class XeroApiService
{
    /**
     * Rate limit: calls per minute.
     */
    private const RATE_LIMIT_PER_MINUTE = 60;

    /**
     * Rate limit: calls per day.
     */
    private const RATE_LIMIT_PER_DAY = 5000;

    /**
     * Create a new XeroApiService instance.
     */
    public function __construct(
        private XeroTokenService $tokenService
    ) {
    }

    /**
     * Get all invoices for an organisation with optional filters.
     *
     * @param  Organisation  $organisation
     * @param  array  $filters  Optional filters:
     *                         - contact_ids: array of Xero contact IDs
     *                         - status: Invoice status (DRAFT, SUBMITTED, AUTHORISED, PAID, etc.)
     *                         - date_from: Filter invoices from this date (Y-m-d)
     *                         - date_to: Filter invoices to this date (Y-m-d)
     *                         - modified_after: Get only invoices modified after this datetime
     * @return array Array of Invoice objects
     *
     * @throws XeroApiException
     */
    public function getInvoices(Organisation $organisation, array $filters = []): array
    {
        $this->checkRateLimit($organisation);

        try {
            $config = $this->tokenService->getConfiguration($organisation);
            $accountingApi = new AccountingApi(null, $config);

            $tenantId = $this->getTenantId($organisation);

            // Build WHERE clause from filters
            $where = $this->buildInvoiceWhereClause($filters);

            // Order by date descending
            $order = 'Date DESC';

            // Modified after filter (for incremental sync)
            $modifiedAfter = $filters['modified_after'] ?? null;
            if ($modifiedAfter && ! $modifiedAfter instanceof \DateTime) {
                $modifiedAfter = new \DateTime($modifiedAfter);
            }

            $invoices = $accountingApi->getInvoices(
                $tenantId,
                $modifiedAfter,
                $where,
                $order,
                null, // $IDs
                null, // $invoiceNumbers
                null, // $contactIDs
                null, // $statuses
                null, // $page
                false // $summaryOnly - we need full invoice details including line items
            );

            $this->recordApiCall($organisation);

            Log::debug('Xero API: Fetched invoices', [
                'organisation_id' => $organisation->id,
                'count' => count($invoices->getInvoices()),
                'filters' => $filters,
            ]);

            return $invoices->getInvoices();

        } catch (ApiException $e) {
            Log::error('Xero API: Failed to fetch invoices', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
                'code' => $e->getCode(),
            ]);

            throw XeroApiException::requestFailed($organisation, 'GET /Invoices', $e);
        }
    }

    /**
     * Get a single invoice by its Xero invoice ID.
     *
     * @throws XeroApiException
     */
    public function getInvoice(Organisation $organisation, string $xeroInvoiceId): Invoice
    {
        $this->checkRateLimit($organisation);

        try {
            $config = $this->tokenService->getConfiguration($organisation);
            $accountingApi = new AccountingApi(null, $config);

            $tenantId = $this->getTenantId($organisation);

            $invoices = $accountingApi->getInvoice($tenantId, $xeroInvoiceId);

            $this->recordApiCall($organisation);

            if (empty($invoices->getInvoices())) {
                throw XeroApiException::invalidResponse(
                    $organisation,
                    "GET /Invoices/{$xeroInvoiceId}",
                    'No invoice returned'
                );
            }

            return $invoices->getInvoices()[0];

        } catch (ApiException $e) {
            Log::error('Xero API: Failed to fetch invoice', [
                'organisation_id' => $organisation->id,
                'xero_invoice_id' => $xeroInvoiceId,
                'error' => $e->getMessage(),
            ]);

            throw XeroApiException::requestFailed($organisation, "GET /Invoices/{$xeroInvoiceId}", $e);
        }
    }

    /**
     * Create a new invoice in Xero.
     *
     * @param  Organisation  $organisation
     * @param  array  $invoiceData  Invoice data structure:
     *                              - contact_id: Xero contact ID (required)
     *                              - date: Invoice date (Y-m-d)
     *                              - due_date: Due date (Y-m-d)
     *                              - reference: Invoice reference
     *                              - line_items: Array of line items (required)
     *                              - status: DRAFT or AUTHORISED (default: AUTHORISED)
     * @return Invoice Created invoice
     *
     * @throws XeroApiException
     */
    public function createInvoice(Organisation $organisation, array $invoiceData): Invoice
    {
        $this->checkRateLimit($organisation);

        try {
            $config = $this->tokenService->getConfiguration($organisation);
            $accountingApi = new AccountingApi(null, $config);

            $tenantId = $this->getTenantId($organisation);

            // Build invoice object from data
            $invoice = $this->buildInvoiceObject($invoiceData);

            $invoices = new Invoices(['invoices' => [$invoice]]);

            $result = $accountingApi->createInvoices($tenantId, $invoices);

            $this->recordApiCall($organisation);

            if (empty($result->getInvoices())) {
                throw XeroApiException::invalidResponse(
                    $organisation,
                    'POST /Invoices',
                    'No invoice returned after creation'
                );
            }

            $createdInvoice = $result->getInvoices()[0];

            Log::info('Xero API: Created invoice', [
                'organisation_id' => $organisation->id,
                'xero_invoice_id' => $createdInvoice->getInvoiceId(),
                'xero_invoice_number' => $createdInvoice->getInvoiceNumber(),
            ]);

            return $createdInvoice;

        } catch (ApiException $e) {
            Log::error('Xero API: Failed to create invoice', [
                'organisation_id' => $organisation->id,
                'error' => $e->getMessage(),
                'invoice_data' => $invoiceData,
            ]);

            throw XeroApiException::requestFailed($organisation, 'POST /Invoices', $e);
        }
    }

    /**
     * Email an invoice to the customer.
     *
     * @throws XeroApiException
     */
    public function emailInvoice(Organisation $organisation, string $xeroInvoiceId): bool
    {
        $this->checkRateLimit($organisation);

        try {
            $config = $this->tokenService->getConfiguration($organisation);
            $accountingApi = new AccountingApi(null, $config);

            $tenantId = $this->getTenantId($organisation);

            $accountingApi->emailInvoice($tenantId, $xeroInvoiceId);

            $this->recordApiCall($organisation);

            Log::info('Xero API: Emailed invoice', [
                'organisation_id' => $organisation->id,
                'xero_invoice_id' => $xeroInvoiceId,
            ]);

            return true;

        } catch (ApiException $e) {
            Log::error('Xero API: Failed to email invoice', [
                'organisation_id' => $organisation->id,
                'xero_invoice_id' => $xeroInvoiceId,
                'error' => $e->getMessage(),
            ]);

            throw XeroApiException::requestFailed($organisation, "POST /Invoices/{$xeroInvoiceId}/Email", $e);
        }
    }

    /**
     * Get the online invoice URL for sharing with customers.
     */
    public function getOnlineInvoiceUrl(Organisation $organisation, string $xeroInvoiceId): ?string
    {
        $this->checkRateLimit($organisation);

        try {
            $config = $this->tokenService->getConfiguration($organisation);
            $accountingApi = new AccountingApi(null, $config);

            $tenantId = $this->getTenantId($organisation);

            $onlineInvoice = $accountingApi->getOnlineInvoice($tenantId, $xeroInvoiceId);

            $this->recordApiCall($organisation);

            return $onlineInvoice->getOnlineInvoices()[0]->getOnlineInvoiceUrl() ?? null;

        } catch (ApiException $e) {
            Log::warning('Xero API: Failed to get online invoice URL', [
                'organisation_id' => $organisation->id,
                'xero_invoice_id' => $xeroInvoiceId,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Build a WHERE clause from filters for invoice queries.
     */
    private function buildInvoiceWhereClause(array $filters): ?string
    {
        $conditions = [];

        // Filter by contact IDs
        if (! empty($filters['contact_ids'])) {
            $contactIds = array_map(fn ($id) => "Contact.ContactID == GUID(\"{$id}\")", $filters['contact_ids']);
            $conditions[] = '('.implode(' OR ', $contactIds).')';
        }

        // Filter by status
        if (! empty($filters['status'])) {
            $conditions[] = "Status == \"{$filters['status']}\"";
        }

        // Filter by date range
        if (! empty($filters['date_from'])) {
            $conditions[] = "Date >= DateTime({$filters['date_from']})";
        }

        if (! empty($filters['date_to'])) {
            $conditions[] = "Date <= DateTime({$filters['date_to']})";
        }

        // Filter by invoice type (default to ACCREC - Accounts Receivable)
        if (! empty($filters['type'])) {
            $conditions[] = "Type == \"{$filters['type']}\"";
        } else {
            $conditions[] = 'Type == "ACCREC"';
        }

        return ! empty($conditions) ? implode(' AND ', $conditions) : null;
    }

    /**
     * Build an Invoice object from array data.
     */
    private function buildInvoiceObject(array $data): Invoice
    {
        $invoice = new Invoice();

        // Required: Contact
        $invoice->setContact(new \XeroAPI\XeroPHP\Models\Accounting\Contact([
            'contact_id' => $data['contact_id'],
        ]));

        // Required: Type (ACCREC = Accounts Receivable)
        $invoice->setType($data['type'] ?? Invoice::TYPE_ACCREC);

        // Required: Line items
        $lineItems = [];
        foreach ($data['line_items'] as $item) {
            $lineItem = new \XeroAPI\XeroPHP\Models\Accounting\LineItem();
            $lineItem->setDescription($item['description']);
            $lineItem->setQuantity($item['quantity']);
            $lineItem->setUnitAmount($item['unit_amount']);
            $lineItem->setAccountCode($item['account_code'] ?? null);
            $lineItem->setItemCode($item['item_code'] ?? null);
            $lineItem->setTaxType($item['tax_type'] ?? 'OUTPUT2'); // Default UK VAT

            $lineItems[] = $lineItem;
        }
        $invoice->setLineItems($lineItems);

        // Optional: Dates
        if (! empty($data['date'])) {
            $invoice->setDate(new \DateTime($data['date']));
        }

        if (! empty($data['due_date'])) {
            $invoice->setDueDate(new \DateTime($data['due_date']));
        }

        // Optional: Reference
        if (! empty($data['reference'])) {
            $invoice->setReference($data['reference']);
        }

        // Optional: Status (DRAFT or AUTHORISED)
        $invoice->setStatus($data['status'] ?? Invoice::STATUS_AUTHORISED);

        // Line amount type (Exclusive = amounts exclude tax)
        $invoice->setLineAmountTypes(\XeroAPI\XeroPHP\Models\Accounting\LineAmountTypes::EXCLUSIVE);

        return $invoice;
    }

    /**
     * Check if the organisation has exceeded the API rate limit.
     *
     * @throws XeroApiException
     */
    private function checkRateLimit(Organisation $organisation): void
    {
        // Check per-minute rate limit
        $minuteKey = "xero_rate_limit_minute_{$organisation->id}";
        $minuteCount = Cache::get($minuteKey, 0);

        if ($minuteCount >= self::RATE_LIMIT_PER_MINUTE) {
            throw XeroApiException::rateLimitExceeded($organisation);
        }

        // Check per-day rate limit
        $dayKey = "xero_rate_limit_day_{$organisation->id}";
        $dayCount = Cache::get($dayKey, 0);

        if ($dayCount >= self::RATE_LIMIT_PER_DAY) {
            throw XeroApiException::rateLimitExceeded($organisation);
        }
    }

    /**
     * Record an API call for rate limiting.
     */
    private function recordApiCall(Organisation $organisation): void
    {
        // Increment per-minute counter
        $minuteKey = "xero_rate_limit_minute_{$organisation->id}";
        $minuteCount = Cache::get($minuteKey, 0);
        Cache::put($minuteKey, $minuteCount + 1, now()->addMinute());

        // Increment per-day counter
        $dayKey = "xero_rate_limit_day_{$organisation->id}";
        $dayCount = Cache::get($dayKey, 0);
        Cache::put($dayKey, $dayCount + 1, now()->endOfDay());
    }

    /**
     * Get the Xero tenant ID for the organisation.
     *
     * This should be stored in organisation settings after OAuth connection.
     */
    private function getTenantId(Organisation $organisation): string
    {
        $tenantIdSetting = $organisation->settings()
            ->where('module', 'Xero')
            ->where('key', 'XERO_TENANT_ID')
            ->first();

        if (! $tenantIdSetting || ! $tenantIdSetting->value) {
            throw new \RuntimeException(
                "Xero tenant ID not found for organisation {$organisation->id}. Please reconnect to Xero."
            );
        }

        return $tenantIdSetting->value;
    }
}
