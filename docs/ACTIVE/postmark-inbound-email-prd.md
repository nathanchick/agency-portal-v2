# Product Requirements Document: PostMark Inbound Email Module

## Document Information
- **Feature**: PostMark Inbound Email to Ticket System
- **Module**: PostMark
- **Status**: Planning
- **Created**: 2025-11-11
- **Last Updated**: 2025-11-11
- **Author**: Product & Engineering Team

---

## 1. Executive Summary

### Problem Statement
Currently, users must manually create tickets through the web interface. This creates friction for customers who prefer email communication and forces staff to manually copy email content into the ticket system. There's no automated way to convert inbound emails into tickets or add email replies as ticket comments.

### Proposed Solution
Create a dedicated **PostMark** module that:
1. Receives inbound email webhooks from PostMark
2. Automatically creates tickets from new emails (if sender exists in system)
3. Adds replies to existing tickets as messages
4. Maintains complete email threading and context
5. Handles attachments and preserves email formatting
6. Keeps all implementation isolated for easy provider switching

### Key Benefits
1. **Reduced Manual Work**: Automatic ticket creation from emails
2. **Better Customer Experience**: Customers can use familiar email workflow
3. **Complete Thread Tracking**: Maintains email conversation history in tickets
4. **Future-Proof**: Module isolation allows easy provider switching
5. **Audit Trail**: Complete webhook logging for debugging and compliance
6. **Scalability**: Async job processing handles high email volumes

### Key Risks
1. **Email Spam**: Inbound webhooks could be abused (mitigation: rate limiting, validation)
2. **Unknown Senders**: Emails from users not in system (mitigation: bounce or hold for review)
3. **Threading Errors**: Incorrect reply matching (mitigation: multiple fallback strategies)
4. **Attachment Storage**: Large files could fill storage (mitigation: size limits, cleanup policies)

---

## 2. Technical Analysis

### Current Architecture Assessment

**Existing Tech Stack:**
- Laravel 12.x with nwidart/laravel-modules
- Multi-tenant (spatie/laravel-multitenancy)
- UUID-based database schema
- Ticket system (coderflex/laravel-ticket)
- Media library (spatie/laravel-medialibrary) - already integrated
- React 18+ with TypeScript (Inertia.js)
- PostgreSQL/MySQL database

**Existing Relationships:**
```
User (many-to-many) → Customer → Organisation
User (many-to-many) → Organisation
Ticket → Customer + Organisation + User
Message → Ticket + User
```

**Email Threading in PostMark:**
- `StrippedTextReply`: Populated ONLY if email is a reply (has In-Reply-To or References header)
- `TextBody`: Full email text including quoted replies
- `HtmlBody`: Full HTML email body
- `Headers`: Array containing In-Reply-To, References, Message-ID
- `MessageID`: Unique identifier for this email (format: UUID)

### Proposed Module Structure

```
Modules/PostMark/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── WebhookController.php          # Receives POST from PostMark
│   │   │   └── InboundEmailController.php     # UI for viewing email logs
│   │   └── Middleware/
│   │       └── ValidatePostmarkWebhook.php    # Validate webhook signature
│   ├── Services/
│   │   ├── InboundEmailProcessor.php          # Main orchestrator
│   │   ├── EmailThreadDetector.php            # Detect if new or reply
│   │   ├── EmailParser.php                    # Clean/parse email content
│   │   ├── UserMatcher.php                    # Match email to user/customer/org
│   │   ├── TicketCreator.php                  # Create ticket from email
│   │   └── MessageCreator.php                 # Add message to existing ticket
│   ├── Jobs/
│   │   └── ProcessInboundEmailJob.php         # Async email processing
│   ├── Models/
│   │   └── InboundEmail.php                   # Log all incoming webhooks
│   ├── Events/
│   │   ├── InboundEmailReceived.php
│   │   ├── TicketCreatedFromEmail.php
│   │   └── EmailProcessingFailed.php
│   ├── Exceptions/
│   │   ├── UserNotFoundException.php
│   │   └── TicketNotFoundException.php
│   └── Providers/
│       ├── PostMarkServiceProvider.php
│       ├── RouteServiceProvider.php
│       └── EventServiceProvider.php
├── config/
│   └── postmark.php                           # Module configuration
├── database/
│   └── migrations/
│       └── create_inbound_emails_table.php
├── routes/
│   ├── api.php                                # Webhook endpoint
│   └── web.php                                # UI routes
└── module.json
```

### Proposed Changes

**1. New PostMark Module (nwidart/laravel-modules)**
- Isolated module for all email processing logic
- No dependencies on PostMark outside this module
- Easy to swap providers in future

**2. Database Schema**

