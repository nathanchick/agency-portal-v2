import {Head, router, usePage} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Separator} from '@/components/ui/separator';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Badge} from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {Download, FileText, Save, Calendar, Clock, DollarSign, Users, ChevronDown, ChevronRight, Edit} from 'lucide-react';
import {useState, useEffect} from 'react';
import {route} from 'ziggy-js';
import {useForm} from '@inertiajs/react';

interface Customer {
    id: string;
    name: string;
}

interface Service {
    id: string;
    name: string;
    customer_id: string;
    customer: Customer;
}

interface Task {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface TimeEntry {
    id: string;
    date: string;
    user: User;
    customer: Customer;
    service: Service;
    task?: Task;
    description?: string;
    duration_hours: number;
    billable: boolean;
    hourly_rate: number;
    approved: boolean;
    external_reference?: string;
}

interface Summary {
    total_hours: number;
    billable_hours: number;
    non_billable_hours: number;
    total_amount: number;
    entry_count: number;
}

interface ReportData {
    time_entries: TimeEntry[];
    summary: Summary;
    filters: any;
}

interface Props {
    customers: Customer[];
    services: Service[];
    tasks: Task[];
    users: User[];
}

export default function ReportsIndex({customers, services, tasks, users}: Props) {
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(false);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);

    // Filter state
    const [timeFrame, setTimeFrame] = useState('this_month');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [serviceForPeriod, setServiceForPeriod] = useState('');

    // Display state
    const [groupBy, setGroupBy] = useState<'none' | 'date' | 'service' | 'user' | 'task'>('date');
    const [showHours, setShowHours] = useState<'all' | 'billable' | 'non-billable'>('all');
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
    const [filtersCollapsed, setFiltersCollapsed] = useState(false);

    // Filtered lists based on selected customers
    const filteredServices = selectedCustomers.length > 0
        ? services.filter(service => selectedCustomers.includes(service.customer_id))
        : services;

    const filteredUsers = selectedCustomers.length > 0
        ? users.filter(user => {
            // Get all services for selected customers
            const customerServices = services.filter(s => selectedCustomers.includes(s.customer_id));
            // Check if user is assigned to any of these services (if your data model supports this)
            // For now, return all users - you may need to adjust based on your data model
            return true;
        })
        : users;

    // Clear dependent selections when customers change
    useEffect(() => {
        if (selectedCustomers.length > 0) {
            // Remove services that don't belong to selected customers
            const validServices = selectedServices.filter(serviceId =>
                filteredServices.some(s => s.id === serviceId)
            );
            if (validServices.length !== selectedServices.length) {
                setSelectedServices(validServices);
            }
        }
    }, [selectedCustomers]);

    // Filter and group time entries
    const getFilteredEntries = () => {
        if (!reportData) return [];

        let filtered = reportData.time_entries;

        // Apply show hours filter
        if (showHours === 'billable') {
            filtered = filtered.filter(e => e.billable);
        } else if (showHours === 'non-billable') {
            filtered = filtered.filter(e => !e.billable);
        }

        return filtered;
    };

    const getGroupedEntries = () => {
        const filtered = getFilteredEntries();

        if (groupBy === 'none') {
            return [{ key: 'all', label: 'All Entries', entries: filtered }];
        }

        const groups: Record<string, { label: string; entries: TimeEntry[]; sortKey: string }> = {};

        filtered.forEach(entry => {
            let key: string;
            let label: string;
            let sortKey: string;

            switch (groupBy) {
                case 'date':
                    key = entry.date;
                    label = new Date(entry.date).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    sortKey = entry.date;
                    break;
                case 'service':
                    key = entry.service.id;
                    label = `${entry.customer.name} - ${entry.service.name}`;
                    sortKey = label;
                    break;
                case 'user':
                    key = entry.user.id;
                    label = entry.user.name;
                    sortKey = label;
                    break;
                case 'task':
                    key = entry.task?.id || 'no-task';
                    label = entry.task?.name || 'No Task';
                    sortKey = label;
                    break;
                default:
                    key = 'all';
                    label = 'All';
                    sortKey = 'all';
            }

            if (!groups[key]) {
                groups[key] = { label, entries: [], sortKey };
            }
            groups[key].entries.push(entry);
        });

        // Sort groups and convert to array
        return Object.entries(groups)
            .map(([key, value]) => ({ key, ...value }))
            .sort((a, b) => {
                if (groupBy === 'date') {
                    return new Date(b.sortKey).getTime() - new Date(a.sortKey).getTime(); // Most recent first
                }
                return a.sortKey.localeCompare(b.sortKey);
            });
    };

