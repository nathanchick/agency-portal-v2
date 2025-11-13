# PRD: AI-Powered Ticket Quality Assistant

**Version:** 1.0
**Date:** 2025-11-13
**Status:** Planning
**Module:** OpenAI
**Target Release:** TBD

---

## 1. Executive Summary

### Problem Statement

Support tickets submitted by customers often lack critical information, contain vague descriptions, or have mismatched priorities. This leads to:

- **Increased back-and-forth** communication between support team and customers
- **Longer resolution times** due to incomplete information
- **Team inefficiency** as staff spend time gathering basic details
- **Customer frustration** from delayed responses
- **Missed SLA targets** due to information gathering overhead

**Impact Metrics:**
- Average of 2-3 follow-up messages per ticket for clarification
- 30-40% of tickets require requesting additional information
- Delayed initial response times affecting customer satisfaction

### Proposed Solution

Implement an **AI-Powered Ticket Quality Assistant** that analyzes ticket form data in real-time and provides intelligent, contextual feedback to customers **before** submission. The system will:

1. **Analyze** ticket content (title, description, priority, category) as customers fill out the form
2. **Evaluate** completeness, clarity, and quality based on best practices and platform context
3. **Suggest** specific improvements to enhance ticket quality
4. **Leverage** platform-specific knowledge (WordPress, Magento, etc.) to request relevant technical details
5. **Allow** customers to accept or ignore suggestions, maintaining user control

### Key Benefits

**For Support Team:**
- ✅ Reduced time spent requesting basic information
- ✅ Higher quality, actionable tickets from the start
- ✅ Faster ticket triage and assignment
- ✅ Improved team productivity and morale

**For Customers:**
- ✅ Faster issue resolution (complete tickets processed quicker)
- ✅ Educational guidance on effective ticket writing
- ✅ Reduced frustration from back-and-forth communication
- ✅ Better self-service through improved problem articulation

**For Business:**
- ✅ Improved customer satisfaction scores
- ✅ Better SLA compliance
- ✅ Reduced operational costs
- ✅ Scalable quality improvement without additional training overhead

### Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AI suggestions perceived as condescending or annoying | High | Medium | Careful UX design, optional feature, respectful tone in prompts |
| Increased OpenAI API costs | Medium | High | Implement rate limiting, caching, and cost monitoring |
| Slower ticket submission due to suggestion review | Medium | Medium | Make suggestions optional, allow skip/dismiss easily |
| Inaccurate suggestions frustrating users | High | Low | Thorough prompt engineering, user feedback loop, GPT-4 for accuracy |
| Privacy concerns with sending ticket data to OpenAI | High | Low | Use existing PII redaction, clear privacy messaging, optional feature |
| Platform detection inaccuracy | Low | Medium | Allow manual override, graceful fallback to generic suggestions |

---

## 2. Technical Analysis

### Current Architecture Assessment

**Existing Components:**
1. **OpenAI Module** (`Modules/OpenAi/`)
   - ✅ Already integrated with OpenAI API (gpt-3.5-turbo)
   - ✅ PII redaction service for data privacy
   - ✅ Organisation-level API key management
   - ✅ Currently used for ticket summarization

2. **Ticket Creation System** (`Modules/Ticket/`)
   - ✅ React-based form (`resources/js/pages/tickets/create.tsx`)
   - ✅ Validation rules and model structure
   - ✅ Custom dynamic fields via FormRenderer
   - ✅ Category and label support

3. **Customer/Website System** (`Modules/Customer/`, `Modules/Website/`)
   - ✅ Customer-Website associations
   - ✅ WebsiteSetting model for flexible metadata
   - ⚠️ **Gap:** No platform/version tracking (WordPress, Magento, PHP version)

### Proposed Changes

#### A. Backend Services (Laravel)

**New Service: `TicketQualityService`**
- Location: `Modules/OpenAi/app/Services/TicketQualityService.php`
- Purpose: Analyze ticket data and generate improvement suggestions
- Dependencies: `OpenAiService`, `PiiRedactionService`, `Website`, `WebsiteSetting`

**Enhanced: `OpenAiService`**
- Add new method: `analyzeTicketQuality(array $ticketData, ?Website $website): array`
- Use GPT-4 for better analysis (more accurate than 3.5-turbo)
- Return structured JSON response with suggestions

**New Controller Method:**
- Location: `Modules/OpenAi/app/Http/Controllers/OpenAiController.php`
- Method: `analyzeTicket(Request $request)`
- Route: `POST /api/v1/openai/analyze-ticket`

#### B. Database Schema Changes

**New Table: `ticket_quality_analyses`**
```sql
- id (UUID, PK)
- ticket_id (UUID, FK, nullable) -- null until ticket created
- customer_id (UUID, FK)
- website_id (UUID, FK, nullable)
- analysis_data (JSON) -- Original form data analyzed
- suggestions (JSON) -- AI suggestions provided
- accepted_suggestions (JSON) -- Which suggestions user accepted
- dismissed_suggestions (JSON) -- Which suggestions user dismissed
- created_at, updated_at
```

**Purpose:** Track suggestion quality, acceptance rates, and iterate on prompt engineering

**Enhanced: `website_settings` table**
```sql
-- New settings to add (via WebsiteSetting model):
module: 'Platform'
keys:
  - 'type' (wordpress|magento2|magento1|custom|shopify|drupal|laravel)
  - 'version' (e.g., '2.4.6', '6.3.2')
  - 'php_version' (e.g., '8.2')
```

#### C. Frontend Components (React/TypeScript)

**New Component: `TicketQualitySuggestions`**
- Location: `resources/js/components/ticket-quality-suggestions.tsx`
- Props: `suggestions`, `onAccept`, `onDismiss`, `onAcceptAll`, `isLoading`
- UI: Modal or slide-out panel with categorized suggestions

**Enhanced Component: `CreateTicket`**
- Location: `resources/js/pages/tickets/create.tsx`
- Add: "Get AI Suggestions" button
- Add: Pre-submit quality check flow
- Add: State management for suggestions

**New TypeScript Interfaces:**
```typescript
interface TicketSuggestion {
    id: string;
    category: 'missing_info' | 'clarity' | 'priority' | 'technical_details';
    field: 'title' | 'message' | 'priority' | 'category';
    severity: 'high' | 'medium' | 'low';
    message: string;
    suggestion: string;
    autoApplicable: boolean; // Can be applied automatically
}

interface TicketQualityAnalysis {
    overallScore: number; // 0-100
    suggestions: TicketSuggestion[];
    platformContext?: {
        platform: string;
        version: string;
        relevantInfo: string[];
    };
}
```

### Dependency Mapping

```
Customer
  └─ Website (1:many)
      ├─ WebsiteSetting (platform info)
      └─ Ticket Creation Form
          ├─ TicketQualityService (analyzes)
          │   ├─ OpenAiService (API calls)
          │   │   └─ PiiRedactionService (security)
          │   └─ Website (context)
          └─ TicketQualitySuggestions (UI)
              └─ TicketQualityAnalysis (stores)
```

### Performance Considerations

**API Call Latency:**
- GPT-4 response time: 2-5 seconds typical
- Mitigation: Show loading state, allow background operation, cache common patterns

**Cost Management:**
- GPT-4 Turbo: ~$0.01-0.03 per ticket analysis (estimated 1000-3000 tokens)
- 1000 tickets/month = $10-30/month per customer organisation
- Mitigation: Rate limiting (3 analyses per ticket max), prompt optimization