**`inbound_emails` table:**
```sql
id                  uuid PRIMARY KEY
organisation_id     uuid NULL  # May be NULL if user/org not found yet
user_id             uuid NULL  # Sender (matched by email address)
customer_id         uuid NULL  # Customer context
ticket_id           uuid NULL  # Created/updated ticket
message_id          uuid NULL  # Created message (if reply)
postmark_message_id varchar(255) UNIQUE  # PostMark's MessageID
from_email          varchar(255) NOT NULL INDEX
from_name           varchar(255)
to_email            varchar(255)
subject             varchar(500)
text_body           text
html_body           text
stripped_text_reply text  # Only for replies
is_reply            boolean DEFAULT false
in_reply_to         varchar(255) NULL  # Original MessageID
references          text NULL  # Thread MessageIDs (JSON array)
raw_headers         json  # All headers from PostMark
raw_payload         json  # Complete webhook payload
processing_status   enum('pending','processing','processed','failed','bounced')
error_message       text NULL
processed_at        timestamp NULL
created_at          timestamp
updated_at          timestamp

INDEX idx_from_email (from_email)
INDEX idx_postmark_message_id (postmark_message_id)
INDEX idx_processing_status (processing_status)
INDEX idx_ticket_id (ticket_id)
INDEX idx_organisation_id (organisation_id)
```

**3. Ticket Model Extension**
Add field to store original PostMark MessageID for threading:
```php
// tickets table - add column
postmark_message_id varchar(255) NULL UNIQUE INDEX
```

**4. Webhook Endpoint**
```php
POST /api/postmark/inbound
- Public endpoint (no auth)
- Validates PostMark signature
- Stores raw payload immediately
- Queues job for processing
- Returns 200 OK quickly (< 500ms)
```

**5. Processing Flow**

**New Email Flow:**
```
1. Webhook received → Validate signature → Store InboundEmail record (status: pending)
2. Queue ProcessInboundEmailJob
3. Job: Check if StrippedTextReply is empty (indicates new email)
4. Parse from_email → Look up User
5. If User found:
   - Get User's Customers
   - Determine Customer/Organisation context (use last_customer_id or prompt)
   - Create Ticket (map email to ticket fields)
   - Store PostMark MessageID on Ticket
   - Update InboundEmail (status: processed, ticket_id set)
6. If User NOT found:
   - Update InboundEmail (status: bounced, error: "User not found")
   - Send bounce email (optional)
```

**Reply Email Flow:**
```
1. Webhook received → Validate signature → Store InboundEmail record (status: pending)
2. Queue ProcessInboundEmailJob
3. Job: Check if StrippedTextReply has content (indicates reply)
4. Extract threading info:
   - Check In-Reply-To header for original MessageID
   - Check References header for thread MessageIDs
5. Find Ticket:
   - Query tickets where postmark_message_id matches In-Reply-To
   - Fallback: Parse subject for ticket reference (e.g., [Ticket #123])
   - Fallback: Check References headers
6. If Ticket found:
   - Parse from_email → Look up User
   - Verify User has access to Ticket
   - Create Message on Ticket using StrippedTextReply (clean reply only)
   - Update InboundEmail (status: processed, ticket_id, message_id set)
7. If Ticket NOT found:
   - Treat as new email (create new ticket)
```

**6. Email Parsing Strategy**

**Content Priority:**
1. For NEW emails: Use `TextBody` (or `HtmlBody` if preferred)
2. For REPLIES: Use `StrippedTextReply` (PostMark strips quoted text automatically)
3. Parse HTML if TextBody is empty (use library like html2text)

**Signature Detection:**
Common signature patterns to remove:
- Lines starting with "--", "___", "---"
- "Sent from my iPhone/Android"
- "Disclaimer:" blocks
- Email client footers (Mailsuite, Mailtrack)

**7. User/Customer/Organisation Matching**

**Lookup Strategy:**
```php
1. Find User by email address (case-insensitive)
2. If User not found → Bounce/Hold for review
3. If User found:
   - Get User's Customers
   - Determine Organisation context:
     a. Use User's last_customer_id if available
     b. If User has only 1 Customer → Use that
     c. If User has multiple Customers → Use first (or parse To: address for hints)
     d. Store organisation_id for tenant context
```

**8. Attachment Handling**
PostMark webhook includes `Attachments` array:
```json
"Attachments": [
  {
    "Name": "document.pdf",
    "Content": "BASE64_ENCODED_CONTENT",
    "ContentType": "application/pdf",
    "ContentLength": 12345,
    "ContentID": "optional-cid"
  }
]
```

Strategy:
- Use existing spatie/laravel-medialibrary integration
- Decode base64 content
- Create temporary file
- Attach to Ticket/Message using `addMedia()`
- Respect file size limits (10MB per file as configured)

### Dependency Mapping

**Direct Dependencies:**
1. PostMark webhook account + inbound email address
2. New PostMark module scaffolding
3. InboundEmail model + migration
4. Webhook controller + signature validation

**Secondary Dependencies:**
5. Processing services (EmailParser, ThreadDetector, etc.)
6. Queue job for async processing
7. User/Customer/Organisation matching logic
8. Ticket creation from email
9. Message creation from email reply

**Tertiary Dependencies:**
10. Add postmark_message_id to tickets table
11. Attachment handling integration
12. UI for viewing inbound email logs
13. Error handling + bounce emails
14. Tests for all scenarios

### Performance Considerations

**Webhook Response Time:**
- Target: < 500ms
- Strategy: Store payload + queue job immediately, return 200 OK
- PostMark requires 2xx response within 30 seconds

