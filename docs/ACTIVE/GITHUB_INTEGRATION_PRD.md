# GitHub Integration - Product Requirements Document

**Document Version:** 1.0
**Last Updated:** 2025-01-13
**Status:** Planning
**Owner:** Development Team

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technical Analysis](#technical-analysis)
3. [Feature Specifications](#feature-specifications)
4. [Implementation Plan](#implementation-plan)
5. [Risk Assessment](#risk-assessment)
6. [Task List](#task-list)
7. [Appendices](#appendices)

---

## Executive Summary

### Problem Statement

Currently, the portal lacks integration with GitHub, which is a critical gap for development workflow visibility. Organizations using the portal cannot:

- Link GitHub repositories to customer projects for tracking
- Automatically sync GitHub issues to the internal ticketing system
- View repository activity and development metrics within the portal
- Track deployments tied to GitHub releases
- Provide customers with visibility into development progress

This creates manual overhead, reduces transparency, and prevents automation of common workflows like issue tracking and deployment notifications.

### Proposed Solution

Create a new **GitHub Module** following the portal's established integration patterns. The module will:

1. **Authenticate** via GitHub OAuth 2.0 (organization-level)
2. **Link** one GitHub repository per project (one-to-one relationship)
3. **Sync** repository metadata (name, description, stars, forks, language, last push)
4. **Display** repository information on project pages

**Scope:** This is a **Phase 1 MVP only** - basic repository linking and metadata display. No issue sync, no PR tracking, no webhooks. Future phases may add advanced features.

The integration will be multi-tenant, respecting the portal's organization-based architecture, and will support both GitHub.com and GitHub Enterprise Server.

### Key Benefits

**For Organizations:**
- **Centralized Visibility:** Project repositories linked in one place
- **Project Context:** See which GitHub repo is associated with each project
- **Quick Access:** Direct links to repositories from project pages

**For Managers:**
- **Project Oversight:** See which repos are linked to customer projects
- **Repository Information:** View basic metadata (stars, language, last activity)
- **Customer Context:** Understand which code belongs to which customer

**For Developers:**
- **Reduced Context Switching:** Quick access to GitHub repos from project pages
- **Project Association:** Clear visibility of which repo belongs to which project

**For Customers (Portal Users):**
- **Transparency:** See which repository is associated with their project (future enhancement)

### Success Metrics

- 60%+ of active organizations connect GitHub within 60 days
- 40%+ of projects have a linked GitHub repository
- Users can successfully link/unlink repositories without issues
- < 5 seconds average time to display repository information on project page

### Key Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| GitHub API rate limits | **Medium** | Implement caching (1-hour TTL), manual sync only, no polling |
| Token expiration issues | **Medium** | OAuth tokens don't expire, graceful handling if revoked |
| Performance impact | **Low** | Background jobs for sync, database indexing, caching |
| Scope creep | **Low** | Clear MVP definition: Phase 1 only, no issues/PRs/webhooks |

---

## Technical Analysis

### Current Architecture Assessment

**Strengths:**
- ✅ **Modular Design:** Using `nwidart/laravel-modules` enables clean separation
- ✅ **Multi-Tenancy:** Spatie multitenancy ensures organization isolation
- ✅ **Integration Patterns:** Xero and Harvest modules provide proven OAuth and sync patterns
- ✅ **Settings System:** Flexible organisation/customer settings infrastructure
- ✅ **Mapping System:** Generic `integration_mappings` table ready for GitHub mappings
- ✅ **Queue Infrastructure:** Laravel queues available for background sync jobs
- ✅ **Webhook System:** Generic webhook module can dispatch GitHub events

**Weaknesses:**
- ⚠️ **No Repository Model:** Need to create `Repository` or link to existing models
- ⚠️ **No GitHub-Specific Tables:** Need migrations for repos, issues, sync logs
- ⚠️ **Project Model Limited:** Currently minimal fields (name, notes, is_default)

**Opportunities:**
- 💡 **Reuse Patterns:** 90% of OAuth, sync, and service patterns exist in Xero module
- 💡 **Extend Projects:** Add repository metadata to projects naturally
- 💡 **Enhance Tickets:** Link GitHub issues to portal tickets
- 💡 **Deployment Module:** Already exists, can link to GitHub releases
- 💡 **Timesheet Integration:** Could link commits to time entries (future)

### Proposed Architecture

#### Module Structure

```
Modules/GitHub/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── GitHubOAuthController.php          # OAuth flow
│   │   │   ├── GitHubWebhookController.php        # Webhook receiver
│   │   │   ├── GitHubRepositoryController.php     # Repo CRUD
│   │   │   └── GitHubSettingsController.php       # Settings UI
│   │   ├── Middleware/
│   │   │   └── VerifyGitHubWebhook.php           # Webhook security
│   │   └── Requests/
│   │       ├── LinkRepositoryRequest.php
│   │       └── SyncRepositoryRequest.php
│   ├── Models/
│   │   ├── GitHubOAuthToken.php                  # OAuth tokens
│   │   ├── GitHubRepository.php                  # Linked repos
│   │   ├── GitHubIssue.php                       # Synced issues
│   │   ├── GitHubPullRequest.php                 # Synced PRs
│   │   └── GitHubSyncLog.php                     # Sync history
│   ├── Services/
│   │   ├── GitHubOAuthService.php                # OAuth flow logic
│   │   ├── GitHubTokenService.php                # Token management
│   │   ├── GitHubApiService.php                  # API client wrapper
│   │   ├── GitHubRepositorySyncService.php       # Repo data sync
│   │   ├── GitHubIssueSyncService.php            # Issue sync
│   │   └── GitHubWebhookHandler.php              # Process webhooks
│   ├── Jobs/
│   │   ├── SyncRepositoryMetadata.php            # Background sync
│   │   ├── SyncRepositoryIssues.php
│   │   └── ProcessGitHubWebhook.php              # Async webhook processing
│   ├── Events/
│   │   ├── RepositoryLinked.php
│   │   ├── RepositoryUnlinked.php
│   │   └── GitHubIssueSynced.php
│   ├── Exceptions/
│   │   ├── GitHubTokenException.php
│   │   └── GitHubApiException.php
│   └── Providers/
│       └── GitHubServiceProvider.php
├── config/
│   └── config.php                                 # Module settings schema
├── database/
│   └── migrations/
│       ├── 2025_01_13_100000_create_github_oauth_tokens_table.php
│       ├── 2025_01_13_100001_create_github_repositories_table.php
│       ├── 2025_01_13_100002_create_github_issues_table.php
│       ├── 2025_01_13_100003_create_github_pull_requests_table.php
│       ├── 2025_01_13_100004_create_github_sync_logs_table.php
│       └── 2025_01_13_100005_add_github_columns_to_projects_table.php
├── resources/
│   └── views/
│       └── settings.blade.php                     # Settings page (if needed)
├── routes/
│   ├── api.php                                    # API routes
│   └── web.php                                    # Web routes (OAuth, settings)
├── tests/
│   ├── Feature/
│   │   ├── GitHubOAuthTest.php
│   │   ├── GitHubWebhookTest.php
│   │   └── GitHubSyncTest.php
│   └── Unit/
│       ├── GitHubApiServiceTest.php
│       └── GitHubTokenServiceTest.php
├── module.json
├── composer.json
└── package.json
```

#### Database Schema

##### `github_oauth_tokens` Table
```sql
CREATE TABLE github_oauth_tokens (
    id UUID PRIMARY KEY,
    organisation_id UUID UNIQUE NOT NULL,
    access_token TEXT NOT NULL,              -- Encrypted
    refresh_token TEXT,                      -- Encrypted (if using OAuth app)
    token_type VARCHAR(50) DEFAULT 'bearer',
    scope TEXT,                              -- Granted scopes
    access_token_expires_at TIMESTAMP,       -- If applicable
    github_installation_id BIGINT,           -- For GitHub Apps
    github_account_login VARCHAR(255),       -- org/user that authenticated
    github_account_type VARCHAR(50),         -- 'User' or 'Organization'
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE
);

CREATE INDEX idx_github_tokens_org ON github_oauth_tokens(organisation_id);
```

##### `github_repositories` Table
```sql
CREATE TABLE github_repositories (
    id UUID PRIMARY KEY,
    organisation_id UUID NOT NULL,
    github_repo_id BIGINT UNIQUE NOT NULL,   -- GitHub's repository ID
    owner VARCHAR(255) NOT NULL,             -- github.com/OWNER/repo
    name VARCHAR(255) NOT NULL,              -- github.com/owner/NAME
    full_name VARCHAR(512) NOT NULL,         -- owner/name
    description TEXT,
    is_private BOOLEAN DEFAULT false,
    is_fork BOOLEAN DEFAULT false,
    default_branch VARCHAR(255) DEFAULT 'main',
    html_url TEXT,                           -- GitHub URL
    clone_url TEXT,                          -- Clone URL
    language VARCHAR(100),                   -- Primary language
    stars_count INT DEFAULT 0,
    forks_count INT DEFAULT 0,
    open_issues_count INT DEFAULT 0,
    watchers_count INT DEFAULT 0,
    size_kb INT DEFAULT 0,
    pushed_at TIMESTAMP,                     -- Last push to repo
    github_created_at TIMESTAMP,
    github_updated_at TIMESTAMP,
    last_synced_at TIMESTAMP,
    metadata JSON,                           -- Raw GitHub API response
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE,
    UNIQUE (organisation_id, full_name)
);

CREATE INDEX idx_github_repos_org ON github_repositories(organisation_id);
CREATE INDEX idx_github_repos_full_name ON github_repositories(full_name);
CREATE INDEX idx_github_repos_github_id ON github_repositories(github_repo_id);
```


##### `github_sync_logs` Table
```sql
CREATE TABLE github_sync_logs (
    id UUID PRIMARY KEY,
    organisation_id UUID NOT NULL,
    repository_id UUID,                      -- Nullable for org-level syncs
    sync_type VARCHAR(100) NOT NULL,         -- fetch_repos, sync_metadata
    status VARCHAR(50) NOT NULL,             -- pending, success, failed
    message TEXT,
    error_details JSON,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE,
    FOREIGN KEY (repository_id) REFERENCES github_repositories(id) ON DELETE CASCADE
);

CREATE INDEX idx_github_sync_logs_org ON github_sync_logs(organisation_id);
CREATE INDEX idx_github_sync_logs_repo ON github_sync_logs(repository_id);
CREATE INDEX idx_github_sync_logs_type ON github_sync_logs(sync_type);
CREATE INDEX idx_github_sync_logs_status ON github_sync_logs(status);
CREATE INDEX idx_github_sync_logs_started ON github_sync_logs(started_at DESC);
```

##### Add to `projects` Table
```sql
ALTER TABLE projects ADD COLUMN github_repository_id UUID UNIQUE REFERENCES github_repositories(id) ON DELETE SET NULL;

CREATE INDEX idx_projects_github_repo ON projects(github_repository_id);

-- Note: UNIQUE constraint ensures one-to-one relationship (project can only have one repo)
```

#### Dependencies

**New Composer Packages:**
```json
{
    "require": {
        "knplabs/github-api": "^3.13",
        "php-http/guzzle7-adapter": "^1.0"
    }
}
```

**Existing Packages (Already Installed):**
- `league/oauth2-client` - OAuth 2.0 client (used by Xero)
- `laravel/sanctum` - API authentication
- `spatie/laravel-webhook-client` - Webhook handling (optional)

**Infrastructure:**
- Redis (for caching and queues) - ✅ Already available
- Laravel Horizon (for queue monitoring) - ✅ Already installed
- PostgreSQL - ✅ Already in use

#### Integration Points

**1. Project Model**
- Add `github_repository_id` field (UUID, unique, nullable)
- Add `githubRepository()` belongsTo relationship
- Migration adds column to existing `projects` table

**2. Customer Model**
- No changes needed
- Projects already belong to Customer
- Customer can have many Projects, each with optional GitHub repo

### Performance Considerations

**Rate Limiting:**
- **GitHub.com:** 5,000 requests/hour for authenticated users
- **GitHub Enterprise:** Custom limits, typically higher
- **Strategy:** Caching (1-hour TTL for metadata), manual sync only, no automatic polling

**Caching Strategy:**
```php
// Repository metadata: 1 hour
Cache::remember("github.repo.{$repoId}.metadata", 3600, fn() => $api->getRepository());

// Repository list: 15 minutes
Cache::remember("github.org.{$orgId}.repos", 900, fn() => $api->listRepositories());

// Access tokens: No expiration (GitHub OAuth tokens don't expire unless revoked)
```

**Background Jobs:**
- Manual sync runs asynchronously via Laravel queues
- Retry logic: 3 attempts with exponential backoff
- Timeout: 60 seconds per sync job

**Database Optimization:**
- Indexes on frequently queried columns (`organisation_id`, `full_name`)
- UNIQUE constraint on `projects.github_repository_id` (enforces one-to-one)
- Pagination for repository lists (50 per page)

---

## Feature Specifications

### Phase 1: Core Integration (MVP ONLY)

**Target Release:** Sprint 1-2 (2 weeks)
**Scope:** Basic repository linking and metadata display only. No issues, PRs, or webhooks.

#### F1.1: OAuth Authentication

**User Story:**
*As an organization admin, I want to connect my GitHub account so that I can link repositories to projects.*

**Acceptance Criteria:**
- [ ] Admin can navigate to Settings > Integrations > GitHub
- [ ] "Connect GitHub" button initiates OAuth flow
- [ ] Redirects to GitHub authorization page
- [ ] Requests scopes: `repo`, `read:org`, `read:user`, `admin:repo_hook`
- [ ] Callback handler stores access token (encrypted)
- [ ] Success message displayed: "GitHub connected successfully"
- [ ] Status indicator shows "Connected" with GitHub account name
- [ ] "Disconnect" button removes token and all linked repos (with confirmation)
- [ ] Error handling for declined authorization
- [ ] Support for both OAuth Apps and GitHub Apps

**Technical Details:**
- Controller: `GitHubOAuthController`
- Routes: `/github/oauth/connect`, `/github/oauth/callback`, `/github/oauth/disconnect`
- Service: `GitHubOAuthService` using `league/oauth2-client`
- Token Storage: `github_oauth_tokens` table with encryption

#### F1.2: List Available Repositories

**User Story:**
*As a user, after connecting GitHub, I want to see a list of repositories I can link to projects.*

**Acceptance Criteria:**
- [ ] Page shows all accessible repositories from connected GitHub account
- [ ] Display: repo name, owner, description, visibility (public/private), language
- [ ] Filter by: organization, visibility, language
- [ ] Search by repository name
- [ ] Pagination (50 repos per page)
- [ ] Loading state while fetching from GitHub API
- [ ] Cache repository list for 15 minutes
- [ ] "Refresh" button to force re-fetch
- [ ] Shows link status: "Not Linked", "Linked to: Project Name"

**Technical Details:**
- Controller: `GitHubRepositoryController@index`
- Service: `GitHubApiService->listRepositories()`
- API: `GET /user/repos?per_page=100` (paginated)
- Caching: 15-minute TTL in Redis

#### F1.3: Link Repository to Project

**User Story:**
*As a user, I want to link a GitHub repository to a customer project so we can track development.*

**Acceptance Criteria:**
- [ ] From repository list, click "Link to Project" button
- [ ] Modal/dropdown shows: Customer > Project selection
- [ ] Validation: Repository can only be linked to one project at a time
- [ ] Validation: Projects from current organization only
- [ ] On link, repository metadata is saved to database
- [ ] Success toast: "Repository linked to {Project Name}"
- [ ] Repository appears on project detail page
- [ ] Initial sync triggered automatically (background job)
- [ ] Audit log entry created

**Technical Details:**
- Controller: `GitHubRepositoryController@link`
- Request: `LinkRepositoryRequest` (validates project_id, repo_id)
- Job: `SyncRepositoryMetadata` dispatched after linking
- Database: Insert into `github_repositories` table

#### F1.4: Unlink Repository from Project

**User Story:**
*As a user, I want to unlink a repository if it's no longer relevant to the project.*

**Acceptance Criteria:**
- [ ] "Unlink" button on project detail page (next to repo)
- [ ] Confirmation modal: "Are you sure? Synced data will be removed."
- [ ] Option: "Keep historical data" vs "Delete all GitHub data"
- [ ] On confirm, repository_id set to null or record soft-deleted
- [ ] Related issues/PRs remain but marked as orphaned (optional)
- [ ] Success message: "Repository unlinked"
- [ ] Webhook subscriptions removed (if applicable)

**Technical Details:**
- Controller: `GitHubRepositoryController@unlink`
- Soft delete: `github_repositories.deleted_at`
- Cascading: Keep issues/PRs with `repository_id` reference

#### F1.5: Display Repository Information on Project Page

**User Story:**
*As a user viewing a project, I want to see linked GitHub repositories and their basic information.*

**Acceptance Criteria:**
- [ ] Project page has "GitHub Repositories" section
- [ ] Each repository shows:
  - Name with clickable link to GitHub
  - Description
  - Primary language
  - Stars, forks, open issues count
  - Last push timestamp
  - Default branch
- [ ] "View on GitHub" button (opens in new tab)
- [ ] "Sync Now" button to trigger manual sync
- [ ] Last synced timestamp displayed
- [ ] Loading state during sync
- [ ] Error state if sync fails (with retry button)
- [ ] Empty state: "No repositories linked. Click to add one."

**Technical Details:**
- Component: `ProjectRepositories.tsx` (React)
- API: `GET /api/projects/{project}/github-repositories`
- Data includes: `github_repositories` with metadata
- Real-time updates via Laravel Echo (optional)

#### F1.6: Repository Metadata Sync

**User Story:**
*As the system, I want to keep repository metadata up-to-date automatically.*

**Acceptance Criteria:**
- [ ] Background job syncs all linked repositories every 6 hours
- [ ] Updates: stars, forks, issues count, last push date, description
- [ ] Webhook-triggered sync on push events (instant update)
- [ ] Manual sync available via "Sync Now" button
- [ ] Sync logs created for each operation
- [ ] Failed syncs retry with exponential backoff
- [ ] Email notification if repo becomes inaccessible (permission revoked)

**Technical Details:**
- Job: `SyncRepositoryMetadata` (queued)
- Schedule: `$schedule->job(SyncAllRepositories::class)->everySixHours()`
- Service: `GitHubRepositorySyncService->syncMetadata($repository)`
- Logging: Insert into `github_sync_logs`

**Note:** Phase 2 (Issue/PR Sync) and Phase 3 (Advanced Features) are out of scope for this release. Future enhancements may include issue tracking, webhooks, commit history, and customer portal visibility.

---

## Implementation Plan

### Phase 1: Core Integration (Weeks 1-2)

**Sprint 1 Goals:**
- OAuth authentication working
- Repository listing and linking functional
- Basic project page integration
- Automated metadata sync

**Milestones:**
- **M1.1:** Module scaffolding complete (Day 1-2)
- **M1.2:** OAuth flow functional (Day 3-5)
- **M1.3:** Repository CRUD complete (Day 6-8)
- **M1.4:** Project page integration (Day 9-10)

**Deliverables:**
- GitHub module created
- Migrations run successfully
- Settings page functional
- Tests passing (80% coverage minimum)

### Resource Requirements

**Development:**
- 1 Full-Stack Developer (React + Laravel) - 2 weeks

**Design:**
- UI/UX Designer - 2 days (component design for repo display)

**QA:**
- QA Engineer - 3 days (manual + automated testing)

**Total Estimated Effort:**
- Phase 1 (MVP): 80 hours (2 weeks)

---

## Risk Assessment

### Technical Risks

#### R1: GitHub API Rate Limits

**Probability:** Medium
**Impact:** Medium
**Description:** GitHub API has rate limits (5,000 req/hour). Excessive API calls could exhaust quota.

**Mitigation:**
- Implement caching (Redis, 1-hour TTL for metadata, 15-min for repo lists)
- Manual sync only (no automatic polling)
- Queue jobs for sync operations
- Monitor API usage via `/rate_limit` endpoint
- Exponential backoff on rate limit errors

**Monitoring:**
- Track API usage in `github_sync_logs`
- Alert if usage > 80% of limit

---

#### R2: OAuth Token Revocation

**Probability:** Low
**Impact:** Medium
**Description:** GitHub OAuth tokens could be revoked by user, breaking integration.

**Mitigation:**
- Graceful error handling (show "Reconnect GitHub" message)
- Log failed API calls due to auth errors
- Automatic reconnection prompts in UI

**Monitoring:**
- Track failed API calls due to 401 errors
- Admin email notification when token revoked

---

#### R3: Performance Impact on Portal

**Probability:** Low
**Impact:** Low
**Description:** Manual sync operations could briefly impact performance.

**Mitigation:**
- All syncs run in background queues (async)
- Database indexing on frequently queried columns
- Pagination for repository lists (50 per page)
- Timeout: 60 seconds per sync job

**Monitoring:**
- Queue depth metrics (Horizon dashboard)
- Job failure rates
- Average sync duration tracking

---

### Project Risks

#### R6: Scope Creep

**Probability:** Medium
**Impact:** Medium
**Description:** Feature requests could expand beyond MVP, delaying launch.

**Mitigation:**
- Strict adherence to phased roadmap
- Feature flags for experimental features
- Monthly stakeholder review of priorities
- Clear MVP definition (Phase 1 only)
- Backlog grooming for future phases

---

#### R7: Third-Party API Changes

**Probability:** Low
**Impact:** High
**Description:** GitHub could deprecate API endpoints or change OAuth flow.

**Mitigation:**
- Use stable, versioned GitHub API (REST API v3 or GraphQL v4)
- Subscribe to GitHub changelog notifications
- Automated tests for API contract validation
- Abstraction layer (GitHubApiService) to isolate API calls
- Fallback to older endpoints if available

---

#### R8: User Adoption

**Probability:** Low
**Impact:** Medium
**Description:** Users might not use the integration if UX is complex.

**Mitigation:**
- Simple onboarding flow (3 steps: Connect, Link, Done)
- In-app tutorial/guide
- Default settings optimized for common use cases
- Progressive disclosure (advanced features hidden initially)
- User feedback loop (surveys, analytics)

---

## Task List

### Module Setup & Infrastructure

#### Task #1: Create GitHub Module Scaffold
**Priority:** Critical
**Estimated Effort:** XS (2 hours)
**Dependencies:** None
**Acceptance Criteria:**
- [ ] Run `php artisan module:make GitHub`
- [ ] Module appears in `modules_statuses.json` as enabled
- [ ] Directory structure created per architecture diagram
- [ ] `module.json` configured with proper metadata
- [ ] Service provider auto-registered
- [ ] Module loads without errors on `php artisan module:list`

**GitHub Issue:** [To be created]

---

#### Task #2: Create Database Migrations
**Priority:** Critical
**Estimated Effort:** S (3 hours)
**Dependencies:** Task #1
**Acceptance Criteria:**
- [ ] Migration: `create_github_oauth_tokens_table`
- [ ] Migration: `create_github_repositories_table`
- [ ] Migration: `create_github_sync_logs_table`
- [ ] Migration: `add_github_repository_id_to_projects_table`
- [ ] All foreign keys defined with ON DELETE CASCADE/SET NULL
- [ ] UNIQUE constraint on `projects.github_repository_id`
- [ ] Indexes created per schema design
- [ ] Migrations run successfully: `php artisan migrate`
- [ ] Rollback tested: `php artisan migrate:rollback --step=4`

**GitHub Issue:** [To be created]

---

#### Task #3: Create Eloquent Models
**Priority:** Critical
**Estimated Effort:** S (2 hours)
**Dependencies:** Task #2
**Acceptance Criteria:**
- [ ] Model: `GitHubOAuthToken` with encryption for tokens
- [ ] Model: `GitHubRepository` (no project relationship - reverse lookup only)
- [ ] Model: `GitHubSyncLog` with helper methods (markAsSuccess, markAsFailed)
- [ ] All models use `BelongsToTenant` trait
- [ ] All models use `HasUuids` trait
- [ ] Casts defined for JSON columns
- [ ] Accessors/Mutators for encrypted fields
- [ ] Update Project model: Add `githubRepository()` belongsTo relationship

**GitHub Issue:** [To be created]

---

#### Task #4: Configure Module Settings Schema
**Priority:** High
**Estimated Effort:** XS (1 hour)
**Dependencies:** Task #1
**Acceptance Criteria:**
- [ ] File created: `Modules/GitHub/config/config.php`
- [ ] Organisation settings defined:
  - `status` (yes_no)
  - `GITHUB_CLIENT_ID` (text, required)
  - `GITHUB_CLIENT_SECRET` (encrypted, required)
  - `GITHUB_API_URL` (text, default: https://api.github.com)
- [ ] Settings appear in Settings UI automatically
- [ ] Validation rules specified
- [ ] Help text and descriptions included

**GitHub Issue:** [To be created]

---

#### Task #5: Install GitHub API Client Package
**Priority:** High
**Estimated Effort:** XS (1 hour)
**Dependencies:** Task #1
**Acceptance Criteria:**
- [ ] Run `composer require knplabs/github-api php-http/guzzle7-adapter`
- [ ] `composer.json` updated
- [ ] Packages installed successfully
- [ ] Test API client instantiation in tinker
- [ ] Documentation link added to README

**GitHub Issue:** [To be created]

---

### OAuth Authentication (Phase 1)

#### Task #6: Implement GitHubOAuthService
**Priority:** Critical
**Estimated Effort:** M (6 hours)
**Dependencies:** Task #3, Task #5
**Acceptance Criteria:**
- [ ] Service created: `GitHubOAuthService`
- [ ] Method: `getAuthorizationUrl()` - Returns GitHub OAuth URL
- [ ] Method: `handleCallback($code, $state)` - Exchanges code for token
- [ ] Method: `storeToken($organisation, $accessToken, $metadata)` - Saves to DB
- [ ] Method: `revokeToken($organisation)` - Deletes token
- [ ] Uses `league/oauth2-client` GenericProvider
- [ ] Scopes requested: `repo`, `read:org`, `read:user`
- [ ] CSRF protection via state parameter
- [ ] Encrypted token storage
- [ ] Error handling for failed OAuth flow

**GitHub Issue:** [To be created]

---

#### Task #7: Create OAuth Controller & Routes
**Priority:** Critical
**Estimated Effort:** M (5 hours)
**Dependencies:** Task #6
**Acceptance Criteria:**
- [ ] Controller created: `GitHubOAuthController`
- [ ] Route: `GET /github/oauth/connect` - Initiates OAuth
- [ ] Route: `GET /github/oauth/callback` - Handles callback
- [ ] Route: `DELETE /github/oauth/disconnect` - Revokes token
- [ ] Middleware: `auth`, `verified`, `organisation`
- [ ] Session state validation (CSRF)
- [ ] Success/error flash messages
- [ ] Redirect to settings page after connect/disconnect
- [ ] Audit logging for connect/disconnect events

**GitHub Issue:** [To be created]

---

#### Task #8: Create Settings UI Component
**Priority:** High
**Estimated Effort:** M (6 hours)
**Dependencies:** Task #7
**Acceptance Criteria:**
- [ ] React component: `GitHubSettings.tsx`
- [ ] Shows connection status: "Not Connected" / "Connected as {account}"
- [ ] "Connect GitHub" button (if not connected)
- [ ] "Disconnect" button with confirmation modal (if connected)
- [ ] Displays connected account avatar and username
- [ ] Shows token expiration date (if applicable)
- [ ] Loading states during connection process
- [ ] Error messages for failed connection
- [ ] Success toast after successful connection
- [ ] Integrated into main Settings > Integrations page

**GitHub Issue:** [To be created]

---

#### Task #9: Implement GitHubTokenService
**Priority:** Critical
**Estimated Effort:** M (5 hours)
**Dependencies:** Task #3, Task #6
**Acceptance Criteria:**
- [ ] Service created: `GitHubTokenService`
- [ ] Method: `getAccessToken($organisation)` - Returns valid token
- [ ] Method: `isTokenValid($organisation)` - Checks expiration
- [ ] Method: `refreshTokenIfNeeded($organisation)` - Auto-refresh logic
- [ ] Token caching in Redis (55-minute TTL)
- [ ] Cache key pattern: `github.token.{org_id}`
- [ ] Throws `GitHubTokenException` if no token found
- [ ] Logs all token refresh attempts
- [ ] Handles token revocation gracefully

**GitHub Issue:** [To be created]

---

### Repository Management (Phase 1)

#### Task #10: Implement GitHubApiService
**Priority:** Critical
**Estimated Effort:** L (8 hours)
**Dependencies:** Task #9
**Acceptance Criteria:**
- [ ] Service created: `GitHubApiService`
- [ ] Uses `knplabs/github-api` library
- [ ] Method: `listRepositories($organisation)` - Fetches all accessible repos
- [ ] Method: `getRepository($organisation, $owner, $repo)` - Fetches single repo
- [ ] Method: `getIssues($organisation, $repoId)` - Fetches issues
- [ ] Method: `getPullRequests($organisation, $repoId)` - Fetches PRs
- [ ] Method: `createWebhook($organisation, $repoId, $events)` - Creates webhook
- [ ] Method: `deleteWebhook($organisation, $repoId, $hookId)` - Deletes webhook
- [ ] Rate limit tracking via cache (current usage / limit)
- [ ] Automatic token injection via `GitHubTokenService`
- [ ] Retry logic with exponential backoff (3 attempts)
- [ ] Throws `GitHubApiException` with context on errors
- [ ] All API calls logged to `github_sync_logs`

**GitHub Issue:** [To be created]

---

#### Task #11: Create Repository CRUD Controller
**Priority:** High
**Estimated Effort:** M (6 hours)
**Dependencies:** Task #10
**Acceptance Criteria:**
- [ ] Controller created: `GitHubRepositoryController`
- [ ] Route: `GET /api/github/repositories` - List available repos
- [ ] Route: `POST /api/github/repositories/{repoId}/link` - Link to project
- [ ] Route: `DELETE /api/github/repositories/{repoId}/unlink` - Unlink
- [ ] Route: `POST /api/github/repositories/{repoId}/sync` - Manual sync
- [ ] Route: `GET /api/projects/{project}/github-repositories` - Get linked repos
- [ ] Validation: Project must belong to current organisation
- [ ] Validation: Repository can only be linked to one project
- [ ] Dispatches `SyncRepositoryMetadata` job after linking
- [ ] Returns JSON responses for all endpoints
- [ ] Error handling with proper HTTP status codes

**GitHub Issue:** [To be created]

---

#### Task #12: Implement Repository Sync Service
**Priority:** Critical
**Estimated Effort:** L (8 hours)
**Dependencies:** Task #10
**Acceptance Criteria:**
- [ ] Service created: `GitHubRepositorySyncService`
- [ ] Method: `syncMetadata($repository)` - Updates repo metadata
- [ ] Method: `syncAllRepositories($organisation)` - Bulk sync
- [ ] Fetches: name, description, language, stars, forks, issues count
- [ ] Fetches: default branch, last push date, visibility
- [ ] Updates `github_repositories` table
- [ ] Creates `github_sync_logs` entry
- [ ] Handles deleted/inaccessible repositories (soft delete)
- [ ] Catches API errors and logs failures
- [ ] Transaction safety (rollback on error)

**GitHub Issue:** [To be created]

---

#### Task #13: Create Repository Sync Job
**Priority:** High
**Estimated Effort:** S (3 hours)
**Dependencies:** Task #12
**Acceptance Criteria:**
- [ ] Job created: `SyncRepositoryMetadata`
- [ ] Accepts `GitHubRepository` model in constructor
- [ ] Calls `GitHubRepositorySyncService->syncMetadata()`
- [ ] Implements `ShouldQueue` interface
- [ ] Queue: `github` (dedicated queue)
- [ ] Retry: 3 attempts with exponential backoff
- [ ] Timeout: 60 seconds
- [ ] Failed job logged to database
- [ ] Can be dispatched manually or via scheduler

**GitHub Issue:** [To be created]

---

#### Task #14: Schedule Automatic Repository Sync
**Priority:** Medium
**Estimated Effort:** XS (1 hour)
**Dependencies:** Task #13
**Acceptance Criteria:**
- [ ] Job created: `SyncAllRepositories`
- [ ] Scheduled in `App\Console\Kernel`:
  ```php
  $schedule->job(new SyncAllRepositories)->everySixHours();
  ```
- [ ] Dispatches `SyncRepositoryMetadata` for each linked repo
- [ ] Only syncs repositories with `sync_enabled = true`
- [ ] Logs start/completion times
- [ ] Sends email if >50% of syncs fail

**GitHub Issue:** [To be created]

---

#### Task #15: Create Repository List UI Component
**Priority:** High
**Estimated Effort:** M (6 hours)
**Dependencies:** Task #11
**Acceptance Criteria:**
- [ ] React component: `RepositoryList.tsx`
- [ ] Fetches data from `GET /api/github/repositories`
- [ ] Displays table with columns: Name, Owner, Description, Language, Status
- [ ] Search input filters by repository name
- [ ] Filter dropdowns: Visibility (all/public/private), Language
- [ ] Pagination: 50 repos per page
- [ ] "Link to Project" button for unlinked repos
- [ ] "Linked to {Project}" badge for linked repos
- [ ] "Refresh" button to refetch from GitHub API
- [ ] Loading skeleton during fetch
- [ ] Empty state: "No repositories found"
- [ ] Error state with retry button

**GitHub Issue:** [To be created]

---

#### Task #16: Create Link Repository Modal
**Priority:** High
**Estimated Effort:** M (4 hours)
**Dependencies:** Task #11, Task #15
**Acceptance Criteria:**
- [ ] React component: `LinkRepositoryModal.tsx`
- [ ] Triggered by "Link to Project" button
- [ ] Dropdown: Select Customer (if multi-customer org)
- [ ] Dropdown: Select Project (filtered by customer)
- [ ] "Link" button submits to `POST /api/github/repositories/{id}/link`
- [ ] Loading state during submission
- [ ] Success toast: "Repository linked to {Project}"
- [ ] Error toast for validation failures
- [ ] Closes modal on success
- [ ] Refreshes repository list after link

**GitHub Issue:** [To be created]

---

#### Task #17: Integrate Repository Display on Project Page
**Priority:** High
**Estimated Effort:** M (5 hours)
**Dependencies:** Task #11
**Acceptance Criteria:**
- [ ] React component: `ProjectGitHubRepositories.tsx`
- [ ] Fetches from `GET /api/projects/{project}/github-repositories`
- [ ] Displays linked repositories with:
  - Repository name (clickable to GitHub)
  - Description
  - Language badge
  - Stars, forks, issues count
  - Last push timestamp
  - "Sync Now" button
  - "Unlink" button
- [ ] "Add Repository" button opens repository selection
- [ ] Real-time sync status indicator (syncing/success/error)
- [ ] Empty state: "No repositories linked. Click to add one."
- [ ] Refresh automatically after sync
- [ ] Optimistic UI updates

**GitHub Issue:** [To be created]

---

### Testing & Documentation (All Phases)

#### Task #18: Write Unit Tests
**Priority:** High
**Estimated Effort:** M (6 hours)
**Dependencies:** Tasks #6-17
**Acceptance Criteria:**
- [ ] Test: `GitHubOAuthServiceTest` - OAuth flow
- [ ] Test: `GitHubTokenServiceTest` - Token management (if created)
- [ ] Test: `GitHubApiServiceTest` - API calls (mocked)
- [ ] Test: `GitHubRepositorySyncServiceTest` - Sync logic
- [ ] Coverage: Minimum 80% for all services
- [ ] Uses factories for models
- [ ] Tests run in isolated database

**GitHub Issue:** [To be created]

---

#### Task #19: Write Feature Tests
**Priority:** High
**Estimated Effort:** M (4 hours)
**Dependencies:** Tasks #6-17
**Acceptance Criteria:**
- [ ] Test: OAuth connection flow (end-to-end)
- [ ] Test: Repository linking to project
- [ ] Test: Repository unlinking from project
- [ ] Test: Manual repository sync
- [ ] Uses `RefreshDatabase` trait
- [ ] Tests verify database state changes
- [ ] Tests verify one-to-one constraint (project can only have one repo)

**GitHub Issue:** [To be created]

---

#### Task #20: Create Documentation
**Priority:** Medium
**Estimated Effort:** S (3 hours)
**Dependencies:** Tasks #6-17
**Acceptance Criteria:**
- [ ] Document: How to create GitHub OAuth App
- [ ] Document: How to connect GitHub to portal
- [ ] Document: How to link repositories to projects
- [ ] Document: Troubleshooting common issues
- [ ] Document: API rate limit management
- [ ] Screenshots of UI flows
- [ ] Stored in `docs/integrations/github.md`

**GitHub Issue:** [To be created]

---

## Appendices

### Appendix A: GitHub API Scopes

**Required OAuth Scopes:**

| Scope | Purpose | Required? |
|-------|---------|-----------|
| `repo` | Access private repositories | **Yes** |
| `read:org` | Read organization membership | **Yes** |
| `read:user` | Read user profile | **Yes** |

**Note:** `admin:repo_hook` (webhooks) not needed for Phase 1 MVP.

### Appendix B: Database Indexes Strategy

**High-Traffic Queries:**

```sql
-- Find repository for a project
SELECT * FROM projects WHERE github_repository_id = ?;
INDEX: idx_projects_github_repo

-- Find projects with GitHub repos in an organization
SELECT p.*, gr.* FROM projects p
JOIN github_repositories gr ON p.github_repository_id = gr.id
WHERE gr.organisation_id = ?;
INDEX: idx_github_repos_org

-- Recent sync logs
SELECT * FROM github_sync_logs WHERE organisation_id = ? ORDER BY started_at DESC LIMIT 50;
INDEX: idx_github_sync_logs_started
```

### Appendix C: Error Handling Reference

**Exception Hierarchy:**

```
GitHubException (Base)
├── GitHubTokenException
│   ├── NoTokenFound
│   ├── TokenExpired
│   └── TokenRevoked
└── GitHubApiException
    ├── RateLimitExceeded
    ├── RepositoryNotFound
    ├── InsufficientPermissions
    └── ApiUnavailable
```

**Error Response Format:**

```json
{
  "success": false,
  "error": {
    "type": "GitHubApiException",
    "message": "GitHub API rate limit exceeded",
    "code": "RATE_LIMIT_EXCEEDED",
    "context": {
      "limit": 5000,
      "remaining": 0,
      "reset_at": "2025-01-13T14:00:00Z"
    }
  }
}
```

### Appendix D: Performance Benchmarks

**Target Metrics:**

| Operation | Target | Measurement |
|-----------|--------|-------------|
| OAuth callback | < 500ms | 95th percentile |
| List repositories (cached) | < 100ms | 95th percentile |
| List repositories (API call) | < 2s | 95th percentile |
| Link repository | < 300ms | 95th percentile |
| Unlink repository | < 200ms | 95th percentile |
| Sync single repo metadata | < 5s | Average |
| Display project with GitHub repo | < 200ms | 95th percentile |

### Appendix E: Migration Rollback Strategy

**Rollback Plan:**

1. **Data Preservation:**
   - Migrations use soft deletes
   - Never drop columns with data
   - Backups before each deployment

2. **Rollback Steps:**
   ```bash
   # Disable module
   php artisan module:disable GitHub

   # Rollback migrations
   php artisan migrate:rollback --step=4

   # Clear cache
   php artisan cache:clear
   ```

3. **Data Export:**
   - Before rollback, export all GitHub data to CSV
   - Store in `storage/backups/github_{date}.sql`

### Appendix F: Monitoring Dashboard Metrics

**Recommended Metrics:**

- Total repositories linked (by org, by customer)
- Projects with GitHub repositories (%)
- Organizations with GitHub connected (%)
- API rate limit usage (current %, trend)
- Manual sync success rate
- Average sync duration
- Failed sync attempts (with causes)
- OAuth connection/disconnection events

---

**Document End**

---

## Next Steps

1. **Review & Approval:**
   - Share PRD with stakeholders
   - Gather feedback and iterate
   - Get sign-off from product owner

2. **Create GitHub Issues:**
   - Convert each task to a GitHub issue
   - Add labels: `module:github`, `priority:high/medium/low`, `phase:1/2/3`
   - Assign to developers
   - Link to this PRD

3. **Sprint Planning:**
   - Schedule Phase 1 for next sprint
   - Estimate story points for each task
   - Identify blockers and dependencies

4. **Begin Development:**
   - Start with Task #1 (Module Scaffold)
   - Follow task order to respect dependencies
   - Daily standups to track progress
   - Weekly demo of completed features

---

**PRD Prepared By:** AI Planning Assistant
**Date:** 2025-01-13
**Version:** 1.0 - Initial Draft
