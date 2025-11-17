# CSP Management Module - Product Requirements Document

**Module Name:** CspManagement
**Version:** 1.0
**Created:** 2025-11-13
**Status:** Planning
**Owner:** Development Team

---

## Executive Summary

### Problem Statement

Customers need visibility into Content Security Policy (CSP) violations occurring on their websites. Currently, CSP violations are logged by an external service (`csp.deploy.co.uk`), but there's no customer-facing interface to:
- View and understand CSP violations
- Make informed decisions about which violations to approve or deny
- Maintain an audit trail of security decisions
- Track recurring violations over time

The existing UI mockup (`/Modules/CspManagement/csp.png`) shows a basic interface that needs significant improvement to match the portal's modern design standards.

### Proposed Solution

Build a **customer-facing** CSP Management module that:
1. Fetches violation data from external CSP reporting service
2. Presents violations in a clear, actionable interface using ShadCN components
3. Allows customers to approve, reject, or ignore violations with reasoning
4. Maintains comprehensive audit trail of all decisions
5. Deduplicates violations and tracks occurrence frequency
6. (Phase 2) Generates Magento 2 CSP configuration files and creates PRs via GitHub API

### Key Benefits

- **Customer Empowerment:** Self-service security policy management
- **Security Compliance:** Clear audit trail for compliance requirements
- **Reduced Support Load:** Customers can handle CSP decisions without support tickets
- **Automated Workflows:** (Phase 2) Automatic PR creation for approved CSP changes
- **Better UX:** Modern, intuitive interface aligned with portal design system

### Key Risks

- **External API Dependency:** Service at `csp.deploy.co.uk` must be reliable
- **Data Volume:** High-traffic sites may generate thousands of violations
- **GitHub API Complexity:** (Phase 2) PR creation requires careful permission management
- **Customer Education:** CSP concepts may be unfamiliar to non-technical users

---

## Technical Analysis

### Current Architecture Assessment

**Existing Module State:**
- Module scaffold exists at `/Modules/CspManagement/`
- Registered in `modules_statuses.json` as active
- Has basic controller/service provider structure
- **Missing:** Database schema, models, services, frontend UI, customer routes

**External Dependencies:**
- CSP Reporting Service: `https://csp.deploy.co.uk/`
- Authentication: Customer must have `last_customer_id` set
- Authorization: Violations scoped to `customer_id`

### Proposed Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Customer Browser                          │
│  (React/Inertia Frontend - ShadCN Components)               │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ HTTP (Inertia.js)
                 │
┌────────────────▼────────────────────────────────────────────┐
│              Laravel Backend                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   CustomerCspViolationController                      │  │
│  │   - index() : List violations                         │  │
│  │   - show() : View details                             │  │
│  │   - approve/reject/ignore() : Make decisions          │  │
│  └────────────┬─────────────────────────────────────────┘  │
│               │                                              │
│  ┌────────────▼─────────────────────────────────────────┐  │
│  │   CspReportingService                                 │  │
│  │   - fetchViolations() : Get from external API         │  │
│  │   - deduplicateViolations() : Merge similar reports   │  │
│  └────────────┬─────────────────────────────────────────┘  │
│               │                                              │
│  ┌────────────▼─────────────────────────────────────────┐  │
│  │   Database (MySQL/PostgreSQL)                         │  │
│  │   - csp_violations                                    │  │
│  │   - csp_violation_decisions (audit trail)             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                 │
                 │ HTTP GET (with auth token)
                 │
┌────────────────▼────────────────────────────────────────────┐
│         External CSP Reporting Service                       │
│         https://csp.deploy.co.uk/                            │
│         GET /policies/{customer_id}?token={token}            │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

#### Table: `csp_violations`

**Purpose:** Store unique CSP violations with aggregation counters

