import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { Head, router } from '@inertiajs/react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle, XCircle, EyeOff } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import { CspViolation, CspFilters } from '@/types/csp';

interface Props {
    violations: {
        data: CspViolation[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: CspFilters;
}

export default function CspViolationsResolved({ violations, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        router.get(route('customer.csp.violations.resolved'), {
            ...filters,
            search: value,
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
        switch (status) {
            case 'approved':
                return (
                    <Badge variant="default" className="bg-green-500">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Approved
                    </Badge>
                );
            case 'rejected':
                return (
                    <Badge variant="default" className="bg-red-500">
                        <XCircle className="mr-1 h-3 w-3" />
                        Rejected
                    </Badge>
                );
            case 'ignored':
                return (
                    <Badge variant="secondary">
                        <EyeOff className="mr-1 h-3 w-3" />
                        Ignored
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader />
                <Head title="Resolved CSP Violations" />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Resolved Violations</h1>
                            <p className="text-muted-foreground">
                                View all resolved CSP violations
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => router.get(route('customer.csp.violations.index'))}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Pending
                        </Button>
                    </div>

                    {/* Filters */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Filter Resolved Violations</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <Input
                                placeholder="Search violations..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="max-w-sm"
                            />
                            <Select
                                value={filters.status || 'all'}
                                onValueChange={handleStatusFilter}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                    <SelectItem value="ignored">Ignored</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    {/* Violations List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Resolved Violations</CardTitle>
                            <CardDescription>
                                {violations.total} resolved violation{violations.total !== 1 ? 's' : ''} found
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {violations.data.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No resolved violations found
                                    </div>
                                ) : (
                                    violations.data.map((violation) => (
                                        <Card key={violation.id}>
                                            <CardHeader>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            {getStatusBadge(violation.status)}
                                                            <Badge variant="outline">
                                                                {violation.directive}
                                                            </Badge>
                                                            {violation.website && (
                                                                <Badge variant="secondary">
                                                                    {violation.website.name}
                                                                </Badge>
                                                            )}
                                                            <Badge variant="default">
                                                                {violation.occurrence_count} occurrences
                                                            </Badge>
                                                        </div>
                                                        <CardTitle className="text-lg">
                                                            Blocked: {violation.blocked_uri}
                                                        </CardTitle>
                                                        <CardDescription>
                                                            On: {violation.document_uri}
                                                        </CardDescription>
                                                        {violation.source_file && (
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                Source: {violation.source_file}
                                                                {violation.line_number && `:${violation.line_number}`}
                                                            </p>
                                                        )}
                                                        <div className="text-xs text-muted-foreground mt-2 space-y-1">
                                                            <p>
                                                                First seen: {new Date(violation.first_seen_at).toLocaleDateString()} |
                                                                Last seen: {new Date(violation.last_seen_at).toLocaleDateString()}
                                                            </p>
                                                            {violation.decided_at && violation.decider && (
                                                                <p>
                                                                    Decided by: {violation.decider.name} on{' '}
                                                                    {new Date(violation.decided_at).toLocaleDateString()}
                                                                </p>
                                                            )}
                                                            {violation.decision_notes && (
                                                                <p className="mt-2">
                                                                    Notes: {violation.decision_notes}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))
                                )}
                            </div>

                            {/* Pagination */}
                            {violations.last_page > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Page {violations.current_page} of {violations.last_page}
                                    </div>
                                    <div className="flex gap-2">
                                        {violations.current_page > 1 && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(route('customer.csp.violations.resolved', { page: violations.current_page - 1 }))}
                                            >
                                                Previous
                                            </Button>
                                        )}
                                        {violations.current_page < violations.last_page && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(route('customer.csp.violations.resolved', { page: violations.current_page + 1 }))}
                                            >
                                                Next
                                            </Button>
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
