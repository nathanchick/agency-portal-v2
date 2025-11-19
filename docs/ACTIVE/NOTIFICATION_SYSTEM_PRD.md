# Notification System - Product Requirements Document

**Status**: Planning
**Priority**: High
**Estimated Effort**: 8-12 weeks
**Owner**: TBD
**Created**: 2025-11-18

---

## Executive Summary

### Problem Statement
The application currently lacks a comprehensive notification system. Users miss critical updates about tickets, documents, billing, deployments, and system events. Only registration and password reset emails are sent, leaving users uninformed about important business events.

**Key Pain Points**:
- No notifications when tickets are assigned or updated
- No alerts for billing issues (overdue invoices, payment failures)
- No notifications for deployment successes/failures
- No site downtime alerts from Ohdear monitoring
- Notification bell in UI exists but receives minimal data
- No user preferences for notification channels (email, Slack, in-app)

### Proposed Solution
Implement a comprehensive, multi-channel notification system with:
- **Centralized Notification Module** for shared services and preferences
- **Per-module notification classes** for business logic
- **Multi-channel support**: Email, In-app (database), Slack, Real-time (broadcast)
- **User preference system** for channel selection and quiet hours
- **Digest notifications** for low-priority items
- **Priority-based routing** (Critical → all channels, Low → in-app only)

### Key Benefits
1. **Improved User Experience**: Users stay informed of important events
2. **Faster Response Times**: Real-time alerts for critical issues
3. **Reduced Support Burden**: Automated notifications reduce "what's the status?" inquiries
4. **Revenue Protection**: Timely billing notifications improve collections
5. **System Reliability**: Deployment and downtime alerts enable faster incident response
6. **Compliance**: Audit trail of all notifications sent

### Key Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Notification overload | Users unsubscribe/ignore alerts | Implement preferences, digests, priority levels |
| Poor deliverability | Critical notifications not received | SPF/DKIM/DMARC, monitor bounce rates |
| Performance impact | Slow application | Queue all notifications, optimize queries |
| Slack rate limiting | Failed Slack messages | Implement backoff, batching |

---

## Technical Analysis

### Current State Assessment

#### ✅ Existing Infrastructure (Good Foundation)

**Backend**:
- Laravel notification system fully configured
- `notifications` database table exists with proper structure
- `User` model implements `Notifiable` trait
- Pusher/Soketi configured for real-time broadcasting
- Laravel Horizon installed for queue management
- 5 notification classes already implemented:
  - `UserAddedToOrganisation`
  - `NewUserInvitation`
  - `TeamInvitation`
  - `DocumentRequestNotification`
  - `DocumentStatusChangeNotification`

**Frontend**:
- Notification bell component (shows unread count)
- Notification dropdown (displays list, mark as read)
- Real-time updates via Laravel Echo + Soketi
- Complete REST API for notifications

**Configuration**:
- Broadcasting channels configured (Pusher, Reverb)
- Slack config exists (`services.slack.notifications`)
- Queue system ready (Redis + Horizon)

#### ❌ Critical Gaps

1. **No User Preference System**: Users cannot control notification channels
2. **No Slack Channel Implementation**: Config exists but not used
3. **Missing Ticket Notifications**: Most important module has zero notifications
4. **Missing Billing Notifications**: Critical for revenue management
5. **Missing Deployment Notifications**: Webhook exists but doesn't notify
6. **Missing Ohdear Alerts**: Monitoring active but no notifications
7. **No Base Notification Class**: Each notification reimplements channel logic
8. **No Digest System**: No daily/weekly summaries for low-priority items

### Proposed Architecture

#### Hybrid Approach: Centralized + Distributed

**Centralized Components** (Notification Module):
```
Modules/Notification/
├── app/
│   ├── Models/
│   │   ├── NotificationPreference.php
│   │   └── NotificationDigest.php
│   ├── Services/
│   │   ├── NotificationRoutingService.php
│   │   ├── NotificationChannelService.php
│   │   └── DigestService.php
│   ├── Notifications/
│   │   └── BaseNotification.php (abstract)
│   ├── Channels/
│   │   └── CustomSlackChannel.php
│   ├── Http/Controllers/
│   │   └── NotificationPreferenceController.php
│   └── Jobs/
│       ├── SendDailyDigest.php
│       └── SendWeeklyDigest.php
├── database/migrations/
│   ├── create_notification_preferences_table.php
│   └── create_notification_digests_table.php
├── resources/js/components/
│   └── NotificationPreferences.tsx
└── routes/
    └── web.php
```

