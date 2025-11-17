/**
 * Ticket Statistics Widget
 *
 * Displays ticket metrics including count by status and priority distribution.
 * This widget is available only to Admin and Manager roles on organisation dashboards.
 *
 * Features:
 * - Total ticket count and breakdown by status (open, closed)
 * - Priority distribution visualization
 * - Configurable date range filter (7, 30, or 90 days)
 * - Bar chart visualization for better insights
 * - Loading, error, and empty states
 */

import { useState, useEffect } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { BarChart3 } from 'lucide-react'
import { route } from 'ziggy-js'

/**
 * Ticket statistics data structure
 */
interface TicketStats {
    total: number
    by_status: {
        open: number
        closed: number
        in_progress: number
        pending: number
        [key: string]: number
    }
    by_priority: {
        critical: number
        high: number
        medium: number
        low: number
        [key: string]: number
    }
}

/**
 * API response structure for ticket statistics
 */
interface TicketStatsResponse {
    stats: TicketStats
    date_range: string
}

/**
 * Widget settings schema
 */
interface TicketStatsSettings {
    date_range?: '7' | '30' | '90'
}

/**
 * Priority color mapping for visualization
 */
const getPriorityColor = (priority: string): string => {
    switch (priority.toLowerCase()) {
        case 'critical':
            return 'bg-red-500'
        case 'high':
            return 'bg-orange-500'
        case 'medium':
            return 'bg-yellow-500'
        case 'low':
            return 'bg-green-500'
        default:
            return 'bg-gray-500'
    }
}

/**
 * Status color mapping
 */
const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'open':
            return 'bg-blue-500'
        case 'closed':
            return 'bg-green-500'
        case 'in_progress':
            return 'bg-yellow-500'
        case 'pending':
            return 'bg-orange-500'
        default:
            return 'bg-gray-500'
    }
}

/**
 * Calculate percentage for bar chart
 */
const getPercentage = (value: number, total: number): number => {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
}

/**
 * Ticket Statistics Widget Component
 *
 * Fetches and displays ticket statistics based on configured date range.
 * Shows visual breakdown of tickets by status and priority.
 */
export function TicketStatsWidget({ settings, isEditing }: WidgetProps) {
    const [stats, setStats] = useState<TicketStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Parse settings with defaults
    const widgetSettings: TicketStatsSettings = {
        date_range: settings?.date_range ?? '30',
    }

    /**
     * Fetch ticket statistics from API
     */
    useEffect(() => {
        const fetchStats = async () => {
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
                    date_range: widgetSettings.date_range ?? '30',
                })

                // Fetch from API
                const response = await fetch(
                    route('api.widgets.tickets.statistics') + '?' + params.toString(),
                    {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        credentials: 'same-origin',
                    }
                )

                if (!response.ok) {
                    throw new Error(`Failed to fetch statistics: ${response.statusText}`)
                }

                const data: TicketStatsResponse = await response.json()
                setStats(data.stats)
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load statistics'
                setError(errorMessage)
                console.error('Error fetching ticket statistics:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [widgetSettings.date_range, isEditing])

    return (
        <BaseWidget
            title="Ticket Statistics"
            description={`Ticket metrics for the last ${widgetSettings.date_range} days`}
            icon={<BarChart3 className="h-5 w-5" />}
            loading={loading}
            error={error}
            showEmpty={!loading && !error && stats?.total === 0}
            empty={
                <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">No ticket data available</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        No tickets found in the last {widgetSettings.date_range} days
                    </p>
                </div>
            }
            skeletonVariant="stats"
            skeletonCount={3}
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
            ) : stats ? (
                <div className="space-y-6">
                    {/* Total Tickets Summary */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-foreground">
                                {stats.total}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                Total Tickets
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                {stats.by_status.open || 0}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                Open
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                {stats.by_status.closed || 0}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                Closed
                            </div>
                        </div>
                    </div>

                    {/* Status Breakdown */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground">By Status</h4>
                        <div className="space-y-2">
                            {Object.entries(stats.by_status).map(([status, count]) => {
                                const percentage = getPercentage(count, stats.total)
                                if (count === 0) return null

                                return (
                                    <div key={status} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="capitalize text-muted-foreground">
                                                {status.replace('_', ' ')}
                                            </span>
                                            <span className="font-medium text-foreground">
                                                {count} ({percentage}%)
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${getStatusColor(status)} transition-all duration-500`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Priority Breakdown */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground">By Priority</h4>
                        <div className="space-y-2">
                            {Object.entries(stats.by_priority).map(([priority, count]) => {
                                const percentage = getPercentage(count, stats.total)
                                if (count === 0) return null

                                return (
                                    <div key={priority} className="space-y-1">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="capitalize text-muted-foreground">
                                                {priority}
                                            </span>
                                            <span className="font-medium text-foreground">
                                                {count} ({percentage}%)
                                            </span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${getPriorityColor(priority)} transition-all duration-500`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : null}
        </BaseWidget>
    )
}
