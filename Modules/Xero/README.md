# Xero Integration Module

Complete Xero integration for the portal, enabling OAuth authentication, invoice synchronization, and invoice creation from timesheet data.

## Features

### 🔐 OAuth 2.0 Authentication

- Secure OAuth 2.0 flow with PKCE
- Automatic token refresh (60-day refresh token lifetime)
- Token caching (25-minute TTL)
- Encrypted token storage

### 📥 Invoice Synchronization

- Fetch invoices from Xero for customers with `xero_contact_id`
- Full and incremental sync support
- Automatic daily sync at 2 AM
- Manual sync via UI or Artisan command
- Comprehensive sync logging

### 📤 Invoice Creation

- Create invoices from budget period reconciliation
- Create invoices from budget adjustments
- Support for one-time and recurring invoices
- Automatic email sending option
- Background job processing

### 📊 Rate Limiting

- 60 API calls per minute per organisation
- 5000 API calls per day per organisation
- Cache-based rate limiting with automatic enforcement

---

## Installation

### 1. Install Xero SDK

Already installed via Composer:

```bash
composer require xeroapi/xero-php-oauth2
```

### 2. Run Migrations

```bash
php artisan migrate
```

This creates the following tables:
- `xero_oauth_tokens` - OAuth token storage
- `xero_invoices` - Synced invoice data
- `xero_invoice_line_items` - Invoice line items
- `xero_sync_logs` - Sync audit trail

### 3. Create Xero App (Per Organisation)

Each organisation needs their own Xero app:

1. Go to https://developer.xero.com/app/manage
2. Create a new app for your organisation
3. Set redirect URI to: `https://your-domain.com/xero/oauth/callback`
4. Copy Client ID and Client Secret
5. Use OAuth 2.0 with PKCE

### 4. Configure Organisation Settings

In the portal, navigate to your organisation settings and configure the Xero module:

**Required Settings:**
- `XERO_CLIENT_ID` - Your Xero OAuth 2.0 Client ID
- `XERO_CLIENT_SECRET` - Your Xero OAuth 2.0 Client Secret

**Optional Settings:**
- `XERO_DEFAULT_ACCOUNT_CODE` - Default sales account code for invoices (e.g., 200)

**Auto-filled Settings:**
- `XERO_TENANT_ID` - Automatically filled after OAuth connection

> **Note:** Each organisation stores their own Xero credentials in `organisation_settings`, not in environment variables. This allows proper multi-tenancy where each organisation connects to their own Xero account.

---

## Usage

### OAuth Connection

#### Connect Organisation to Xero

```php
// User clicks "Connect to Xero" button
// Routes to: /xero/oauth/connect

// After authorization, Xero redirects to:
// /xero/oauth/callback

// Tokens are automatically stored and linked to organisation
```

#### Check Connection Status

```php
use Modules\Xero\Services\XeroTokenService;

$tokenService = app(XeroTokenService::class);

if ($tokenService->hasValidTokens($organisation)) {
    // Organisation is connected to Xero
}
```

#### Disconnect from Xero

```php
// POST to /xero/oauth/disconnect
// Revokes tokens and clears tenant ID
```

---

### Invoice Synchronization

#### Sync All Invoices for Organisation

```php
use Modules\Xero\Jobs\SyncXeroInvoicesJob;

// Dispatch background job
SyncXeroInvoicesJob::dispatch($organisationId);

// Or use Artisan command
php artisan xero:sync-invoices --organisation={uuid}
```

#### Sync Invoices for Specific Customer

```php
use Modules\Xero\Services\XeroInvoiceSyncService;

$syncService = app(XeroInvoiceSyncService::class);
$result = $syncService->syncInvoicesForCustomer($customer);

// Returns:
// [
//     'success' => true,
//     'sync_log_id' => 'uuid',
//     'stats' => [
//         'created' => 5,
//         'updated' => 3,
//         'skipped' => 2,
//     ]
// ]
```

#### Incremental Sync

```php
// Only sync invoices modified since last sync
SyncXeroInvoicesJob::dispatch($organisationId, null, true);

// Or via command
php artisan xero:sync-invoices --incremental
```

#### Scheduled Daily Sync

Automatically configured to run at 2 AM daily:

```php
// In XeroServiceProvider
$schedule->command('xero:sync-invoices --incremental')
    ->dailyAt('02:00')
    ->withoutOverlapping()
    ->runInBackground();
```

---

### Invoice Creation

#### Create Invoice from Budget Period Reconciliation

