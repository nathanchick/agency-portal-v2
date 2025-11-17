/**
 * Widget Registry
 *
 * Central registry for mapping widget keys to React components.
 * Each widget component must implement the WidgetProps interface.
 */

import { ComponentType } from 'react'
import { TestWidget } from './test/TestWidget'
import { RecentTicketsWidget } from './tickets/RecentTicketsWidget'
import { TicketStatsWidget } from './tickets/TicketStatsWidget'
import { MyTicketsWidget } from './tickets/MyTicketsWidget'
import { WeeklySummaryWidget } from './timesheet/WeeklySummaryWidget'
import { WelcomeWidget } from './generic/WelcomeWidget'
import { QuickLinksWidget } from './generic/QuickLinksWidget'
import { CreatedDocumentsWidget } from './documents/CreatedDocumentsWidget'
import { AssignedDocumentsWidget } from './documents/AssignedDocumentsWidget'
import { BillingOverviewWidget } from './billing/BillingOverviewWidget'
import { OutstandingInvoicesWidget } from './billing/OutstandingInvoicesWidget'
import { OverdueInvoicesWidget } from './billing/OverdueInvoicesWidget'
import { MyBillingWidget } from './billing/MyBillingWidget'
import { RecentDeploymentsWidget } from './deployments/RecentDeploymentsWidget'

/**
 * Props interface that all widget components must implement
 */
export interface WidgetProps {
    /**
     * Widget-specific settings from the backend configuration
     * These are defined in the module's widget.php config file
     *
     * Common settings include:
     * - refresh_interval: Number of seconds between auto-refreshes (0 = disabled)
     * - limit: Number of items to display
     * - status: Filter by status
     * - date_range: Date range for data
     *
     * @example
     * {
     *   limit: 10,
     *   status: 'open',
     *   refresh_interval: 60
     * }
     */
    settings?: Record<string, any>

    /**
     * Whether the dashboard is currently in editing mode
     * Widgets may want to disable data fetching or show different UI in edit mode
     */
    isEditing?: boolean
}

/**
 * Registry mapping widget keys to their React components
 *
 * Widget keys follow the pattern: 'module.widget_name'
 * Example: 'tickets.recent_tickets', 'tickets.ticket_statistics'
 *
 * To add a new widget:
 * 1. Create the widget component implementing WidgetProps
 * 2. Import it in this file
 * 3. Add it to the widgetRegistry object with its widget key
 *
 * Example:
 * import { RecentTicketsWidget } from './tickets/RecentTicketsWidget'
 *
 * export const widgetRegistry: Record<string, ComponentType<WidgetProps>> = {
 *     'tickets.recent_tickets': RecentTicketsWidget,
 * }
 */
export const widgetRegistry: Record<string, ComponentType<WidgetProps>> = {
    // Test widget for verifying the registry system
    'test.widget': TestWidget,

    // Ticket Module Widgets
    'Ticket.recent_tickets': RecentTicketsWidget,
    'Ticket.ticket_statistics': TicketStatsWidget,
    'Ticket.my_tickets': MyTicketsWidget,

    // Timesheet Module Widgets
    'Timesheet.weekly_summary': WeeklySummaryWidget,

    // Document Module Widgets
    'Document.created_documents': CreatedDocumentsWidget,
    'Document.assigned_documents': AssignedDocumentsWidget,

    // Billing Module Widgets
    'Billing.billing_overview': BillingOverviewWidget,
    'Billing.outstanding_invoices': OutstandingInvoicesWidget,
    'Billing.overdue_invoices': OverdueInvoicesWidget,
    'Billing.my_billing': MyBillingWidget,

    // Deployment Module Widgets
    'Deployment.recent_deployments': RecentDeploymentsWidget,

    // Generic Widgets (DashboardWidgets Module)
    'DashboardWidgets.welcome': WelcomeWidget,
    'DashboardWidgets.quick_links': QuickLinksWidget,
}

/**
 * Helper function to safely retrieve a widget component by its key
 *
 * @param key - The widget key (e.g., 'tickets.recent_tickets')
 * @returns The widget component if found, null otherwise
 *
 * @example
 * const WidgetComponent = getWidget('tickets.recent_tickets')
 * if (WidgetComponent) {
 *     return <WidgetComponent settings={settings} isEditing={isEditing} />
 * }
 */
export const getWidget = (key: string): ComponentType<WidgetProps> | null => {
    return widgetRegistry[key] || null
}

/**
 * Helper function to check if a widget exists in the registry
 *
 * @param key - The widget key to check
 * @returns true if the widget exists, false otherwise
 */
export const hasWidget = (key: string): boolean => {
    return key in widgetRegistry
}

/**
 * Get all registered widget keys
 *
 * @returns Array of all registered widget keys
 */
export const getRegisteredWidgetKeys = (): string[] => {
    return Object.keys(widgetRegistry)
}
