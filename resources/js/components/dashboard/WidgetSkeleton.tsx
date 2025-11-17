/**
 * Widget Skeleton Component
 *
 * Provides skeleton loading states for dashboard widgets.
 * Multiple variants are available to match different widget layouts and sizes.
 *
 * @example
 * ```tsx
 * <WidgetSkeleton variant="list" />
 * <WidgetSkeleton variant="chart" />
 * <WidgetSkeleton variant="stats" />
 * ```
 */

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export type WidgetSkeletonVariant = 'default' | 'list' | 'chart' | 'stats' | 'card' | 'table'

interface WidgetSkeletonProps {
    /**
     * The variant determines the skeleton layout
     * - default: Generic text lines
     * - list: List items with avatar/icon placeholders
     * - chart: Chart-like visualization placeholder
     * - stats: Statistics cards with numbers and labels
     * - card: Card-style content blocks
     * - table: Table rows and columns
     */
    variant?: WidgetSkeletonVariant

    /**
     * Number of skeleton items to render (for list, stats, card, table variants)
     * @default 3
     */
    count?: number

    /**
     * Additional CSS classes
     */
    className?: string
}

/**
 * WidgetSkeleton Component
 *
 * Displays a skeleton placeholder while widget data is loading.
 * Includes smooth fade-in animation when transitioning to loaded state.
 */
export function WidgetSkeleton({
    variant = 'default',
    count = 3,
    className,
}: WidgetSkeletonProps) {
    const skeletonMap = {
        default: <DefaultSkeleton />,
        list: <ListSkeleton count={count} />,
        chart: <ChartSkeleton />,
        stats: <StatsSkeleton count={count} />,
        card: <CardSkeleton count={count} />,
        table: <TableSkeleton count={count} />,
    }

    return (
        <div
            className={cn(
                'animate-in fade-in-0 duration-300',
                className
            )}
        >
            {skeletonMap[variant]}
        </div>
    )
}

/**
 * Default Skeleton
 *
 * Generic skeleton with text lines of varying widths
 */
function DefaultSkeleton() {
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
 * List Skeleton
 *
 * Skeleton for list-based widgets (e.g., Recent Tickets, Activity Feed)
 * Shows items with icon/avatar placeholders and text content
 */
function ListSkeleton({ count }: { count: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex items-start gap-3">
                    {/* Icon/Avatar placeholder */}
                    <Skeleton className="h-10 w-10 rounded-lg shrink-0" />

                    {/* Content */}
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                    </div>

                    {/* Action/Badge placeholder */}
                    <Skeleton className="h-6 w-16 rounded-full shrink-0" />
                </div>
            ))}
        </div>
    )
}

/**
 * Chart Skeleton
 *
 * Skeleton for chart/graph widgets
 * Shows bars or columns that simulate a chart layout
 */
function ChartSkeleton() {
    return (
        <div className="space-y-4">
            {/* Chart legend */}
            <div className="flex gap-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
            </div>

            {/* Chart bars */}
            <div className="flex items-end justify-between gap-2 h-48">
                <Skeleton className="w-full h-32" />
                <Skeleton className="w-full h-40" />
                <Skeleton className="w-full h-24" />
                <Skeleton className="w-full h-36" />
                <Skeleton className="w-full h-28" />
                <Skeleton className="w-full h-44" />
            </div>

            {/* Chart labels */}
            <div className="flex justify-between">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-3 w-8" />
                ))}
            </div>
        </div>
    )
}

/**
 * Stats Skeleton
 *
 * Skeleton for statistics widgets showing metrics and KPIs
 * Displays number placeholders with labels
 */
function StatsSkeleton({ count }: { count: number }) {
    return (
        <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="space-y-2">
                    {/* Stat number */}
                    <Skeleton className="h-8 w-24" />

                    {/* Stat label */}
                    <Skeleton className="h-3 w-32" />

                    {/* Optional trend indicator */}
                    <Skeleton className="h-3 w-16" />
                </div>
            ))}
        </div>
    )
}

/**
 * Card Skeleton
 *
 * Skeleton for card-based widgets with multiple content blocks
 * Each card has a header and content area
 */
function CardSkeleton({ count }: { count: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                    {/* Card header */}
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-5 rounded" />
                    </div>

                    {/* Card content */}
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-5/6" />
                    </div>

                    {/* Card footer */}
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    )
}

/**
 * Table Skeleton
 *
 * Skeleton for table-based widgets
 * Shows rows with multiple columns
 */
function TableSkeleton({ count }: { count: number }) {
    return (
        <div className="space-y-2">
            {/* Table header */}
            <div className="flex gap-4 pb-2 border-b">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/6" />
            </div>

            {/* Table rows */}
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex gap-4 py-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/6" />
                </div>
            ))}
        </div>
    )
}

/**
 * Convenience exports for individual skeleton variants
 * Use these when you need a specific skeleton type outside of the WidgetSkeleton component
 */
export {
    DefaultSkeleton,
    ListSkeleton,
    ChartSkeleton,
    StatsSkeleton,
    CardSkeleton,
    TableSkeleton,
}
