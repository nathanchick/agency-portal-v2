import { useState, useEffect } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { DollarSign, Users, Clock, TrendingDown } from 'lucide-react'
import { route } from 'ziggy-js'

interface BillingOverviewData {
    total_customers: number
    total_customers_with_billing: number
    total_outstanding: number
    total_overdue: number
    total_paid: number
    total_invoices: number
    currency_code: string
    average_days_to_pay: number
}

export function BillingOverviewWidget({ settings, isEditing }: WidgetProps) {
    const [data, setData] = useState<BillingOverviewData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(route('api.widgets.billing.overview'))
            if (!response.ok) {
                throw new Error('Failed to fetch billing overview data')
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

    const getAveragePayTimeColor = (days: number) => {
        if (days === 0) return 'text-muted-foreground'
        if (days < 14) return 'text-green-500'
        if (days <= 28) return 'text-amber-500'
        return 'text-red-500'
    }

    return (
        <BaseWidget
            title="Billing Overview"
            description="Organisation-wide billing summary"
            icon={<DollarSign className="h-5 w-5" />}
            loading={loading}
            error={error}
            onRefresh={fetchData}
        >
            {data ? (
                <div className="space-y-4">
                    {/* Summary Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <p className="text-xs font-medium text-muted-foreground">Customers</p>
                            </div>
                            <p className="text-2xl font-bold">{data.total_customers}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {data.total_customers_with_billing} with billing
                            </p>
                        </div>

                        <div className="rounded-lg border p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <p className="text-xs font-medium text-muted-foreground">Invoices</p>
                            </div>
                            <p className="text-2xl font-bold">{data.total_invoices}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Total
                            </p>
                        </div>

                        <div className="rounded-lg border p-3 border-yellow-500/20 bg-yellow-500/5">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="h-4 w-4 text-yellow-600" />
                                <p className="text-xs font-medium text-yellow-700">Outstanding</p>
                            </div>
                            <p className="text-2xl font-bold text-yellow-700">
                                {formatCurrency(data.total_outstanding, data.currency_code)}
                            </p>
                            <p className="text-xs text-yellow-600 mt-1">
                                Awaiting payment
                            </p>
                        </div>

                        <div className="rounded-lg border p-3 border-red-500/20 bg-red-500/5">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingDown className="h-4 w-4 text-red-600" />
                                <p className="text-xs font-medium text-red-700">Overdue</p>
                            </div>
                            <p className="text-2xl font-bold text-red-700">
                                {formatCurrency(data.total_overdue, data.currency_code)}
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                                Requires attention
                            </p>
                        </div>
                    </div>

                    {/* Average Time to Pay */}
                    {data.average_days_to_pay > 0 && (
                        <div className="rounded-lg border p-3 bg-muted/30">
                            <p className="text-xs font-medium text-muted-foreground mb-2">
                                Average Time to Pay
                            </p>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span className={`text-xl font-bold ${getAveragePayTimeColor(data.average_days_to_pay)}`}>
                                    {data.average_days_to_pay} days
                                </span>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                                <span className="text-green-500">● &lt;14 days</span>
                                {' | '}
                                <span className="text-amber-500">● 14-28 days</span>
                                {' | '}
                                <span className="text-red-500">● &gt;28 days</span>
                            </div>
                        </div>
                    )}

                    {/* Quick Link */}
                    <div className="pt-2">
                        <a
                            href={route('customers.billing')}
                            className="text-sm text-primary hover:underline"
                        >
                            View detailed billing →
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