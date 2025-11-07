import {Head, router} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {
    SidebarInset,
    SidebarProvider,
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
import {Plus, Pencil, Eye} from 'lucide-react';
import {useState} from 'react';
import {route} from 'ziggy-js';

interface Customer {
    id: string;
    name: string;
}

interface Project {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
}

interface Service {
    id: string;
    name: string;
    customer: Customer;
    project?: Project;
    status: string;
    billing_type: string;
    budget_period: string;
    current_budget_hours?: number;
    current_budget_amount?: number;
    current_period_hours_used?: number;
    current_period_amount_used?: number;
    current_period_budget_hours?: number;
    current_period_budget_amount?: number;
    service_manager?: User;
    created_at: string;
}

interface Props {
    services: Service[];
    customers: Customer[];
    filters: {
        customer_id?: string;
        status?: string;
    };
}

export default function ServicesIndex({services, customers, filters}: Props) {
    const [selectedCustomer, setSelectedCustomer] = useState(filters.customer_id || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

    const handleFilterChange = (key: string, value: string | undefined) => {
        const newFilters = {...filters};
        if (value) {
            newFilters[key as keyof typeof filters] = value;
        } else {
            delete newFilters[key as keyof typeof filters];
        }

        router.get(route('timesheet.services.index'), newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClearFilters = () => {
        setSelectedCustomer('');
        setSelectedStatus('Active');
        router.get(route('timesheet.services.index'), {status: 'Active'}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const hasActiveFilters = selectedCustomer || selectedStatus;

    const getBillingTypeBadge = (billingType: string) => {
        const labels: Record<string, string> = {
            Hourly: 'Time & Materials',
            FixedFee: 'Fixed Fee',
            NonBillable: 'Non-Billable',
        };

        return (
            <Badge variant="outline" className="text-xs">
                {labels[billingType] || billingType}
            </Badge>
        );
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title="Services" />
                <AppSidebarHeader
                    breadcrumbs={[
                        { label: 'Dashboard', href: route('dashboard') },
                        { label: 'Services' },
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-4">Services</h1>
                            <div className="flex gap-2">
                                <Select
                                    value={selectedStatus || undefined}
                                    onValueChange={(value) => {
                                        setSelectedStatus(value || '');
                                        handleFilterChange('status', value || undefined);
                                    }}
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Active services" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active services</SelectItem>
                                        <SelectItem value="Archived">Archived services</SelectItem>
                                        <SelectItem value="Completed">Completed services</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Select
                                value={selectedCustomer || undefined}
                                onValueChange={(value) => {
                                    setSelectedCustomer(value || '');
                                    handleFilterChange('customer_id', value || undefined);
                                }}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Filter by customer" />
                                </SelectTrigger>
                                <SelectContent>
                                    {customers.map((customer) => (
                                        <SelectItem key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={() => router.visit(route('timesheet.services.create'))}>
                                <Plus className="h-4 w-4 mr-2" />
                                New Service
                            </Button>
                        </div>
                    </div>

                    {/* Services Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="w-[50px]">
                                        <input type="checkbox" className="rounded" />
                                    </TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead className="text-right">Budget</TableHead>
                                    <TableHead className="text-right">Spent</TableHead>
                                    <TableHead className="w-[200px]"></TableHead>
                                    <TableHead className="text-right">Remaining</TableHead>
                                    <TableHead className="text-right">Costs</TableHead>
                                    <TableHead className="w-[120px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {services.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                                            No services found. Create your first service to get started.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    (() => {
                                        // Group services by customer
                                        const grouped: Record<string, Service[]> = {};
                                        services.forEach(service => {
                                            const customerName = service.customer.name;
                                            if (!grouped[customerName]) {
                                                grouped[customerName] = [];
                                            }
                                            grouped[customerName].push(service);
                                        });

                                        return Object.entries(grouped).map(([customerName, customerServices]) => (
                                            <>
                                                {/* Customer Header */}
                                                <TableRow key={`customer-${customerName}`} className="bg-muted/30">
                                                    <TableCell colSpan={8} className="font-medium">
                                                        {customerName}
                                                    </TableCell>
                                                </TableRow>
                                                {/* Services for this customer */}
                                                {customerServices.map((service) => {
                                                    const budgetHours = parseFloat(service.current_period_budget_hours as any) || 0;
                                                    const spentHours = parseFloat(service.current_period_hours_used as any) || 0;
                                                    const remainingHours = budgetHours - spentHours;
                                                    const percentageUsed = budgetHours > 0 ? (spentHours / budgetHours) * 100 : 0;

                                                    return (
                                                        <TableRow key={service.id} className="hover:bg-muted/20">
                                                            <TableCell>
                                                                <input type="checkbox" className="rounded" />
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium">{service.name}</span>
                                                                    {getBillingTypeBadge(service.billing_type)}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                {budgetHours > 0 ? `${budgetHours.toFixed(2)}` : ''}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                {spentHours.toFixed(2)}
                                                            </TableCell>
                                                            <TableCell>
                                                                {budgetHours > 0 && (
                                                                    <div className="w-full bg-muted rounded-full h-2">
                                                                        <div
                                                                            className="bg-primary h-2 rounded-full transition-all"
                                                                            style={{width: `${Math.min(percentageUsed, 100)}%`}}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                {budgetHours > 0 && (
                                                                    <div className="flex items-center justify-end gap-2">
                                                                        <span>{remainingHours.toFixed(2)}</span>
                                                                        <span className="text-muted-foreground text-sm">
                                                                            ({Math.round(100 - percentageUsed)}%)
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                £{(parseFloat(service.current_period_amount_used as any) || 0).toFixed(2)}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex gap-1 justify-end">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => router.visit(route('timesheet.services.show', service.id))}
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => router.visit(route('timesheet.services.edit', service.id))}
                                                                    >
                                                                        <Pencil className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </>
                                        ));
                                    })()
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
