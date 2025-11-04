import {Head, router} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {Separator} from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Rocket, X} from 'lucide-react';
import {useState} from 'react';
import {route} from 'ziggy-js';

interface Customer {
    id: string;
    name: string;
}

interface Website {
    id: string;
    url: string;
    type: string;
}

interface DeploymentConfig {
    id: string;
    customer: Customer;
    website: Website;
    webhook_token: string;
}

interface DeploymentHistory {
    id: string;
    deployment: DeploymentConfig;
    git_branch: string | null;
    git_tag: string | null;
    git_commit_sha: string | null;
    status: string;
    created_at: string;
    deployed_at: string | null;
}

interface Props {
    deployments: {
        data: DeploymentHistory[];
        links?: any[];
    };
    customers: Customer[];
    filters: {
        customer_id?: string;
        status?: string;
    };
}

export default function DeploymentsIndex({deployments, customers, filters}: Props) {
    const [selectedCustomer, setSelectedCustomer] = useState(filters.customer_id || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

    const handleFilterChange = (key: string, value: string | undefined) => {
        const newFilters = {...filters};
        if (value) {
            newFilters[key as keyof typeof filters] = value;
        } else {
            delete newFilters[key as keyof typeof filters];
        }

        router.get(route('deployments.index'), newFilters, {
            preserveState: false,
            replace: false,
        });
    };

    const handleClearFilters = () => {
        setSelectedCustomer('');
        setSelectedStatus('');
        router.get(route('deployments.index'), {}, {
            preserveState: false,
            replace: false,
        });
    };

    const hasActiveFilters = selectedCustomer || selectedStatus;

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
            success: 'default',
            pending: 'secondary',
            failed: 'destructive',
        };

        return (
            <Badge variant={variants[status] || 'secondary'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not deployed yet';
        return new Date(dateString).toLocaleString();
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={route('dashboard')}>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Deployments</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Head title="Deployment History"/>

                    <h1 className="text-3xl font-bold">Deployment History</h1>

                    {/* Filters */}
                    <div className="flex gap-4 items-center">
                        {customers.length > 0 && (
                            <Select
                                value={selectedCustomer || undefined}
                                onValueChange={(value) => {
                                    setSelectedCustomer(value);
                                    handleFilterChange('customer_id', value);
                                }}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="All Customers"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {customers.map((customer) => (
                                        <SelectItem key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        <Select
                            value={selectedStatus || undefined}
                            onValueChange={(value) => {
                                setSelectedStatus(value);
                                handleFilterChange('status', value);
                            }}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="All Statuses"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="success">Success</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>

                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClearFilters}
                            >
                                <X className="h-4 w-4 mr-2"/>
                                Clear filters
                            </Button>
                        )}
                    </div>

                    {/* Deployments Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Website</TableHead>
                                    <TableHead>Branch</TableHead>
                                    <TableHead>Tag</TableHead>
                                    <TableHead>Commit</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Deployed At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {deployments.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <Rocket className="h-8 w-8 text-muted-foreground mb-2"/>
                                                <p className="text-sm text-muted-foreground">
                                                    No deployment history found.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    deployments.data.map((history) => (
                                        <TableRow key={history.id}>
                                            <TableCell className="font-medium">
                                                {history.deployment.customer.name}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-sm">{history.deployment.website.url}</span>
                                                    <Badge variant="outline" className="w-fit text-xs mt-1">
                                                        {history.deployment.website.type}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                                    {history.git_branch || '-'}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                                    {history.git_tag || '-'}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                                    {history.git_commit_sha
                                                        ? history.git_commit_sha.substring(0, 7)
                                                        : '-'}
                                                </code>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(history.status)}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(history.deployed_at)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {deployments.links && deployments.links.length > 3 && (
                        <div className="flex items-center justify-center gap-2">
                            {deployments.links.map((link: any, index: number) => (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    dangerouslySetInnerHTML={{__html: link.label}}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
