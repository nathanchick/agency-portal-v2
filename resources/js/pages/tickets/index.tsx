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
import {Label as FormLabel} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {TicketCheck, Save, Plus, User, Clock, AlertCircle, UserCircle, Activity, ArrowUpDown, ArrowUp, ArrowDown} from 'lucide-react';
import {useState} from 'react';
import {route} from 'ziggy-js';

interface Customer {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
}

interface Label {
    id: string;
    name: string;
}

interface Message {
    id: string;
    user: User;
    created_at: string;
}

interface Ticket {
    id: string;
    title: string;
    priority: string;
    status: string;
    is_resolved: boolean;
    is_locked: boolean;
    created_at: string;
    updated_at: string;
    user: User;
    customer?: Customer;
    categories: Category[];
    labels: Label[];
    messages: Message[];
    assigned_to?: User;
}

interface TicketStatus {
    id: string;
    name: string;
    slug: string;
    color: string;
}

interface Props {
    tickets: {
        data: Ticket[];
        links?: any[];
    };
    customers: Customer[];
    labels: Label[];
    categories: Category[];
    statuses: TicketStatus[];
    organisationUsers: User[];
    filters: {
        customer_id?: string;
        status?: string;
        label_id?: string;
        category_id?: string;
        assigned_to?: string;
    };
    sort: {
        sort_by: string;
        sort_order: string;
    };
}