**Job Processing:**
- Use dedicated queue: `postmark_inbound`
- Timeout: 60 seconds per job
- Retries: 3 attempts with exponential backoff
- Failed jobs logged to `failed_jobs` table

**Database Performance:**
- Index on `inbound_emails.from_email` for user lookup
- Index on `inbound_emails.postmark_message_id` for thread matching
- Index on `tickets.postmark_message_id` for reply matching

**Storage:**
- Attachments handled by existing media library
- Large email bodies (HTML) may consume space
- Consider archiving old inbound_emails after 90 days

---

## 3. Implementation Plan

### Phase 1: Module Foundation (High Priority)

**Milestone 1.1: Module Scaffolding**
- Create PostMark module using artisan module:make
- Set up directory structure
- Create module.json configuration
- Register service providers

**Milestone 1.2: Database & Models**
- Create inbound_emails migration
- Create InboundEmail model with relationships
- Add postmark_message_id column to tickets table
- Set up proper indexes

**Milestone 1.3: Webhook Endpoint**
- Create WebhookController with inbound endpoint
- Implement PostMark signature validation middleware
- Store raw webhook payload to database
- Queue job for processing
- Return 200 OK quickly

### Phase 2: Email Processing Logic (High Priority)

**Milestone 2.1: Core Services**
- Create EmailThreadDetector service (detect new vs reply)
- Create EmailParser service (clean email content)
- Create UserMatcher service (find user by email)
- Create TicketCreator service (new ticket from email)
- Create MessageCreator service (reply to existing ticket)

**Milestone 2.2: Main Processor**
- Create InboundEmailProcessor service (orchestrator)
- Implement new email flow
- Implement reply email flow
- Handle errors gracefully

**Milestone 2.3: Async Job**
- Create ProcessInboundEmailJob
- Implement job queuing from webhook
- Add proper error handling + retries
- Update inbound_email record with results

### Phase 3: Attachment Handling (High Priority)

**Milestone 3.1: Attachment Processing**
- Decode base64 attachment content
- Create temporary files
- Integrate with spatie/laravel-medialibrary
- Attach files to Ticket or Message
- Respect file size limits
- Clean up temporary files

### Phase 4: User Interface (Medium Priority)

**Milestone 4.1: Inbound Email Log UI**
- Create index page for viewing inbound emails
- Display: From, Subject, Status, Ticket link, Timestamp
- Filter by status (pending/processed/failed/bounced)
- Search by email address or subject
- View raw payload for debugging

**Milestone 4.2: Settings & Configuration**
- Configuration page for PostMark settings
- Enable/disable inbound email processing
- Configure default ticket status for email tickets
- Configure default priority
- Bounce email template configuration

### Phase 5: Edge Cases & Error Handling (Medium Priority)

**Milestone 5.1: User Not Found Handling**
- Detect when sender email doesn't match any user
- Mark inbound_email as bounced
- Optional: Send bounce email to sender
- Optional: Create pending ticket for manual review

**Milestone 5.2: Ticket Not Found Handling**
- Reply detected but no matching ticket found
- Fallback: Create new ticket instead
- Log warning for investigation

**Milestone 5.3: Duplicate Prevention**
- Check if PostMark MessageID already processed
- Return early if duplicate webhook
- Idempotent processing

### Phase 6: Testing & Validation (High Priority)

**Milestone 6.1: Automated Tests**
- Unit tests for EmailThreadDetector
- Unit tests for EmailParser
- Unit tests for UserMatcher
- Feature tests for webhook endpoint
- Feature tests for new email flow
- Feature tests for reply email flow
- Integration tests with real PostMark payloads

**Milestone 6.2: Security Tests**
- Test webhook signature validation
- Test SQL injection prevention
- Test XSS in email content
- Test rate limiting
- Test unauthorised access attempts

### Phase 7: Documentation (Low Priority)

**Milestone 7.1: Technical Documentation**
- API documentation for webhook endpoint
- Service class documentation
- Database schema documentation
- Configuration guide

**Milestone 7.2: User Documentation**
- User guide for email-to-ticket feature
- Supported email formats
- Attachment limitations
- Troubleshooting guide

---

## 4. Risk Assessment

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Email spam flooding system | High | Medium | Rate limiting, PostMark spam filtering, validation |
| Thread detection failures | Medium | Medium | Multiple fallback strategies, manual ticket linking UI |
| Unknown sender abuse | Medium | Low | Bounce emails, allowlist domains, manual review queue |
| Attachment bomb attacks | High | Low | File size limits, MIME type validation, virus scanning (future) |
| PostMark downtime | Low | Low | Webhooks will retry, queue backlog handled |
| Job queue overflow | Medium | Low | Dedicated queue, monitoring, auto-scaling |

### Timeline Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| PostMark API changes | Low | Low | Isolated module design, easy to adapt |
| Complexity underestimated | Medium | Medium | Phased approach, MVP first |
| Testing takes longer | Low | Medium | Parallel testing during development |
| Integration issues | Medium | Low | Well-defined interfaces, mocking |

### Mitigation Strategies

