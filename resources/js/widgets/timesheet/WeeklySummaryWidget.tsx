/**
 * Weekly Summary Widget
 *
 * Displays a summary of timesheet entries for the current week.
 * This widget is available to both organisation and customer users.
 *
 * Features:
 * - Current week's total hours
 * - Daily breakdown of time entries
 * - Billable vs non-billable hours
 * - Services/projects worked on
 * - Progress indicator towards standard work week
 * - Link to full timesheet page
 */

import { useState, useEffect } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Clock, ExternalLink, TrendingUp, Calendar } from 'lucide-react'
import { route } from 'ziggy-js'
import { router } from '@inertiajs/react'
import { format, startOfWeek, endOfWeek } from 'date-fns'

/**
 * Time entry data for the week
 */
interface TimeEntryData {
    id: string
    date: string
    service?: {
        id: string
        name: string
    }
    customer?: {
        id: string
        name: string
    }
    project?: {
        id: string
        name: string
    }
    duration_hours: number
    billable: boolean
    description: string
}

/**
 * Daily summary aggregation
 */
interface DailySummary {
    date: string
    total_hours: number
    billable_hours: number
    non_billable_hours: number
    entries_count: number
}

/**
 * Service/Project summary
 */
interface ServiceSummary {
    id: string
    name: string
    hours: number
    type: 'service' | 'customer' | 'project'
}

/**
 * API response structure
 */
interface WeeklySummaryResponse {
    current_week: {
        start_date: string
        end_date: string
    }
    total_hours: number
    billable_hours: number
    non_billable_hours: number
    daily_summary: DailySummary[]
    service_summary: ServiceSummary[]
    entries: TimeEntryData[]
    standard_hours: number
}

/**
 * Widget settings schema
 */
interface WeeklySummarySettings {
    show_billable_hours?: boolean
    show_projects?: boolean
    group_by?: 'day' | 'service' | 'customer'
}

/**
 * Weekly Summary Widget Component
 *
 * Fetches and displays current week's timesheet data based on configured settings.
 */
export function WeeklySummaryWidget({ settings, isEditing }: WidgetProps) {
    const [data, setData] = useState<WeeklySummaryResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Parse settings with defaults
    const widgetSettings: WeeklySummarySettings = {
        show_billable_hours: settings?.show_billable_hours ?? true,
        show_projects: settings?.show_projects ?? true,
        group_by: settings?.group_by ?? 'day',
    }

    /**
     * Fetch weekly summary data from API
     */
    useEffect(() => {
        const fetchWeeklySummary = async () => {
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
                    group_by: widgetSettings.group_by ?? 'day',
                })

                // Fetch from API
                const response = await fetch(
                    route('api.widgets.timesheet.weekly-summary') + '?' + params.toString(),
                    {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        credentials: 'same-origin',
                    }
                )

                if (!response.ok) {
                    throw new Error(`Failed to fetch weekly summary: ${response.statusText}`)
                }

                const responseData: WeeklySummaryResponse = await response.json()
                setData(responseData)
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load weekly summary'
                setError(errorMessage)
                console.error('Error fetching weekly summary:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchWeeklySummary()
    }, [widgetSettings.group_by, isEditing])

    /**
     * Navigate to timesheet page
     */
    const handleViewTimesheet = () => {
        router.get(route('timesheet.entries.index'))
    }

    /**
     * Calculate progress percentage towards standard work week
     */
    const getProgressPercentage = (): number => {
        if (!data) return 0
        const percentage = (data.total_hours / data.standard_hours) * 100
        return Math.min(percentage, 100)
    }

    /**
     * Format hours for display
     */
    const formatHours = (hours: number): string => {
        return hours.toFixed(1)
    }

    return (
        <BaseWidget
            title="Weekly Summary"
            description={
                data
                    ? `${format(new Date(data.current_week.start_date), 'MMM d')} - ${format(new Date(data.current_week.end_date), 'MMM d, yyyy')}`
                    : 'Current week timesheet summary'
            }
            icon={<Clock className="h-5 w-5" />}
            loading={loading}
            error={error}
            showEmpty={!loading && !error && data?.total_hours === 0}
            empty={
                <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">No time entries this week</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Start tracking your time to see weekly summaries
                    </p>
                </div>
            }
            skeletonVariant="stats"
            skeletonCount={4}
        >
            {isEditing ? (
                // Show placeholder in edit mode
                <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50">
                        <p className="text-sm text-muted-foreground text-center py-8">
                            Preview mode - Save to see live data
                        </p>
                    </div>
                </div>
            ) : data ? (
                // Show weekly summary
                <div className="space-y-4">
                    {/* Total Hours Summary */}
                    <div className="space-y-2">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-3xl font-bold">{formatHours(data.total_hours)}h</p>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    of {data.standard_hours}h
                                </p>
                            </div>
                            {widgetSettings.show_billable_hours && (
                                <div className="text-right">
                                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                        {formatHours(data.billable_hours)}h billable
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatHours(data.non_billable_hours)}h non-billable
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <Progress value={getProgressPercentage()} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                            {getProgressPercentage().toFixed(0)}% of standard work week
                        </p>
                    </div>

                    {/* Daily Breakdown */}
                    {widgetSettings.group_by === 'day' && data.daily_summary.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium flex items-center gap-1.5">
                                <TrendingUp className="h-4 w-4" />
                                Daily Breakdown
                            </h4>
                            <div className="space-y-1.5">
                                {data.daily_summary.map((day) => (
                                    <div
                                        key={day.date}
                                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">
                                                {format(new Date(day.date), 'EEE, MMM d')}
                                            </span>
                                            <Badge variant="secondary" className="text-xs">
                                                {day.entries_count} {day.entries_count === 1 ? 'entry' : 'entries'}
                                            </Badge>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-semibold">
                                                {formatHours(day.total_hours)}h
                                            </span>
                                            {widgetSettings.show_billable_hours && (
                                                <p className="text-xs text-muted-foreground">
                                                    {formatHours(day.billable_hours)}h billable
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Service/Project Summary */}
                    {widgetSettings.show_projects && data.service_summary.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">
                                {widgetSettings.group_by === 'service' && 'Services'}
                                {widgetSettings.group_by === 'customer' && 'Customers'}
                                {widgetSettings.group_by === 'day' && 'Projects Worked On'}
                            </h4>
                            <div className="space-y-1.5">
                                {data.service_summary.slice(0, 5).map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <span className="text-sm text-muted-foreground truncate">
                                            {item.name}
                                        </span>
                                        <span className="text-sm font-medium flex-shrink-0 ml-2">
                                            {formatHours(item.hours)}h
                                        </span>
                                    </div>
                                ))}
                                {data.service_summary.length > 5 && (
                                    <p className="text-xs text-muted-foreground text-center pt-1">
                                        +{data.service_summary.length - 5} more
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* View All Link */}
                    <div className="pt-2 border-t">
                        <button
                            onClick={handleViewTimesheet}
                            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5 py-2"
                        >
                            View full timesheet
                            <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            ) : null}
        </BaseWidget>
    )
}
