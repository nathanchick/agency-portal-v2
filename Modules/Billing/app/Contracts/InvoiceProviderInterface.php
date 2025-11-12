<?php

namespace Modules\Billing\Contracts;

use Illuminate\Support\Collection;
use Modules\Billing\DataTransferObjects\InvoiceDTO;
use Modules\Customer\Models\Customer;

/**
 * InvoiceProviderInterface
 *
 * Contract that all billing providers must implement.
 * Allows different accounting systems (Xero, QuickBooks, etc.) to be used interchangeably.
 */
interface InvoiceProviderInterface
{
    /**
     * Get the provider name (e.g., 'xero', 'quickbooks').
     */
    public function getProviderName(): string;

    /**
     * Check if this provider is available for the given customer.
     */
    public function isAvailable(Customer $customer): bool;

    /**
     * Get all invoices for a customer.
     *
     * @return Collection<InvoiceDTO>
     */
    public function getInvoices(Customer $customer, array $filters = []): Collection;

    /**
     * Get a single invoice by ID.
     *
     * @throws \Modules\Billing\Exceptions\InvoiceNotFoundException
     */
    public function getInvoice(Customer $customer, string $invoiceId): InvoiceDTO;

    /**
     * Get invoice statistics for a customer.
     *
     * @return array{
     *     total_count: int,
     *     total_value: float,
     *     unpaid_count: int,
     *     unpaid_value: float,
     *     overdue_count: int,
     *     overdue_value: float
     * }
     */
    public function getStatistics(Customer $customer): array;
}