    const toggleGroup = (groupKey: string) => {
        const newExpanded = new Set(expandedGroups);
        if (newExpanded.has(groupKey)) {
            newExpanded.delete(groupKey);
        } else {
            newExpanded.add(groupKey);
        }
        setExpandedGroups(newExpanded);
    };

    // Expand all groups by default when report data changes
    useEffect(() => {
        if (reportData) {
            const allGroups = getGroupedEntries().map(g => g.key);
            setExpandedGroups(new Set(allGroups));
        }
    }, [reportData, groupBy]);

    // Load saved report filters if loaded_report parameter is present
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const loadedReportId = urlParams.get('loaded_report');

        if (loadedReportId) {
            // Fetch the saved report and apply its filters
            fetch(route('timesheet.reports.saved.load', loadedReportId), {
                headers: {
                    'Accept': 'application/json',
                },
                credentials: 'same-origin',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Apply the filters from the saved report
                const filters = data.filters;

                if (filters.time_frame) setTimeFrame(filters.time_frame);
                if (filters.start_date) setStartDate(filters.start_date);
                if (filters.end_date) setEndDate(filters.end_date);
                if (filters.customer_ids) setSelectedCustomers(filters.customer_ids);
                if (filters.service_ids) setSelectedServices(filters.service_ids);
                if (filters.task_ids) setSelectedTasks(filters.task_ids);
                if (filters.user_ids) setSelectedUsers(filters.user_ids);
                if (filters.service_id_for_period) setServiceForPeriod(filters.service_id_for_period);

                // Remove the loaded_report parameter from URL without reloading
                const newUrl = window.location.pathname;
                window.history.replaceState({}, '', newUrl);

                // Automatically generate the report with the loaded filters
                // Need to use the filters directly since state updates are async
                setLoading(true);
                const generateFilters: any = {
                    time_frame: filters.time_frame,
                    customer_ids: filters.customer_ids || [],
                    service_ids: filters.service_ids || [],
                    task_ids: filters.task_ids || [],
                    user_ids: filters.user_ids || [],
                };

                if (filters.time_frame === 'custom') {
                    generateFilters.start_date = filters.start_date;
                    generateFilters.end_date = filters.end_date;
                }

                if (filters.time_frame === 'current_period' || filters.time_frame === 'last_period') {
                    generateFilters.service_id_for_period = filters.service_id_for_period;
                }

                // Get XSRF token from cookie
                const getCookie = (name: string) => {
                    const value = `; ${document.cookie}`;
                    const parts = value.split(`; ${name}=`);
                    if (parts.length === 2) return parts.pop()?.split(';').shift();
                    return '';
                };

                fetch(route('timesheet.reports.generate'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify(generateFilters),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(reportData => {
                    setReportData(reportData);
                    setFiltersCollapsed(true);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Failed to generate report:', error);
                    setLoading(false);
                });
            })
            .catch(error => {
                console.error('Failed to load saved report:', error);
            });
        }
    }, []);

    const saveReportForm = useForm({
        name: '',
        description: '',
        filters: {},
        is_public: false,
    });

