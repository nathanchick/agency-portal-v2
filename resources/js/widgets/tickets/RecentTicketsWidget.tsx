/**
 * Recent Tickets Widget
 *
 * Displays a list of recent support tickets across all customers.
 * This widget is available to organisation users on their dashboard.
 *
 * Features:
 * - Configurable number of tickets to display
 * - Status filtering (all, open, closed)
 * - Click to navigate to ticket details
 * - Loading, error, and empty states
 * - Priority and status badges
 */

import { useState, useEffect, useCallback } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { Badge } from '@/components/ui/badge'
import { Ticket, ExternalLink } from 'lucide-react'
import { route } from 'ziggy-js'
import { router } from '@inertiajs/react'
import { formatDistanceToNow } from 'date-fns'
import { useWidgetRefresh } from '@/hooks/useWidgetRefresh'

/**
 * Ticket data structure
 * Minimal interface for displaying tickets in the widget
 */
interface TicketData {
    id: string
    title: string
    status: string
    priority: string
    customer?: {
        id: string
        name: string
    }
    created_at: string
    updated_at: string
}

/**
 * API response structure for recent tickets
 */
interface RecentTicketsResponse {
    tickets: TicketData[]
}

/**
 * Widget settings schema
 */
interface RecentTicketsSettings {
    limit?: number
    status?: 'all' | 'open' | 'closed'
    refresh_interval?: number
}

/**
 * Priority badge variant mapping
 * Maps ticket priority to Badge component variant
 */
const getPriorityVariant = (priority: string): 'default' | 'secondary' | 'destructive' => {
    switch (priority.toLowerCase()) {
        case 'critical':
        case 'high':
            return 'destructive'
        case 'medium':
            return 'default'
        case 'low':
        default:
            return 'secondary'
    }
}

/**
 * Status badge styling
 * Returns appropriate color for ticket status
 */
const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes('closed') || statusLower.includes('resolved')) {
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    }
    if (statusLower.includes('progress') || statusLower.includes('pending')) {
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    }
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
}

/**
 * Recent Tickets Widget Component
 *
 * Fetches and displays recent tickets based on configured settings.
 * Automatically refreshes data when settings change.
 * Supports manual refresh and optional auto-refresh.
 */
export function RecentTicketsWidget({ settings, isEditing }: WidgetProps) {
    const [tickets, setTickets] = useState<TicketData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Parse settings with defaults
    const widgetSettings: RecentTicketsSettings = {
        limit: settings?.limit ?? 10,
        status: settings?.status ?? 'open',
        refresh_interval: settings?.refresh_interval ?? 0,
    }

    /**
     * Fetch recent tickets from API
     * Uses configured limit and status filter
     */
    const fetchTickets = useCallback(async () => {
        // Don't fetch data in edit mode to prevent unnecessary API calls
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
                status: widgetSettings.status ?? 'open',
            })

            // Fetch from API
            const response = await fetch(
                route('api.widgets.tickets.recent') + '?' + params.toString(),
                {
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'same-origin',
                }
            )

            if (!response.ok) {
                throw new Error(`Failed to fetch tickets: ${response.statusText}`)
            }

            const data: RecentTicketsResponse = await response.json()
            setTickets(data.tickets)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load tickets'
            setError(errorMessage)
            console.error('Error fetching recent tickets:', err)
        } finally {
            setLoading(false)
        }
    }, [widgetSettings.limit, widgetSettings.status, isEditing])

    /**
     * Set up widget refresh functionality
     * Handles manual refresh, auto-refresh, and last updated tracking
     */
    const { isRefreshing, lastUpdated, refresh } = useWidgetRefresh({
        onRefresh: fetchTickets,
        refreshInterval: widgetSettings.refresh_interval,
        enabled: !isEditing,
        pauseWhenHidden: true,
    })

    /**
     * Initial data fetch and refetch when settings change
     */
    useEffect(() => {
        fetchTickets()
    }, [fetchTickets])

    /**
     * Navigate to ticket detail page
     */
    const handleTicketClick = (ticketId: string) => {
        router.get(route('tickets.show', ticketId))
    }

    return (
        <BaseWidget
            title="Recent Tickets"
            description="Latest support tickets across all customers"
            icon={<Ticket className="h-5 w-5" />}
            loading={loading}
            error={error}
            showEmpty={!loading && !error && tickets.length === 0}
            empty={
                <div className="text-center py-8">
                    <Ticket className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">No tickets found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {widgetSettings.status === 'open' && 'No open tickets'}
                        {widgetSettings.status === 'closed' && 'No closed tickets'}
                        {widgetSettings.status === 'all' && 'No tickets available'}
                    </p>
                </div>
            }
            skeletonVariant="list"
            skeletonCount={widgetSettings.limit ?? 10}
            onRefresh={refresh}
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
        >
            {isEditing ? (
                // Show placeholder in edit mode
                <div className="space-y-3">
                    <div className="p-3 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50">
                        <p className="text-sm text-muted-foreground text-center py-4">
                            Preview mode - Save to see live data
                        </p>
                    </div>
                </div>
            ) : (
                // Show ticket list
                <div className="space-y-2">
                    {tickets.map((ticket) => (
                        <button
                            key={ticket.id}
                            onClick={() => handleTicketClick(ticket.id)}
                            className="w-full p-3 rounded-lg hover:bg-accent transition-colors text-left group"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    {/* Ticket title */}
                                    <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                        {ticket.title}
                                    </p>

                                    {/* Customer and timestamp */}
                                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                        {ticket.customer && (
                                            <>
                                                <span>{ticket.customer.name}</span>
                                                <span>•</span>
                                            </>
                                        )}
                                        <span>
                                            {formatDistanceToNow(new Date(ticket.created_at), {
                                                addSuffix: true,
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-col gap-1.5 items-end flex-shrink-0">
                                    <Badge
                                        variant="outline"
                                        className={getStatusColor(ticket.status)}
                                    >
                                        {ticket.status}
                                    </Badge>
                                    <Badge variant={getPriorityVariant(ticket.priority)}>
                                        {ticket.priority}
                                    </Badge>
                                </div>
                            </div>
                        </button>
                    ))}

                    {/* View all link */}
                    {tickets.length > 0 && (
                        <div className="pt-2 border-t">
                            <button
                                onClick={() => router.get(route('tickets.index'))}
                                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5 py-2"
                            >
                                View all tickets
                                <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </BaseWidget>
    )
}