**Database Load:**
- New table adds ~2KB per ticket analysis
- 10,000 tickets/year = 20MB (negligible)

**Frontend Performance:**
- Suggestion UI: <100ms render time
- No impact on form responsiveness

### Security Considerations

1. **Data Privacy**
   - ✅ Use existing `PiiRedactionService` to strip sensitive data before OpenAI call
   - ✅ Don't send: passwords, API keys, credit card numbers, personal emails/phones
   - ✅ Log all redactions for audit

2. **API Key Security**
   - ✅ Use existing organisation-level encrypted API key storage
   - ✅ No keys exposed to frontend

3. **Authorization**
   - ✅ Require authenticated customer
   - ✅ Validate customer has access to selected website
   - ✅ Rate limiting: 10 analyses per customer per hour

4. **Data Retention**
   - ✅ Store analyses for 90 days for metrics
   - ✅ Auto-purge old records
   - ✅ Respect organisation data retention policies

---

## 3. Implementation Plan

### Phase 1: Foundation (Week 1)
**Goal:** Set up infrastructure and platform tracking

**Tasks:**
1. Database migrations for platform tracking and analysis storage
2. Update Website model with platform accessors
3. Create admin UI for setting platform information per website
4. Test and validate platform data storage

**Deliverables:**
- Platform information can be set and retrieved
- Migration scripts tested on staging

### Phase 2: Backend AI Service (Week 2)
**Goal:** Build core AI analysis engine

**Tasks:**
1. Create `TicketQualityService` with GPT-4 integration
2. Design and implement prompt engineering for ticket analysis
3. Implement platform-aware suggestions
4. Create API endpoint for ticket analysis
5. Add comprehensive error handling and logging
6. Write unit tests for service layer

**Deliverables:**
- API endpoint returns structured suggestions
- Service handles all ticket types and categories
- Test coverage >80%

### Phase 3: Frontend Integration (Week 3)
**Goal:** Build user-facing suggestion UI

**Tasks:**
1. Create `TicketQualitySuggestions` React component
2. Update ticket creation form with "Get Suggestions" button
3. Implement suggestion acceptance/dismissal logic
4. Add pre-submit quality check flow
5. Design and implement loading states
6. Add TypeScript types and interfaces

**Deliverables:**
- Customers can request and view suggestions
- Suggestions can be applied to form
- UI is responsive and intuitive

### Phase 4: Settings & Configuration (Week 4)
**Goal:** Enable feature control and monitoring

**Tasks:**
1. Add organisation-level feature toggle
2. Create settings UI for platform configuration
3. Implement analytics dashboard for suggestion metrics
4. Add cost monitoring and alerts
5. Create admin documentation

**Deliverables:**
- Feature can be enabled/disabled per organisation
- Admins can configure platform settings
- Usage metrics are visible

### Phase 5: Testing & Refinement (Week 5)
**Goal:** Ensure quality and gather feedback

**Tasks:**
1. Comprehensive end-to-end testing
2. Beta testing with 3-5 pilot customers
3. Gather and analyze feedback
4. Refine prompts based on suggestion quality
5. Performance optimization
6. Security audit

**Deliverables:**
- All test cases passing
- Beta feedback incorporated
- Production-ready code

### Phase 6: Rollout & Documentation (Week 6)
**Goal:** Deploy to production and enable for customers

**Tasks:**
1. Production deployment
2. Create customer-facing documentation
3. Create support team training materials
4. Gradual rollout (10% → 50% → 100%)
5. Monitor metrics and errors
6. Establish feedback loop

**Deliverables:**
- Feature live in production
- Documentation complete
- Team trained
- Metrics baseline established

### Resource Requirements

**Development Team:**
- 1 Senior Full-Stack Developer (lead)
- 1 Frontend Developer (React)
- 1 Backend Developer (Laravel)
- 1 QA Engineer (testing)
- 0.5 Product Manager (coordination)
- 0.25 DevOps (deployment)

**External Resources:**
- OpenAI API access (GPT-4)
- Staging environment for testing

**Estimated Effort:** 6 weeks (1.5 months)

---

## 4. Risk Assessment

### Technical Risks

| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| **GPT-4 API instability/downtime** | High | Low | Graceful degradation to GPT-3.5, queue-based retry mechanism, clear error messaging |
| **Inaccurate suggestions damage credibility** | High | Medium | Extensive prompt engineering, beta testing, allow user feedback on suggestions, A/B test prompts |
| **Performance degradation (slow API)** | Medium | Medium | Async processing, loading states, timeout handling (10s max), cache common patterns |
| **Platform detection inaccuracy** | Low | Medium | Allow manual platform selection, graceful fallback to generic suggestions, don't block submission |
| **Complex custom fields not analyzable** | Low | High | Focus on title/message/priority initially, expand to custom fields in v2 |

### Business Risks

| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| **Low adoption by customers** | Medium | Medium | Make feature visible but not intrusive, educate on benefits, show time savings, A/B test UI |
| **High OpenAI costs** | Medium | High | Cost monitoring and alerts, rate limiting per customer, monthly budget caps, consider self-hosted alternatives |
| **Negative customer perception (AI nanny)** | High | Low | Careful messaging ("helpful assistant"), optional feature, respectful tone, easy to dismiss |
| **Support team doesn't see improvement** | High | Low | Track metrics (follow-up messages, time-to-resolution), iterate based on data, gather team feedback |

### Timeline Risks

| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| **Prompt engineering takes longer** | Medium | High | Allocate 50% buffer time for Phase 2, start with simpler prompts and iterate, use GPT-4 playground for rapid testing |
| **Frontend complexity underestimated** | Medium | Medium | Break into smaller components, reuse existing patterns from ticket summary feature, parallel development |
| **Testing discovers major issues** | High | Low | Early QA involvement, continuous testing throughout development, beta period with real users |

### Mitigation Priorities

**Priority 1 (Must Address):**
1. Cost monitoring and budget controls
2. Accurate, helpful suggestions (prompt engineering)
3. User experience (not annoying or condescending)

**Priority 2 (Should Address):**
4. Performance and loading states
5. Platform detection accuracy
6. Adoption metrics and iteration

**Priority 3 (Nice to Have):**
7. Advanced analytics
8. Self-hosted AI alternatives
9. Multi-language support

---

## 5. Feature Specifications

### 5.1 Platform Information Capture

**User Story:** As a customer admin, I want to specify what platform my website runs on so that AI suggestions are relevant to my technology stack.

**Acceptance Criteria:**
- [ ] Platform type can be selected from predefined list: WordPress, Magento 2.x, Magento 1.x, Shopify, Drupal, Laravel/Custom, Other
- [ ] Version number can be entered (free text or dropdown for common versions)
- [ ] PHP version can be optionally specified
- [ ] Platform info is stored in `website_settings` table with module='Platform'
- [ ] Platform info is displayed on website detail page
- [ ] Platform info can be edited by customer admins and organisation admins
- [ ] If platform is not set, system falls back to generic suggestions

**UI Location:** Website detail page → Settings tab → Platform Information section

**Data Structure:**
```json
{
    "platform_type": "magento2",
    "platform_version": "2.4.6",
    "php_version": "8.2",
    "notes": "Custom theme based on Luma"
}
```

---

### 5.2 AI Quality Analysis Trigger

**User Story:** As a customer creating a ticket, I want to request AI suggestions to improve my ticket quality.

