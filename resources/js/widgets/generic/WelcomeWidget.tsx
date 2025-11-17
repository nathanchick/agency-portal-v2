/**
 * Welcome Widget
 *
 * A simple widget to welcome users and display quick stats.
 * This widget is available to all organisation users on their dashboard.
 *
 * Features:
 * - Personalized greeting based on time of day
 * - Displays user name
 * - Shows quick statistics (configurable)
 * - No external API calls - uses shared props from page
 * - Responsive design
 */

import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { Home, TrendingUp, AlertCircle, Clock, CheckCircle } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { cn } from '@/lib/utils'

/**
 * Widget settings schema
 */
interface WelcomeWidgetSettings {
    show_stats?: boolean
}

/**
 * Quick stat item interface
 */
interface QuickStat {
    label: string
    value: number | string
    icon: React.ReactNode
    color: string
    description?: string
}

/**
 * Get greeting based on time of day
 */
function getGreeting(): string {
    const hour = new Date().getHours()

    if (hour < 12) {
        return 'Good morning'
    } else if (hour < 18) {
        return 'Good afternoon'
    } else {
        return 'Good evening'
    }
}

/**
 * Format date for display
 */
function getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

/**
 * Welcome Widget Component
 *
 * Displays a personalized welcome message and quick statistics.
 * The stats are based on data passed from the backend via shared props.
 */
export function WelcomeWidget({ settings, isEditing }: WidgetProps) {
    // Get shared data from Inertia page props
    const { auth } = usePage().props as any

    // Parse settings with defaults
    const widgetSettings: WelcomeWidgetSettings = {
        show_stats: settings?.show_stats ?? true,
    }

    // Get user name
    const userName = auth?.user?.name || 'User'
    const firstName = userName.split(' ')[0]

    // Mock quick stats - in production these would come from shared props
    // or a lightweight API endpoint that aggregates this data
    const quickStats: QuickStat[] = [
        {
            label: 'Pending Tasks',
            value: auth?.stats?.pending_tasks || 0,
            icon: <Clock className="h-4 w-4" />,
            color: 'text-blue-600 dark:text-blue-400',
            description: 'Tasks requiring attention',
        },
        {
            label: 'Open Tickets',
            value: auth?.stats?.open_tickets || 0,
            icon: <AlertCircle className="h-4 w-4" />,
            color: 'text-orange-600 dark:text-orange-400',
            description: 'Active support tickets',
        },
        {
            label: 'Completed Today',
            value: auth?.stats?.completed_today || 0,
            icon: <CheckCircle className="h-4 w-4" />,
            color: 'text-green-600 dark:text-green-400',
            description: 'Tasks completed today',
        },
        {
            label: 'This Week',
            value: auth?.stats?.weekly_progress || '0%',
            icon: <TrendingUp className="h-4 w-4" />,
            color: 'text-purple-600 dark:text-purple-400',
            description: 'Weekly progress',
        },
    ]

    return (
        <BaseWidget
            title={`${getGreeting()}, ${firstName}!`}
            description={getCurrentDate()}
            icon={<Home className="h-5 w-5" />}
            className="bg-gradient-to-br from-background to-muted/20"
        >
            <div className="space-y-6">
                {/* Welcome Message */}
                <div className="text-center py-4">
                    <p className="text-lg font-medium text-foreground mb-2">
                        Welcome back to your dashboard
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Here's what's happening today
                    </p>
                </div>

                {/* Quick Stats */}
                {widgetSettings.show_stats && !isEditing && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickStats.map((stat, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                            >
                                <div className={cn('mb-2', stat.color)}>
                                    {stat.icon}
                                </div>
                                <div className="text-2xl font-bold mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-muted-foreground text-center">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit Mode Placeholder */}
                {isEditing && (
                    <div className="p-6 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50">
                        <p className="text-sm text-muted-foreground text-center">
                            Welcome widget preview - Statistics will be shown when not in edit mode
                        </p>
                    </div>
                )}

                {/* No Stats Message */}
                {!widgetSettings.show_stats && !isEditing && (
                    <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground">
                            Quick statistics are hidden. Enable them in widget settings to see your stats.
                        </p>
                    </div>
                )}
            </div>
        </BaseWidget>
    )
}