export default function TicketsIndex({tickets, customers, labels, categories, statuses, organisationUsers, filters, sort}: Props) {
    const [filterValues, setFilterValues] = useState(filters);
    const [sortBy, setSortBy] = useState(sort.sort_by);
    const [sortOrder, setSortOrder] = useState(sort.sort_order);
    const [isSaveFilterDialogOpen, setIsSaveFilterDialogOpen] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleFilter = () => {
        router.get(route('tickets.index'), {
            ...filterValues,
            sort_by: sortBy,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClearFilters = () => {
        setFilterValues({});
        router.get(route('tickets.index'), {
            sort_by: sortBy,
            sort_order: sortOrder,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSortChange = (field: string) => {
        const newSortBy = field;
        const newSortOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);

        router.get(route('tickets.index'), {
            ...filterValues,
            sort_by: newSortBy,
            sort_order: newSortOrder,
        }, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    const hasActiveFilters = Object.keys(filterValues).length > 0;

    const handleSaveFilter = () => {
        if (!filterName.trim()) return;

        router.post(route('tickets.filters.save'), {
            name: filterName,
            filters: filterValues,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsSaveFilterDialogOpen(false);
                setFilterName('');
            },
        });
    };

    const handlePriorityChange = (ticketId: string, priority: string) => {
        router.patch(route('tickets.update-priority', ticketId), {
            priority
        }, {
            preserveScroll: true,
        });
    };

    const handleStatusChange = (ticketId: string, status: string) => {
        router.patch(route('tickets.update-status', ticketId), {
            status
        }, {
            preserveScroll: true,
        });
    };

    const handleAssignmentChange = (ticketId: string, assignedTo: string) => {
        router.patch(route('tickets.update-assignment', ticketId), {
            assigned_to: assignedTo || null
        }, {
            preserveScroll: true,
        });
    };

    const getLastResponder = (ticket: Ticket) => {
        if (ticket.messages && ticket.messages.length > 0) {
            return ticket.messages[0].user.name;
        }
        return 'Response Needed';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' year' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' month' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' day' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' hour' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' minute' + (Math.floor(interval) > 1 ? 's' : '') + ' ago';
        return 'just now';
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: route('dashboard') },
                    { title: 'Tickets', href: route('tickets.index') }
                ]} />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Head title="Tickets"/>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Tickets</h1>
                            <p className="text-muted-foreground">
                                Manage and track tickets across all customers
                            </p>
                        </div>

                        <Button onClick={() => setShowCreateDialog(true)}>
                            <Plus className="mr-2 h-4 w-4"/>
                            New Ticket
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="rounded-lg border bg-card p-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                            <div className="space-y-2">
                                <FormLabel htmlFor="customer_id">Customer</FormLabel>
                                <Select
                                    value={filterValues.customer_id || ''}
                                    onValueChange={(value) =>
                                        setFilterValues({...filterValues, customer_id: value})
                                    }
                                >
                                    <SelectTrigger id="customer_id">
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
                            </div>

                            <div className="space-y-2">
                                <FormLabel htmlFor="status">Status</FormLabel>
                                <Select
                                    value={filterValues.status || ''}
                                    onValueChange={(value) =>
                                        setFilterValues({...filterValues, status: value})
                                    }
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="All Statuses"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((status) => (
                                            <SelectItem key={status.id} value={status.slug}>
                                                {status.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <FormLabel htmlFor="assigned_to">Assigned To</FormLabel>
                                <Select
                                    value={filterValues.assigned_to || ''}
                                    onValueChange={(value) =>
                                        setFilterValues({...filterValues, assigned_to: value})
                                    }
                                >
                                    <SelectTrigger id="assigned_to">
                                        <SelectValue placeholder="All Users"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unassigned">Unassigned</SelectItem>
                                        {organisationUsers.map((user) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <FormLabel htmlFor="label_id">Label</FormLabel>
                                <Select
                                    value={filterValues.label_id || ''}
                                    onValueChange={(value) =>
                                        setFilterValues({...filterValues, label_id: value})
                                    }
                                >
                                    <SelectTrigger id="label_id">
                                        <SelectValue placeholder="All Labels"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {labels.map((label) => (
                                            <SelectItem key={label.id} value={label.id}>
                                                {label.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <FormLabel htmlFor="category_id">Category</FormLabel>
                                <Select
                                    value={filterValues.category_id || ''}
                                    onValueChange={(value) =>
                                        setFilterValues({...filterValues, category_id: value})
                                    }
                                >
                                    <SelectTrigger id="category_id">
                                        <SelectValue placeholder="All Categories"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Button onClick={handleFilter}>Apply Filters</Button>
                            <Button variant="outline" onClick={handleClearFilters}>
                                Reset Filters
                            </Button>
                            {hasActiveFilters && (
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsSaveFilterDialogOpen(true)}
                                >
                                    <Save className="mr-2 h-4 w-4"/>
                                    Save Filter
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Sort Controls */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Sort by:</span>
                        <Button
                            variant={sortBy === 'created_at' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => handleSortChange('created_at')}
                            className="h-8"
                        >
                            Date Created
                            {sortBy === 'created_at' && (
                                sortOrder === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
                            )}
                        </Button>
                        <Button
                            variant={sortBy === 'updated_at' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => handleSortChange('updated_at')}
                            className="h-8"
                        >
                            Last Modified
                            {sortBy === 'updated_at' && (
                                sortOrder === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
                            )}
                        </Button>
                        <Button
                            variant={sortBy === 'priority' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => handleSortChange('priority')}
                            className="h-8"
                        >
                            Priority
                            {sortBy === 'priority' && (
                                sortOrder === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
                            )}
                        </Button>
                        <Button
                            variant={sortBy === 'status' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => handleSortChange('status')}
                            className="h-8"
                        >
                            Status
                            {sortBy === 'status' && (
                                sortOrder === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
                            )}
                        </Button>
                    </div>

                    {/* Tickets List */}
                    <div className="space-y-2">
                        {tickets.data.length === 0 ? (
                            <div className="rounded-lg border bg-card p-12">
                                <div className="flex flex-col items-center justify-center">
                                    <TicketCheck className="h-12 w-12 text-muted-foreground mb-4"/>
                                    <p className="text-lg font-medium text-muted-foreground">
                                        No tickets found.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            tickets.data.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="rounded-lg border bg-card p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                                    onClick={() => router.get(route('tickets.show', ticket.id))}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Left: Ticket Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-medium text-base truncate">
                                                    {ticket.title}
                                                </h3>
                                                {ticket.categories.length > 0 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        {ticket.categories[0].name}
                                                    </Badge>
                                                )}
                                                {ticket.is_locked && (
                                                    <Badge variant="outline" className="text-xs">
                                                        Locked
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-3 w-3" />
                                                    <span>{ticket.user.name}</span>
                                                    {ticket.customer && (
                                                        <span className="text-xs">({ticket.customer.name})</span>
                                                    )}
                                                </div>
                                                <span>•</span>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {ticket.messages.length > 0 ? (
                                                        <span>Last response: {getTimeAgo(ticket.messages[0].created_at)}</span>
                                                    ) : (
                                                        <span className="italic">Response needed</span>
                                                    )}
                                                </div>
                                                <span>•</span>
                                                <span>Updated {getTimeAgo(ticket.updated_at)}</span>
                                                {ticket.labels.length > 0 && (
                                                    <>
                                                        <span>•</span>
                                                        <div className="flex gap-1">
                                                            {ticket.labels.map((label) => (
                                                                <Badge key={label.id} variant="outline" className="text-xs">
                                                                    {label.name}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right: Controls */}
                                        <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center gap-1.5">
                                                <AlertCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                                                <Select
                                                    value={ticket.priority}
                                                    onValueChange={(value) => handlePriorityChange(ticket.id, value)}
                                                >
                                                    <SelectTrigger className="w-[110px] h-9">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="low">Low</SelectItem>
                                                        <SelectItem value="medium">Medium</SelectItem>
                                                        <SelectItem value="high">High</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <UserCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                                                <Select
                                                    value={ticket.assigned_to?.id || 'unassigned'}
                                                    onValueChange={(value) => handleAssignmentChange(ticket.id, value === 'unassigned' ? '' : value)}
                                                >
                                                    <SelectTrigger className="w-[150px] h-9">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="unassigned">Unassigned</SelectItem>
                                                        {organisationUsers.map((user) => (
                                                            <SelectItem key={user.id} value={user.id}>
                                                                {user.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <Activity className="h-4 w-4 text-muted-foreground shrink-0" />
                                                <Select
                                                    value={ticket.status}
                                                    onValueChange={(value) => handleStatusChange(ticket.id, value)}
                                                >
                                                    <SelectTrigger className="w-[110px] h-9">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statuses.map((status) => (
                                                            <SelectItem key={status.id} value={status.slug}>
                                                                {status.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {tickets.links && tickets.links.length > 3 && (
                        <div className="flex items-center justify-center gap-2">
                            {tickets.links.map((link: any, index: number) => (
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

            {/* Save Filter Dialog */}
            <Dialog open={isSaveFilterDialogOpen} onOpenChange={setIsSaveFilterDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Save Filter</DialogTitle>
                        <DialogDescription>
                            Save this filter configuration for quick access from the menu
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <FormLabel htmlFor="filter-name">Filter Name</FormLabel>
                            <Input
                                id="filter-name"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                                placeholder="e.g., High Priority Issues"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSaveFilter();
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsSaveFilterDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSaveFilter} disabled={!filterName.trim()}>
                            Save Filter
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Create Ticket Dialog */}
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create Ticket</DialogTitle>
                        <DialogDescription>
                            Select a customer and category to continue
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <FormLabel htmlFor="dialog-customer">Customer *</FormLabel>
                            <Select
                                value={selectedCustomer}
                                onValueChange={setSelectedCustomer}
                            >
                                <SelectTrigger id="dialog-customer">
                                    <SelectValue placeholder="Select customer"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {customers.map((customer) => (
                                        <SelectItem key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <FormLabel htmlFor="dialog-category">Category *</FormLabel>
                            <Select
                                value={selectedCategory}
                                onValueChange={setSelectedCategory}
                            >
                                <SelectTrigger id="dialog-category">
                                    <SelectValue placeholder="Select category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button
                                onClick={() => {
                                    if (selectedCustomer && selectedCategory) {
                                        router.get(route('tickets.create', {
                                            customer_id: selectedCustomer,
                                            category_id: selectedCategory
                                        }));
                                    }
                                }}
                                disabled={!selectedCustomer || !selectedCategory}
                                className="flex-1"
                            >
                                Next
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowCreateDialog(false);
                                    setSelectedCustomer('');
                                    setSelectedCategory('');
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
}