```php
use Modules\Xero\Services\XeroInvoiceCreationService;

$invoiceService = app(XeroInvoiceCreationService::class);

$result = $invoiceService->createInvoiceFromBudgetPeriod($budgetPeriod, [
    'reference' => 'Custom Reference',
    'due_days' => 30,
    'send_email' => true,
]);

// Returns:
// [
//     'success' => true,
//     'xero_invoice_id' => 'xero-uuid',
//     'xero_invoice_number' => 'INV-001',
//     'total' => 1200.00,
//     'url' => 'https://go.xero.com/...',
// ]
```

#### Create Invoice from Budget Adjustment

```php
$result = $invoiceService->createInvoiceFromBudgetChange($budgetChange, [
    'invoice_type' => 'one_time', // or 'recurring'
    'reference' => 'Budget Increase',
    'due_days' => 30,
    'send_email' => false,
]);
```

#### Background Invoice Creation

```php
use Modules\Xero\Jobs\CreateXeroInvoiceJob;

// From budget period
CreateXeroInvoiceJob::dispatch('budget_period', $budgetPeriod->id, [
    'send_email' => true,
    'due_days' => 30,
]);

// From budget change
CreateXeroInvoiceJob::dispatch('budget_change', $budgetChange->id, [
    'invoice_type' => 'recurring',
    'send_email' => true,
]);
```

---

## Architecture

### Services

#### XeroTokenService
**Location:** `Modules/Xero/app/Services/XeroTokenService.php`

Handles OAuth token management:
- Token storage and retrieval
- Automatic token refresh
- Token caching (25-minute TTL)
- Configuration building for API calls

#### XeroApiService
**Location:** `Modules/Xero/app/Services/XeroApiService.php`

Handles all Xero API communication:
- Get/create/email invoices
- Rate limiting enforcement
- Comprehensive error handling
- Invoice filtering and querying

#### XeroInvoiceSyncService
**Location:** `Modules/Xero/app/Services/XeroInvoiceSyncService.php`

Handles invoice synchronization:
- Full and incremental sync
- Customer and organisation-level sync
- Invoice and line item processing
- Sync logging and statistics

#### XeroInvoiceCreationService
**Location:** `Modules/Xero/app/Services/XeroInvoiceCreationService.php`

Handles invoice creation from portal data:
- Budget period invoice creation
- Budget adjustment invoice creation
- Line item building
- Account code resolution

### Jobs

#### SyncXeroInvoicesJob
**Location:** `Modules/Xero/app/Jobs/SyncXeroInvoicesJob.php`

Background job for invoice synchronization:
- 3 retry attempts
- 5-minute timeout
- Organisation or customer-level sync
- Full or incremental sync

#### CreateXeroInvoiceJob
**Location:** `Modules/Xero/app/Jobs/CreateXeroInvoiceJob.php`

Background job for invoice creation:
- 3 retry attempts
- 2-minute timeout
- Budget period or budget change source
- Configurable options

### Models

#### XeroOAuthToken
**Location:** `Modules/Xero/app/Models/XeroOAuthToken.php`

Stores OAuth tokens with automatic encryption:
- Access token (30-minute lifetime)
- Refresh token (60-day lifetime)
- Expiry tracking
- Organisation relationship

#### XeroInvoice
**Location:** `Modules/Xero/app/Models/XeroInvoice.php`

Stores synced invoice data:
- Complete invoice details
- Customer relationship
- Line items relationship
- Scopes: `paid()`, `unpaid()`, `overdue()`

#### XeroInvoiceLineItem
**Location:** `Modules/Xero/app/Models/XeroInvoiceLineItem.php`

Stores invoice line item data:
- Linked to XeroInvoice
- Quantity, amounts, tax
- Account codes

#### XeroSyncLog
**Location:** `Modules/Xero/app/Models/XeroSyncLog.php`

Audit trail for all Xero operations:
- Sync type tracking
- Success/failure status
- Error messages
- Timing information

### Controllers

#### XeroOAuthController
**Location:** `Modules/Xero/app/Http/Controllers/XeroOAuthController.php`

Handles OAuth flow:
- `GET /xero/oauth/connect` - Initiate OAuth
- `GET /xero/oauth/callback` - Handle callback
- `POST /xero/oauth/disconnect` - Disconnect
- `GET /xero/oauth/status` - Connection status

#### XeroInvoiceController
**Location:** `Modules/Xero/app/Http/Controllers/XeroInvoiceController.php`

Handles invoice viewing:
- `GET /xero/invoices` - List invoices (with filtering)
- `GET /xero/invoices/{id}` - View invoice
- `POST /xero/invoices/sync` - Manual sync
- `GET /xero/invoices/stats` - Statistics

