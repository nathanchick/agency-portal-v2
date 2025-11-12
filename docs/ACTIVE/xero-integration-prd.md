# Xero Integration Module - Product Requirements Document

## Executive Summary

### Problem Statement

The organization needs to integrate with Xero accounting software to:
1. Automatically fetch and import invoices from Xero for customers
2. Create invoices in Xero when reconciling time budget periods with overage
3. Create invoices in Xero when increasing service budgets
4. Maintain accurate financial records between the portal and Xero

Currently, the Xero module has basic configuration but lacks the core functionality to sync invoices and create them from the portal.

### Proposed Solution

Implement a comprehensive Xero integration that:
- **Invoice Fetching**: Scheduled jobs to import invoices from Xero for customers with `xero_contact_id`
- **Invoice Creation from Reconciliation**: When reconciling budget periods with "invoice_separately" option, optionally create the invoice in Xero
- **Invoice Creation from Budget Adjustments**: When increasing service budgets, optionally create invoices (including recurring invoices for multi-month periods) in Xero
- **OAuth Token Management**: Automated token refresh system to maintain API access
- **Audit Trail**: Complete tracking of all Xero operations with success/failure logging

### Key Benefits

- **Automated Workflows**: Reduce manual data entry between systems
- **Accurate Billing**: Ensure all billable hours are invoiced correctly
- **Time Savings**: Eliminate duplicate invoice creation
- **Visibility**: Track invoice status and sync history
- **Flexibility**: Support both one-time and recurring invoices

### Key Risks

- **API Rate Limits**: Xero has rate limits that could impact bulk operations
- **Token Expiry**: OAuth tokens expire and require refresh mechanism
- **Data Consistency**: Syncing between two systems requires careful conflict handling
- **Customer Mapping**: All customers must have valid `xero_contact_id` for invoicing
- **Timezone Issues**: Date handling between systems must be consistent

---

## Technical Analysis

### Current Architecture Assessment

#### Existing Components

**Xero Module Structure:**
```
Modules/Xero/
├── config/config.php           # Organisation & customer settings
├── app/
│   ├── Http/Controllers/
│   │   └── XeroController.php  # Stub controller
│   └── Providers/
└── examples/
    └── service/
        ├── InvoiceService.php      # Example invoice creation
        └── XeroRefreshToken.php    # Example token refresh
```

**Configuration (`Xero/config/config.php`):**
- Organisation-level settings:
  - `status` (yes/no): Enable/disable Xero integration
  - `XERO_TENANT_ID`: Xero tenant identifier
  - `XERO_CLIENT_ID`: OAuth client ID
  - `XERO_CLIENT_SECRET`: Encrypted OAuth client secret
- Customer-level settings:
  - `xero_contact_id`: Links portal customer to Xero contact

**Existing Models:**
- `Customer`: Has settings relationship for `xero_contact_id`
- `Service`: Timesheet services with budgets
- `ServiceBudgetPeriod`: Budget periods that can be reconciled
- `ServiceBudgetChange`: Tracks budget adjustments

**Existing Functionality:**
- Module settings system (organisation and customer level)
- Budget period reconciliation with "invoice_separately" option
- Service budget adjustment workflow
- Example code for invoice creation and token refresh

#### Integration Points

**1. Budget Period Reconciliation**
- Location: `Modules/Timesheet/app/Http/Controllers/ServiceBudgetPeriodController.php`
- Method: `reconcile()`
- Currently supports reconciliation actions: `rollover`, `lose`, `invoice_separately`, `deduct_next`
- When user selects "invoice_separately", we need to:
  - Check if Xero module is enabled
  - Check if customer has `xero_contact_id`
  - Optionally create invoice in Xero
  - Store reference to created Xero invoice

**2. Service Budget Adjustments**
- Location: `Modules/Timesheet/app/Http/Controllers/ServiceController.php`
- Route: `POST /timesheet/services/{service}/budget-adjustments`
- Method: `storeBudgetAdjustment()`
- Currently creates `ServiceBudgetChange` records
- Need to add Xero invoice creation option for budget increases

**3. Customer Management**
- Location: `Modules/Customer/app/Models/Customer.php`
- Has `settings()` relationship for storing `xero_contact_id`
- Settings managed via `ModuleSettingsService`

### Proposed Changes

#### New Database Tables

**1. `xero_invoices` Table**
```php
Schema::create('xero_invoices', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->uuid('organisation_id')->index();
    $table->uuid('customer_id')->index();
    $table->string('xero_invoice_id')->unique();
    $table->string('xero_invoice_number')->nullable();
    $table->string('invoice_type'); // ACCREC, ACCPAY
    $table->string('status'); // DRAFT, SUBMITTED, AUTHORISED, etc.
    $table->date('date');
    $table->date('due_date')->nullable();
    $table->decimal('subtotal', 10, 2)->default(0);
    $table->decimal('total_tax', 10, 2)->default(0);
    $table->decimal('total', 10, 2)->default(0);
    $table->decimal('amount_due', 10, 2)->default(0);
    $table->decimal('amount_paid', 10, 2)->default(0);
    $table->string('currency_code', 3)->default('GBP');
    $table->string('reference')->nullable();
    $table->text('line_items')->nullable(); // JSON
    $table->string('online_invoice_url')->nullable();
    $table->timestamp('fully_paid_at')->nullable();
    $table->json('raw_data')->nullable();
    $table->timestamp('last_synced_at')->nullable();
    $table->timestamps();

    $table->foreign('organisation_id')->references('id')->on('organisations')->onDelete('cascade');
    $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
});
```

**2. `xero_invoice_line_items` Table** (Optional - if we want normalized storage)
```php
Schema::create('xero_invoice_line_items', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->uuid('xero_invoice_id');
    $table->string('xero_line_item_id')->nullable();
    $table->string('description');
    $table->decimal('quantity', 10, 2);
    $table->decimal('unit_amount', 10, 2);
    $table->string('account_code')->nullable();
    $table->string('item_code')->nullable();
    $table->string('tax_type')->nullable();
    $table->decimal('tax_amount', 10, 2)->default(0);
    $table->decimal('line_amount', 10, 2);
    $table->timestamps();

    $table->foreign('xero_invoice_id')->references('id')->on('xero_invoices')->onDelete('cascade');
});
```

**3. `xero_sync_logs` Table**
```php
Schema::create('xero_sync_logs', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->uuid('organisation_id')->index();
    $table->string('sync_type'); // fetch_invoices, create_invoice, update_invoice
    $table->string('status'); // success, failed, partial
    $table->text('message')->nullable();
    $table->integer('records_processed')->default(0);
    $table->integer('records_succeeded')->default(0);
    $table->integer('records_failed')->default(0);
    $table->json('error_details')->nullable();
    $table->timestamp('started_at');
    $table->timestamp('completed_at')->nullable();
    $table->timestamps();

    $table->foreign('organisation_id')->references('id')->on('organisations')->onDelete('cascade');
});
```

