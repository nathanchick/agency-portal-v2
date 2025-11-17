import { Head, Link, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
import { Shield, Search, CheckCircle, XCircle, MinusCircle, ArrowLeft } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import type { CspViolation, CspFilters } from '@/types/csp';

interface Props {
    violations: {
        data: CspViolation[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: CspFilters;
}

export default function Resolved({ violations, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('customer.csp.violations.resolved'), {
            ...filters,
            search: searchQuery,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStatusFilter = (status: string) => {
        router.get(route('customer.csp.violations.resolved'), {
            ...filters,
            status: status === 'all' ? undefined : status,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: any; icon: any; label: string; className?: string }> = {
            approved: { variant: 'outline', icon: CheckCircle, label: 'Approved', className: 'border-green-200 bg-green-50 text-green-700' },
            rejected: { variant: 'destructive', icon: XCircle, label: 'Rejected' },
            ignored: { variant: 'secondary', icon: MinusCircle, label: 'Ignored' },
        };

        const config = variants[status] || variants.approved;
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

    const formatUri = (uri: string, maxLength: number = 50) => {
        if (uri.length <= maxLength) return uri;
        return uri.substring(0, maxLength) + '...';
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title="Resolved CSP Violations" />
                <AppSidebarHeader
                    breadcrumbs={[
                        { title: 'Dashboard', href: route('dashboard') },
                        { title: 'CSP Violations', href: route('customer.csp.violations.index') },
                        { title: 'Resolved' },
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-2">
                                <Shield className="h-8 w-8" />
                                Resolved Violations
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                View history of approved, rejected, and ignored violations
                            </p>
                        </div>
                        <Link href={route('customer.csp.violations.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Pending
                            </Button>
                        </Link>
                    </div>

                    {/* Filters */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex gap-4">
                                <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search blocked URI, document URI, or source file..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    <Button type="submit">Search</Button>
                                </form>
                                <Select
                                    value={filters.status || 'all'}
                                    onValueChange={handleStatusFilter}
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="All Statuses" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Statuses</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                        <SelectItem value="ignored">Ignored</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Violations Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Resolved Violations ({violations.total})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {violations.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No resolved violations found</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Directive</TableHead>
                                            <TableHead>Blocked URI</TableHead>
                                            <TableHead>Document URI</TableHead>
                                            <TableHead className="text-center">Occurrences</TableHead>
                                            <TableHead>Decided At</TableHead>
                                            <TableHead>Decided By</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {violations.data.map((violation) => (
                                            <TableRow key={violation.id}>
                                                <TableCell className="font-mono text-xs">
                                                    <Badge variant="outline">{violation.directive}</Badge>
                                                </TableCell>
                                                <TableCell className="max-w-xs truncate" title={violation.blocked_uri}>
                                                    {formatUri(violation.blocked_uri)}
                                                </TableCell>
                                                <TableCell className="max-w-xs truncate" title={violation.document_uri}>
                                                    {formatUri(violation.document_uri)}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="secondary">{violation.occurrence_count}</Badge>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {violation.decided_at ? formatDate(violation.decided_at) : '-'}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {violation.decider?.name || '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(violation.status)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Link href={route('customer.csp.violations.show', violation.id)}>
                                                        <Button variant="outline" size="sm">
                                                            View Details
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}

                            {/* Pagination */}
                            {violations.last_page > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {violations.from} to {violations.to} of {violations.total} violations
                                    </div>
                                    <div className="flex gap-2">
                                        {violations.current_page > 1 && (
                                            <Link
                                                href={route('customer.csp.violations.resolved', {
                                                    ...filters,
                                                    page: violations.current_page - 1,
                                                })}
                                            >
                                                <Button variant="outline" size="sm">
                                                    Previous
                                                </Button>
                                            </Link>
                                        )}
                                        {violations.current_page < violations.last_page && (
                                            <Link
                                                href={route('customer.csp.violations.resolved', {
                                                    ...filters,
                                                    page: violations.current_page + 1,
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
