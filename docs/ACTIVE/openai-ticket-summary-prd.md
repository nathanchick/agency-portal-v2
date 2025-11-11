# Product Requirements Document: OpenAI Ticket Summary Integration

**Version:** 1.0
**Date:** 2025-11-10
**Status:** Planning
**Author:** AI Product Planning

---

## 1. Executive Summary

### Problem Statement
Organization users viewing tickets need to quickly understand the context and current state of a ticket conversation without reading through potentially dozens of messages. This is especially challenging when tickets have long response histories or when users are assigned to tickets they haven't been following.

### Proposed Solution
Integrate OpenAI's API to automatically generate intelligent summaries of ticket conversations. The summary will appear prominently above the responses section on the ticket detail page, providing a concise overview of:
- The original issue/request
- Key developments and changes throughout the conversation
- Current status and next steps
- Important context based on chronological sequence

### Key Benefits
- **Time Savings**: Users can grasp ticket context in seconds instead of minutes
- **Better Handoffs**: New assignees can quickly get up to speed
- **Improved Decision Making**: Clear summaries help prioritize and triage tickets
- **Enhanced Customer Service**: Faster understanding leads to better responses

### Risks
- **API Costs**: Each summary generation incurs OpenAI API costs
- **Data Privacy**: Ticket content is sent to OpenAI's servers
- **API Latency**: Initial summary generation may take 2-5 seconds
- **Quality Variance**: AI summaries may occasionally miss nuance or context

---

## 2. Technical Analysis

### Current Architecture Assessment

#### Existing Systems
1. **OpenAI Module**: Basic module structure exists (`Modules/OpenAi/`)
   - Config file with organization-level settings
   - API key storage via encrypted settings
   - No service layer or OpenAI client integration yet

2. **Ticket Module**: Mature module with complete CRUD operations
   - Models: `Ticket`, `Message`, `Category`, `Label`, `TicketStatus`
   - Controller: `TicketController@show` renders ticket detail page
   - Frontend: React/Inertia.js ticket show page (`resources/js/pages/tickets/show.tsx`)
   - Database: `tickets` table and `ticket_messages` table with chronological data

3. **Module Settings Service**: Established pattern for configuration
   - Organization-level settings with encrypted field support
   - Already configured for OpenAI API key storage

#### Data Flow (Current)
```
User → tickets.show route → TicketController@show → loads ticket with messages → Inertia renders show.tsx
```

#### Data Flow (Proposed)
```
User → tickets.show route → TicketController@show →
  ↓
  checks if summary exists and is current →
  ↓
  if outdated/missing: calls OpenAiSummaryService → generates summary → saves to DB
  ↓
  loads ticket with messages + summary → Inertia renders show.tsx with summary card
```

### Proposed Changes

#### Backend Changes
1. **New Migration**: `ticket_summaries` table
2. **New Model**: `TicketSummary` model
3. **New Service**: `OpenAiService` for API communication
4. **New Service**: `TicketSummaryService` for summary management
5. **Update Controller**: Add summary logic to `TicketController@show`
6. **New Route/Controller**: API endpoint for manual summary regeneration
7. **Event Listener**: Regenerate summary when messages are added
8. **Package Installation**: Install `openai-php/client` via Composer

#### Frontend Changes
1. **Update `show.tsx`**: Add summary card component above responses
2. **New Component**: `TicketSummaryCard` with loading/error states
3. **API Integration**: Handle manual refresh functionality

#### Database Schema
```sql
ticket_summaries:
  - id (uuid, primary)
  - ticket_id (uuid, foreign key)
  - summary (text)
  - message_count (integer) -- number of messages when generated
  - last_message_id (uuid, nullable) -- ID of last message included
  - generated_at (timestamp)
  - created_at (timestamp)
  - updated_at (timestamp)

  Indexes:
  - unique index on ticket_id
  - index on last_message_id
```

### Dependency Mapping

**External Dependencies:**
- `openai-php/client` (composer package)
- OpenAI API account and API key

**Internal Dependencies:**
- Ticket module (existing)
- Organization settings (existing)
- Message creation flow (to trigger regeneration)

