import {AppSidebar} from '@/components/app-sidebar';
import {Head, router} from '@inertiajs/react';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
import {Badge} from '@/components/ui/badge';
import {MoreHorizontal, Plus, FileText} from 'lucide-react';
import {useState} from 'react';
import {route} from 'ziggy-js';

interface TicketForm {
    id: string;
    name: string;
    is_default: boolean;
    created_at: string;
}

interface Props {
    forms: TicketForm[];
}

export default function TicketFormsIndex({forms}: Props) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [formToDelete, setFormToDelete] = useState<TicketForm | null>(null);

    const handleCreate = () => {
        router.get(route('tickets.forms.create'));
    };

    const handleEdit = (id: string) => {
        router.get(route('tickets.forms.edit', id));
    };

    const handleDeleteClick = (form: TicketForm) => {
        setFormToDelete(form);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (formToDelete) {
            router.delete(route('tickets.forms.destroy', formToDelete.id), {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setFormToDelete(null);
                },
            });
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Ticket Forms"/>
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
                                    <BreadcrumbPage>Forms</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">Ticket Forms</h2>
                                <p className="text-muted-foreground">
                                    Create custom forms to collect different information for ticket categories
                                </p>
                            </div>

                            <Button onClick={handleCreate}>
                                <Plus className="mr-2 h-4 w-4"/>
                                New Ticket Form
                            </Button>
                        </div>

                        {/* Table */}
                        <div className="rounded-lg border bg-card">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="w-[70px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {forms.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <FileText className="h-8 w-8 text-muted-foreground mb-2"/>
                                                    <p className="text-sm text-muted-foreground">
                                                        No ticket forms found. Create your first form to get started.
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        forms.map((form) => (
                                            <TableRow key={form.id}>
                                                <TableCell className="font-medium">
                                                    {form.name}
                                                    {form.is_default && (
                                                        <Badge variant="outline" className="ml-2">Default</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="default">Form Builder</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(form.created_at).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4"/>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleEdit(form.id)}>
                                                                Edit
                                                            </DropdownMenuItem>
                                                            {!form.is_default && (
                                                                <DropdownMenuItem
                                                                    onClick={() => handleDeleteClick(form)}
                                                                    className="text-destructive"
                                                                >
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            )}
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
                </div>
            </SidebarInset>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Ticket Form</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{formToDelete?.name}"? This action cannot be undone and will unassign this form from any categories using it.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
}