**Distributed Components** (Per-Module):
```
Modules/Ticket/
├── app/
│   ├── Notifications/
│   │   ├── TicketAssignedNotification.php      # Extends BaseNotification
│   │   ├── TicketCommentNotification.php
│   │   ├── TicketResolvedNotification.php
│   │   └── TicketOverdueNotification.php
│   ├── Listeners/
│   │   └── SendTicketNotifications.php         # Event listener
│   └── Events/
│       ├── TicketCreated.php                   # Already exists
│       ├── TicketUpdated.php                   # Already exists
│       └── TicketCommentAdded.php              # NEW
```

#### Channel Selection Strategy

**Multi-Channel Decision Tree**:
```
Priority Level → Channels Selected

CRITICAL (Site down, deployment failed):
  ✅ Email: Always
  ✅ In-App: Always
  ✅ Slack: Always
  ✅ Broadcast: Always

HIGH (Ticket assigned, payment received):
  ✅ Email: Default (user can opt-out)
  ✅ In-App: Always
  ✅ Slack: If enabled by user
  ✅ Broadcast: If user online

MEDIUM (Ticket comment, document signed):
  ⚙️ Email: User preference (or digest)
  ✅ In-App: Always
  ⚙️ Slack: User preference
  ⚙️ Broadcast: If user online

LOW (Time entry submitted):
  ⚙️ Email: Digest only
  ✅ In-App: Always
  ❌ Slack: Never
  ❌ Broadcast: Never
```

### Notification Triggers Matrix

#### Ticket Module (17 triggers) - **HIGHEST PRIORITY**

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| Ticket Created | Assigned user, Customer, Org admins | Email, In-app, Slack | HIGH |
| Ticket Assigned | New assignee, Previous assignee, Customer | Email, In-app, Slack | HIGH |
| Ticket Status Changed | Assigned user, Customer, Watchers | Email, In-app | MEDIUM |
| New Comment/Message | Assigned user, Customer, Participants, @mentions | Email, In-app, Slack | HIGH |
| Ticket Resolved | Customer, Assigned user, Manager | Email, In-app | HIGH |
| Ticket Reopened | Assigned user, Last resolver | Email, In-app | MEDIUM |
| Ticket Priority Changed | Assigned user, Managers (if critical) | In-app, Slack | MEDIUM |
| Ticket Overdue | Assigned user, Managers | Email, In-app, Slack | HIGH |
| Ticket Escalated | Escalation targets, Original assignee, Managers | Email, In-app, Slack | HIGH |

#### Billing Module (9 triggers) - **HIGH PRIORITY**

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| Invoice Created | Customer billing contact, Org billing admin | Email, In-app | HIGH |
| Invoice Sent | Customer, Sales rep | Email | HIGH |
| Payment Received | Org billing admin, Account manager, Customer | Email, In-app | HIGH |
| Invoice Overdue | Customer billing contact, Collections team | Email, In-app, Slack | HIGH |
| Payment Failed | Customer, Org billing admin | Email, Slack | HIGH |
| Invoice 7 Days Overdue | Customer, Account manager | Email, Slack | HIGH |
| Invoice 30 Days Overdue | Customer, Collections manager | Email, Slack | CRITICAL |
| Payment Plan Setup | Customer, Billing admin | Email | MEDIUM |
| Credit Note Issued | Customer, Billing admin | Email | MEDIUM |

#### Deployment Module (6 triggers) - **HIGH PRIORITY**

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| Deployment Started | Dev team lead, Project manager | In-app, Slack | MEDIUM |
| Deployment Successful | Dev team, Customer (opt-in), QA team | Email, In-app, Slack | HIGH |
| Deployment Failed | Dev team lead, On-call engineer, DevOps | Email, In-app, Slack | CRITICAL |
| Rollback Required | Dev team lead, DevOps | Email, Slack | HIGH |
| Production Deployment | All stakeholders, Customer, Support team | Email, In-app, Slack | HIGH |
| Deployment Warning | DevOps team, Dev lead | Slack | MEDIUM |

#### Document Module (8 triggers) - **MEDIUM PRIORITY**
*Note: 2 notifications already implemented*

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| Document Request Sent ✅ | Customer user | Email, In-app | HIGH |
| Document Signed | Document creator, Org admins, Stakeholders | Email, In-app | HIGH |
| Document Approved ✅ | Document creator, Requestor | Email, In-app | HIGH |
| Document Declined ✅ | Document creator, Requestor | Email, In-app | HIGH |
| Document Expiring Soon | Customer user, Document owner | Email, In-app | MEDIUM |
| Document Completed | All stakeholders | Email, In-app | MEDIUM |
| Signature Reminder | Customer user (unsigned) | Email | MEDIUM |
| Document Voided | All parties involved | Email, In-app | MEDIUM |

