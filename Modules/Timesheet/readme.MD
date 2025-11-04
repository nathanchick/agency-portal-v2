1. Overview

Purpose: Build an internal timesheet system that enables your teams (project, support, upgrades) to:
•	Track time and expenses against customers/services/tasks
•	Set budgets (hours or fixed fee) and monitor utilisation
•	Manage budget periods with rollover/deduction functionality (KEY DIFFERENTIATOR)
•	Produce reports on service profitability, team capacity, and utilisation
•	Export time tracking data for billing purposes
•	Integrate with existing tools/workflows (timer widgets, browser/desktop/mobile, calendar, etc)

Key Differentiator - Budget Period Ledger System:
Unlike Harvest and similar tools, this system maintains a complete budget ledger with period-by-period tracking:
•	Monthly/Quarterly/Yearly budget periods with automatic rollover tracking
•	End-of-period reconciliation: Service managers decide to rollover unused hours, lose them, invoice excess separately, or deduct from next period
•	Budget change history: Track when customer budgets change (e.g., 30h/month → 50h/month for Q3 → back to 30h/month)
•	Complete audit trail: Every budget decision, adjustment, and rollover is recorded with timestamps and reasons
•	Customer transparency: Export detailed budget ledger showing allocation, usage, rollovers, and adjustments per period

Example: Customer has 30h/month retainer. June: used 26h, rolled over 4h to July. July budget becomes 34h (30 base + 4 rollover). If July uses 37h (3h over), August can be reduced to 27h (30 - 3) or excess invoiced separately.

Platform Entity Alignment:
•	Customer = Existing customer entity (already in platform)
•	Project = Existing project entity (deliverables like "UK Store", "Product Hub Website")
•	Service = NEW entity for billable work engagements (e.g., "Monthly Support for UK Store", "Q1 Upgrades")
•	Task = Time entry categories (e.g., "Bug Fix", "Feature Development", "Support Call")

Hierarchy:
Organisation → Customers → Projects (deliverables) → Services (billing units) → Tasks (time categories)

Scope (MVP):
•	Time entry (manual and timer)
•	Services, customers, tasks hierarchy
•	Budget period tracking with automatic period creation (Monthly/Quarterly/Yearly/OneTime)
•	Budget ledger system with rollover/deduction reconciliation (KEY FEATURE)
•	Budget change history with effective dates
•	End-of-period reconciliation UI for service managers
•	Basic reporting (hours by service/user, billable vs non-billable)
•	Budget transparency reports and ledger exports
•	Data export (CSV/PDF) for billing purposes
•	Permission/roles (user, manager, admin)
•	Integrations can be deferred to later versions

Non-scope (for later phases):
•	Invoicing (handled by separate system)
•	Deep integrations (e.g., full accounting, API for all endpoints)
•	Advanced dashboards beyond basic reporting
•	Offline mode / automatic tracking
•	Multi-currency support

⸻

2. Core Entities & Data Model

Here are key entities and major attributes.

Customer (EXISTING - Modules\Customer\Models\Customer)
•	id (UUID)
•	organisation_id (FK)
•	name
•	status
•	allow_all_users
Note: Existing customer entity in platform. Has relationships to projects, users, websites.

Project (EXISTING - Modules\Customer\Models\Project)
•	id (UUID)
•	customer_id (FK)
•	name
•	description
Note: Existing project entity represents deliverables (e.g., "UK Store", "Product Hub Website"). Services will link to projects optionally.