**Acceptance Criteria:**
- [ ] "Get AI Suggestions" button appears below the ticket form
- [ ] Button is visible after title AND message have at least 10 characters each
- [ ] Clicking button triggers API call to `/api/v1/openai/analyze-ticket`
- [ ] Loading state shown during analysis (2-5 seconds typical)
- [ ] Error handling for API failures with user-friendly message
- [ ] Button shows icon (sparkle/star) and clear label "Get AI Suggestions"
- [ ] Rate limiting: 3 requests per ticket maximum (show message after limit)
- [ ] Analytics event fired when button clicked

**UI Mockup:**
```
┌─────────────────────────────────────────┐
│ Ticket Form                             │
│ [Title Field]                           │
│ [Message Textarea]                      │
│ [Priority Dropdown]                     │
│                                         │
│ ✨ [Get AI Suggestions]                 │
│    Improve your ticket before submitting│
└─────────────────────────────────────────┘
```

---

### 5.3 Suggestion Display and Interaction

**User Story:** As a customer, I want to see specific, actionable suggestions and choose which ones to apply.

**Acceptance Criteria:**
- [ ] Suggestions appear in a modal/panel overlay
- [ ] Suggestions grouped by category: Missing Info, Clarity Improvements, Priority Check, Technical Details
- [ ] Each suggestion shows:
  - Severity indicator (High/Medium/Low with color coding)
  - Field affected (Title, Message, Priority, etc.)
  - Clear explanation of the issue
  - Specific suggestion for improvement
- [ ] Auto-applicable suggestions have "Apply" button
- [ ] Manual suggestions show as guidance text
- [ ] "Accept All" button applies all auto-applicable suggestions
- [ ] "Dismiss" button on each suggestion
- [ ] "Dismiss All" or "Close" closes the panel without changes
- [ ] Applied suggestions update form fields immediately with smooth animation
- [ ] Dismissing doesn't prevent re-requesting suggestions
- [ ] Overall quality score shown (0-100) with visual indicator

**UI Mockup:**
```
┌─────────────────────────────────────────────────────┐
│ AI Suggestions - Quality Score: 65/100 ⚠️           │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 🔴 HIGH PRIORITY                                    │
│ ┌─────────────────────────────────────────────┐   │
│ │ Title: Missing specific error or symptom    │   │
│ │ Your title is vague. Include what went      │   │
│ │ wrong or what you're trying to achieve.     │   │
│ │                                             │   │
│ │ Suggestion: Add error message or symptom    │   │
│ │ [Dismiss]                                   │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 🟡 MEDIUM PRIORITY                                  │
│ ┌─────────────────────────────────────────────┐   │
│ │ Message: Missing steps to reproduce         │   │
│ │ Include what you did before the issue       │   │
│ │ occurred so we can replicate it.            │   │
│ │                                             │   │
│ │ [Apply Template]                            │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 🟢 LOW PRIORITY                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ Magento 2.4.6 Tip                           │   │
│ │ Consider including your exception.log       │   │
│ │ contents from var/log/                      │   │
│ │ [Dismiss]                                   │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│              [Accept All] [Close]                   │
└─────────────────────────────────────────────────────┘
```

---

### 5.4 Pre-Submit Quality Gate

**User Story:** As a product owner, I want to encourage (not force) customers to review suggestions before submitting low-quality tickets.

**Acceptance Criteria:**
- [ ] When user clicks "Submit" button, quality check runs automatically
- [ ] If quality score < 60 AND suggestions haven't been reviewed, show interstitial
- [ ] Interstitial shows top 3 most important suggestions
- [ ] User can choose:
  - "Review Suggestions" (opens full suggestion panel)
  - "Submit Anyway" (bypasses suggestions)
- [ ] If quality score >= 60 OR suggestions already reviewed, submit immediately
- [ ] No infinite loops (max 1 interstitial per submission attempt)
- [ ] Analytics track bypass rate

**UI Mockup:**
```
┌─────────────────────────────────────────────────────┐
│ ⚠️  Your ticket might be missing some information   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ We noticed a few things that could help us         │
│ resolve your issue faster:                         │
│                                                     │
│ • Your title doesn't describe the specific error   │
│ • Steps to reproduce are missing                   │
│ • No browser or error message included             │
│                                                     │
│ Taking 30 seconds to add these details can save    │
│ hours in back-and-forth communication.             │
│                                                     │
│         [Review Suggestions]  [Submit Anyway]      │
└─────────────────────────────────────────────────────┘
```

---

### 5.5 Platform-Aware Suggestions

**User Story:** As a Magento developer, I want suggestions specific to Magento troubleshooting best practices.

**Platform-Specific Prompts:**

**WordPress:**
- Request: WordPress version, PHP version, active theme, active plugins
- Suggest: Error log location (wp-content/debug.log), browser console errors
- Common issues: Plugin conflicts, theme compatibility, permalink issues

**Magento 2:**
- Request: Magento version, PHP version, deployment mode (production/developer)
- Suggest: Exception logs (var/log/exception.log), system.log, debug mode steps
- Common issues: Cache issues, reindex needed, permissions, deploy failures

**Magento 1:**
- Request: Magento version, PHP version
- Suggest: var/log/exception.log, system.log
- Common issues: Similar to M2 but legacy context

**Shopify:**
- Request: Theme name, app list
- Suggest: Storefront API errors, theme customization details
- Common issues: Liquid template errors, app conflicts

**Custom/Laravel:**
- Request: Laravel version, PHP version, environment (local/staging/production)
- Suggest: Laravel logs (storage/logs/laravel.log), error messages, stack traces
- Common issues: Dependency issues, configuration errors, queue failures

**Acceptance Criteria:**
- [ ] Prompt includes platform context when available
- [ ] Suggestions mention platform-specific tools and log locations
- [ ] Platform-specific checklist appears in suggestions (e.g., "For Magento, have you tried...")
- [ ] Graceful fallback to generic suggestions if platform not set
- [ ] Platform-specific suggestions tested for each platform type

---

### 5.6 Analytics and Iteration

**User Story:** As a product manager, I want to track suggestion quality and acceptance rates to improve the feature.

**Metrics to Track:**

| Metric | Purpose | Target |
|--------|---------|--------|
| Suggestion request rate | % of tickets where suggestions requested | >40% |
| Suggestion acceptance rate | % of suggestions applied by users | >50% |
| Bypass rate | % of users who "Submit Anyway" | <30% |
| Quality score distribution | Are scores improving over time? | Avg >70 |
| Follow-up message reduction | Primary KPI: Did feature reduce back-and-forth? | -25% |
| Time to first response | Secondary KPI: Faster triage due to better tickets? | -15% |
| OpenAI API cost per ticket | Cost control | <$0.05 |

**Dashboard Requirements:**
- [ ] Admin dashboard showing metrics above
- [ ] Date range filtering (last 7/30/90 days)
- [ ] Per-organisation breakdown
- [ ] Per-platform comparison
- [ ] Cost tracking and alerts (>$500/month alert)
- [ ] Export to CSV for analysis

**Data Collection:**
- [ ] Store every analysis in `ticket_quality_analyses` table
- [ ] Track which suggestions were accepted/dismissed
- [ ] Track whether ticket was submitted after suggestions or bypassed
- [ ] Link analysis to final ticket for outcome measurement
- [ ] Store analysis duration and token usage for cost tracking

---

### 5.7 Feature Toggle and Configuration