#### Ohdear Module (7 triggers) - **MEDIUM-HIGH PRIORITY**

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| Site Down Detected | Customer tech contact, Org DevOps, On-call | Email, In-app, Slack | CRITICAL |
| Site Back Up | Same as "Site Down" | Email, In-app, Slack | HIGH |
| Broken Links Found | Customer, Content team | Email, In-app | MEDIUM |
| Performance Degradation | DevOps team, Customer (opt-in) | In-app, Slack | HIGH |
| SSL Certificate Expiring | DevOps team, Customer tech contact | Email, Slack | HIGH |
| Mixed Content Detected | Customer, Dev team | Email, In-app | MEDIUM |
| Uptime SLA Breach | Customer, Account manager, DevOps lead | Email, Slack | CRITICAL |

#### Timesheet Module (8 triggers) - **MEDIUM PRIORITY**

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| Time Entry Submitted | Manager/approver, Customer (if billable) | Email, In-app | MEDIUM |
| Time Entry Approved | User who submitted, Customer (if external) | In-app | LOW |
| Time Entry Rejected | User who submitted | Email, In-app | MEDIUM |
| Service Budget Alert (80%) | Org managers, Assigned users, Customer (opt-in) | Email, In-app, Slack | HIGH |
| Service Budget Exceeded | Org admins, Customer contact | Email, Slack | HIGH |
| Weekly Timesheet Summary ✅ | Configured recipients | Email (with PDF) | MEDIUM |
| Approval Required | Approvers/managers | Email, In-app | MEDIUM |
| Billable Hours Milestone | Customer, Org billing team | Email | MEDIUM |

#### CSP Management Module (6 triggers) - **MEDIUM PRIORITY**

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| New CSP Violation Detected | Customer tech contact, Dev team | Email, In-app, Slack | HIGH |
| High Volume Violations | Customer, DevOps team | Email, Slack | HIGH |
| CSP Decision Made | Dev team, Customer (if they decided) | In-app | LOW |
| Violation Resolved | Customer, Security team | In-app | LOW |
| Critical Security Violation | Customer, Security team, Dev lead | Email, In-app, Slack | CRITICAL |
| AI Analysis Complete | Customer, Requesting user | In-app | MEDIUM |

#### Customer Module (6 triggers) - **LOW PRIORITY**

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| New Customer Created | Org admins, Sales team, Account managers | Email, In-app, Slack | MEDIUM |
| Customer User Added ✅ | User being added, Customer admins | Email, In-app | MEDIUM |
| Customer User Removed | User being removed, Customer admins | Email, In-app | LOW |
| Customer Status Changed | Account manager, Customer primary contact | Email, In-app | MEDIUM |
| Project Created | Customer users, Project manager | Email, In-app | LOW |
| Project Archived | Customer users, Team members | Email, In-app | LOW |

#### GitHub Module (6 triggers) - **LOW PRIORITY**

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| Repository Linked | Project manager, Dev team | In-app | LOW |
| Repository Sync Failed | Org admins, Dev lead | Email, In-app | MEDIUM |
| OAuth Token Expired | Org admin (who connected) | Email, In-app | HIGH |
| PR Opened (Future) | Code reviewers, Project manager | In-app, Slack | MEDIUM |
| PR Merged (Future) | Author, Team | In-app, Slack | LOW |
| Issue Created (Future) | Assigned users, Project manager | In-app, Email | MEDIUM |

#### Organisation Module (5 triggers) - **LOW PRIORITY**
*Note: 3 notifications already implemented*

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| New Organisation Created | Super admin, New org owner | Email | LOW |
| User Invited to Org ✅ | Invited user | Email, In-app | MEDIUM |
| User Role Changed | User affected, Org admins | Email, In-app | MEDIUM |
| Organisation Settings Changed | Org admins | In-app | LOW |
| Module Enabled/Disabled | All org users | In-app | LOW |

#### Webhook Module (3 triggers) - **LOW PRIORITY**

| Trigger | Recipients | Channels | Priority |
|---------|-----------|----------|----------|
| Webhook Failed | Org admin, Integration owner | Email, In-app | MEDIUM |
| Webhook Retry Exhausted | Org admin | Email, Slack | HIGH |
| Webhook Disabled | Org admin, Integration owner | Email, In-app | MEDIUM |

