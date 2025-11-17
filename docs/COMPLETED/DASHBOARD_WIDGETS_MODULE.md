
# DashboardWidgets Module - Product Requirements Document

**Version**: 1.0
**Date**: 2025-11-14
**Status**: Planning
**Author**: AI Assistant

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technical Analysis](#technical-analysis)
3. [Architecture Design](#architecture-design)
4. [Implementation Plan](#implementation-plan)
5. [Risk Assessment](#risk-assessment)
6. [Task List](#task-list)
7. [Appendix](#appendix)

---

## Executive Summary

### Problem Statement

The current dashboard is a static placeholder with no dynamic content. Users cannot:
- Customize what information they see on their dashboard
- Prioritize data that's important to them
- Have role-appropriate widgets (e.g., customers shouldn't see billing widgets)
- Save their dashboard preferences
- Add or remove widgets based on their workflow

This creates a poor user experience where all users see the same generic landing page regardless of their role, needs, or access level.

### Proposed Solution

Create a **DashboardWidgets Module** that enables:

1. **Modular Widget System**: Each module can define widgets via `config/widget.php`
2. **User Customization**: Users can add, remove, reorder, and configure widgets
3. **Role-Based Access**: Widgets filtered by user role (Admin, Manager, User)
4. **Context Awareness**: Different widgets for organisation vs customer users
5. **Persistent Preferences**: User's dashboard layout saved to database
6. **Drag-and-Drop Interface**: Intuitive widget reordering
7. **Widget Settings**: Configurable parameters (date ranges, filters, limits)

### Key Benefits

**For Users**:
- Personalized dashboard showing relevant information
- Quick access to frequently used data
- Improved productivity through customization
- Better user experience

**For Developers**:
- Standardized widget creation pattern
- Easy to add new widgets to any module
- Reusable components
- Centralized widget registry

**For Business**:
- Increased user engagement
- Reduced support requests ("Where do I find X?")
- Scalable architecture for future widgets
- Competitive feature parity

### Key Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Performance degradation with many widgets | Medium | Lazy loading, pagination, caching |
| Complex permission logic | Medium | Leverage existing role system, comprehensive testing |
| Widget state management complexity | Medium | Use established patterns, React Query for data |
| Migration path for existing users | Low | Auto-create default widgets on first login |
| Cross-module dependencies | Medium | Clear widget registration API, isolated components |

### Success Metrics

- 80% of users customize their dashboard within first week
- Average dashboard load time < 2 seconds
- Widget API response time < 500ms
- Zero permission bypass incidents
- 90%+ user satisfaction with customization features

---

## Technical Analysis

### Current Architecture Assessment

**Dashboard State** (`resources/js/pages/dashboard.tsx`):
```tsx
// Current: Static placeholder
<div className="grid gap-4 md:grid-cols-3">
    {/* 3 empty video-aspect cards */}
    <div className="aspect-video rounded-xl bg-muted/50" />
    <div className="aspect-video rounded-xl bg-muted/50" />
    <div className="aspect-video rounded-xl bg-muted/50" />
</div>
```

**Strengths**:
- Basic grid layout established
- ShadCN UI components available
- Sidebar and navigation working
- Drag-and-drop library installed (@dnd-kit)

**Gaps**:
- No widget rendering system
- No user preference storage
- No widget registry
- No role-based filtering
- No dynamic data fetching

### Module Config Pattern Analysis

**Existing Pattern** (from Freshdesk, Website modules):
```php
// Modules/{ModuleName}/config/config.php
return [
    'name' => 'Module Name',
    'organisation_settings' => [...],
    'customer_settings' => [...],
    'website_settings' => [...],
];
```

**Proposed Extension**:
```php
return [
    'name' => 'Module Name',
    'organisation_settings' => [...],
    'customer_settings' => [...],
    'dashboard_widgets' => [
        'organisation' => [
            'widget_key' => [...],
        ],
        'customer' => [
            'widget_key' => [...],
        ],
    ],
];
```

**Loading Mechanism** (ModuleSettingsService pattern):
- Scan `base_path('Modules')` directory
- Load config files from each module
- Cache in memory/config cache
- Filter by user type and role at runtime

### Database Schema Design

**New Table Required**: `user_dashboard_widgets`

```sql
CREATE TABLE user_dashboard_widgets (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id CHAR(36) NOT NULL,
    organisation_id CHAR(36) NULL,
    customer_id CHAR(36) NULL,
    widget_key VARCHAR(255) NOT NULL,
    position INT NOT NULL DEFAULT 0,
    width INT NOT NULL DEFAULT 1,
    settings JSON NULL,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (organisation_id) REFERENCES organisations(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,

    UNIQUE KEY unique_user_widget (user_id, organisation_id, customer_id, widget_key),
    INDEX idx_user_context (user_id, organisation_id, customer_id),
    INDEX idx_position (position)
);
```

**Rationale**:
- `user_id`: Who owns this preference
- `organisation_id/customer_id`: Context (one will be null)
- `widget_key`: e.g., 'tickets.recent_tickets'
- `position`: For ordering (0-indexed)
- `width`: Grid width (1-3 columns)
- `settings`: Widget-specific JSON config
- `is_visible`: Soft delete/hide without removing
- `UNIQUE` constraint prevents duplicate widgets

### Permission & Role System Integration

**Existing System** (Spatie Permission):
- Roles: Admin, Manager, User
- Team-scoped to organisation or customer
- Middleware: `CheckRole`, `RequireOrganisationUser`

**Widget Access Control**:
```php
// Widget config
'roles' => ['Admin', 'Manager', 'User'],  // Who can use this widget
'user_types' => ['organisation', 'customer'],  // Which user types see it
```

**Filtering Logic**:
```php
// In DashboardWidgetService
public function getAvailableWidgets(User $user): array
{
    $userType = $user->last_customer_id ? 'customer' : 'organisation';
    $role = $this->getUserRole($user);

    $widgets = $this->loadAllWidgetConfigs();

    return collect($widgets)
        ->filter(fn($w) => in_array($userType, $w['user_types']))
        ->filter(fn($w) => in_array($role, $w['roles']))
        ->filter(fn($w) => $this->isModuleEnabled($w['module']))
        ->values()
        ->all();
}
```

### Frontend Architecture

**Component Hierarchy**:
```
Dashboard.tsx (Page)
├── DashboardHeader (Edit mode toggle, Save, Reset)
├── DndContext (Drag-and-drop provider)
│   └── SortableContext (Grid layout)
│       └── SortableWidget (Wrapper with drag handle)
│           └── WidgetComponent (Actual widget from registry)
└── AddWidgetDialog (Modal to add new widgets)
```

**Widget Registry Pattern**:
```typescript
// resources/js/widgets/index.ts
import { RecentTicketsWidget } from './tickets/RecentTicketsWidget'
import { TicketStatsWidget } from './tickets/TicketStatsWidget'

export const widgetRegistry: Record<string, React.ComponentType<WidgetProps>> = {
    'tickets.recent_tickets': RecentTicketsWidget,
    'tickets.ticket_statistics': TicketStatsWidget,
    // Auto-imported by widget key
}

export interface WidgetProps {
    settings?: Record<string, any>;
    isEditing?: boolean;
}
```

**State Management**:
```typescript
// Dashboard state
const [widgets, setWidgets] = useState<UserWidget[]>([])
const [availableWidgets, setAvailableWidgets] = useState<WidgetConfig[]>([])
const [isEditing, setIsEditing] = useState(false)
const [isSaving, setIsSaving] = useState(false)

// Fetch on mount
useEffect(() => {
    fetch(route('dashboard.widgets.index'))
        .then(res => res.json())
        .then(data => {
            setWidgets(data.user_widgets)
            setAvailableWidgets(data.available)
        })
}, [])

// Save on edit complete
const saveLayout = async () => {
    setIsSaving(true)
    await fetch(route('dashboard.widgets.save'), {
        method: 'POST',
        body: JSON.stringify({ widgets })
    })
    setIsSaving(false)
    setIsEditing(false)
}
```

### Widget Configuration Schema

**Widget Definition** (in module config):
```php
'dashboard_widgets' => [
    'organisation' => [
        'recent_tickets' => [
            // Display
            'name' => 'Recent Tickets',
            'description' => 'Display recent support tickets',
            'icon' => 'Ticket',  // Lucide icon name

            // Permissions
            'roles' => ['Admin', 'Manager', 'User'],

            // Layout
            'default_width' => 1,  // 1-3 columns
            'default_visible' => true,
            'default_position' => 0,

            // Frontend
            'component' => 'RecentTicketsWidget',  // React component

            // Backend
            'data_endpoint' => '/api/widgets/tickets/recent',  // Optional: custom endpoint

            // Settings
            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of tickets',
                    'default' => 10,
                    'min' => 5,
                    'max' => 50,
                ],
                'status' => [
                    'type' => 'select',
                    'label' => 'Status filter',
                    'options' => [
                        'all' => 'All Tickets',
                        'open' => 'Open Only',
                        'closed' => 'Closed Only',
                    ],
                    'default' => 'open',
                ],
                'date_range' => [
                    'type' => 'date_range',
                    'label' => 'Date range',
                    'default' => 'last_7_days',
                    'options' => [
                        'today' => 'Today',
                        'last_7_days' => 'Last 7 Days',
                        'last_30_days' => 'Last 30 Days',
                        'custom' => 'Custom Range',
                    ],
                ],
            ],
        ],
    ],
    'customer' => [
        // Customer-specific widgets
    ],
],
```

**Setting Types**:
- `text`: Text input
- `number`: Numeric input with min/max
- `select`: Dropdown with options
- `yes_no`: Boolean toggle
- `date`: Single date picker
- `date_range`: Range picker with presets
- `multiselect`: Multiple selection
- `color`: Color picker

### API Design

**Endpoints**:

1. **GET /dashboard/widgets** - Get user's widgets and available widgets
   ```json
   {
       "user_widgets": [
           {
               "id": 1,
               "widget_key": "tickets.recent_tickets",
               "position": 0,
               "width": 1,
               "is_visible": true,
               "settings": {"limit": 10, "status": "open"}
           }
       ],
       "available_widgets": [
           {
               "key": "tickets.recent_tickets",
               "name": "Recent Tickets",
               "description": "...",
               "component": "RecentTicketsWidget",
               "configurable": true,
               "settings_schema": {...}
           }
       ]
   }
   ```

2. **POST /dashboard/widgets/save** - Save widget layout
   ```json
   {
       "widgets": [
           {
               "widget_key": "tickets.recent_tickets",
               "position": 0,
               "width": 1,
               "is_visible": true,
               "settings": {"limit": 15}
           }
       ]
   }
   ```

3. **POST /dashboard/widgets/reset** - Reset to defaults
   ```json
   {
       "success": true,
       "widgets": [/* default widgets */]
   }
   ```

4. **POST /dashboard/widgets/{widget_key}/toggle** - Toggle visibility
   ```json
   {
       "widget_key": "tickets.recent_tickets",
       "is_visible": false
   }
   ```

5. **POST /dashboard/widgets/{widget_key}/configure** - Update settings
   ```json
   {
       "settings": {"limit": 20, "status": "all"}
   }
   ```

### Performance Considerations

**Backend**:
- Cache module widget configs (config cache)
- Eager load user widgets on dashboard request
- Index on `user_id`, `position` for fast queries
- Validate widget existence before saving

**Frontend**:
- Lazy load widget components with React.lazy()
- Skeleton loading states for each widget
- Error boundaries per widget (one fails, others work)
- Debounce drag-and-drop position updates
- Optimistic UI updates

**Data Fetching**:
- Each widget fetches its own data (independent failures)
- Use React Query or SWR for caching
- Respect widget refresh intervals (e.g., 30s, 1min, 5min)
- Option to disable auto-refresh per widget

---

## Architecture Design

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (React)                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Dashboard Page                                               │
│  ├── AddWidgetDialog ──────┐                                 │
│  ├── DashboardHeader        │                                 │
│  └── WidgetGrid             │                                 │
│      ├── SortableWidget 1   │ DnD Context                     │
│      │   └── RecentTicketsWidget                             │
│      ├── SortableWidget 2   │                                 │
│      │   └── TicketStatsWidget                               │
│      └── SortableWidget 3 ──┘                                 │
│          └── CustomWidget                                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Laravel Backend                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  DashboardWidgetController                                   │
│  ├── index()   ───────► DashboardWidgetService              │
│  ├── save()             ├── getAvailableWidgets()           │
│  ├── reset()            ├── getUserWidgets()                │
│  └── configure()        ├── saveUserPreferences()           │
│                          └── createDefaults()                 │
│                                                               │
│  WidgetDataController (per module)                           │
│  └── Provides widget data via API                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Data Access
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Database                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  user_dashboard_widgets                                      │
│  ├── id, user_id, organisation_id, customer_id              │
│  ├── widget_key, position, width                            │
│  └── settings (JSON), is_visible                            │
│                                                               │
│  Module Configs (filesystem cache)                           │
│  └── {Module}/config/widget.php                             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

**Widget Loading Flow**:
```
1. User visits /dashboard
2. Dashboard.tsx renders, useEffect triggers
3. Fetch GET /dashboard/widgets
4. DashboardWidgetService::index()
   ├── Load all module widget configs
   ├── Filter by user role and type
   ├── Get user's saved preferences from DB
   ├── Merge defaults with user preferences
   └── Return {available_widgets, user_widgets}
5. Dashboard renders widgets from registry
6. Each widget fetches its own data independently
```

**Widget Customization Flow**:
```
1. User clicks "Customize Dashboard"
2. isEditing = true
3. Drag handles appear, settings icons visible
4. User drags widget → position updates in state
5. User clicks settings → ConfigureWidgetDialog opens
6. User changes settings → widget.settings updates
7. User clicks "Save"
8. POST /dashboard/widgets/save with all widgets
9. DashboardWidgetService::save()
   ├── Validate widget keys exist
   ├── Delete existing user widgets
   ├── Create new widget records
   └── Return success
10. isEditing = false, widgets re-render
```

**Widget Addition Flow**:
```
1. User clicks "Add Widget" (edit mode)
2. AddWidgetDialog opens
3. Shows available_widgets not in user_widgets
4. User selects widget
5. Widget added to user_widgets state with defaults
6. Grid re-renders with new widget
7. User saves layout (same as customization flow)
```

### Security Model

**Authorization Layers**:

1. **User Type**: Organisation vs Customer
   - Widget config specifies `user_types: ['organisation', 'customer']`
   - Checked in `getAvailableWidgets()`

2. **Role**: Admin, Manager, User
   - Widget config specifies `roles: ['Admin', 'Manager', 'User']`
   - Checked against user's current role

3. **Module Enabled**: Organisation-level toggle
   - Check `organisation_settings.{module}.status === '1'`
   - Widget hidden if module disabled

4. **Data Access**: Widget data respects existing permissions
   - Widget data endpoints use same middleware as module routes
   - Customer users only see their own data
   - Organisation users see org-scoped data

**Example**:
```php
// Billing widget config
'dashboard_widgets' => [
    'organisation' => [
        'billing_overview' => [
            'name' => 'Billing Overview',
            'roles' => ['Admin', 'Manager'],  // User can't see
            // ...
        ],
    ],
    // Not in 'customer' - customers never see this
],
```

---

## Implementation Plan

### Phase 1: Foundation (Core Infrastructure)

**Goal**: Set up database, models, service layer, and basic widget registry

**Deliverables**:
- DashboardWidgets module created
- Database migration for `user_dashboard_widgets`
- `UserDashboardWidget` model
- `DashboardWidgetService` with core methods
- Module scanning for `config/widget.php`
- Basic API routes and controller

**Timeline**: 3-4 hours

### Phase 2: Backend Integration

**Goal**: Implement widget loading, saving, and default creation

**Deliverables**:
- Widget config loading from all modules
- Role and type filtering logic
- User preference CRUD operations
- Default widget creation on first login
- Widget validation and error handling
- API endpoints complete and tested

**Timeline**: 4-5 hours

### Phase 3: Frontend Framework

**Goal**: Build dashboard UI with drag-and-drop and widget rendering

**Deliverables**:
- Updated Dashboard.tsx with widget grid
- DnD integration with @dnd-kit
- SortableWidget wrapper component
- Widget registry setup
- Edit mode toggle and save functionality
- AddWidgetDialog component
- Loading and error states

**Timeline**: 5-6 hours

### Phase 4: Widget Settings System

**Goal**: Enable widget configuration with dynamic settings forms

**Deliverables**:
- ConfigureWidgetDialog component
- Dynamic form generation from settings_schema
- Setting type components (text, number, select, date_range, etc.)
- Settings validation
- Settings persistence
- Widget re-render on settings change

**Timeline**: 4-5 hours

### Phase 5: Example Widgets

**Goal**: Create 3-5 example widgets to demonstrate the system

**Deliverables**:
- Tickets Module:
  - Recent Tickets widget
  - Ticket Statistics widget
- Timesheet Module:
  - Weekly Summary widget
- Customer Module:
  - Customer Overview widget (org only)
- Generic:
  - Welcome widget
  - Quick Links widget

**Timeline**: 6-8 hours

### Phase 6: Polish & Testing

**Goal**: Error handling, loading states, documentation, and comprehensive testing

**Deliverables**:
- Error boundaries for widgets
- Skeleton loading states
- Empty states (no widgets, no data)
- Responsive design (mobile, tablet, desktop)
- Widget refresh functionality
- Feature tests for API endpoints
- Component tests for React components
- Documentation for creating new widgets
- User documentation

**Timeline**: 4-5 hours

### Total Estimated Effort

**Backend**: 10-12 hours
**Frontend**: 12-15 hours
**Testing & Documentation**: 4-5 hours
**Total**: 26-32 hours (approximately 3-4 days for one developer)

---

## Risk Assessment

### Technical Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Performance Issues** | Medium | High | - Lazy load widgets<br>- Implement pagination<br>- Cache API responses<br>- Monitor query performance |
| **Complex State Management** | Medium | Medium | - Use React Query for server state<br>- Keep widget state isolated<br>- Clear state update patterns |
| **Widget Conflicts** | Low | Medium | - Unique widget keys<br>- Error boundaries<br>- Validation on save |
| **Permission Bypass** | Low | High | - Comprehensive tests<br>- Server-side validation<br>- Audit logging |
| **Module Dependencies** | Medium | Medium | - Clear widget API contract<br>- Isolated components<br>- Fallback for missing widgets |

### Business Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Low Adoption** | Low | Medium | - Good UX design<br>- Useful default widgets<br>- User education/onboarding |
| **Support Complexity** | Medium | Low | - Clear documentation<br>- Reset to defaults option<br>- Admin can see user layout |
| **Scope Creep** | High | Medium | - Clear MVP definition<br>- Phased rollout<br>- Defer advanced features (sharing, templates) |

### Timeline Risks

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Underestimated Complexity** | Medium | Medium | - Buffer in estimates<br>- Incremental delivery<br>- Cut scope if needed |
| **Dependency on Other Features** | Low | Low | - Minimal external dependencies<br>- Self-contained module |
| **Testing Delays** | Low | Medium | - TDD approach<br>- Automated tests<br>- Concurrent test writing |

### Mitigation Summary

1. **Start Simple**: MVP with basic widgets, add complexity later
2. **Test Early**: Write tests alongside features
3. **Monitor Performance**: Add logging and metrics from day one
4. **Clear Documentation**: Document as you build
5. **Incremental Rollout**: Beta test with select users first

---

## Task List

### Backend Tasks

#### Task #1: Create DashboardWidgets Module Structure
**Priority**: High
**Estimated Effort**: Small (30 min)
**Dependencies**: None

Create the module directory structure following the established pattern.

**Acceptance Criteria**:
- [ ] Directory created: `Modules/DashboardWidgets/`
- [ ] Subdirectories: `app/`, `config/`, `database/migrations/`, `routes/`
- [ ] Basic `config/config.php` with module name
- [ ] Module registered in `modules_statuses.json`
- [ ] Composer autoload updated

**Files to Create**:
- `Modules/DashboardWidgets/module.json`
- `Modules/DashboardWidgets/composer.json`
- `Modules/DashboardWidgets/config/config.php`

---

#### Task #2: Create Database Migration for user_dashboard_widgets
**Priority**: High
**Estimated Effort**: Small (30 min)
**Dependencies**: Task #1

Create migration for storing user widget preferences.

**Acceptance Criteria**:
- [ ] Migration file created with proper timestamp
- [ ] Columns: id, user_id, organisation_id, customer_id, widget_key, position, width, settings, is_visible, timestamps
- [ ] Foreign keys to users, organisations, customers with CASCADE delete
- [ ] Unique constraint on (user_id, organisation_id, customer_id, widget_key)
- [ ] Indexes on user_id, position
- [ ] Migration runs successfully with `sail artisan migrate`
- [ ] Rollback works correctly

**File**:
- `Modules/DashboardWidgets/database/migrations/{timestamp}_create_user_dashboard_widgets_table.php`

---

#### Task #3: Create UserDashboardWidget Model
**Priority**: High
**Estimated Effort**: Small (30 min)
**Dependencies**: Task #2

Create Eloquent model for user_dashboard_widgets table.

**Acceptance Criteria**:
- [ ] Model created with proper namespace
- [ ] Uses `HasUuids` trait (if using UUIDs) or auto-increment
- [ ] Fillable fields: widget_key, organisation_id, customer_id, position, width, settings, is_visible
- [ ] Casts: settings (array), is_visible (boolean), position (integer), width (integer)
- [ ] Relationships: belongsTo(User), belongsTo(Organisation), belongsTo(Customer)
- [ ] Scope for filtering by user context (organisation or customer)
- [ ] PHPDoc annotations

**File**:
- `Modules/DashboardWidgets/app/Models/UserDashboardWidget.php`

---

#### Task #4: Create DashboardWidgetService
**Priority**: High
**Estimated Effort**: Medium (2 hours)
**Dependencies**: Task #3

Create service class for widget management logic.

**Acceptance Criteria**:
- [ ] Service created in `app/Services/DashboardWidgetService.php`
- [ ] Method: `getAllModuleWidgetConfigs()` - scans modules for widget.php configs
- [ ] Method: `getAvailableWidgets(User $user)` - returns widgets user can access
- [ ] Method: `getUserWidgets(User $user)` - returns user's saved widgets with settings
- [ ] Method: `saveUserWidgetPreferences(User $user, array $widgets)` - saves layout
- [ ] Method: `createDefaultWidgets(User $user)` - creates defaults on first login
- [ ] Method: `resetToDefaults(User $user)` - deletes user prefs, recreates defaults
- [ ] Role and user type filtering implemented
- [ ] Module enabled check implemented
- [ ] Validation for widget keys
- [ ] Error handling and logging

**File**:
- `app/Services/DashboardWidgetService.php`

---

#### Task #5: Create DashboardWidgetController
**Priority**: High
**Estimated Effort**: Medium (1.5 hours)
**Dependencies**: Task #4

Create controller for widget API endpoints.

**Acceptance Criteria**:
- [ ] Controller created in DashboardWidgets module
- [ ] Method: `index()` - returns available and user widgets
- [ ] Method: `save()` - saves widget layout
- [ ] Method: `reset()` - resets to defaults
- [ ] Method: `toggle()` - toggles widget visibility
- [ ] Request validation for all methods
- [ ] Returns JSON responses
- [ ] Inertia response for index if needed
- [ ] Proper error handling and status codes
- [ ] Auth middleware applied

**File**:
- `Modules/DashboardWidgets/app/Http/Controllers/DashboardWidgetController.php`

---

#### Task #6: Create API Routes for Dashboard Widgets
**Priority**: High
**Estimated Effort**: Small (20 min)
**Dependencies**: Task #5

Define routes for widget CRUD operations.

**Acceptance Criteria**:
- [ ] Routes file created: `Modules/DashboardWidgets/routes/web.php`
- [ ] GET `/dashboard/widgets` → `DashboardWidgetController@index`
- [ ] POST `/dashboard/widgets/save` → `DashboardWidgetController@save`
- [ ] POST `/dashboard/widgets/reset` → `DashboardWidgetController@reset`
- [ ] POST `/dashboard/widgets/{widget_key}/toggle` → `DashboardWidgetController@toggle`
- [ ] All routes protected by `auth` and `verified` middleware
- [ ] Route names: `dashboard.widgets.*`
- [ ] Routes appear in `sail artisan route:list`

**File**:
- `Modules/DashboardWidgets/routes/web.php`

---

#### Task #7: Update Dashboard Route to Use Controller
**Priority**: Medium
**Estimated Effort**: Small (20 min)
**Dependencies**: Task #5

Move dashboard route from closure to controller for better structure.

**Acceptance Criteria**:
- [ ] Create `DashboardController` in `app/Http/Controllers/`
- [ ] Method: `index()` - renders dashboard with initial data
- [ ] Fetch user's widgets and available widgets
- [ ] Pass to Inertia: `widgets`, `availableWidgets`
- [ ] Update route in `routes/web.php` to use controller
- [ ] Dashboard still loads at `/dashboard`
- [ ] Auth middleware still applied

**Files**:
- `app/Http/Controllers/DashboardController.php`
- `routes/web.php` (line 19-21)

---

#### Task #8: Implement Widget Config Loading in ModuleSettingsService (or New Service)
**Priority**: Medium
**Estimated Effort**: Medium (1 hour)
**Dependencies**: Task #4

Extend existing module scanning to load widget configs.

**Acceptance Criteria**:
- [ ] Method scans `Modules/*/config/widget.php` files
- [ ] Returns array of all widget configs keyed by module
- [ ] Handles missing widget.php gracefully
- [ ] Caches loaded configs (config cache)
- [ ] Validates widget config structure
- [ ] Logs errors for malformed configs
- [ ] Returns empty array if no widgets found

**Considerations**:
- Could extend `ModuleSettingsService` or create separate `WidgetRegistryService`
- Should leverage existing module scanning logic

---

#### Task #9: Add Default Widgets Creation Logic
**Priority**: Medium
**Estimated Effort**: Medium (1 hour)
**Dependencies**: Task #4, Task #8

Automatically create default widgets for new users.

**Acceptance Criteria**:
- [ ] Logic in `DashboardWidgetService::createDefaultWidgets()`
- [ ] Triggered on first dashboard visit if user has no widgets
- [ ] Creates widgets where `default_visible: true` in config
- [ ] Respects role and user type filters
- [ ] Sets position based on `default_position` or order
- [ ] Sets width based on `default_width`
- [ ] Sets default settings from `settings_schema`
- [ ] Only creates for enabled modules
- [ ] Logs default creation for debugging

**Integration Point**:
- Call from `DashboardController@index` if user has no widgets

---

#### Task #10: Add Widget Validation Helper
**Priority**: Medium
**Estimated Effort**: Small (45 min)
**Dependencies**: Task #4

Validate widget keys and settings before saving.

**Acceptance Criteria**:
- [ ] Method: `validateWidgetKey(string $key, User $user): bool`
- [ ] Checks widget exists in available widgets
- [ ] Checks user has permission to use widget
- [ ] Checks module is enabled
- [ ] Method: `validateWidgetSettings(string $key, array $settings): array`
- [ ] Validates settings against settings_schema
- [ ] Type validation (number, select options, etc.)
- [ ] Returns validated/sanitized settings
- [ ] Throws validation exception if invalid
- [ ] Error messages indicate specific validation failures

---

### Frontend Tasks

#### Task #11: Update Dashboard Page Structure
**Priority**: High
**Estimated Effort**: Medium (1.5 hours)
**Dependencies**: Backend Task #7

Refactor dashboard.tsx to support dynamic widgets.

**Acceptance Criteria**:
- [ ] Remove placeholder cards
- [ ] Add state management for widgets, isEditing, isSaving
- [ ] Fetch widgets from API on mount
- [ ] Implement grid layout (3 columns on md+)
- [ ] Add "Customize Dashboard" button
- [ ] Add "Save" and "Cancel" buttons (edit mode)
- [ ] Loading skeleton while fetching
- [ ] Error state if fetch fails
- [ ] Empty state if no widgets configured

**File**:
- `resources/js/pages/dashboard.tsx`

---

#### Task #12: Create Widget Registry
**Priority**: High
**Estimated Effort**: Small (30 min)
**Dependencies**: None

Central registry for mapping widget keys to React components.

**Acceptance Criteria**:
- [ ] File created: `resources/js/widgets/index.ts`
- [ ] Export `widgetRegistry` object mapping keys to components
- [ ] Export `WidgetProps` interface
- [ ] Export helper: `getWidget(key: string): ComponentType | null`
- [ ] Handle missing widgets gracefully (return null or error component)
- [ ] TypeScript types for widget props

**File**:
- `resources/js/widgets/index.ts`

**Example**:
```typescript
export interface WidgetProps {
    settings?: Record<string, any>;
    isEditing?: boolean;
}

export const widgetRegistry: Record<string, React.ComponentType<WidgetProps>> = {
    'tickets.recent_tickets': RecentTicketsWidget,
    'tickets.ticket_statistics': TicketStatsWidget,
}

export const getWidget = (key: string) => widgetRegistry[key] || null
```

---

#### Task #13: Implement Drag-and-Drop with @dnd-kit
**Priority**: High
**Estimated Effort**: Medium (2 hours)
**Dependencies**: Task #11

Add drag-and-drop functionality for reordering widgets.

**Acceptance Criteria**:
- [ ] Wrap grid in `DndContext`
- [ ] Use `SortableContext` with `rectSortingStrategy`
- [ ] Configure sensors (PointerSensor, KeyboardSensor)
- [ ] Implement `handleDragEnd` to update widget positions
- [ ] Visual feedback during drag (transform, opacity)
- [ ] Only active in edit mode
- [ ] Works on touch devices (mobile)
- [ ] Accessible (keyboard navigation)
- [ ] Smooth animations

**Libraries**:
- `@dnd-kit/core`
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`

**Reference**:
- `resources/js/components/form-builder.tsx` (existing DnD implementation)

---

#### Task #14: Create SortableWidget Wrapper Component
**Priority**: High
**Estimated Effort**: Small (1 hour)
**Dependencies**: Task #13

Wrapper component for individual widgets to support DnD.

**Acceptance Criteria**:
- [ ] File created: `resources/js/components/dashboard/SortableWidget.tsx`
- [ ] Uses `useSortable` hook from @dnd-kit
- [ ] Renders drag handle (visible in edit mode)
- [ ] Renders settings button (visible in edit mode)
- [ ] Renders remove button (visible in edit mode)
- [ ] Applies transform and transition styles
- [ ] Accepts `widget` prop with UserWidget data
- [ ] Accepts `children` (actual widget component)
- [ ] Accepts `isEditing` prop
- [ ] Grid width based on widget.width (span-1, span-2, span-3)

**File**:
- `resources/js/components/dashboard/SortableWidget.tsx`

---

#### Task #15: Create AddWidgetDialog Component
**Priority**: High
**Estimated Effort**: Medium (1.5 hours)
**Dependencies**: Task #12

Dialog for adding new widgets to the dashboard.

**Acceptance Criteria**:
- [ ] File created: `resources/js/components/dashboard/AddWidgetDialog.tsx`
- [ ] Uses ShadCN Dialog component
- [ ] Props: `open`, `onClose`, `availableWidgets`, `currentWidgets`, `onAdd`
- [ ] Filters out widgets already on dashboard
- [ ] Displays widget cards with name, description, icon
- [ ] Search/filter widgets by name
- [ ] Group widgets by module
- [ ] Click to add widget
- [ ] Close dialog after adding
- [ ] Disabled state if no widgets available

**File**:
- `resources/js/components/dashboard/AddWidgetDialog.tsx`

---

#### Task #16: Create ConfigureWidgetDialog Component
**Priority**: High
**Estimated Effort**: Medium (2.5 hours)
**Dependencies**: Task #12

Dialog for configuring widget settings.

**Acceptance Criteria**:
- [ ] File created: `resources/js/components/dashboard/ConfigureWidgetDialog.tsx`
- [ ] Uses ShadCN Dialog component
- [ ] Props: `open`, `onClose`, `widget`, `onSave`
- [ ] Dynamically generates form from `settings_schema`
- [ ] Supports setting types: text, number, select, yes_no, date_range
- [ ] Form validation based on schema (min, max, required)
- [ ] Preview of current settings
- [ ] Save and Cancel buttons
- [ ] Updates widget.settings on save
- [ ] Disabled state while saving

**File**:
- `resources/js/components/dashboard/ConfigureWidgetDialog.tsx`

---

#### Task #17: Implement Widget Settings Form Generator
**Priority**: Medium
**Estimated Effort**: Medium (2 hours)
**Dependencies**: Task #16

Reusable component to render dynamic forms from settings schema.

**Acceptance Criteria**:
- [ ] File created: `resources/js/components/dashboard/WidgetSettingsForm.tsx`
- [ ] Props: `schema`, `values`, `onChange`
- [ ] Renders appropriate input for each setting type
- [ ] Handles nested settings
- [ ] Validation feedback (errors, hints)
- [ ] Uses ShadCN form components (Input, Select, Switch, etc.)
- [ ] Controlled inputs
- [ ] TypeScript interfaces for schema

**Setting Type Components**:
- Text: `<Input type="text" />`
- Number: `<Input type="number" min={} max={} />`
- Select: `<Select><SelectItem /></Select>`
- YesNo: `<Switch />`
- DateRange: `<DateRangePicker />` or Select with presets

**File**:
- `resources/js/components/dashboard/WidgetSettingsForm.tsx`

---

#### Task #18: Create Base Widget Template Component
**Priority**: Medium
**Estimated Effort**: Small (30 min)
**Dependencies**: None

Reusable template for creating consistent widgets.

**Acceptance Criteria**:
- [ ] File created: `resources/js/widgets/BaseWidget.tsx`
- [ ] Uses Card component
- [ ] Props: title, description, icon, children, actions, loading, error
- [ ] CardHeader with title, description, icon
- [ ] CardContent for widget body
- [ ] CardFooter for actions
- [ ] Loading state (Skeleton)
- [ ] Error state (Alert)
- [ ] Empty state (customizable)
- [ ] Consistent styling

**File**:
- `resources/js/widgets/BaseWidget.tsx`

---

#### Task #19: Implement Save Widget Layout Functionality
**Priority**: High
**Estimated Effort**: Small (1 hour)
**Dependencies**: Task #11, Task #13

Save user's widget layout to backend.

**Acceptance Criteria**:
- [ ] Function: `saveLayout()` in Dashboard.tsx
- [ ] Collects all widgets with updated positions, width, visibility, settings
- [ ] POST to `/dashboard/widgets/save`
- [ ] Shows loading state while saving
- [ ] Success toast on save
- [ ] Error toast on failure
- [ ] Exits edit mode on success
- [ ] Optimistic UI update (revert on error)
- [ ] Debounced auto-save option (future enhancement)

---

#### Task #20: Implement Reset to Defaults Functionality
**Priority**: Medium
**Estimated Effort**: Small (45 min)
**Dependencies**: Task #11

Allow users to reset their dashboard to default widgets.

**Acceptance Criteria**:
- [ ] Button: "Reset to Defaults" in edit mode or settings menu
- [ ] Confirmation dialog before reset
- [ ] POST to `/dashboard/widgets/reset`
- [ ] Fetches new default widgets from response
- [ ] Updates state with new widgets
- [ ] Success toast
- [ ] Exits edit mode
- [ ] Re-renders dashboard with defaults

---

#### Task #21: Add Loading Skeletons for Widgets
**Priority**: Medium
**Estimated Effort**: Small (45 min)
**Dependencies**: Task #18

Show skeleton loaders while widgets load data.

**Acceptance Criteria**:
- [ ] Create `WidgetSkeleton.tsx` component
- [ ] Uses ShadCN Skeleton component
- [ ] Matches widget card structure (header + content)
- [ ] Multiple skeleton variants for different widget sizes
- [ ] Smooth fade-in transition when data loads
- [ ] Used in BaseWidget when `loading={true}`

**File**:
- `resources/js/components/dashboard/WidgetSkeleton.tsx`

---

#### Task #22: Add Error Boundaries for Widgets
**Priority**: Medium
**Estimated Effort**: Small (45 min)
**Dependencies**: Task #11

Prevent one widget error from breaking entire dashboard.

**Acceptance Criteria**:
- [ ] Create `WidgetErrorBoundary.tsx` component
- [ ] Wraps each widget in SortableWidget
- [ ] Catches React errors in child components
- [ ] Displays error card with message
- [ ] Logs error to console or error service
- [ ] Option to remove failed widget
- [ ] Other widgets continue to work

**File**:
- `resources/js/components/dashboard/WidgetErrorBoundary.tsx`

---

#### Task #23: Implement Responsive Grid Layout
**Priority**: Medium
**Estimated Effort**: Medium (1.5 hours)
**Dependencies**: Task #11, Task #14

Ensure dashboard works on mobile, tablet, desktop.

**Acceptance Criteria**:
- [ ] Mobile (< 768px): Single column layout
- [ ] Tablet (768-1024px): 2 column layout
- [ ] Desktop (> 1024px): 3 column layout
- [ ] Widget width respected (1-3 columns)
- [ ] Drag-and-drop works on all screen sizes
- [ ] Touch-friendly drag handles on mobile
- [ ] Widgets stack gracefully on narrow screens
- [ ] No horizontal scroll

**Tailwind Classes**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="col-span-1 md:col-span-2 lg:col-span-3"> {/* width: 3 */}
    <div className="col-span-1 md:col-span-2 lg:col-span-2"> {/* width: 2 */}
    <div className="col-span-1"> {/* width: 1 */}
</div>
```

---

### Example Widget Tasks

#### Task #24: Create Recent Tickets Widget (Ticket Module)
**Priority**: Medium
**Estimated Effort**: Medium (2 hours)
**Dependencies**: Task #18, Backend tasks complete

Create example widget for displaying recent tickets.

**Acceptance Criteria**:
- [ ] Widget config in `Modules/Ticket/config/widget.php`
- [ ] Component: `resources/js/widgets/tickets/RecentTicketsWidget.tsx`
- [ ] Extends BaseWidget
- [ ] Fetches recent tickets from API
- [ ] Configurable settings: limit, status filter
- [ ] Displays ticket list with title, status, priority
- [ ] Click ticket to navigate to detail page
- [ ] Loading skeleton
- [ ] Empty state ("No tickets found")
- [ ] Error handling
- [ ] Registered in widget registry

**Widget Config**:
```php
'recent_tickets' => [
    'name' => 'Recent Tickets',
    'description' => 'Display recent support tickets',
    'component' => 'RecentTicketsWidget',
    'default_width' => 1,
    'default_visible' => true,
    'roles' => ['Admin', 'Manager', 'User'],
    'configurable' => true,
    'settings_schema' => [
        'limit' => ['type' => 'number', 'default' => 10, 'min' => 5, 'max' => 50],
        'status' => ['type' => 'select', 'options' => ['all' => 'All', 'open' => 'Open', 'closed' => 'Closed'], 'default' => 'open'],
    ],
],
```

**Files**:
- `Modules/Ticket/config/widget.php`
- `resources/js/widgets/tickets/RecentTicketsWidget.tsx`

---

#### Task #25: Create Ticket Statistics Widget (Ticket Module)
**Priority**: Medium
**Estimated Effort**: Medium (2.5 hours)
**Dependencies**: Task #24

Widget showing ticket metrics (count by status, priority distribution).

**Acceptance Criteria**:
- [ ] Widget config in `Modules/Ticket/config/widget.php`
- [ ] Component: `resources/js/widgets/tickets/TicketStatsWidget.tsx`
- [ ] Fetches ticket statistics from API
- [ ] Displays metrics: total, open, closed, by priority
- [ ] Bar chart or pie chart for visualization
- [ ] Date range filter (last 7/30/90 days)
- [ ] Responsive layout
- [ ] Only visible to Admin and Manager roles
- [ ] Registered in widget registry

**Widget Config**:
```php
'ticket_statistics' => [
    'name' => 'Ticket Statistics',
    'description' => 'Overview of ticket metrics',
    'component' => 'TicketStatsWidget',
    'default_width' => 2,
    'default_visible' => true,
    'roles' => ['Admin', 'Manager'],
    'configurable' => true,
    'settings_schema' => [
        'date_range' => [
            'type' => 'select',
            'options' => ['7' => 'Last 7 Days', '30' => 'Last 30 Days', '90' => 'Last 90 Days'],
            'default' => '30',
        ],
    ],
],
```

**Files**:
- `Modules/Ticket/config/widget.php` (add to existing)
- `resources/js/widgets/tickets/TicketStatsWidget.tsx`

---

#### Task #26: Create Timesheet Weekly Summary Widget (Timesheet Module)
**Priority**: Medium
**Estimated Effort**: Medium (2 hours)
**Dependencies**: Task #24

Widget showing weekly timesheet summary.

**Acceptance Criteria**:
- [ ] Widget config in `Modules/Timesheet/config/widget.php`
- [ ] Component: `resources/js/widgets/timesheet/WeeklySummaryWidget.tsx`
- [ ] Fetches current week's timesheet entries
- [ ] Displays total hours by day
- [ ] Shows services/projects worked on
- [ ] Progress indicator (e.g., 32/40 hours)
- [ ] Link to full timesheet page
- [ ] Different data for org vs customer users
- [ ] Registered in widget registry

**Files**:
- `Modules/Timesheet/config/widget.php`
- `resources/js/widgets/timesheet/WeeklySummaryWidget.tsx`

---

#### Task #27: Create Welcome Widget (DashboardWidgets Module)
**Priority**: Low
**Estimated Effort**: Small (1 hour)
**Dependencies**: Task #18

Simple widget to welcome users and show quick stats.

**Acceptance Criteria**:
- [ ] Widget config in `Modules/DashboardWidgets/config/widget.php`
- [ ] Component: `resources/js/widgets/generic/WelcomeWidget.tsx`
- [ ] Displays user name and greeting
- [ ] Shows quick stats (notifications, pending tasks, etc.)
- [ ] Customizable via settings (show/hide stats)
- [ ] Default visible for all users
- [ ] No external API calls (uses shared props)
- [ ] Registered in widget registry

**Files**:
- `Modules/DashboardWidgets/config/widget.php`
- `resources/js/widgets/generic/WelcomeWidget.tsx`

---

#### Task #28: Create Quick Links Widget (DashboardWidgets Module)
**Priority**: Low
**Estimated Effort**: Small (1 hour)
**Dependencies**: Task #18

Widget with customizable quick links.

**Acceptance Criteria**:
- [ ] Widget config in `Modules/DashboardWidgets/config/widget.php`
- [ ] Component: `resources/js/widgets/generic/QuickLinksWidget.tsx`
- [ ] Displays grid of icon + label links
- [ ] Configurable links via settings (add, remove, reorder)
- [ ] Default links based on user role
- [ ] Opens in new tab or same tab (configurable)
- [ ] Icon library (Lucide icons)
- [ ] Registered in widget registry

**Files**:
- `Modules/DashboardWidgets/config/widget.php` (add to existing)
- `resources/js/widgets/generic/QuickLinksWidget.tsx`

---

### Testing & Documentation Tasks

#### Task #29: Write Feature Tests for Widget API
**Priority**: High
**Estimated Effort**: Medium (2 hours)
**Dependencies**: Backend tasks complete

Test all widget API endpoints.

**Acceptance Criteria**:
- [ ] Test file: `tests/Feature/DashboardWidgetTest.php`
- [ ] Test: GET `/dashboard/widgets` returns available and user widgets
- [ ] Test: POST `/dashboard/widgets/save` creates/updates widgets
- [ ] Test: POST `/dashboard/widgets/reset` deletes and recreates defaults
- [ ] Test: POST `/dashboard/widgets/{key}/toggle` toggles visibility
- [ ] Test: Role-based filtering (Admin sees more than User)
- [ ] Test: User type filtering (org vs customer)
- [ ] Test: Module disabled hides widgets
- [ ] Test: Invalid widget key returns error
- [ ] Test: Settings validation works
- [ ] All tests pass with `sail artisan test`

**File**:
- `tests/Feature/DashboardWidgetTest.php`

---

#### Task #30: Write Unit Tests for DashboardWidgetService
**Priority**: High
**Estimated Effort**: Medium (1.5 hours)
**Dependencies**: Task #4

Test service layer methods.

**Acceptance Criteria**:
- [ ] Test file: `tests/Unit/DashboardWidgetServiceTest.php`
- [ ] Test: `getAllModuleWidgetConfigs()` loads all widget configs
- [ ] Test: `getAvailableWidgets()` filters by role and user type
- [ ] Test: `getUserWidgets()` returns user's widgets with settings
- [ ] Test: `saveUserWidgetPreferences()` saves correctly
- [ ] Test: `createDefaultWidgets()` creates default_visible widgets
- [ ] Test: `resetToDefaults()` deletes and recreates
- [ ] Test: Widget validation methods
- [ ] Mock dependencies (User, Organisation, etc.)
- [ ] All tests pass

**File**:
- `tests/Unit/DashboardWidgetServiceTest.php`

---

#### Task #31: Write Component Tests for Dashboard
**Priority**: Medium
**Estimated Effort**: Medium (2 hours)
**Dependencies**: Frontend tasks complete

Test React components with Vitest or Jest.

**Acceptance Criteria**:
- [ ] Test file: `resources/js/tests/Dashboard.test.tsx`
- [ ] Test: Dashboard renders with widgets
- [ ] Test: Edit mode toggle works
- [ ] Test: Drag-and-drop updates positions
- [ ] Test: Add widget dialog opens and closes
- [ ] Test: Configure widget dialog saves settings
- [ ] Test: Save layout calls API
- [ ] Test: Reset to defaults works
- [ ] Test: Loading state shows skeletons
- [ ] Test: Error state shows alert
- [ ] Use React Testing Library
- [ ] Mock API calls
- [ ] All tests pass with `npm test`

**File**:
- `resources/js/tests/Dashboard.test.tsx`

---

#### Task #32: Create Developer Documentation for Widget Creation
**Priority**: Medium
**Estimated Effort**: Medium (1.5 hours)
**Dependencies**: All implementation tasks

Document how developers can create new widgets.

**Acceptance Criteria**:
- [ ] Document created: `docs/DEVELOPMENT/Creating_Dashboard_Widgets.md`
- [ ] Sections:
  - Widget config structure
  - Setting types reference
  - Creating React component
  - Registering widget
  - Best practices
  - Example widget walkthrough
- [ ] Code examples for each step
- [ ] Troubleshooting section
- [ ] Screenshots of example widgets
- [ ] Links to existing widgets as references

**File**:
- `docs/DEVELOPMENT/Creating_Dashboard_Widgets.md`

---

#### Task #33: Create User Documentation for Dashboard Customization
**Priority**: Low
**Estimated Effort**: Small (1 hour)
**Dependencies**: All implementation tasks

Document how users can customize their dashboard.

**Acceptance Criteria**:
- [ ] Document created: `docs/USER/Customizing_Dashboard.md`
- [ ] Sections:
  - How to add widgets
  - How to remove widgets
  - How to reorder widgets
  - How to configure widget settings
  - How to reset to defaults
- [ ] Screenshots for each action
- [ ] GIFs or video of drag-and-drop
- [ ] FAQ section
- [ ] Tips for effective dashboard layout

**File**:
- `docs/USER/Customizing_Dashboard.md`

---

#### Task #34: Add Widget Refresh Functionality
**Priority**: Low
**Estimated Effort**: Medium (1.5 hours)
**Dependencies**: Task #18

Allow widgets to auto-refresh their data.

**Acceptance Criteria**:
- [ ] Add refresh interval to widget config (`refresh_interval_seconds`)
- [ ] Implement polling in BaseWidget or individual widgets
- [ ] Manual refresh button in widget header
- [ ] Pause refresh when tab not visible (Page Visibility API)
- [ ] Show last updated timestamp
- [ ] Configurable refresh in widget settings
- [ ] Default: no auto-refresh (manual only)
- [ ] Use React Query or SWR for caching

---

#### Task #35: Implement Widget Export/Import (Future Enhancement)
**Priority**: Low
**Estimated Effort**: Medium (2 hours)
**Dependencies**: All core tasks

Allow users to export and import dashboard layouts.

**Acceptance Criteria**:
- [ ] Export button downloads JSON file with layout
- [ ] Import button accepts JSON file
- [ ] Validates imported layout
- [ ] Merges with existing widgets (option to replace or append)
- [ ] Share layouts between users (optional)
- [ ] Template gallery (predefined layouts)

**Note**: Defer to Phase 2 or later.

---

#### Task #36: Add Widget Permission Auditing
**Priority**: Low
**Estimated Effort**: Small (1 hour)
**Dependencies**: Backend tasks

Log when users access widgets for security auditing.

**Acceptance Criteria**:
- [ ] Log widget views to activity log
- [ ] Track which widgets are most used
- [ ] Admin can see user's widget layout
- [ ] Alert if user attempts to access unauthorized widget
- [ ] Dashboard for widget usage analytics

**Note**: Defer to Phase 2 or later.

---

#### Task #37: Optimize Widget Performance
**Priority**: Medium
**Estimated Effort**: Medium (2 hours)
**Dependencies**: All widget tasks

Profile and optimize widget rendering and data fetching.

**Acceptance Criteria**:
- [ ] Lazy load widget components (React.lazy)
- [ ] Use React.memo for widgets
- [ ] Implement virtual scrolling for long widget lists
- [ ] Cache widget data (React Query)
- [ ] Debounce drag-and-drop position updates
- [ ] Monitor render times with React DevTools
- [ ] Lighthouse score > 90
- [ ] Dashboard loads in < 2 seconds

---

## Summary

**Total Tasks**: 37
**High Priority**: 15
**Medium Priority**: 18
**Low Priority**: 4

**Estimated Timeline**:
- **Phase 1** (Foundation): 4-5 hours
- **Phase 2** (Backend): 6-7 hours
- **Phase 3** (Frontend): 8-10 hours
- **Phase 4** (Settings): 4-5 hours
- **Phase 5** (Widgets): 8-10 hours
- **Phase 6** (Testing): 5-6 hours

**Total**: 35-43 hours (approximately 5-6 working days for one developer)

---

## Appendix

### A. Widget Config Complete Example

```php
// Modules/Ticket/config/widget.php
<?php

return [
    'organisation' => [
        'recent_tickets' => [
            'name' => 'Recent Tickets',
            'description' => 'Display recent support tickets across all customers',
            'icon' => 'Ticket',
            'component' => 'RecentTicketsWidget',

            'default_width' => 1,
            'default_visible' => true,
            'default_position' => 0,

            'roles' => ['Admin', 'Manager', 'User'],

            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of tickets to show',
                    'default' => 10,
                    'min' => 5,
                    'max' => 50,
                    'step' => 5,
                ],
                'status' => [
                    'type' => 'select',
                    'label' => 'Ticket status',
                    'options' => [
                        'all' => 'All Statuses',
                        'open' => 'Open',
                        'in_progress' => 'In Progress',
                        'closed' => 'Closed',
                    ],
                    'default' => 'open',
                ],
                'priority_filter' => [
                    'type' => 'multiselect',
                    'label' => 'Filter by priority',
                    'options' => [
                        'low' => 'Low',
                        'medium' => 'Medium',
                        'high' => 'High',
                        'critical' => 'Critical',
                    ],
                    'default' => ['medium', 'high', 'critical'],
                ],
            ],
        ],
    ],

    'customer' => [
        'my_tickets' => [
            'name' => 'My Tickets',
            'description' => 'Your recent support tickets',
            'icon' => 'Ticket',
            'component' => 'MyTicketsWidget',

            'default_width' => 2,
            'default_visible' => true,

            'roles' => ['Admin', 'Manager', 'User'],

            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of tickets',
                    'default' => 5,
                    'min' => 5,
                    'max' => 20,
                ],
            ],
        ],
    ],
];
```

### B. Widget Component Example

```tsx
// resources/js/widgets/tickets/RecentTicketsWidget.tsx
import { useState, useEffect } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { Badge } from '@/components/ui/badge'
import { Ticket } from 'lucide-react'

interface TicketData {
    id: string;
    title: string;
    status: string;
    priority: string;
    customer_name: string;
    created_at: string;
}

export function RecentTicketsWidget({ settings, isEditing }: WidgetProps) {
    const [tickets, setTickets] = useState<TicketData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true)
                const response = await fetch(route('api.widgets.tickets.recent', settings))
                if (!response.ok) throw new Error('Failed to fetch tickets')
                const data = await response.json()
                setTickets(data.tickets)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (!isEditing) {
            fetchTickets()
        }
    }, [settings, isEditing])

    return (
        <BaseWidget
            title="Recent Tickets"
            icon={<Ticket className="h-5 w-5" />}
            loading={loading}
            error={error}
        >
            {tickets.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                    No tickets found
                </p>
            ) : (
                <div className="space-y-2">
                    {tickets.map((ticket) => (
                        <a
                            key={ticket.id}
                            href={route('tickets.show', ticket.id)}
                            className="block p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="font-medium text-sm line-clamp-1">
                                        {ticket.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {ticket.customer_name} • {ticket.created_at}
                                    </p>
                                </div>
                                <div className="flex gap-2 ml-2">
                                    <Badge variant="outline">{ticket.status}</Badge>
                                    <Badge
                                        variant={
                                            ticket.priority === 'critical'
                                                ? 'destructive'
                                                : ticket.priority === 'high'
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {ticket.priority}
                                    </Badge>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </BaseWidget>
    )
}
```

### C. Database Schema Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ user_dashboard_widgets                                       │
├─────────────────────────────────────────────────────────────┤
│ id                  BIGINT UNSIGNED PK                       │
│ user_id             CHAR(36) FK → users.id                   │
│ organisation_id     CHAR(36) FK → organisations.id (NULL)    │
│ customer_id         CHAR(36) FK → customers.id (NULL)        │
│ widget_key          VARCHAR(255)                             │
│ position            INT                                      │
│ width               INT (1-3)                                │
│ settings            JSON (NULL)                              │
│ is_visible          BOOLEAN DEFAULT TRUE                     │
│ created_at          TIMESTAMP                                │
│ updated_at          TIMESTAMP                                │
├─────────────────────────────────────────────────────────────┤
│ UNIQUE (user_id, organisation_id, customer_id, widget_key)  │
│ INDEX (user_id, organisation_id, customer_id)               │
│ INDEX (position)                                             │
└─────────────────────────────────────────────────────────────┘
```

### D. API Response Formats

**GET /dashboard/widgets**:
```json
{
    "available_widgets": [
        {
            "key": "tickets.recent_tickets",
            "module": "Ticket",
            "name": "Recent Tickets",
            "description": "Display recent support tickets",
            "icon": "Ticket",
            "component": "RecentTicketsWidget",
            "default_width": 1,
            "default_visible": true,
            "roles": ["Admin", "Manager", "User"],
            "configurable": true,
            "settings_schema": {
                "limit": {
                    "type": "number",
                    "label": "Number of tickets",
                    "default": 10,
                    "min": 5,
                    "max": 50
                },
                "status": {
                    "type": "select",
                    "label": "Status filter",
                    "options": {
                        "all": "All",
                        "open": "Open",
                        "closed": "Closed"
                    },
                    "default": "open"
                }
            }
        }
    ],
    "user_widgets": [
        {
            "id": 1,
            "widget_key": "tickets.recent_tickets",
            "position": 0,
            "width": 1,
            "is_visible": true,
            "settings": {
                "limit": 15,
                "status": "open"
            }
        }
    ]
}
```

### E. Technology Stack

**Backend**:
- PHP 8.2+
- Laravel 11.x
- MySQL 8.0+
- Laravel Modules package

**Frontend**:
- React 18+
- TypeScript
- Inertia.js
- ShadCN UI
- @dnd-kit (drag-and-drop)
- Tailwind CSS
- Lucide icons
- React Query (data fetching)

**Development Tools**:
- Laravel Sail (Docker)
- Vite
- PHPUnit (backend testing)
- Vitest (frontend testing)
- React Testing Library

### F. References

**Existing Patterns to Follow**:
- Module config: `Modules/Freshdesk/config/config.php`
- Settings service: `app/Services/ModuleSettingsService.php`
- Drag-and-drop: `resources/js/components/form-builder.tsx`
- Widget-like component: `resources/js/components/uptime/uptime-metrics-card.tsx`
- Navigation injection: `resources/js/hooks/useNavigation.ts`

**Documentation**:
- Laravel Modules: https://nwidart.com/laravel-modules
- @dnd-kit: https://docs.dndkit.com/
- ShadCN UI: https://ui.shadcn.com/
- Inertia.js: https://inertiajs.com/

---

**End of PRD**
