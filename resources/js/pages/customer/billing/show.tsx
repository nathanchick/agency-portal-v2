import { Head, Link } from '@inertiajs/react'
import { AppSidebar } from '@/components/app-sidebar'
import { AppSidebarHeader } from '@/components/app-sidebar-header'
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from '@/components/ui/table'
import { ArrowLeft, ExternalLink } from 'lucide-react'

interface LineItem {
    id: string
    description: string
    quantity: number
    unit_amount: number
    line_amount: number
    tax_amount: number
    item_code: string | null
}

interface Invoice {
    id: string
    invoice_number: string
    status: string
    date: string
    due_date: string | null
    subtotal: number
    total_tax: number
    total: number
    amount_due: number
    amount_paid: number
    currency_code: string
    reference: string | null
    online_invoice_url: string | null
    fully_paid_at: string | null
    line_items: LineItem[]
    provider: string
    is_paid: boolean
    is_overdue: boolean
    days_until_due: number | null
}

interface Props {
    invoice: Invoice
    provider: string
}

export default function BillingShow({ invoice, provider }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: invoice.currency_code,
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const getStatusBadge = () => {
        if (invoice.is_overdue && !invoice.is_paid) {
            return <Badge variant="destructive">Overdue</Badge>
        }

        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            draft: 'outline',
            submitted: 'secondary',
            approved: 'default',
            paid: 'default',
            cancelled: 'destructive',
        }

        return <Badge variant={variants[invoice.status] || 'outline'}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </Badge>
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: '/dashboard' },
                    { title: 'Billing', href: '/customer/billing' },
                    { title: invoice.invoice_number, href: `/customer/billing/${invoice.id}` }
                ]} />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Head title={`Invoice ${invoice.invoice_number}`} />

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Link href="/customer/billing">
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold">Invoice {invoice.invoice_number}</h1>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {invoice.reference && `Ref: ${invoice.reference}`}
                                </p>
                            </div>
                        </div>
                        {invoice.online_invoice_url && (
                            <a
                                href={invoice.online_invoice_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button>
                                    View in {provider}
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </a>
                        )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    {getStatusBadge()}
                                    {invoice.is_overdue && !invoice.is_paid && invoice.days_until_due && (
                                        <span className="text-sm text-muted-foreground">
                                            {Math.abs(invoice.days_until_due)} days overdue
                                        </span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice Date</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-semibold">{formatDate(invoice.date)}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Due Date</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-semibold">
                                    {invoice.due_date ? formatDate(invoice.due_date) : 'No due date'}
                                </p>
                                {!invoice.is_paid && invoice.days_until_due !== null && invoice.days_until_due > 0 && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Due in {invoice.days_until_due} days
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Line Items</CardTitle>
                            <CardDescription>Detailed breakdown of charges</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">Quantity</TableHead>
                                        <TableHead className="text-right">Unit Price</TableHead>
                                        <TableHead className="text-right">Tax</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invoice.line_items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div>
                                                    <p className="font-medium">{item.description}</p>
                                                    {item.item_code && (
                                                        <p className="text-xs text-muted-foreground">{item.item_code}</p>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                            <TableCell className="text-right">{formatCurrency(item.unit_amount)}</TableCell>
                                            <TableCell className="text-right">{formatCurrency(item.tax_amount)}</TableCell>
                                            <TableCell className="text-right font-medium">
                                                {formatCurrency(item.line_amount)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-right font-medium">Subtotal</TableCell>
                                        <TableCell className="text-right">{formatCurrency(invoice.subtotal)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-right font-medium">Tax</TableCell>
                                        <TableCell className="text-right">{formatCurrency(invoice.total_tax)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-right font-bold text-lg">Total</TableCell>
                                        <TableCell className="text-right font-bold text-lg">
                                            {formatCurrency(invoice.total)}
                                        </TableCell>
                                    </TableRow>
                                    {invoice.amount_paid > 0 && (
                                        <>
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-right font-medium text-green-600">
                                                    Amount Paid
                                                </TableCell>
                                                <TableCell className="text-right text-green-600">
                                                    {formatCurrency(invoice.amount_paid)}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-right font-bold text-lg">
                                                    Amount Due
                                                </TableCell>
                                                <TableCell className="text-right font-bold text-lg">
                                                    {formatCurrency(invoice.amount_due)}
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )}
                                </TableFooter>
                            </Table>
                        </CardContent>
                    </Card>

                    {invoice.fully_paid_at && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Paid in full on {formatDate(invoice.fully_paid_at)}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