**Total Notification Types**: 78+ across 10 modules

### Database Schema

#### notification_preferences table
```sql
CREATE TABLE notification_preferences (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    channel ENUM('email', 'database', 'slack', 'broadcast') NOT NULL,
    notification_type VARCHAR(255) NOT NULL, -- e.g., 'ticket_assigned'
    category ENUM('ticket', 'document', 'billing', 'deployment', 'system', 'security', 'timesheet') NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    frequency ENUM('instant', 'daily_digest', 'weekly_digest') DEFAULT 'instant',
    quiet_hours_start TIME NULL,
    quiet_hours_end TIME NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    UNIQUE KEY unique_preference (user_id, channel, notification_type),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_channel (user_id, channel),
    INDEX idx_notification_type (notification_type)
);
```

#### notification_digests table
```sql
CREATE TABLE notification_digests (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    notification_ids JSON NOT NULL, -- Array of notification UUIDs
    frequency ENUM('daily', 'weekly') NOT NULL,
    sent_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_frequency (user_id, frequency)
);
```

#### organisation_settings additions
```sql
-- Slack webhook URLs per module (already using organisation_settings table)
INSERT INTO organisation_settings (organisation_id, module, key, value) VALUES
('org-uuid', 'Slack', 'channel_deployments', 'https://hooks.slack.com/services/T00/B00/XXX'),
('org-uuid', 'Slack', 'channel_billing', 'https://hooks.slack.com/services/T00/B00/YYY'),
('org-uuid', 'Slack', 'channel_tickets', 'https://hooks.slack.com/services/T00/B00/ZZZ');
```

### Dependencies

#### Backend Packages (Need to Install)
```json
{
  "laravel/slack-notification-channel": "^3.2"
}
```

#### Frontend Packages (Already Installed)
- Laravel Echo ✅
- Pusher JS ✅
- Inertia.js ✅

### Performance Considerations

1. **Queue All Notifications**
   - Implement `ShouldQueue` on all notification classes
   - Use dedicated `notifications` queue
   - Set retry attempts: 3 with exponential backoff

2. **Database Indexing**
   - Add composite index on `notifications` table: `(notifiable_type, notifiable_id, read_at)`
   - Index on `notification_preferences`: `(user_id, channel, notification_type)`

3. **Caching Strategy**
   - Cache unread count: TTL 5 minutes
   - Cache user preferences: TTL 1 hour
   - Invalidate on preference changes

4. **Rate Limiting**
   - Email: Max 10 per hour per user per type
   - Slack: Batch messages, respect 1 msg/sec limit
   - Broadcast: Throttle by user session

5. **Batch Processing**
   - Use `Notification::send($users, ...)` for bulk sends
   - Chunk large user sets (1000 at a time)
   - Process digests in background jobs

---

## Implementation Plan

### Phase 1: Foundation (2 weeks)
**Goal**: Core notification infrastructure and preferences

**Milestones**:
- M1.1: Notification Module created
- M1.2: User preference system functional
- M1.3: Slack channel configured
- M1.4: BaseNotification class implemented

### Phase 2: High-Priority Modules (3 weeks)
**Goal**: Notifications for Ticket, Billing, Deployment modules

**Milestones**:
- M2.1: All Ticket notifications implemented (9 types)
- M2.2: Billing notifications implemented (9 types)
- M2.3: Deployment notifications implemented (6 types)

### Phase 3: Medium-Priority Modules (2 weeks)
**Goal**: Document, Timesheet, Ohdear notifications

**Milestones**:
- M3.1: Document notifications enhanced (6 new types)
- M3.2: Timesheet notifications implemented (8 types)
- M3.3: Ohdear notifications implemented (7 types)

### Phase 4: Remaining Modules (2 weeks)
**Goal**: CSP, GitHub, Customer, Organisation notifications

**Milestones**:
- M4.1: CSP notifications implemented (6 types)
- M4.2: GitHub notifications implemented (6 types)
- M4.3: Customer/Organisation notifications (6 types)

### Phase 5: Advanced Features (3 weeks)
**Goal**: Digests, analytics, Slack OAuth

**Milestones**:
- M5.1: Daily/weekly digest system
- M5.2: Notification grouping and collapsing
- M5.3: Slack OAuth integration
- M5.4: Analytics dashboard

### Resource Requirements

