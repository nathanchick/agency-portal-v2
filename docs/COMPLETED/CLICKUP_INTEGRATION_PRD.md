# ClickUp Integration Module - Product Requirements Document

**Version:** 1.0
**Date:** 2025-11-19
**Status:** Planning
**Author:** AI Assistant

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technical Analysis](#technical-analysis)
3. [Architecture Design](#architecture-design)
4. [Database Schema](#database-schema)
5. [Implementation Plan](#implementation-plan)
6. [Risk Assessment](#risk-assessment)
7. [Task List](#task-list)
8. [Success Metrics](#success-metrics)
9. [Documentation Requirements](#documentation-requirements)

---

## Executive Summary

### Problem Statement

The portal currently has no integration with ClickUp, a popular project management tool used by many organizations. Without this integration:
- Organizations cannot track their ClickUp tasks alongside other project management tools
- Customers cannot link their projects to specific ClickUp Spaces
- Chrome extension users cannot create tasks directly from the portal's timesheet tracker
- Support tickets cannot be automatically converted into ClickUp tasks

### Proposed Solution

Create a comprehensive ClickUp module following the established GitHub module pattern, implementing:

**Phase 1: OAuth & Space Management**
- OAuth 2.0 authentication flow for organization-level ClickUp workspace access
- Customer-level ClickUp Space assignment via portal UI
- Secure token storage with encryption
- Module enable/disable via organization settings

**Phase 2: Chrome Extension Integration**
- Expose ClickUp Space IDs to the chrome extension
- Enable time tracking context from ClickUp tasks
- Cache ClickUp data for offline extension functionality

**Phase 3: Task Creation from Tickets**
- Create ClickUp tasks from portal tickets
- Maintain ticket-task linkage for bi-directional tracking
- Automatic task title formatting with ticket ID prefix `[TICKET-123] Title`
- Sync basic task metadata (description, assignees, priority)

### Key Benefits

**For Organizations:**
- Unified project management across GitHub and ClickUp
- Centralized authentication management
- Better visibility into customer project tracking preferences

**For Customers:**
- Flexible choice of project management tools
- Automatic task creation from support tickets
- Seamless integration with existing ClickUp workflows

**For Users:**
- Faster time entry via chrome extension
- Reduced context switching between tools
- Automatic task metadata propagation

### Risks & Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| ClickUp API rate limits (100 req/min for most plans) | HIGH | MEDIUM | Implement aggressive caching, queue batch operations, cache Space/List metadata |
| OAuth token expiration (tokens currently don't expire but may in future) | MEDIUM | LOW | Build refresh mechanism proactively, monitor token health |
| Chrome extension permission issues | MEDIUM | LOW | Use existing extension architecture, comprehensive error handling |
| Customer confusion with Space selection | LOW | MEDIUM | Clear UI labels, tooltips, default to first Space |
| Multiple ClickUp workspace authorization | MEDIUM | MEDIUM | Store workspace selection, allow re-auth for different workspaces |

---

## Technical Analysis

### Current Architecture Assessment

#### Existing Patterns to Replicate

**1. GitHub Module Structure** (`/Modules/GitHub/`)
- **OAuth Flow:** GitHubOAuthService handles authorization, token exchange, and account info fetching
- **Token Storage:** GitHubOAuthToken model with encrypted access/refresh tokens (one per organization)
- **Token Service:** GitHubTokenService provides caching (55 min) and validation
- **API Service:** GitHubApiService wraps third-party client with caching and rate limit tracking
- **Repository Sync:** Background jobs sync metadata asynchronously
- **Settings Integration:** Module enable/disable via `organisation_settings` table
- **Project Linking:** One-to-one relationship (Project → GitHubRepository)

**2. Customer Settings Pattern**
```php
// CustomerSetting model structure
- customer_id (UUID)
- module (string) e.g., 'ClickUp'
- key (string) e.g., 'clickup_space_id'
- value (string) e.g., '123456789'
- type (string) e.g., 'encrypted' | 'plain'
```

**3. Chrome Extension Architecture**
- **Content Scripts:** Inject UI elements on third-party sites (GitHub, ClickUp, Trello)
- **Communication:** chrome.runtime.sendMessage to background service worker
- **Storage:** chrome.storage.local for caching (e.g., allowed repos, services)
- **API Client:** Fetches data from portal API using extension tokens

#### ClickUp API Specifications

**OAuth 2.0 Flow:**
```
1. Authorization URL: https://app.clickup.com/api
   ?client_id={client_id}
   &redirect_uri={redirect_uri}
   &state={csrf_token}

2. Token Exchange: POST https://api.clickup.com/api/v2/oauth/token
   Body: { client_id, client_secret, code }

3. Access Token: Currently does not expire (subject to change)
   Format: Authorization: Bearer {access_token}
```

**API Endpoints:**
```
GET  /api/v2/team                           - Get authorized teams/workspaces
GET  /api/v2/team/{team_id}/space           - Get spaces in workspace
GET  /api/v2/space/{space_id}               - Get single space details
GET  /api/v2/space/{space_id}/folder        - Get folders in space
GET  /api/v2/folder/{folder_id}/list        - Get lists in folder
GET  /api/v2/list/{list_id}                 - Get list details
POST /api/v2/list/{list_id}/task            - Create task in list
GET  /api/v2/task/{task_id}                 - Get task details
PUT  /api/v2/task/{task_id}                 - Update task
```

**Rate Limits:**
| Plan | Rate Limit |
|------|------------|
| Free Forever | 100 requests/min |
| Unlimited | 100 requests/min |
| Business | 100 requests/min |
| Business Plus | 1,000 requests/min |
| Enterprise | 10,000 requests/min |

**Response on Limit Exceeded:** HTTP 429

**Create Task Request:**
```json
POST /api/v2/list/{list_id}/task
Authorization: Bearer {access_token}

{
  "name": "[TICKET-123] Customer login issue",
  "description": "Customer reported unable to login...",
  "assignees": [12345678],
  "priority": 2,  // 1=urgent, 2=high, 3=normal, 4=low
  "status": "to do",
  "tags": ["support", "bug"]
}
```

#### Ticket Model Structure

```php
// Modules/Ticket/app/Models/Ticket.php
$fillable = [
    'uuid',               // Unique identifier
    'organisation_id',    // Organisation FK
    'customer_id',        // Customer FK
    'website_id',         // Website FK (nullable)
    'user_id',           // Creator FK
    'title',             // Ticket title
    'message',           // Ticket description
    'priority',          // Priority level
    'status',            // Current status
    'is_resolved',       // Boolean
    'is_locked',         // Boolean
    'assigned_to',       // Assigned user FK (nullable)
    'metadata',          // JSON metadata (can store ClickUp task ID)
];

// Events dispatched
'created' => TicketCreated::class
'updated' => TicketUpdated::class
```

### Technology Stack

**Backend:**
- Laravel 11.x (Modular architecture)
- League OAuth2 Client (OAuth flow)
- GuzzleHTTP (HTTP client for ClickUp API)
- Laravel Cache (Redis) - API response caching
- Laravel Queue (Horizon) - Background jobs

**Frontend:**
- React + TypeScript
- Inertia.js (Laravel-React bridge)
- Wayfinder (Route generation from Laravel → TypeScript)
- shadcn/ui components

**Chrome Extension:**
- Manifest V3
- Content Scripts (JavaScript)
- Service Worker (background.js)
- chrome.storage.local API

**Database:**
- PostgreSQL
- UUID primary keys
- Multi-tenancy via `organisation_id` scoping

---

## Architecture Design

### Module Structure

```
Modules/ClickUp/
├── app/
│   ├── Exceptions/
│   │   ├── ClickUpApiException.php
│   │   └── ClickUpTokenException.php
│   ├── Http/Controllers/
│   │   ├── ClickUpOAuthController.php
│   │   ├── ClickUpSpaceController.php
│   │   └── ClickUpTaskController.php
│   ├── Jobs/
│   │   ├── SyncClickUpSpaces.php
│   │   └── CreateClickUpTask.php
│   ├── Models/
│   │   ├── ClickUpOAuthToken.php
│   │   ├── ClickUpSpace.php
│   │   └── ClickUpTask.php
│   ├── Providers/
│   │   ├── EventServiceProvider.php
│   │   ├── ClickUpServiceProvider.php
│   │   └── RouteServiceProvider.php
│   └── Services/
│       ├── ClickUpApiService.php
│       ├── ClickUpOAuthService.php
│       ├── ClickUpSpaceSyncService.php
│       ├── ClickUpTaskService.php
│       └── ClickUpTokenService.php
├── config/
│   └── config.php
├── database/
│   └── migrations/
│       ├── 2025_11_19_100000_create_clickup_oauth_tokens_table.php
│       ├── 2025_11_19_100001_create_clickup_spaces_table.php
│       ├── 2025_11_19_100002_create_clickup_tasks_table.php
│       └── 2025_11_19_100003_add_clickup_task_id_to_tickets_table.php
├── routes/
│   ├── api.php
│   └── web.php
├── composer.json
├── module.json
└── README.md
```

### Service Layer Design

#### ClickUpOAuthService
```php
/**
 * Handles OAuth 2.0 authorization flow
 */
class ClickUpOAuthService
{
    public function getAuthorizationUrl(string $state): string
    public function exchangeCodeForToken(string $code): array
    public function getAuthorizedTeams(string $accessToken): array
    public function revokeToken(string $accessToken): bool
}
```

#### ClickUpTokenService
```php
/**
 * Token management with caching and validation
 */
class ClickUpTokenService
{
    public function getOrganisationToken(string $organisationId): ?string
    public function hasValidToken(string $organisationId): bool
    public function cacheToken(string $organisationId, string $token, int $ttl = 3300): void
    public function clearTokenCache(string $organisationId): void
}
```

#### ClickUpApiService
```php
/**
 * ClickUp API wrapper with caching and rate limiting
 */
class ClickUpApiService
{
    private const CACHE_TTL_TEAMS = 3600;      // 1 hour
    private const CACHE_TTL_SPACES = 1800;     // 30 minutes
    private const CACHE_TTL_LISTS = 900;       // 15 minutes

    public function getTeams(string $organisationId): array
    public function getSpaces(string $organisationId, string $teamId): array
    public function getSpace(string $organisationId, string $spaceId): array
    public function getFolders(string $organisationId, string $spaceId): array
    public function getLists(string $organisationId, string $folderId): array
    public function getList(string $organisationId, string $listId): array
    public function createTask(string $organisationId, string $listId, array $data): array
    public function updateTask(string $organisationId, string $taskId, array $data): array
    public function getTask(string $organisationId, string $taskId): array

    private function checkRateLimit(string $organisationId): void
    private function cacheResponse(string $key, array $data, int $ttl): void
}
```

#### ClickUpSpaceSyncService
```php
/**
 * Syncs Space metadata from ClickUp API to local database
 */
class ClickUpSpaceSyncService
{
    public function syncSpacesForOrganisation(string $organisationId): void
    public function syncSingleSpace(string $organisationId, string $spaceId): ClickUpSpace
}
```

#### ClickUpTaskService
```php
/**
 * Task creation and management
 */
class ClickUpTaskService
{
    public function createTaskFromTicket(Ticket $ticket, ?string $listId = null): ?ClickUpTask
    public function syncTaskMetadata(ClickUpTask $task): void
    public function linkTaskToTicket(string $ticketId, string $clickupTaskId): void

    private function formatTicketTitle(Ticket $ticket): string // Returns "[TICKET-{uuid}] {title}"
    private function formatTicketDescription(Ticket $ticket): string
    private function mapPriority(string $ticketPriority): int
    private function getDefaultListId(Customer $customer): ?string
}
```

### OAuth Flow Sequence

```
┌──────┐                ┌─────────┐              ┌──────────┐              ┌──────────┐
│ User │                │ Portal  │              │ ClickUp  │              │ Database │
└──┬───┘                └────┬────┘              └────┬─────┘              └────┬─────┘
   │                         │                        │                         │
   │ 1. Click "Connect       │                        │                         │
   │    ClickUp"             │                        │                         │
   ├────────────────────────>│                        │                         │
   │                         │                        │                         │
   │                         │ 2. Generate state      │                         │
   │                         │    (CSRF token)        │                         │
   │                         ├───────────────────────>│                         │
   │                         │                        │                         │
   │                         │ 3. Redirect to auth URL│                         │
   │<────────────────────────┤    with state          │                         │
   │                         │                        │                         │
   │ 4. User authorizes      │                        │                         │
   │    workspace(s)         │                        │                         │
   ├─────────────────────────┼───────────────────────>│                         │
   │                         │                        │                         │
   │ 5. Redirect back with   │                        │                         │
   │    auth code            │                        │                         │
   │<────────────────────────┼────────────────────────┤                         │
   │                         │                        │                         │
   │                         │ 6. Validate state      │                         │
   │                         │    & exchange code     │                         │
   │                         ├───────────────────────>│                         │
   │                         │                        │                         │
   │                         │ 7. Return access token │                         │
   │                         │<───────────────────────┤                         │
   │                         │                        │                         │
   │                         │ 8. Get authorized teams│                         │
   │                         ├───────────────────────>│                         │
   │                         │<───────────────────────┤                         │
   │                         │                        │                         │
   │                         │ 9. Store encrypted     │                         │
   │                         │    token + team info   │                         │
   │                         ├────────────────────────┼────────────────────────>│
   │                         │                        │                         │
   │                         │10. Trigger Space sync  │                         │
   │                         │    (background job)    │                         │
   │                         ├───────────────────────>│                         │
   │                         │                        │                         │
   │ 11. Success message     │                        │                         │
   │<────────────────────────┤                        │                         │
   │                         │                        │                         │
```

### Customer Space Selection Flow

```
┌──────────┐          ┌─────────┐          ┌──────────┐          ┌──────────┐
│ Org User │          │ Portal  │          │ ClickUp  │          │ Database │
└────┬─────┘          └────┬────┘          └────┬─────┘          └────┬─────┘
     │                     │                     │                     │
     │ 1. Navigate to      │                     │                     │
     │    Customer Edit    │                     │                     │
     ├────────────────────>│                     │                     │
     │                     │                     │                     │
     │                     │ 2. Check if ClickUp │                     │
     │                     │    module enabled   │                     │
     │                     ├────────────────────────────────────────────>│
     │                     │<───────────────────────────────────────────┤
     │                     │                     │                     │
     │                     │ 3. Check OAuth token│                     │
     │                     │    exists           │                     │
     │                     ├────────────────────────────────────────────>│
     │                     │<───────────────────────────────────────────┤
     │                     │                     │                     │
     │                     │ 4. Get cached Spaces│                     │
     │                     │    (or fetch fresh) │                     │
     │                     ├────────────────────>│                     │
     │                     │<────────────────────┤                     │
     │                     │                     │                     │
     │ 5. Render Space     │                     │                     │
     │    selection UI     │                     │                     │
     │<────────────────────┤                     │                     │
     │                     │                     │                     │
     │ 6. Select Space     │                     │                     │
     ├────────────────────>│                     │                     │
     │                     │                     │                     │
     │                     │ 7. Save to          │                     │
     │                     │    customer_settings│                     │
     │                     ├────────────────────────────────────────────>│
     │                     │                     │                     │
     │ 8. Success          │                     │                     │
     │<────────────────────┤                     │                     │
     │                     │                     │                     │
```

### Task Creation from Ticket Flow

```
┌──────┐       ┌─────────┐       ┌──────────────┐       ┌──────────┐       ┌──────────┐
│ User │       │ Portal  │       │ TaskService  │       │ ClickUp  │       │ Database │
└──┬───┘       └────┬────┘       └──────┬───────┘       └────┬─────┘       └────┬─────┘
   │                │                    │                    │                  │
   │ 1. Click       │                    │                    │                  │
   │ "Create Task"  │                    │                    │                  │
   ├───────────────>│                    │                    │                  │
   │                │                    │                    │                  │
   │                │ 2. Get customer    │                    │                  │
   │                │    ClickUp Space   │                    │                  │
   │                ├──────────────────────────────────────────────────────────>│
   │                │<─────────────────────────────────────────────────────────┤
   │                │                    │                    │                  │
   │                │ 3. Dispatch job    │                    │                  │
   │                ├───────────────────>│                    │                  │
   │                │                    │                    │                  │
   │ 4. Show        │                    │ 5. Get default     │                  │
   │    "Creating"  │                    │    list for Space  │                  │
   │<───────────────┤                    ├───────────────────>│                  │
   │                │                    │<───────────────────┤                  │
   │                │                    │                    │                  │
   │                │                    │ 6. Format title    │                  │
   │                │                    │    "[TICKET-123]"  │                  │
   │                │                    │                    │                  │
   │                │                    │ 7. Create task     │                  │
   │                │                    ├───────────────────>│                  │
   │                │                    │<───────────────────┤                  │
   │                │                    │                    │                  │
   │                │                    │ 8. Store task ID   │                  │
   │                │                    │    in ticket       │                  │
   │                │                    │    metadata        │                  │
   │                │                    ├─────────────────────────────────────>│
   │                │                    │                    │                  │
   │                │ 9. Success event   │                    │                  │
   │                │<───────────────────┤                    │                  │
   │                │                    │                    │                  │
   │ 10. Show task  │                    │                    │                  │
   │     link       │                    │                    │                  │
   │<───────────────┤                    │                    │                  │
   │                │                    │                    │                  │
```

---

## Database Schema

### clickup_oauth_tokens

```sql
CREATE TABLE clickup_oauth_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id UUID NOT NULL UNIQUE,  -- One token per organisation
    access_token TEXT NOT NULL,             -- Encrypted
    refresh_token TEXT NULL,                -- Encrypted (not currently used by ClickUp)
    token_type VARCHAR(50) NOT NULL DEFAULT 'Bearer',
    scope TEXT NULL,
    access_token_expires_at TIMESTAMP NULL, -- Currently NULL (tokens don't expire)
    clickup_team_id BIGINT NULL,           -- Primary ClickUp workspace/team ID
    clickup_team_name VARCHAR(255) NULL,
    clickup_account_email VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE,
    INDEX idx_organisation_id (organisation_id)
);
```

### clickup_spaces

```sql
CREATE TABLE clickup_spaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id UUID NOT NULL,
    clickup_space_id VARCHAR(255) NOT NULL,  -- ClickUp's Space ID
    clickup_team_id VARCHAR(255) NOT NULL,   -- Parent workspace ID
    name VARCHAR(255) NOT NULL,
    is_private BOOLEAN DEFAULT FALSE,
    color VARCHAR(50) NULL,
    avatar_url TEXT NULL,
    metadata JSON NULL,                      -- Store additional Space properties
    last_synced_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE,
    UNIQUE KEY unique_space_per_org (organisation_id, clickup_space_id),
    INDEX idx_organisation_id (organisation_id),
    INDEX idx_clickup_space_id (clickup_space_id)
);
```

### clickup_tasks

```sql
CREATE TABLE clickup_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisation_id UUID NOT NULL,
    ticket_id UUID NOT NULL,                -- Link to portal ticket
    clickup_task_id VARCHAR(255) NOT NULL UNIQUE,
    clickup_list_id VARCHAR(255) NOT NULL,
    clickup_space_id VARCHAR(255) NOT NULL,
    name VARCHAR(500) NOT NULL,
    description TEXT NULL,
    status VARCHAR(100) NULL,
    priority INT NULL,                       -- 1=urgent, 2=high, 3=normal, 4=low
    url TEXT NULL,                           -- ClickUp task URL
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    INDEX idx_organisation_id (organisation_id),
    INDEX idx_ticket_id (ticket_id),
    INDEX idx_clickup_task_id (clickup_task_id)
);
```

### customer_settings (existing table - new row)

```sql
-- Example row for ClickUp Space assignment
INSERT INTO customer_settings (customer_id, module, key, value, type)
VALUES (
    '550e8400-e29b-41d4-a716-446655440000',  -- customer_id
    'ClickUp',                                -- module
    'clickup_space_id',                       -- key
    '90120000000',                            -- value (ClickUp Space ID)
    'plain'                                   -- type
);
```

### tickets table modification

```sql
-- Add ClickUp task ID to metadata JSON column
-- No migration needed - use existing metadata column

-- Example metadata:
{
    "clickup_task_id": "abc123xyz",
    "clickup_task_url": "https://app.clickup.com/t/abc123xyz"
}
```

---

## Implementation Plan

### Phase 1: OAuth & Space Management (Week 1-2)

**Estimated Effort:** 40 hours
**Priority:** CRITICAL
**Dependencies:** None

#### Milestones

**Milestone 1.1: Module Scaffold (4 hours)**
- Create module structure
- Configure module.json and composer.json
- Set up service providers
- Define configuration file

**Milestone 1.2: Database & Models (6 hours)**
- Create migrations for clickup_oauth_tokens, clickup_spaces
- Create Eloquent models with relationships
- Implement token encryption accessors/mutators
- Add multi-tenancy traits

**Milestone 1.3: OAuth Implementation (12 hours)**
- Implement ClickUpOAuthService using League OAuth2 Client
- Create OAuth controllers (connect, callback, disconnect)
- Add state-based CSRF protection
- Store authorized team information
- Error handling and user feedback

**Milestone 1.4: Space Syncing (10 hours)**
- Implement ClickUpApiService for API calls
- Create ClickUpSpaceSyncService
- Background job: SyncClickUpSpaces
- Cache Space data in Redis (30 min TTL)
- API endpoint: GET /api/clickup/spaces

**Milestone 1.5: Customer Space Assignment UI (8 hours)**
- Add ClickUp section to Customer edit page
- Dropdown to select Space (only if module enabled + OAuth token exists)
- Save to customer_settings table
- Display current Space selection
- Handle edge cases (no token, no Spaces, disabled module)

### Phase 2: Chrome Extension Integration (Week 3)

**Estimated Effort:** 16 hours
**Priority:** HIGH
**Dependencies:** Phase 1 complete

#### Milestones

**Milestone 2.1: Extension API Endpoint (4 hours)**
- Create API endpoint: GET /api/extension/customer/{id}/clickup
- Return Space ID and metadata for authenticated extension users
- Implement extension token middleware authentication
- Add to existing extension API group

**Milestone 2.2: Extension Storage & Caching (4 hours)**
- Cache ClickUp Space IDs in chrome.storage.local
- TTL: 1 hour for Space metadata
- Invalidation on organisation switch

**Milestone 2.3: ClickUp Content Script Enhancement (6 hours)**
- Update chrome-extension/content-scripts/clickup.js
- Extract task information from ClickUp URL/DOM
- Send task context to popup via chrome.runtime.sendMessage
- Inject "Start Timer" button on ClickUp task pages (similar to GitHub pattern)

**Milestone 2.4: Popup Integration (2 hours)**
- Update popup.js to handle ClickUp task context
- Pre-fill description with ClickUp task title
- Display ClickUp task link in recent entries

### Phase 3: Task Creation from Tickets (Week 4)

**Estimated Effort:** 24 hours
**Priority:** HIGH
**Dependencies:** Phase 1 complete

#### Milestones

**Milestone 3.1: Task Service Implementation (10 hours)**
- Implement ClickUpTaskService.createTaskFromTicket()
- Title formatting: `[TICKET-{uuid}] {title}`
- Description formatting (convert Markdown if needed)
- Priority mapping (ticket → ClickUp)
- Assignee mapping (if user has ClickUp account)

**Milestone 3.2: Default List Resolution (4 hours)**
- Get customer's ClickUp Space from settings
- Query ClickUp API for first List in Space
- Cache List IDs per Space (1 hour TTL)
- Fallback: Allow manual List selection

**Milestone 3.3: Background Job (4 hours)**
- Create CreateClickUpTask job (queued)
- Handle API failures with retries (3 attempts)
- Store task in clickup_tasks table
- Update ticket metadata with task ID + URL

**Milestone 3.4: UI Integration (6 hours)**
- Add "Create ClickUp Task" button on ticket detail page
- Show loading state during creation
- Display success message with link to task
- Show existing linked task (if already created)
- Handle errors gracefully (token expired, rate limit, etc.)

---

## Risk Assessment

### Technical Risks

#### Risk 1: ClickUp API Rate Limiting
**Impact:** HIGH
**Likelihood:** MEDIUM
**Description:** Most ClickUp plans limit to 100 requests/minute. With multiple users and background sync jobs, we could hit limits.

**Mitigation Strategies:**
1. Implement aggressive caching:
   - Teams: 1 hour
   - Spaces: 30 minutes
   - Lists: 15 minutes
2. Queue batch operations during off-peak hours
3. Track rate limit headers and pause requests when approaching limit
4. Display user-friendly message when rate limited (retry after X seconds)
5. Consider upgrading ClickUp plan for high-volume organizations

#### Risk 2: OAuth Token Invalidation
**Impact:** HIGH
**Likelihood:** LOW
**Description:** ClickUp tokens currently don't expire, but API docs mention this may change in future.

**Mitigation Strategies:**
1. Build refresh token mechanism proactively (even if not needed yet)
2. Monitor token health with periodic validation
3. Gracefully handle 401 responses with re-auth prompt
4. Store token created_at to detect old tokens
5. Email notifications to admins when token needs refresh

#### Risk 3: Multiple Workspace Authorization
**Impact:** MEDIUM
**Likelihood:** MEDIUM
**Description:** Users can authorize multiple workspaces during OAuth. We only store one team_id.

**Mitigation Strategies:**
1. During OAuth callback, let user select which workspace to use
2. Store selected workspace_id and workspace_name
3. Allow re-authorization to switch workspaces
4. UI indicator showing which workspace is connected
5. Option to disconnect and reconnect with different workspace

#### Risk 4: Chrome Extension Permissions
**Impact:** MEDIUM
**Likelihood:** LOW
**Description:** Browser security updates may restrict content script access.

**Mitigation Strategies:**
1. Use minimal required permissions
2. Follow Chrome Extension best practices
3. Graceful degradation if content script injection fails
4. Comprehensive error logging
5. Alternative: Deep linking from extension popup

#### Risk 5: ClickUp API Schema Changes
**Impact:** MEDIUM
**Likelihood:** LOW
**Description:** ClickUp may change API response structures, breaking our integration.

**Mitigation Strategies:**
1. Version API requests (currently v2)
2. Defensive parsing of API responses
3. Log schema mismatches for monitoring
4. Automated tests against ClickUp sandbox (if available)
5. Subscribe to ClickUp API changelog

### Timeline Risks

#### Risk 6: Scope Creep
**Impact:** MEDIUM
**Likelihood:** MEDIUM
**Description:** Stakeholders may request additional features (bi-directional sync, webhook integrations).

**Mitigation Strategies:**
1. Clearly define Phase 1-3 scope in this PRD
2. Document future enhancements separately
3. Use feature flags for experimental features
4. Regular stakeholder alignment meetings
5. Prioritize MVP functionality first

### Security Risks

#### Risk 7: Token Storage Security
**Impact:** CRITICAL
**Likelihood:** LOW
**Description:** OAuth tokens provide full workspace access. Compromise = data breach.

**Mitigation Strategies:**
1. Encrypt tokens using Laravel's built-in encryption
2. Never log decrypted tokens
3. Restrict database access with role-based controls
4. Rotate encryption keys periodically
5. Audit token access in application logs

#### Risk 8: CSRF in OAuth Flow
**Impact:** HIGH
**Likelihood:** LOW
**Description:** Attacker could trick user into authorizing their ClickUp workspace.

**Mitigation Strategies:**
1. Implement state parameter with cryptographically secure random string
2. Store state in session with expiration (5 minutes)
3. Validate state on callback before token exchange
4. Log failed state validations for monitoring
5. HTTPS only for all OAuth endpoints

---

## Task List

**GitHub Issues Created:**
- **Phase 1 Part 1:** [Issue #75](https://github.com/nathanchick/agency-portal-v2/issues/75) - OAuth & Space Management (Tasks 1-10)
- **Phase 1 Part 2:** [Issue #76](https://github.com/nathanchick/agency-portal-v2/issues/76) - API Service & Space Syncing (Tasks 12-16)
- **Phase 1 Part 3:** [Issue #79](https://github.com/nathanchick/agency-portal-v2/issues/79) - Customer Space Assignment UI (Tasks 17-20)
- **Phase 1 Part 4:** [Issue #80](https://github.com/nathanchick/agency-portal-v2/issues/80) - Polish & Documentation (Tasks 21-25)
- **Phase 2:** [Issue #77](https://github.com/nathanchick/agency-portal-v2/issues/77) - Chrome Extension Integration (Tasks 26-32)
- **Phase 3 Part 1:** [Issue #78](https://github.com/nathanchick/agency-portal-v2/issues/78) - Task Creation Core (Tasks 33-38)
- **Phase 3 Part 2:** [Issue #81](https://github.com/nathanchick/agency-portal-v2/issues/81) - Task Creation UI & Features (Tasks 39-44)
- **Phase 3 Part 3:** [Issue #82](https://github.com/nathanchick/agency-portal-v2/issues/82) - Error Handling & Polish (Tasks 45-50)

### Phase 1: OAuth & Space Management (Tasks 1-25)

#### Task 1: Create ClickUp Module Skeleton
**Priority**: CRITICAL
**Estimated Effort**: 2 hours
**Dependencies**: None
**GitHub Issue**: [#75](https://github.com/nathanchick/agency-portal-v2/issues/75)

**Acceptance Criteria**:
- [ ] Module directory created at `Modules/ClickUp/`
- [ ] Standard subdirectories: app/, config/, database/, routes/
- [ ] `module.json` configured with name, alias, providers
- [ ] `composer.json` configured with PSR-4 autoloading
- [ ] ServiceProvider registered
- [ ] Module loads without errors
- [ ] `php artisan module:list` shows ClickUp module

---

#### Task 2: Configure Module Settings
**Priority**: CRITICAL
**Estimated Effort**: 1 hour
**Dependencies**: Task 1
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] `config/config.php` created with organisation_settings
- [ ] Settings include 'status' (yes_no type) for enable/disable
- [ ] .env variables defined: CLICKUP_CLIENT_ID, CLICKUP_CLIENT_SECRET, CLICKUP_REDIRECT_URI
- [ ] Configuration accessible via `config('clickup.client_id')`
- [ ] Module settings appear in organisation settings UI

---

#### Task 3: Create Database Migrations
**Priority**: CRITICAL
**Estimated Effort**: 3 hours
**Dependencies**: Task 1
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Migration: `create_clickup_oauth_tokens_table.php`
- [ ] Migration: `create_clickup_spaces_table.php`
- [ ] Migration: `create_clickup_tasks_table.php`
- [ ] All tables include UUID primary keys
- [ ] Foreign keys to organisations table with ON DELETE CASCADE
- [ ] Unique constraints on organisation_id for tokens
- [ ] Indexes on frequently queried columns
- [ ] Migrations run successfully: `php artisan migrate`

---

#### Task 4: Create ClickUpOAuthToken Model
**Priority**: CRITICAL
**Estimated Effort**: 2 hours
**Dependencies**: Task 3
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Model created at `app/Models/ClickUpOAuthToken.php`
- [ ] Uses `HasUuids`, `BelongsToTenant` traits
- [ ] access_token and refresh_token encrypted via accessors/mutators
- [ ] belongsTo relationship with Organisation
- [ ] isExpired() method (returns false until ClickUp adds expiration)
- [ ] $hidden includes access_token, refresh_token
- [ ] Factory created for testing

---

#### Task 5: Create ClickUpSpace Model
**Priority**: HIGH
**Estimated Effort**: 1 hour
**Dependencies**: Task 3
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Model created at `app/Models/ClickUpSpace.php`
- [ ] Uses `HasUuids`, `BelongsToTenant` traits
- [ ] belongsTo relationship with Organisation
- [ ] $casts includes metadata => array
- [ ] Scopes: byOrganisation(), byClickUpSpaceId()
- [ ] Factory created for testing

---

#### Task 6: Install OAuth2 Client Package
**Priority**: CRITICAL
**Estimated Effort**: 1 hour
**Dependencies**: Task 1
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] `composer require league/oauth2-client` executed
- [ ] Package appears in composer.json
- [ ] Autoloading works: `use League\OAuth2\Client\Provider\GenericProvider`
- [ ] No version conflicts

---

#### Task 7: Implement ClickUpOAuthService
**Priority**: CRITICAL
**Estimated Effort**: 6 hours
**Dependencies**: Tasks 4, 6
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Service created at `app/Services/ClickUpOAuthService.php`
- [ ] getAuthorizationUrl(string $state): string method
- [ ] exchangeCodeForToken(string $code): array method
- [ ] getAuthorizedTeams(string $accessToken): array method
- [ ] Uses GenericProvider with ClickUp endpoints
- [ ] Error handling for API failures
- [ ] Unit tests with 80%+ coverage
- [ ] Integration test with ClickUp sandbox (manual)

---

#### Task 8: Implement ClickUpTokenService
**Priority**: HIGH
**Estimated Effort**: 3 hours
**Dependencies**: Task 4
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Service created at `app/Services/ClickUpTokenService.php`
- [ ] getOrganisationToken(string $organisationId): ?string
- [ ] hasValidToken(string $organisationId): bool
- [ ] cacheToken() with 55 minute TTL (match GitHub pattern)
- [ ] clearTokenCache(string $organisationId): void
- [ ] Uses Redis cache with key: `clickup:token:{org_id}`
- [ ] Unit tests with mocked cache

---

#### Task 9: Create ClickUpOAuthController
**Priority**: CRITICAL
**Estimated Effort**: 8 hours
**Dependencies**: Tasks 7, 8
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Controller created at `app/Http/Controllers/ClickUpOAuthController.php`
- [ ] connect() method generates state, stores in session, redirects to ClickUp
- [ ] callback() method validates state, exchanges code, stores token
- [ ] disconnect() method deletes token from database and cache
- [ ] CSRF protection via state parameter
- [ ] User feedback via flash messages
- [ ] Redirect back to settings page after connect/disconnect
- [ ] Error handling for all failure scenarios
- [ ] Feature tests for all three methods

---

#### Task 10: Create OAuth Web Routes
**Priority**: CRITICAL
**Estimated Effort**: 1 hour
**Dependencies**: Task 9
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Routes defined in `routes/web.php`
- [ ] Middleware: auth, verified
- [ ] Routes:
  - GET /clickup/oauth/connect → connect
  - GET /clickup/oauth/callback → callback
  - DELETE /clickup/oauth/disconnect → disconnect
- [ ] Route names: clickup.oauth.connect, etc.
- [ ] Routes accessible: `php artisan route:list | grep clickup`

---

#### Task 11: Generate Frontend Route Definitions
**Priority**: HIGH
**Estimated Effort**: 1 hour
**Dependencies**: Task 10
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Run Wayfinder: `php artisan wayfinder:generate`
- [ ] TypeScript files generated in `resources/js/actions/Modules/ClickUp/`
- [ ] Routes accessible from React components
- [ ] No TypeScript compilation errors
- [ ] Example usage works: `import { connect } from '@/actions/Modules/ClickUp/Http/Controllers/ClickUpOAuthController'`

---

#### Task 12: Implement ClickUpApiService
**Priority**: CRITICAL
**Estimated Effort**: 8 hours
**Dependencies**: Task 8
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Service created at `app/Services/ClickUpApiService.php`
- [ ] Uses GuzzleHTTP for API calls
- [ ] Methods: getTeams(), getSpaces(), getSpace(), getFolders(), getLists()
- [ ] Caching with appropriate TTLs (teams: 1h, spaces: 30m, lists: 15m)
- [ ] Rate limit tracking via cache (100 requests/min)
- [ ] checkRateLimit() throws exception when limit approached
- [ ] Retry logic for 429 responses (exponential backoff)
- [ ] Custom exceptions: ClickUpApiException, ClickUpRateLimitException
- [ ] Unit tests with mocked HTTP responses
- [ ] Integration test with ClickUp API (manual)

---

#### Task 13: Implement ClickUpSpaceSyncService
**Priority**: HIGH
**Estimated Effort**: 4 hours
**Dependencies**: Task 12
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Service created at `app/Services/ClickUpSpaceSyncService.php`
- [ ] syncSpacesForOrganisation(string $organisationId): void
- [ ] Fetches all Spaces for org's team
- [ ] Upserts to clickup_spaces table (update if exists)
- [ ] Updates last_synced_at timestamp
- [ ] Transaction support for data consistency
- [ ] Error handling with logging
- [ ] Unit tests with mocked API service

---

#### Task 14: Create SyncClickUpSpaces Background Job
**Priority**: HIGH
**Estimated Effort**: 3 hours
**Dependencies**: Task 13
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Job created at `app/Jobs/SyncClickUpSpaces.php`
- [ ] Implements ShouldQueue interface
- [ ] Queue: 'clickup'
- [ ] Retry attempts: 3
- [ ] Backoff: 60 seconds
- [ ] Timeout: 120 seconds
- [ ] Calls ClickUpSpaceSyncService
- [ ] Job dispatched after successful OAuth callback
- [ ] Unit tests for job logic

---

#### Task 15: Create ClickUpSpaceController (API)
**Priority**: HIGH
**Estimated Effort**: 4 hours
**Dependencies**: Tasks 5, 12
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Controller created at `app/Http/Controllers/ClickUpSpaceController.php`
- [ ] index() method returns Spaces for current organisation
- [ ] Uses HasCurrentOrganisation trait for security
- [ ] Returns JSON response
- [ ] Pagination support (optional)
- [ ] Authorization: user must belong to organisation
- [ ] Feature tests with authenticated user

---

#### Task 16: Create Space API Routes
**Priority**: HIGH
**Estimated Effort**: 1 hour
**Dependencies**: Task 15
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Routes defined in `routes/api.php`
- [ ] Middleware: auth:sanctum
- [ ] Routes:
  - GET /api/v1/clickup/spaces → index
- [ ] Route names: api.clickup.spaces.index
- [ ] Routes accessible: `php artisan route:list | grep clickup`

---

#### Task 17: Add ClickUp Section to Customer Edit Page (Backend)
**Priority**: HIGH
**Estimated Effort**: 3 hours
**Dependencies**: Tasks 5, 15
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] CustomerController passes ClickUp data to Inertia
- [ ] Check if ClickUp module enabled for organisation
- [ ] Check if OAuth token exists
- [ ] Query available Spaces from database (or API if fresh sync needed)
- [ ] Pass current Space ID from customer_settings
- [ ] Pass data structure: { enabled: bool, connected: bool, spaces: [], currentSpaceId: string|null }

---

#### Task 18: Add ClickUp Section to Customer Edit Page (Frontend)
**Priority**: HIGH
**Estimated Effort**: 5 hours
**Dependencies**: Task 17
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] React component for ClickUp Space selection
- [ ] Dropdown using shadcn/ui Select component
- [ ] Conditional rendering:
  - If module disabled: Show nothing
  - If module enabled but not connected: Show "Connect ClickUp" button
  - If connected: Show Space dropdown
- [ ] Save to customer_settings on change
- [ ] Optimistic UI updates
- [ ] Loading states
- [ ] Error handling with toast notifications
- [ ] Accessible (ARIA labels, keyboard navigation)

---

#### Task 19: Implement Customer Setting Save Logic
**Priority**: HIGH
**Estimated Effort**: 2 hours
**Dependencies**: Task 18
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] API endpoint: POST /api/customers/{id}/settings
- [ ] Accepts: { module: 'ClickUp', key: 'clickup_space_id', value: '12345' }
- [ ] Upserts to customer_settings table
- [ ] Authorization: user must have access to customer
- [ ] Returns updated settings
- [ ] Validation rules
- [ ] Feature tests

---

#### Task 20: Add Connect ClickUp Button to Organisation Settings
**Priority**: MEDIUM
**Estimated Effort**: 3 hours
**Dependencies**: Task 9
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Organisation settings page shows ClickUp section
- [ ] If not connected: "Connect ClickUp" button
- [ ] If connected: Shows team name, "Disconnect" button
- [ ] Button triggers OAuth flow
- [ ] Success/error feedback
- [ ] Styling matches GitHub integration section

---

#### Task 21: Add Custom Exceptions
**Priority**: MEDIUM
**Estimated Effort**: 2 hours
**Dependencies**: Task 1
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] ClickUpApiException created with context (endpoint, status code)
- [ ] ClickUpTokenException created
- [ ] ClickUpRateLimitException created (includes retry_after)
- [ ] Exceptions extend base exception class
- [ ] Logged with appropriate severity
- [ ] User-friendly error messages

---

#### Task 22: Implement Rate Limit Tracking
**Priority**: MEDIUM
**Estimated Effort**: 3 hours
**Dependencies**: Task 12
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Track requests per minute in Redis
- [ ] Key: `clickup:rate_limit:{org_id}`
- [ ] Increment on each API call
- [ ] TTL: 60 seconds
- [ ] Throw exception when approaching limit (90 of 100)
- [ ] Unit tests with mocked cache

---

#### Task 23: Add OAuth State Validation Tests
**Priority**: HIGH
**Estimated Effort**: 2 hours
**Dependencies**: Task 9
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Feature test: Invalid state returns error
- [ ] Feature test: Missing state returns error
- [ ] Feature test: Expired state returns error
- [ ] Feature test: Valid state exchanges token successfully
- [ ] Test CSRF attack scenario

---

#### Task 24: Documentation - OAuth Setup Guide
**Priority**: MEDIUM
**Estimated Effort**: 2 hours
**Dependencies**: Task 9
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] README.md in Modules/ClickUp/ directory
- [ ] Instructions for creating ClickUp OAuth app
- [ ] .env variable setup guide
- [ ] OAuth flow explanation
- [ ] Troubleshooting common issues
- [ ] Screenshots of ClickUp app creation

---

#### Task 25: Documentation - User Guide (Phase 1)
**Priority**: LOW
**Estimated Effort**: 2 hours
**Dependencies**: Task 18
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] User-facing documentation for connecting ClickUp
- [ ] How to assign Spaces to customers
- [ ] Screenshots of UI
- [ ] FAQ section
- [ ] Markdown format in docs/

---

### Phase 2: Chrome Extension Integration (Tasks 26-32)

#### Task 26: Create Extension API Endpoint for Customer ClickUp Data
**Priority**: HIGH
**Estimated Effort**: 3 hours
**Dependencies**: Phase 1 complete
**GitHub Issue**: [#77](https://github.com/nathanchick/agency-portal-v2/issues/77)

**Acceptance Criteria**:
- [ ] Endpoint: GET /api/extension/customer/{id}/clickup
- [ ] Middleware: extension.token
- [ ] Returns: { space_id, space_name, team_id, team_name }
- [ ] Authorization: extension token must have access to customer
- [ ] Returns 404 if customer has no ClickUp Space
- [ ] Returns 503 if ClickUp module disabled
- [ ] Feature tests with extension token

---

#### Task 27: Update Extension API Routes
**Priority**: HIGH
**Estimated Effort**: 1 hour
**Dependencies**: Task 26
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Route added to routes/api.php in extension group
- [ ] Route name: extension.customer.clickup
- [ ] Consistent with existing extension routes pattern

---

#### Task 28: Update Chrome Extension Storage Manager
**Priority**: MEDIUM
**Estimated Effort**: 2 hours
**Dependencies**: Task 26
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Add cacheClickUpData() method to lib/storage.js
- [ ] Cache structure: { customer_id, space_id, space_name, expires_at }
- [ ] TTL: 1 hour
- [ ] getCachedClickUpData(customerId) method
- [ ] clearClickUpCache() method
- [ ] Unit tests (if test framework exists)

---

#### Task 29: Update ClickUp Content Script
**Priority**: HIGH
**Estimated Effort**: 6 hours
**Dependencies**: Task 28
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] content-scripts/clickup.js extracts task information from URL
- [ ] Pattern: https://app.clickup.com/t/{task_id}
- [ ] Extract: task ID, task name (from DOM), list ID (from URL or DOM)
- [ ] Inject "Start Timer" button (floating, styled like GitHub button)
- [ ] Click handler sends message to background.js
- [ ] Message type: 'START_TIMER_FROM_TASK'
- [ ] Show success notification
- [ ] Handle ClickUp SPA navigation (MutationObserver)
- [ ] Only show button if portal user has access to ClickUp Space

---

#### Task 30: Update Background Service Worker
**Priority**: MEDIUM
**Estimated Effort**: 2 hours
**Dependencies**: Task 29
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] background/service-worker.js handles 'START_TIMER_FROM_TASK' message
- [ ] Store task context in chrome.storage.local
- [ ] Open popup (if possible)
- [ ] Send response to content script

---

#### Task 31: Update Extension Popup for ClickUp Context
**Priority**: MEDIUM
**Estimated Effort**: 2 hours
**Dependencies**: Task 29
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] popup/popup.js checks for pending ClickUp task on load
- [ ] Pre-fill timer description with ClickUp task name
- [ ] Pre-fill external reference: "ClickUp Task: {task_id}"
- [ ] Display ClickUp icon/indicator
- [ ] Clear task context after timer started

---

#### Task 32: Testing - Chrome Extension E2E
**Priority**: MEDIUM
**Estimated Effort**: 3 hours
**Dependencies**: Tasks 29-31
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Manual test: Navigate to ClickUp task page
- [ ] Manual test: Click "Start Timer" button
- [ ] Manual test: Verify popup opens with pre-filled data
- [ ] Manual test: Start timer successfully
- [ ] Manual test: Verify timer references ClickUp task
- [ ] Document test scenarios

---

### Phase 3: Task Creation from Tickets (Tasks 33-50)

#### Task 33: Create ClickUpTask Model
**Priority**: HIGH
**Estimated Effort**: 2 hours
**Dependencies**: Phase 1, Task 3
**GitHub Issue**: [#78](https://github.com/nathanchick/agency-portal-v2/issues/78)

**Acceptance Criteria**:
- [ ] Model created at `app/Models/ClickUpTask.php`
- [ ] Uses `HasUuids`, `BelongsToTenant` traits
- [ ] belongsTo relationships: Organisation, Ticket
- [ ] $fillable includes all relevant fields
- [ ] Factory created for testing

---

#### Task 34: Implement ClickUpTaskService
**Priority**: CRITICAL
**Estimated Effort**: 8 hours
**Dependencies**: Tasks 12, 33
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Service created at `app/Services/ClickUpTaskService.php`
- [ ] createTaskFromTicket(Ticket $ticket, ?string $listId = null): ?ClickUpTask
- [ ] formatTicketTitle(Ticket $ticket): string returns "[TICKET-{uuid}] {title}"
- [ ] formatTicketDescription(Ticket $ticket): string (HTML to Markdown conversion)
- [ ] mapPriority(string $ticketPriority): int (maps to ClickUp 1-4 scale)
- [ ] getDefaultListId(Customer $customer): ?string (gets first List in Space)
- [ ] Error handling for missing Space, invalid List, API failures
- [ ] Unit tests with mocked API service

---

#### Task 35: Implement List ID Resolution Logic
**Priority**: HIGH
**Estimated Effort**: 4 hours
**Dependencies**: Task 34
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] getDefaultListId() fetches customer's Space
- [ ] Fetches first Folder in Space
- [ ] Fetches first List in Folder (or first List in Space if no Folders)
- [ ] Caches List ID per Space (1 hour TTL)
- [ ] Returns null if Space has no Lists
- [ ] Unit tests

---

#### Task 36: Create CreateClickUpTask Background Job
**Priority**: HIGH
**Estimated Effort**: 4 hours
**Dependencies**: Task 34
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Job created at `app/Jobs/CreateClickUpTask.php`
- [ ] Implements ShouldQueue interface
- [ ] Queue: 'clickup'
- [ ] Retry attempts: 3
- [ ] Backoff: exponential (60s, 120s, 240s)
- [ ] Timeout: 120 seconds
- [ ] Calls ClickUpTaskService.createTaskFromTicket()
- [ ] Stores result in clickup_tasks table
- [ ] Updates ticket metadata with task_id and URL
- [ ] Dispatches event: ClickUpTaskCreated
- [ ] Job tests

---

#### Task 37: Create ClickUpTaskController
**Priority**: HIGH
**Estimated Effort**: 4 hours
**Dependencies**: Task 36
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Controller created at `app/Http/Controllers/ClickUpTaskController.php`
- [ ] store() method accepts ticket_id, optional list_id
- [ ] Validates customer has ClickUp Space configured
- [ ] Dispatches CreateClickUpTask job
- [ ] Returns 202 Accepted with job status
- [ ] show() method returns task details by ticket_id
- [ ] Authorization: user must have access to ticket
- [ ] Feature tests

---

#### Task 38: Create Task API Routes
**Priority**: HIGH
**Estimated Effort**: 1 hour
**Dependencies**: Task 37
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Routes defined in `routes/api.php`
- [ ] Middleware: auth:sanctum
- [ ] Routes:
  - POST /api/v1/tickets/{id}/clickup-task → store
  - GET /api/v1/tickets/{id}/clickup-task → show
- [ ] Route names: api.tickets.clickup-task.store, .show

---

#### Task 39: Add Migration - Ticket Metadata for ClickUp Task
**Priority**: MEDIUM
**Estimated Effort**: 1 hour
**Dependencies**: Task 33
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] No migration needed (use existing metadata JSON column)
- [ ] Document metadata structure in Ticket model docblock
- [ ] Example: { clickup_task_id, clickup_task_url }

---

#### Task 40: Add "Create ClickUp Task" Button to Ticket Detail Page (Frontend)
**Priority**: HIGH
**Estimated Effort**: 4 hours
**Dependencies**: Task 38
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Button appears on ticket show page
- [ ] Only visible if:
  - ClickUp module enabled for organisation
  - Customer has ClickUp Space configured
  - Ticket not already linked to ClickUp task
- [ ] Click triggers API call to create task
- [ ] Loading state during creation
- [ ] Success: Show link to ClickUp task
- [ ] Error: Display error message (user-friendly)
- [ ] If task already exists: Show "View in ClickUp" link
- [ ] Polling for job completion (or use broadcast events)

---

#### Task 41: Implement Task Status Polling
**Priority**: MEDIUM
**Estimated Effort**: 3 hours
**Dependencies**: Task 40
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Frontend polls GET /api/v1/tickets/{id}/clickup-task every 2 seconds
- [ ] Max 10 attempts (20 seconds)
- [ ] Display progress: "Creating task..."
- [ ] On success: Update UI with task link
- [ ] On failure: Display error from job
- [ ] Stop polling when task created or error received

---

#### Task 42: Add ClickUpTaskCreated Event
**Priority**: MEDIUM
**Estimated Effort**: 2 hours
**Dependencies**: Task 36
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Event created at `app/Events/ClickUpTaskCreated.php`
- [ ] Implements ShouldBroadcast (optional, for real-time updates)
- [ ] Payload: ticket_id, task_id, task_url
- [ ] Dispatched after successful task creation
- [ ] Event test

---

#### Task 43: Implement Priority Mapping Logic
**Priority**: MEDIUM
**Estimated Effort**: 2 hours
**Dependencies**: Task 34
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] mapPriority() handles ticket priority strings
- [ ] Mapping:
  - 'urgent' → 1 (ClickUp urgent)
  - 'high' → 2 (ClickUp high)
  - 'medium', 'normal' → 3 (ClickUp normal)
  - 'low' → 4 (ClickUp low)
- [ ] Default to 3 (normal) if unknown
- [ ] Unit tests for all mappings

---

#### Task 44: Implement Description Formatting
**Priority**: MEDIUM
**Estimated Effort**: 3 hours
**Dependencies**: Task 34
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] formatTicketDescription() converts HTML to Markdown (if needed)
- [ ] Preserves line breaks, lists, links
- [ ] Strips dangerous HTML tags
- [ ] Includes ticket URL in description
- [ ] Includes customer name
- [ ] Includes assigned user (if any)
- [ ] Max length: 10,000 characters (ClickUp limit unknown - research)
- [ ] Unit tests with various HTML inputs

---

#### Task 45: Add Error Handling for Missing Space
**Priority**: HIGH
**Estimated Effort**: 2 hours
**Dependencies**: Task 37
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Validate customer has ClickUp Space before creating task
- [ ] Return 400 Bad Request with message: "Customer does not have a ClickUp Space configured"
- [ ] Frontend displays helpful message with link to customer settings
- [ ] Feature test for this scenario

---

#### Task 46: Add Error Handling for Rate Limiting
**Priority**: HIGH
**Estimated Effort**: 2 hours
**Dependencies**: Task 37
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Catch ClickUpRateLimitException in job
- [ ] Release job back to queue with retry_after delay
- [ ] Log rate limit events
- [ ] User sees "ClickUp API rate limit reached, task will be created shortly"
- [ ] Feature test simulating rate limit

---

#### Task 47: Add Linked Task Display on Ticket Page
**Priority**: MEDIUM
**Estimated Effort**: 2 hours
**Dependencies**: Task 40
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] If ticket has linked ClickUp task, display:
  - Task name
  - ClickUp icon
  - Link to task (opens in new tab)
  - Task status (if synced)
- [ ] Styling matches GitHub linked repository pattern
- [ ] Accessible (ARIA labels)

---

#### Task 48: Testing - Task Creation E2E
**Priority**: HIGH
**Estimated Effort**: 4 hours
**Dependencies**: Tasks 40-47
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Feature test: Create task from ticket successfully
- [ ] Feature test: Handle customer without Space
- [ ] Feature test: Handle rate limiting
- [ ] Feature test: Handle API errors
- [ ] Feature test: Verify task stored in database
- [ ] Feature test: Verify ticket metadata updated
- [ ] Manual test: E2E flow in development environment
- [ ] Verify task appears in ClickUp with correct title format

---

#### Task 49: Documentation - Task Creation User Guide
**Priority**: MEDIUM
**Estimated Effort**: 2 hours
**Dependencies**: Task 40
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] User documentation for creating ClickUp tasks
- [ ] Screenshots of UI
- [ ] Troubleshooting guide (missing Space, rate limits)
- [ ] FAQ section
- [ ] Markdown format

---

#### Task 50: Documentation - Developer Guide
**Priority**: LOW
**Estimated Effort**: 3 hours
**Dependencies**: All tasks complete
**GitHub Issue**: [TBD]

**Acceptance Criteria**:
- [ ] Architecture overview diagram
- [ ] API service usage examples
- [ ] How to extend task creation logic
- [ ] Webhook integration patterns (future)
- [ ] Code examples
- [ ] Markdown format in docs/

---

## Success Metrics

### Key Performance Indicators (KPIs)

**Adoption Metrics:**
- [ ] 60%+ of organisations with ClickUp workspaces connect OAuth within 1 month
- [ ] 80%+ of connected organisations assign Spaces to at least 50% of customers within 2 weeks
- [ ] 40%+ of tickets in connected organisations result in ClickUp task creation

**Technical Performance:**
- [ ] 99%+ OAuth flow success rate
- [ ] <2 second average response time for Space selection UI load
- [ ] <5 second average task creation time (including queue processing)
- [ ] <1% task creation failure rate
- [ ] Zero security incidents related to token storage

**User Experience:**
- [ ] <5% support tickets related to ClickUp integration issues
- [ ] 90%+ user satisfaction score (post-implementation survey)
- [ ] Zero CSRF attacks via OAuth flow
- [ ] Extension button appears on ClickUp task pages 95%+ of the time

**API & Rate Limiting:**
- [ ] <5% of API calls result in rate limit errors
- [ ] 100% of rate-limited jobs successfully retry and complete
- [ ] Average cache hit rate >70% for Space/List data

---

## Documentation Requirements

### User Documentation

#### For Organisation Administrators
- [ ] **ClickUp OAuth Setup Guide**
  - How to create ClickUp OAuth app in workspace settings
  - Where to find client_id and client_secret
  - How to connect ClickUp to portal organisation
  - How to disconnect and reconnect
  - Troubleshooting common OAuth errors

- [ ] **Customer Space Assignment Guide**
  - How to assign ClickUp Spaces to customers
  - Best practices for Space organization
  - How to view which customers have Spaces
  - Screenshots and video tutorial

#### For End Users
- [ ] **Chrome Extension ClickUp Integration**
  - How to start timers from ClickUp tasks
  - How extension knows which customer context to use
  - Offline functionality
  - Troubleshooting button not appearing

- [ ] **Creating ClickUp Tasks from Tickets**
  - How to create tasks from ticket detail page
  - What information is included in task
  - How to find created tasks in ClickUp
  - Limitations and edge cases

### Developer Documentation

- [ ] **Architecture Overview**
  - Module structure diagram
  - Service layer responsibilities
  - Database schema ERD
  - OAuth flow sequence diagram
  - Task creation flow diagram

- [ ] **API Reference**
  - ClickUpApiService method documentation
  - Rate limiting behavior
  - Caching strategy
  - Error handling patterns
  - Code examples

- [ ] **Extending the Integration**
  - How to add new ClickUp API endpoints
  - How to add bi-directional sync (future)
  - How to add webhook support (future)
  - How to customize task creation logic

- [ ] **Testing Guide**
  - How to run unit tests
  - How to run feature tests
  - How to manually test OAuth flow
  - ClickUp sandbox environment (if available)

### Admin Documentation

- [ ] **Monitoring & Troubleshooting**
  - How to monitor ClickUp API usage
  - How to identify rate limiting issues
  - How to regenerate failed tasks
  - How to audit OAuth token usage
  - Common error scenarios and solutions

- [ ] **Security Best Practices**
  - Token storage encryption
  - OAuth state validation
  - Rate limit monitoring
  - Access control patterns

---

## Appendix

### ClickUp API Resources
- Official API Documentation: https://developer.clickup.com/
- OAuth Guide: https://developer.clickup.com/docs/authentication
- Rate Limits: https://developer.clickup.com/docs/rate-limits
- Create Task: https://developer.clickup.com/reference/createtask

### GitHub Module Reference (Pattern to Follow)
- Location: `/Volumes/CaseSensitive/Sites/Deploy/portal/portal-v2/Modules/GitHub/`
- Study for OAuth implementation
- Study for API service patterns
- Study for background job structure

### Chrome Extension Reference
- Location: `/Volumes/CaseSensitive/Sites/Deploy/portal/portal-v2/chrome-extension/`
- Manifest: `manifest.json`
- Content Scripts: `content-scripts/github.js` (pattern to replicate)
- Background: `background/service-worker.js`

---

**End of PRD**