**4. `xero_oauth_tokens` Table**
```php
Schema::create('xero_oauth_tokens', function (Blueprint $table) {
    $table->uuid('id')->primary();
    $table->uuid('organisation_id')->unique();
    $table->text('access_token');
    $table->text('refresh_token');
    $table->timestamp('access_token_expires_at');
    $table->timestamp('refresh_token_expires_at');
    $table->timestamps();

    $table->foreign('organisation_id')->references('id')->on('organisations')->onDelete('cascade');
});
```

**5. Link Budget Periods to Xero Invoices**
Add to `timesheet_service_budget_periods`:
```php
$table->uuid('xero_invoice_id')->nullable()->after('reconciliation_notes');
$table->foreign('xero_invoice_id')->references('id')->on('xero_invoices')->onDelete('set null');
```

**6. Link Budget Changes to Xero Invoices**
Add to `timesheet_service_budget_changes`:
```php
$table->uuid('xero_invoice_id')->nullable();
$table->string('xero_invoice_type')->nullable(); // one_time, recurring
$table->foreign('xero_invoice_id')->references('id')->on('xero_invoices')->onDelete('set null');
```

#### New Services

**1. `XeroApiService`**
- Handles all Xero API communication
- Manages authentication/token handling
- Methods:
  - `getInvoices(array $contactIds = [], array $filters = [])`: Fetch invoices
  - `getInvoice(string $invoiceId)`: Fetch single invoice
  - `createInvoice(array $invoiceData)`: Create new invoice
  - `emailInvoice(string $invoiceId)`: Send invoice via email
  - `createRepeatingInvoice(array $invoiceData)`: Create recurring invoice
  - `getOnlineInvoiceUrl(string $invoiceId)`: Get shareable URL

**2. `XeroTokenService`**
- Manages OAuth token lifecycle
- Methods:
  - `getAccessToken(Organisation $organisation)`: Get valid access token
  - `refreshToken(Organisation $organisation)`: Refresh expired token
  - `isTokenValid(Organisation $organisation)`: Check token expiry
  - `revokeToken(Organisation $organisation)`: Revoke access

**3. `XeroInvoiceSyncService`**
- Syncs invoices from Xero to portal
- Methods:
  - `syncInvoicesForCustomer(Customer $customer)`: Sync one customer
  - `syncInvoicesForOrganisation(Organisation $organisation)`: Sync all customers
  - `processInvoiceData(array $xeroInvoice, Customer $customer)`: Parse and store

**4. `XeroInvoiceCreationService`**
- Creates invoices in Xero from portal data
- Methods:
  - `createFromBudgetPeriod(ServiceBudgetPeriod $period)`: Create from reconciliation
  - `createFromBudgetAdjustment(ServiceBudgetChange $change, bool $recurring = false)`: Create from budget increase
  - `buildInvoiceData(...)`: Transform portal data to Xero format
  - `handleInvoiceCreationFailure(...)`: Error handling

#### New Jobs

**1. `SyncXeroInvoicesJob`**
- Scheduled job (daily)
- Fetches invoices from Xero for all customers with `xero_contact_id`
- Updates existing invoice records
- Creates `XeroSyncLog` entries

**2. `RefreshXeroTokensJob`**
- Scheduled job (hourly)
- Checks token expiry for all organisations
- Refreshes tokens that will expire within 10 minutes
- Logs refresh attempts

**3. `CreateXeroInvoiceJob`**
- Queued job for async invoice creation
- Retries on failure (3 attempts)
- Notifies on permanent failure

#### New Controllers

**1. `XeroInvoiceController`**
```php
// Routes:
GET    /xero/invoices                  index()      - List synced invoices
GET    /xero/invoices/{invoice}        show()       - View invoice details
POST   /xero/invoices/sync             sync()       - Trigger manual sync
GET    /xero/invoices/{invoice}/view   viewOnline() - Redirect to Xero online invoice
```

**2. `XeroOAuthController`**
```php
// Routes:
GET    /xero/oauth/connect             connect()    - Initiate OAuth flow
GET    /xero/oauth/callback            callback()   - Handle OAuth callback
POST   /xero/oauth/disconnect          disconnect() - Revoke tokens
GET    /xero/oauth/status              status()     - Check connection status
```

**3. `XeroSyncLogController`**
```php
// Routes:
GET    /xero/sync-logs                 index()      - View sync history
GET    /xero/sync-logs/{log}           show()       - View log details
```

#### Updated Controllers

**1. `ServiceBudgetPeriodController::reconcile()`**
```php
// Add after line 120 (after marking period as reconciled)
if ($validated['reconciliation_action'] === 'invoice_separately') {
    // Check if Xero is enabled and customer has contact ID
    $shouldCreateXeroInvoice = $request->input('create_xero_invoice', false);

    if ($shouldCreateXeroInvoice && $this->canCreateXeroInvoice($service)) {
        CreateXeroInvoiceJob::dispatch('budget_period', $period->id);
    }
}
```

**2. `ServiceController::storeBudgetAdjustment()`**
```php
// Add after budget change creation
if ($validated['create_xero_invoice'] ?? false) {
    $recurring = $validated['xero_invoice_recurring'] ?? false;
    CreateXeroInvoiceJob::dispatch('budget_adjustment', $budgetChange->id, $recurring);
}
```

#### New Frontend Components

**1. Xero Invoice List Page**
- Path: `resources/js/pages/xero/invoices/index.tsx`
- Table showing synced invoices with filters
- Actions: View details, View in Xero, Manual sync

**2. Xero Invoice Detail Page**
- Path: `resources/js/pages/xero/invoices/show.tsx`
- Full invoice details
- Line items
- Payment status
- Link to Xero online invoice

**3. Xero Sync Logs Page**
- Path: `resources/js/pages/xero/sync-logs/index.tsx`
- Table of sync operations
- Status indicators
- Error details

**4. Xero Settings Component**
- Path: `resources/js/components/xero/settings.tsx`
- OAuth connection status
- Connect/Disconnect buttons
- Last sync timestamp

**5. Budget Reconciliation Dialog Updates**
- Path: `resources/js/pages/timesheet/budget-periods/index.tsx`
- Add checkbox: "Create invoice in Xero"
- Show only when:
  - Xero module enabled for organisation
  - Customer has `xero_contact_id`
  - Reconciliation action is "invoice_separately"

