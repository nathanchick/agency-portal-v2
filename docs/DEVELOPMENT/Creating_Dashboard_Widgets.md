# Creating Dashboard Widgets

**Version**: 1.0
**Date**: 2025-11-17
**Status**: Active
**Module**: DashboardWidgets

---

## Table of Contents

1. [Overview](#overview)
2. [Widget Architecture](#widget-architecture)
3. [Quick Start Guide](#quick-start-guide)
4. [Widget Configuration Reference](#widget-configuration-reference)
5. [Creating a React Widget Component](#creating-a-react-widget-component)
6. [Registering Your Widget](#registering-your-widget)
7. [Setting Types Reference](#setting-types-reference)
8. [Best Practices](#best-practices)
9. [Example Widget Walkthrough](#example-widget-walkthrough)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The Dashboard Widgets system allows modules to define customizable, reusable widgets that users can add to their dashboards. This system provides:

- **Modular Architecture**: Each module can define its own widgets via `config/widget.php`
- **User Customization**: Users can add, remove, reorder, and configure widgets
- **Role-Based Access**: Widgets are filtered by user role (Admin, Manager, User)
- **Context Awareness**: Different widgets for organisation vs customer users
- **Persistent Preferences**: User's dashboard layout is saved to the database
- **Settings Schema**: Dynamic form generation for widget configuration

### Key Concepts

- **Widget Key**: Unique identifier for a widget (format: `Module.widget_name`)
- **Widget Config**: Backend PHP configuration defining widget properties
- **Widget Component**: React component that renders the widget UI
- **Widget Registry**: Central mapping of widget keys to components
- **Widget Settings**: User-configurable options for each widget

---

## Widget Architecture

### Component Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Module Config                         │
│              Modules/{Module}/config/widget.php          │
│                                                           │
│  Defines: name, description, icon, roles,                │
│           settings_schema, default_width, etc.           │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│              DashboardWidgetService                      │
│                                                           │
│  • Scans all modules for widget configs                  │
│  • Filters by user role and type                         │
│  • Loads user preferences from database                  │
│  • Merges defaults with user settings                    │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                  Widget Registry                         │
│            resources/js/widgets/index.ts                 │
│                                                           │
│  Maps widget keys to React components                    │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                Widget Component                          │
│        resources/js/widgets/{module}/{Widget}.tsx        │
│                                                           │
│  • Receives settings from config                         │
│  • Fetches data from API                                 │
│  • Renders using BaseWidget template                     │
└─────────────────────────────────────────────────────────┘
```

### File Structure

When creating a new widget, you'll typically work with these files:

```
Modules/{YourModule}/
├── config/
│   └── widget.php                    # Widget configuration
└── routes/
    └── api.php                        # API endpoint for widget data (optional)

resources/js/
└── widgets/
    ├── index.ts                       # Widget registry (update this)
    └── {module}/
        └── YourWidget.tsx             # React component
```

---

## Quick Start Guide

### Step 1: Create Widget Configuration

Create or update `Modules/{YourModule}/config/widget.php`:

```php
<?php

return [
    'organisation' => [
        'my_widget' => [
            // Display
            'name' => 'My Widget',
            'description' => 'A brief description of what this widget does',
            'icon' => 'BarChart3',  // Lucide icon name

            // Permissions
            'roles' => ['Admin', 'Manager', 'User'],

            // Layout
            'default_width' => 1,  // 1-3 columns
            'default_visible' => true,
            'default_position' => 0,

            // Frontend
            'component' => 'MyWidget',

            // Configuration
            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of items',
                    'default' => 10,
                    'min' => 5,
                    'max' => 50,
                ],
            ],
        ],
    ],

    'customer' => [
        // Customer-specific widgets (optional)
    ],
];
```

### Step 2: Create React Component

Create `resources/js/widgets/{module}/MyWidget.tsx`:

```tsx
import { useState, useEffect } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { BarChart3 } from 'lucide-react'

export function MyWidget({ settings, isEditing }: WidgetProps) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Parse settings with defaults
    const limit = settings?.limit ?? 10

    useEffect(() => {
        // Don't fetch in edit mode
        if (isEditing) {
            setLoading(false)
            return
        }

        // Fetch your data
        const fetchData = async () => {
            try {
                setLoading(true)
                // Your API call here
                const response = await fetch('/api/your-endpoint')
                const result = await response.json()
                setData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [limit, isEditing])

    return (
        <BaseWidget
            title="My Widget"
            description="Widget description"
            icon={<BarChart3 className="h-5 w-5" />}
            loading={loading}
            error={error}
            showEmpty={!loading && !error && data.length === 0}
        >
            {/* Your widget content */}
            <div>
                {data.map(item => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </div>
        </BaseWidget>
    )
}
```

### Step 3: Register in Widget Registry

Update `resources/js/widgets/index.ts`:

```tsx
import { MyWidget } from './{module}/MyWidget'

export const widgetRegistry: Record<string, ComponentType<WidgetProps>> = {
    // ... existing widgets
    '{YourModule}.my_widget': MyWidget,
}
```

### Step 4: Test Your Widget

1. Clear the config cache: `./vendor/bin/sail artisan config:clear`
2. Visit your dashboard
3. Click "Customize Dashboard"
4. Click "Add Widget"
5. Your widget should appear in the list

---

## Widget Configuration Reference

### Complete Configuration Schema

```php
<?php

return [
    // User type: 'organisation' or 'customer'
    'organisation' => [
        // Widget key (alphanumeric, underscores allowed)
        'widget_key' => [

            // === DISPLAY PROPERTIES ===

            /**
             * Widget display name (shown in add widget dialog)
             * @type string
             * @required
             */
            'name' => 'Widget Name',

            /**
             * Brief description of widget functionality
             * @type string
             * @required
             */
            'description' => 'What this widget does',

            /**
             * Lucide icon name (e.g., 'Ticket', 'BarChart3', 'Clock')
             * See: https://lucide.dev/icons
             * @type string
             * @required
             */
            'icon' => 'IconName',


            // === PERMISSION SETTINGS ===

            /**
             * Roles that can view this widget
             * Options: 'Admin', 'Manager', 'User'
             * @type array
             * @required
             */
            'roles' => ['Admin', 'Manager', 'User'],


            // === LAYOUT PREFERENCES ===

            /**
             * Default width in grid columns
             * 1 = 1/3 width, 2 = 2/3 width, 3 = full width
             * @type int
             * @default 1
             */
            'default_width' => 1,

            /**
             * Whether widget is visible by default
             * @type bool
             * @default true
             */
            'default_visible' => true,

            /**
             * Default position in dashboard (0-indexed)
             * Lower numbers appear first
             * @type int
             * @default 0
             */
            'default_position' => 0,


            // === FRONTEND MAPPING ===

            /**
             * React component name (without path or extension)
             * Must match the component registered in widget registry
             * @type string
             * @required
             */
            'component' => 'ComponentName',


            // === CONFIGURATION ===

            /**
             * Whether users can configure this widget
             * If true, settings_schema must be provided
             * @type bool
             * @default false
             */
            'configurable' => true,

            /**
             * Settings schema for configuration form
             * See "Setting Types Reference" section
             * @type array
             * @optional
             */
            'settings_schema' => [
                'setting_key' => [
                    'type' => 'number',
                    'label' => 'Setting Label',
                    'default' => 10,
                    // Additional properties based on type
                ],
            ],
        ],
    ],

    'customer' => [
        // Same structure as organisation
    ],
];
```

### Required vs Optional Fields

**Required Fields:**
- `name` - Display name
- `description` - Brief description
- `icon` - Lucide icon name
- `roles` - Array of allowed roles
- `component` - React component name

**Optional Fields (with defaults):**
- `default_width` (default: `1`)
- `default_visible` (default: `true`)
- `default_position` (default: `0`)
- `configurable` (default: `false`)
- `settings_schema` (default: `[]`)

---

## Creating a React Widget Component

### Using BaseWidget Template

All widgets should use the `BaseWidget` component for consistent styling and automatic state handling:

```tsx
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'

export function MyWidget({ settings, isEditing }: WidgetProps) {
    return (
        <BaseWidget
            title="Widget Title"
            description="Optional description"
            icon={<IconComponent className="h-5 w-5" />}
            loading={isLoading}
            error={errorMessage}
            showEmpty={shouldShowEmpty}
            empty={<CustomEmptyState />}  // Optional
            skeletonVariant="list"  // Optional: 'default', 'list', 'stats', 'card', 'table'
            skeletonCount={5}  // Optional: number of skeleton items
        >
            {/* Your widget content */}
        </BaseWidget>
    )
}
```

### BaseWidget Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Widget title (required) |
| `description` | `string` | Optional subtitle |
| `icon` | `ReactNode` | Optional icon component |
| `children` | `ReactNode` | Widget content |
| `actions` | `ReactNode` | Optional footer actions |
| `loading` | `boolean` | Shows skeleton when true |
| `error` | `string \| null` | Shows error alert when set |
| `showEmpty` | `boolean` | Shows empty state when true |
| `empty` | `ReactNode` | Custom empty state component |
| `skeletonVariant` | `WidgetSkeletonVariant` | Skeleton style: 'default', 'list', 'stats', 'card', 'table' |
| `skeletonCount` | `number` | Number of skeleton items (for list/stats/card/table) |
| `className` | `string` | Additional CSS classes |

### Handling Widget States

#### Loading State

```tsx
const [loading, setLoading] = useState(true)

return (
    <BaseWidget loading={loading} skeletonVariant="list">
        {/* Content */}
    </BaseWidget>
)
```

#### Error State

```tsx
const [error, setError] = useState<string | null>(null)

try {
    // Fetch data
} catch (err) {
    setError(err.message)
}

return (
    <BaseWidget error={error}>
        {/* Content */}
    </BaseWidget>
)
```

#### Empty State

```tsx
const showEmpty = !loading && !error && data.length === 0

return (
    <BaseWidget
        showEmpty={showEmpty}
        empty={
            <div className="text-center py-8">
                <Icon className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">No data available</p>
            </div>
        }
    >
        {/* Content */}
    </BaseWidget>
)
```

### Accessing Widget Settings

Widget settings are passed via the `settings` prop:

```tsx
export function MyWidget({ settings, isEditing }: WidgetProps) {
    // Parse settings with defaults
    const limit = settings?.limit ?? 10
    const status = settings?.status ?? 'open'
    const showBillable = settings?.show_billable ?? true

    // Use settings in your logic
    useEffect(() => {
        fetchData(limit, status)
    }, [limit, status])
}
```

### Handling Edit Mode

Don't fetch data when the dashboard is in edit mode:

```tsx
useEffect(() => {
    // Skip data fetching in edit mode
    if (isEditing) {
        setLoading(false)
        return
    }

    fetchData()
}, [isEditing])

// Show placeholder in edit mode
{isEditing ? (
    <div className="p-4 border border-dashed rounded-lg">
        <p className="text-center text-muted-foreground">
            Preview mode - Save to see live data
        </p>
    </div>
) : (
    <div>
        {/* Actual content */}
    </div>
)}
```

### Data Fetching Pattern

```tsx
import { route } from 'ziggy-js'

useEffect(() => {
    const fetchData = async () => {
        if (isEditing) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)

            // Build query parameters from settings
            const params = new URLSearchParams({
                limit: settings?.limit?.toString() ?? '10',
                status: settings?.status ?? 'all',
            })

            const response = await fetch(
                route('api.your.endpoint') + '?' + params.toString(),
                {
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'same-origin',
                }
            )

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`)
            }

            const data = await response.json()
            setData(data.items)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load data')
            console.error('Widget error:', err)
        } finally {
            setLoading(false)
        }
    }

    fetchData()
}, [settings?.limit, settings?.status, isEditing])
```

### TypeScript Interfaces

Define clear interfaces for your widget:

```tsx
/**
 * Widget settings schema
 */
interface MyWidgetSettings {
    limit?: number
    status?: 'all' | 'open' | 'closed'
    show_details?: boolean
}

/**
 * API response structure
 */
interface MyWidgetResponse {
    items: MyItem[]
    total: number
}

/**
 * Individual item structure
 */
interface MyItem {
    id: string
    name: string
    created_at: string
}

export function MyWidget({ settings, isEditing }: WidgetProps) {
    const [data, setData] = useState<MyWidgetResponse | null>(null)

    const widgetSettings: MyWidgetSettings = {
        limit: settings?.limit ?? 10,
        status: settings?.status ?? 'all',
        show_details: settings?.show_details ?? true,
    }

    // ...
}
```

---

## Registering Your Widget

### Step 1: Import Component

In `resources/js/widgets/index.ts`, import your component:

```tsx
import { MyWidget } from './mymodule/MyWidget'
```

### Step 2: Add to Registry

Add your widget to the `widgetRegistry` object:

```tsx
export const widgetRegistry: Record<string, ComponentType<WidgetProps>> = {
    // Existing widgets...

    // Your new widget
    'YourModule.widget_key': MyWidget,
}
```

### Widget Key Format

The widget key in the registry MUST match the format:

```
{ModuleName}.{widget_key}
```

Where:
- `{ModuleName}` is the module folder name (e.g., `Ticket`, `Timesheet`, `Customer`)
- `{widget_key}` is the key from your `widget.php` config

**Examples:**
- Config: `Modules/Ticket/config/widget.php` with key `recent_tickets`
- Registry: `'Ticket.recent_tickets': RecentTicketsWidget`

**Common Mistake:**
```tsx
// ❌ Wrong - using lowercase module name
'ticket.recent_tickets': RecentTicketsWidget

// ✅ Correct - module name matches folder
'Ticket.recent_tickets': RecentTicketsWidget
```

### Complete Registry Example

```tsx
import { ComponentType } from 'react'
import { RecentTicketsWidget } from './tickets/RecentTicketsWidget'
import { TicketStatsWidget } from './tickets/TicketStatsWidget'
import { WeeklySummaryWidget } from './timesheet/WeeklySummaryWidget'
import { WelcomeWidget } from './generic/WelcomeWidget'

export interface WidgetProps {
    settings?: Record<string, any>
    isEditing?: boolean
}

export const widgetRegistry: Record<string, ComponentType<WidgetProps>> = {
    // Ticket Module
    'Ticket.recent_tickets': RecentTicketsWidget,
    'Ticket.ticket_statistics': TicketStatsWidget,

    // Timesheet Module
    'Timesheet.weekly_summary': WeeklySummaryWidget,

    // Generic Widgets
    'DashboardWidgets.welcome': WelcomeWidget,
}

export const getWidget = (key: string): ComponentType<WidgetProps> | null => {
    return widgetRegistry[key] || null
}
```

---

## Setting Types Reference

Widget settings are defined in the `settings_schema` array in your widget config. Each setting has a `type` that determines how it's rendered in the configuration form.

### Number

Numeric input with optional min/max constraints.

```php
'limit' => [
    'type' => 'number',
    'label' => 'Number of items to show',
    'default' => 10,
    'min' => 5,        // Optional
    'max' => 50,       // Optional
    'step' => 5,       // Optional (increment)
],
```

**Renders as:** `<input type="number" min="5" max="50" step="5" />`

### Select

Dropdown with predefined options.

```php
'status' => [
    'type' => 'select',
    'label' => 'Status filter',
    'options' => [
        'all' => 'All Items',
        'active' => 'Active Only',
        'inactive' => 'Inactive Only',
    ],
    'default' => 'all',
],
```

**Renders as:** `<Select>` component with options

### Yes/No (Boolean)

Toggle switch for boolean values.

```php
'show_details' => [
    'type' => 'yes_no',
    'label' => 'Show detailed information',
    'default' => true,
],
```

**Renders as:** `<Switch>` component

### Text

Single-line text input.

```php
'title' => [
    'type' => 'text',
    'label' => 'Widget title',
    'default' => 'My Widget',
    'placeholder' => 'Enter title...',  // Optional
],
```

**Renders as:** `<input type="text" />`

### Multiselect

Multiple selection dropdown.

```php
'priorities' => [
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
```

**Renders as:** Multi-select component

### Date Range

Date range picker or preset selector.

```php
'date_range' => [
    'type' => 'date_range',
    'label' => 'Date range',
    'options' => [
        'today' => 'Today',
        'last_7_days' => 'Last 7 Days',
        'last_30_days' => 'Last 30 Days',
        'last_90_days' => 'Last 90 Days',
        'custom' => 'Custom Range',
    ],
    'default' => 'last_7_days',
],
```

**Renders as:** Select with preset options

### Setting Schema Properties

All settings support these properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `string` | ✅ Yes | Setting type (number, select, yes_no, text, etc.) |
| `label` | `string` | ✅ Yes | Display label in settings form |
| `default` | `mixed` | ✅ Yes | Default value for the setting |
| `placeholder` | `string` | ❌ No | Placeholder text (text inputs only) |
| `min` | `number` | ❌ No | Minimum value (number inputs only) |
| `max` | `number` | ❌ No | Maximum value (number inputs only) |
| `step` | `number` | ❌ No | Increment step (number inputs only) |
| `options` | `array` | ❌ No | Options array (select/multiselect only) |

---

## Best Practices

### 1. Always Use BaseWidget

Don't create custom card structures - use `BaseWidget` for consistency:

```tsx
// ✅ Good
export function MyWidget({ settings, isEditing }: WidgetProps) {
    return (
        <BaseWidget title="My Widget" loading={loading} error={error}>
            {/* Content */}
        </BaseWidget>
    )
}

// ❌ Bad
export function MyWidget({ settings, isEditing }: WidgetProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>My Widget</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Content */}
            </CardContent>
        </Card>
    )
}
```

### 2. Handle All States

Always handle loading, error, and empty states:

```tsx
<BaseWidget
    loading={loading}
    error={error}
    showEmpty={!loading && !error && data.length === 0}
    empty={<CustomEmptyState />}
>
    {/* Content */}
</BaseWidget>
```

### 3. Respect Edit Mode

Don't fetch data or perform operations when `isEditing` is true:

```tsx
useEffect(() => {
    if (isEditing) {
        setLoading(false)
        return
    }
    fetchData()
}, [isEditing])
```

### 4. Use TypeScript

Define clear interfaces for settings and data:

```tsx
interface MyWidgetSettings {
    limit?: number
    status?: 'all' | 'open' | 'closed'
}

interface MyWidgetData {
    items: MyItem[]
}
```

### 5. Provide Sensible Defaults

Always provide default values for settings:

```tsx
const limit = settings?.limit ?? 10
const status = settings?.status ?? 'open'
```

### 6. Optimize Performance

- Use `React.memo` for widgets that don't change often
- Debounce expensive operations
- Lazy load heavy components
- Use skeleton loading for better UX

```tsx
import { memo } from 'react'

export const MyWidget = memo(({ settings, isEditing }: WidgetProps) => {
    // Widget implementation
})
```

### 7. Error Handling

Catch and display errors gracefully:

```tsx
try {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    setData(data)
} catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load data'
    setError(message)
    console.error('Widget error:', err)
}
```

### 8. Accessibility

- Use semantic HTML
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Use sufficient color contrast

```tsx
<button
    onClick={handleClick}
    aria-label="View ticket details"
    className="hover:bg-accent focus:ring-2"
>
    {/* Content */}
</button>
```

### 9. Responsive Design

Ensure your widget works on all screen sizes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Responsive grid */}
</div>
```

### 10. Documentation

Add JSDoc comments to your widget component:

```tsx
/**
 * Recent Tickets Widget
 *
 * Displays a list of recent support tickets with configurable filters.
 *
 * @param {WidgetProps} props - Widget properties
 * @param {object} props.settings - Widget settings (limit, status)
 * @param {boolean} props.isEditing - Whether dashboard is in edit mode
 *
 * Settings:
 * - limit: Number of tickets to display (5-50, default: 10)
 * - status: Filter by status ('all', 'open', 'closed', default: 'open')
 */
export function RecentTicketsWidget({ settings, isEditing }: WidgetProps) {
    // Implementation
}
```

---

## Example Widget Walkthrough

Let's create a complete widget from start to finish: a **"Recent Projects" widget** for the Customer module.

### Step 1: Define Widget Configuration

Create `Modules/Customer/config/widget.php`:

```php
<?php

return [
    'organisation' => [
        'recent_projects' => [
            // Display
            'name' => 'Recent Projects',
            'description' => 'Display recently created customer projects',
            'icon' => 'FolderKanban',

            // Permissions
            'roles' => ['Admin', 'Manager', 'User'],

            // Layout
            'default_width' => 2,
            'default_visible' => true,
            'default_position' => 0,

            // Frontend
            'component' => 'RecentProjectsWidget',

            // Configuration
            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of projects to show',
                    'default' => 10,
                    'min' => 5,
                    'max' => 25,
                ],
                'show_customer' => [
                    'type' => 'yes_no',
                    'label' => 'Show customer name',
                    'default' => true,
                ],
                'sort_by' => [
                    'type' => 'select',
                    'label' => 'Sort by',
                    'options' => [
                        'created_at' => 'Created Date',
                        'updated_at' => 'Last Updated',
                        'name' => 'Project Name',
                    ],
                    'default' => 'created_at',
                ],
            ],
        ],
    ],
];
```

### Step 2: Create API Endpoint (Optional)

If you need a custom API endpoint, add it to `Modules/Customer/routes/api.php`:

```php
<?php

use Illuminate\Support\Facades\Route;
use Modules\Customer\app\Http\Controllers\WidgetController;

Route::middleware(['auth:sanctum'])->prefix('widgets/customer')->name('api.widgets.customer.')->group(function () {
    Route::get('/recent-projects', [WidgetController::class, 'recentProjects'])
        ->name('recent');
});
```

And create the controller method:

```php
<?php

namespace Modules\Customer\app\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Customer\app\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WidgetController extends Controller
{
    /**
     * Get recent projects for dashboard widget
     */
    public function recentProjects(Request $request): JsonResponse
    {
        $limit = $request->integer('limit', 10);
        $sortBy = $request->string('sort_by', 'created_at');

        $projects = Project::query()
            ->with('customer:id,name')
            ->when($sortBy === 'name', fn($q) => $q->orderBy('name'))
            ->when($sortBy === 'created_at', fn($q) => $q->latest('created_at'))
            ->when($sortBy === 'updated_at', fn($q) => $q->latest('updated_at'))
            ->limit($limit)
            ->get();

        return response()->json([
            'projects' => $projects,
        ]);
    }
}
```

### Step 3: Create React Component

Create `resources/js/widgets/customer/RecentProjectsWidget.tsx`:

```tsx
/**
 * Recent Projects Widget
 *
 * Displays recently created customer projects with configurable sorting and filtering.
 */

import { useState, useEffect } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { FolderKanban, ExternalLink } from 'lucide-react'
import { route } from 'ziggy-js'
import { router } from '@inertiajs/react'
import { formatDistanceToNow } from 'date-fns'
import { Badge } from '@/components/ui/badge'

/**
 * Project data structure
 */
interface ProjectData {
    id: string
    name: string
    description?: string
    status: string
    customer?: {
        id: string
        name: string
    }
    created_at: string
    updated_at: string
}

/**
 * API response structure
 */
interface RecentProjectsResponse {
    projects: ProjectData[]
}

/**
 * Widget settings schema
 */
interface RecentProjectsSettings {
    limit?: number
    show_customer?: boolean
    sort_by?: 'created_at' | 'updated_at' | 'name'
}

/**
 * Recent Projects Widget Component
 */
export function RecentProjectsWidget({ settings, isEditing }: WidgetProps) {
    const [projects, setProjects] = useState<ProjectData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Parse settings with defaults
    const widgetSettings: RecentProjectsSettings = {
        limit: settings?.limit ?? 10,
        show_customer: settings?.show_customer ?? true,
        sort_by: settings?.sort_by ?? 'created_at',
    }

    /**
     * Fetch recent projects from API
     */
    useEffect(() => {
        const fetchProjects = async () => {
            // Don't fetch in edit mode
            if (isEditing) {
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)

                // Build query parameters
                const params = new URLSearchParams({
                    limit: widgetSettings.limit?.toString() ?? '10',
                    sort_by: widgetSettings.sort_by ?? 'created_at',
                })

                const response = await fetch(
                    route('api.api.widgets.customer.recent') + '?' + params.toString(),
                    {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        credentials: 'same-origin',
                    }
                )

                if (!response.ok) {
                    throw new Error(`Failed to fetch projects: ${response.statusText}`)
                }

                const data: RecentProjectsResponse = await response.json()
                setProjects(data.projects)
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load projects'
                setError(errorMessage)
                console.error('Error fetching recent projects:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [widgetSettings.limit, widgetSettings.sort_by, isEditing])

    /**
     * Navigate to project page
     */
    const handleProjectClick = (projectId: string) => {
        router.get(route('customers.projects.show', projectId))
    }

    return (
        <BaseWidget
            title="Recent Projects"
            description="Recently created customer projects"
            icon={<FolderKanban className="h-5 w-5" />}
            loading={loading}
            error={error}
            showEmpty={!loading && !error && projects.length === 0}
            empty={
                <div className="text-center py-8">
                    <FolderKanban className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">No projects found</p>
                </div>
            }
            skeletonVariant="list"
            skeletonCount={widgetSettings.limit ?? 10}
        >
            {isEditing ? (
                // Preview in edit mode
                <div className="p-4 border border-dashed rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground text-center py-4">
                        Preview mode - Save to see live data
                    </p>
                </div>
            ) : (
                // Show project list
                <div className="space-y-2">
                    {projects.map((project) => (
                        <button
                            key={project.id}
                            onClick={() => handleProjectClick(project.id)}
                            className="w-full p-3 rounded-lg hover:bg-accent transition-colors text-left group"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    {/* Project name */}
                                    <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                        {project.name}
                                    </p>

                                    {/* Description */}
                                    {project.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                            {project.description}
                                        </p>
                                    )}

                                    {/* Customer and timestamp */}
                                    <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                                        {widgetSettings.show_customer && project.customer && (
                                            <>
                                                <span>{project.customer.name}</span>
                                                <span>•</span>
                                            </>
                                        )}
                                        <span>
                                            {formatDistanceToNow(new Date(project.created_at), {
                                                addSuffix: true,
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Status badge */}
                                <Badge variant="outline" className="flex-shrink-0">
                                    {project.status}
                                </Badge>
                            </div>
                        </button>
                    ))}

                    {/* View all link */}
                    {projects.length > 0 && (
                        <div className="pt-2 border-t">
                            <button
                                onClick={() => router.get(route('customers.projects.index'))}
                                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5 py-2"
                            >
                                View all projects
                                <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </BaseWidget>
    )
}
```

### Step 4: Register Widget

Update `resources/js/widgets/index.ts`:

```tsx
import { RecentProjectsWidget } from './customer/RecentProjectsWidget'

export const widgetRegistry: Record<string, ComponentType<WidgetProps>> = {
    // ... existing widgets
    'Customer.recent_projects': RecentProjectsWidget,
}
```

### Step 5: Test

1. Clear config cache: `./vendor/bin/sail artisan config:clear`
2. Generate Ziggy routes: `./vendor/bin/sail artisan ziggy:generate`
3. Build frontend: `npm run build` (or `npm run dev`)
4. Visit dashboard and add the widget
5. Test configuration options
6. Verify it works in edit mode and normal mode

---

## Troubleshooting

### Widget Doesn't Appear in Add Widget Dialog

**Possible Causes:**
1. Config cache not cleared
2. Wrong module name in registry
3. User role doesn't match `roles` in config
4. Module is disabled

**Solutions:**
```bash
# Clear config cache
./vendor/bin/sail artisan config:clear

# Check widget registry
# Ensure: 'ModuleName.widget_key' matches your module folder name

# Check user role
# Config: 'roles' => ['Admin', 'Manager', 'User']
# User must have one of these roles

# Check module is enabled in organisation settings
```

### Widget Shows "Component Not Found"

**Cause:** Widget key in registry doesn't match config

**Solution:**
```tsx
// Config key in Modules/YourModule/config/widget.php
'my_widget' => [...]

// Registry MUST be:
'YourModule.my_widget': MyWidgetComponent
```

### Widget Data Not Loading

**Possible Causes:**
1. API endpoint not registered
2. Route name incorrect
3. CORS or authentication issues
4. Wrong parameter names

**Debug Steps:**
```tsx
// Add console logging
useEffect(() => {
    const fetchData = async () => {
        console.log('Fetching with settings:', settings)
        console.log('API URL:', route('api.your.endpoint'))

        try {
            const response = await fetch(url)
            console.log('Response status:', response.status)
            const data = await response.json()
            console.log('Response data:', data)
        } catch (err) {
            console.error('Fetch error:', err)
        }
    }
    fetchData()
}, [])
```

### Settings Not Saving

**Possible Causes:**
1. `configurable` not set to `true` in config
2. `settings_schema` not defined
3. Validation failing on backend

**Solution:**
```php
// In widget config
'configurable' => true,  // Must be true
'settings_schema' => [   // Must be defined
    'limit' => [
        'type' => 'number',
        'default' => 10,
    ],
],
```

### Widget Shows Error in Production

**Debug Steps:**
1. Check browser console for errors
2. Check Laravel logs: `storage/logs/laravel.log`
3. Verify API endpoint returns correct JSON structure
4. Check user permissions on data being fetched

```tsx
// Add error boundaries
try {
    // Your code
} catch (err) {
    console.error('Widget error:', err)
    setError(err instanceof Error ? err.message : 'Unknown error')
}
```

### Widget Not Responsive

**Solution:**
Use Tailwind responsive classes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Content */}
</div>
```

### TypeScript Errors

**Common Issues:**

```tsx
// ❌ Missing type
const data = settings?.limit

// ✅ With type
const data: number = settings?.limit ?? 10

// ❌ Unclear response type
const response = await fetch(url)
const data = await response.json()

// ✅ Typed response
interface MyResponse {
    items: Item[]
}
const data: MyResponse = await response.json()
```

### Performance Issues

**Solutions:**

1. **Lazy load widget component:**
```tsx
const MyWidget = lazy(() => import('./widgets/mymodule/MyWidget'))
```

2. **Memoize expensive computations:**
```tsx
import { useMemo } from 'react'

const processedData = useMemo(() => {
    return expensiveOperation(data)
}, [data])
```

3. **Debounce updates:**
```tsx
import { debounce } from 'lodash'

const debouncedFetch = useMemo(
    () => debounce(fetchData, 300),
    []
)
```

---

## Additional Resources

### Reference Implementations

- **Simple Widget**: `resources/js/widgets/generic/WelcomeWidget.tsx`
- **List Widget**: `resources/js/widgets/tickets/RecentTicketsWidget.tsx`
- **Stats Widget**: `resources/js/widgets/tickets/TicketStatsWidget.tsx`
- **Complex Widget**: `resources/js/widgets/timesheet/WeeklySummaryWidget.tsx`

### Config Examples

- **Basic Config**: `Modules/DashboardWidgets/config/widget.php`
- **Advanced Config**: `Modules/Ticket/config/widget.php`
- **Multiple Settings**: `Modules/Timesheet/config/widget.php`

### Related Documentation

- [Dashboard Widgets Module PRD](../ACTIVE/DASHBOARD_WIDGETS_MODULE.md)
- [Laravel Modules Documentation](https://nwidart.com/laravel-modules)
- [Inertia.js Documentation](https://inertiajs.com/)
- [ShadCN UI Components](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/icons)

---

## Quick Reference Checklist

When creating a new widget, use this checklist:

- [ ] Create `Modules/{Module}/config/widget.php` with widget configuration
- [ ] Define all required fields: name, description, icon, roles, component
- [ ] Set appropriate default_width, default_visible, default_position
- [ ] Define settings_schema if widget is configurable
- [ ] Create React component in `resources/js/widgets/{module}/{Widget}.tsx`
- [ ] Import `BaseWidget` and `WidgetProps`
- [ ] Implement loading, error, and empty states
- [ ] Handle `isEditing` prop appropriately
- [ ] Parse settings with defaults
- [ ] Create TypeScript interfaces for settings and data
- [ ] Implement data fetching with error handling
- [ ] Register widget in `resources/js/widgets/index.ts`
- [ ] Use correct widget key format: `ModuleName.widget_key`
- [ ] Clear config cache: `./vendor/bin/sail artisan config:clear`
- [ ] Generate Ziggy routes: `./vendor/bin/sail artisan ziggy:generate`
- [ ] Build frontend assets: `npm run build`
- [ ] Test widget in dashboard
- [ ] Test configuration settings
- [ ] Test on different screen sizes
- [ ] Add JSDoc comments to component
- [ ] Verify accessibility (keyboard navigation, ARIA labels)

---

**Last Updated**: 2025-11-17
**Maintainer**: Development Team
**Questions?** See the troubleshooting section or check existing widget implementations.