```sql
CREATE TABLE csp_violations (
    id UUID PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    website_id UUID NULL REFERENCES websites(id) ON DELETE CASCADE,

    -- Violation identification
    directive VARCHAR(255) NOT NULL,           -- e.g., 'connect-src', 'script-src'
    blocked_uri TEXT NOT NULL,                 -- The URI that was blocked
    document_uri TEXT NOT NULL,                -- Page where violation occurred
    violated_directive VARCHAR(255) NOT NULL,  -- Full CSP directive violated
    effective_directive VARCHAR(255) NULL,
    source_file TEXT NULL,
    line_number INT NULL,
    column_number INT NULL,
    disposition VARCHAR(50) DEFAULT 'enforce', -- 'enforce' or 'report'

    -- Decision tracking
    status ENUM('new', 'approved', 'rejected', 'ignored') DEFAULT 'new',
    decided_by UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    decided_at TIMESTAMP NULL,
    decision_notes TEXT NULL,

    -- Aggregation
    occurrence_count INT DEFAULT 1,
    first_seen_at TIMESTAMP NOT NULL,
    last_seen_at TIMESTAMP NOT NULL,

    -- Raw data
    raw_report JSON NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_customer_status (customer_id, status),
    INDEX idx_last_seen (last_seen_at),
    INDEX idx_dedup (customer_id, directive, blocked_uri(100), document_uri(100))
);
```

#### Table: `csp_violation_decisions`

**Purpose:** Immutable audit trail of all decisions

```sql
CREATE TABLE csp_violation_decisions (
    id UUID PRIMARY KEY,
    csp_violation_id UUID NOT NULL REFERENCES csp_violations(id) ON DELETE CASCADE,

    -- Action details
    action ENUM('approved', 'rejected', 'ignored', 'reopened') NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,

    -- Audit trail
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    notes TEXT NULL,
    meta_data JSON NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_violation (csp_violation_id),
    INDEX idx_user (user_id),
    INDEX idx_created (created_at)
);
```

### API Integration

**External CSP Service:**

```php
// Fetch violations for a customer
$response = Http::connectTimeout(3)
    ->timeout(3)
    ->get("https://csp.deploy.co.uk/policies/{$customer->id}", [
        'token' => config('csp.service_token')
    ]);

$violations = json_decode($response->body(), true);
```

**Expected Response Format:**
```json
{
  "customer_id": "99aaa83e-58dc-4d66-aebb-4a07b0d3e259",
  "violations": [
    {
      "directive": "connect-src",
      "blocked_uri": "https://facebook.net/tracking.js",
      "document_uri": "https://example.com/checkout",
      "violated_directive": "connect-src 'self'",
      "disposition": "enforce",
      "occurrence_count": 142,
      "first_seen": "2025-11-01T10:30:00Z",
      "last_seen": "2025-11-13T14:22:11Z"
    }
  ]
}
```

### Frontend Component Structure

**Pages:**
- `/resources/js/pages/customer/csp/index.tsx` - List of pending violations
- `/resources/js/pages/customer/csp/show.tsx` - Detailed violation view
- `/resources/js/pages/customer/csp/resolved.tsx` - History of resolved violations

**Components:**
- `ViolationCard` - Display individual violation with action buttons
- `DecisionDialog` - Modal for approve/reject with notes field
- `ViolationStatusBadge` - Color-coded status indicator
- `ViolationStats` - Summary metrics (new, approved, rejected counts)

**ShadCN Components Used:**
- Card, CardHeader, CardContent
- Badge (for status)
- Button (actions)
- Dialog (decision modal)
- Textarea (notes)
- Alert (warnings/info)
- Select (filtering)
- Separator

---

## Implementation Plan

### Phase 1: Core Functionality (Week 1)

**Milestone 1.1: Database & Models**
- Create database migrations
- Build Eloquent models with relationships
- Implement model scopes and accessors

**Milestone 1.2: Backend Services**
- Build `CspReportingService` for external API integration
- Implement deduplication logic
- Create `CustomerCspViolationController` with all actions

**Milestone 1.3: Routes & Configuration**
- Define customer-facing routes
- Add module configuration settings
- Register routes in module service provider

**Milestone 1.4: Frontend UI**
- Create violation list page (index)
- Build decision dialog component
- Implement approve/reject/ignore actions
- Add filtering and pagination