**User Story:** As an organisation admin, I want to enable/disable this feature and configure its behavior.

**Organisation Settings (via existing settings system):**

```php
'organisation_settings' => [
    'ticket_quality_assistant_status' => [
        'label' => 'Enable AI Ticket Quality Assistant',
        'type' => 'yes_no',
        'description' => 'Help customers write better tickets with AI suggestions',
    ],
    'ticket_quality_auto_check' => [
        'label' => 'Enable Pre-Submit Quality Check',
        'type' => 'yes_no',
        'description' => 'Automatically check ticket quality before submission',
    ],
    'ticket_quality_min_score' => [
        'label' => 'Minimum Quality Score (0-100)',
        'type' => 'number',
        'description' => 'Show pre-submit interstitial if score below this',
        'default' => 60,
    ],
    'ticket_quality_model' => [
        'label' => 'AI Model',
        'type' => 'select',
        'options' => ['gpt-3.5-turbo', 'gpt-4-turbo', 'gpt-4'],
        'description' => 'GPT-4 is more accurate but costs more',
        'default' => 'gpt-4-turbo',
    ],
]
```

**Acceptance Criteria:**
- [ ] Settings accessible in organisation settings UI
- [ ] Feature can be enabled/disabled per organisation
- [ ] Pre-submit check can be toggled independently
- [ ] Minimum score threshold is configurable (0-100)
- [ ] AI model selection available (with cost implications shown)
- [ ] Changes take effect immediately (no cache issues)
- [ ] If feature disabled, button and checks don't appear

---

## 6. Prompt Engineering Strategy

### Base System Prompt Template

```
You are a support ticket quality assistant. Your role is to help customers
write clear, actionable support tickets that enable faster resolution.

Analyze the provided ticket information and provide constructive suggestions
for improvement.

PLATFORM CONTEXT: {platform_type} {platform_version}
CATEGORY: {ticket_category}

GUIDELINES:
1. Be respectful and helpful, never condescending
2. Focus on actionable improvements
3. Prioritize by impact on resolution time
4. Consider platform-specific best practices
5. Don't suggest changes if ticket is already high quality

AVOID:
- Rewriting the entire ticket
- Being overly prescriptive
- Suggesting irrelevant platform-specific details
- Creating work for no benefit

OUTPUT FORMAT (JSON):
{
    "overallScore": 0-100,
    "suggestions": [
        {
            "category": "missing_info|clarity|priority|technical_details",
            "field": "title|message|priority|category",
            "severity": "high|medium|low",
            "message": "What's wrong",
            "suggestion": "How to fix it",
            "autoApplicable": true|false
        }
    ],
    "platformContext": {
        "relevantInfo": ["Info specific to this platform they should include"]
    }
}
```

### Scoring Rubric

**Title Quality (20 points):**
- 0-5 pts: Too vague ("Problem", "Help", "Issue")
- 6-12 pts: Generic but descriptive ("Login not working")
- 13-18 pts: Specific ("Admin login shows 404 error")
- 19-20 pts: Detailed and contextual ("Admin login returns 404 after Magento 2.4.6 upgrade")

**Message Quality (40 points):**
- Has clear problem description (10 pts)
- Includes steps to reproduce (10 pts)
- Includes error messages or symptoms (10 pts)
- Includes environment/context (5 pts)
- Clear what success looks like (5 pts)

**Priority Accuracy (15 points):**
- Priority matches described severity (15 pts)
- Mismatch detected (0 pts)

**Technical Details (15 points):**
- Platform-relevant details included (varies by platform)

**Category Appropriateness (10 points):**
- Category matches described issue (10 pts)

### Platform-Specific Prompt Additions

**WordPress Addition:**
```
For WordPress issues, high-quality tickets typically include:
- WordPress version
- Active theme name
- List of active plugins
- Error messages from wp-content/debug.log
- Browser console errors (for frontend issues)
- Recent changes (plugin updates, theme changes)
```

**Magento 2 Addition:**
```
For Magento 2 issues, high-quality tickets typically include:
- Exact Magento version (e.g., 2.4.6-p3)
- Deployment mode (developer/production/default)
- Error messages from var/log/exception.log
- Steps to reproduce with specific URLs
- Recent changes (deployments, config changes, extensions)
- Cache/reindex status if relevant
```

---

## 7. Success Metrics

### Primary KPIs (Must Achieve)

| Metric | Baseline | Target (3 months) | Measurement Method |
|--------|----------|-------------------|-------------------|
| **Average follow-up messages per ticket** | 2.3 | 1.5 (-35%) | Count of ticket_messages per ticket |
| **% tickets resolved on first response** | 30% | 45% (+15pp) | Tickets with 1 customer message only |
| **Average time to resolution** | 48 hours | 36 hours (-25%) | Ticket created_at to resolved_at |

### Secondary KPIs (Nice to Have)

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **Feature adoption rate** | >40% of tickets | % of tickets with analysis record |
| **Suggestion acceptance rate** | >50% | % of suggestions applied |
| **Customer satisfaction (CSAT)** | +5 points | Post-resolution survey |
| **Support team satisfaction** | +10 points | Quarterly team survey |

### Operational Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **OpenAI API cost per ticket** | <$0.03 | >$0.05 |
| **Analysis API response time** | <5 seconds | >10 seconds |
| **API error rate** | <2% | >5% |
| **Monthly OpenAI spend** | <$500 | >$1000 |

### Data Collection Timeline

- **Week 1-2:** Baseline measurement (before feature launch)
- **Week 3-6:** Pilot phase (10% rollout, close monitoring)
- **Week 7-14:** Full rollout (monitor and iterate)
- **Week 15:** First analysis and reporting
- **Month 3:** Full success metric evaluation

---

## 8. Task List

### ✅ Phase 1: Foundation (Week 1) - 3 days

#### Task #1: Create Database Migrations for Platform Tracking
**Priority:** High
**Estimated Effort:** 2 hours
**Dependencies:** None
**Acceptance Criteria:**
- [ ] Migration adds `ticket_quality_analyses` table with all required fields
- [ ] Migration includes proper foreign key constraints
- [ ] Migration includes indexes on customer_id, website_id, created_at
- [ ] Migration includes JSON columns with proper defaults
- [ ] Rollback tested and working
- [ ] Migration runs successfully on local and staging

**Files to Create:**
- `Modules/OpenAi/database/migrations/YYYY_MM_DD_create_ticket_quality_analyses_table.php`

---

#### Task #2: Create Platform Settings Infrastructure
**Priority:** High
**Estimated Effort:** 3 hours
**Dependencies:** None
**Acceptance Criteria:**
- [ ] WebsiteSetting entries can be created for platform info
- [ ] Platform types enum validated (wordpress, magento2, etc.)
- [ ] Website model has accessor: `$website->platform_type`
- [ ] Website model has accessor: `$website->platform_version`
- [ ] Website model has accessor: `$website->php_version`
- [ ] Graceful fallback when platform info not set (returns null)

**Files to Modify:**
- `Modules/Website/app/Models/Website.php` (add accessors)

---

#### Task #3: Create Admin UI for Platform Configuration
**Priority:** High
**Estimated Effort:** 4 hours
**Dependencies:** Task #2
**Acceptance Criteria:**
- [ ] Website detail page has "Platform Information" section
- [ ] Dropdown for platform type (WordPress, Magento 2, etc.)
- [ ] Text input for version number
- [ ] Text input for PHP version (optional)
- [ ] Textarea for additional notes
- [ ] Save functionality updates website_settings
- [ ] Validation prevents invalid platform types
- [ ] UI shows current values on load
- [ ] Success message on save

