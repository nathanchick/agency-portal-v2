import {Head, router} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {CheckSquare, Plus, Edit, Trash2, X} from 'lucide-react';
import {useState} from 'react';
import {route} from 'ziggy-js';

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
    created_at: string;
}

interface Props {
    tasks: {
        data: Task[];
        links?: any[];
    };
    filters: {
        is_active?: string;
    };
}

export default function TasksIndex({tasks, filters}: Props) {
    const [isActiveFilter, setIsActiveFilter] = useState(filters.is_active || '');

    const handleFilterChange = (value: string | undefined) => {
        const newFilters: any = {};
        if (value) {
            newFilters.is_active = value;
        }

        router.get(route('timesheet.tasks.index'), newFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClearFilters = () => {
        setIsActiveFilter('');
        router.get(route('timesheet.tasks.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (taskId: string) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('timesheet.tasks.destroy', taskId), {
                preserveScroll: true,
            });
        }
    };

    const hasActiveFilters = isActiveFilter !== '';

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title="Tasks" />
                <AppSidebarHeader
                    breadcrumbs={[
                        { label: 'Dashboard', href: route('dashboard') },
                        { label: 'Tasks' },
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <CheckSquare className="h-6 w-6" />
                            <h1 className="text-2xl font-bold">Tasks</h1>
                        </div>
                        <Button onClick={() => router.visit(route('timesheet.tasks.create'))}>
                            <Plus className="h-4 w-4 mr-2" />
                            New Task
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4 items-end">
                        <div className="flex-1 max-w-xs">
                            <label className="text-sm font-medium mb-2 block">Status</label>
                            <Select
                                value={isActiveFilter || undefined}
                                onValueChange={(value) => {
                                    setIsActiveFilter(value || '');
                                    handleFilterChange(value);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All tasks" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Active Only</SelectItem>
                                    <SelectItem value="0">Inactive Only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {hasActiveFilters && (
                            <Button variant="outline" onClick={handleClearFilters}>
                                <X className="h-4 w-4 mr-2" />
                                Clear Filters
                            </Button>
                        )}
                    </div>

                    {/* Tasks List */}
                    <div className="rounded-md border divide-y">
                        {tasks.data.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                No tasks found. Create your first task to get started.
                            </div>
                        ) : (
                            tasks.data.map((task) => (
                                <div key={task.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-base truncate">{task.name}</h3>
                                                {task.billable && (
                                                    <Badge variant="outline" className="shrink-0">
                                                        Billable
                                                    </Badge>
                                                )}
                                                {!task.is_active && (
                                                    <Badge variant="secondary" className="shrink-0">
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </div>
                                            {task.description && (
                                                <p className="text-sm text-muted-foreground truncate">{task.description}</p>
                                            )}
                                            {task.services.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {task.services.slice(0, 5).map((service) => (
                                                        <Badge key={service.id} variant="outline" className="text-xs">
                                                            {service.customer?.name ? `${service.customer.name} - ${service.name}` : service.name}
                                                        </Badge>
                                                    ))}
                                                    {task.services.length > 5 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{task.services.length - 5} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 ml-4">
                                        <div className="text-right">
                                            <div className="text-xl font-semibold">
                                                £{task.hourly_rate_override ? Number(task.hourly_rate_override).toFixed(2) : '0.00'}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {task.hourly_rate_override ? 'Override Rate' : 'No Override'}
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => router.visit(route('timesheet.tasks.edit', task.id))}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(task.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {tasks.links && tasks.links.length > 3 && (
                        <div className="flex justify-center gap-2">
                            {tasks.links.map((link: any, index: number) => (
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