**Service Dependencies:**
```
TicketController → TicketSummaryService → OpenAiService → OpenAI API
                                       ↓
                                   TicketSummary Model
```

### Performance Considerations

1. **Caching Strategy**
   - Summary stored in database, not regenerated on every page load
   - Cache invalidation: only when new message is added
   - Initial page load: check if summary exists, generate if missing (async acceptable)

2. **API Call Optimization**
   - Only call OpenAI when: (a) no summary exists, or (b) new message added since last summary
   - Rate limiting: leverage organization's API key quota
   - Fallback: if API fails, show "Summary unavailable" instead of breaking page

3. **Query Optimization**
   - Eager load summary with ticket in single query
   - Index on `ticket_id` ensures fast lookup

4. **Expected Performance**
   - Summary generation: 2-5 seconds (OpenAI API call)
   - Page load with cached summary: <100ms additional overhead
   - Database storage: ~500-1000 characters per summary (minimal)

---

## 3. Implementation Plan

### Phase 1: Foundation (Backend Core)
**Goal**: Set up OpenAI integration and summary storage

1. Install `openai-php/client` package
2. Create migration for `ticket_summaries` table
3. Create `TicketSummary` model
4. Create `OpenAiService` with basic chat completion functionality
5. Create `TicketSummaryService` with generate/retrieve logic
6. Add unit tests for services

**Milestone**: Can generate and store summaries programmatically

### Phase 2: Controller Integration
**Goal**: Integrate summary generation into ticket display flow

1. Update `TicketController@show` to load/generate summary
2. Pass summary data to Inertia view
3. Create API endpoint for manual summary refresh (`POST /tickets/{ticket}/summary/regenerate`)
4. Add authorization checks (org users only)

**Milestone**: Summary data available in frontend props

### Phase 3: Frontend Implementation
**Goal**: Display summaries in the UI

1. Update `show.tsx` to render summary card
2. Create `TicketSummaryCard` component with:
   - Summary text display
   - Loading state
   - Error state
   - Manual refresh button
   - Timestamp of generation
3. Style summary card to be visually distinct
4. Add TypeScript types for summary data

**Milestone**: Summaries visible on ticket detail page

### Phase 4: Auto-Regeneration
**Goal**: Automatically update summaries when tickets change

1. Create event listener for `MessageCreated` event
2. Invalidate/regenerate summary when new message added
3. Handle race conditions (multiple messages added quickly)
4. Add queue job for background summary generation (optional optimization)

**Milestone**: Summaries stay current automatically

### Phase 5: Polish & Optimization
**Goal**: Production-ready with error handling and UX improvements

1. Add comprehensive error handling (API failures, rate limits)
2. Implement retry logic with exponential backoff
3. Add admin settings for:
   - Enable/disable summary feature per organization
   - Model selection (GPT-3.5-turbo vs GPT-4)
   - Summary length preference
4. Add analytics/logging for summary generation
5. Create migration to backfill summaries for existing tickets (optional)
6. Performance testing and optimization

**Milestone**: Production ready

---

## 4. Risk Assessment

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| OpenAI API rate limits reached | Medium | High | Implement exponential backoff, queue system, and clear error messages to users |
| API response time too slow | Medium | Medium | Generate asynchronously, show loading state, cache aggressively |
| Poor summary quality | Low | Medium | Fine-tune prompts, allow manual regeneration, gather user feedback |
| Database migration conflicts | Low | Low | Test migration thoroughly, use descriptive naming |
| Large tickets exceed token limits | Medium | Medium | Truncate old messages, summarize in chunks, or skip very large tickets |

### Timeline Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| OpenAI package API changes | Low | Medium | Pin package version, review updates before upgrading |
| Underestimated complexity | Medium | Medium | Start with MVP, iterate based on learnings |
| Frontend integration delays | Low | Low | Mock data for frontend development parallel to backend |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| High API costs | Medium | Medium | Monitor usage, implement cost alerts, make feature opt-in per org |
| Data privacy concerns | Medium | High | Add clear disclosure, ensure compliance with data policies, allow org-level opt-out |
| User adoption is low | Low | Low | A/B test, gather feedback, iterate on UX |