**Files to Create/Modify:**
- `resources/js/pages/websites/show.tsx` or similar (add section)
- `resources/js/components/website-platform-settings.tsx` (new component)
- `Modules/Website/app/Http/Controllers/WebsiteController.php` (update method)

---

#### Task #4: Create TicketQualityAnalysis Model
**Priority:** High
**Estimated Effort:** 2 hours
**Dependencies:** Task #1
**Acceptance Criteria:**
- [ ] Model created with proper fillable fields
- [ ] Relationships defined: `belongsTo` Ticket, Customer, Website
- [ ] JSON casting for analysis_data, suggestions, accepted_suggestions, dismissed_suggestions
- [ ] Accessor for calculating acceptance_rate
- [ ] Scope for recent analyses (last 90 days)
- [ ] Unit tests for model methods

**Files to Create:**
- `Modules/OpenAi/app/Models/TicketQualityAnalysis.php`

---

### ✅ Phase 2: Backend AI Service (Week 2) - 5 days

#### Task #5: Create TicketQualityService Class
**Priority:** High
**Estimated Effort:** 6 hours
**Dependencies:** Task #4
**Acceptance Criteria:**
- [ ] Service class created with dependency injection
- [ ] Constructor injects: OpenAiService, PiiRedactionService
- [ ] Main method: `analyzeTicket(array $ticketData, ?Website $website): TicketQualityAnalysis`
- [ ] Method validates input data structure
- [ ] Returns structured TicketQualityAnalysis object
- [ ] Handles errors gracefully with logging
- [ ] Unit tests with mocked dependencies (>80% coverage)

**Files to Create:**
- `Modules/OpenAi/app/Services/TicketQualityService.php`
- `Modules/OpenAi/tests/Unit/TicketQualityServiceTest.php`

---

#### Task #6: Implement Prompt Engineering for GPT-4
**Priority:** High
**Estimated Effort:** 8 hours
**Dependencies:** Task #5
**Acceptance Criteria:**
- [ ] Base system prompt template created
- [ ] Platform-specific prompt additions for: WordPress, Magento 2, Magento 1, Shopify, Laravel
- [ ] Scoring rubric implemented (title 20pts, message 40pts, priority 15pts, etc.)
- [ ] JSON output format strictly validated
- [ ] PII redaction applied before sending to OpenAI
- [ ] Prompt tested with 10+ sample tickets
- [ ] Output quality manually validated (suggestions are helpful)
- [ ] Token usage optimized (<2000 tokens per request)

**Files to Create:**
- `Modules/OpenAi/app/Services/Prompts/TicketQualityPrompt.php` (optional abstraction)

---

#### Task #7: Enhance OpenAiService with GPT-4 Support
**Priority:** High
**Estimated Effort:** 4 hours
**Dependencies:** Task #6
**Acceptance Criteria:**
- [ ] New method: `analyzeTicketQuality(string $prompt): array`
- [ ] Uses GPT-4-turbo model (cost-effective)
- [ ] Temperature: 0.3 (more consistent than 0.7)
- [ ] Max tokens: 1500
- [ ] Parses JSON response from GPT-4
- [ ] Validates response structure
- [ ] Throws exception on malformed response
- [ ] Logs token usage for cost tracking
- [ ] Unit tests with mocked OpenAI client

**Files to Modify:**
- `Modules/OpenAi/app/Services/OpenAiService.php`

---

#### Task #8: Create API Controller and Route
**Priority:** High
**Estimated Effort:** 3 hours
**Dependencies:** Task #5, Task #7
**Acceptance Criteria:**
- [ ] New controller method: `OpenAiController@analyzeTicket`
- [ ] Route: `POST /api/v1/openai/analyze-ticket`
- [ ] Middleware: `auth:sanctum`
- [ ] Request validation: title (required, min:10), message (required, min:20), priority, category
- [ ] Authorization: User must have access to specified website
- [ ] Rate limiting: 10 requests per hour per user
- [ ] Returns JSON response with suggestions
- [ ] Error handling with appropriate HTTP status codes
- [ ] Integration test covering happy path and error cases

**Files to Modify/Create:**
- `Modules/OpenAi/app/Http/Controllers/OpenAiController.php`
- `Modules/OpenAi/routes/api.php`
- `Modules/OpenAi/app/Http/Requests/AnalyzeTicketRequest.php` (validation)
- `Modules/OpenAi/tests/Feature/AnalyzeTicketApiTest.php`

---

#### Task #9: Implement Analytics Tracking
**Priority:** Medium
**Estimated Effort:** 3 hours
**Dependencies:** Task #4
**Acceptance Criteria:**
- [ ] TicketQualityAnalysis record created on each analysis
- [ ] Stores: original form data (redacted), suggestions, timestamp, customer, website
- [ ] Acceptance/dismissal tracked when form submitted
- [ ] Linked to final ticket record after creation
- [ ] Includes cost tracking (tokens used, estimated cost)
- [ ] Indexes optimize analytics queries
- [ ] Data retention: auto-delete after 90 days (scheduled job)

**Files to Create/Modify:**
- `Modules/OpenAi/app/Jobs/TrackTicketQualityAnalysis.php`
- `Modules/OpenAi/app/Jobs/PruneOldAnalyses.php`
- `Modules/OpenAi/app/Console/Kernel.php` (schedule pruning job)

---

### ✅ Phase 3: Frontend Integration (Week 3) - 5 days

#### Task #10: Create TypeScript Interfaces
**Priority:** High
**Estimated Effort:** 1 hour
**Dependencies:** None
**Acceptance Criteria:**
- [ ] `TicketSuggestion` interface defined
- [ ] `TicketQualityAnalysis` interface defined
- [ ] `PlatformContext` interface defined
- [ ] `AnalyzeTicketRequest` interface defined
- [ ] `AnalyzeTicketResponse` interface defined
- [ ] Interfaces exported from central types file
- [ ] JSDoc comments on all interfaces

**Files to Create:**
- `resources/js/types/ticket-quality.ts`

---

#### Task #11: Create TicketQualitySuggestions Component
**Priority:** High
**Estimated Effort:** 6 hours
**Dependencies:** Task #10
**Acceptance Criteria:**
- [ ] React component accepts: `suggestions`, `onAccept`, `onDismiss`, `onAcceptAll`, `onClose`
- [ ] Suggestions grouped by severity (High → Medium → Low)
- [ ] Each suggestion shows: severity badge, field, message, suggestion text
- [ ] "Apply" button for auto-applicable suggestions
- [ ] "Dismiss" button on each suggestion
- [ ] "Accept All" button applies all auto-applicable
- [ ] "Close" button dismisses modal without changes
- [ ] Overall quality score displayed with color-coded badge
- [ ] Smooth animations for apply/dismiss actions
- [ ] Responsive design (mobile-friendly)
- [ ] Accessibility: keyboard navigation, ARIA labels

**Files to Create:**
- `resources/js/components/ticket-quality-suggestions.tsx`

---

