/**
 * Recent Deployments Widget (Customer Dashboard)
 *
 * Displays the last 3 deployments for customer users on their dashboard.
 * This widget is available only to customer users.
 *
 * Features:
 * - Shows the last 3 deployments for the customer
 * - Displays website name, git info, status, and timestamp
 * - Click to navigate to deployment history
 * - Loading, error, and empty states
 * - Status badges for deployment status
 * - Auto-refresh support
 */

import { useState, useEffect, useCallback } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { Badge } from '@/components/ui/badge'
import { Rocket, ExternalLink, GitBranch, Tag } from 'lucide-react'
import { route } from 'ziggy-js'
import { router } from '@inertiajs/react'
import { formatDistanceToNow } from 'date-fns'
import { useWidgetRefresh } from '@/hooks/useWidgetRefresh'

/**
 * Deployment data structure
 * Minimal interface for displaying deployments in the widget
 */
interface DeploymentData {
    id: string
    website: {
        id: string
        name: string
        domain: string
    } | null
    git_tag: string | null
    git_commit_sha: string | null
    git_branch: string | null
    status: string
    deployed_at: string
    created_at: string
}

/**
 * API response structure for recent deployments
 */
interface RecentDeploymentsResponse {
    deployments: DeploymentData[]
}

/**
 * Widget settings schema
 */
interface RecentDeploymentsSettings {
    limit?: number
    refresh_interval?: number
}

/**
 * Status badge styling
 * Returns appropriate color for deployment status
 */
const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase()
    if (statusLower === 'success' || statusLower === 'completed') {
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    }
    if (statusLower === 'failed' || statusLower === 'error') {
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    }
    if (statusLower === 'pending' || statusLower === 'in_progress') {
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    }
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
}

/**
 * Recent Deployments Widget Component
 *
 * Fetches and displays the customer's recent deployments based on configured settings.
 * Automatically refreshes data when settings change.
 * Supports manual refresh and optional auto-refresh.
 */
export function RecentDeploymentsWidget({ settings, isEditing }: WidgetProps) {
    const [deployments, setDeployments] = useState<DeploymentData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Parse settings with defaults
    const widgetSettings: RecentDeploymentsSettings = {
        limit: settings?.limit ?? 3,
        refresh_interval: settings?.refresh_interval ?? 0,
    }

    /**
     * Fetch recent deployments from API
     * Uses configured limit
     */
    const fetchDeployments = useCallback(async () => {
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
                limit: widgetSettings.limit?.toString() ?? '3',
            })

            // Fetch from API
            const response = await fetch(
                route('api.widgets.deployments.recent-customer') + '?' + params.toString(),
                {
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'same-origin',
                }
            )

            if (!response.ok) {
                throw new Error(`Failed to fetch deployments: ${response.statusText}`)
            }

            const data: RecentDeploymentsResponse = await response.json()
            setDeployments(data.deployments)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load deployments'
            setError(errorMessage)
            console.error('Error fetching recent deployments:', err)
        } finally {
            setLoading(false)
        }
    }, [widgetSettings.limit, isEditing])

    /**
     * Set up widget refresh functionality
     * Handles manual refresh, auto-refresh, and last updated tracking
     */
    const { isRefreshing, lastUpdated, refresh } = useWidgetRefresh({
        onRefresh: fetchDeployments,
        refreshInterval: widgetSettings.refresh_interval,
        enabled: !isEditing,
        pauseWhenHidden: true,
    })

    /**
     * Initial data fetch and refetch when settings change
     */
    useEffect(() => {
        fetchDeployments()
    }, [fetchDeployments])

    /**
     * Navigate to deployment history page
     */
    const handleViewAllClick = () => {
        router.get(route('customer.deployments.index'))
    }

    return (
        <BaseWidget
            title="Recent Deployments"
            description="Your latest deployments"
            icon={<Rocket className="h-5 w-5" />}
            loading={loading}
            error={error}
            showEmpty={!loading && !error && deployments.length === 0}
            empty={
                <div className="text-center py-8">
                    <Rocket className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">No deployments found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Your deployment history will appear here
                    </p>
                </div>
            }
            skeletonVariant="list"
            skeletonCount={widgetSettings.limit ?? 3}
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
                // Show deployment list
                <div className="space-y-2">
                    {deployments.map((deployment) => (
                        <div
                            key={deployment.id}
                            className="p-3 rounded-lg hover:bg-accent transition-colors"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    {/* Website name */}
                                    <p className="font-medium text-sm line-clamp-1">
                                        {deployment.website?.name ?? 'Unknown Website'}
                                    </p>

                                    {/* Website domain */}
                                    {deployment.website?.domain && (
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {deployment.website.domain}
                                        </p>
                                    )}

                                    {/* Git info */}
                                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
                                        {deployment.git_tag && (
                                            <div className="flex items-center gap-1">
                                                <Tag className="h-3 w-3" />
                                                <span>{deployment.git_tag}</span>
                                            </div>
                                        )}
                                        {deployment.git_branch && (
                                            <div className="flex items-center gap-1">
                                                <GitBranch className="h-3 w-3" />
                                                <span>{deployment.git_branch}</span>
                                            </div>
                                        )}
                                        {deployment.git_commit_sha && (
                                            <code className="px-1.5 py-0.5 rounded bg-muted text-xs">
                                                {deployment.git_commit_sha}
                                            </code>
                                        )}
                                    </div>

                                    {/* Timestamp */}
                                    <div className="text-xs text-muted-foreground mt-1.5">
                                        {deployment.deployed_at ? (
                                            formatDistanceToNow(new Date(deployment.deployed_at), {
                                                addSuffix: true,
                                            })
                                        ) : (
                                            formatDistanceToNow(new Date(deployment.created_at), {
                                                addSuffix: true,
                                            })
                                        )}
                                    </div>
                                </div>

                                {/* Status badge */}
                                <div className="flex-shrink-0">
                                    <Badge
                                        variant="outline"
                                        className={getStatusColor(deployment.status)}
                                    >
                                        {deployment.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* View all link */}
                    {deployments.length > 0 && (
                        <div className="pt-2 border-t">
                            <button
                                onClick={handleViewAllClick}
                                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5 py-2"
                            >
                                View all deployments
                                <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </BaseWidget>
    )
}