### Commands

#### SyncXeroInvoicesCommand
**Location:** `Modules/Xero/app/Console/SyncXeroInvoicesCommand.php`

```bash
# Sync all organisations
php artisan xero:sync-invoices

# Sync specific organisation
php artisan xero:sync-invoices --organisation={uuid}

# Incremental sync only
php artisan xero:sync-invoices --incremental
```

### Exceptions

#### XeroTokenException
**Location:** `Modules/Xero/app/Exceptions/XeroTokenException.php`

Token-specific exceptions:
- `noTokensFound()`
- `refreshTokenExpired()`
- `refreshFailed()`

#### XeroApiException
**Location:** `Modules/Xero/app/Exceptions/XeroApiException.php`

API-specific exceptions:
- `rateLimitExceeded()`
- `requestFailed()`
- `invalidResponse()`

---

## Configuration

### Module Config

**Location:** `Modules/Xero/config/config.php`

```php
return [
    'redirect_uri' => env('APP_URL').'/xero/oauth/callback',

    'scopes' => [
        'offline_access',
        'accounting.transactions.read',
        'accounting.transactions.create',
        'accounting.contacts.read',
        'accounting.settings.read',
    ],

    // Organisation settings (stored per-organisation in organisation_settings table)
    'organisation_settings' => [
        'status' => [
            'label' => 'Enabled',
            'type' => 'yes_no',
        ],
        'XERO_CLIENT_ID' => [
            'label' => 'Xero Client ID',
            'type' => 'text',
            'required' => true,
        ],
        'XERO_CLIENT_SECRET' => [
            'label' => 'Xero Client Secret',
            'type' => 'password',
            'required' => true,
        ],
        'XERO_TENANT_ID' => [
            'label' => 'Xero Tenant ID',
            'type' => 'text',
            'readonly' => true,
        ],
        'XERO_DEFAULT_ACCOUNT_CODE' => [
            'label' => 'Default Sales Account Code',
            'type' => 'text',
        ],
    ],

    // Customer settings
    'customer_settings' => [
        'xero_contact_id' => [
            'label' => 'Xero Contact ID',
            'type' => 'text',
        ],
    ],
];
```

### Multi-Tenancy Architecture

The Xero module is designed for proper multi-tenancy:

- **Per-Organisation Credentials**: Each organisation stores their own `XERO_CLIENT_ID` and `XERO_CLIENT_SECRET` in the `organisation_settings` table
- **Dynamic Provider Creation**: The OAuth provider is created dynamically per request using the organisation's credentials
- **No Global Credentials**: No Xero credentials in `.env` or global config
- **Isolated Connections**: Each organisation connects to their own Xero account independently

---

## Database Schema

### xero_oauth_tokens

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organisation_id | UUID | Foreign key to organisations |
| access_token | TEXT | Encrypted access token |
| refresh_token | TEXT | Encrypted refresh token |
| access_token_expires_at | TIMESTAMP | Access token expiry |
| refresh_token_expires_at | TIMESTAMP | Refresh token expiry |

### xero_invoices

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organisation_id | UUID | Foreign key to organisations |
| customer_id | UUID | Foreign key to customers |
| xero_invoice_id | STRING | Xero's invoice ID |
| xero_invoice_number | STRING | Invoice number |
| status | STRING | Invoice status |
| total | DECIMAL | Total amount |
| amount_due | DECIMAL | Amount outstanding |
| ... | | Many more fields |

### xero_invoice_line_items

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| xero_invoice_id | UUID | Foreign key to xero_invoices |
| description | TEXT | Line item description |
| quantity | DECIMAL | Quantity |
| unit_amount | DECIMAL | Unit price |
| line_amount | DECIMAL | Line total |

### xero_sync_logs

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| organisation_id | UUID | Foreign key |
| sync_type | STRING | Type of operation |
| status | STRING | Success/failed |
| entity_type | STRING | What was synced |
| records_processed | INTEGER | Count |
| message | TEXT | Status message |

---

## Routes

All routes require `auth`, `verified`, and `organisation` middleware.

### OAuth Routes

- `GET /xero/oauth/connect` → `xero.oauth.connect`
- `GET /xero/oauth/callback` → `xero.oauth.callback`
- `POST /xero/oauth/disconnect` → `xero.oauth.disconnect`
- `GET /xero/oauth/status` → `xero.oauth.status`

### Invoice Routes

