/**
 * Base Widget Component
 *
 * A reusable template for creating consistent dashboard widgets.
 * This component provides a standardized structure with:
 * - Header (title, description, icon)
 * - Content area (with loading, error, and empty states)
 * - Footer (for action buttons)
 *
 * All widgets should use this component as a wrapper to ensure consistent
 * styling and behavior across the dashboard.
 *
 * @example
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
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

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
}: BaseWidgetProps) {
    return (
        <Card className={cn('flex flex-col', className)}>
            <CardHeader>
                <div className="flex items-center gap-2">
                    {icon && <div className="text-primary">{icon}</div>}
                    <CardTitle>{title}</CardTitle>
                </div>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>

            <CardContent className="flex-1">
                {/* Loading State */}
                {loading && <LoadingSkeleton />}

                {/* Error State */}
                {!loading && error && <ErrorState error={error} />}

                {/* Empty State */}
                {!loading && !error && showEmpty && (
                    <EmptyState>{empty}</EmptyState>
                )}

                {/* Normal Content */}
                {!loading && !error && !showEmpty && children}
            </CardContent>

            {/* Footer with actions */}
            {actions && <CardFooter>{actions}</CardFooter>}
        </Card>
    )
}

/**
 * Loading Skeleton Component
 *
 * Displays a skeleton placeholder while the widget is loading data.
 */
function LoadingSkeleton() {
    return (
        <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <div className="pt-2 space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
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

/**
 * Convenience export for creating custom loading skeletons
 * if the default one doesn't fit your widget's needs
 */
export { LoadingSkeleton }