#### Task #12: Create API Action for Ticket Analysis
**Priority:** High
**Estimated Effort:** 2 hours
**Dependencies:** Task #8
**Acceptance Criteria:**
- [ ] API action function: `analyzeTicket(ticketData, websiteId)`
- [ ] Posts to `/api/v1/openai/analyze-ticket`
- [ ] Returns typed `TicketQualityAnalysis` response
- [ ] Handles errors with user-friendly messages
- [ ] Loading state management
- [ ] Retry logic for network failures (max 2 retries)
- [ ] Timeout after 15 seconds
- [ ] TypeScript types for request/response

**Files to Create:**
- `resources/js/actions/Modules/OpenAi/Http/Controllers/OpenAiController.ts`

---

#### Task #13: Update Create Ticket Form with "Get Suggestions" Button
**Priority:** High
**Estimated Effort:** 4 hours
**Dependencies:** Task #11, Task #12
**Acceptance Criteria:**
- [ ] "Get AI Suggestions" button added below form
- [ ] Button icon: ✨ sparkle
- [ ] Button disabled until title >10 chars AND message >20 chars
- [ ] Clicking button calls analyzeTicket API action
- [ ] Loading state shown during API call (spinner in button)
- [ ] On success, opens TicketQualitySuggestions component
- [ ] On error, shows toast notification with error message
- [ ] Button shows request count (e.g., "2/3 requests used")
- [ ] After 3 requests, button disabled with tooltip explanation
- [ ] Analytics event fired on click

**Files to Modify:**
- `resources/js/pages/tickets/create.tsx`

---

#### Task #14: Implement Suggestion Application Logic
**Priority:** High
**Estimated Effort:** 3 hours
**Dependencies:** Task #13
**Acceptance Criteria:**
- [ ] Accepting a suggestion updates corresponding form field
- [ ] Auto-applicable suggestions modify field values directly
- [ ] Manual suggestions show in tooltip/helper text
- [ ] "Accept All" applies all auto-applicable suggestions sequentially
- [ ] Applied suggestions highlighted in form (e.g., green border briefly)
- [ ] Undo functionality (Ctrl+Z reverts last applied suggestion)
- [ ] Form validation re-runs after suggestions applied
- [ ] Analytics track which suggestions were accepted

**Files to Modify:**
- `resources/js/pages/tickets/create.tsx`

---

#### Task #15: Implement Pre-Submit Quality Check
**Priority:** Medium
**Estimated Effort:** 4 hours
**Dependencies:** Task #14
**Acceptance Criteria:**
- [ ] On "Submit" button click, check if analysis already requested
- [ ] If not requested, run analysis in background
- [ ] If quality score <60, show interstitial modal
- [ ] Interstitial shows top 3 high-severity suggestions
- [ ] Two buttons: "Review Suggestions" (opens full panel), "Submit Anyway"
- [ ] If score >=60 OR already reviewed, submit immediately
- [ ] Analytics track bypass rate ("Submit Anyway" clicks)
- [ ] Max 1 interstitial per submission attempt (no loops)
- [ ] Loading state during analysis (submit button shows spinner)

**Files to Modify:**
- `resources/js/pages/tickets/create.tsx`
- `resources/js/components/ticket-quality-interstitial.tsx` (new component)

---

### ✅ Phase 4: Settings & Configuration (Week 4) - 3 days

#### Task #16: Add Organisation Settings Configuration
**Priority:** Medium
**Estimated Effort:** 3 hours
**Dependencies:** None
**Acceptance Criteria:**
- [ ] Settings added to OpenAI module config: `ticket_quality_assistant_status`, `ticket_quality_auto_check`, `ticket_quality_min_score`, `ticket_quality_model`
- [ ] Settings appear in organisation settings UI
- [ ] Toggle switches for boolean settings
- [ ] Slider for min score (0-100)
- [ ] Dropdown for model selection (with cost info in tooltip)
- [ ] Settings saved to organisation_settings table
- [ ] Settings cached for performance
- [ ] Backend respects settings (feature toggle works)

**Files to Modify:**
- `Modules/OpenAi/config/config.php`
- Organisation settings UI (wherever that is managed)

---

#### Task #17: Create Analytics Dashboard
**Priority:** Medium
**Estimated Effort:** 6 hours
**Dependencies:** Task #9
**Acceptance Criteria:**
- [ ] Dashboard page: `/admin/openai/analytics/ticket-quality`
- [ ] Metrics displayed: request rate, acceptance rate, bypass rate, quality score distribution, cost per ticket
- [ ] Date range filter (last 7/30/90 days)
- [ ] Per-organisation breakdown (for super admins)
- [ ] Per-platform comparison chart
- [ ] Cost tracking with monthly spend visualization
- [ ] Alert banner if cost >$500/month
- [ ] Export to CSV functionality
- [ ] Responsive charts (using Chart.js or similar)

**Files to Create:**
- `Modules/OpenAi/app/Http/Controllers/AnalyticsController.php`
- `resources/js/pages/admin/openai/analytics.tsx`
- `Modules/OpenAi/routes/web.php` (add route)

---

#### Task #18: Implement Cost Monitoring and Alerts
**Priority:** High
**Estimated Effort:** 3 hours
**Dependencies:** Task #9
**Acceptance Criteria:**
- [ ] Track token usage per analysis in database
- [ ] Calculate cost: (input_tokens * $0.01/1K) + (output_tokens * $0.03/1K) for GPT-4-turbo
- [ ] Daily aggregation job sums up costs per organisation
- [ ] Alert email sent if daily cost >$50
- [ ] Alert email sent if monthly cost >$500
- [ ] Dashboard shows real-time cost tracking
- [ ] Admin can set custom cost alert thresholds
- [ ] Graceful handling when OpenAI API returns usage data

**Files to Create:**
- `Modules/OpenAi/app/Jobs/CalculateDailyOpenAiCosts.php`
- `Modules/OpenAi/app/Notifications/HighOpenAiCostAlert.php`
- `Modules/OpenAi/app/Console/Kernel.php` (schedule job)

---

#### Task #19: Create Documentation for Admins
**Priority:** Medium
**Estimated Effort:** 3 hours
**Dependencies:** All previous tasks
**Acceptance Criteria:**
- [ ] Documentation covers: feature overview, how to enable, how to configure platform info, cost implications
- [ ] Screenshots of UI components
- [ ] Troubleshooting section (common issues)
- [ ] FAQ (Why is this useful? How much does it cost? Can users bypass it?)
- [ ] Markdown format for easy updates
- [ ] Accessible from admin dashboard (link to docs)

**Files to Create:**
- `docs/ACTIVE/TICKET_QUALITY_ASSISTANT_ADMIN_GUIDE.md`

---

### ✅ Phase 5: Testing & Refinement (Week 5) - 5 days

#### Task #20: Comprehensive End-to-End Testing
**Priority:** High
**Estimated Effort:** 8 hours
**Dependencies:** All Phase 3 tasks
**Acceptance Criteria:**
- [ ] Test case: Request suggestions with valid ticket data → receive suggestions
- [ ] Test case: Apply auto-applicable suggestion → form field updates
- [ ] Test case: Dismiss suggestion → suggestion removed from list
- [ ] Test case: Submit with low quality score → interstitial shows
- [ ] Test case: Submit with high quality score → no interstitial
- [ ] Test case: Submit anyway → ticket created without changes
- [ ] Test case: Rate limiting → 4th request shows error
- [ ] Test case: Platform-specific suggestions (test each platform)
- [ ] Test case: No platform set → generic suggestions
- [ ] Test case: API error → graceful error message
- [ ] Test case: Feature disabled → button doesn't appear
- [ ] Test case: Analytics tracking → records created correctly