**Development**:
- 1 Senior Backend Developer (8-12 weeks)
- 1 Frontend Developer (4-6 weeks)
- 1 QA Engineer (2-3 weeks)

**Infrastructure**:
- Soketi server (self-hosted or cloud)
- Redis for queues (already available)
- Slack workspace access
- Email service (existing)

---

## Risk Assessment

### Technical Risks

| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| **Queue Processing Failures** | HIGH | MEDIUM | Monitor queue with Horizon, alerting, auto-retry |
| **Email Deliverability Issues** | HIGH | MEDIUM | SPF/DKIM/DMARC setup, monitor bounce rates, use reputable provider |
| **Slack Rate Limiting** | MEDIUM | MEDIUM | Implement backoff, batch messages, queue with delays |
| **Broadcast Scalability** | MEDIUM | LOW | Start with Pusher, migrate to self-hosted Soketi if needed |
| **Database Performance** | MEDIUM | LOW | Optimize queries, add indexes, archive old notifications |
| **Multi-tenancy Context Issues** | HIGH | MEDIUM | Store org_id in notification data, validate on display |
| **Privacy/Security Leaks** | HIGH | LOW | Encrypt sensitive data, use private broadcast channels, audit |

### Timeline Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Scope Creep** | Delays | Strict prioritization, phase-based rollout |
| **Integration Complexity** | Delays | Start with simple notifications, iterate |
| **Testing Time** | Delays | Automated tests, parallel testing with development |

### Operational Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **User Notification Fatigue** | Unsubscribes | Preferences system, digests, clear priorities |
| **Support Burden** | Increased tickets | Comprehensive documentation, preference UI |
| **Maintenance Overhead** | Technical debt | Reusable base classes, consistent patterns |

---

## Task List

### Phase 1: Foundation (Tasks 1-10)

#### Task 1: Create Notification Module Skeleton
**Priority**: HIGH
**Effort**: Small (2 hours)
**Dependencies**: None
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Module generated: `php artisan module:make Notification`
- [ ] Directory structure follows standard module pattern
- [ ] Module registered in `composer.json`
- [ ] Module service provider auto-discovered

---

#### Task 2: Design & Create Notification Preferences Database Schema
**Priority**: HIGH
**Effort**: Medium (4 hours)
**Dependencies**: Task 1
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Migration created: `create_notification_preferences_table`
- [ ] Includes all fields: user_id, channel, notification_type, category, enabled, frequency, quiet_hours
- [ ] Unique constraint on (user_id, channel, notification_type)
- [ ] Proper indexes created
- [ ] Foreign key to users table with cascade delete
- [ ] Migration runs successfully

---

#### Task 3: Create NotificationPreference Model
**Priority**: HIGH
**Effort**: Small (2 hours)
**Dependencies**: Task 2
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Model created with proper relationships to User
- [ ] Fillable attributes defined
- [ ] Casts for enums (channel, frequency, category)
- [ ] Scopes for filtering (byType, byChannel, enabled)
- [ ] Validation rules defined
- [ ] Unit tests pass

---

#### Task 4: Build NotificationRoutingService
**Priority**: HIGH
**Effort**: Large (8 hours)
**Dependencies**: Task 3
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Service class determines appropriate channels for notification
- [ ] Checks user preferences
- [ ] Respects quiet hours
- [ ] Handles priority overrides (critical always sends)
- [ ] Returns array of channels to use
- [ ] Unit tests achieve 90% coverage
- [ ] Integration tests with User model

---

#### Task 5: Create BaseNotification Abstract Class
**Priority**: HIGH
**Effort**: Medium (6 hours)
**Dependencies**: Task 4
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Abstract class extends Laravel Notification
- [ ] Implements ShouldQueue
- [ ] `via()` method uses NotificationRoutingService
- [ ] Abstract methods: getNotificationType(), getCategory(), getPriority()
- [ ] Default queue name: 'notifications'
- [ ] Retry logic: 3 attempts with exponential backoff
- [ ] Failed notification logging
- [ ] Unit tests for channel selection logic

---

#### Task 6: Install & Configure Slack Notification Channel
**Priority**: HIGH
**Effort**: Small (3 hours)
**Dependencies**: None
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Package installed: `composer require laravel/slack-notification-channel`
- [ ] Slack webhook configured in organisation_settings
- [ ] Test notification sent successfully to Slack
- [ ] Documentation updated with Slack setup instructions
- [ ] Error handling for failed Slack messages

---

