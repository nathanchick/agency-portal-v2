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
import {Briefcase} from 'lucide-react';
import {route} from 'ziggy-js';
import {FormEventHandler} from 'react';

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

interface Props {
    customers: Customer[];
    projects: Project[];
    users: User[];
}

export default function ServiceCreate({customers, projects, users}: Props) {
    const {data, setData, post, processing, errors} = useForm({
        customer_id: '',
        project_id: '',
        name: '',
        description: '',
        status: 'Active',
        billing_type: 'Hourly',
        budget_period: 'Monthly',
        current_budget_hours: '',
        current_budget_amount: '',
        budget_include_expenses: false,
        budget_rollover_enabled: false,
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        default_hourly_rate: '',
        service_manager_id: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('timesheet.services.store'));
    };

    const filteredProjects = projects.filter(p => p.customer_id === data.customer_id);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title="Create Service" />
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
                                    <BreadcrumbPage>Create</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Create Service</h1>
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
                                                    <SelectItem value="Completed">Completed</SelectItem>
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
                                    {processing ? 'Creating...' : 'Create Service'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
