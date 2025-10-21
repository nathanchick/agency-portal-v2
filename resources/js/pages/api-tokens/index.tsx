import {Head, Link, router} from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import ApiWebhooksLayout from '@/layouts/api-webhooks/layout';
import HeadingSmall from '@/components/heading-small';
import {type BreadcrumbItem, type Pagination} from '@/types';
import {route} from 'ziggy-js';
import {Copy, Eye, MoreVertical, Pencil, Plus, Search, Trash2} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'API & Webhooks',
        href: route('webhooks.index'),
    },
];

interface ApiToken {
    id: string;
    name: string;
    abilities: string[];
    last_used_at: string | null;
    expires_at: string | null;
    created_at: string;
    creator: {
        name: string;
        email: string;
    } | null;
}

interface Props {
    tokens: Pagination<ApiToken>;
    filters: {
        search?: string;
    };
}

export default function ApiTokensIndex({tokens, filters}: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('api-tokens.index'), {search}, {preserveState: true});
    };

    const handleDelete = () => {
        if (!deleteId) return;
        router.delete(route('api-tokens.destroy', deleteId), {
            preserveScroll: true,
            onSuccess: () => setDeleteId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="API Tokens"/>

            <ApiWebhooksLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <HeadingSmall
                            title="API Tokens"
                            description="Manage API tokens for external system integrations"
                        />
                        <Button asChild>
                            <Link href={route('api-tokens.create')}>
                                <Plus className="mr-2 h-4 w-4"/>
                                Create Token
                            </Link>
                        </Button>
                    </div>

                    <form onSubmit={handleSearch} className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input
                                type="search"
                                placeholder="Search tokens..."
                                className="pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button type="submit">Search</Button>
                    </form>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Abilities</TableHead>
                                    <TableHead>Last Used</TableHead>
                                    <TableHead>Expires</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tokens.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No API tokens found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tokens.data.map((token) => (
                                        <TableRow key={token.id}>
                                            <TableCell className="font-medium">
                                                {token.name}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {token.abilities && token.abilities.length > 0 ? (
                                                        token.abilities.slice(0, 3).map((ability) => (
                                                            <Badge key={ability} variant="outline" className="text-xs">
                                                                {ability}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">No abilities</span>
                                                    )}
                                                    {token.abilities && token.abilities.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{token.abilities.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {token.last_used_at
                                                    ? new Date(token.last_used_at).toLocaleDateString()
                                                    : 'Never'}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {token.expires_at
                                                    ? new Date(token.expires_at).toLocaleDateString()
                                                    : 'Never'}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(token.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreVertical className="h-4 w-4"/>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('api-tokens.show', token.id)}>
                                                                <Eye className="mr-2 h-4 w-4"/>
                                                                View
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={route('api-tokens.edit', token.id)}>
                                                                <Pencil className="mr-2 h-4 w-4"/>
                                                                Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => setDeleteId(token.id)}
                                                            className="text-destructive"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4"/>
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

            <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete API Token</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this API token? This action cannot be undone and any
                            external systems using this token will no longer be able to authenticate.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteId(null)}>
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