    const handleGenerate = async () => {
        setLoading(true);

        const filters: any = {
            time_frame: timeFrame,
            customer_ids: selectedCustomers,
            service_ids: selectedServices,
            task_ids: selectedTasks,
            user_ids: selectedUsers,
        };

        if (timeFrame === 'custom') {
            filters.start_date = startDate;
            filters.end_date = endDate;
        }

        if (timeFrame === 'current_period' || timeFrame === 'last_period') {
            filters.service_id_for_period = serviceForPeriod;
        }

        try {
            // Get XSRF token from cookie
            const getCookie = (name: string) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop()?.split(';').shift();
                return '';
            };

            const response = await fetch(route('timesheet.reports.generate'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
                },
                credentials: 'same-origin',
                body: JSON.stringify(filters),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setReportData(data);
            setFiltersCollapsed(true);
        } catch (error) {
            console.error('Failed to generate report:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = (format: 'csv' | 'pdf') => {
        const filters: any = {
            time_frame: timeFrame,
            customer_ids: selectedCustomers,
            service_ids: selectedServices,
            task_ids: selectedTasks,
            user_ids: selectedUsers,
            format,
        };

        if (timeFrame === 'custom') {
            filters.start_date = startDate;
            filters.end_date = endDate;
        }

        if (timeFrame === 'current_period' || timeFrame === 'last_period') {
            filters.service_id_for_period = serviceForPeriod;
        }

        // Create a form and submit it to trigger file download
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route('timesheet.reports.export');
        form.style.display = 'none';

        // Add CSRF token
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

        // Add all filters as form inputs
        Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = `${key}[]`;
                    input.value = item;
                    form.appendChild(input);
                });
            } else {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = value as string;
                form.appendChild(input);
            }
        });

        document.body.appendChild(form);
        form.submit();

        // Remove form after submission
        setTimeout(() => {
            if (form.parentNode) {
                document.body.removeChild(form);
            }
        }, 100);
    };

    const handleSaveReport = () => {
        const filters = {
            time_frame: timeFrame,
            customer_ids: selectedCustomers,
            service_ids: selectedServices,
            task_ids: selectedTasks,
            user_ids: selectedUsers,
            ...(timeFrame === 'custom' && {start_date: startDate, end_date: endDate}),
            ...(timeFrame === 'current_period' || timeFrame === 'last_period' ? {service_id_for_period: serviceForPeriod} : {}),
        };

        saveReportForm.setData('filters', filters);
        setSaveDialogOpen(true);
    };

    const submitSaveReport = () => {
        saveReportForm.post(route('timesheet.reports.saved.store'), {
            onSuccess: () => {
                setSaveDialogOpen(false);
                saveReportForm.reset();
            },
        });
    };

    const needsServiceForPeriod = timeFrame === 'current_period' || timeFrame === 'last_period';

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Timesheet Reports"/>
                <AppSidebarHeader
                    breadcrumbs={[
                        { label: 'Dashboard', href: route('dashboard') },
                        { label: 'Timesheet Reports' },
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className={`grid gap-4 ${filtersCollapsed ? 'md:grid-cols-1' : 'md:grid-cols-4'}`}>
                        {/* Filters Card */}
                        {!filtersCollapsed ? (
                            <Card className="md:col-span-1">
                                <CardHeader>
                                    <CardTitle>Filters</CardTitle>
                                    <CardDescription>Configure your report parameters</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                {/* Time Frame */}
                                <div className="space-y-2">
                                    <Label htmlFor="time-frame">Time Frame</Label>
                                    <Select value={timeFrame} onValueChange={setTimeFrame}>
                                        <SelectTrigger id="time-frame">
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="current_period">Current Period</SelectItem>
                                            <SelectItem value="last_period">Last Period</SelectItem>
                                            <SelectItem value="this_month">This Month</SelectItem>
                                            <SelectItem value="last_month">Last Month</SelectItem>
                                            <SelectItem value="this_year">This Year</SelectItem>
                                            <SelectItem value="last_year">Last Year</SelectItem>
                                            <SelectItem value="custom">Custom Range</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Service for Period (conditional) */}
                                {needsServiceForPeriod && (
                                    <div className="space-y-2">
                                        <Label htmlFor="service-for-period">Service for Period</Label>
                                        <Select value={serviceForPeriod} onValueChange={setServiceForPeriod}>
                                            <SelectTrigger id="service-for-period">
                                                <SelectValue placeholder="Select service"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredServices.map((service) => (
                                                    <SelectItem key={service.id} value={service.id}>
                                                        {service.name} ({service.customer.name})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Custom Date Range (conditional) */}
                                {timeFrame === 'custom' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="start-date">Start Date</Label>
                                            <Input
                                                id="start-date"
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="end-date">End Date</Label>
                                            <Input
                                                id="end-date"
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}

                                <Separator/>

                                {/* Customers */}
                                <div className="space-y-2">
                                    <Label>Customers ({selectedCustomers.length} selected)</Label>
                                    <div className="max-h-40 overflow-y-auto space-y-2 border rounded-md p-2">
                                        {customers.map((customer) => (
                                            <div key={customer.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`customer-${customer.id}`}
                                                    checked={selectedCustomers.includes(customer.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedCustomers([...selectedCustomers, customer.id]);
                                                        } else {
                                                            setSelectedCustomers(selectedCustomers.filter(id => id !== customer.id));
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor={`customer-${customer.id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                >
                                                    {customer.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Services */}
                                <div className="space-y-2">
                                    <Label>Services ({selectedServices.length} selected)</Label>
                                    <div className="max-h-40 overflow-y-auto space-y-2 border rounded-md p-2">
                                        {filteredServices.length === 0 && selectedCustomers.length > 0 ? (
                                            <p className="text-sm text-muted-foreground p-2">No services for selected customers</p>
                                        ) : (
                                            (() => {
                                                // Group services by customer
                                                const groupedServices = filteredServices.reduce((acc, service) => {
                                                    const customerId = service.customer_id;
                                                    if (!acc[customerId]) {
                                                        acc[customerId] = {
                                                            customer: service.customer,
                                                            services: []
                                                        };
                                                    }
                                                    acc[customerId].services.push(service);
                                                    return acc;
                                                }, {} as Record<string, { customer: Customer, services: Service[] }>);

                                                return Object.values(groupedServices).map(({ customer, services }) => (
                                                    <div key={customer.id} className="space-y-1">
                                                        <div className="text-xs font-semibold text-muted-foreground px-2 py-1 bg-muted/50 rounded">
                                                            {customer.name}
                                                        </div>
                                                        {services.map((service) => (
                                                            <div key={service.id} className="flex items-center space-x-2 pl-2">
                                                                <Checkbox
                                                                    id={`service-${service.id}`}
                                                                    checked={selectedServices.includes(service.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        if (checked) {
                                                                            setSelectedServices([...selectedServices, service.id]);
                                                                        } else {
                                                                            setSelectedServices(selectedServices.filter(id => id !== service.id));
                                                                        }
                                                                    }}
                                                                />
                                                                <label
                                                                    htmlFor={`service-${service.id}`}
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                                >
                                                                    {service.name}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ));
                                            })()
                                        )}
                                    </div>
                                </div>

                                {/* Tasks */}
                                <div className="space-y-2">
                                    <Label>Tasks ({selectedTasks.length} selected)</Label>
                                    <div className="max-h-40 overflow-y-auto space-y-2 border rounded-md p-2">
                                        {tasks.map((task) => (
                                            <div key={task.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`task-${task.id}`}
                                                    checked={selectedTasks.includes(task.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedTasks([...selectedTasks, task.id]);
                                                        } else {
                                                            setSelectedTasks(selectedTasks.filter(id => id !== task.id));
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor={`task-${task.id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                >
                                                    {task.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Users */}
                                <div className="space-y-2">
                                    <Label>Team Members ({selectedUsers.length} selected)</Label>
                                    <div className="max-h-40 overflow-y-auto space-y-2 border rounded-md p-2">
                                        {filteredUsers.map((user) => (
                                            <div key={user.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`user-${user.id}`}
                                                    checked={selectedUsers.includes(user.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setSelectedUsers([...selectedUsers, user.id]);
                                                        } else {
                                                            setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor={`user-${user.id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                >
                                                    {user.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator/>

                                {/* Actions */}
                                <div className="space-y-2">
                                    <Button
                                        className="w-full"
                                        onClick={handleGenerate}
                                        disabled={loading || (needsServiceForPeriod && !serviceForPeriod)}
                                    >
                                        {loading ? 'Generating...' : 'Generate Report'}
                                    </Button>
                                </div>
                                </CardContent>
                            </Card>
                        ) : null}

                        {/* Results Area */}
                        <div className={filtersCollapsed ? "space-y-4" : "md:col-span-3 space-y-4"}>
                            {!reportData && (
                                <Card>
                                    <CardContent className="flex items-center justify-center h-96">
                                        <div className="text-center text-muted-foreground">
                                            <FileText className="h-16 w-16 mx-auto mb-4 opacity-20"/>
                                            <p>Configure filters and click "Generate Report" to view results</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {reportData && (
                                <>
                                    {/* Filter Summary */}
                                    <Card className="bg-muted/30">
                                        <CardContent className="pt-6">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                                    <span className="font-semibold">Active Filters:</span>

                                                {/* Time Frame Badge */}
                                                <Badge variant="secondary" className="gap-1">
                                                    <Calendar className="h-3 w-3"/>
                                                    {timeFrame === 'this_month' && 'This Month'}
                                                    {timeFrame === 'last_month' && 'Last Month'}
                                                    {timeFrame === 'this_year' && 'This Year'}
                                                    {timeFrame === 'last_year' && 'Last Year'}
                                                    {timeFrame === 'current_period' && 'Current Period'}
                                                    {timeFrame === 'last_period' && 'Last Period'}
                                                    {timeFrame === 'custom' && `${startDate} to ${endDate}`}
                                                </Badge>

                                                {/* Customers Badge */}
                                                {selectedCustomers.length > 0 && (
                                                    <Badge variant="secondary" className="gap-1">
                                                        <Users className="h-3 w-3"/>
                                                        {selectedCustomers.length} {selectedCustomers.length === 1 ? 'Customer' : 'Customers'}
                                                    </Badge>
                                                )}

                                                {/* Services Badge */}
                                                {selectedServices.length > 0 && (
                                                    <Badge variant="secondary" className="gap-1">
                                                        <Clock className="h-3 w-3"/>
                                                        {selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'}
                                                    </Badge>
                                                )}

                                                {/* Tasks Badge */}
                                                {selectedTasks.length > 0 && (
                                                    <Badge variant="secondary" className="gap-1">
                                                        {selectedTasks.length} {selectedTasks.length === 1 ? 'Task' : 'Tasks'}
                                                    </Badge>
                                                )}

                                                {/* Users Badge */}
                                                {selectedUsers.length > 0 && (
                                                    <Badge variant="secondary" className="gap-1">
                                                        {selectedUsers.length} Team {selectedUsers.length === 1 ? 'Member' : 'Members'}
                                                    </Badge>
                                                )}

                                                {/* Show all filters button if none selected */}
                                                {selectedCustomers.length === 0 && selectedServices.length === 0 && selectedTasks.length === 0 && selectedUsers.length === 0 && (
                                                    <span className="text-muted-foreground">No additional filters applied</span>
                                                )}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2">
                                                    {filtersCollapsed && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setFiltersCollapsed(false)}
                                                        >
                                                            <Edit className="h-4 w-4 mr-2"/>
                                                            Edit Filters
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={handleSaveReport}
                                                    >
                                                        <Save className="mr-2 h-4 w-4"/>
                                                        Save Report
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleExport('csv')}
                                                    >
                                                        <Download className="mr-2 h-4 w-4"/>
                                                        CSV
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleExport('pdf')}
                                                        disabled
                                                    >
                                                        <FileText className="mr-2 h-4 w-4"/>
                                                        PDF
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Summary Cards */}
                                    <div className="grid gap-4 md:grid-cols-4">
                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
                                                <Clock className="h-4 w-4 text-muted-foreground"/>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">
                                                    {Number(reportData.summary.total_hours || 0).toFixed(2)}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {reportData.summary.entry_count} entries
                                                </p>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
                                                <Calendar className="h-4 w-4 text-muted-foreground"/>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">
                                                    {Number(reportData.summary.billable_hours || 0).toFixed(2)}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {reportData.summary.total_hours > 0
                                                        ? `${((reportData.summary.billable_hours / reportData.summary.total_hours) * 100).toFixed(1)}% of total`
                                                        : '0% of total'}
                                                </p>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Non-Billable</CardTitle>
                                                <Users className="h-4 w-4 text-muted-foreground"/>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">
                                                    {Number(reportData.summary.non_billable_hours || 0).toFixed(2)}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {reportData.summary.total_hours > 0
                                                        ? `${((reportData.summary.non_billable_hours / reportData.summary.total_hours) * 100).toFixed(1)}% of total`
                                                        : '0% of total'}
                                                </p>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                                                <DollarSign className="h-4 w-4 text-muted-foreground"/>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">
                                                    £{Number(reportData.summary.total_amount || 0).toFixed(2)}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Billable revenue
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Data Table */}
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle>Time Entries</CardTitle>
                                                    <CardDescription>
                                                        Showing {getFilteredEntries().length} entries
                                                    </CardDescription>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Select value={showHours} onValueChange={(value: any) => setShowHours(value)}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="all">All Hours</SelectItem>
                                                            <SelectItem value="billable">Billable Only</SelectItem>
                                                            <SelectItem value="non-billable">Non-Billable Only</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <Select value={groupBy} onValueChange={(value: any) => setGroupBy(value)}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="none">No Grouping</SelectItem>
                                                            <SelectItem value="date">Group by Date</SelectItem>
                                                            <SelectItem value="service">Group by Service</SelectItem>
                                                            <SelectItem value="user">Group by Team Member</SelectItem>
                                                            <SelectItem value="task">Group by Task</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="rounded-md border">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            {groupBy !== 'none' && <TableHead className="w-[50px]"></TableHead>}
                                                            <TableHead>Date</TableHead>
                                                            <TableHead>User</TableHead>
                                                            <TableHead>Customer / Service</TableHead>
                                                            <TableHead>Task / Notes</TableHead>
                                                            <TableHead className="text-right">Hours</TableHead>
                                                            <TableHead className="text-right">Rate</TableHead>
                                                            <TableHead className="text-right">Amount</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {getFilteredEntries().length === 0 && (
                                                            <TableRow>
                                                                <TableCell colSpan={groupBy !== 'none' ? 8 : 7} className="text-center">
                                                                    No entries found
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                        {groupBy === 'none' ? (
                                                            // Flat list - no grouping
                                                            getFilteredEntries().map((entry) => (
                                                                <TableRow key={entry.id}>
                                                                    <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                                                                    <TableCell>{entry.user.name}</TableCell>
                                                                    <TableCell>
                                                                        <div className="flex flex-col">
                                                                            <span className="font-medium">{entry.customer.name}</span>
                                                                            <span className="text-sm text-muted-foreground">{entry.service.name}</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <div className="flex flex-col max-w-xs">
                                                                            <span className="font-medium">{entry.task?.name || '-'}</span>
                                                                            <span className="text-sm text-muted-foreground truncate">{entry.description || '-'}</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell className="text-right">{Number(entry.duration_hours || 0).toFixed(2)}</TableCell>
                                                                    <TableCell className="text-right">£{Number(entry.hourly_rate || 0).toFixed(2)}</TableCell>
                                                                    <TableCell className="text-right">
                                                                        £{Number((entry.duration_hours * entry.hourly_rate) || 0).toFixed(2)}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        ) : (
                                                            // Grouped display
                                                            getGroupedEntries().map((group) => {
                                                                const isExpanded = expandedGroups.has(group.key);
                                                                const groupTotal = group.entries.reduce((sum, e) => sum + e.duration_hours, 0);
                                                                const groupAmount = group.entries.reduce((sum, e) => sum + (e.duration_hours * e.hourly_rate), 0);

                                                                return (
                                                                    <>
                                                                        {/* Group Header Row */}
                                                                        <TableRow
                                                                            key={`group-${group.key}`}
                                                                            className="bg-muted/50 hover:bg-muted cursor-pointer font-semibold"
                                                                            onClick={() => toggleGroup(group.key)}
                                                                        >
                                                                            <TableCell>
                                                                                {isExpanded ? (
                                                                                    <ChevronDown className="h-4 w-4" />
                                                                                ) : (
                                                                                    <ChevronRight className="h-4 w-4" />
                                                                                )}
                                                                            </TableCell>
                                                                            <TableCell colSpan={3}>
                                                                                {group.label}
                                                                            </TableCell>
                                                                            <TableCell className="text-right text-muted-foreground text-sm">
                                                                                {group.entries.length} {group.entries.length === 1 ? 'entry' : 'entries'}
                                                                            </TableCell>
                                                                            <TableCell className="text-right">
                                                                                {groupTotal.toFixed(2)} hrs
                                                                            </TableCell>
                                                                            <TableCell className="text-right"></TableCell>
                                                                            <TableCell className="text-right">
                                                                                £{groupAmount.toFixed(2)}
                                                                            </TableCell>
                                                                        </TableRow>

                                                                        {/* Group Entries - shown when expanded */}
                                                                        {isExpanded && group.entries.map((entry) => (
                                                                            <TableRow key={entry.id}>
                                                                                <TableCell></TableCell>
                                                                                <TableCell className="pl-8">{new Date(entry.date).toLocaleDateString()}</TableCell>
                                                                                <TableCell>{entry.user.name}</TableCell>
                                                                                <TableCell>
                                                                                    <div className="flex flex-col">
                                                                                        <span className="font-medium">{entry.customer.name}</span>
                                                                                        <span className="text-sm text-muted-foreground">{entry.service.name}</span>
                                                                                    </div>
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <div className="flex flex-col max-w-xs">
                                                                                        <span className="font-medium">{entry.task?.name || '-'}</span>
                                                                                        <span className="text-sm text-muted-foreground truncate">{entry.description || '-'}</span>
                                                                                    </div>
                                                                                </TableCell>
                                                                                <TableCell className="text-right">{Number(entry.duration_hours || 0).toFixed(2)}</TableCell>
                                                                                <TableCell className="text-right">£{Number(entry.hourly_rate || 0).toFixed(2)}</TableCell>
                                                                                <TableCell className="text-right">
                                                                                    £{Number((entry.duration_hours * entry.hourly_rate) || 0).toFixed(2)}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </>
                                                                );
                                                            })
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Save Report Dialog */}
                <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Save Report Configuration</DialogTitle>
                            <DialogDescription>
                                Save this report configuration for quick access later. You can also make it
                                public for your team.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="report-name">Name</Label>
                                <Input
                                    id="report-name"
                                    value={saveReportForm.data.name}
                                    onChange={(e) => saveReportForm.setData('name', e.target.value)}
                                    placeholder="e.g., Monthly Billable Hours"
                                />
                                {saveReportForm.errors.name && (
                                    <p className="text-sm text-destructive">{saveReportForm.errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="report-description">Description</Label>
                                <Textarea
                                    id="report-description"
                                    value={saveReportForm.data.description}
                                    onChange={(e) => saveReportForm.setData('description', e.target.value)}
                                    placeholder="Optional description..."
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="report-public"
                                    checked={saveReportForm.data.is_public}
                                    onCheckedChange={(checked) =>
                                        saveReportForm.setData('is_public', checked as boolean)
                                    }
                                />
                                <label
                                    htmlFor="report-public"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Make this report public for my team
                                </label>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={submitSaveReport} disabled={saveReportForm.processing}>
                                {saveReportForm.processing ? 'Saving...' : 'Save Report'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </SidebarInset>
        </SidebarProvider>
    );
}