**6. Budget Adjustment Dialog Updates**
- Path: `resources/js/pages/timesheet/services/show.tsx`
- Add checkbox: "Create invoice in Xero"
- Add checkbox: "Create as recurring invoice" (if multi-month)
- Show only when:
  - Xero module enabled
  - Customer has `xero_contact_id`
  - Budget is increasing

### Dependency Mapping

```
┌─────────────────────────────────────────────────────────┐
│                    Xero API (External)                   │
└─────────────────────────────────────────────────────────┘
                           ▲
                           │
┌─────────────────────────────────────────────────────────┐
│                   XeroApiService                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              XeroTokenService                     │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           ▲
                           │
         ┌─────────────────┴──────────────────┐
         │                                    │
┌────────────────────────┐      ┌────────────────────────┐
│ XeroInvoiceSyncService │      │XeroInvoiceCreationSvc  │
└────────────────────────┘      └────────────────────────┘
         ▲                                    ▲
         │                                    │
┌────────────────────────┐      ┌────────────────────────┐
│ SyncXeroInvoicesJob    │      │ CreateXeroInvoiceJob   │
│ (Scheduled Daily)      │      │ (Queued)               │
└────────────────────────┘      └────────────────────────┘
                                             ▲
                                             │
                              ┌──────────────┴───────────────┐
                              │                              │
                    ┌──────────────────┐      ┌──────────────────────┐
                    │ Budget Period    │      │ Budget Adjustment     │
                    │ Reconciliation   │      │ Controller            │
                    └──────────────────┘      └──────────────────────┘
```

### Performance Considerations

**1. API Rate Limits**
- Xero rate limits: 60 calls per minute, 5000 per day per organisation
- Implement rate limiting in `XeroApiService`
- Queue invoice creation jobs to avoid burst requests
- Batch invoice fetching where possible

**2. Token Refresh**
- Access tokens expire after 30 minutes
- Refresh tokens expire after 60 days
- Implement token caching to reduce refresh calls
- Use Laravel cache with 25-minute TTL for access tokens

**3. Database Queries**
- Index on `xero_invoice_id` for lookups
- Index on `customer_id` and `organisation_id` for filtering
- Eager load relationships when listing invoices

**4. Sync Performance**
- Fetch invoices modified since last sync (incremental sync)
- Process in batches of 50 invoices
- Use queue for processing to avoid timeout

---

## Implementation Plan

### Phase 1: Foundation (Week 1)
**Goal**: Set up core infrastructure

**Tasks**:
1. Database migrations for all new tables
2. Create model classes with relationships
3. Implement `XeroTokenService` with OAuth token management
4. Implement `XeroApiService` with basic API methods
5. Add Xero API client library (e.g., xeroapi/xero-php-oauth2)
6. Create OAuth flow (connect/callback controllers)
7. Unit tests for token service

**Deliverables**:
- Database schema in place
- OAuth connection working
- Token refresh mechanism operational

### Phase 2: Invoice Fetching (Week 2)
**Goal**: Sync invoices from Xero

**Tasks**:
1. Implement `XeroInvoiceSyncService`
2. Create `SyncXeroInvoicesJob`
3. Build invoice parsing logic
4. Handle invoice updates (detect changes)
5. Create `XeroInvoiceController` (index, show)
6. Build frontend invoice list page
7. Build frontend invoice detail page
8. Add sync logs UI
9. Schedule daily sync job
10. Integration tests for sync

**Deliverables**:
- Invoices syncing from Xero
- UI to view synced invoices
- Scheduled job running daily

### Phase 3: Invoice Creation from Reconciliation (Week 3)
**Goal**: Create Xero invoices when reconciling budget periods

**Tasks**:
1. Implement `XeroInvoiceCreationService::createFromBudgetPeriod()`
2. Create `CreateXeroInvoiceJob`
3. Update `ServiceBudgetPeriodController::reconcile()`
4. Build invoice data transformation logic
5. Handle invoice creation failures/retries
6. Update reconciliation dialog UI (add Xero checkbox)
7. Add validation for customer `xero_contact_id`
8. Link created invoice to budget period
9. Integration tests for invoice creation
10. Manual testing with real Xero sandbox

**Deliverables**:
- Can create invoices in Xero from reconciliation
- UI shows Xero invoice option
- Error handling in place

### Phase 4: Invoice Creation from Budget Adjustments (Week 4)
**Goal**: Create Xero invoices when adjusting budgets

**Tasks**:
1. Implement `XeroInvoiceCreationService::createFromBudgetAdjustment()`
2. Add support for recurring invoices
3. Update `ServiceController::storeBudgetAdjustment()`
4. Update budget adjustment dialog UI
5. Add checkbox for Xero invoice creation
6. Add checkbox for recurring invoice (when applicable)
7. Handle multi-month period logic for recurring
8. Link created invoice to budget change
9. Integration tests
10. End-to-end testing

**Deliverables**:
- Can create one-time and recurring invoices from budget adjustments
- UI provides appropriate options
- Full functionality working

### Phase 5: Polish & Documentation (Week 5)
**Goal**: Finalize implementation and document

**Tasks**:
1. Comprehensive error handling review
2. Add user notifications (success/failure toasts)
3. Create admin settings page for Xero
4. Add Xero sync status to dashboard
5. Write user documentation
6. Write developer documentation
7. Create video tutorials
8. Performance optimization
9. Security audit
10. Production deployment plan

**Deliverables**:
- Production-ready code
- Complete documentation
- Deployment runbook

---

## Risk Assessment

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Xero API changes | Medium | High | Use official SDK, monitor changelog, version API calls |
| Rate limit exceeded | Medium | Medium | Implement rate limiting, queue jobs, batch requests |
| Token expiry failures | Low | High | Automated refresh with monitoring, fallback to manual refresh |
| Invoice sync conflicts | Medium | Medium | Use last modified timestamp, implement conflict resolution |
| Data loss during sync | Low | High | Transactional operations, comprehensive logging, backup before destructive ops |
| OAuth flow failures | Low | Medium | Clear error messages, retry logic, manual token entry fallback |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| User adoption low | Medium | Medium | Clear documentation, training, gradual rollout |
| Customer mapping errors | High | High | Validation before invoice creation, admin audit tool |
| Double-billing | Low | High | Prevent duplicate invoice creation, idempotency checks |
| Incorrect amounts | Medium | High | Preview before sending, manual approval step (optional) |
| Module disabled mid-operation | Low | Medium | Check module status before operations, graceful degradation |

### Timeline Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Xero sandbox issues | Medium | Low | Have backup sandbox, work with Xero support |
| API complexity | Medium | Medium | Allocate buffer time, start with MVP |
| Integration testing delays | High | Medium | Parallel testing, automated tests early |
| Scope creep | High | High | Strict scope control, defer non-critical features |

