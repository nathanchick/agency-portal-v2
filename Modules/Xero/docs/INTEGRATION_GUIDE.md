# Xero Integration Guide

This guide provides detailed instructions for integrating Xero invoice creation into the portal's existing controllers and workflows.

## Prerequisites

Before implementing the integrations below, ensure:

1. ✅ Xero module migrations have been run
2. ✅ Each organisation has created their own Xero app at https://developer.xero.com/app/manage
3. ✅ Organisation settings are configured with `XERO_CLIENT_ID` and `XERO_CLIENT_SECRET`
4. ✅ Organisation has connected to Xero via OAuth (`/xero/oauth/connect`)
5. ✅ Customers have `xero_contact_id` set (linking them to Xero contacts)

## Table of Contents

1. [Budget Period Reconciliation Integration](#budget-period-reconciliation-integration)
2. [Budget Adjustment Integration](#budget-adjustment-integration)
3. [Frontend Integration](#frontend-integration)
4. [Testing](#testing)

---

## Budget Period Reconciliation Integration

### Overview

When a user reconciles a budget period and selects the "invoice separately" option, the system should create an invoice in Xero for that period.

### Controller Integration

**File:** `Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php`

Add the following to the reconciliation method:

```php
use Modules\Xero\Jobs\CreateXeroInvoiceJob;
use Modules\Xero\Services\XeroInvoiceCreationService;

/**
 * Reconcile a budget period.
 */
public function reconcile(Request $request, string $id): RedirectResponse
{
    $budgetPeriod = ServiceBudgetPeriod::findOrFail($id);

    $validated = $request->validate([
        'actual_hours' => 'required|numeric|min:0',
        'reconciliation_notes' => 'nullable|string',
        'invoice_separately' => 'boolean',
        'send_invoice_email' => 'boolean',
    ]);

    // Update budget period with reconciliation data
    $budgetPeriod->update([
        'actual_hours' => $validated['actual_hours'],
        'reconciliation_notes' => $validated['reconciliation_notes'],
        'reconciled_at' => now(),
    ]);

    // If user selected "invoice separately", create Xero invoice
    if ($validated['invoice_separately'] ?? false) {
        $customer = $budgetPeriod->serviceBudget->service->customer;

        // Check if customer has Xero contact ID
        if ($customer->xero_contact_id) {
            // Dispatch job to create invoice in background
            CreateXeroInvoiceJob::dispatch(
                'budget_period',
                $budgetPeriod->id,
                [
                    'send_email' => $validated['send_invoice_email'] ?? false,
                    'due_days' => 30, // Configurable
                ]
            );

            return redirect()->back()->with('success',
                'Budget period reconciled. Xero invoice is being created in the background.');
        } else {
            return redirect()->back()->with('warning',
                'Budget period reconciled, but customer is not linked to Xero. Please link customer to create invoice.');
        }
    }

    return redirect()->back()->with('success', 'Budget period reconciled successfully.');
}
```

### Synchronous Alternative

If you prefer to create the invoice synchronously (not recommended for UX):

```php
use Modules\Xero\Services\XeroInvoiceCreationService;

public function reconcile(Request $request, string $id, XeroInvoiceCreationService $invoiceService): RedirectResponse
{
    // ... reconciliation logic ...

    if ($validated['invoice_separately'] ?? false) {
        try {
            $result = $invoiceService->createInvoiceFromBudgetPeriod($budgetPeriod, [
                'send_email' => $validated['send_invoice_email'] ?? false,
                'due_days' => 30,
            ]);

            return redirect()->back()->with('success',
                "Budget period reconciled. Invoice {$result['xero_invoice_number']} created in Xero.");

        } catch (\Exception $e) {
            Log::error('Failed to create Xero invoice', ['error' => $e->getMessage()]);

            return redirect()->back()->with('warning',
                'Budget period reconciled, but failed to create Xero invoice: ' . $e->getMessage());
        }
    }
}
```

---

## Budget Adjustment Integration

### Overview

When a user makes a budget adjustment (increase/decrease/rate change), they should have the option to create a one-time or recurring invoice in Xero.

### Controller Integration

**File:** `Modules/Timesheet/app/Http/Controllers/ServiceController.php`

Add to the budget adjustment method:

```php
use Modules\Xero\Jobs\CreateXeroInvoiceJob;

/**
 * Create a budget adjustment.
 */
public function adjustBudget(Request $request, string $serviceId): RedirectResponse
{
    $service = Service::findOrFail($serviceId);

    $validated = $request->validate([
        'change_type' => 'required|in:increase,decrease,rate_change',
        'hours_change' => 'required|numeric',
        'new_hourly_rate' => 'nullable|numeric',
        'reason' => 'nullable|string',
        'effective_date' => 'required|date',
        'create_invoice' => 'boolean',
        'invoice_type' => 'nullable|in:one_time,recurring',
        'send_invoice_email' => 'boolean',
    ]);

    // Create budget change record
    $budgetChange = ServiceBudgetChange::create([
        'service_budget_id' => $service->currentBudget->id,
        'change_type' => $validated['change_type'],
        'hours_change' => $validated['hours_change'],
        'new_hourly_rate' => $validated['new_hourly_rate'],
        'reason' => $validated['reason'],
        'effective_date' => $validated['effective_date'],
        'approved_by' => auth()->id(),
        'approved_at' => now(),
    ]);

    // Apply the change to the budget
    $service->currentBudget->applyChange($budgetChange);

    // If user selected to create invoice
    if ($validated['create_invoice'] ?? false) {
        $customer = $service->customer;

        if ($customer->xero_contact_id) {
            // Dispatch job to create invoice
            CreateXeroInvoiceJob::dispatch(
                'budget_change',
                $budgetChange->id,
                [
                    'invoice_type' => $validated['invoice_type'] ?? 'one_time',
                    'send_email' => $validated['send_invoice_email'] ?? false,
                    'due_days' => 30,
                ]
            );

            return redirect()->back()->with('success',
                'Budget adjusted. Xero invoice is being created in the background.');
        } else {
            return redirect()->back()->with('warning',
                'Budget adjusted, but customer is not linked to Xero.');
        }
    }

    return redirect()->back()->with('success', 'Budget adjusted successfully.');
}
```

---

## Frontend Integration

### Reconciliation Dialog

Add Xero invoice options to the reconciliation dialog:

```vue
<!-- In your reconciliation form component -->
<template>
  <form @submit.prevent="submit">
    <!-- Existing fields -->
    <input v-model="form.actual_hours" type="number" />
    <textarea v-model="form.reconciliation_notes"></textarea>

    <!-- Xero invoice options -->
    <div v-if="customer.xero_contact_id" class="xero-options">
      <label>
        <input
          v-model="form.invoice_separately"
          type="checkbox"
        />
        Create invoice in Xero
      </label>

      <div v-if="form.invoice_separately" class="ml-4">
        <label>
          <input
            v-model="form.send_invoice_email"
            type="checkbox"
          />
          Send invoice email to customer
        </label>
      </div>
    </div>

    <div v-else class="text-warning">
      Customer is not linked to Xero.
      <a :href="route('customers.edit', customer.id)">Link now</a>
    </div>

    <button type="submit">Reconcile Period</button>
  </form>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'

const props = defineProps({
  budgetPeriod: Object,
  customer: Object
})

const form = useForm({
  actual_hours: props.budgetPeriod.actual_hours,
  reconciliation_notes: props.budgetPeriod.reconciliation_notes,
  invoice_separately: false,
  send_invoice_email: false
})

const submit = () => {
  form.post(route('budget-periods.reconcile', props.budgetPeriod.id))
}
</script>
```

### Budget Adjustment Dialog

Add Xero invoice options to the budget adjustment dialog:

```vue
<!-- In your budget adjustment form component -->
<template>
  <form @submit.prevent="submit">
    <!-- Existing fields -->
    <select v-model="form.change_type">
      <option value="increase">Increase Budget</option>
      <option value="decrease">Decrease Budget</option>
      <option value="rate_change">Rate Change</option>
    </select>

    <input v-model="form.hours_change" type="number" />
    <textarea v-model="form.reason"></textarea>

    <!-- Xero invoice options -->
    <div v-if="customer.xero_contact_id" class="xero-options">
      <label>
        <input
          v-model="form.create_invoice"
          type="checkbox"
        />
        Create invoice in Xero
      </label>

      <div v-if="form.create_invoice" class="ml-4 space-y-2">
        <div>
          <label class="block">Invoice Type</label>
          <select v-model="form.invoice_type">
            <option value="one_time">One-time invoice</option>
            <option value="recurring">Recurring invoice</option>
          </select>
        </div>

        <label>
          <input
            v-model="form.send_invoice_email"
            type="checkbox"
          />
          Send invoice email to customer
        </label>
      </div>
    </div>

    <button type="submit">Adjust Budget</button>
  </form>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3'

const props = defineProps({
  service: Object,
  customer: Object
})

const form = useForm({
  change_type: 'increase',
  hours_change: 0,
  new_hourly_rate: null,
  reason: '',
  effective_date: new Date().toISOString().split('T')[0],
  create_invoice: false,
  invoice_type: 'one_time',
  send_invoice_email: false
})

const submit = () => {
  form.post(route('services.adjust-budget', props.service.id))
}
</script>
```

---

## Testing

### Manual Testing Checklist

#### Budget Period Reconciliation

1. ✅ Navigate to a service with a budget period
2. ✅ Click "Reconcile" on the period
3. ✅ Enter actual hours
4. ✅ Check "Create invoice in Xero"
5. ✅ Optionally check "Send invoice email"
6. ✅ Submit reconciliation
7. ✅ Verify success message
8. ✅ Check job queue (`php artisan queue:work`)
9. ✅ Verify invoice created in Xero
10. ✅ Verify `xero_invoice_id` linked to budget period
11. ✅ Verify invoice synced back to portal

#### Budget Adjustment

1. ✅ Navigate to a service
2. ✅ Click "Adjust Budget"
3. ✅ Select change type (increase/decrease/rate change)
4. ✅ Enter hours and reason
5. ✅ Check "Create invoice in Xero"
6. ✅ Select invoice type (one-time/recurring)
7. ✅ Submit adjustment
8. ✅ Verify success message
9. ✅ Check job queue
10. ✅ Verify invoice created in Xero
11. ✅ Verify `xero_invoice_id` linked to budget change

### Unit Testing

#### Test Invoice Creation from Budget Period

```php
use Modules\Xero\Services\XeroInvoiceCreationService;
use Tests\TestCase;

class XeroInvoiceCreationTest extends TestCase
{
    public function test_creates_invoice_from_budget_period()
    {
        // Arrange
        $customer = Customer::factory()->create([
            'xero_contact_id' => 'xero-contact-123',
        ]);

        $service = Service::factory()->create([
            'customer_id' => $customer->id,
        ]);

        $budgetPeriod = ServiceBudgetPeriod::factory()->create([
            'service_budget_id' => $service->currentBudget->id,
            'actual_hours' => 40,
            'reconciled_at' => now(),
        ]);

        // Mock Xero API
        // ... setup mocks ...

        // Act
        $service = app(XeroInvoiceCreationService::class);
        $result = $service->createInvoiceFromBudgetPeriod($budgetPeriod);

        // Assert
        $this->assertTrue($result['success']);
        $this->assertNotNull($result['xero_invoice_id']);
        $budgetPeriod->refresh();
        $this->assertNotNull($budgetPeriod->xero_invoice_id);
    }
}
```

---

## Configuration

### Organisation Settings

**Before connecting to Xero**, each organisation must configure these settings in the portal's organisation settings page:

**Required:**
- `XERO_CLIENT_ID` - Your Xero OAuth 2.0 Client ID (from Xero Developer Portal)
- `XERO_CLIENT_SECRET` - Your Xero OAuth 2.0 Client Secret (from Xero Developer Portal)

**Optional:**
- `XERO_DEFAULT_ACCOUNT_CODE` - Default sales account code for invoices (e.g., 200 for Sales)

**Auto-filled:**
- `XERO_TENANT_ID` - Automatically filled after OAuth connection (do not edit manually)

> **Important:** Each organisation needs to create their own Xero app at https://developer.xero.com/app/manage and use those credentials. This ensures proper multi-tenancy where each organisation connects to their own Xero account.

### Customer Settings

Each customer can optionally configure:

- `xero_contact_id` - Linked Xero contact (required for invoicing)
- `XERO_ACCOUNT_CODE` - Custom account code for this customer's invoices (overrides organisation default)

---

## Error Handling

The integration handles errors gracefully:

1. **Missing Xero Contact ID**: Shows warning, skips invoice creation
2. **Xero API Errors**: Logs error, retries job up to 3 times
3. **Rate Limiting**: Throws exception, job will retry
4. **Invalid Tokens**: Requires user to reconnect OAuth

---

## Next Steps

1. Implement the controller integrations shown above
2. Add frontend components with Xero options
3. Test thoroughly in Xero sandbox environment
4. Configure organisation and customer settings
5. Deploy to production and monitor logs
