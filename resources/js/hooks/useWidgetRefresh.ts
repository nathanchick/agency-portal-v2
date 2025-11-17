/**
 * useWidgetRefresh Hook
 *
 * Custom hook for managing widget refresh functionality including:
 * - Manual refresh via callback
 * - Automatic refresh at specified intervals
 * - Pause refresh when tab is not visible (Page Visibility API)
 * - Track last updated timestamp
 * - Handle refresh state (loading/refreshing)
 *
 * @example
 * ```tsx
 * const { isRefreshing, lastUpdated, refresh } = useWidgetRefresh({
 *     onRefresh: fetchData,
 *     refreshInterval: 60, // 60 seconds
 *     enabled: !isEditing,
 * })
 *
 * <BaseWidget
 *     onRefresh={refresh}
 *     isRefreshing={isRefreshing}
 *     lastUpdated={lastUpdated}
 * >
 *     {children}
 * </BaseWidget>
 * ```
 */

import { useState, useEffect, useCallback, useRef } from 'react'

export interface UseWidgetRefreshOptions {
    /**
     * Callback function that fetches the widget data
     * Should return a Promise that resolves when data is fetched
     */
    onRefresh: () => void | Promise<void>

    /**
     * Auto-refresh interval in seconds
     * Set to 0 or undefined to disable auto-refresh
     * @default 0 (disabled)
     */
    refreshInterval?: number

    /**
     * Whether auto-refresh is enabled
     * Set to false to pause auto-refresh (e.g., when in edit mode)
     * @default true
     */
    enabled?: boolean

    /**
     * Whether to pause refresh when the browser tab is not visible
     * Uses the Page Visibility API
     * @default true
     */
    pauseWhenHidden?: boolean
}

export interface UseWidgetRefreshReturn {
    /**
     * Whether the widget is currently refreshing data
     */
    isRefreshing: boolean

    /**
     * Timestamp of when data was last successfully updated
     */
    lastUpdated: Date | null

    /**
     * Manual refresh function
     * Call this to trigger an immediate refresh
     */
    refresh: () => Promise<void>

    /**
     * Reset the last updated timestamp
     */
    resetLastUpdated: () => void
}

/**
 * Hook for managing widget refresh functionality
 */
export function useWidgetRefresh({
    onRefresh,
    refreshInterval = 0,
    enabled = true,
    pauseWhenHidden = true,
}: UseWidgetRefreshOptions): UseWidgetRefreshReturn {
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
    const [isVisible, setIsVisible] = useState(!document.hidden)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const mountedRef = useRef(true)

    /**
     * Handle page visibility changes
     * Pause/resume auto-refresh based on visibility
     */
    useEffect(() => {
        if (!pauseWhenHidden) return

        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden)
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [pauseWhenHidden])

    /**
     * Manual refresh function
     * Executes the onRefresh callback and updates state
     */
    const refresh = useCallback(async () => {
        if (isRefreshing) return

        try {
            setIsRefreshing(true)
            await Promise.resolve(onRefresh())

            if (mountedRef.current) {
                setLastUpdated(new Date())
            }
        } catch (error) {
            console.error('Error refreshing widget:', error)
        } finally {
            if (mountedRef.current) {
                setIsRefreshing(false)
            }
        }
    }, [onRefresh, isRefreshing])

    /**
     * Reset last updated timestamp
     */
    const resetLastUpdated = useCallback(() => {
        setLastUpdated(null)
    }, [])

    /**
     * Set up auto-refresh interval
     * Only runs when enabled, visible (if pauseWhenHidden), and interval > 0
     */
    useEffect(() => {
        // Clear existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }

        // Don't set up interval if disabled, not visible, or no interval specified
        if (!enabled || !refreshInterval || refreshInterval <= 0) {
            return
        }

        // Don't set up interval if tab is hidden and pauseWhenHidden is true
        if (pauseWhenHidden && !isVisible) {
            return
        }

        // Set up new interval
        intervalRef.current = setInterval(() => {
            refresh()
        }, refreshInterval * 1000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [enabled, refreshInterval, refresh, isVisible, pauseWhenHidden])

    /**
     * Cleanup on unmount
     */
    useEffect(() => {
        mountedRef.current = true

        return () => {
            mountedRef.current = false
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    return {
        isRefreshing,
        lastUpdated,
        refresh,
        resetLastUpdated,
    }
}