---

## Task List

### Database & Models
- [ ] **Task #1**: Create migration for `xero_invoices` table
  - Priority: High | Effort: Small | Dependencies: None
  - Acceptance: Migration runs successfully, table created with all fields

- [ ] **Task #2**: Create migration for `xero_invoice_line_items` table
  - Priority: Medium | Effort: Small | Dependencies: Task #1
  - Acceptance: Migration runs successfully, foreign key to invoices works

- [ ] **Task #3**: Create migration for `xero_sync_logs` table
  - Priority: High | Effort: Small | Dependencies: None
  - Acceptance: Migration runs successfully, indexes created

- [ ] **Task #4**: Create migration for `xero_oauth_tokens` table
  - Priority: High | Effort: Small | Dependencies: None
  - Acceptance: Migration runs successfully, tokens stored securely

- [ ] **Task #5**: Add `xero_invoice_id` column to `timesheet_service_budget_periods`
  - Priority: High | Effort: Small | Dependencies: Task #1
  - Acceptance: Migration adds nullable foreign key successfully

- [ ] **Task #6**: Add `xero_invoice_id` and `xero_invoice_type` to `timesheet_service_budget_changes`
  - Priority: High | Effort: Small | Dependencies: Task #1
  - Acceptance: Migration adds columns successfully

- [ ] **Task #7**: Create `XeroInvoice` model with relationships
  - Priority: High | Effort: Small | Dependencies: Task #1
  - Acceptance: Model has Customer, Organisation, LineItems relationships

- [ ] **Task #8**: Create `XeroInvoiceLineItem` model
  - Priority: Medium | Effort: Small | Dependencies: Task #2
  - Acceptance: Model belongs to XeroInvoice

- [ ] **Task #9**: Create `XeroSyncLog` model
  - Priority: High | Effort: Small | Dependencies: Task #3
  - Acceptance: Model has Organisation relationship, scopes for status

- [ ] **Task #10**: Create `XeroOAuthToken` model with encryption
  - Priority: High | Effort: Medium | Dependencies: Task #4
  - Acceptance: Tokens encrypted at rest, decrypted on retrieval

- [ ] **Task #11**: Update `ServiceBudgetPeriod` model with Xero invoice relationship
  - Priority: High | Effort: Small | Dependencies: Task #5, Task #7
  - Acceptance: Can access related Xero invoice

- [ ] **Task #12**: Update `ServiceBudgetChange` model with Xero invoice relationship
  - Priority: High | Effort: Small | Dependencies: Task #6, Task #7
  - Acceptance: Can access related Xero invoice

### Services - Token Management
- [ ] **Task #13**: Install Xero PHP OAuth2 SDK via Composer
  - Priority: High | Effort: Small | Dependencies: None
  - Acceptance: Package installed, can import XeroAPI classes

- [ ] **Task #14**: Create `XeroTokenService` class structure
  - Priority: High | Effort: Small | Dependencies: Task #10
  - Acceptance: Service class created with DI container binding

- [ ] **Task #15**: Implement `XeroTokenService::getAccessToken()`
  - Priority: High | Effort: Medium | Dependencies: Task #14
  - Acceptance: Returns valid access token, refreshes if expired

- [ ] **Task #16**: Implement `XeroTokenService::refreshToken()`
  - Priority: High | Effort: Medium | Dependencies: Task #14
  - Acceptance: Refreshes token using refresh token, stores new tokens

- [ ] **Task #17**: Implement `XeroTokenService::isTokenValid()`
  - Priority: High | Effort: Small | Dependencies: Task #14
  - Acceptance: Correctly checks token expiry with buffer time

- [ ] **Task #18**: Implement `XeroTokenService::storeTokens()`
  - Priority: High | Effort: Small | Dependencies: Task #14
  - Acceptance: Stores access and refresh tokens with expiry times

- [ ] **Task #19**: Add token caching to reduce database queries
  - Priority: Medium | Effort: Small | Dependencies: Task #15
  - Acceptance: Tokens cached for 25 minutes, cache invalidated on refresh

- [ ] **Task #20**: Unit tests for `XeroTokenService`
  - Priority: High | Effort: Medium | Dependencies: Task #15-18
  - Acceptance: 90%+ code coverage, all methods tested

### Services - API Communication
- [ ] **Task #21**: Create `XeroApiService` class structure
  - Priority: High | Effort: Small | Dependencies: Task #13, Task #14
  - Acceptance: Service class with XeroAPI client initialization

- [ ] **Task #22**: Implement rate limiting in `XeroApiService`
  - Priority: High | Effort: Medium | Dependencies: Task #21
  - Acceptance: Respects 60 calls/min limit, throws exception when exceeded

- [ ] **Task #23**: Implement `XeroApiService::getInvoices()`
  - Priority: High | Effort: Medium | Dependencies: Task #21
  - Acceptance: Fetches invoices with optional filters (contact IDs, date range)

- [ ] **Task #24**: Implement `XeroApiService::getInvoice()`
  - Priority: High | Effort: Small | Dependencies: Task #21
  - Acceptance: Fetches single invoice by Xero invoice ID

- [ ] **Task #25**: Implement `XeroApiService::createInvoice()`
  - Priority: High | Effort: Medium | Dependencies: Task #21
  - Acceptance: Creates invoice in Xero, returns invoice ID

- [ ] **Task #26**: Implement `XeroApiService::emailInvoice()`
  - Priority: Medium | Effort: Small | Dependencies: Task #21
  - Acceptance: Sends invoice email via Xero

- [ ] **Task #27**: Implement `XeroApiService::createRepeatingInvoice()`
  - Priority: Medium | Effort: Medium | Dependencies: Task #21
  - Acceptance: Creates recurring invoice with schedule

- [ ] **Task #28**: Implement `XeroApiService::getOnlineInvoiceUrl()`
  - Priority: Low | Effort: Small | Dependencies: Task #21
  - Acceptance: Returns shareable URL for invoice

- [ ] **Task #29**: Add comprehensive error handling to API service
  - Priority: High | Effort: Medium | Dependencies: Task #22-28
  - Acceptance: All API calls wrapped in try-catch, custom exceptions thrown

- [ ] **Task #30**: Add logging to all API calls
  - Priority: Medium | Effort: Small | Dependencies: Task #22-28
  - Acceptance: API requests/responses logged with sanitized data

- [ ] **Task #31**: Unit tests for `XeroApiService`
  - Priority: High | Effort: Large | Dependencies: Task #22-30
  - Acceptance: Mock API responses, test success and error paths