**Milestone 1.5: Testing & Polish**
- Test with real data from CSP service
- Implement error handling
- Add loading states
- Write user documentation

### Phase 2: Magento 2 Integration (Week 2)

**Milestone 2.1: GitHub Integration Service**
- Build GitHub API client service
- Implement PR creation logic
- Add repository validation

**Milestone 2.2: Magento 2 Detection**
- Detect Magento 2 platform from website settings
- Verify CSP module exists in repo
- Validate production environment

**Milestone 2.3: CSP File Generation**
- Create CSP configuration file generator
- Format according to Magento 2 CSP module requirements
- Include approved violations in whitelist

**Milestone 2.4: PR Automation**
- Trigger PR creation on approval
- Add descriptive PR title/body
- Link PR back to portal violation

**Milestone 2.5: Testing & Documentation**
- Test full GitHub integration flow
- Document setup requirements
- Create admin guide for enabling feature

### Phase 3: Enhancements (Future)

- Auto-ignore known safe CDNs (Google Analytics, Facebook Pixel, etc.)
- Bulk approve/reject actions
- Email notifications for new violations
- Violation analytics dashboard
- Export violations to CSV
- Webhook integration for real-time updates

---

## Risk Assessment

### Technical Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|-------------------|
| External API downtime | Medium | High | Implement caching, graceful degradation, retry logic |
| High violation volume | High | Medium | Implement pagination, deduplication, auto-ignore rules |
| Database performance | Low | Medium | Add proper indexes, use query optimization |
| GitHub API rate limits | Medium | Low | Queue PR creation, implement backoff strategy |
| Magento module detection fails | Medium | Low | Provide manual override option |

### Timeline Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|-------------------|
| Scope creep to Phase 2 | High | Medium | Strictly enforce Phase 1 completion before Phase 2 |
| CSP concept complexity | Medium | Low | Add tooltips, help text, documentation |
| GitHub integration complexity | High | High | Allocate buffer time, consider external library |

### Business Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|-----------|--------|-------------------|
| Customer confusion about CSP | Medium | Medium | Provide educational content, tooltips |
| Low adoption rate | Low | Medium | Gather user feedback, iterate on UX |
| Security concerns with auto-PR | Low | High | Require explicit approval, add review step |

---

## Detailed Task List

### Phase 1: Core Functionality

#### 1.1 Database Foundation
- [ ] **Task #1:** Create `csp_violations` table migration
- [ ] **Task #2:** Create `csp_violation_decisions` table migration
- [ ] **Task #3:** Run migrations and verify schema
- [ ] **Task #4:** Create `CspViolation` model with relationships
- [ ] **Task #5:** Create `CspViolationDecision` model
- [ ] **Task #6:** Add model factories for testing

#### 1.2 Backend Services
- [ ] **Task #7:** Create `CspReportingService` class
- [ ] **Task #8:** Implement `fetchViolationsFromApi()` method
- [ ] **Task #9:** Implement deduplication logic
- [ ] **Task #10:** Add error handling for API failures
- [ ] **Task #11:** Create `CustomerCspViolationController`
- [ ] **Task #12:** Implement `index()` method (list violations)
- [ ] **Task #13:** Implement `show()` method (view details)
- [ ] **Task #14:** Implement `approve()` method with audit trail
- [ ] **Task #15:** Implement `reject()` method with audit trail
- [ ] **Task #16:** Implement `ignore()` method with audit trail
- [ ] **Task #17:** Add customer authorization checks

#### 1.3 Routes & Configuration
- [ ] **Task #18:** Define customer routes in `web.php`
- [ ] **Task #19:** Update `config/config.php` with module settings
- [ ] **Task #20:** Add CSP_SERVICE_TOKEN to `.env.example`
- [ ] **Task #21:** Register routes in RouteServiceProvider

