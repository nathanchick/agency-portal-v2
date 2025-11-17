import { Head, Link, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Shield, Download, CheckCircle, XCircle, MinusCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { route } from 'ziggy-js';
import type { CspViolationDecision } from '@/types/csp';

interface Props {
    decisions: {
        data: CspViolationDecision[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from?: number;
        to?: number;
    };
    filters: {
        date_range: string;
    };
}

export default function Audit({ decisions, filters }: Props) {
    const handleDateRangeChange = (value: string) => {
        router.get(
            route('customer.csp.violations.audit'),
            { date_range: value },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleExport = () => {
        window.location.href = route('customer.csp.violations.audit.export', {
            date_range: filters.date_range,
        });
    };

    const getActionBadge = (action: string) => {
        const variants: Record<string, { variant: any; icon: any; label: string; className?: string }> = {
            approved: { variant: 'outline', icon: CheckCircle, label: 'Approved', className: 'border-green-200 bg-green-50 text-green-700' },
            rejected: { variant: 'destructive', icon: XCircle, label: 'Rejected' },
            ignored: { variant: 'secondary', icon: MinusCircle, label: 'Ignored' },
            reopened: { variant: 'outline', icon: AlertCircle, label: 'Reopened', className: 'border-blue-200 bg-blue-50 text-blue-700' },
        };

        const config = variants[action] || variants.approved;
        const Icon = config.icon;

        return (
            <Badge variant={config.variant as any} className={`gap-1 ${config.className || ''}`}>
                <Icon className="h-3 w-3" />
                {config.label}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatUri = (uri: string, maxLength: number = 40) => {
        if (!uri) return '-';
        if (uri.length <= maxLength) return uri;
        return uri.substring(0, maxLength) + '...';
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title="CSP Audit Trail" />
                <AppSidebarHeader
                    breadcrumbs={[
                        { title: 'Dashboard', href: route('dashboard') },
                        { title: 'CSP Violations', href: route('customer.csp.violations.index') },
                        { title: 'Audit Trail' },
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-2">
                                <Shield className="h-8 w-8" />
                                CSP Audit Trail
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Complete history of all decisions made on CSP violations
                            </p>
                        </div>
                        <Link href={route('customer.csp.violations.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Violations
                            </Button>
                        </Link>
                    </div>

                    {/* Filters and Export */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">
                                            Date Range
                                        </label>
                                        <Select
                                            value={filters.date_range}
                                            onValueChange={handleDateRangeChange}
                                        >
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="7">Last 7 days</SelectItem>
                                                <SelectItem value="30">Last 30 days</SelectItem>
                                                <SelectItem value="90">Last 90 days</SelectItem>
                                                <SelectItem value="all">All time</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Button onClick={handleExport} variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export CSV
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Audit Trail Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Decision History ({decisions.total})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {decisions.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No audit records found</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date & Time</TableHead>
                                            <TableHead>Action</TableHead>
                                            <TableHead>Host</TableHead>
                                            <TableHead>Directive</TableHead>
                                            <TableHead>Blocked URI</TableHead>
                                            <TableHead>User</TableHead>
                                            <TableHead>Notes</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {decisions.data.map((decision) => (
                                            <TableRow key={decision.id}>
                                                <TableCell className="text-sm whitespace-nowrap">
                                                    {formatDate(decision.created_at)}
                                                </TableCell>
                                                <TableCell>
                                                    {getActionBadge(decision.action)}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {decision.violation?.host || '-'}
                                                </TableCell>
                                                <TableCell className="font-mono text-xs">
                                                    <Badge variant="outline">
                                                        {decision.violation?.directive || '-'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell
                                                    className="max-w-xs truncate font-mono text-xs"
                                                    title={decision.violation?.blocked_uri}
                                                >
                                                    {formatUri(decision.violation?.blocked_uri || '-')}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <div className="font-medium">{decision.user_name}</div>
                                                        <div className="text-muted-foreground text-xs">
                                                            {decision.user_email}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="max-w-xs">
                                                    {decision.notes ? (
                                                        <div className="text-sm truncate" title={decision.notes}>
                                                            {decision.notes}
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}

                            {/* Pagination */}
                            {decisions.last_page > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {decisions.from} to {decisions.to} of {decisions.total} decisions
                                    </div>
                                    <div className="flex gap-2">
                                        {decisions.current_page > 1 && (
                                            <Link
                                                href={route('customer.csp.violations.audit', {
                                                    ...filters,
                                                    page: decisions.current_page - 1,
                                                })}
                                            >
                                                <Button variant="outline" size="sm">
                                                    Previous
                                                </Button>
                                            </Link>
                                        )}
                                        {decisions.current_page < decisions.last_page && (
                                            <Link
                                                href={route('customer.csp.violations.audit', {
                                                    ...filters,
                                                    page: decisions.current_page + 1,
                                                })}
                                            >
                                                <Button variant="outline" size="sm">
                                                    Next
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
