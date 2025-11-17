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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Briefcase, X} from 'lucide-react';
import {route} from 'ziggy-js';
import {FormEventHandler, useState} from 'react';

interface Customer {
    id: string;
    name: string;
}

interface Project {
    id: string;
    customer_id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface Task {
    id: string;
    name: string;
}

interface Service {
    id: string;
    customer_id: string;
    project_id?: string;
    name: string;
    description?: string;
    status: string;
    billing_type: string;
    budget_period: string;
    current_budget_hours?: number;
    current_budget_amount?: number;
    budget_include_expenses: boolean;
    budget_rollover_enabled: boolean;
    start_date: string;
    end_date?: string;
    default_hourly_rate?: number;
    service_manager_id?: string;
    tasks: Task[];
    users: User[];
}

interface Props {
    service: Service;
    customers: Customer[];
    projects: Project[];
    users: User[];
    tasks: Task[];
}

export default function ServiceEdit({service, customers, projects, users, tasks}: Props) {
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');

    // Format date to YYYY-MM-DD for input type="date"
    const formatDate = (date: string | undefined) => {
        if (!date) return '';
        return date.split('T')[0]; // Remove time component if present
    };

    const {data, setData, put, processing, errors} = useForm({
        customer_id: service.customer_id,
        project_id: service.project_id || '',
        name: service.name,
        description: service.description || '',
        status: service.status,
        billing_type: service.billing_type,
        budget_period: service.budget_period,
        current_budget_hours: service.current_budget_hours?.toString() || '',
        current_budget_amount: service.current_budget_amount?.toString() || '',
        budget_include_expenses: service.budget_include_expenses,
        budget_rollover_enabled: service.budget_rollover_enabled,
        start_date: formatDate(service.start_date),
        end_date: formatDate(service.end_date),
        default_hourly_rate: service.default_hourly_rate?.toString() || '',
        service_manager_id: service.service_manager_id || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('timesheet.services.update', service.id));
    };

    const handleAddTask = () => {
        if (!selectedTaskId) return;
        router.post(
            route('timesheet.services.tasks.attach', service.id),
            { task_id: selectedTaskId },
            {
                preserveScroll: true,
                onSuccess: () => setSelectedTaskId(''),
            }
        );
    };

    const handleRemoveTask = (taskId: string) => {
        router.delete(route('timesheet.services.tasks.detach', { service: service.id, task: taskId }), {
            preserveScroll: true,
        });
    };

    const handleAddUser = () => {
        if (!selectedUserId) return;
        router.post(
            route('timesheet.services.users.attach', service.id),
            { user_id: selectedUserId },
            {
                preserveScroll: true,
                onSuccess: () => setSelectedUserId(''),
            }
        );
    };

    const handleRemoveUser = (userId: string) => {
        router.delete(route('timesheet.services.users.detach', { service: service.id, user: userId }), {
            preserveScroll: true,
        });
    };

    const filteredProjects = projects.filter(p => p.customer_id === data.customer_id);
    const availableTasks = tasks.filter(t => !service.tasks.some(st => st.id === t.id));
    const availableUsers = users.filter(u => !service.users.some(su => su.id === u.id));

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`Edit Service: ${service.name}`} />
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
                                    <BreadcrumbLink href={route('timesheet.services.index')}>
                                        Services
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Edit: {service.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Edit Service</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 max-w-4xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="customer_id">Customer *</Label>
                                            <Select value={data.customer_id} onValueChange={(value) => setData('customer_id', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select customer" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {customers.map((customer) => (
                                                        <SelectItem key={customer.id} value={customer.id}>
                                                            {customer.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.customer_id && <p className="text-sm text-destructive mt-1">{errors.customer_id}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="project_id">Project (Optional)</Label>
                                            <Select
                                                value={data.project_id || undefined}
                                                onValueChange={(value) => setData('project_id', value)}
                                                disabled={!data.customer_id}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select project" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {filteredProjects.map((project) => (
                                                        <SelectItem key={project.id} value={project.id}>
                                                            {project.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="name">Service Name *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., Technical Support, Development"
                                        />
                                        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div>
                                            <Label htmlFor="status">Status</Label>
                                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Active">Active</SelectItem>
                                                    <SelectItem value="Archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="billing_type">Billing Type</Label>
                                            <Select value={data.billing_type} onValueChange={(value) => setData('billing_type', value)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Hourly">Hourly (Time & Materials)</SelectItem>
                                                    <SelectItem value="FixedFee">Fixed Fee</SelectItem>
                                                    <SelectItem value="NonBillable">Non-Billable</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="service_manager_id">Service Manager</Label>
                                            <Select
                                                value={data.service_manager_id || undefined}
                                                onValueChange={(value) => setData('service_manager_id', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select manager" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {users.map((user) => (
                                                        <SelectItem key={user.id} value={user.id}>
                                                            {user.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Budget Configuration</CardTitle>
                                    <CardDescription>Set up budget tracking for this service</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div>
                                            <Label htmlFor="budget_period">Budget Period</Label>
                                            <Select value={data.budget_period} onValueChange={(value) => setData('budget_period', value)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Monthly">Monthly</SelectItem>
                                                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                                                    <SelectItem value="Yearly">Yearly</SelectItem>
                                                    <SelectItem value="OneTime">One-Time</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label htmlFor="current_budget_hours">Budget Hours</Label>
                                            <Input
                                                id="current_budget_hours"
                                                type="number"
                                                step="0.01"
                                                value={data.current_budget_hours}
                                                onChange={(e) => setData('current_budget_hours', e.target.value)}
                                                placeholder="0.00"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="current_budget_amount">Budget Amount</Label>
                                            <Input
                                                id="current_budget_amount"
                                                type="number"
                                                step="0.01"
                                                value={data.current_budget_amount}
                                                onChange={(e) => setData('current_budget_amount', e.target.value)}
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="default_hourly_rate">Default Hourly Rate</Label>
                                        <Input
                                            id="default_hourly_rate"
                                            type="number"
                                            step="0.01"
                                            value={data.default_hourly_rate}
                                            onChange={(e) => setData('default_hourly_rate', e.target.value)}
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="budget_rollover_enabled"
                                                checked={data.budget_rollover_enabled}
                                                onCheckedChange={(checked) => setData('budget_rollover_enabled', checked as boolean)}
                                            />
                                            <Label htmlFor="budget_rollover_enabled" className="font-normal cursor-pointer">
                                                Enable budget rollover (unused hours carry to next period)
                                            </Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="budget_include_expenses"
                                                checked={data.budget_include_expenses}
                                                onCheckedChange={(checked) => setData('budget_include_expenses', checked as boolean)}
                                            />
                                            <Label htmlFor="budget_include_expenses" className="font-normal cursor-pointer">
                                                Include expenses in budget tracking
                                            </Label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Service Timeline</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="start_date">Start Date *</Label>
                                            <Input
                                                id="start_date"
                                                type="date"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                            />
                                            {errors.start_date && <p className="text-sm text-destructive mt-1">{errors.start_date}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="end_date">End Date (Optional)</Label>
                                            <Input
                                                id="end_date"
                                                type="date"
                                                value={data.end_date}
                                                onChange={(e) => setData('end_date', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Tasks</CardTitle>
                                    <CardDescription>
                                        Assign tasks that can be used with this service
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Add Task Dropdown */}
                                    <div className="flex gap-2">
                                        <Select value={selectedTaskId} onValueChange={setSelectedTaskId}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a task to add" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableTasks.length === 0 ? (
                                                    <div className="p-2 text-sm text-muted-foreground">
                                                        All tasks have been added
                                                    </div>
                                                ) : (
                                                    availableTasks.map((task) => (
                                                        <SelectItem key={task.id} value={task.id}>
                                                            {task.name}
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            type="button"
                                            onClick={handleAddTask}
                                            disabled={!selectedTaskId}
                                        >
                                            Add Task
                                        </Button>
                                    </div>

                                    {/* Assigned Tasks */}
                                    {service.tasks.length > 0 ? (
                                        <div className="space-y-2">
                                            {service.tasks.map((task) => (
                                                <div
                                                    key={task.id}
                                                    className="flex items-center justify-between p-2 border rounded hover:bg-muted/50"
                                                >
                                                    <span>{task.name}</span>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveTask(task.id)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No tasks assigned to this service yet.
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Team</CardTitle>
                                    <CardDescription>
                                        Manage users assigned to this service
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Add User Dropdown */}
                                    <div className="flex gap-2">
                                        <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a user to add" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableUsers.length === 0 ? (
                                                    <div className="p-2 text-sm text-muted-foreground">
                                                        All users have been added
                                                    </div>
                                                ) : (
                                                    availableUsers.map((user) => (
                                                        <SelectItem key={user.id} value={user.id}>
                                                            {user.name} ({user.email})
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            type="button"
                                            onClick={handleAddUser}
                                            disabled={!selectedUserId}
                                        >
                                            Add User
                                        </Button>
                                    </div>

                                    {/* Assigned Users */}
                                    {service.users.length > 0 ? (
                                        <div className="space-y-2">
                                            {service.users.map((user) => (
                                                <div
                                                    key={user.id}
                                                    className="flex items-center justify-between p-2 border rounded hover:bg-muted/50"
                                                >
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-sm text-muted-foreground">{user.email}</div>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveUser(user.id)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No users assigned to this service yet.
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(route('timesheet.services.index'))}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Service'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
