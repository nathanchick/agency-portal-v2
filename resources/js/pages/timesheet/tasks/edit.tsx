import {Head, router, useForm} from '@inertiajs/react';
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
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {CheckSquare} from 'lucide-react';
import {route} from 'ziggy-js';
import {FormEventHandler} from 'react';

interface Customer {
    id: string;
    name: string;
}

interface Service {
    id: string;
    name: string;
    customer?: Customer;
}

interface Task {
    id: string;
    name: string;
    description?: string;
    billable: boolean;
    hourly_rate_override?: number;
    is_active: boolean;
    services: Service[];
}

interface Props {
    task: Task;
    services: Service[];
}

export default function TaskEdit({task, services}: Props) {
    const {data, setData, put, processing, errors} = useForm({
        name: task.name,
        description: task.description || '',
        billable: task.billable,
        hourly_rate_override: task.hourly_rate_override?.toString() || '',
        is_active: task.is_active,
        service_ids: task.services.map(s => s.id),
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('timesheet.tasks.update', task.id));
    };

    const toggleService = (serviceId: string) => {
        if (data.service_ids.includes(serviceId)) {
            setData('service_ids', data.service_ids.filter(id => id !== serviceId));
        } else {
            setData('service_ids', [...data.service_ids, serviceId]);
        }
    };

    // Group services by customer
    const groupedServices = services.reduce((acc, service) => {
        const customerName = service.customer?.name || 'No Customer';
        if (!acc[customerName]) {
            acc[customerName] = [];
        }
        acc[customerName].push(service);
        return acc;
    }, {} as Record<string, typeof services>);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`Edit Task: ${task.name}`} />
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
                                    <BreadcrumbLink href={route('timesheet.tasks.index')}>
                                        Tasks
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Edit: {task.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center gap-2">
                        <CheckSquare className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Edit Task</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 max-w-3xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Task Details</CardTitle>
                                    <CardDescription>
                                        Tasks are organisation-level and can be associated with multiple services
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Name *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., Development, Support, Consultation"
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-destructive mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Describe this task type..."
                                            rows={3}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-destructive mt-1">{errors.description}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="billable"
                                                checked={data.billable}
                                                onCheckedChange={(checked) => setData('billable', checked as boolean)}
                                            />
                                            <Label htmlFor="billable" className="font-normal cursor-pointer">
                                                Billable by default
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="is_active"
                                                checked={data.is_active}
                                                onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                            />
                                            <Label htmlFor="is_active" className="font-normal cursor-pointer">
                                                Active
                                            </Label>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="hourly_rate_override">Hourly Rate Override</Label>
                                        <Input
                                            id="hourly_rate_override"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.hourly_rate_override}
                                            onChange={(e) => setData('hourly_rate_override', e.target.value)}
                                            placeholder="Optional - overrides service default rate"
                                        />
                                        {errors.hourly_rate_override && (
                                            <p className="text-sm text-destructive mt-1">{errors.hourly_rate_override}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Associated Services (Optional)</CardTitle>
                                    <CardDescription>
                                        Select which services this task can be used with
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {services.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            No active services available. Create services to associate them with this task.
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            {Object.entries(groupedServices).map(([customerName, customerServices]) => (
                                                <div key={customerName}>
                                                    <h4 className="font-semibold text-sm mb-2">{customerName}</h4>
                                                    <div className="grid gap-2 pl-4">
                                                        {customerServices.map((service) => (
                                                            <div key={service.id} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`service-${service.id}`}
                                                                    checked={data.service_ids.includes(service.id)}
                                                                    onCheckedChange={() => toggleService(service.id)}
                                                                />
                                                                <Label
                                                                    htmlFor={`service-${service.id}`}
                                                                    className="font-normal cursor-pointer"
                                                                >
                                                                    {service.name}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(route('timesheet.tasks.index'))}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Task'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