### Services - Invoice Sync
- [ ] **Task #32**: Create `XeroInvoiceSyncService` class
  - Priority: High | Effort: Small | Dependencies: Task #21, Task #7
  - Acceptance: Service class with dependencies injected

- [ ] **Task #33**: Implement `XeroInvoiceSyncService::syncInvoicesForCustomer()`
  - Priority: High | Effort: Large | Dependencies: Task #32
  - Acceptance: Fetches invoices for one customer, creates/updates records

- [ ] **Task #34**: Implement `XeroInvoiceSyncService::syncInvoicesForOrganisation()`
  - Priority: High | Effort: Medium | Dependencies: Task #33
  - Acceptance: Syncs all customers for organisation

- [ ] **Task #35**: Implement `XeroInvoiceSyncService::processInvoiceData()`
  - Priority: High | Effort: Medium | Dependencies: Task #32
  - Acceptance: Transforms Xero invoice JSON to database format

- [ ] **Task #36**: Add incremental sync (only fetch modified invoices)
  - Priority: Medium | Effort: Medium | Dependencies: Task #33
  - Acceptance: Uses `UpdatedDateUTC` filter to reduce API calls

- [ ] **Task #37**: Add sync conflict detection and resolution
  - Priority: Medium | Effort: Medium | Dependencies: Task #35
  - Acceptance: Detects changes in both systems, uses Xero as source of truth

- [ ] **Task #38**: Create `XeroSyncLog` entries for sync operations
  - Priority: High | Effort: Small | Dependencies: Task #33, Task #9
  - Acceptance: Logs created with success/failure status and details

- [ ] **Task #39**: Unit tests for `XeroInvoiceSyncService`
  - Priority: High | Effort: Large | Dependencies: Task #33-37
  - Acceptance: Test sync, update, conflict resolution scenarios

### Services - Invoice Creation
- [ ] **Task #40**: Create `XeroInvoiceCreationService` class
  - Priority: High | Effort: Small | Dependencies: Task #21, Task #7
  - Acceptance: Service class with dependencies

- [ ] **Task #41**: Implement `XeroInvoiceCreationService::createFromBudgetPeriod()`
  - Priority: High | Effort: Large | Dependencies: Task #40
  - Acceptance: Creates Xero invoice from reconciled budget period

- [ ] **Task #42**: Implement `XeroInvoiceCreationService::createFromBudgetAdjustment()`
  - Priority: High | Effort: Large | Dependencies: Task #40
  - Acceptance: Creates Xero invoice from budget increase

- [ ] **Task #43**: Implement `XeroInvoiceCreationService::buildInvoiceData()`
  - Priority: High | Effort: Large | Dependencies: Task #40
  - Acceptance: Transforms portal data to Xero invoice format

- [ ] **Task #44**: Add invoice line item generation logic
  - Priority: High | Effort: Medium | Dependencies: Task #43
  - Acceptance: Creates proper line items with account codes

- [ ] **Task #45**: Add support for recurring invoices
  - Priority: Medium | Effort: Medium | Dependencies: Task #42
  - Acceptance: Creates recurring invoice for multi-month budgets

- [ ] **Task #46**: Implement error handling and retry logic
  - Priority: High | Effort: Medium | Dependencies: Task #41-45
  - Acceptance: Handles API failures, retries with exponential backoff

- [ ] **Task #47**: Store reference to created invoice in portal
  - Priority: High | Effort: Small | Dependencies: Task #41-42
  - Acceptance: Links XeroInvoice to BudgetPeriod or BudgetChange

- [ ] **Task #48**: Add validation before invoice creation
  - Priority: High | Effort: Medium | Dependencies: Task #41-42
  - Acceptance: Validates customer has xero_contact_id, org has valid tokens

- [ ] **Task #49**: Unit tests for `XeroInvoiceCreationService`
  - Priority: High | Effort: Large | Dependencies: Task #41-48
  - Acceptance: Test invoice creation, error handling, validation

### Jobs
- [ ] **Task #50**: Create `SyncXeroInvoicesJob` class
  - Priority: High | Effort: Small | Dependencies: Task #32
  - Acceptance: Queued job structure created

- [ ] **Task #51**: Implement `SyncXeroInvoicesJob::handle()`
  - Priority: High | Effort: Medium | Dependencies: Task #50, Task #34
  - Acceptance: Job syncs invoices for organisation, handles failures

- [ ] **Task #52**: Schedule `SyncXeroInvoicesJob` to run daily
  - Priority: High | Effort: Small | Dependencies: Task #51
  - Acceptance: Job scheduled in `Console/Kernel.php`, runs at 2am

- [ ] **Task #53**: Create `RefreshXeroTokensJob` class
  - Priority: High | Effort: Small | Dependencies: Task #16
  - Acceptance: Queued job structure created

- [ ] **Task #54**: Implement `RefreshXeroTokensJob::handle()`
  - Priority: High | Effort: Medium | Dependencies: Task #53
  - Acceptance: Checks all orgs, refreshes tokens expiring soon

- [ ] **Task #55**: Schedule `RefreshXeroTokensJob` to run hourly
  - Priority: High | Effort: Small | Dependencies: Task #54
  - Acceptance: Job scheduled, runs every hour

- [ ] **Task #56**: Create `CreateXeroInvoiceJob` class
  - Priority: High | Effort: Small | Dependencies: Task #40
  - Acceptance: Queued job structure with retry logic (3 attempts)

- [ ] **Task #57**: Implement `CreateXeroInvoiceJob::handle()`
  - Priority: High | Effort: Medium | Dependencies: Task #56, Task #41-42
  - Acceptance: Job creates invoice, handles success/failure

- [ ] **Task #58**: Add failure notification for `CreateXeroInvoiceJob`
  - Priority: Medium | Effort: Small | Dependencies: Task #57
  - Acceptance: Notifies admin when job fails permanently

- [ ] **Task #59**: Integration tests for jobs
  - Priority: High | Effort: Medium | Dependencies: Task #51, Task #54, Task #57
  - Acceptance: Test job execution, retries, failure scenarios

### Controllers - OAuth
- [ ] **Task #60**: Create `XeroOAuthController` class
  - Priority: High | Effort: Small | Dependencies: Task #14
  - Acceptance: Controller with route definitions

- [ ] **Task #61**: Implement `XeroOAuthController::connect()`
  - Priority: High | Effort: Medium | Dependencies: Task #60
  - Acceptance: Redirects to Xero OAuth URL with correct scopes

- [ ] **Task #62**: Implement `XeroOAuthController::callback()`
  - Priority: High | Effort: Large | Dependencies: Task #60, Task #18
  - Acceptance: Handles callback, exchanges code for tokens, stores them

