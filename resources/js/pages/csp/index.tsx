import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { Head, router } from '@inertiajs/react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, ShieldAlert, CheckCircle, XCircle, EyeOff } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import { CspViolation, CspStats, CspFilters } from '@/types/csp';

interface Props {
    violations: {
        data: CspViolation[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    stats: CspStats;
    filters: CspFilters;
}

export default function CspViolationsIndex({ violations, stats, filters }: Props) {
    const [syncing, setSyncing] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSync = () => {
        setSyncing(true);
        router.post(route('customer.csp.violations.sync'), {}, {
            onFinish: () => setSyncing(false),
        });
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        router.get(route('customer.csp.violations.index'), {
            ...filters,
            search: value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDirectiveFilter = (directive: string) => {
        router.get(route('customer.csp.violations.index'), {
            ...filters,
            directive: directive === 'all' ? undefined : directive,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSort = (sortBy: string) => {
        const sortOrder = filters.sort_by === sortBy && filters.sort_order === 'desc' ? 'asc' : 'desc';
        router.get(route('customer.csp.violations.index'), {
            ...filters,
            sort_by: sortBy,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDecision = (violationId: string, action: 'approve' | 'reject' | 'ignore') => {
        router.post(route(`customer.csp.violations.${action}`, violationId), {
            notes: '',
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader />
                <Head title="CSP Violations" />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">CSP Violations</h1>
                            <p className="text-muted-foreground">
                                Manage Content Security Policy violations for your websites
                            </p>
                        </div>
                        <Button onClick={handleSync} disabled={syncing}>
                            <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                            {syncing ? 'Syncing...' : 'Sync Violations'}
                        </Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Violations</CardTitle>
                                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">New</CardTitle>
                                <ShieldAlert className="h-4 w-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.new}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.approved}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                                <XCircle className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.rejected}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Filter Violations</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <Input
                                placeholder="Search violations..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="max-w-sm"
                            />
                            <Select
                                value={filters.directive || 'all'}
                                onValueChange={handleDirectiveFilter}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Filter by directive" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Directives</SelectItem>
                                    {Object.keys(stats.by_directive).map((directive) => (
                                        <SelectItem key={directive} value={directive}>
                                            {directive} ({stats.by_directive[directive]})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    {/* Violations List */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Violations</CardTitle>
                            <CardDescription>
                                {violations.total} violation{violations.total !== 1 ? 's' : ''} found
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {violations.data.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No pending violations found
                                    </div>
                                ) : (
                                    violations.data.map((violation) => (
                                        <Card key={violation.id}>
                                            <CardHeader>
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
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
                                                        <p className="text-xs text-muted-foreground mt-2">
                                                            First seen: {new Date(violation.first_seen_at).toLocaleDateString()} |
                                                            Last seen: {new Date(violation.last_seen_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        onClick={() => handleDecision(violation.id, 'approve')}
                                                    >
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDecision(violation.id, 'reject')}
                                                    >
                                                        <XCircle className="mr-2 h-4 w-4" />
                                                        Reject
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleDecision(violation.id, 'ignore')}
                                                    >
                                                        <EyeOff className="mr-2 h-4 w-4" />
                                                        Ignore
                                                    </Button>
                                                </div>
                                            </CardContent>
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
                                                onClick={() => router.get(route('customer.csp.violations.index', { page: violations.current_page - 1 }))}
                                            >
                                                Previous
                                            </Button>
                                        )}
                                        {violations.current_page < violations.last_page && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.get(route('customer.csp.violations.index', { page: violations.current_page + 1 }))}
                                            >
                                                Next
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Link to Resolved */}
                    <div className="flex justify-center">
                        <Button
                            variant="link"
                            onClick={() => router.get(route('customer.csp.violations.resolved'))}
                        >
                            View Resolved Violations
                        </Button>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
