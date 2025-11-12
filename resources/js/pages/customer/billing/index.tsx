import { Head, Link, router } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { AppSidebarHeader } from '@/components/app-sidebar-header'
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { FileText, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface LineItem {
    id: string
    description: string
    quantity: number
    unit_amount: number
    line_amount: number
    tax_amount: number
}

interface Invoice {
    id: string
    invoice_number: string
    status: string
    date: string
    due_date: string | null
    total: number
    amount_due: number
    amount_paid: number
    currency_code: string
    reference: string | null
    online_invoice_url: string | null
    line_items: LineItem[]
    provider: string
    is_paid: boolean
    is_overdue: boolean
    days_until_due: number | null
}

interface PaginatedInvoices {
    data: Invoice[]
    current_page: number
    per_page: number
    total: number
    last_page: number
}

interface Props {
    invoices: PaginatedInvoices
    provider: string
    filters: {
        status?: string
        date_from?: string
        date_to?: string
        search?: string
    }
    statuses: Record<string, string>
}

export default function BillingIndex({ invoices, provider, filters, statuses }: Props) {
    const [searchValue, setSearchValue] = useState(filters.search || '')

    const getStatusBadge = (status: string, isOverdue: boolean, isPaid: boolean) => {
        if (isOverdue && !isPaid) {
            return <Badge variant="destructive">Overdue</Badge>
        }

        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            draft: 'outline',
            submitted: 'secondary',
            approved: 'default',
            paid: 'default',
            cancelled: 'destructive',
        }

        return <Badge variant={variants[status] || 'outline'}>{statuses[status] || status}</Badge>
    }

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: currency,
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const handleFilter = (key: string, value: string) => {
        router.get('/customer/billing', {
            ...filters,
            [key]: value || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    const handleSearch = () => {
        handleFilter('search', searchValue)
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: '/dashboard' },
                    { title: 'Billing', href: '/customer/billing' },
                    { title: 'Invoices', href: '' }
                ]} />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Head title="Billing" />

                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold">Invoices</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Powered by {provider}
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search invoices..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        <Select
                            value={filters.status || 'all'}
                            onValueChange={(value) => handleFilter('status', value === 'all' ? '' : value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All statuses</SelectItem>
                                {Object.entries(statuses).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={handleSearch}>Search</Button>
                    </div>

                    {/* Invoices Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-right">Amount Due</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                                            No invoices found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    invoices.data.map((invoice) => (
                                        <TableRow key={invoice.id}>
                                            <TableCell className="font-medium">
                                                <Link
                                                    href={`/customer/billing/${invoice.id}`}
                                                    className="hover:underline flex items-center gap-2"
                                                >
                                                    <FileText className="h-4 w-4" />
                                                    {invoice.invoice_number}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{formatDate(invoice.date)}</TableCell>
                                            <TableCell>
                                                {invoice.due_date ? formatDate(invoice.due_date) : '-'}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(invoice.status, invoice.is_overdue, invoice.is_paid)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {formatCurrency(invoice.total, invoice.currency_code)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {invoice.is_paid ? (
                                                    <span className="text-green-600">Paid</span>
                                                ) : (
                                                    formatCurrency(invoice.amount_due, invoice.currency_code)
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {invoice.online_invoice_url && (
                                                    <a
                                                        href={invoice.online_invoice_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                                    >
                                                        View <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {invoices.last_page > 1 && (
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">
                                Showing {invoices.data.length} of {invoices.total} invoices
                            </p>
                            <div className="flex gap-2">
                                {Array.from({ length: invoices.last_page }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === invoices.current_page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleFilter('page', page.toString())}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