#### Task 7: Create NotificationPreferenceController (API)
**Priority**: HIGH
**Effort**: Medium (5 hours)
**Dependencies**: Task 3
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] RESTful endpoints: index, store, update, destroy
- [ ] Authentication middleware applied
- [ ] Validation for preference data
- [ ] Returns JSON responses
- [ ] Unit tests for all endpoints
- [ ] Postman/API documentation

**Endpoints**:
- `GET /api/notification-preferences` - List all preferences
- `POST /api/notification-preferences` - Create preference
- `PUT /api/notification-preferences/{id}` - Update preference
- `DELETE /api/notification-preferences/{id}` - Delete preference
- `POST /api/notification-preferences/bulk` - Bulk update

---

#### Task 8: Build Notification Preferences React Component
**Priority**: HIGH
**Effort**: Large (10 hours)
**Dependencies**: Task 7
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Settings page at `/settings/notifications`
- [ ] Grouped by category (Ticket, Document, Billing, etc.)
- [ ] Toggle switches for email, in-app, Slack per notification type
- [ ] Frequency selector (instant, daily digest, weekly digest)
- [ ] Quiet hours time picker
- [ ] Save button with loading state
- [ ] Success/error notifications
- [ ] Responsive design
- [ ] Accessible (ARIA labels, keyboard navigation)

---

#### Task 9: Create Default Notification Preferences Seeder
**Priority**: MEDIUM
**Effort**: Small (2 hours)
**Dependencies**: Task 3
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Seeder creates default preferences for new users
- [ ] Sensible defaults by user type (org vs customer)
- [ ] High-priority notifications enabled by default
- [ ] Low-priority set to digest by default
- [ ] Runs as part of user registration
- [ ] Can be run standalone: `php artisan db:seed NotificationPreferenceSeeder`

---

#### Task 10: Add Notification Preference Initialization to User Registration
**Priority**: MEDIUM
**Effort**: Small (2 hours)
**Dependencies**: Task 9
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] New users automatically get default preferences
- [ ] Triggered in User model observer or registration event
- [ ] Works for both organisation and customer users
- [ ] Doesn't slow down registration process (queued)
- [ ] Integration test verifies preferences created

---

### Phase 2: High-Priority Modules (Tasks 11-30)

