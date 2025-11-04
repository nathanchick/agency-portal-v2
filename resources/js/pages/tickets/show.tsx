import {AppSidebar} from '@/components/app-sidebar';
import {Head, router, useForm} from '@inertiajs/react';
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
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Label as FormLabel} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {ArrowLeft, X} from 'lucide-react';
import {route} from 'ziggy-js';
import {FormEvent, useState} from 'react';

interface User {
    id: string;
    name: string;
}

interface Customer {
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

interface TicketStatus {
    id: string;
    name: string;
    slug: string;
    color: string;
}

interface Message {
    id: string;
    user: User;
    message: string;
    created_at: string;
}

interface Ticket {
    id: string;
    title: string;
    message: string;
    priority: string;
    status: string;
    is_resolved: boolean;
    is_locked: boolean;
    created_at: string;
    updated_at: string;
    metadata: any;
    user: User;
    customer: Customer;
    categories: Category[];
    labels: Label[];
    messages: Message[];
    assigned_to?: User;
}

interface Props {
    ticket: Ticket;
    organisationUsers: User[];
    categories: Category[];
    labels: Label[];
    statuses: TicketStatus[];
}

export default function ShowTicket({ticket, organisationUsers, categories, labels, statuses}: Props) {
    const [selectedLabels, setSelectedLabels] = useState<string[]>(ticket.labels.map(l => l.id));
    const [availableLabel, setAvailableLabel] = useState('');

    const {data, setData, post, processing, reset} = useForm({
        message: '',
        is_private: false,
        set_status: '',
    });

    const handleAssignmentChange = (assignedTo: string) => {
        router.patch(route('tickets.update-assignment', ticket.id), {
            assigned_to: assignedTo || null
        }, {
            preserveScroll: true,
        });
    };

    const handleStatusChange = (status: string) => {
        router.patch(route('tickets.update-status', ticket.id), {
            status
        }, {
            preserveScroll: true,
        });
    };

    const handleCategoryChange = (categoryId: string) => {
        router.patch(route('tickets.update-category', ticket.id), {
            category_id: categoryId
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleAddLabel = () => {
        if (!availableLabel) return;
        router.post(route('tickets.add-label', ticket.id), {
            label_id: availableLabel
        }, {
            preserveScroll: true,
            onSuccess: () => setAvailableLabel(''),
        });
    };

    const handleRemoveLabel = (labelId: string) => {
        router.delete(route('tickets.remove-label', {ticket: ticket.id, label: labelId}), {
            preserveScroll: true,
        });
    };

    const handleSubmitMessage = (e: FormEvent, setStatus = false) => {
        e.preventDefault();
        post(route('tickets.add-message', ticket.id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    const getPriorityBadge = (priority: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
            high: 'destructive',
            medium: 'default',
            low: 'secondary',
        };

        return (
            <Badge variant={variants[priority] || 'secondary'}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
        );
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
            open: 'default',
            closed: 'secondary',
            pending: 'default',
        };

        return (
            <Badge variant={variants[status] || 'secondary'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const isClosed = ticket.status === 'closed';

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title={`Ticket: ${ticket.title}`}/>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={route('dashboard')}>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={route('tickets.index')}>
                                        Tickets
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{ticket.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.get(route('tickets.index'))}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2"/>
                            Back to Tickets
                        </Button>
                    </div>

                    {/* 2-Column Layout */}
                    <div className="grid gap-4 lg:grid-cols-3">
                        {/* Main Column - 2/3 width */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Ticket Header */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-2xl">{ticket.title}</CardTitle>
                                            <CardDescription>
                                                Created by {ticket.user.name} on {formatDate(ticket.created_at)}
                                            </CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            {getPriorityBadge(ticket.priority)}
                                            {getStatusBadge(ticket.status)}
                                            {ticket.is_locked && (
                                                <Badge variant="outline">Locked</Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">Original Message</p>
                                        <div className="rounded-lg bg-muted p-4">
                                            <p className="text-sm whitespace-pre-wrap">{ticket.message}</p>
                                        </div>
                                    </div>

                                    {ticket.metadata && Object.keys(ticket.metadata).length > 0 && (
                                        <>
                                            <Separator className="my-4"/>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-2">Additional Information</p>
                                                <div className="grid gap-2">
                                                    {Object.entries(ticket.metadata).map(([key, value]) => (
                                                        <div key={key} className="grid grid-cols-3 gap-4 text-sm">
                                                            <span className="font-medium text-muted-foreground">{key}:</span>
                                                            <span className="col-span-2">{String(value)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Responses */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Responses ({ticket.messages.length})</CardTitle>
                                    <CardDescription>
                                        Conversation history for this ticket
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {ticket.messages.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <p>No responses yet</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {ticket.messages.map((message) => (
                                                <div key={message.id} className="border rounded-lg p-4">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="font-medium text-sm">{message.user.name}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {formatDate(message.created_at)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Message Response Area - Only show if not closed */}
                            {!isClosed && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Add Response</CardTitle>
                                        <CardDescription>
                                            Send a message to respond to this ticket
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmitMessage} className="space-y-4">
                                            <div>
                                                <Textarea
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    placeholder="Type your response here..."
                                                    rows={5}
                                                    required
                                                />
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="is_private"
                                                    checked={data.is_private}
                                                    onCheckedChange={(checked) => setData('is_private', checked as boolean)}
                                                />
                                                <FormLabel htmlFor="is_private" className="cursor-pointer text-sm font-normal">
                                                    Private message (only visible to organisation users)
                                                </FormLabel>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button type="submit" disabled={processing}>
                                                    Send
                                                </Button>
                                                <Select
                                                    value={data.set_status}
                                                    onValueChange={(value) => setData('set_status', value)}
                                                >
                                                    <SelectTrigger className="w-[200px]">
                                                        <SelectValue placeholder="Send & Set Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statuses.map((status) => (
                                                            <SelectItem key={status.id} value={status.slug}>
                                                                Set to {status.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {data.set_status && (
                                                    <Button
                                                        type="submit"
                                                        variant="secondary"
                                                        disabled={processing}
                                                    >
                                                        Send & Set Status
                                                    </Button>
                                                )}
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar - 1/3 width */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ticket Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Customer */}
                                    <div>
                                        <FormLabel>Customer</FormLabel>
                                        <p className="text-sm mt-1">{ticket.customer.name}</p>
                                    </div>

                                    <Separator/>

                                    {/* Category */}
                                    <div>
                                        <FormLabel htmlFor="category">Category</FormLabel>
                                        <Select
                                            value={ticket.categories[0]?.id || ''}
                                            onValueChange={handleCategoryChange}
                                        >
                                            <SelectTrigger id="category" className="mt-1">
                                                <SelectValue placeholder="Select category" />
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

                                    <Separator/>

                                    {/* Labels */}
                                    <div>
                                        <FormLabel>Labels</FormLabel>
                                        <div className="flex gap-1 flex-wrap mt-2 mb-2">
                                            {ticket.labels.map((label) => (
                                                <Badge key={label.id} variant="outline" className="text-xs">
                                                    {label.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveLabel(label.id)}
                                                        className="ml-1 hover:text-destructive"
                                                    >
                                                        <X className="h-3 w-3"/>
                                                    </button>
                                                </Badge>
                                            ))}
                                            {ticket.labels.length === 0 && (
                                                <p className="text-sm text-muted-foreground">No labels</p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Select
                                                value={availableLabel}
                                                onValueChange={setAvailableLabel}
                                            >
                                                <SelectTrigger className="flex-1">
                                                    <SelectValue placeholder="Add label" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {labels.filter(l => !ticket.labels.find(tl => tl.id === l.id)).map((label) => (
                                                        <SelectItem key={label.id} value={label.id}>
                                                            {label.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={handleAddLabel}
                                                disabled={!availableLabel}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </div>

                                    <Separator/>

                                    {/* Status */}
                                    <div>
                                        <FormLabel htmlFor="status">Status</FormLabel>
                                        <Select
                                            value={ticket.status}
                                            onValueChange={handleStatusChange}
                                        >
                                            <SelectTrigger id="status" className="mt-1">
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

                                    <Separator/>

                                    {/* Assigned User */}
                                    <div>
                                        <FormLabel htmlFor="assigned-to">Assigned To</FormLabel>
                                        <Select
                                            value={ticket.assigned_to?.id || 'unassigned'}
                                            onValueChange={(value) => handleAssignmentChange(value === 'unassigned' ? '' : value)}
                                        >
                                            <SelectTrigger id="assigned-to" className="mt-1">
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
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