- `GET /xero/invoices` → `xero.invoices.index`
- `GET /xero/invoices/stats` → `xero.invoices.stats`
- `POST /xero/invoices/sync` → `xero.invoices.sync`
- `GET /xero/invoices/{id}` → `xero.invoices.show`

---

## Testing

### Unit Tests

```bash
php artisan test --filter=Xero
```

### Manual Testing Checklist

- [ ] OAuth connection flow
- [ ] Token refresh handling
- [ ] Invoice synchronization (full)
- [ ] Invoice synchronization (incremental)
- [ ] Invoice creation from budget period
- [ ] Invoice creation from budget change
- [ ] Rate limiting enforcement
- [ ] Error handling and logging
- [ ] Scheduled daily sync

### Xero Sandbox

Test in Xero sandbox environment:
1. Create demo organisation in Xero
2. Use sandbox credentials
3. Test full OAuth flow
4. Verify invoices in Xero UI

---

## Integration

See `Modules/Xero/docs/INTEGRATION_GUIDE.md` for detailed integration instructions with:
- ServiceBudgetPeriodController
- ServiceController
- Frontend components

---

## Troubleshooting

### "Xero credentials not configured"

**Solution:** Organisation needs to add their Xero Client ID and Secret in organisation settings.

1. Navigate to organisation settings
2. Find the Xero module settings
3. Enter your `XERO_CLIENT_ID` and `XERO_CLIENT_SECRET`
4. Save settings

### "No valid Xero tokens found"

**Solution:** Organisation needs to connect to Xero via OAuth flow after configuring credentials.

```
Navigate to: /xero/oauth/connect
```

### "Refresh token has expired"

**Solution:** Refresh tokens expire after 60 days. Reconnect to Xero.

### "Rate limit exceeded"

**Solution:** Wait for rate limit window to reset (1 minute or 24 hours).

### "Customer does not have xero_contact_id"

**Solution:** Link customer to Xero contact in customer settings.

```php
$customer->update(['xero_contact_id' => 'xero-contact-uuid']);
```

### Token Refresh Failures

**Check:**
1. Client ID and Secret are correctly configured in organisation settings
2. Xero app is active
3. Redirect URI matches exactly: `https://your-domain.com/xero/oauth/callback`
4. Organisation has valid OAuth tokens stored

**Debug:**
```bash
tail -f storage/logs/laravel.log | grep Xero
```

---

## Security

- ✅ OAuth 2.0 with PKCE
- ✅ CSRF protection via state parameter
- ✅ Encrypted token storage (Laravel Crypt)
- ✅ Token caching with appropriate TTL
- ✅ Rate limiting enforcement
- ✅ Comprehensive audit logging
- ✅ Jobs not tenant-aware (explicit organisation handling)

---

## Performance

- **Token Caching:** 25-minute TTL reduces database queries
- **Rate Limiting:** Prevents API quota exhaustion
- **Background Jobs:** Invoice operations don't block UI
- **Incremental Sync:** Only fetch modified invoices
- **Selective Sync:** Sync specific customers when needed

---

## Monitoring

### Sync Logs

```php
use Modules\Xero\Models\XeroSyncLog;

// Recent syncs
$logs = XeroSyncLog::where('organisation_id', $orgId)
    ->orderBy('started_at', 'desc')
    ->limit(10)
    ->get();

// Success rate
$successRate = XeroSyncLog::getSuccessRate($orgId);
```

### Application Logs

```bash
# Watch Xero-related logs
tail -f storage/logs/laravel.log | grep Xero
```

### Job Queue Monitoring

```bash
# Monitor queue
php artisan queue:work --verbose

# Check failed jobs
php artisan queue:failed
```

---

## Support

For issues or questions:
- Check logs in `storage/logs/laravel.log`
- Review Xero API documentation: https://developer.xero.com/documentation
- Check sync logs in `xero_sync_logs` table

---

## Changelog

### Version 1.0.0 (2025-11-11)

**Phase 1: Foundation**
- ✅ OAuth 2.0 authentication with PKCE
- ✅ Token management with auto-refresh
- ✅ Database schema and models
- ✅ API service with rate limiting

**Phase 2: Invoice Fetching**
- ✅ Invoice synchronization service
- ✅ Background sync jobs
- ✅ Scheduled daily sync
- ✅ Manual sync command
- ✅ Invoice viewing UI

**Phase 3: Invoice Creation**
- ✅ Invoice creation service
- ✅ Budget period invoice creation
- ✅ Budget adjustment invoice creation
- ✅ One-time and recurring support
- ✅ Background creation jobs
- ✅ Integration documentation

---

## License

Proprietary - Internal use only
