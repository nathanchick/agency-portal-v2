import {Head, Link, router} from '@inertiajs/react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {MoreHorizontal, Plus, Search} from 'lucide-react';
import {useState} from 'react';
import AppLayout from '@/layouts/app-layout';
import ApiWebhooksLayout from '@/layouts/api-webhooks/layout';
import HeadingSmall from '@/components/heading-small';
import {type BreadcrumbItem} from '@/types';
import {route} from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'API & Webhooks',
        href: route('webhooks.index'),
    },
];

interface Webhook {
    id: string;
    name: string;
    url: string;
    model: string;
    events: string[];
    active: boolean;
    created_at: string;
}

interface Props {
    webhooks: {
        data: Webhook[];
        links: any[];
        meta: any;
    };
    filters: {
        status?: string;
        search?: string;
    };
}

export default function WebhooksIndex({webhooks, filters}: Props) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [webhookToDelete, setWebhookToDelete] = useState<string | null>(null);
    const [search, setSearch] = useState(filters.search || '');

    const handleDelete = () => {
        if (webhookToDelete) {
            router.delete(`/webhooks/${webhookToDelete}`, {
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setWebhookToDelete(null);
                },
            });
        }
    };

    const handleToggle = (webhookId: string) => {
        router.post(`/webhooks/${webhookId}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleRegenerateSecret = (webhookId: string) => {
        if (confirm('Are you sure you want to regenerate the secret? This will invalidate the current secret.')) {
            router.post(`/webhooks/${webhookId}/regenerate-secret`, {}, {
                preserveScroll: true,
            });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/webhooks', {search}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Webhooks"/>

            <ApiWebhooksLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <HeadingSmall
                            title="Webhook Manager"
                            description="Manage webhooks for your organisation"
                        />
                        <Link href="/webhooks/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4"/>
                                Create Webhook
                            </Button>
                        </Link>
                    </div>

                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input
                                placeholder="Search webhooks..."
                                className="pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </form>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>URL</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Events</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {webhooks.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No webhooks found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    webhooks.data.map((webhook) => (
                                        <TableRow key={webhook.id}>
                                            <TableCell className="font-medium">{webhook.name}</TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {webhook.url}
                                            </TableCell>
                                            <TableCell>{webhook.model}</TableCell>
                                            <TableCell>
                                                <div className=" gap-1">
                                                    {webhook.events.map((event) => (
                                                        <Badge key={event} variant="outline" className="block">
                                                            {event}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={webhook.active ? 'default' : 'secondary'}
                                                >
                                                    {webhook.active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4"/>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                router.get(`/webhooks/${webhook.id}/edit`)
                                                            }
                                                        >
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleToggle(webhook.id)}
                                                        >
                                                            {webhook.active ? 'Deactivate' : 'Activate'}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleRegenerateSecret(webhook.id)
                                                            }
                                                        >
                                                            Regenerate Secret
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator/>
                                                        <DropdownMenuItem
                                                            className="text-destructive"
                                                            onClick={() => {
                                                                setWebhookToDelete(webhook.id);
                                                                setShowDeleteDialog(true);
                                                            }}
                                                        >
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </ApiWebhooksLayout>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Webhook</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this webhook? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}