#### Task 11: Create TicketAssignedNotification
**Priority**: CRITICAL
**Effort**: Medium (4 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Extends BaseNotification
- [ ] Email template (Markdown)
- [ ] In-app notification data structure
- [ ] Slack message format
- [ ] Broadcast event payload
- [ ] Includes: ticket ID, title, priority, customer name, assigned by
- [ ] Link to ticket
- [ ] Unit tests for all channels
- [ ] Integration test with actual sending

---

#### Task 12: Create TicketCommentNotification
**Priority**: CRITICAL
**Effort**: Medium (4 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Extends BaseNotification
- [ ] Email shows comment preview (first 200 chars)
- [ ] @mention detection and highlighting
- [ ] In-app notification with comment preview
- [ ] Slack message with comment text
- [ ] Link directly to comment
- [ ] Unit tests for mention detection
- [ ] Integration tests

---

#### Task 13: Create TicketResolvedNotification
**Priority**: HIGH
**Effort**: Small (3 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Extends BaseNotification
- [ ] Email template for customer and internal users
- [ ] Includes resolution notes
- [ ] Includes resolution time/SLA status
- [ ] Call to action: "Reopen if not resolved"
- [ ] Unit tests

---

#### Task 14: Create TicketOverdueNotification
**Priority**: HIGH
**Effort**: Medium (4 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Extends BaseNotification
- [ ] Highlights overdue duration
- [ ] Lists all overdue tickets for user
- [ ] Urgent styling for email/Slack
- [ ] Scheduled job to check overdue tickets
- [ ] Job runs daily at 9am
- [ ] Unit tests
- [ ] Scheduled job test

---

#### Task 15: Create TicketStatusChangedNotification
**Priority**: MEDIUM
**Effort**: Small (3 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Shows old status → new status
- [ ] Who made the change
- [ ] Reason for change (if provided)
- [ ] Unit tests

---

#### Task 16: Create Ticket Event Listeners
**Priority**: CRITICAL
**Effort**: Medium (5 hours)
**Dependencies**: Tasks 11-15
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Listener: SendTicketAssignedNotification (on TicketUpdated if assigned_to changed)
- [ ] Listener: SendTicketCommentNotification (on MessageCreated event)
- [ ] Listener: SendTicketResolvedNotification (on TicketUpdated if status→resolved)
- [ ] Listener: SendTicketStatusChangedNotification (on TicketUpdated if status changed)
- [ ] Listeners registered in TicketServiceProvider
- [ ] Determine correct recipients for each notification
- [ ] Integration tests for each listener

---

#### Task 17: Create InvoiceCreatedNotification
**Priority**: HIGH
**Effort**: Medium (4 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Email with invoice PDF attachment
- [ ] Invoice details: number, amount, due date
- [ ] Payment instructions
- [ ] Link to view invoice online
- [ ] Slack notification to billing channel
- [ ] Unit tests

---

#### Task 18: Create InvoiceOverdueNotification
**Priority**: CRITICAL
**Effort**: Medium (5 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Urgent styling/subject
- [ ] Days overdue highlighted
- [ ] Outstanding balance
- [ ] Payment link
- [ ] Escalation logic (7 days, 30 days different messages)
- [ ] Slack alert for org billing team
- [ ] Scheduled job to check overdue invoices (daily)
- [ ] Unit tests
- [ ] Job tests

---

#### Task 19: Create PaymentReceivedNotification
**Priority**: HIGH
**Effort**: Small (3 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Receipt email to customer
- [ ] Payment amount, date, method
- [ ] Invoice marked as paid
- [ ] Remaining balance (if partial payment)
- [ ] Thank you message
- [ ] Unit tests

---

#### Task 20: Create PaymentFailedNotification
**Priority**: HIGH
**Effort**: Medium (4 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Error message explaining failure
- [ ] Instructions to update payment method
- [ ] Link to billing portal
- [ ] Slack alert to billing team
- [ ] Unit tests

---

#### Task 21: Integrate Billing Notifications with Xero Webhook
**Priority**: HIGH
**Effort**: Medium (6 hours)
**Dependencies**: Tasks 17-20
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] XeroInvoiceController triggers notifications on:
  - Invoice created
  - Invoice sent
  - Payment received
  - Payment failed
- [ ] Webhook handles all invoice statuses
- [ ] Error handling for failed notifications
- [ ] Integration tests with webhook events

---

#### Task 22: Create DeploymentSuccessNotification
**Priority**: HIGH
**Effort**: Medium (4 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Environment (staging/production) highlighted
- [ ] Deployed by (user/system)
- [ ] Git branch/commit
- [ ] Deployment duration
- [ ] Link to deployment log
- [ ] Slack message with emoji ✅
- [ ] Unit tests

---

#### Task 23: Create DeploymentFailedNotification
**Priority**: CRITICAL
**Effort**: Medium (5 hours)
**Dependencies**: Task 5
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] CRITICAL priority (all channels)
- [ ] Error message excerpt
- [ ] Failed step in pipeline
- [ ] Link to logs
- [ ] Rollback instructions
- [ ] Slack alert with @channel mention
- [ ] On-call engineer notification
- [ ] Unit tests

---

#### Task 24: Integrate Deployment Notifications with Webhook
**Priority**: HIGH
**Effort**: Medium (4 hours)
**Dependencies**: Tasks 22-23
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] DeploymentWebhookController triggers notifications
- [ ] Handles success, failure, warning states
- [ ] Determines recipients based on environment
- [ ] Production deployments notify more people
- [ ] Integration tests

---

#### Task 25-30: Additional Ticket Notifications (Reopened, Priority Changed, Escalated)
*Similar structure to tasks above - 6 more notification classes*

---

### Phase 3: Medium-Priority Modules (Tasks 31-50)
*Document, Timesheet, Ohdear notifications - detailed task breakdown similar to above*

---

### Phase 4: Remaining Modules (Tasks 51-70)
*CSP, GitHub, Customer notifications - detailed task breakdown*

---

### Phase 5: Advanced Features (Tasks 71-85)

#### Task 71: Create Daily Digest Job
**Priority**: MEDIUM
**Effort**: Large (8 hours)
**Dependencies**: Task 3
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Job class: SendDailyDigest
- [ ] Queries users with digest preferences
- [ ] Groups unsent notifications by user
- [ ] Sends single email with all notifications
- [ ] Markdown template for digest
- [ ] Categorized by notification type
- [ ] Scheduled to run daily at 8am
- [ ] Unit tests
- [ ] Queue tests

---

#### Task 72: Create Weekly Digest Job
**Priority**: MEDIUM
**Effort**: Medium (6 hours)
**Dependencies**: Task 71
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Similar to daily digest
- [ ] Includes weekly summary stats
- [ ] Runs every Monday at 8am
- [ ] Unit tests

---

#### Task 73: Implement Notification Grouping
**Priority**: LOW
**Effort**: Large (10 hours)
**Dependencies**: None
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Multiple similar notifications collapsed into one
- [ ] Example: "5 new tickets assigned" instead of 5 separate
- [ ] Frontend displays expandable grouped notifications
- [ ] Mark all as read in group
- [ ] Unit tests

---

#### Task 74: Slack OAuth Integration
**Priority**: LOW
**Effort**: X-Large (16 hours)
**Dependencies**: Task 6
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Slack OAuth flow for organisations
- [ ] Store access tokens in organisation_settings
- [ ] Retrieve user Slack IDs via API
- [ ] Direct message to users (not just channels)
- [ ] Token refresh logic
- [ ] Revocation handling
- [ ] Admin UI for Slack connection
- [ ] Integration tests

---

#### Task 75: Notification Analytics Dashboard
**Priority**: LOW
**Effort**: Large (12 hours)
**Dependencies**: None
**GitHub Issue**: [To be created]

**Acceptance Criteria**:
- [ ] Admin dashboard showing:
  - Notifications sent by type
  - Delivery success rate by channel
  - Read/unread rates
  - Most active users
  - Failed notification log
- [ ] Date range filter
- [ ] Export to CSV
- [ ] Charts with Recharts
- [ ] Unit tests

---

*Additional advanced feature tasks (76-85): Slack interactive messages, SMS channel, push notifications, etc.*

---

## Success Metrics

### Key Performance Indicators (KPIs)

**User Engagement**:
- [ ] 80%+ notification open rate (in-app)
- [ ] 40%+ email open rate
- [ ] <5% unsubscribe rate
- [ ] 60%+ users customize preferences

**System Performance**:
- [ ] 99.9% notification delivery success rate
- [ ] <30 second average queue processing time
- [ ] <5 minute delivery time for critical notifications
- [ ] Zero queue backlog during normal operations

**Business Impact**:
- [ ] 20% reduction in "ticket status?" support inquiries
- [ ] 15% improvement in invoice payment time (fewer overdue)
- [ ] 50% faster incident response (deployment/downtime alerts)
- [ ] 90% user satisfaction with notification system (survey)

**Technical Quality**:
- [ ] 90%+ unit test coverage for notification classes
- [ ] Zero data privacy breaches
- [ ] <1% failed notification rate
- [ ] All notifications queued (zero blocking operations)

---

## Documentation Requirements

### User Documentation
- [ ] Notification preferences guide (screenshots)
- [ ] Email/Slack setup instructions
- [ ] Quiet hours explanation
- [ ] Digest subscription guide
- [ ] Troubleshooting common issues

### Developer Documentation
- [ ] Creating a new notification (step-by-step)
- [ ] BaseNotification API reference
- [ ] NotificationRoutingService usage
- [ ] Testing notifications guide
- [ ] Slack channel configuration

### Admin Documentation
- [ ] Organisation-level Slack setup
- [ ] Monitoring notification queue
- [ ] Analytics dashboard guide
- [ ] Troubleshooting failed notifications

---

## Rollout Strategy

### Phase 1: Internal Testing (Week 1-2)
- Deploy to development environment
- Internal team testing
- Fix critical bugs
- Collect feedback

### Phase 2: Beta Testing (Week 3-4)
- Deploy to staging
- Select 5-10 beta customers
- Monitor delivery rates
- Iterate based on feedback

### Phase 3: Gradual Rollout (Week 5-6)
- Enable for 25% of users
- Monitor performance metrics
- Increase to 50%, then 100%
- Full production deployment

### Rollback Plan
- Feature flag for notification system
- Disable specific notification types if issues arise
- Revert to previous version if critical bugs
- Maintain database compatibility

---

## Appendix

### Related Documents
- `NOTIFICATION_SETUP.md` - Existing notification setup guide
- Laravel Notification Documentation
- Slack API Documentation
- Pusher/Soketi Documentation

### Glossary
- **Notifiable**: User or entity that can receive notifications
- **Channel**: Delivery method (email, database, Slack, broadcast)
- **Digest**: Grouped notification summary sent periodically
- **Quiet Hours**: Time period when non-critical notifications are suppressed
- **Broadcast**: Real-time notification via WebSocket

### Change Log
- 2025-11-18: Initial PRD created
- [Future updates will be tracked here]

---

**Document Version**: 1.0
**Last Updated**: 2025-11-18
**Next Review**: 2025-12-18