#### 1.4 Frontend UI
- [ ] **Task #22:** Create TypeScript types for violations
- [ ] **Task #23:** Create `index.tsx` (violation list page)
- [ ] **Task #24:** Create `ViolationCard` component
- [ ] **Task #25:** Create `DecisionDialog` component
- [ ] **Task #26:** Create `ViolationStatusBadge` component
- [ ] **Task #27:** Implement approve action with dialog
- [ ] **Task #28:** Implement reject action with dialog
- [ ] **Task #29:** Implement ignore action
- [ ] **Task #30:** Add pagination controls
- [ ] **Task #31:** Add filter by status
- [ ] **Task #32:** Create `resolved.tsx` (history page)
- [ ] **Task #33:** Add navigation to customer sidebar
- [ ] **Task #34:** Add route definitions to Ziggy

#### 1.5 Testing & Documentation
- [ ] **Task #35:** Test API integration with test credentials
- [ ] **Task #36:** Test deduplication with duplicate violations
- [ ] **Task #37:** Test customer authorization
- [ ] **Task #38:** Test approve/reject/ignore flows
- [ ] **Task #39:** Test pagination and filtering
- [ ] **Task #40:** Add loading states and error messages
- [ ] **Task #41:** Write user documentation
- [ ] **Task #42:** Create admin setup guide

### Phase 2: Magento 2 GitHub Integration

#### 2.1 GitHub Service
- [ ] **Task #43:** Create `GitHubService` class
- [ ] **Task #44:** Implement GitHub API authentication
- [ ] **Task #45:** Implement repository file reading
- [ ] **Task #46:** Implement branch creation
- [ ] **Task #47:** Implement file commit
- [ ] **Task #48:** Implement PR creation
- [ ] **Task #49:** Add error handling for GitHub API

#### 2.2 Magento 2 Detection
- [ ] **Task #50:** Add Magento 2 platform detection logic
- [ ] **Task #51:** Verify production environment check
- [ ] **Task #52:** Check for CSP module in repo
- [ ] **Task #53:** Add validation before PR creation

#### 2.3 CSP File Generation
- [ ] **Task #54:** Create `Magento2CspGenerator` service
- [ ] **Task #55:** Implement CSP config file formatter
- [ ] **Task #56:** Map approved violations to CSP directives
- [ ] **Task #57:** Generate valid PHP array syntax
- [ ] **Task #58:** Add file header comments

#### 2.4 PR Automation
- [ ] **Task #59:** Create `CspPullRequestService`
- [ ] **Task #60:** Implement PR trigger on approval
- [ ] **Task #61:** Generate descriptive PR title/body
- [ ] **Task #62:** Link PR URL back to violation
- [ ] **Task #63:** Add PR status tracking

#### 2.5 Testing & Documentation
- [ ] **Task #64:** Test GitHub authentication
- [ ] **Task #65:** Test PR creation with test repo
- [ ] **Task #66:** Test CSP file format validation
- [ ] **Task #67:** Test end-to-end approve → PR flow
- [ ] **Task #68:** Document GitHub token setup
- [ ] **Task #69:** Document Magento 2 module requirements
- [ ] **Task #70:** Create admin configuration guide

---

## Acceptance Criteria

### Phase 1: Must Have

✅ **Customer can view CSP violations**
- List shows directive, blocked URI, occurrence count
- Violations are grouped/deduplicated
- Pagination works for >20 violations

✅ **Customer can make decisions**
- Approve action updates status, logs audit trail
- Reject action updates status, logs audit trail
- Ignore action updates status, logs audit trail
- Decision notes are required and stored

✅ **Audit trail is complete**
- Every decision creates `csp_violation_decisions` record
- Records include user, timestamp, IP, notes
- History is immutable (append-only)

✅ **Customer authorization works**
- Users can only see their customer's violations
- Attempting to access other customer's violations returns 403
- Organisation users cannot access customer routes

✅ **UI matches portal design**
- Uses ShadCN components
- Follows existing color scheme
- Mobile responsive
- Loading states and error messages

### Phase 2: Must Have

✅ **Magento 2 detection works**
- Correctly identifies Magento 2 websites
- Verifies production environment
- Checks for CSP module in repository