### Data Privacy & Compliance Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| PII/sensitive data sent to OpenAI | High | Critical | Implement PII redaction service (Task #21), scrub emails, phones, credit cards before API calls |
| GDPR non-compliance | Medium | Critical | Update privacy policy, obtain DPA from OpenAI, implement org opt-in consent (Task #22) |
| Data retention by OpenAI | Medium | High | Enable zero-data-retention mode, document data handling procedures (Task #23) |
| Customer passwords in tickets | Low | High | Redaction service catches common password patterns, user education |
| Third-party data breach | Low | High | Monitor OpenAI security advisories, have incident response plan, maintain audit logs |
| Right to erasure conflicts | Medium | Medium | Document that summaries can be deleted, but API calls to OpenAI are immediate and final |
| International data transfers | High | Medium | Ensure OpenAI DPA includes Standard Contractual Clauses for EU data |

**CRITICAL**: Feature must be **opt-in** at organization level with clear disclosure about data sharing with OpenAI. Organizations handling regulated data (healthcare, financial) should carefully evaluate before enabling.

---

## 5. Task List

### Backend Tasks

#### Task #1: Install OpenAI PHP Client Package
**Priority**: High
**Estimated Effort**: XS (15 min)
**Dependencies**: None
**Acceptance Criteria**:
- [ ] `openai-php/client` installed via Composer
- [ ] Package version pinned in composer.json
- [ ] No conflicts with existing dependencies

---

#### Task #2: Create Ticket Summaries Database Migration
**Priority**: High
**Estimated Effort**: S (30 min)
**Dependencies**: None
**Acceptance Criteria**:
- [ ] Migration creates `ticket_summaries` table with all required columns
- [ ] Foreign key constraint on `ticket_id` references `tickets.id`
- [ ] Unique index on `ticket_id` to prevent duplicate summaries
- [ ] Index on `last_message_id` for performance
- [ ] Migration is reversible (down method drops table)

---

#### Task #3: Create TicketSummary Model
**Priority**: High
**Estimated Effort**: S (45 min)
**Dependencies**: Task #2
**Acceptance Criteria**:
- [ ] Model created at `Modules/Ticket/app/Models/TicketSummary.php`
- [ ] Relationship defined: `belongsTo(Ticket::class)`
- [ ] Fillable attributes defined
- [ ] Casts defined (generated_at as datetime)
- [ ] UUID trait applied

---

#### Task #4: Update Ticket Model with Summary Relationship
**Priority**: High
**Estimated Effort**: XS (15 min)
**Dependencies**: Task #3
**Acceptance Criteria**:
- [ ] `hasOne` relationship added to `Ticket` model
- [ ] Relationship named `summary()`
- [ ] Relationship properly typed for IDE support

---

#### Task #5: Create OpenAiService
**Priority**: High
**Estimated Effort**: M (2-3 hours)
**Dependencies**: Task #1
**Acceptance Criteria**:
- [ ] Service class created at `Modules/OpenAi/app/Services/OpenAiService.php`
- [ ] Constructor accepts organization to retrieve API key from settings
- [ ] Method `generateTicketSummary(Ticket $ticket): string` implemented
- [ ] Handles API authentication using org's encrypted API key
- [ ] Constructs prompt with ticket title, message, and all responses in chronological order
- [ ] Returns summary text from OpenAI response
- [ ] Throws descriptive exceptions on API errors
- [ ] Includes appropriate timeouts (30s)
- [ ] Uses gpt-3.5-turbo model (configurable)

---

#### Task #6: Create TicketSummaryService
**Priority**: High
**Estimated Effort**: M (2-3 hours)
**Dependencies**: Task #3, Task #5
**Acceptance Criteria**:
- [ ] Service class created at `Modules/Ticket/app/Services/TicketSummaryService.php`
- [ ] Method `getSummary(Ticket $ticket): ?TicketSummary` retrieves or generates
- [ ] Method `shouldRegenerate(Ticket $ticket): bool` checks if summary is stale
- [ ] Method `regenerateSummary(Ticket $ticket): TicketSummary` forces new summary
- [ ] Tracks `message_count` and `last_message_id` for cache invalidation
- [ ] Handles cases where OpenAI module is disabled for org
- [ ] Returns null gracefully if API key not configured
- [ ] Logs summary generation events

---

#### Task #7: Update TicketController@show to Load Summary
**Priority**: High
**Estimated Effort**: S (1 hour)
**Dependencies**: Task #6
**Acceptance Criteria**:
- [ ] `show()` method calls `TicketSummaryService::getSummary()`
- [ ] Summary passed to Inertia view in props
- [ ] Summary generation failures don't break page load (null/error handling)
- [ ] Eager loads summary relationship with ticket query
- [ ] Only attempts summary for org users, not customer portal

---

#### Task #8: Create Summary Regeneration API Endpoint
**Priority**: Medium
**Estimated Effort**: M (1-2 hours)
**Dependencies**: Task #6
**Acceptance Criteria**:
- [ ] Route added: `POST /tickets/{ticket}/summary/regenerate`
- [ ] Controller method created in `TicketController`
- [ ] Method calls `TicketSummaryService::regenerateSummary()`
- [ ] Returns JSON response with new summary
- [ ] Handles errors gracefully (API failures, missing config)
- [ ] Requires authentication and org role (Admin|Manager|User)
- [ ] Validates ticket belongs to user's organization

---

#### Task #9: Add Event Listener for Automatic Regeneration
**Priority**: Medium
**Estimated Effort**: M (2 hours)
**Dependencies**: Task #6
**Acceptance Criteria**:
- [ ] Event listener created for message creation
- [ ] Listener triggers summary regeneration when new message added
- [ ] Handles concurrent messages gracefully (doesn't create duplicate summaries)
- [ ] Runs asynchronously (queued job) to not slow down message creation
- [ ] Includes error handling (failed jobs don't break message creation)

---

#### Task #10: Add Service Tests for OpenAiService
**Priority**: Medium
**Estimated Effort**: M (2 hours)
**Dependencies**: Task #5
**Acceptance Criteria**:
- [ ] Unit tests created for `OpenAiService`
- [ ] Mocks OpenAI API responses
- [ ] Tests successful summary generation
- [ ] Tests API error handling
- [ ] Tests authentication failures
- [ ] Tests timeout handling
- [ ] Achieves >80% code coverage

---

#### Task #11: Add Service Tests for TicketSummaryService
**Priority**: Medium
**Estimated Effort**: M (2 hours)
**Dependencies**: Task #6
**Acceptance Criteria**:
- [ ] Unit tests created for `TicketSummaryService`
- [ ] Tests cache hit (existing valid summary)
- [ ] Tests cache miss (no summary exists)
- [ ] Tests stale detection (new messages added)
- [ ] Tests regeneration logic
- [ ] Achieves >80% code coverage

---

### Frontend Tasks

#### Task #12: Create TypeScript Types for Summary
**Priority**: High
**Estimated Effort**: XS (15 min)
**Dependencies**: None
**Acceptance Criteria**:
- [ ] Interface `TicketSummary` defined in `show.tsx` or shared types file
- [ ] Includes all fields: id, summary, message_count, generated_at
- [ ] Props interface updated to include `summary?: TicketSummary | null`

---

#### Task #13: Create TicketSummaryCard Component
**Priority**: High
**Estimated Effort**: M (2-3 hours)
**Dependencies**: Task #12
**Acceptance Criteria**:
- [ ] Component created with TypeScript
- [ ] Displays summary text with proper formatting
- [ ] Shows generation timestamp ("Summary generated X minutes ago")
- [ ] Includes manual refresh button
- [ ] Loading state while regenerating
- [ ] Error state if generation fails
- [ ] Collapsed/expanded state for long summaries (optional)
- [ ] Styled consistently with existing card components
- [ ] Accessible (proper ARIA labels)

---

#### Task #14: Integrate Summary Card into Ticket Show Page
**Priority**: High
**Estimated Effort**: S (1 hour)
**Dependencies**: Task #13
**Acceptance Criteria**:
- [ ] Summary card rendered ABOVE "Responses" section
- [ ] Only shown if summary exists
- [ ] Responsive design (mobile-friendly)
- [ ] Proper spacing and layout
- [ ] Handles null/undefined summary gracefully

---

#### Task #15: Implement Manual Refresh Functionality
**Priority**: Medium
**Estimated Effort**: S (1 hour)
**Dependencies**: Task #8, Task #13
**Acceptance Criteria**:
- [ ] Refresh button calls API endpoint to regenerate
- [ ] Shows loading spinner during regeneration
- [ ] Updates summary on success
- [ ] Displays error message on failure
- [ ] Disables button during loading
- [ ] Uses Inertia router for API call

---

### Testing & Documentation Tasks

#### Task #16: End-to-End Testing
**Priority**: Medium
**Estimated Effort**: L (3-4 hours)
**Dependencies**: All backend and frontend tasks
**Acceptance Criteria**:
- [ ] Test full flow: create ticket → add messages → view summary
- [ ] Test summary regeneration on new message
- [ ] Test manual refresh button
- [ ] Test error states (no API key, API failure)
- [ ] Test permissions (org users only)
- [ ] Test performance with large tickets (50+ messages)

---

#### Task #17: Create User Documentation
**Priority**: Low
**Estimated Effort**: S (1 hour)
**Dependencies**: Task #16
**Acceptance Criteria**:
- [ ] Document how to configure OpenAI API key
- [ ] Document summary feature for end users
- [ ] Add troubleshooting guide
- [ ] Include screenshots of summary card

---

### Compliance & Privacy Tasks

#### Task #21: Implement PII Redaction Service
**Priority**: High
**Estimated Effort**: L (3-4 hours)
**Dependencies**: Task #5 (OpenAiService)
**Acceptance Criteria**:
- [ ] Service class created: `Modules/OpenAi/app/Services/PiiRedactionService.php`
- [ ] Email detection and redaction (regex pattern-based, replace with [EMAIL])
- [ ] Phone number detection and redaction (multiple formats: US, UK, international)
- [ ] Credit card number detection (Luhn algorithm validation) and redaction
- [ ] Configurable redaction patterns via config file
- [ ] Redaction is reversible (original stored in DB, redacted version sent to API only)
- [ ] Unit tests with comprehensive PII examples (emails, phones, cards)
- [ ] Performance optimized (regex compilation cached)
- [ ] Documentation for adding custom redaction patterns

---

#### Task #22: Add Legal Compliance Layer
**Priority**: High
**Estimated Effort**: M (2-3 hours implementation; legal review separate)
**Dependencies**: None (can run in parallel)
**Acceptance Criteria**:
- [ ] Privacy policy document updated with OpenAI data sharing disclosure
- [ ] Terms of Service updated with AI feature terms and conditions
- [ ] Data Processing Agreement (DPA) reviewed and signed with OpenAI
- [ ] Sub-processor list updated to include OpenAI
- [ ] Compliance documentation stored in `/docs/legal/openai-integration.md`
- [ ] User-facing disclosure added to summary feature UI
- [ ] Organization opt-in consent flow implemented

---

#### Task #23: Zero-Data-Retention Configuration
**Priority**: High
**Estimated Effort**: S (1 hour)
**Dependencies**: Task #5 (OpenAiService)
**Acceptance Criteria**:
- [ ] OpenAI API client configured with zero-retention headers
- [ ] Documentation added for data retention policy in `/docs/compliance/`
- [ ] Verification test that OpenAI confirms zero-retention mode active
- [ ] Fallback handling if zero-retention mode unavailable
- [ ] Data handling procedures documented for audit purposes
- [ ] Audit logging implemented for all API calls with data payload size
- [ ] Monitoring alerts for retention policy changes

---

### Optional Enhancement Tasks

#### Task #24: Add Configuration UI for Summary Settings
**Priority**: Low
**Estimated Effort**: M (2-3 hours)
**Dependencies**: Task #7
**Acceptance Criteria**:
- [ ] Admin page to enable/disable summaries per org
- [ ] Option to select GPT model (3.5-turbo vs 4)
- [ ] Option for summary length (short/medium/long)
- [ ] Settings persisted in organization settings

---

#### Task #25: Backfill Summaries for Existing Tickets
**Priority**: Low
**Estimated Effort**: M (2 hours)
**Dependencies**: Task #6
**Acceptance Criteria**:
- [ ] Artisan command created: `ticket:generate-summaries`
- [ ] Command iterates through tickets without summaries
- [ ] Generates summaries in batches (rate limiting)
- [ ] Includes progress bar
- [ ] Skips tickets where org has no API key
- [ ] Can be safely interrupted and resumed

---

#### Task #26: Add Analytics and Monitoring
**Priority**: Low
**Estimated Effort**: S (1-2 hours)
**Dependencies**: Task #9
**Acceptance Criteria**:
- [ ] Log summary generation events (count, duration, cost estimate)
- [ ] Track API failures and rate limits
- [ ] Dashboard or report for org admins showing usage
- [ ] Alerts for high API costs or repeated failures

---

## 6. Success Metrics

### Technical Metrics
- Summary generation success rate: >95%
- Average generation time: <5 seconds
- Cache hit rate: >90% (summaries served from cache)
- Page load performance: <100ms additional overhead with cached summary

### User Adoption Metrics
- % of ticket views where summary is displayed: target >80%
- Manual refresh usage: target <5% (indicates automatic updates working)
- Time to first response on tickets: reduce by 20% (users understand context faster)

### Cost Metrics
- Average cost per summary: ~$0.001-0.005 (depending on ticket size and model)
- Monthly API cost per organization: monitor and alert if exceeds threshold

---

## 7. Future Enhancements (Out of Scope for V1)

1. **Multi-language Support**: Detect ticket language and generate summary in same language
2. **Action Item Extraction**: Identify and highlight action items from conversation
3. **Sentiment Analysis**: Indicate customer sentiment (happy, frustrated, neutral)
4. **Smart Categorization**: AI-suggested categories and labels based on content
5. **Related Tickets**: Find similar tickets using embeddings
6. **Response Suggestions**: Suggest draft responses based on ticket context
7. **Custom Prompts**: Allow organizations to customize summary prompt templates
8. **Summary History**: Track changes in summary over time

---

## Appendix A: Example Prompt for OpenAI

```
You are a helpful assistant that summarizes customer support ticket conversations.

Given the following ticket information, create a concise summary that helps support staff quickly understand the situation:

TICKET DETAILS:
- Title: {ticket.title}
- Status: {ticket.status}
- Priority: {ticket.priority}
- Created: {ticket.created_at}

CONVERSATION (in chronological order):
1. {user.name} ({created_at}): {original_message}
2. {user.name} ({created_at}): {response_1}
3. {user.name} ({created_at}): {response_2}
... etc

Please provide:
1. A brief description of the original issue (1-2 sentences)
2. Key developments or changes in the conversation (2-3 bullet points)
3. Current status and any pending actions (1-2 sentences)

Keep the summary concise but informative, focusing on facts and context that would help someone understand the ticket quickly.
```

---

## Appendix B: Database Schema Reference

### ticket_summaries Table
```sql
CREATE TABLE ticket_summaries (
    id UUID PRIMARY KEY,
    ticket_id UUID NOT NULL,
    summary TEXT NOT NULL,
    message_count INTEGER NOT NULL,
    last_message_id UUID,
    generated_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_ticket FOREIGN KEY (ticket_id)
        REFERENCES tickets(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_ticket_summaries_ticket_id ON ticket_summaries(ticket_id);
CREATE INDEX idx_ticket_summaries_last_message_id ON ticket_summaries(last_message_id);
```

### organisation_settings (existing - for reference)
```sql
-- OpenAI configuration stored here
module: 'OpenAi'
key: 'OPENAI_API_KEY'
value: {encrypted}
type: 'encrypted'
```

---

**END OF DOCUMENT**