1. **Spam Protection**:
   - PostMark has built-in spam filtering
   - Rate limit webhook endpoint (100 requests/minute per IP)
   - Validate PostMark signature on every request
   - Optional: Domain allowlist for senders

2. **Thread Detection Reliability**:
   - Primary: Check In-Reply-To header
   - Fallback 1: Check References header
   - Fallback 2: Parse subject for [Ticket #123]
   - Fallback 3: Create new ticket (better than failing)

3. **Error Recovery**:
   - All webhooks logged before processing
   - Failed jobs retry 3 times
   - Admin UI to view failed emails
   - Manual replay option for failed jobs

4. **Testing Strategy**:
   - Unit test all service classes
   - Feature test complete flows
   - Use real PostMark webhook samples
   - Test edge cases (malformed emails, missing fields)

---

## 5. Task List

### Module Setup Tasks

#### Task #1: Create PostMark Module Scaffolding
**Priority**: Critical
**Effort**: Small (1 hour)
**Dependencies**: None
**Acceptance Criteria**:
- [ ] Module created: `php artisan module:make PostMark`
- [ ] Directory structure matches plan
- [ ] module.json configured
- [ ] Service providers registered
- [ ] Module loads without errors
- [ ] Routes file created (api.php)

**GitHub Issue**: TBD

---

#### Task #2: Create inbound_emails Migration
**Priority**: Critical
**Effort**: Small (1 hour)
**Dependencies**: Task #1
**Acceptance Criteria**:
- [ ] Migration file created with all columns from schema
- [ ] Proper indexes added (from_email, postmark_message_id, etc.)
- [ ] Foreign keys for user_id, customer_id, organisation_id, ticket_id
- [ ] processing_status enum configured
- [ ] Migration runs successfully
- [ ] `inbound_emails` table exists with correct schema

**GitHub Issue**: TBD

---

#### Task #3: Add postmark_message_id to tickets Table
**Priority**: Critical
**Effort**: Small (30 minutes)
**Dependencies**: Task #2
**Acceptance Criteria**:
- [ ] Migration adds `postmark_message_id VARCHAR(255) NULL` column
- [ ] Unique index created on column
- [ ] Migration runs successfully on existing tickets table
- [ ] Ticket model fillable updated if needed

**GitHub Issue**: TBD

---

#### Task #4: Create InboundEmail Model
**Priority**: Critical
**Effort**: Small (1 hour)
**Dependencies**: Task #2
**Acceptance Criteria**:
- [ ] InboundEmail model created in Modules/PostMark/app/Models/
- [ ] Uses HasUuids trait
- [ ] Uses BelongsToTenant trait (if applicable)
- [ ] Fillable fields defined
- [ ] Casts configured (processing_status, json fields)
- [ ] Relationships defined: user(), customer(), organisation(), ticket(), message()
- [ ] Accessor for is_reply based on StrippedTextReply

**GitHub Issue**: TBD

---

### Webhook Endpoint Tasks

#### Task #5: Create Webhook Controller
**Priority**: Critical
**Effort**: Medium (2 hours)
**Dependencies**: Task #4
**Acceptance Criteria**:
- [ ] WebhookController created in Modules/PostMark/app/Http/Controllers/
- [ ] `inbound()` method receives POST request
- [ ] Validates PostMark webhook structure
- [ ] Stores InboundEmail record with raw_payload
- [ ] Sets processing_status to 'pending'
- [ ] Queues ProcessInboundEmailJob
- [ ] Returns 200 OK with empty body
- [ ] Response time < 500ms
- [ ] Logs webhook receipt

**GitHub Issue**: TBD

---

#### Task #6: Implement PostMark Signature Validation Middleware
**Priority**: High
**Effort**: Medium (2 hours)
**Dependencies**: Task #5
**Acceptance Criteria**:
- [ ] Middleware created: ValidatePostmarkWebhook
- [ ] Reads PostMark webhook secret from config
- [ ] Validates webhook signature if configured
- [ ] Returns 401 if validation fails
- [ ] Logs invalid webhook attempts
- [ ] Can be disabled in config for testing
- [ ] Documented how PostMark signs webhooks

**GitHub Issue**: TBD

---

#### Task #7: Register Webhook Routes
**Priority**: Critical
**Effort**: Small (30 minutes)
**Dependencies**: Task #5, Task #6
**Acceptance Criteria**:
- [ ] Route added to Modules/PostMark/routes/api.php
- [ ] POST /api/postmark/inbound → WebhookController@inbound
- [ ] Route has no auth middleware (public webhook)
- [ ] ValidatePostmarkWebhook middleware applied
- [ ] CSRF exemption added to VerifyCsrfToken middleware
- [ ] Route registered in RouteServiceProvider
- [ ] Route accessible via `php artisan route:list`

**GitHub Issue**: TBD

---

### Email Processing Services Tasks

#### Task #8: Create EmailThreadDetector Service
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: Task #4
**Acceptance Criteria**:
- [ ] Service class: Modules/PostMark/app/Services/EmailThreadDetector.php
- [ ] Method `isReply($inboundEmail): bool` checks StrippedTextReply
- [ ] Method `extractInReplyTo($headers): ?string` parses In-Reply-To header
- [ ] Method `extractReferences($headers): array` parses References header
- [ ] Method `findTicketByMessageId($messageId): ?Ticket` queries database
- [ ] Fallback: Parse subject for [Ticket #123] or similar patterns
- [ ] Returns Ticket or null
- [ ] Unit tests for all detection methods

**GitHub Issue**: TBD

---

#### Task #9: Create EmailParser Service
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: Task #4
**Acceptance Criteria**:
- [ ] Service class: Modules/PostMark/app/Services/EmailParser.php
- [ ] Method `getCleanBody($inboundEmail): string` returns clean text
- [ ] For new emails: Return TextBody with signatures removed
- [ ] For replies: Return StrippedTextReply (PostMark already cleaned)
- [ ] Method `removeSignature($text): string` removes common signature patterns
- [ ] Method `convertHtmlToText($html): string` converts HTML to plain text
- [ ] Handles empty TextBody gracefully
- [ ] Unit tests with various email formats

**GitHub Issue**: TBD

---

#### Task #10: Create UserMatcher Service
**Priority**: High
**Effort**: Medium (2 hours)
**Dependencies**: Task #4
**Acceptance Criteria**:
- [ ] Service class: Modules/PostMark/app/Services/UserMatcher.php
- [ ] Method `findUserByEmail($email): ?User` case-insensitive lookup
- [ ] Method `determineCustomerContext($user): ?Customer` logic:
  - Returns User's last_customer_id customer if exists
  - If only 1 customer, returns that
  - If multiple, returns first (or null to prompt)
- [ ] Method `determineOrganisationContext($customer): ?Organisation`
- [ ] Throws UserNotFoundException if user not found
- [ ] Unit tests with various user/customer scenarios

**GitHub Issue**: TBD

---

#### Task #11: Create TicketCreator Service
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: Task #9, Task #10
**Acceptance Criteria**:
- [ ] Service class: Modules/PostMark/app/Services/TicketCreator.php
- [ ] Method `createFromEmail($inboundEmail): Ticket`
- [ ] Looks up User via UserMatcher
- [ ] Determines Customer/Organisation context
- [ ] Creates Ticket with:
  - title = email subject (cleaned)
  - message = email body (cleaned)
  - user_id = sender
  - customer_id = determined customer
  - organisation_id = determined organisation
  - status = configured default (e.g., 'open')
  - priority = 'medium' (default)
  - postmark_message_id = from webhook
- [ ] Handles attachments (calls MessageCreator for this)
- [ ] Returns created Ticket
- [ ] Unit + feature tests

**GitHub Issue**: TBD

---

#### Task #12: Create MessageCreator Service
**Priority**: High
**Effort**: Medium (2 hours)
**Dependencies**: Task #9, Task #10
**Acceptance Criteria**:
- [ ] Service class: Modules/PostMark/app/Services/MessageCreator.php
- [ ] Method `addReplyToTicket($ticket, $inboundEmail): Message`
- [ ] Looks up User via UserMatcher
- [ ] Verifies User has access to Ticket
- [ ] Creates Message with:
  - ticket_id = found ticket
  - user_id = sender
  - message = StrippedTextReply (clean reply only)
  - is_private = false (public by default)
- [ ] Handles attachments
- [ ] Returns created Message
- [ ] Throws TicketNotFoundException if not found
- [ ] Unit + feature tests

**GitHub Issue**: TBD

---

#### Task #13: Create InboundEmailProcessor Service (Orchestrator)
**Priority**: Critical
**Effort**: Large (4 hours)
**Dependencies**: Task #8, Task #9, Task #10, Task #11, Task #12
**Acceptance Criteria**:
- [ ] Service class: Modules/PostMark/app/Services/InboundEmailProcessor.php
- [ ] Method `process($inboundEmail): void` orchestrates entire flow
- [ ] Step 1: Mark status as 'processing'
- [ ] Step 2: Detect if new email or reply (EmailThreadDetector)
- [ ] Step 3a: If NEW → TicketCreator::createFromEmail()
- [ ] Step 3b: If REPLY → EmailThreadDetector::findTicket() then MessageCreator::addReplyToTicket()
- [ ] Step 4: Handle attachments
- [ ] Step 5: Mark status as 'processed', set ticket_id/message_id
- [ ] Error handling: Catch exceptions, mark status 'failed', store error_message
- [ ] Logs each step for debugging
- [ ] Integration tests with full flow

**GitHub Issue**: TBD

---

#### Task #14: Create ProcessInboundEmailJob
**Priority**: Critical
**Effort**: Medium (2 hours)
**Dependencies**: Task #13
**Acceptance Criteria**:
- [ ] Job class: Modules/PostMark/app/Jobs/ProcessInboundEmailJob.php
- [ ] Constructor accepts InboundEmail model
- [ ] Uses queue: 'postmark_inbound'
- [ ] Timeout: 60 seconds
- [ ] Tries: 3 attempts
- [ ] handle() method calls InboundEmailProcessor::process()
- [ ] Catches all exceptions and marks job as failed
- [ ] Updates InboundEmail record on success/failure
- [ ] Dispatches events: TicketCreatedFromEmail, EmailProcessingFailed
- [ ] Tests: Job dispatching, execution, failure handling

**GitHub Issue**: TBD

---

### Attachment Handling Tasks

#### Task #15: Implement Attachment Processing
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: Task #11, Task #12
**Acceptance Criteria**:
- [ ] Method in InboundEmailProcessor: `processAttachments($inboundEmail, $model)`
- [ ] Iterates through $inboundEmail->raw_payload['Attachments']
- [ ] Decodes base64 Content
- [ ] Creates temporary file with proper extension
- [ ] Validates file size (10MB limit)
- [ ] Validates MIME type (same whitelist as ticket attachments)
- [ ] Uses spatie/laravel-medialibrary: `$model->addMedia($tempFile)->toMediaCollection('attachments')`
- [ ] Cleans up temporary files
- [ ] Handles errors gracefully (attachment too large, etc.)
- [ ] Tests with various attachment types

**GitHub Issue**: TBD

---

### Configuration Tasks

#### Task #16: Create PostMark Configuration File
**Priority**: Medium
**Effort**: Small (1 hour)
**Dependencies**: Task #1
**Acceptance Criteria**:
- [ ] Config file: Modules/PostMark/config/postmark.php
- [ ] Configuration keys:
  - webhook_secret (from .env)
  - enabled (true/false)
  - default_ticket_status ('open')
  - default_ticket_priority ('medium')
  - bounce_unknown_senders (true/false)
  - allowed_sender_domains (array, optional)
  - signature_patterns (array of regex patterns)
- [ ] Published to config/postmark.php
- [ ] Documented in README

**GitHub Issue**: TBD

---

### UI Tasks

#### Task #17: Create Inbound Email Index Page
**Priority**: Low
**Effort**: Medium (3 hours)
**Dependencies**: Task #4
**Acceptance Criteria**:
- [ ] Controller: InboundEmailController@index
- [ ] Route: GET /postmark/inbound-emails
- [ ] React page: resources/js/pages/postmark/inbound-emails/index.tsx
- [ ] Displays paginated list of InboundEmail records
- [ ] Columns: From, Subject, Status, Ticket (link), Created At
- [ ] Filter by status (pending/processing/processed/failed/bounced)
- [ ] Search by from_email or subject
- [ ] Click row to view details (full payload)
- [ ] Uses shadcn/ui components
- [ ] Proper error states and loading

**GitHub Issue**: TBD

---

#### Task #18: Create Inbound Email Detail Page
**Priority**: Low
**Effort**: Small (2 hours)
**Dependencies**: Task #17
**Acceptance Criteria**:
- [ ] Controller: InboundEmailController@show
- [ ] Route: GET /postmark/inbound-emails/{inboundEmail}
- [ ] React page: resources/js/pages/postmark/inbound-emails/show.tsx
- [ ] Displays: From, To, Subject, Body, Status, Error (if failed)
- [ ] Link to created Ticket/Message
- [ ] Shows raw_payload in expandable JSON viewer
- [ ] Shows raw_headers in formatted view
- [ ] Button to retry processing (if failed)
- [ ] Responsive design

**GitHub Issue**: TBD

---

### Testing Tasks

#### Task #19: Unit Tests for EmailThreadDetector
**Priority**: High
**Effort**: Medium (2 hours)
**Dependencies**: Task #8
**Acceptance Criteria**:
- [ ] Test file: tests/Unit/Services/EmailThreadDetectorTest.php
- [ ] Test isReply() with StrippedTextReply present/absent
- [ ] Test extractInReplyTo() with various header formats
- [ ] Test extractReferences() parsing
- [ ] Test findTicketByMessageId() query logic
- [ ] Test subject parsing for ticket references
- [ ] All tests passing with 100% coverage

**GitHub Issue**: TBD

---

#### Task #20: Unit Tests for EmailParser
**Priority**: High
**Effort**: Medium (2 hours)
**Dependencies**: Task #9
**Acceptance Criteria**:
- [ ] Test file: tests/Unit/Services/EmailParserTest.php
- [ ] Test getCleanBody() with new emails
- [ ] Test getCleanBody() with replies (StrippedTextReply)
- [ ] Test removeSignature() with common patterns
- [ ] Test convertHtmlToText() conversion
- [ ] Test handling of empty bodies
- [ ] All tests passing

**GitHub Issue**: TBD

---

#### Task #21: Feature Tests for Webhook Endpoint
**Priority**: High
**Effort**: Medium (3 hours)
**Dependencies**: Task #7
**Acceptance Criteria**:
- [ ] Test file: tests/Feature/PostMark/WebhookTest.php
- [ ] Test POST /api/postmark/inbound with valid payload returns 200
- [ ] Test InboundEmail record created
- [ ] Test Job queued
- [ ] Test invalid signature returns 401
- [ ] Test duplicate MessageID handled (idempotent)
- [ ] Test malformed payload returns 422
- [ ] All tests passing

**GitHub Issue**: TBD

---

#### Task #22: Feature Tests for New Email Flow
**Priority**: High
**Effort**: Large (4 hours)
**Dependencies**: Task #13, Task #14
**Acceptance Criteria**:
- [ ] Test file: tests/Feature/PostMark/NewEmailFlowTest.php
- [ ] Test complete new email processing: webhook → job → ticket created
- [ ] Test with existing user → Ticket created with correct associations
- [ ] Test with unknown user → Marked as bounced
- [ ] Test with attachments → Files attached to ticket
- [ ] Test error handling → Status marked as failed
- [ ] All tests passing with realistic PostMark payloads

**GitHub Issue**: TBD

---

#### Task #23: Feature Tests for Reply Email Flow
**Priority**: High
**Effort**: Large (4 hours)
**Dependencies**: Task #13, Task #14
**Acceptance Criteria**:
- [ ] Test file: tests/Feature/PostMark/ReplyEmailFlowTest.php
- [ ] Test reply detected → Message added to existing ticket
- [ ] Test StrippedTextReply used (no quoted text)
- [ ] Test In-Reply-To matching → Ticket found
- [ ] Test References fallback → Ticket found
- [ ] Test ticket not found → New ticket created instead
- [ ] Test with attachments → Files attached to message
- [ ] All tests passing

**GitHub Issue**: TBD

---

### Documentation Tasks

#### Task #24: Technical Documentation
**Priority**: Low
**Effort**: Medium (2 hours)
**Dependencies**: All implementation tasks
**Acceptance Criteria**:
- [ ] README.md in Modules/PostMark/
- [ ] Document webhook endpoint format
- [ ] Document PostMark setup instructions
- [ ] Document configuration options
- [ ] Document service class architecture
- [ ] Document testing strategy
- [ ] Include example webhook payloads

**GitHub Issue**: TBD

---

#### Task #25: User Documentation
**Priority**: Low
**Effort**: Small (1 hour)
**Dependencies**: Task #17, Task #18
**Acceptance Criteria**:
- [ ] User guide: How email-to-ticket works
- [ ] How to send emails to create tickets
- [ ] How to reply to tickets via email
- [ ] Attachment limitations (10MB, file types)
- [ ] What happens if sender not in system
- [ ] Troubleshooting guide (email not creating ticket)

**GitHub Issue**: TBD

---

## 6. Configuration Examples

### PostMark Webhook Setup

1. **Create Inbound Stream** in PostMark dashboard
2. **Configure Inbound Email Address**: e.g., support@portal.deploy.co.uk
3. **Set Webhook URL**: `https://portal.deploy.co.uk/api/postmark/inbound`
4. **Enable Authentication** (optional but recommended)
5. **Test webhook** with PostMark's test tool

### Module Configuration

**config/postmark.php:**
```php
<?php

return [
    // Enable/disable inbound email processing
    'enabled' => env('POSTMARK_INBOUND_ENABLED', true),

    // PostMark webhook secret for signature validation
    'webhook_secret' => env('POSTMARK_WEBHOOK_SECRET', null),

    // Default status for tickets created from email
    'default_ticket_status' => env('POSTMARK_DEFAULT_TICKET_STATUS', 'open'),

    // Default priority for email tickets
    'default_ticket_priority' => env('POSTMARK_DEFAULT_TICKET_PRIORITY', 'medium'),

    // Bounce emails from unknown senders
    'bounce_unknown_senders' => env('POSTMARK_BOUNCE_UNKNOWN', true),

    // Optional: Allowed sender domains (empty = all)
    'allowed_sender_domains' => [
        // 'example.com',
        // 'trusted-domain.com',
    ],

    // Email signature patterns to remove
    'signature_patterns' => [
        '/^--\s*$/m',                           # Standard signature delimiter
        '/^___+$/m',                            # Underscore delimiter
        '/Sent from my (iPhone|iPad|Android)/i', # Mobile signatures
        '/^Disclaimer:.*$/ms',                  # Disclaimer blocks
        '/Sent with Mailsuite.*$/ms',           # Email client footers
    ],

    // Queue name for processing jobs
    'queue_name' => 'postmark_inbound',

    // Job timeout in seconds
    'job_timeout' => 60,

    // Job retry attempts
    'job_tries' => 3,
];
```

**.env:**
```
POSTMARK_INBOUND_ENABLED=true
POSTMARK_WEBHOOK_SECRET=your_secret_key_from_postmark
POSTMARK_DEFAULT_TICKET_STATUS=open
POSTMARK_DEFAULT_TICKET_PRIORITY=medium
POSTMARK_BOUNCE_UNKNOWN=true
```

---

## 7. API Specification

### Webhook Endpoint

**POST /api/postmark/inbound**

**Headers:**
```
Content-Type: application/json
X-Postmark-Signature: <signature> (optional, if configured)
```

**Request Body:**
See example JSON payload in project description (complete PostMark inbound webhook format)

**Response:**
```
HTTP 200 OK
```

**Error Responses:**
```
HTTP 401 Unauthorized - Invalid webhook signature
HTTP 422 Unprocessable Entity - Invalid payload format
HTTP 429 Too Many Requests - Rate limit exceeded
```

---

## 8. Email Threading Examples

### New Email Example
```json
{
  "StrippedTextReply": "",  // EMPTY = NEW EMAIL
  "MessageID": "abc-123-def-456",
  "Subject": "Website is down",
  "From": "customer@example.com",
  ...
}
```
**Result**: Create new Ticket, store MessageID on ticket

### Reply Email Example
```json
{
  "StrippedTextReply": "Thanks for the quick response!", // HAS CONTENT = REPLY
  "MessageID": "xyz-789-uvw-012",
  "Subject": "Re: Website is down",
  "Headers": [
    {
      "Name": "In-Reply-To",
      "Value": "<abc-123-def-456>"  // References original MessageID
    }
  ],
  ...
}
```
**Result**: Find Ticket with postmark_message_id = 'abc-123-def-456', add Message

---

## 9. Edge Cases & Error Scenarios

### Edge Case Matrix

| Scenario | Detection | Action |
|----------|-----------|--------|
| Email from unknown user | Email lookup fails | Mark as `bounced`, optional bounce email |
| Reply to closed ticket | Ticket found, status=closed | Add message, optionally reopen ticket |
| Reply with no matching ticket | In-Reply-To lookup fails | Treat as NEW email, create ticket |
| Duplicate webhook delivery | MessageID already exists | Return 200 OK, do nothing (idempotent) |
| Attachment too large | File size > 10MB | Process email, skip attachment, log error |
| Invalid email format | Missing required fields | Mark as `failed`, store error |
| HTML-only email | TextBody empty | Convert HtmlBody to text |
| Auto-reply detected | Subject has "Auto:", "Out of Office" | Mark as `bounced`, don't create ticket |
| Multiple recipients | Multiple To/CC addresses | Use primary To address for routing |

---

## 10. Success Metrics

### Functional Metrics
- [ ] Webhook endpoint responds < 500ms
- [ ] 95%+ of new emails create tickets successfully
- [ ] 95%+ of reply emails match correct ticket
- [ ] Zero duplicate tickets from same email
- [ ] All attachments processed correctly
- [ ] Thread detection accuracy > 95%

### Quality Metrics
- [ ] 90%+ test coverage for services
- [ ] Zero security vulnerabilities
- [ ] Zero SQL injection risks
- [ ] Proper error logging for debugging
- [ ] Failed jobs can be retried manually

### User Experience Metrics
- [ ] Email-to-ticket latency < 2 minutes
- [ ] Email formatting preserved correctly
- [ ] Signatures removed cleanly
- [ ] Attachments viewable in tickets

---

## 11. Future Enhancements (Post-MVP)

### Phase 8: Advanced Features (Future)
1. **Smart Routing**: Route emails to categories based on keywords/ML
2. **Auto-Assignment**: Assign tickets to specific users based on rules
3. **Email Templates**: Send formatted replies from tickets
4. **Conversation Export**: Download entire email thread
5. **Rich Email Parsing**: Better HTML rendering, inline images
6. **Virus Scanning**: Integrate ClamAV for attachment scanning
7. **Spam Scoring**: Reject obvious spam before processing
8. **Custom From Addresses**: support+customer-id@portal.deploy.co.uk for routing
9. **Multi-Language**: Detect email language, set ticket locale
10. **CC/BCC Handling**: Add watchers to tickets based on CC list

---

## 12. Provider Migration Strategy

If switching from PostMark to another provider (e.g., SendGrid, Mailgun):

**Isolation Benefits:**
1. All PostMark-specific code in PostMark module
2. Service interfaces remain the same
3. Only webhook payload parsing changes

**Migration Steps:**
1. Create new module (e.g., SendGridInbound)
2. Implement same service interfaces
3. Map different webhook payload to InboundEmail
4. Update webhook route to point to new controller
5. Test thoroughly
6. Switch configuration
7. Archive PostMark module (don't delete, for reference)

**Shared Components:**
- InboundEmail model (reused)
- TicketCreator service (reused)
- MessageCreator service (reused)
- UI for viewing logs (reused)

---

## 13. Conclusion

This PRD provides a comprehensive plan for implementing a PostMark inbound email module that automatically creates tickets and handles email threading. The modular design ensures easy provider switching in the future while maintaining robust error handling and logging.

**Total Estimated Effort**: ~65 hours
- Module Setup: ~5 hours
- Webhook Endpoint: ~4.5 hours
- Processing Services: ~17 hours
- Attachment Handling: ~3 hours
- Configuration: ~1 hour
- UI: ~5 hours
- Testing: ~15 hours
- Documentation: ~3 hours
- Buffer for unknowns: ~11.5 hours

**Recommended Approach**:
1. Complete Phase 1 (Module Foundation) - Tasks #1-7
2. Complete Phase 2 (Email Processing) - Tasks #8-14
3. Complete Phase 3 (Attachments) - Task #15
4. Complete Phase 6 (Testing) - Tasks #19-23
5. Complete Phase 4 (UI) - Tasks #17-18
6. Complete Phase 7 (Documentation) - Tasks #24-25

**Next Steps**:
1. Review and approve this PRD
2. Create GitHub issues for all 25 tasks
3. Set up PostMark inbound email address + webhook
4. Begin implementation with Phase 1
5. Regular check-ins on progress

---

*End of Product Requirements Document*