**Files to Create:**
- `Modules/OpenAi/tests/Feature/TicketQualityE2ETest.php`
- E2E test scripts (Cypress or similar if using)

---

#### Task #21: Beta Testing with Pilot Customers
**Priority:** High
**Estimated Effort:** 16 hours (over 1 week)
**Dependencies:** Task #20
**Acceptance Criteria:**
- [ ] 3-5 pilot customers identified and onboarded
- [ ] Platform information configured for pilot customer websites
- [ ] Feature enabled for pilot organisations
- [ ] Feedback form created for pilot users
- [ ] Weekly check-ins scheduled
- [ ] Beta period: 1 week minimum
- [ ] Metrics collected: usage rate, acceptance rate, feedback sentiment
- [ ] Feedback documented in shared document
- [ ] At least 50 tickets created during beta period

**Deliverable:** Beta feedback report document

---

#### Task #22: Prompt Refinement Based on Feedback
**Priority:** High
**Estimated Effort:** 6 hours
**Dependencies:** Task #21
**Acceptance Criteria:**
- [ ] Analyze beta feedback for prompt quality issues
- [ ] Identify top 3 prompt improvement areas
- [ ] Refine system prompt based on findings
- [ ] Test refined prompt with 20+ sample tickets
- [ ] Compare old vs new prompt output quality
- [ ] Deploy refined prompt to staging
- [ ] Re-test with pilot customers
- [ ] Document prompt version history

**Files to Modify:**
- `Modules/OpenAi/app/Services/TicketQualityService.php` (prompt updates)

---

#### Task #23: Performance Optimization
**Priority:** Medium
**Estimated Effort:** 4 hours
**Dependencies:** Task #20
**Acceptance Criteria:**
- [ ] Profile API endpoint response time (target <5s)
- [ ] Optimize database queries (eager loading, indexes)
- [ ] Implement caching for common patterns (if applicable)
- [ ] Optimize PII redaction (compile regex once)
- [ ] Minimize payload size (gzip compression)
- [ ] Test under load (50 concurrent requests)
- [ ] Add performance monitoring (APM)

**Files to Modify:**
- Various service and controller files based on profiling results

---

