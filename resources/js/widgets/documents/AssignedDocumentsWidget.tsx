/**
 * Assigned Documents Widget
 *
 * Displays documents assigned to the current customer user.
 * Managers/Admins can optionally view all team documents.
 * Shows document list with status badges and statistics counters.
 */

import { useState, useEffect, useCallback } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { Badge } from '@/components/ui/badge'
import { FileCheck, ExternalLink } from 'lucide-react'
import { route } from 'ziggy-js'
import { router } from '@inertiajs/react'
import { formatDistanceToNow } from 'date-fns'
import { useWidgetRefresh } from '@/hooks/useWidgetRefresh'

interface DocumentData {
    id: string
    document_name: string
    status: string
    customer?: {
        id: string
        name: string
    }
    is_assigned_to_me: boolean
    created_at: string
    updated_at: string
}

interface DocumentStats {
    total_pending: number
    total_completed: number
}

interface AssignedDocumentsResponse {
    documents: DocumentData[]
    stats: DocumentStats
}

interface AssignedDocumentsSettings {
    limit?: number
    status?: 'all' | 'pending' | 'completed'
    show_team_documents?: boolean
    refresh_interval?: number
}

const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'completed':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        case 'not_sent':
        case 'processing':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
        case 'void':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
        default:
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    }
}

const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
        'not_sent': 'Not Sent',
        'processing': 'Awaiting Action',
        'completed': 'Completed',
        'void': 'Void',
    }
    return labels[status] || status
}

export function AssignedDocumentsWidget({ settings, isEditing }: WidgetProps) {
    const [documents, setDocuments] = useState<DocumentData[]>([])
    const [stats, setStats] = useState<DocumentStats>({ total_pending: 0, total_completed: 0 })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const widgetSettings: AssignedDocumentsSettings = {
        limit: settings?.limit ?? 5,
        status: settings?.status ?? 'pending',
        show_team_documents: settings?.show_team_documents ?? false,
        refresh_interval: settings?.refresh_interval ?? 0,
    }

    const fetchDocuments = useCallback(async () => {
        if (isEditing) {
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)

            const params = new URLSearchParams({
                limit: widgetSettings.limit?.toString() ?? '5',
                status: widgetSettings.status ?? 'pending',
                show_team_documents: widgetSettings.show_team_documents ? '1' : '0',
            })

            const response = await fetch(
                route('api.widgets.documents.assigned') + '?' + params.toString(),
                {
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    credentials: 'same-origin',
                }
            )

            if (!response.ok) {
                throw new Error(`Failed to fetch documents: ${response.statusText}`)
            }

            const data: AssignedDocumentsResponse = await response.json()
            setDocuments(data.documents)
            setStats(data.stats)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load documents'
            setError(errorMessage)
            console.error('Error fetching assigned documents:', err)
        } finally {
            setLoading(false)
        }
    }, [widgetSettings.limit, widgetSettings.status, widgetSettings.show_team_documents, isEditing])

    const { isRefreshing, lastUpdated, refresh } = useWidgetRefresh({
        onRefresh: fetchDocuments,
        refreshInterval: widgetSettings.refresh_interval,
        enabled: !isEditing,
        pauseWhenHidden: true,
    })

    useEffect(() => {
        fetchDocuments()
    }, [fetchDocuments])

    const handleDocumentClick = (documentId: string) => {
        router.get(route('customer.documents.view-sign', documentId))
    }

    return (
        <BaseWidget
            title="My Documents"
            description={
                widgetSettings.show_team_documents
                    ? "Your team's documents"
                    : "Documents assigned to you"
            }
            icon={<FileCheck className="h-5 w-5" />}
            loading={loading}
            error={error}
            showEmpty={!loading && !error && documents.length === 0}
            empty={
                <div className="text-center py-8">
                    <FileCheck className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">No documents found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {widgetSettings.status === 'pending' && 'No pending documents'}
                        {widgetSettings.status === 'completed' && 'No completed documents'}
                        {widgetSettings.status === 'all' && 'No documents available'}
                    </p>
                </div>
            }
            skeletonVariant="list"
            skeletonCount={widgetSettings.limit ?? 5}
            onRefresh={refresh}
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
        >
            {isEditing ? (
                <div className="space-y-3">
                    <div className="p-3 rounded-lg border border-dashed border-muted-foreground/25 bg-muted/50">
                        <p className="text-sm text-muted-foreground text-center py-4">
                            Preview mode - Save to see live data
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Statistics Badges */}
                    <div className="flex gap-2 mb-4 pb-3 border-b">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Pending: {stats.total_pending}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Completed: {stats.total_completed}
                        </Badge>
                    </div>

                    {/* Documents List */}
                    <div className="space-y-2">
                        {documents.map((doc) => (
                            <button
                                key={doc.id}
                                onClick={() => handleDocumentClick(doc.id)}
                                className="w-full p-3 rounded-lg hover:bg-accent transition-colors text-left group"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                                {doc.document_name}
                                            </p>
                                            {!doc.is_assigned_to_me && (
                                                <Badge variant="outline" className="text-xs">
                                                    Team
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-1 mt-1 text-xs text-muted-foreground">
                                            {doc.customer && widgetSettings.show_team_documents && (
                                                <span>{doc.customer.name}</span>
                                            )}
                                            <span>
                                                {formatDistanceToNow(new Date(doc.created_at), {
                                                    addSuffix: true,
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <Badge
                                            variant="outline"
                                            className={getStatusColor(doc.status)}
                                        >
                                            {getStatusLabel(doc.status)}
                                        </Badge>
                                    </div>
                                </div>
                            </button>
                        ))}

                        {/* View All Link */}
                        {documents.length > 0 && (
                            <div className="pt-2 border-t">
                                <button
                                    onClick={() => router.get(route('customer.documents.my-pending'))}
                                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5 py-2"
                                >
                                    View all documents
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </BaseWidget>
    )
}