Service (NEW - replaces Harvest's "Project" concept)
•	id (UUID)
•	organisation_id (FK)
•	customer_id (FK)
•	project_id (FK) [nullable - optional link to deliverable project]
•	name (e.g., "Monthly Support - UK Store", "Q1 Upgrades")
•	description
•	status (Active, Archived, Completed)
•	billing_type (Hourly, FixedFee, NonBillable)
•	budget_period (Monthly, Quarterly, Yearly, OneTime)
•	current_budget_hours (nullable - current period budget)
•	current_budget_amount (nullable - current period budget)
•	budget_include_expenses (boolean)
•	budget_rollover_enabled (boolean - allow unused hours to rollover)
•	start_date
•	end_date (nullable)
•	default_hourly_rate (nullable)
•	service_manager_id (FK to User - primary decision maker for budget reconciliation)
•	created_at / updated_at

ServiceBudgetPeriod (NEW - tracks budget history and changes over time)
•	id (UUID)
•	service_id (FK)
•	period_start (date)
•	period_end (date)
•	budget_hours (decimal - allocated hours for this period)
•	budget_amount (decimal - allocated amount for this period)
•	hours_used (decimal - actual hours tracked in this period)
•	amount_used (decimal - calculated from hours × rates)
•	hours_rollover_from_previous (decimal - hours carried over from previous period, default 0)
•	hours_rollover_to_next (decimal - hours to carry to next period, nullable until reconciled)
•	reconciled (boolean - whether period has been closed and reconciled)
•	reconciled_by (FK to User - nullable)
•	reconciled_at (timestamp - nullable)
•	reconciliation_action (enum: rollover, lose, invoice_separately, deduct_next - nullable until reconciled)
•	reconciliation_notes (text - nullable)
•	created_at / updated_at

ServiceBudgetChange (NEW - audit trail of budget changes)
•	id (UUID)
•	service_id (FK)
•	changed_by (FK to User)
•	effective_from (date)
•	effective_to (date - nullable)
•	old_budget_hours (decimal - nullable)
•	new_budget_hours (decimal)
•	old_budget_amount (decimal - nullable)
•	new_budget_amount (decimal - nullable)
•	reason (text)
•	created_at

Task (NEW - time entry categories)
•	id (UUID)
•	organisation_id (FK)
•	service_id (FK)
•	name (e.g., "Bug Fix", "Feature Development", "Support Call", "Meeting")
•	description
•	billable (boolean)
•	hourly_rate_override (nullable)
•	is_active (boolean)
•	created_at / updated_at

User (EXISTING - App\Models\User)
•	id (UUID)
•	name
•	email
•	default_hourly_rate (nullable) [may need to add this field]
Note: Existing user entity with organisation relationships already established.

TimeEntry (NEW)
•	id (UUID)
•	organisation_id (FK)
•	user_id (FK)
•	service_id (FK)
•	task_id (FK)
•	customer_id (FK) [denormalised for reporting]
•	project_id (FK) [denormalised for reporting - nullable]
•	start_time (nullable - timestamp for timer)
•	end_time (nullable - timestamp for timer)
•	duration_hours (decimal)
•	date (date)
•	description (text)
•	billable (boolean)
•	hourly_rate (decimal - captured at time of entry)
•	approved (boolean)
•	approved_by (FK to User - nullable)
•	approved_at (timestamp - nullable)
•	timer_running (boolean)
•	created_at / updated_at

⸻

3. Functional Requirements

Here are modules and features.

3.1 Time Tracking
•	Users can start a timer for a given Service + Task.
•	Users can stop a timer; system calculates duration from start_time to end_time.
•	Users can enter a time entry manually (date, duration, service/task, description).
•	Time entries default to being billable/non-billable based on task/service settings but user can override.
•	Timer widget available (desktop/desktop web) – optional in MVP.
•	Weekly timesheet view: users see a grid of days vs services/tasks and can fill in durations.
•	Notifications/reminders: users get reminders to submit timesheet or stop timers (optional).
•	Approvals: Service managers or admins can review and approve submitted timesheets before export.

3.2 Service Management
•	Create/edit services with customer, optional project linkage, billing type, budgets.
•	Link services to existing platform projects (deliverables) for reporting.
•	Assign service manager (user responsible for oversight).
•	Define default hourly rate at service level.
•	Set service status (Active, Archived, Completed).
•	View service dashboard showing time tracked, budget usage, team members.

3.3 Budgets & Alerts
•	For each service, budget set either in hours or amount (or both).
•	Define budget period (Monthly, Quarterly, Yearly, OneTime).
•	Track actual time (and expenses if applicable) against current period budget.
•	Display budget usage including rollover hours (e.g., "75% of budget used – 5 hours left (includes 4 hours rolled over)").
•	Alerts/notifications when usage > threshold (e.g., 80%).
•	Flag service status when budget exceeded.
•	View budget history across all periods for a service.
•	Budget changes tracked with effective dates and reasons.

3.3.1 Budget Period Management
•	System automatically creates budget periods based on service configuration.
•	For monthly services: new period created on 1st of each month.
•	Budget amounts can vary per period (e.g., 30 hours in June, 50 hours in July-September, back to 30 hours in October).
•	Future periods can be pre-configured with different budget amounts.
•	Budget changes recorded in ServiceBudgetChange with effective dates and audit trail.

3.3.2 End-of-Period Reconciliation (KEY DIFFERENTIATOR)
•	At period end (e.g., end of month), service manager is prompted to reconcile.
•	System calculates: allocated budget, hours used, variance (under/over).
•	Service manager presented with reconciliation options:

**Scenario 1: Under-budget (unused hours)**
Example: 30 hours allocated, 26 hours used = 4 hours unused
Options:
  - **Rollover**: Add 4 hours to next period (next month becomes 34 hours)
  - **Lose**: Hours expire, next period starts with standard budget (30 hours)

**Scenario 2: Over-budget (excess hours)**
Example: 30 hours allocated, 37 hours used = 7 hours over
Options:
  - **Invoice Separately**: Mark as requiring external invoice (outside platform), next period starts fresh (30 hours)
  - **Deduct from Next**: Subtract 7 hours from next period (next month becomes 23 hours)

•	Service manager adds notes explaining reconciliation decision.
•	Reconciliation action recorded in ServiceBudgetPeriod with timestamp and user.
•	Next period automatically adjusted based on reconciliation decision.
•	Budget ledger view shows running balance across periods with all adjustments.

3.3.3 Budget Ledger View
•	Display chronological list of all budget periods for a service.
•	Show: period dates, allocated budget, rollover from previous, total available, hours used, variance, reconciliation action.
•	Visual timeline showing budget changes and usage patterns.
•	Export ledger to CSV/PDF for customer reporting.

3.4 Task Management
•	Create reusable task types at organisation level (e.g., "Bug Fix", "Support Call", "Meeting").
•	Link tasks to specific services or make them global.
•	Set task as billable/non-billable by default.
•	Override hourly rate at task level if needed.

3.5 Reporting & Analytics
•	Reports by user: hours worked, billable vs non-billable, utilisation rate.
•	Reports by service/customer: total hours, billable hours, budget vs actual, expenses, margin.
•	Reports by project (deliverable): aggregate time across all related services.
•	Reports by task type: which tasks cost most time.
•	Dashboard: key metrics (e.g., hours this week, top customers, budget alerts).
•	Export capability (CSV/PDF) for further analysis.

3.6 Integrations
•	Calendar integration: users can connect to their calendar (e.g., Google Calendar) and see events to fill time entries.
•	Timer integration: browser extension/desktop app for Start/Stop timer.
•	API: Provide REST endpoints to query time entries, services, invoices for external tools.
•	Webhook integration with existing platform webhook system.
•	Authentication: Use existing platform authentication (already has organisation-based auth).

3.7 Permissions & Roles
•	Regular User: can track time/expenses, view own reports, view services they're assigned to.
•	Service Manager: manage services they oversee, approve timesheets, view team reports for their services.
•	Admin: full access (all services, settings, billing, manage users).
•	Uses existing platform role system (organisation_user.role_id).

3.8 UI/UX Requirements
•	Intuitive start/stop timer prominently placed.
•	Quick "add time entry" form for manual logs.
•	Weekly timesheet grid view.
•	Service dashboard widget: budget usage, remaining, next alert.
•	Report builder: select filters (user, customer, service, project, date range) and view metrics.
•	Mobile responsive for core time entry functionality (desktop first).
•	Clean, minimal design consistent with existing platform UI.
•	Integration with existing navigation and sidebar.

⸻

4. Non-Functional Requirements
   •	Scalability: Must handle many users, many time entries, many projects.
   •	Performance: Timer start/stop in <2s, reports generating in <5s for typical dataset.
   •	Security: Role-based access; secure authentication (SSO if needed); data encryption in transit & at rest.
   •	Reliability: Monitoring, backups, uptime goal ~99.9%.
   •	Maintainability: Modular architecture; clear API for integrations.
   •	Usability: Low friction for users tracking time; minimal clicks.
   •	Mobile support: At least responsive; native mobile apps optional later.
   •	Auditability: Log changes to entries, approvals, invoice status changes.
   •	Data retention: Time entries, invoices must be retained for financial audit; allow export.
   •	Internationalisation/globalisation: Support multiple currencies (if needed later).

⸻

5. MVP Roadmap / Release Phases

Phase 1 (MVP) - Core Time Tracking & Budget Periods
•	Basic time tracking (manual entries + timer)
•	Services/customers/tasks basic setup
•	Link services to existing customers and projects
•	Budget period configuration (Monthly, Quarterly, Yearly, OneTime)
•	ServiceBudgetPeriod tracking with automatic period creation
•	Budget history and changes (ServiceBudgetChange) with effective dates
•	Budget ledger view showing all periods and rollovers
•	End-of-period reconciliation UI (rollover/lose/invoice_separately/deduct_next)
•	Timesheet view
•	Basic reporting (hours by user/service/customer)
•	Basic roles using existing platform role system

Phase 2 - Approvals & Enhanced Monitoring
•	Budget alerts and monitoring (80% threshold notifications)
•	Service Manager role & timesheet approvals
•	Budget reconciliation notifications and reminders
•	Enhanced reporting (utilisation, profitability analysis, variance trends)
•	Budget transparency reports for customer-facing documentation
•	Weekly/monthly summary views
•	Scheduled jobs for automatic period closure and reconciliation prompts

Phase 3 - Integrations & Advanced Features
•	Integrations (Calendar, Browser/desktop timer)
•	Advanced reporting dashboards with budget variance analysis
•	API endpoints for external tools
•	Webhook triggers for budget events
•	Mobile optimisation
•	Bulk budget change operations
•	Budget forecasting based on historical patterns

⸻

6. API Specification (Excerpt)

Here are sample endpoints for internal API (Phase 3).

Authentication
•	Uses existing platform authentication (organisation-based JWT/session)
•	GET /api/v1/user/me

Services
•	GET /api/v1/services?customer_id=… — list services
•	POST /api/v1/services — create service
•	GET /api/v1/services/{service_id}
•	PUT /api/v1/services/{service_id}
•	GET /api/v1/services/{service_id}/budget — get current period budget usage
•	GET /api/v1/services/{service_id}/budget/ledger — get complete budget history ledger
•	GET /api/v1/services/{service_id}/budget/periods — list all budget periods
•	GET /api/v1/services/{service_id}/budget/periods/{period_id} — get specific period details
•	POST /api/v1/services/{service_id}/budget/periods/{period_id}/reconcile — reconcile period (action: rollover|lose|invoice_separately|deduct_next)
•	POST /api/v1/services/{service_id}/budget/change — create budget change with effective dates
•	GET /api/v1/services/{service_id}/budget/changes — list all budget changes (audit trail)

Tasks
•	GET /api/v1/tasks?service_id=… — list tasks
•	POST /api/v1/tasks — create task
•	GET /api/v1/tasks/{task_id}
•	PUT /api/v1/tasks/{task_id}

Time Entries
•	GET /api/v1/time_entries?user_id=…&from=…&to=… — list entries
•	POST /api/v1/time_entries — create new (manual) entry
•	PUT /api/v1/time_entries/{id} — update entry
•	DELETE /api/v1/time_entries/{id} — delete entry
•	POST /api/v1/time_entries/start — start a timer
•	POST /api/v1/time_entries/{id}/stop — stop a running timer
•	POST /api/v1/time_entries/{id}/approve — approve entry (service manager/admin)

Reporting
•	GET /api/v1/reports/hours?from=…&to=…&group_by=user|service|customer|project
•	GET /api/v1/reports/budget_usage?service_id=…
•	GET /api/v1/reports/utilisation?user_id=…&from=…&to=…
•	POST /api/v1/reports/export — export to CSV/PDF

Webhooks (optional - integrates with platform webhook system)
•	POST /webhook/timesheet_approved
•	POST /webhook/budget_threshold_reached
•	POST /webhook/budget_period_ended — triggers when period ends, requires reconciliation
•	POST /webhook/budget_period_reconciled — triggers after service manager reconciles period

⸻

7. UX Workflow Examples

User logging time
1.	User logs in → selects service/task → clicks "Start Timer"
2.	Timer runs in background; user works
3.	When done: clicks "Stop Timer" → pop-up allows description/edit
4.	Timer data saves as TimeEntry with duration, date, user_id, service_id, task_id, billable flag, hourly_rate

Weekly timesheet submission
1.	User goes to "Timesheet" tab → sees grid: each day vs services/tasks
2.	User edits durations (manual) or confirms timers
3.	User marks timesheet as "Submitted" for week ending date
4.	Service Manager reviews and "Approves" the timesheet entries

Service budget monitoring
1.	Admin creates service for customer: budget_hours = 100, billing_type = "Hourly"
2.	Optionally links service to existing project (deliverable) for tracking
3.	As time entries accumulate, system calculates "hours_used" and "hours_remaining = budget_hours – hours_used"
4.	If hours_used ≥ 80% of budget_hours → send email alert to Service Manager
5.	If hours_used ≥ budget_hours → flag service as "Over budget" in dashboard

Creating a service
1.	Admin/Service Manager navigates to Services → "Create Service"
2.	Selects Customer from dropdown (existing customers)
3.	Optionally selects related Project (deliverable like "UK Store")
4.	Sets service name (e.g., "Q1 2025 Support - UK Store")
5.	Configures billing type (Hourly/FixedFee/NonBillable), budget period (Monthly/Quarterly/Yearly), budget hours/amount
6.	Enables/disables budget rollover option
7.	Assigns service manager (will receive reconciliation prompts)
8.	Creates initial tasks or uses organisation-wide task templates
9.	System creates first ServiceBudgetPeriod record for current period

End-of-period budget reconciliation - Under-budget scenario
1.	On July 1st, system closes June period for "Customer X Monthly Support" service
2.	System calculates: 30 hours allocated, 26 hours used, 4 hours unused
3.	Service Manager receives notification: "June period ended with 4 unused hours. Action required."
4.	Service Manager navigates to Service → Budget tab → June period (Pending Reconciliation)
5.	Views summary: "Budget: 30h | Used: 26h | Unused: 4h"
6.	Presented with options:
    - "Rollover to July" → July budget becomes 34 hours (30 base + 4 rollover)
    - "Lose unused hours" → July budget remains 30 hours
7.	Service Manager selects "Rollover to July" and adds note: "Customer approved rollover for unused support hours"
8.	System records: reconciled = true, reconciliation_action = 'rollover', hours_rollover_to_next = 4
9.	System creates July period: budget_hours = 30, hours_rollover_from_previous = 4, total available = 34
10.	Budget ledger shows: June (30h, used 26h, +4h rollover) → July (30h base + 4h rollover = 34h available)

End-of-period budget reconciliation - Over-budget scenario
1.	On July 1st, system closes June period for "Customer Y Monthly Support" service
2.	System calculates: 30 hours allocated, 37 hours used, 7 hours over
3.	Service Manager receives notification: "June period ended with 7 hours over budget. Action required."
4.	Service Manager navigates to Service → Budget tab → June period (Pending Reconciliation)
5.	Views summary: "Budget: 30h | Used: 37h | Over: 7h (£700 at £100/hour)"
6.	Presented with options:
    - "Invoice separately" → Mark as external billing, July starts fresh at 30 hours
    - "Deduct from July" → July budget becomes 23 hours (30 - 7 deduction)
7.	Service Manager selects "Deduct from July" and adds note: "Customer agreed to reduce July hours to account for overage"
8.	System records: reconciled = true, reconciliation_action = 'deduct_next', hours_rollover_to_next = -7
9.	System creates July period: budget_hours = 30, hours_rollover_from_previous = -7, total available = 23
10.	Budget ledger shows: June (30h, used 37h, -7h deduction) → July (30h base - 7h deduction = 23h available)

Changing service budget mid-contract
1.	Admin receives request: "Increase Customer X monthly budget from 30h to 50h for July-September, then back to 30h"
2.	Admin navigates to Service → Budget tab → "Change Budget"
3.	Creates budget change: effective_from = "2025-07-01", effective_to = "2025-09-30", new_budget_hours = 50, reason = "Temporary increase for Q3 project support"
4.	Creates second budget change: effective_from = "2025-10-01", effective_to = null, new_budget_hours = 30, reason = "Return to standard monthly hours"
5.	System records both changes in ServiceBudgetChange table
6.	When July period is created: budget_hours = 50 (pulled from active budget change)
7.	August, September periods: budget_hours = 50
8.	October period: budget_hours = 30 (budget change expired)
9.	Budget ledger shows historical changes with effective dates and reasons

Viewing budget ledger
1.	Service Manager navigates to Service → Budget tab → "Ledger" view
2.	System displays table of all periods:
   - **June 2025**: 30h base | 0h rollover | 30h available | 26h used | +4h variance | Action: Rollover
   - **July 2025**: 50h base | +4h rollover | 54h available | 48h used | +6h variance | Action: Pending
   - **August 2025**: 50h base | +6h rollover | 56h available | (in progress)
3.	Visual timeline chart shows budget changes and usage patterns
4.	Export button generates CSV/PDF report for customer billing/transparency


8. Reporting / Dashboard Metrics

Key metrics to surface:
•	Total hours tracked (period)
•	Billable hours vs non-billable hours
•	Utilisation rate = billable_hours / total_hours
•	Service budget usage (%) including rollover hours
•	Top customers by hours tracked
•	Top services by hours tracked
•	Team capacity: hours worked by user vs target
•	Service profitability (hours × rate vs budget)
•	Time breakdown by task type
•	Approval pending count
•	Budget periods pending reconciliation count
•	Budget rollover summary (total hours rolled forward/backward across all services)
•	Budget variance trends (identify services consistently over/under budget)

Budget Ledger Reports:
•	Service budget history showing all periods with rollovers and adjustments
•	Budget change audit trail with effective dates and reasons
•	Customer-facing budget transparency report (monthly usage vs allocation)
•	Period-over-period comparison (usage patterns, variance trends)
•	Reconciliation decision history (who reconciled, what action taken, when)

Dashboard UI: widget cards with e.g., "This week: 120 h tracked", "80% utilisation", "3 services over budget", "5 entries pending approval", "2 periods awaiting reconciliation", "18 hours rolled over this month".

⸻

9. Technical Architecture (Platform Integration)
   •	Front-end: React/Inertia.js (consistent with existing platform)
   •	Back-end: Laravel/PHP (Modules\Timesheet module)
   •	Database: PostgreSQL (existing platform database)
   •	Authentication: Uses existing platform session-based authentication with organisation context
   •	Multi-tenancy: Leverages existing organisation_id scoping
   •	Timer subsystem: Manage running timers (track state, handle stop events, persist to time_entries)
   •	Reporting engine: Eloquent queries with eager loading, indexes on date/organisation_id/service_id
   •	Notifications: Integrate with existing platform notification system
   •	Webhooks: Integrate with existing platform webhook module (Modules\Webhook)
   •	UI Components: Use existing platform component library (shadcn/ui)