✅ **PR creation succeeds**
- Valid CSP config file generated
- PR created via GitHub API
- PR link stored in violation record
- Descriptive PR title and body

✅ **Error handling is robust**
- GitHub API failures don't break approve flow
- User sees clear error messages
- Failed PRs can be retried

---

## Success Metrics

### Phase 1 Metrics

- **Adoption Rate:** >70% of customers with violations use the feature within 30 days
- **Decision Rate:** >50% of violations receive a decision within 7 days
- **User Satisfaction:** Net Promoter Score (NPS) >7/10
- **Support Reduction:** <10% of CSP-related support tickets after launch

### Phase 2 Metrics

- **PR Success Rate:** >95% of approved violations trigger successful PR creation
- **Merge Rate:** >80% of generated PRs are merged within 14 days
- **Error Rate:** <5% of GitHub integrations fail

---

## Technical Debt & Future Considerations

### Known Limitations (Phase 1)

1. **Manual Sync:** Violations must be manually synced from external API (no webhook)
2. **No Bulk Actions:** Users must approve/reject violations one at a time
3. **Limited Analytics:** No dashboard or trends view
4. **No Email Notifications:** Users must check portal for new violations

### Refactoring Opportunities (Post-Launch)

1. **Real-time Updates:** Add webhook support from CSP service
2. **Background Jobs:** Move API sync to queue for better performance
3. **Smart Recommendations:** ML-based suggestions for approve/reject
4. **Integration Expansion:** Support other platforms beyond Magento 2

---

## Dependencies

### External Services
- CSP Reporting Service: `https://csp.deploy.co.uk/`
- GitHub API (Phase 2): `https://api.github.com/`

### Laravel Packages
- `guzzlehttp/guzzle` (HTTP client) - Already installed
- `laravel/sanctum` (API auth) - Already installed

### Frontend Packages
- ShadCN UI components - Already installed
- Inertia.js - Already installed
- React - Already installed

### Internal Dependencies
- Customer model with relationships
- Website model with platform detection
- User authentication system
- Module settings service

---

## Security Considerations

### Authentication & Authorization
- ✅ Customer-only routes (no organisation middleware)
- ✅ Validate `$violation->customer_id === $customer->id`
- ✅ API token secured in environment variables
- ✅ GitHub tokens stored encrypted (Phase 2)

### Data Protection
- ✅ PII in notes fields (user names, emails)
- ✅ IP addresses stored for audit compliance
- ✅ No sensitive data in violation URIs logged

### API Security
- ✅ Timeout limits on external API calls (3s)
- ✅ Rate limiting on customer actions
- ✅ CSRF protection on form submissions
- ✅ GitHub token scopes limited to repo write (Phase 2)

---

## Documentation Requirements

### User Documentation
1. **Customer Guide:** "Understanding CSP Violations"
2. **Decision Guide:** "When to Approve vs Reject CSP Violations"
3. **FAQ:** Common CSP violation scenarios

### Admin Documentation
1. **Setup Guide:** Enabling CSP Management module
2. **Configuration:** API token setup
3. **Troubleshooting:** Common integration issues
4. **Phase 2 Setup:** GitHub integration configuration

### Developer Documentation
1. **API Documentation:** External CSP service API format
2. **Architecture:** Module structure and flow diagrams
3. **Database Schema:** ERD and relationship documentation
4. **GitHub Integration:** PR format and requirements (Phase 2)

---

## Rollout Plan

### Stage 1: Internal Testing (Week 1)
- Deploy to staging environment
- Test with test customer ID: `99aaa83e-58dc-4d66-aebb-4a07b0d3e259`
- Verify all flows work with real CSP service

### Stage 2: Beta Testing (Week 2)
- Enable for 5-10 selected customers
- Gather feedback on UX
- Monitor for performance issues
- Iterate on UI/UX based on feedback

### Stage 3: General Availability (Week 3)
- Enable for all customers with violations
- Announce feature via email/changelog
- Monitor adoption metrics
- Provide customer training sessions

