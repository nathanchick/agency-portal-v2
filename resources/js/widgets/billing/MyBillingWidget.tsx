import { useState, useEffect } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { Receipt, Clock, TrendingDown, AlertTriangle, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { route } from 'ziggy-js'

interface BillingData {
    outstanding_amount: number
    overdue_amount: number
    total_invoices: number
    outstanding_count: number
    overdue_count: number
    currency_code: string
    average_days_to_pay: number
    recent_invoices?: Array<{
        id: string
        invoice_number: string
        date: string
        total: number
        status: string
        is_overdue: boolean
        is_paid: boolean
    }>
    provider: string | null
}

export function MyBillingWidget({ settings, isEditing }: WidgetProps) {
    const [data, setData] = useState<BillingData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams({
                show_recent: String(settings?.show_recent_invoices !== false),
                recent_count: String(settings?.recent_invoice_count || 5),
            })
            const response = await fetch(route('api.widgets.billing.my-billing') + '?' + params)
            if (!response.ok) {
                throw new Error('Failed to fetch billing data')
            }
            const result = await response.json()
            setData(result.data)
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    const getStatusBadge = (status: string, isOverdue: boolean, isPaid: boolean) => {
        if (isOverdue && !isPaid) {
            return <Badge variant="destructive" className="text-xs">Overdue</Badge>
        }

        switch (status) {
            case 'paid':
                return <Badge variant="default" className="bg-green-500 text-xs">Paid</Badge>
            case 'draft':
                return <Badge variant="secondary" className="text-xs">Draft</Badge>
            case 'approved':
                return <Badge variant="default" className="text-xs">Approved</Badge>
            case 'submitted':
                return <Badge variant="outline" className="text-xs">Submitted</Badge>
            default:
                return <Badge variant="outline" className="text-xs">{status}</Badge>
        }
    }

    const getAveragePayTimeColor = (days: number) => {
        if (days === 0) return 'text-muted-foreground'
        if (days < 14) return 'text-green-500'
        if (days <= 28) return 'text-amber-500'
        return 'text-red-500'
    }

    return (
        <BaseWidget
            title="My Billing"
            description="Your billing status"
            icon={<Receipt className="h-5 w-5" />}
            loading={loading}
            error={error}
            onRefresh={fetchData}
        >
            {data ? (
                <div className="space-y-4">
                    {/* Alert for overdue invoices */}
                    {data.overdue_amount > 0 && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                            <div className="flex items-start gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-red-900">
                                        Overdue Invoices
                                    </p>
                                    <p className="text-xs text-red-700 mt-1">
                                        {formatCurrency(data.overdue_amount, data.currency_code)} overdue
                                        {' '}({data.overdue_count} invoice{data.overdue_count !== 1 ? 's' : ''})
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <p className="text-xs font-medium text-muted-foreground">Total</p>
                            </div>
                            <p className="text-xl font-bold">{data.total_invoices}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Invoices
                            </p>
                        </div>

                        <div className="rounded-lg border p-3 border-yellow-500/20 bg-yellow-500/5">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="h-4 w-4 text-yellow-600" />
                                <p className="text-xs font-medium text-yellow-700">Outstanding</p>
                            </div>
                            <p className="text-xl font-bold text-yellow-700">
                                {formatCurrency(data.outstanding_amount, data.currency_code)}
                            </p>
                            <p className="text-xs text-yellow-600 mt-1">
                                {data.outstanding_count} unpaid
                            </p>
                        </div>
                    </div>

                    {/* Average Payment Time */}
                    {data.average_days_to_pay > 0 && (
                        <div className="rounded-lg border p-3 bg-muted/30">
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                                Average Payment Time
                            </p>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span className={`text-lg font-bold ${getAveragePayTimeColor(data.average_days_to_pay)}`}>
                                    {data.average_days_to_pay} days
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Recent Invoices */}
                    {settings?.show_recent_invoices !== false && data.recent_invoices && data.recent_invoices.length > 0 && (
                        <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                                Recent Invoices
                            </p>
                            <div className="space-y-2">
                                {data.recent_invoices.map((invoice) => (
                                    <div
                                        key={invoice.id}
                                        className="flex items-center justify-between p-2 rounded border text-xs"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">
                                                {invoice.invoice_number}
                                            </p>
                                            <p className="text-muted-foreground">
                                                {formatDate(invoice.date)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                {formatCurrency(invoice.total, data.currency_code)}
                                            </span>
                                            {getStatusBadge(invoice.status, invoice.is_overdue, invoice.is_paid)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Provider Badge and Link */}
                    <div className="flex items-center justify-between pt-2 border-t">
                        {data.provider && (
                            <Badge variant="outline" className="text-xs">
                                Powered by {data.provider}
                            </Badge>
                        )}
                        <a
                            href={route('customer.billing.index')}
                            className="text-sm text-primary hover:underline ml-auto"
                        >
                            View all invoices →
                        </a>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                    No billing data available
                </div>
            )}
        </BaseWidget>
    )
}