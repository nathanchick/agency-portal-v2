# Billing Module

Provider-agnostic billing module that provides a unified interface for multiple accounting systems (Xero, QuickBooks, etc.).

## Architecture

The Billing module uses the **Adapter Pattern** to provide a consistent interface regardless of which accounting provider is used.

```
Customer Request
    ↓
BillingController
    ↓
BillingService (Router)
    ↓
InvoiceProviderInterface (Contract)
    ↓
┌───────────────┬─────────────────────┐
│               │                     │
XeroInvoiceProvider  QuickBooksProvider  (Future)
│               │                     │
XeroInvoice     QuickBooksInvoice   (Provider-specific models)
```

### Key Components

#### 1. **Contracts**
- `InvoiceProviderInterface` - Contract that all providers must implement
- Ensures consistent API regardless of underlying provider

#### 2. **Data Transfer Objects (DTOs)**
- `InvoiceDTO` - Normalized invoice data structure
- `LineItemDTO` - Normalized line item data structure
- Provides consistent data format to frontend

#### 3. **Providers**
- `XeroInvoiceProvider` - Adapter for Xero invoices
- Future: `QuickBooksInvoiceProvider`, `StripeInvoiceProvider`, etc.

#### 4. **Services**
- `BillingService` - Routes requests to appropriate provider based on customer configuration

#### 5. **Controllers**
- `Customer/BillingController` - Customer-facing billing interface

## Provider Selection

The `BillingService` determines which provider to use based on:

1. **Explicit customer setting**: `customer_settings` table with `module='Billing'` and `key='billing_provider'`
2. **Auto-detection**: Checks which providers are available for the customer (e.g., has `xero_contact_id`)

## URLs

All billing pages use provider-agnostic URLs:
- `/customer/billing` - Invoice list
- `/customer/billing/{id}` - Invoice detail
- `/customer/billing/stats` - Billing statistics

This means customers see the same URLs regardless of whether you're using Xero, QuickBooks, or any other provider.

## Adding a New Provider

To add support for QuickBooks (or any other provider):

### 1. Create the Provider Class

```php
// Modules/Billing/app/Providers/QuickBooksInvoiceProvider.php

class QuickBooksInvoiceProvider implements InvoiceProviderInterface
{
    public function getProviderName(): string
    {
        return 'quickbooks';
    }

    public function isAvailable(Customer $customer): bool
    {
        // Check if customer has QuickBooks configured
        return !empty($customer->quickbooks_customer_id);
    }

    public function getInvoices(Customer $customer, array $filters = []): Collection
    {
        // Fetch from quickbooks_invoices table
        // Transform to InvoiceDTO
    }

    // ... implement other interface methods
}
```

### 2. Register the Provider

In `BillingServiceProvider.php`:

```php
public function register(): void
{
    $this->app->singleton(\Modules\Billing\Providers\QuickBooksInvoiceProvider::class);

    // ... existing code
}
```

In `BillingService.php` constructor:

```php
public function __construct(
    XeroInvoiceProvider $xeroProvider,
    QuickBooksInvoiceProvider $quickbooksProvider, // Add this
) {
    $this->registerProvider($xeroProvider);
    $this->registerProvider($quickbooksProvider); // Add this
}
```

### 3. Create Provider-Specific Models (if needed)

If storing QuickBooks invoices separately:

```php
// Modules/QuickBooks/app/Models/QuickBooksInvoice.php
class QuickBooksInvoice extends Model
{
    // QuickBooks-specific invoice storage
}
```

### 4. Create DTO Converter

Add a static method to `InvoiceDTO`:

```php
public static function fromQuickBooksInvoice(QuickBooksInvoice $invoice): self
{
    // Transform QuickBooks invoice to normalized DTO
}
```

That's it! No frontend changes needed - the customer billing pages will automatically work with the new provider.

## Data Normalization

The DTOs normalize provider-specific statuses into common statuses:

| Provider Status | Normalized Status |
|----------------|-------------------|
| DRAFT          | draft             |
| SUBMITTED      | submitted         |
| AUTHORISED     | approved          |
| APPROVED       | approved          |
| PAID           | paid              |
| VOIDED         | cancelled         |
| DELETED        | cancelled         |

## Customer Configuration

To set a specific provider for a customer:

```php
$customer->settings()->create([
    'module' => 'Billing',
    'key' => 'billing_provider',
    'value' => 'xero', // or 'quickbooks', etc.
]);
```

If not set, the system will auto-detect based on available providers.

## Usage Example

```php
use Modules\Billing\Services\BillingService;

$billingService = app(BillingService::class);

// Get invoices (automatically uses correct provider)
$invoices = $billingService->getInvoices($customer);

// Get single invoice
$invoice = $billingService->getInvoice($customer, $invoiceId);

// Get statistics
$stats = $billingService->getStatistics($customer);

// Check which provider is being used
$providerName = $billingService->getProviderName($customer);
```

## Frontend

Frontend pages are located at:
- `resources/js/pages/customer/billing/index.tsx`
- `resources/js/pages/customer/billing/show.tsx`

These pages receive normalized InvoiceDTO data and work with any provider.

## Benefits

1. **Provider-agnostic**: Switch billing providers without changing customer-facing code
2. **Consistent UX**: Customers always see `/customer/billing` regardless of provider
3. **Easy to extend**: Adding new providers is straightforward
4. **Type-safe**: DTOs ensure consistent data structure
5. **Testable**: Each provider can be tested independently

## Future Enhancements

- Payment processing integration
- Payment method management
- Subscription management
- Multi-currency support
- Invoice PDF generation
- Email invoice functionality
