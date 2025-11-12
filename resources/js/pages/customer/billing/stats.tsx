import { Head } from '@inertiajs/react'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppSidebarHeader } from "@/components/app-sidebar-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DollarSign, FileText, Clock, TrendingDown } from "lucide-react"

interface BillingStats {
    total_invoices: number
    total_outstanding: number
    total_paid: number
    total_overdue: number
    outstanding_amount: number
    paid_amount: number
    overdue_amount: number
    currency_code: string
    average_days_to_pay: number
    recent_invoices: Array<{
        id: string
        invoice_number: string
        date: string
        total: number
        status: string
        is_overdue: boolean
        is_paid: boolean
    }>
    monthly_totals: Array<{
        month: string
        total: number
        count: number
    }>
}

interface Props {
    stats: BillingStats
    provider: string
}

export default function BillingStats({ stats, provider }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: stats.currency_code || 'GBP',
        }).format(amount)
    }

    const getAveragePayTimeColor = (days: number) => {
        if (days < 14) return 'text-green-500'
        if (days <= 28) return 'text-amber-500'
        return 'text-red-500'
    }

    const getStatusBadge = (status: string, isOverdue: boolean, isPaid: boolean) => {
        if (isOverdue && !isPaid) {
            return <Badge variant="destructive">Overdue</Badge>
        }

        switch (status) {
            case 'paid':
                return <Badge variant="default" className="bg-green-500">Paid</Badge>
            case 'draft':
                return <Badge variant="secondary">Draft</Badge>
            case 'approved':
                return <Badge variant="default">Approved</Badge>
            case 'submitted':
                return <Badge variant="outline">Submitted</Badge>
            case 'cancelled':
                return <Badge variant="destructive">Cancelled</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title="Billing Statistics" />
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: '/dashboard' },
                    { title: 'Billing', href: '/customer/billing' },
                    { title: 'Statistics', href: '/customer/billing/stats' }
                ]} />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Billing Statistics</h1>
                            <p className="text-sm text-muted-foreground">
                                Overview of your billing history and metrics
                            </p>
                        </div>
                        <Badge variant="outline">powered by {provider}</Badge>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Invoices
                                </CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_invoices}</div>
                                <p className="text-xs text-muted-foreground">
                                    All time
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Outstanding
                                </CardTitle>
                                <Clock className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(stats.outstanding_amount)}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.total_outstanding} invoices
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Overdue
                                </CardTitle>
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(stats.overdue_amount)}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.total_overdue} invoices overdue
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Average Time to Pay */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Time to Pay</CardTitle>
                            <CardDescription>
                                Average days from invoice date to payment
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <Clock className="h-6 w-6" />
                                <span className={`text-3xl font-bold ${getAveragePayTimeColor(stats.average_days_to_pay)}`}>
                                    {stats.average_days_to_pay} days
                                </span>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                                <span className="text-green-500">● &lt;14 days</span>
                                {' | '}
                                <span className="text-amber-500">● 14-28 days</span>
                                {' | '}
                                <span className="text-red-500">● &gt;28 days</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Invoices */}
                    {stats.recent_invoices && stats.recent_invoices.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Invoices</CardTitle>
                                <CardDescription>
                                    Your most recent invoices
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Invoice #</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stats.recent_invoices.map((invoice) => (
                                            <TableRow key={invoice.id}>
                                                <TableCell className="font-medium">
                                                    <a href={`/customer/billing/${invoice.id}`} className="hover:underline">
                                                        {invoice.invoice_number}
                                                    </a>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(invoice.date).toLocaleDateString('en-GB')}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(invoice.status, invoice.is_overdue, invoice.is_paid)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {formatCurrency(invoice.total)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