### Stage 4: Phase 2 Rollout (Week 4-5)
- Enable GitHub integration for Magento 2 customers
- Test PR creation with 2-3 pilot customers
- Document setup requirements
- Scale to all eligible customers

---

## Appendix A: CSP Violation Example

**Raw CSP Report (Browser):**
```json
{
  "csp-report": {
    "document-uri": "https://example.com/checkout",
    "referrer": "",
    "violated-directive": "connect-src 'self'",
    "effective-directive": "connect-src",
    "original-policy": "default-src 'self'; connect-src 'self'; script-src 'self' 'unsafe-inline'",
    "disposition": "enforce",
    "blocked-uri": "https://facebook.net/tracking.js",
    "line-number": 42,
    "source-file": "https://example.com/assets/tracking.js",
    "status-code": 0,
    "script-sample": ""
  }
}
```

**Stored Violation (Portal):**
```php
[
    'customer_id' => '99aaa83e-58dc-4d66-aebb-4a07b0d3e259',
    'website_id' => '019a1666-5a2a-72ed-9922-0d2c1c23b616',
    'directive' => 'connect-src',
    'blocked_uri' => 'https://facebook.net/tracking.js',
    'document_uri' => 'https://example.com/checkout',
    'violated_directive' => "connect-src 'self'",
    'status' => 'new',
    'occurrence_count' => 142,
    'first_seen_at' => '2025-11-01 10:30:00',
    'last_seen_at' => '2025-11-13 14:22:11',
]
```

---

## Appendix B: Magento 2 CSP File Format (Phase 2)

**Target File:** `app/code/Deploy/Csp/etc/csp_whitelist.xml`

```xml
<?xml version="1.0"?>
<csp_whitelist xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Csp/etc/csp_whitelist.xsd">
    <policies>
        <policy id="connect-src">
            <values>
                <value id="facebook_tracking" type="host">facebook.net</value>
                <value id="google_analytics" type="host">google-analytics.com</value>
            </values>
        </policy>
        <policy id="script-src">
            <values>
                <value id="cloudflare_cdn" type="host">cdnjs.cloudflare.com</value>
            </values>
        </policy>
    </policies>
</csp_whitelist>
```

**Generated Comment Header:**
```xml
<!--
Auto-generated by Deploy Portal CSP Management
Generated: 2025-11-13 14:30:00 UTC
Approved by: john.smith@example.com
Violations included:
  - connect-src: facebook.net (142 occurrences)
  - connect-src: google-analytics.com (87 occurrences)
  - script-src: cdnjs.cloudflare.com (23 occurrences)
-->
```

---

## Appendix C: GitHub PR Template (Phase 2)

**PR Title:**
```
[CSP] Add approved CSP exceptions - {customer_name}
```

**PR Body:**
```markdown
## CSP Policy Updates

This PR adds approved Content Security Policy exceptions for {customer_name}.

### Violations Approved

| Directive | Blocked URI | Occurrences | First Seen | Approved By |
|-----------|-------------|-------------|------------|-------------|
| connect-src | facebook.net | 142 | 2025-11-01 | john.smith@example.com |
| connect-src | google-analytics.com | 87 | 2025-11-05 | john.smith@example.com |
| script-src | cdnjs.cloudflare.com | 23 | 2025-11-10 | jane.doe@example.com |

### Review Checklist

- [ ] All violations have been reviewed by customer
- [ ] URIs are from trusted sources
- [ ] No security concerns with whitelisted domains
- [ ] CSP file syntax is valid
- [ ] Module will auto-register with Magento

### Links

- Portal Decision Log: https://portal.deploy.co.uk/customer/csp-violations/resolved
- Customer: {customer_name} (ID: {customer_id})

---

*Auto-generated by Deploy Portal CSP Management Module*
*Generated at: 2025-11-13 14:30:00 UTC*
```

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-11-13 | Initial PRD creation | AI Planning Agent |

---

**Next Steps:**
1. Review and approve PRD
2. Create GitHub issues for Phase 1 tasks
3. Assign developers to tasks
4. Begin Sprint 1: Database & Models