#### Task #24: Security Audit
**Priority:** High
**Estimated Effort:** 4 hours
**Dependencies:** Task #20
**Acceptance Criteria:**
- [ ] Verify PII redaction covers all sensitive patterns
- [ ] Test authorization (user can't analyze other customer's tickets)
- [ ] Test rate limiting (can't bypass 3-request limit)
- [ ] Verify API key not exposed in frontend
- [ ] Test XSS prevention (malicious suggestions escaped)
- [ ] Test CSRF protection on API endpoints
- [ ] Review OpenAI API data retention policy
- [ ] Document security considerations for compliance

**Deliverable:** Security audit report document

---

### ✅ Phase 6: Rollout & Documentation (Week 6) - 3 days

#### Task #25: Production Deployment
**Priority:** High
**Estimated Effort:** 4 hours
**Dependencies:** All Phase 5 tasks
**Acceptance Criteria:**
- [ ] Code merged to main branch (approved PR)
- [ ] Database migrations run on production
- [ ] Environment variables configured (OpenAI API keys)
- [ ] Feature toggle initially set to OFF
- [ ] Deployment plan documented (rollback procedure)
- [ ] Smoke tests pass on production
- [ ] Monitoring alerts configured (error rates, API latency)
- [ ] Rollback tested on staging

**Deliverable:** Deployment checklist completed

---

#### Task #26: Create Customer-Facing Documentation
**Priority:** High
**Estimated Effort:** 3 hours
**Dependencies:** Task #19
**Acceptance Criteria:**
- [ ] Help article: "How to Write Better Support Tickets"
- [ ] Help article: "Using AI Suggestions for Tickets"
- [ ] Screenshots and GIFs showing feature in action
- [ ] FAQ section (common questions)
- [ ] Tips for each platform type
- [ ] Links embedded in UI (tooltip or help icon)
- [ ] Accessible from customer portal help section

**Files to Create:**
- Help center articles (wherever those are managed)

---

#### Task #27: Support Team Training
**Priority:** High
**Estimated Effort:** 2 hours
**Dependencies:** Task #26
**Acceptance Criteria:**
- [ ] Training session delivered to support team (1 hour)
- [ ] Training covers: feature overview, benefits, how to interpret improved tickets, how to configure platform settings
- [ ] Demo of feature in action
- [ ] Q&A session
- [ ] Training materials shared (slides, recording)
- [ ] Support team feedback collected
- [ ] Internal FAQ created for support team

**Deliverable:** Training recording and materials

---

#### Task #28: Gradual Rollout (10% → 50% → 100%)
**Priority:** High
**Estimated Effort:** 8 hours (spread over 2 weeks)
**Dependencies:** Task #25, Task #27
**Acceptance Criteria:**
- [ ] Week 1: Enable for 10% of organisations (small pilot)
- [ ] Monitor metrics: error rate, API latency, usage rate, customer feedback
- [ ] Week 2: Enable for 50% if metrics look good
- [ ] Continue monitoring, address any issues
- [ ] Week 3: Enable for 100% (full rollout)
- [ ] Announce feature via email to all customers
- [ ] Monitor for 1 week post-100% rollout
- [ ] Incident response plan ready for rollback if needed

**Deliverable:** Rollout status report

---

#### Task #29: Establish Feedback Loop and Iteration Plan
**Priority:** Medium
**Estimated Effort:** 2 hours
**Dependencies:** Task #28
**Acceptance Criteria:**
- [ ] Feedback mechanism embedded in UI ("Was this helpful?" on suggestions)
- [ ] Weekly review of analytics and feedback
- [ ] Monthly prompt refinement based on data
- [ ] Quarterly feature review with stakeholders
- [ ] Roadmap for v2 features (e.g., custom fields analysis, multi-language)
- [ ] Process documented for continuous improvement

**Deliverable:** Iteration plan document

---

#### Task #30: Baseline Metrics Reporting
**Priority:** Medium
**Estimated Effort:** 3 hours
**Dependencies:** Task #28 (after 1 month of full rollout)
**Acceptance Criteria:**
- [ ] Generate report comparing baseline vs current metrics
- [ ] Report includes: follow-up message reduction, resolution time, adoption rate, acceptance rate
- [ ] Visualizations (charts) for easy understanding
- [ ] Success criteria evaluation (did we hit targets?)
- [ ] Recommendations for next steps
- [ ] Present to stakeholders

**Deliverable:** Success metrics report

---

## 9. GitHub Issue Links

All tasks have been created as GitHub issues. Here are the links organized by phase:

### Phase 1: Foundation (Week 1)
- [#1 - Task 1: Create Database Migrations for Platform Tracking](https://github.com/nathanchick/agency-portal-v2/issues/1)
- [#2 - Task 2: Create Platform Settings Infrastructure](https://github.com/nathanchick/agency-portal-v2/issues/2)
- [#3 - Task 3: Create Admin UI for Platform Configuration](https://github.com/nathanchick/agency-portal-v2/issues/3)
- [#4 - Task 4: Create TicketQualityAnalysis Model](https://github.com/nathanchick/agency-portal-v2/issues/4)

### Phase 2: Backend AI Service (Week 2)
- [#5 - Task 5: Create TicketQualityService Class](https://github.com/nathanchick/agency-portal-v2/issues/5)
- [#6 - Task 6: Implement Prompt Engineering for GPT-4](https://github.com/nathanchick/agency-portal-v2/issues/6)
- [#7 - Task 7: Enhance OpenAiService with GPT-4 Support](https://github.com/nathanchick/agency-portal-v2/issues/7)
- [#8 - Task 8: Create API Controller and Route](https://github.com/nathanchick/agency-portal-v2/issues/8)
- [#9 - Task 9: Implement Analytics Tracking](https://github.com/nathanchick/agency-portal-v2/issues/9)

### Phase 3: Frontend Integration (Week 3)
- [#10 - Task 10: Create TypeScript Interfaces](https://github.com/nathanchick/agency-portal-v2/issues/10)
- [#11 - Task 11: Create TicketQualitySuggestions Component](https://github.com/nathanchick/agency-portal-v2/issues/11)
- [#12 - Task 12: Create API Action for Ticket Analysis](https://github.com/nathanchick/agency-portal-v2/issues/12)
- [#13 - Task 13: Update Create Ticket Form with Get Suggestions Button](https://github.com/nathanchick/agency-portal-v2/issues/13)
- [#14 - Task 14: Implement Suggestion Application Logic](https://github.com/nathanchick/agency-portal-v2/issues/14)
- [#15 - Task 15: Implement Pre-Submit Quality Check](https://github.com/nathanchick/agency-portal-v2/issues/15)

### Phase 4: Settings & Configuration (Week 4)
- [#16 - Task 16: Add Organisation Settings Configuration](https://github.com/nathanchick/agency-portal-v2/issues/16)
- [#17 - Task 17: Create Analytics Dashboard](https://github.com/nathanchick/agency-portal-v2/issues/17)
- [#18 - Task 18: Implement Cost Monitoring and Alerts](https://github.com/nathanchick/agency-portal-v2/issues/18)
- [#19 - Task 19: Create Documentation for Admins](https://github.com/nathanchick/agency-portal-v2/issues/19)

### Phase 5: Testing & Refinement (Week 5)
- [#20 - Task 20: Comprehensive End-to-End Testing](https://github.com/nathanchick/agency-portal-v2/issues/20)
- [#21 - Task 21: Beta Testing with Pilot Customers](https://github.com/nathanchick/agency-portal-v2/issues/21)
- [#22 - Task 22: Prompt Refinement Based on Feedback](https://github.com/nathanchick/agency-portal-v2/issues/22)
- [#23 - Task 23: Performance Optimization](https://github.com/nathanchick/agency-portal-v2/issues/23)
- [#24 - Task 24: Security Audit](https://github.com/nathanchick/agency-portal-v2/issues/24)

### Phase 6: Rollout & Documentation (Week 6)
- [#25 - Task 25: Production Deployment](https://github.com/nathanchick/agency-portal-v2/issues/25)
- [#26 - Task 26: Create Customer-Facing Documentation](https://github.com/nathanchick/agency-portal-v2/issues/26)
- [#27 - Task 27: Support Team Training](https://github.com/nathanchick/agency-portal-v2/issues/27)
- [#28 - Task 28: Gradual Rollout (10% → 50% → 100%)](https://github.com/nathanchick/agency-portal-v2/issues/28)
- [#29 - Task 29: Establish Feedback Loop and Iteration Plan](https://github.com/nathanchick/agency-portal-v2/issues/29)
- [#30 - Task 30: Baseline Metrics Reporting](https://github.com/nathanchick/agency-portal-v2/issues/30)

## Appendices

### Appendix A: Sample Ticket Analysis

**Input:**
```json
{
    "title": "Login problem",
    "message": "I can't login",
    "priority": "high",
    "category": "technical_issue",
    "website_id": "uuid-123",
    "platform": "magento2",
    "platform_version": "2.4.6"
}
```

**Output:**
```json
{
    "overallScore": 35,
    "suggestions": [
        {
            "category": "missing_info",
            "field": "title",
            "severity": "high",
            "message": "Your title is too vague",
            "suggestion": "Include which login (customer, admin) and what error you see. Example: 'Admin login returns 404 error'",
            "autoApplicable": false
        },
        {
            "category": "missing_info",
            "field": "message",
            "severity": "high",
            "message": "No details provided about the problem",
            "suggestion": "Please include:\n- Which login page (customer or admin)?\n- What happens when you try to login (error message, blank page, etc.)?\n- When did this start?\n- What browser are you using?",
            "autoApplicable": false
        },
        {
            "category": "technical_details",
            "field": "message",
            "severity": "medium",
            "message": "Missing Magento-specific troubleshooting info",
            "suggestion": "For Magento 2 login issues, please check:\n- var/log/exception.log for errors\n- Browser console for JavaScript errors\n- Have you cleared cache recently? (php bin/magento cache:clean)",
            "autoApplicable": false
        },
        {
            "category": "priority",
            "field": "priority",
            "severity": "low",
            "message": "Priority may be too high",
            "suggestion": "High priority is for issues affecting all customers or critical business functions. If only you can't login, consider 'Medium' priority.",
            "autoApplicable": true
        }
    ],
    "platformContext": {
        "platform": "magento2",
        "version": "2.4.6",
        "relevantInfo": [
            "Check var/log/exception.log for backend errors",
            "Check browser console for frontend errors",
            "Verify admin URL is correct (may have changed)",
            "Clear Magento cache: php bin/magento cache:clean"
        ]
    }
}
```

### Appendix B: Cost Estimation

**OpenAI API Pricing (GPT-4-turbo):**
- Input: $0.01 per 1K tokens
- Output: $0.03 per 1K tokens

**Average Token Usage per Analysis:**
- System prompt: 400 tokens
- User ticket data: 200 tokens
- Response: 600 tokens
- **Total:** 1200 tokens (400 input + 800 output)

**Cost per Analysis:**
- Input: 600 tokens × $0.01/1000 = $0.006
- Output: 600 tokens × $0.03/1000 = $0.018
- **Total: ~$0.024 per analysis**

**Monthly Projections:**
- 100 tickets/month × 40% adoption × 1.5 analyses per ticket = 60 analyses
- Cost: 60 × $0.024 = **$1.44/month per customer organisation**
- 50 organisations = **$72/month total**

**Note:** Actual costs may vary based on prompt complexity and response length.

### Appendix C: Alternatives Considered

1. **Rule-Based System** (No AI)
   - Pros: No API cost, predictable, fast
   - Cons: Rigid, not contextual, high maintenance, can't understand natural language
   - **Decision:** Rejected - not sophisticated enough for quality evaluation

2. **Self-Hosted LLM** (Llama 3, Mistral)
   - Pros: No per-request cost, data stays internal
   - Cons: Infrastructure cost, maintenance overhead, lower quality than GPT-4
   - **Decision:** Deferred to v2 - OpenAI for MVP, revisit if costs too high

3. **GPT-3.5-turbo Instead of GPT-4**
   - Pros: 10x cheaper (~$0.002 per analysis)
   - Cons: Less accurate, more hallucinations, worse at structured output
   - **Decision:** Use GPT-4 for MVP, offer GPT-3.5 as cost-saving option in settings

4. **Post-Submission Analysis** (After ticket created)
   - Pros: Simpler implementation, no impact on submission flow
   - Cons: Misses the goal - tickets already submitted without improvements
   - **Decision:** Rejected - must be pre-submission to be effective

---

**End of PRD**