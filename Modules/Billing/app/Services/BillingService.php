<?php

namespace Modules\Billing\Services;

use Illuminate\Support\Collection;
use Modules\Billing\Contracts\InvoiceProviderInterface;
use Modules\Billing\DataTransferObjects\InvoiceDTO;
use Modules\Billing\Exceptions\BillingProviderNotAvailableException;
use Modules\Billing\Providers\XeroInvoiceProvider;
use Modules\Customer\Models\Customer;

/**
 * BillingService
 *
 * Central service that routes billing operations to the appropriate provider.
 * Determines which provider (Xero, QuickBooks, etc.) to use based on customer configuration.
 */
class BillingService
{
    /**
     * @var array<string, InvoiceProviderInterface>
     */
    private array $providers = [];

    public function __construct(
        XeroInvoiceProvider $xeroProvider,
        // Add other providers here as they're implemented:
        // QuickBooksInvoiceProvider $quickbooksProvider,
    ) {
        // Register available providers
        $this->registerProvider($xeroProvider);
        // $this->registerProvider($quickbooksProvider);
    }

    /**
     * Register a provider.
     */
    private function registerProvider(InvoiceProviderInterface $provider): void
    {
        $this->providers[$provider->getProviderName()] = $provider;
    }

    /**
     * Get the appropriate provider for a customer.
     *
     * @throws BillingProviderNotAvailableException
     */
    public function getProviderForCustomer(Customer $customer): InvoiceProviderInterface
    {
        // Try providers in order of preference
        // 1. Check for explicit setting in customer_settings table
        $preferredProvider = $customer->settings()
            ->where('module', 'Billing')
            ->where('key', 'billing_provider')
            ->first()?->value;

        if ($preferredProvider && isset($this->providers[$preferredProvider])) {
            $provider = $this->providers[$preferredProvider];
            if ($provider->isAvailable($customer)) {
                return $provider;
            }
        }

        // 2. Auto-detect by checking which providers are available
        foreach ($this->providers as $provider) {
            if ($provider->isAvailable($customer)) {
                return $provider;
            }
        }

        throw new BillingProviderNotAvailableException($customer->id);
    }

    /**
     * Get all invoices for a customer.
     *
     * @return Collection<InvoiceDTO>
     *
     * @throws BillingProviderNotAvailableException
     */
    public function getInvoices(Customer $customer, array $filters = []): Collection
    {
        $provider = $this->getProviderForCustomer($customer);

        return $provider->getInvoices($customer, $filters);
    }

    /**
     * Get a single invoice.
     *
     * @throws BillingProviderNotAvailableException
     * @throws \Modules\Billing\Exceptions\InvoiceNotFoundException
     */
    public function getInvoice(Customer $customer, string $invoiceId): InvoiceDTO
    {
        $provider = $this->getProviderForCustomer($customer);

        return $provider->getInvoice($customer, $invoiceId);
    }

    /**
     * Get invoice statistics.
     *
     * @return array{
     *     total_count: int,
     *     total_value: float,
     *     unpaid_count: int,
     *     unpaid_value: float,
     *     overdue_count: int,
     *     overdue_value: float
     * }
     *
     * @throws BillingProviderNotAvailableException
     */
    public function getStatistics(Customer $customer): array
    {
        $provider = $this->getProviderForCustomer($customer);

        return $provider->getStatistics($customer);
    }

    /**
     * Get the name of the provider being used for a customer.
     *
     * @throws BillingProviderNotAvailableException
     */
    public function getProviderName(Customer $customer): string
    {
        return $this->getProviderForCustomer($customer)->getProviderName();
    }

    /**
     * Get all registered providers.
     *
     * @return array<string, InvoiceProviderInterface>
     */
    public function getProviders(): array
    {
        return $this->providers;
    }
}
