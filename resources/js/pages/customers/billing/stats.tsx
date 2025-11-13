import { Head, Link } from '@inertiajs/react'
import { useState } from 'react'
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
import { FileText, Clock, TrendingDown, ChevronDown, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

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
        line_items: Array<{
            id: string
            description: string
            quantity: number
            unit_amount: number
            line_amount: number
            tax_amount: number
        }>
    }>
    monthly_totals: Array<{
        month: string
        total: number
        count: number
    }>
}

interface Customer {
    id: string
    name: string
}

interface Props {
    customer: Customer
    stats: BillingStats
    provider: string
}

export default function CustomerBillingStats({ customer, stats, provider }: Props) {
    const [expandedInvoices, setExpandedInvoices] = useState<Set<string>>(new Set())

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

    const toggleInvoice = (invoiceId: string) => {
        const newExpanded = new Set(expandedInvoices)
        if (newExpanded.has(invoiceId)) {
            newExpanded.delete(invoiceId)
        } else {
            newExpanded.add(invoiceId)
        }
        setExpandedInvoices(newExpanded)
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
                <Head title={`${customer.name} - Billing Statistics`} />
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: '/dashboard' },
                    { title: 'Customers', href: '/customers' },
                    { title: 'Billing', href: '/customers/billing' },
                    { title: customer.name, href: `/customers/${customer.id}/billing/stats` }
                ]} />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/customers/billing">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Back to Overview
                                    </Link>
                                </Button>
                            </div>
                            <h1 className="text-2xl font-bold">{customer.name} - Billing Statistics</h1>
                            <p className="text-sm text-muted-foreground">
                                Overview of billing history and metrics
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

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Paid
                                </CardTitle>
                                <FileText className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(stats.paid_amount)}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.total_paid} invoices paid
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
                                    Most recent invoices (click to expand line items)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[30px]"></TableHead>
                                            <TableHead>Invoice #</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {stats.recent_invoices.map((invoice) => {
                                            const isExpanded = expandedInvoices.has(invoice.id)
                                            return (
                                                <>
                                                    <TableRow
                                                        key={invoice.id}
                                                        className="cursor-pointer hover:bg-muted/50"
                                                        onClick={() => toggleInvoice(invoice.id)}
                                                    >
                                                        <TableCell>
                                                            {isExpanded ? (
                                                                <ChevronDown className="h-4 w-4" />
                                                            ) : (
                                                                <ChevronRight className="h-4 w-4" />
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="font-medium">
                                                            {invoice.invoice_number}
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
                                                    {isExpanded && invoice.line_items.length > 0 && (
                                                        <TableRow key={`${invoice.id}-items`}>
                                                            <TableCell colSpan={5} className="bg-muted/30 p-0">
                                                                <div className="px-4 py-3">
                                                                    <Table>
                                                                        <TableHeader>
                                                                            <TableRow>
                                                                                <TableHead className="text-xs">Description</TableHead>
                                                                                <TableHead className="text-xs text-right">Qty</TableHead>
                                                                                <TableHead className="text-xs text-right">Unit Price</TableHead>
                                                                                <TableHead className="text-xs text-right">Tax</TableHead>
                                                                                <TableHead className="text-xs text-right">Total</TableHead>
                                                                            </TableRow>
                                                                        </TableHeader>
                                                                        <TableBody>
                                                                            {invoice.line_items.map((item) => (
                                                                                <TableRow key={item.id} className="text-sm">
                                                                                    <TableCell>{item.description}</TableCell>
                                                                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                                                                    <TableCell className="text-right">
                                                                                        {formatCurrency(item.unit_amount)}
                                                                                    </TableCell>
                                                                                    <TableCell className="text-right">
                                                                                        {formatCurrency(item.tax_amount)}
                                                                                    </TableCell>
                                                                                    <TableCell className="text-right font-medium">
                                                                                        {formatCurrency(item.line_amount)}
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </>
                                            )
                                        })}
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