- [ ] **Task #63**: Implement `XeroOAuthController::disconnect()`
  - Priority: Medium | Effort: Small | Dependencies: Task #60
  - Acceptance: Revokes tokens, deletes from database

- [ ] **Task #64**: Implement `XeroOAuthController::status()`
  - Priority: Medium | Effort: Small | Dependencies: Task #60, Task #17
  - Acceptance: Returns connection status and token expiry

- [ ] **Task #65**: Add routes for OAuth controller
  - Priority: High | Effort: Small | Dependencies: Task #60
  - Acceptance: Routes added to `Modules/Xero/routes/web.php`

- [ ] **Task #66**: Add CSRF protection and validation
  - Priority: High | Effort: Small | Dependencies: Task #61-64
  - Acceptance: OAuth flow secure against CSRF attacks

- [ ] **Task #67**: Feature tests for OAuth flow
  - Priority: High | Effort: Medium | Dependencies: Task #61-64
  - Acceptance: Test connect, callback, disconnect flows

### Controllers - Invoices
- [ ] **Task #68**: Create `XeroInvoiceController` class
  - Priority: High | Effort: Small | Dependencies: Task #7
  - Acceptance: Controller with route definitions

- [ ] **Task #69**: Implement `XeroInvoiceController::index()`
  - Priority: High | Effort: Medium | Dependencies: Task #68
  - Acceptance: Returns paginated list of invoices with filters

- [ ] **Task #70**: Implement `XeroInvoiceController::show()`
  - Priority: High | Effort: Small | Dependencies: Task #68
  - Acceptance: Returns single invoice with line items

- [ ] **Task #71**: Implement `XeroInvoiceController::sync()`
  - Priority: Medium | Effort: Small | Dependencies: Task #68, Task #51
  - Acceptance: Dispatches manual sync job, returns status

- [ ] **Task #72**: Implement `XeroInvoiceController::viewOnline()`
  - Priority: Low | Effort: Small | Dependencies: Task #68, Task #28
  - Acceptance: Redirects to Xero online invoice URL

- [ ] **Task #73**: Add routes for invoice controller
  - Priority: High | Effort: Small | Dependencies: Task #68
  - Acceptance: RESTful routes added

- [ ] **Task #74**: Add authorization checks
  - Priority: High | Effort: Small | Dependencies: Task #69-72
  - Acceptance: Only admins can view invoices, scoped to organisation

- [ ] **Task #75**: Feature tests for invoice controller
  - Priority: High | Effort: Medium | Dependencies: Task #69-72
  - Acceptance: Test CRUD operations, authorization

### Controllers - Sync Logs
- [ ] **Task #76**: Create `XeroSyncLogController` class
  - Priority: Medium | Effort: Small | Dependencies: Task #9
  - Acceptance: Controller with route definitions

- [ ] **Task #77**: Implement `XeroSyncLogController::index()`
  - Priority: Medium | Effort: Small | Dependencies: Task #76
  - Acceptance: Returns paginated list of sync logs

- [ ] **Task #78**: Implement `XeroSyncLogController::show()`
  - Priority: Medium | Effort: Small | Dependencies: Task #76
  - Acceptance: Returns single log with full error details

- [ ] **Task #79**: Add routes for sync log controller
  - Priority: Medium | Effort: Small | Dependencies: Task #76
  - Acceptance: Routes added

- [ ] **Task #80**: Feature tests for sync log controller
  - Priority: Medium | Effort: Small | Dependencies: Task #77-78
  - Acceptance: Test viewing logs, authorization

### Controllers - Updates to Existing
- [ ] **Task #81**: Update `ServiceBudgetPeriodController::reconcile()` to support Xero
  - Priority: High | Effort: Medium | Dependencies: Task #57
  - Acceptance: Dispatches CreateXeroInvoiceJob when checkbox selected

- [ ] **Task #82**: Add validation for Xero invoice creation in reconciliation
  - Priority: High | Effort: Small | Dependencies: Task #81
  - Acceptance: Validates customer has contact ID, module enabled

- [ ] **Task #83**: Update `ServiceController::storeBudgetAdjustment()` to support Xero
  - Priority: High | Effort: Medium | Dependencies: Task #57
  - Acceptance: Dispatches CreateXeroInvoiceJob for budget increases

- [ ] **Task #84**: Add validation for Xero invoice creation in budget adjustment
  - Priority: High | Effort: Small | Dependencies: Task #83
  - Acceptance: Validates requirements, handles recurring invoice option

- [ ] **Task #85**: Feature tests for updated controllers
  - Priority: High | Effort: Medium | Dependencies: Task #81-84
  - Acceptance: Test Xero integration in reconciliation and budget adjustment

### Frontend - Invoice Management
- [ ] **Task #86**: Create Xero invoices index page component
  - Priority: High | Effort: Medium | Dependencies: Task #69
  - Acceptance: `resources/js/pages/xero/invoices/index.tsx` with table

- [ ] **Task #87**: Add filters to invoice list (customer, date range, status)
  - Priority: Medium | Effort: Medium | Dependencies: Task #86
  - Acceptance: Filters work, update URL params

- [ ] **Task #88**: Add pagination to invoice list
  - Priority: High | Effort: Small | Dependencies: Task #86
  - Acceptance: Pagination works, preserves filters

- [ ] **Task #89**: Create Xero invoice detail page component
  - Priority: High | Effort: Medium | Dependencies: Task #70
  - Acceptance: `resources/js/pages/xero/invoices/show.tsx` shows full invoice

- [ ] **Task #90**: Display line items in invoice detail page
  - Priority: High | Effort: Small | Dependencies: Task #89
  - Acceptance: Line items table with quantities, amounts

- [ ] **Task #91**: Add "View in Xero" button
  - Priority: Medium | Effort: Small | Dependencies: Task #89, Task #72
  - Acceptance: Button opens Xero online invoice in new tab

- [ ] **Task #92**: Add manual sync button to invoice list
  - Priority: Medium | Effort: Small | Dependencies: Task #86, Task #71
  - Acceptance: Button triggers sync, shows loading state

- [ ] **Task #93**: Add sync status indicators
  - Priority: Medium | Effort: Small | Dependencies: Task #86
  - Acceptance: Show last sync time, success/failure status

### Frontend - Sync Logs
- [ ] **Task #94**: Create sync logs index page component
  - Priority: Medium | Effort: Small | Dependencies: Task #77
  - Acceptance: `resources/js/pages/xero/sync-logs/index.tsx` with table

- [ ] **Task #95**: Display error details in sync log view
  - Priority: Medium | Effort: Small | Dependencies: Task #94
  - Acceptance: Failed syncs show error messages clearly

