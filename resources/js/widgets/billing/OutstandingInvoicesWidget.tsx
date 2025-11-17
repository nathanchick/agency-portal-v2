import { useState, useEffect } from 'react'
import { BaseWidget } from '../BaseWidget'
import { WidgetProps } from '../index'
import { Clock, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { route } from 'ziggy-js'

interface CustomerOutstanding {
    id: string
    name: string
    outstanding_amount: number
    outstanding_count: number
    currency_code: string
    last_invoice_date: string | null
    provider: string | null
}

export function OutstandingInvoicesWidget({ settings, isEditing }: WidgetProps) {
    const [customers, setCustomers] = useState<CustomerOutstanding[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            const params = new URLSearchParams({
                limit: String(settings?.limit || 10),
                sort_by: settings?.sort_by || 'amount_desc',
            })
            const response = await fetch(route('api.widgets.billing.outstanding') + '?' + params)
            if (!response.ok) {
                throw new Error('Failed to fetch outstanding invoices data')
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

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <BaseWidget
            title="Outstanding Invoices"
            description="Customers with unpaid invoices"
            icon={<Clock className="h-5 w-5" />}
            loading={loading}
            error={error}
            onRefresh={fetchData}
        >
            {customers.length > 0 ? (
                <div className="space-y-2">
                    {customers.map((customer) => (
                        <a
                            key={customer.id}
                            href={route('customers.billing.customer.stats', customer.id)}
                            className="block p-3 rounded-lg hover:bg-accent transition-colors border"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">
                                        {customer.name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        {customer.provider && (
                                            <Badge variant="outline" className="text-xs">
                                                {customer.provider}
                                            </Badge>
                                        )}
                                        <span className="text-xs text-muted-foreground">
                                            {customer.outstanding_count} invoice{customer.outstanding_count !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    {customer.last_invoice_date && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Last: {formatDate(customer.last_invoice_date)}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <p className="text-sm font-bold text-yellow-600">
                                        {formatCurrency(customer.outstanding_amount, customer.currency_code)}
                                    </p>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                </div>
                            </div>
                        </a>
                    ))}

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
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
                    <p className="text-sm text-muted-foreground">
                        No outstanding invoices
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        All invoices have been paid
                    </p>
                </div>
            )}
        </BaseWidget>
    )
}