/**
 * Base Widget Component
 *
 * A reusable template for creating consistent dashboard widgets.
 * This component provides a standardized structure with:
 * - Header (title, description, icon)
 * - Content area (with loading, error, and empty states)
 * - Footer (for action buttons)
 * - Refresh functionality (manual button, auto-refresh, last updated timestamp)
 *
 * All widgets should use this component as a wrapper to ensure consistent
 * styling and behavior across the dashboard.
 *
 * @example
 * Basic usage without refresh:
 * ```tsx
 * <BaseWidget
 *   title="Recent Tickets"
 *   description="Your latest support tickets"
 *   icon={<Ticket className="h-5 w-5" />}
 *   loading={isLoading}
 *   error={error}
 * >
 *   <div>Widget content goes here</div>
 * </BaseWidget>
 * ```
 *
 * @example
 * With refresh functionality:
 * ```tsx
 * const { isRefreshing, lastUpdated, refresh } = useWidgetRefresh({
 *   onRefresh: fetchData,
 *   refreshInterval: 60, // Auto-refresh every 60 seconds
 *   enabled: !isEditing,
 * })
 *
 * <BaseWidget
 *   title="Recent Tickets"
 *   icon={<Ticket className="h-5 w-5" />}
 *   loading={isLoading}
 *   error={error}
 *   onRefresh={refresh}
 *   isRefreshing={isRefreshing}
 *   lastUpdated={lastUpdated}
 * >
 *   <div>Widget content goes here</div>
 * </BaseWidget>
 * ```
 */

import { ReactNode } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WidgetSkeleton, WidgetSkeletonVariant } from '@/components/dashboard/WidgetSkeleton'
import { formatDistanceToNow } from 'date-fns'

export interface BaseWidgetProps {
    /**
     * The main title of the widget
     */
    title: string

    /**
     * Optional description shown below the title
     */
    description?: string

    /**
     * Optional icon component to display next to the title
     */
    icon?: ReactNode

    /**
     * The main content of the widget
     */
    children?: ReactNode

    /**
     * Optional footer content (action buttons, links, etc.)
     */
    actions?: ReactNode

    /**
     * Whether the widget is currently loading data
     * When true, shows skeleton loading state instead of children
     */
    loading?: boolean

    /**
     * The skeleton variant to use when loading
     * Different variants match different widget content layouts
     * @default 'default'
     */
    skeletonVariant?: WidgetSkeletonVariant

    /**
     * Number of skeleton items to render (for list, stats, card, table variants)
     * @default 3
     */
    skeletonCount?: number

    /**
     * Error message to display if data fetching failed
     * When set, shows error alert instead of children
     */
    error?: string | null

    /**
     * Optional custom empty state component
     * Shown when there's no error and no loading, but you want to show an empty state
     */
    empty?: ReactNode

    /**
     * Whether to show the empty state
     * Set to true when there's no data to display
     */
    showEmpty?: boolean

    /**
     * Additional CSS classes for the Card wrapper
     */
    className?: string

    /**
     * Callback function to refresh widget data
     * When provided, shows a manual refresh button in the widget header
     */
    onRefresh?: () => void | Promise<void>

    /**
     * Whether the widget is currently refreshing
     * Shows loading state on the refresh button when true
     */
    isRefreshing?: boolean

    /**
     * Timestamp of when the data was last updated
     * Displays a "Last updated X ago" message in the widget header
     */
    lastUpdated?: Date | null

    /**
     * Whether to show the last updated timestamp
     * @default true when lastUpdated is provided
     */
    showLastUpdated?: boolean
}

/**
 * BaseWidget Component
 *
 * Provides a consistent structure for all dashboard widgets with automatic
 * handling of loading, error, and empty states.
 */
export function BaseWidget({
    title,
    description,
    icon,
    children,
    actions,
    loading = false,
    error = null,
    empty,
    showEmpty = false,
    className,
    skeletonVariant = 'default',
    skeletonCount = 3,
    onRefresh,
    isRefreshing = false,
    lastUpdated = null,
    showLastUpdated = true,
}: BaseWidgetProps) {
    return (
        <Card className={cn('flex flex-col', className)}>
            <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            {icon && <div className="text-primary">{icon}</div>}
                            <CardTitle>{title}</CardTitle>
                        </div>
                        {description && <CardDescription>{description}</CardDescription>}
                        {showLastUpdated && lastUpdated && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Last updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
                            </p>
                        )}
                    </div>
                    {onRefresh && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onRefresh}
                            disabled={isRefreshing || loading}
                            className="flex-shrink-0"
                        >
                            <RefreshCw
                                className={cn(
                                    'h-4 w-4',
                                    isRefreshing && 'animate-spin'
                                )}
                            />
                        </Button>
                    )}
                </div>
            </CardHeader>

            <CardContent className="flex-1">
                {/* Loading State */}
                {loading && (
                    <WidgetSkeleton variant={skeletonVariant} count={skeletonCount} />
                )}

                {/* Error State */}
                {!loading && error && <ErrorState error={error} />}

                {/* Empty State */}
                {!loading && !error && showEmpty && (
                    <EmptyState>{empty}</EmptyState>
                )}

                {/* Normal Content with smooth fade-in */}
                {!loading && !error && !showEmpty && (
                    <div className="animate-in fade-in-0 duration-300">
                        {children}
                    </div>
                )}
            </CardContent>

            {/* Footer with actions */}
            {actions && <CardFooter>{actions}</CardFooter>}
        </Card>
    )
}


/**
 * Error State Component
 *
 * Displays an error alert when data fetching fails.
 */
function ErrorState({ error }: { error: string }) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    )
}

/**
 * Empty State Component
 *
 * Displays a placeholder when there's no data to show.
 * Can be customized by passing children, or defaults to a simple message.
 */
function EmptyState({ children }: { children?: ReactNode }) {
    if (children) {
        return <div className="flex items-center justify-center py-8">{children}</div>
    }

    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-sm text-muted-foreground">No data available</p>
        </div>
    )
}