### Frontend - OAuth & Settings
- [ ] **Task #96**: Create Xero settings component
  - Priority: High | Effort: Medium | Dependencies: Task #64
  - Acceptance: `resources/js/components/xero/settings.tsx` shows connection status

- [ ] **Task #97**: Add "Connect to Xero" button
  - Priority: High | Effort: Small | Dependencies: Task #96, Task #61
  - Acceptance: Button initiates OAuth flow

- [ ] **Task #98**: Add "Disconnect from Xero" button
  - Priority: Medium | Effort: Small | Dependencies: Task #96, Task #63
  - Acceptance: Button revokes connection with confirmation

- [ ] **Task #99**: Display token expiry and last sync info
  - Priority: Medium | Effort: Small | Dependencies: Task #96
  - Acceptance: Shows days until token expires, last sync timestamp

### Frontend - Budget Period Updates
- [ ] **Task #100**: Update reconciliation dialog to include Xero checkbox
  - Priority: High | Effort: Medium | Dependencies: Task #81
  - Acceptance: Checkbox shown when applicable, hidden otherwise

- [ ] **Task #101**: Add conditional logic to show Xero option only when valid
  - Priority: High | Effort: Small | Dependencies: Task #100
  - Acceptance: Check module enabled and customer has contact ID

- [ ] **Task #102**: Display Xero invoice link after creation
  - Priority: Medium | Effort: Small | Dependencies: Task #100
  - Acceptance: Show link to invoice in portal and Xero

- [ ] **Task #103**: Show loading state while invoice is being created
  - Priority: Medium | Effort: Small | Dependencies: Task #100
  - Acceptance: Spinner shown, success/error toast after completion

### Frontend - Budget Adjustment Updates
- [ ] **Task #104**: Update budget adjustment dialog to include Xero checkbox
  - Priority: High | Effort: Medium | Dependencies: Task #83
  - Acceptance: Checkbox for "Create in Xero" shown when applicable

- [ ] **Task #105**: Add recurring invoice checkbox
  - Priority: Medium | Effort: Medium | Dependencies: Task #104
  - Acceptance: Shown only for multi-month budget increases

- [ ] **Task #106**: Add validation for recurring invoice parameters
  - Priority: Medium | Effort: Small | Dependencies: Task #105
  - Acceptance: Validate schedule, frequency before submission

- [ ] **Task #107**: Display created invoice link
  - Priority: Medium | Effort: Small | Dependencies: Task #104
  - Acceptance: Link shown in budget changes list

### Testing
- [ ] **Task #108**: Set up Xero sandbox/demo account
  - Priority: High | Effort: Small | Dependencies: None
  - Acceptance: Sandbox account configured, test contacts created

- [ ] **Task #109**: Create test contacts in Xero sandbox
  - Priority: High | Effort: Small | Dependencies: Task #108
  - Acceptance: 3-5 test contacts with different configurations

- [ ] **Task #110**: Create test invoices in Xero sandbox
  - Priority: High | Effort: Small | Dependencies: Task #109
  - Acceptance: Mix of draft, authorised, paid invoices

- [ ] **Task #111**: Integration test: OAuth flow end-to-end
  - Priority: High | Effort: Medium | Dependencies: Task #67, Task #108
  - Acceptance: Can connect to Xero, callback works, tokens stored

- [ ] **Task #112**: Integration test: Fetch invoices from Xero
  - Priority: High | Effort: Medium | Dependencies: Task #110, Task #51
  - Acceptance: Job fetches invoices, creates database records correctly

- [ ] **Task #113**: Integration test: Create invoice in Xero from reconciliation
  - Priority: High | Effort: Large | Dependencies: Task #81, Task #108
  - Acceptance: End-to-end flow creates invoice in Xero sandbox

- [ ] **Task #114**: Integration test: Create recurring invoice from budget adjustment
  - Priority: Medium | Effort: Large | Dependencies: Task #83, Task #108
  - Acceptance: Recurring invoice created in Xero with correct schedule

- [ ] **Task #115**: Load testing for sync job with many customers
  - Priority: Medium | Effort: Medium | Dependencies: Task #112
  - Acceptance: Can handle 100+ customers without timeout

- [ ] **Task #116**: Error scenario testing (API failures, timeouts, invalid data)
  - Priority: High | Effort: Large | Dependencies: All integration tests
  - Acceptance: All error paths tested, graceful degradation works

### Documentation
- [ ] **Task #117**: Write user guide for Xero setup
  - Priority: High | Effort: Medium | Dependencies: Task #96-99
  - Acceptance: Step-by-step guide with screenshots

- [ ] **Task #118**: Write user guide for invoice syncing
  - Priority: High | Effort: Small | Dependencies: Task #86-93
  - Acceptance: Explains automatic and manual sync

- [ ] **Task #119**: Write user guide for creating invoices
  - Priority: High | Effort: Medium | Dependencies: Task #100-107
  - Acceptance: Explains both reconciliation and budget adjustment flows

- [ ] **Task #120**: Write developer documentation for Xero services
  - Priority: Medium | Effort: Medium | Dependencies: All service tasks
  - Acceptance: API docs for all service classes

- [ ] **Task #121**: Create troubleshooting guide
  - Priority: High | Effort: Small | Dependencies: None
  - Acceptance: Common issues and solutions documented

- [ ] **Task #122**: Write deployment guide
  - Priority: High | Effort: Medium | Dependencies: All tasks
  - Acceptance: Step-by-step deployment to production

### Deployment
- [ ] **Task #123**: Configure Xero OAuth app in production
  - Priority: High | Effort: Small | Dependencies: Task #108
  - Acceptance: Production OAuth credentials obtained

- [ ] **Task #124**: Set environment variables for production
  - Priority: High | Effort: Small | Dependencies: Task #123
  - Acceptance: All Xero config in .env file

- [ ] **Task #125**: Run database migrations in production
  - Priority: High | Effort: Small | Dependencies: All migration tasks
  - Acceptance: Migrations run successfully, no data loss

- [ ] **Task #126**: Deploy backend code to production
  - Priority: High | Effort: Small | Dependencies: All backend tasks
  - Acceptance: Code deployed, no errors

- [ ] **Task #127**: Deploy frontend code to production
  - Priority: High | Effort: Small | Dependencies: All frontend tasks
  - Acceptance: Assets compiled and deployed

- [ ] **Task #128**: Set up scheduled jobs in production
  - Priority: High | Effort: Small | Dependencies: Task #52, Task #55
  - Acceptance: Cron jobs running correctly

- [ ] **Task #129**: Test OAuth flow in production
  - Priority: High | Effort: Small | Dependencies: Task #126
  - Acceptance: Can connect real Xero account

