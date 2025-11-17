import { useState, useEffect } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { AlertTriangle, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { route } from 'ziggy-js'

interface CustomerOverdue {
    id: string
    name: string
    overdue_amount: number
    overdue_count: number
    currency_code: string
    days_overdue: number
    provider: string | null
}

export function OverdueInvoicesWidget({ settings, isEditing }: WidgetProps) {
    const [customers, setCustomers] = useState<CustomerOverdue[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams({
                limit: String(settings?.limit || 10),
                min_days_overdue: String(settings?.min_days_overdue || 1),
            })
            const response = await fetch(route('api.widgets.billing.overdue') + '?' + params)
            if (!response.ok) {
                throw new Error('Failed to fetch overdue invoices data')
            }
            const result = await response.json()
            setCustomers(result.data)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!isEditing) {
            fetchData()

            // Set up auto-refresh if configured
            const refreshInterval = settings?.refresh_interval || 0
            if (refreshInterval > 0) {
                const interval = setInterval(fetchData, refreshInterval * 1000)
                return () => clearInterval(interval)
            }
        }
    }, [settings, isEditing])

    const formatCurrency = (amount: number, currencyCode: string = 'GBP') => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: currencyCode,
        }).format(amount)
    }

    const getOverdueSeverity = (days: number): { color: string; label: string } => {
        if (days >= 60) return { color: 'destructive', label: 'Critical' }
        if (days >= 30) return { color: 'default', label: 'Urgent' }
        return { color: 'secondary', label: 'Warning' }
    }

    return (
        <BaseWidget
            title="Overdue Invoices"
            description="Invoices requiring attention"
            icon={<AlertTriangle className="h-5 w-5" />}
            loading={loading}
            error={error}
            onRefresh={fetchData}
        >
            {customers.length > 0 ? (
                <div className="space-y-2">
                    {customers.map((customer) => {
                        const severity = getOverdueSeverity(customer.days_overdue)
                        return (
                            <a
                                key={customer.id}
                                href={route('customers.billing.customer.stats', customer.id)}
                                className="block p-3 rounded-lg hover:bg-accent transition-colors border border-red-200 bg-red-50/50"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                                            <p className="font-medium text-sm truncate">
                                                {customer.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                                            {customer.provider && (
                                                <Badge variant="outline" className="text-xs">
                                                    {customer.provider}
                                                </Badge>
                                            )}
                                            <Badge variant={severity.color as any} className="text-xs">
                                                {customer.days_overdue}d overdue
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {customer.overdue_count} invoice{customer.overdue_count !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <p className="text-sm font-bold text-red-700">
                                            {formatCurrency(customer.overdue_amount, customer.currency_code)}
                                        </p>
                                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                </div>
                            </a>
                        )
                    })}

                    {/* View All Link */}
                    <div className="pt-2 text-center">
                        <a
                            href={route('customers.billing')}
                            className="text-sm text-primary hover:underline"
                        >
                            View all customers →
                        </a>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                        <svg
                            className="h-6 w-6 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <p className="text-sm font-medium text-green-700">
                        No overdue invoices
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        All invoices are up to date
                    </p>
                </div>
            )}
        </BaseWidget>
    )
}