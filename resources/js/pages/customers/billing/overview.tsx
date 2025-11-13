import { Head, Link } from '@inertiajs/react'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppSidebarHeader } from "@/components/app-sidebar-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FileText, Clock, TrendingDown, Users, ExternalLink } from "lucide-react"

interface CustomerBilling {
    id: string
    name: string
    has_billing: boolean
    provider: string | null
    total_invoices: number
    outstanding_amount: number
    overdue_amount: number
    paid_amount: number
    average_days_to_pay: number
    currency_code: string
    last_invoice_date: string | null
}

interface OrganisationTotals {
    total_customers: number
    total_customers_with_billing: number
    total_outstanding: number
    total_overdue: number
    total_paid: number
    total_invoices: number
    currency_code: string
    average_days_to_pay: number
}

interface Props {
    customers: CustomerBilling[]
    totals: OrganisationTotals
}

export default function BillingOverview({ customers, totals }: Props) {
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

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('en-GB')
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title="Customer Billing Overview" />
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: '/dashboard' },
                    { title: 'Customers', href: '/customers' },
                    { title: 'Billing', href: '/customers/billing' }
                ]} />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Customer Billing Overview</h1>
                            <p className="text-sm text-muted-foreground">
                                Billing overview across all customers
                            </p>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Customers
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totals.total_customers}</div>
                                <p className="text-xs text-muted-foreground">
                                    {totals.total_customers_with_billing} with billing
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Invoices
                                </CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totals.total_invoices}</div>
                                <p className="text-xs text-muted-foreground">
                                    Across all customers
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
                                <div className="text-2xl font-bold">{formatCurrency(totals.total_outstanding, totals.currency_code)}</div>
                                <p className="text-xs text-muted-foreground">
                                    Awaiting payment
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
                                <div className="text-2xl font-bold">{formatCurrency(totals.total_overdue, totals.currency_code)}</div>
                                <p className="text-xs text-muted-foreground">
                                    Requires attention
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Average Time to Pay */}
                    {totals.average_days_to_pay > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Average Time to Pay</CardTitle>
                                <CardDescription>
                                    Average days from invoice date to payment across all customers
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-6 w-6" />
                                    <span className={`text-3xl font-bold ${getAveragePayTimeColor(totals.average_days_to_pay)}`}>
                                        {totals.average_days_to_pay} days
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
                    )}

                    {/* Customers Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Customers</CardTitle>
                            <CardDescription>
                                Billing details for each customer
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className="text-center">Invoices</TableHead>
                                        <TableHead className="text-right">Outstanding</TableHead>
                                        <TableHead className="text-right">Overdue</TableHead>
                                        <TableHead className="text-center">Avg Pay Time</TableHead>
                                        <TableHead className="text-center">Last Invoice</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-muted-foreground">
                                                No customers found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        customers.map((customer) => (
                                            <TableRow key={customer.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex flex-col">
                                                        <span>{customer.name}</span>
                                                        {customer.has_billing ? (
                                                            <Badge variant="outline" className="mt-1 w-fit text-xs">
                                                                {customer.provider}
                                                            </Badge>
                                                        ) : (
                                                            <span className="text-xs text-muted-foreground mt-1">
                                                                No billing
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {customer.has_billing ? customer.total_invoices : '-'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {customer.has_billing ? (
                                                        <span className={customer.outstanding_amount > 0 ? 'font-medium' : ''}>
                                                            {formatCurrency(customer.outstanding_amount, customer.currency_code)}
                                                        </span>
                                                    ) : '-'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {customer.has_billing ? (
                                                        customer.overdue_amount > 0 ? (
                                                            <span className="font-medium text-red-500">
                                                                {formatCurrency(customer.overdue_amount, customer.currency_code)}
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted-foreground">-</span>
                                                        )
                                                    ) : '-'}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {customer.has_billing ? (
                                                        customer.average_days_to_pay > 0 ? (
                                                            <span className={`font-medium ${getAveragePayTimeColor(customer.average_days_to_pay)}`}>
                                                                {customer.average_days_to_pay}d
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted-foreground">-</span>
                                                        )
                                                    ) : '-'}
                                                </TableCell>
                                                <TableCell className="text-center text-sm text-muted-foreground">
                                                    {customer.has_billing ? formatDate(customer.last_invoice_date) : '-'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {customer.has_billing ? (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            asChild
                                                        >
                                                            <Link href={`/customers/${customer.id}/billing/stats`}>
                                                                View Details
                                                                <ExternalLink className="ml-2 h-3 w-3" />
                                                            </Link>
                                                        </Button>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">No data</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