- [ ] **Task #130**: Test invoice sync in production with one customer
  - Priority: High | Effort: Small | Dependencies: Task #129
  - Acceptance: Invoices sync correctly

- [ ] **Task #131**: Monitor for 48 hours after deployment
  - Priority: High | Effort: Medium | Dependencies: Task #130
  - Acceptance: No critical errors, scheduled jobs running

- [ ] **Task #132**: Enable for all customers
  - Priority: High | Effort: Small | Dependencies: Task #131
  - Acceptance: Feature available to all organisations

---

## Acceptance Criteria

### Feature 1: OAuth Connection
- [ ] Admin can initiate connection to Xero from settings
- [ ] OAuth flow redirects to Xero, returns to portal on success
- [ ] Connection status visible in settings (connected/disconnected)
- [ ] Tokens refreshed automatically before expiry
- [ ] Admin can disconnect from Xero

### Feature 2: Invoice Syncing
- [ ] Invoices automatically synced daily for all customers with `xero_contact_id`
- [ ] Admin can manually trigger sync
- [ ] Synced invoices visible in invoice list page
- [ ] Invoice details page shows line items, amounts, status
- [ ] Incremental sync only fetches new/updated invoices
- [ ] Sync logs track all sync operations with success/failure status

### Feature 3: Invoice Creation from Reconciliation
- [ ] When reconciling budget period with "invoice_separately", checkbox to "Create in Xero" appears
- [ ] Checkbox only shown when module enabled and customer has `xero_contact_id`
- [ ] Selecting checkbox creates invoice in Xero asynchronously
- [ ] Created invoice linked to budget period record
- [ ] Success/failure notification shown to user
- [ ] Invoice includes proper line items with hours and amounts
- [ ] Invoice sent to customer email automatically (optional)

### Feature 4: Invoice Creation from Budget Adjustment
- [ ] When increasing service budget, checkbox to "Create in Xero" appears
- [ ] For multi-month increases, checkbox for "Create as recurring invoice" appears
- [ ] Invoice created with line items describing budget increase
- [ ] Recurring invoice created with correct schedule (monthly, quarterly)
- [ ] Created invoice linked to budget change record
- [ ] Success/failure notification shown

### Feature 5: Error Handling
- [ ] Clear error messages when OAuth fails
- [ ] Clear error messages when API rate limit exceeded
- [ ] Failed invoice creation retries automatically (3 attempts)
- [ ] Admin notified of permanent failures
- [ ] Sync failures logged with details
- [ ] Users see helpful error messages, not technical details

---

## Testing Strategy

### Unit Tests
- All service classes (Token, API, Sync, Creation)
- All models (relationships, scopes, accessors)
- Invoice data transformation logic
- Token refresh logic

### Integration Tests
- OAuth flow end-to-end
- Invoice sync from Xero
- Invoice creation in Xero
- Job execution and retries
- Controller actions with database

### Feature Tests
- User workflows (connect, sync, create invoice)
- Authorization checks
- Form validation
- UI interactions

### Manual Testing
- OAuth connection in sandbox
- Invoice sync with real data
- Invoice creation from reconciliation
- Recurring invoice creation
- Error scenarios (API failures, timeouts)
- Cross-browser testing (Chrome, Firefox, Safari)

---

## Success Metrics

### Technical Metrics
- **API Success Rate**: >99% of API calls succeed
- **Sync Accuracy**: >99% of invoices synced correctly
- **Invoice Creation Success**: >95% of invoices created successfully
- **Token Refresh Success**: 100% of token refreshes succeed
- **Job Completion**: >99% of jobs complete successfully
- **Response Time**: Invoice list page loads in <2 seconds

### Business Metrics
- **Adoption Rate**: 80% of eligible organisations connect Xero within 30 days
- **Usage Rate**: 50% of reconciliations use Xero invoice creation
- **Time Saved**: 15 minutes saved per invoice (compared to manual entry)
- **Error Reduction**: 90% reduction in billing errors
- **Customer Satisfaction**: Positive feedback from 80% of users

---

## Open Questions

1. **Account Codes**: Which Xero account codes should be used for different line items?
   - Needs mapping from portal service types to Xero account codes

2. **Tax Handling**: How should VAT/tax be calculated on invoices?
   - Use Xero's tax types or calculate in portal?

3. **Invoice Numbering**: Should portal control invoice numbers or use Xero's auto-numbering?
   - Recommendation: Use Xero's auto-numbering for consistency

4. **Payment Tracking**: Should portal sync payment status from Xero?
   - Future enhancement: Sync payment status to show "Paid" in portal

5. **Multi-Currency**: Do we need to support multiple currencies?
   - Currently assuming GBP only

6. **Credit Notes**: Should credit notes be supported?
   - Future enhancement: Create credit notes for budget rollbacks

7. **Approval Workflow**: Should invoices require approval before sending in Xero?
   - Recommendation: Create as DRAFT, allow admin to review before authorizing

8. **Branding**: Should invoices use specific Xero branding themes?
   - Future enhancement: Allow selection of Xero branding theme per organisation

---

## Future Enhancements (Out of Scope)

- **Payment Tracking**: Sync payment status from Xero to portal
- **Credit Notes**: Create credit notes for refunds/adjustments
- **Quotes**: Create Xero quotes before invoices
- **Purchase Orders**: Create purchase orders in Xero
- **Expense Claims**: Sync expense claims to Xero
- **Bank Reconciliation**: Sync bank feeds
- **Multi-Currency**: Support invoices in different currencies
- **Contacts Sync**: Sync customers as Xero contacts automatically
- **Webhook Integration**: Real-time updates from Xero via webhooks
- **Reports**: Xero financial reports embedded in portal

---

## Glossary

- **Xero**: Cloud-based accounting software platform
- **OAuth 2.0**: Authentication protocol used by Xero API
- **Tenant ID**: Xero's identifier for an organisation
- **Contact**: A customer or supplier in Xero
- **Invoice**: A bill sent to a customer (ACCREC = Accounts Receivable)
- **Repeating Invoice**: A recurring invoice with a schedule
- **Account Code**: Xero's chart of accounts identifier
- **Line Amount Type**: Tax calculation method (Exclusive, Inclusive, No Tax)
- **Online Invoice**: Shareable URL for an invoice
- **Access Token**: Short-lived token for API authentication (30 min)
- **Refresh Token**: Long-lived token to get new access tokens (60 days)
- **Rate Limit**: API call restrictions (60/min, 5000/day)

---

**Document Version**: 1.0
**Last Updated**: 2025-11-11
**Author**: Claude Code (Planning Assistant)
**Status**: Draft - Awaiting Review
