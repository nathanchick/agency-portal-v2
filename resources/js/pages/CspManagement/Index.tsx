import { Head, Link, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { Shield, RefreshCw, Search, AlertCircle, CheckCircle, XCircle, MinusCircle, Globe, TriangleAlert } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import type { CspViolationHostGroup, CspStats, CspFilters } from '@/types/csp';

interface Props {
    violations: {
        data: CspViolationHostGroup[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from?: number;
        to?: number;
    };
    stats: CspStats;
    filters: CspFilters;
    websites: Array<{ id: string; url: string }>;
    hasAnyViolations: boolean;
    customerId: string;
}

export default function Index({ violations, stats, filters, websites, hasAnyViolations, customerId }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [syncing, setSyncing] = useState(false);

    const handleSync = () => {
        setSyncing(true);
        router.post(route('customer.csp.violations.sync'), {}, {
            preserveScroll: true,
            onFinish: () => setSyncing(false),
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('customer.csp.violations.index'), {
            ...filters,
            search: searchQuery,
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

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: any; icon: any; label: string; className?: string }> = {
            new: { variant: 'outline', icon: AlertCircle, label: 'New', className: 'border-blue-200 bg-blue-50 text-blue-700' },
            approved: { variant: 'outline', icon: CheckCircle, label: 'Approved', className: 'border-green-200 bg-green-50 text-green-700' },
            rejected: { variant: 'destructive', icon: XCircle, label: 'Rejected' },
            ignored: { variant: 'secondary', icon: MinusCircle, label: 'Ignored' },
        };

        const config = variants[status] || variants.new;
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
                <Head title="CSP Violations" />
                <AppSidebarHeader
                    breadcrumbs={[
                        { title: 'Dashboard', href: route('dashboard') },
                        { title: 'CSP Violations' },
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* Header with Stats */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-2">
                                <Shield className="h-8 w-8" />
                                Content Security Policy Violations
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Review and manage CSP violations detected on your websites
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={handleSync}
                                disabled={syncing}
                            >
                                <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                                Sync from API
                            </Button>
                            <Link href={route('customer.csp.violations.resolved')}>
                                <Button variant="outline">
                                    View Resolved
                                </Button>
                            </Link>
                            <Link href={route('customer.csp.violations.audit')}>
                                <Button variant="outline">
                                    Audit Trail
                                </Button>
                            </Link>
                            {websites[0] ? (
                                <Link href={route('customer.csp.violations.policy', websites[0].id)}>
                                    <Button variant="outline">
                                        <Globe className="h-4 w-4 mr-2" />
                                        View CSP Policy
                                    </Button>
                                </Link>
                            ) : null};
                        </div>
                    </div>

                    {/* Setup Warning */}
                    {!hasAnyViolations && (
                        <Alert className="border-amber-200 bg-amber-50 text-amber-900">
                            <TriangleAlert className="h-4 w-4 text-amber-600" />
                            <AlertTitle className="text-amber-900">CSP Monitoring Not Configured</AlertTitle>
                            <AlertDescription className="text-amber-800">
                                We are not currently monitoring Content Security Policy violations for your websites.
                                To start tracking CSP violations, you need to configure your website to report violations to our CSP reporting service.
                                <br /><br />
                                <strong>Setup Instructions:</strong>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>
                                        <a
                                            href="https://developer.adobe.com/commerce/php/development/security/content-security-policies/#report-uri-configuration"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-amber-700 hover:underline font-medium"
                                        >
                                            Adobe Commerce (Magento) - CSP Report URI Configuration
                                        </a>
                                    </li>
                                    <li>Configure your CSP headers to include: <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs font-mono">{`report-uri https://csp.deploy.co.uk/${customerId}`}</code></li>
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total</CardTitle>
                                <Shield className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">New</CardTitle>
                                <AlertCircle className="h-4 w-4 text-blue-500" />
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
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ignored</CardTitle>
                                <MinusCircle className="h-4 w-4 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.ignored}</div>
                            </CardContent>
                        </Card>
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
                                    value={filters.directive || 'all'}
                                    onValueChange={handleDirectiveFilter}
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="All Directives" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Directives</SelectItem>
                                        {Object.keys(stats.by_directive)
                                            .filter((directive) => directive !== '')
                                            .map((directive) => (
                                                <SelectItem key={directive} value={directive}>
                                                    {directive} ({stats.by_directive[directive]})
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Violations Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Pending Violations ({violations.total})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {violations.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No pending violations found</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Host</TableHead>
                                            <TableHead>Directive</TableHead>
                                            <TableHead className="text-center">URLs</TableHead>
                                            <TableHead className="text-center">Total Occurrences</TableHead>
                                            <TableHead>Last Seen</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {violations.data.map((group, index) => (
                                            <TableRow key={`${group.host}-${group.directive}-${index}`}>
                                                <TableCell className="font-medium">
                                                    {group.host}
                                                </TableCell>
                                                <TableCell className="font-mono text-xs">
                                                    <Badge variant="outline">{group.directive}</Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="secondary">{group.url_count}</Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="secondary">{group.total_occurrences}</Badge>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {formatDate(group.last_seen_at)}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(group.status)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Link href={route('customer.csp.violations.showHost', {
                                                        host: group.host,
                                                        directive: group.directive
                                                    })}>
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
                                                href={route('customer.csp.violations.index', {
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
                                                href={route('customer.csp.violations.index', {
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
