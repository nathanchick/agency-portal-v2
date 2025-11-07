import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {Head, router} from '@inertiajs/react';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {ArrowLeft} from 'lucide-react';
import {route} from 'ziggy-js';

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
}

interface Props {
    ticket: Ticket;
}

export default function CustomerShowTicket({ticket}: Props) {
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
        return (
            <Badge variant="outline">
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title={`Ticket: ${ticket.title}`}/>
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: route('dashboard') },
                    { title: 'Tickets', href: route('customer.tickets.view') },
                    { title: ticket.title, href: route('customer.tickets.show', ticket.id) }
                ]} />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.get(route('customer.tickets.view'))}
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
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Customer</p>
                                        <p className="text-sm">{ticket.customer.name}</p>
                                    </div>

                                    <Separator/>

                                    {/* Category */}
                                    {ticket.categories.length > 0 && (
                                        <>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Category</p>
                                                <div className="flex gap-1 mt-1">
                                                    {ticket.categories.map((category) => (
                                                        <Badge key={category.id} variant="secondary">
                                                            {category.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <Separator/>
                                        </>
                                    )}

                                    {/* Labels */}
                                    {ticket.labels.length > 0 && (
                                        <>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Labels</p>
                                                <div className="flex gap-1 flex-wrap mt-1">
                                                    {ticket.labels.map((label) => (
                                                        <Badge key={label.id} variant="outline">
                                                            {label.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <Separator/>
                                        </>
                                    )}

                                    {/* Status */}
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                                        <div className="mt-1">
                                            {getStatusBadge(ticket.status)}
                                        </div>
                                    </div>

                                    <Separator/>

                                    {/* Priority */}
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">Priority</p>
                                        <div className="mt-1">
                                            {getPriorityBadge(ticket.priority)}
                                        </div>
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
