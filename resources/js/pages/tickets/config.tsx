import {Head, router, useForm} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label as FormLabel} from '@/components/ui/label';
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
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Switch} from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {MoreHorizontal, Plus, Tag, FolderTree, Activity} from 'lucide-react';
import {useState} from 'react';
import {route} from 'ziggy-js';

interface Label {
    id: string;
    name: string;
    slug: string;
    is_visible: boolean;
    created_at: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    is_visible: boolean;
    created_at: string;
    form?: {
        id: string;
        name: string;
    };
}

interface TicketForm {
    id: string;
    name: string;
}

interface TicketStatus {
    id: string;
    name: string;
    slug: string;
    color: string;
    is_default: boolean;
    is_closed: boolean;
    is_visible: boolean;
    order: number;
    created_at: string;
}

interface Props {
    labels: Label[];
    categories: Category[];
    statuses: TicketStatus[];
    forms: TicketForm[];
}

export default function TicketsConfig({labels, categories, statuses, forms}: Props) {
    const [isCreateLabelDialogOpen, setIsCreateLabelDialogOpen] = useState(false);
    const [isEditLabelDialogOpen, setIsEditLabelDialogOpen] = useState(false);
    const [isDeleteLabelDialogOpen, setIsDeleteLabelDialogOpen] = useState(false);
    const [isCreateCategoryDialogOpen, setIsCreateCategoryDialogOpen] = useState(false);
    const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false);
    const [isDeleteCategoryDialogOpen, setIsDeleteCategoryDialogOpen] = useState(false);
    const [isCreateStatusDialogOpen, setIsCreateStatusDialogOpen] = useState(false);
    const [isEditStatusDialogOpen, setIsEditStatusDialogOpen] = useState(false);
    const [isDeleteStatusDialogOpen, setIsDeleteStatusDialogOpen] = useState(false);
    const [editingLabel, setEditingLabel] = useState<Label | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingStatus, setEditingStatus] = useState<TicketStatus | null>(null);
    const [deletingLabel, setDeletingLabel] = useState<Label | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
    const [deletingStatus, setDeletingStatus] = useState<TicketStatus | null>(null);

    const {data: labelData, setData: setLabelData, post: postLabel, put: putLabel, processing: labelProcessing, reset: resetLabel} = useForm({
        name: '',
        is_visible: true,
    });

    const {data: categoryData, setData: setCategoryData, post: postCategory, put: putCategory, processing: categoryProcessing, reset: resetCategory} = useForm({
        name: '',
        form_id: '',
        is_visible: true,
    });

    const {data: statusData, setData: setStatusData, post: postStatus, put: putStatus, processing: statusProcessing, reset: resetStatus} = useForm({
        name: '',
        color: '#808080',
        is_default: false,
        is_closed: false,
        is_visible: true,
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const handleCreateLabel = (e: React.FormEvent) => {
        e.preventDefault();
        postLabel(route('tickets.labels.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateLabelDialogOpen(false);
                resetLabel();
            },
        });
    };

    const handleEditLabel = (label: Label) => {
        setEditingLabel(label);
        setLabelData({
            name: label.name,
            is_visible: label.is_visible,
        });
        setIsEditLabelDialogOpen(true);
    };

    const handleUpdateLabel = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingLabel) return;

        putLabel(route('tickets.labels.update', editingLabel.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditLabelDialogOpen(false);
                setEditingLabel(null);
                resetLabel();
            },
        });
    };

    const handleDeleteLabel = (label: Label) => {
        setDeletingLabel(label);
        setIsDeleteLabelDialogOpen(true);
    };

    const confirmDeleteLabel = () => {
        if (!deletingLabel) return;

        router.delete(route('tickets.labels.destroy', deletingLabel.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteLabelDialogOpen(false);
                setDeletingLabel(null);
            },
        });
    };

    const handleCreateCategory = (e: React.FormEvent) => {
        e.preventDefault();
        postCategory(route('tickets.categories.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateCategoryDialogOpen(false);
                resetCategory();
            },
        });
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setCategoryData({
            name: category.name,
            form_id: category.form?.id || '',
            is_visible: category.is_visible,
        });
        setIsEditCategoryDialogOpen(true);
    };

    const handleUpdateCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;

        putCategory(route('tickets.categories.update', editingCategory.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditCategoryDialogOpen(false);
                setEditingCategory(null);
                resetCategory();
            },
        });
    };

    const handleDeleteCategory = (category: Category) => {
        setDeletingCategory(category);
        setIsDeleteCategoryDialogOpen(true);
    };

    const confirmDeleteCategory = () => {
        if (!deletingCategory) return;

        router.delete(route('tickets.categories.destroy', deletingCategory.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteCategoryDialogOpen(false);
                setDeletingCategory(null);
            },
        });
    };

    const handleCreateStatus = (e: React.FormEvent) => {
        e.preventDefault();
        postStatus(route('tickets.statuses.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateStatusDialogOpen(false);
                resetStatus();
            },
        });
    };

    const handleEditStatus = (status: TicketStatus) => {
        setEditingStatus(status);
        setStatusData({
            name: status.name,
            color: status.color,
            is_default: status.is_default,
            is_closed: status.is_closed,
            is_visible: status.is_visible,
        });
        setIsEditStatusDialogOpen(true);
    };

    const handleUpdateStatus = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingStatus) return;

        putStatus(route('tickets.statuses.update', editingStatus.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditStatusDialogOpen(false);
                setEditingStatus(null);
                resetStatus();
            },
        });
    };

    const handleDeleteStatus = (status: TicketStatus) => {
        setDeletingStatus(status);
        setIsDeleteStatusDialogOpen(true);
    };

    const confirmDeleteStatus = () => {
        if (!deletingStatus) return;

        router.delete(route('tickets.statuses.destroy', deletingStatus.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteStatusDialogOpen(false);
                setDeletingStatus(null);
            },
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: route('dashboard') },
                    { title: 'Tickets', href: route('tickets.index') },
                    { title: 'Field Configuration', href: route('tickets.config') }
                ]} />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Head title="Ticket Field Configuration"/>

                    <div className="max-w-4xl space-y-8">
                        <h1 className="text-3xl font-bold">Ticket Field Configuration</h1>

                        {/* Labels Section */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Labels</CardTitle>
                                        <CardDescription>
                                            Manage ticket labels for categorizing and tagging tickets
                                        </CardDescription>
                                    </div>
                                    <Button onClick={() => setIsCreateLabelDialogOpen(true)}>
                                        <Plus className="mr-2 h-4 w-4"/>
                                        Add Label
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Slug</TableHead>
                                                <TableHead>Visibility</TableHead>
                                                <TableHead>Created</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {labels.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="h-24 text-center">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <Tag className="h-8 w-8 text-muted-foreground mb-2"/>
                                                            <p className="text-sm text-muted-foreground">
                                                                No labels found. Create your first label to get started.
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                labels.map((label) => (
                                                    <TableRow key={label.id}>
                                                        <TableCell className="font-medium">
                                                            {label.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            <code className="text-xs bg-muted px-2 py-1 rounded">
                                                                {label.slug}
                                                            </code>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant={label.is_visible ? 'default' : 'secondary'}>
                                                                {label.is_visible ? 'Visible' : 'Hidden'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-sm text-muted-foreground">
                                                            {formatDate(label.created_at)}
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
                                                                    <DropdownMenuItem onClick={() => handleEditLabel(label)}>
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        className="text-destructive"
                                                                        onClick={() => handleDeleteLabel(label)}
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
                            </CardContent>
                        </Card>

                        {/* Categories Section */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Categories</CardTitle>
                                        <CardDescription>
                                            Manage ticket categories for organizing tickets by type or department
                                        </CardDescription>
                                    </div>
                                    <Button onClick={() => setIsCreateCategoryDialogOpen(true)}>
                                        <Plus className="mr-2 h-4 w-4"/>
                                        Add Category
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Slug</TableHead>
                                                <TableHead>Form</TableHead>
                                                <TableHead>Visibility</TableHead>
                                                <TableHead>Created</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {categories.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="h-24 text-center">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <FolderTree className="h-8 w-8 text-muted-foreground mb-2"/>
                                                            <p className="text-sm text-muted-foreground">
                                                                No categories found. Create your first category to get started.
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                categories.map((category) => (
                                                    <TableRow key={category.id}>
                                                        <TableCell className="font-medium">
                                                            {category.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            <code className="text-xs bg-muted px-2 py-1 rounded">
                                                                {category.slug}
                                                            </code>
                                                        </TableCell>
                                                        <TableCell>
                                                            {category.form ? (
                                                                <Badge variant="outline">{category.form.name}</Badge>
                                                            ) : (
                                                                <span className="text-sm text-muted-foreground">Default</span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant={category.is_visible ? 'default' : 'secondary'}>
                                                                {category.is_visible ? 'Visible' : 'Hidden'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-sm text-muted-foreground">
                                                            {formatDate(category.created_at)}
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
                                                                    <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        className="text-destructive"
                                                                        onClick={() => handleDeleteCategory(category)}
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
                            </CardContent>
                        </Card>

                        {/* Statuses Section */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Statuses</CardTitle>
                                        <CardDescription>
                                            Manage ticket statuses for tracking ticket progress and state
                                        </CardDescription>
                                    </div>
                                    <Button onClick={() => setIsCreateStatusDialogOpen(true)}>
                                        <Plus className="mr-2 h-4 w-4"/>
                                        Add Status
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Color</TableHead>
                                                <TableHead>Default</TableHead>
                                                <TableHead>Closed State</TableHead>
                                                <TableHead>Visibility</TableHead>
                                                <TableHead>Created</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {statuses.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={7} className="h-24 text-center">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <Activity className="h-8 w-8 text-muted-foreground mb-2"/>
                                                            <p className="text-sm text-muted-foreground">
                                                                No statuses found. Create your first status to get started.
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                statuses.map((status) => (
                                                    <TableRow key={status.id}>
                                                        <TableCell className="font-medium">
                                                            {status.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <div
                                                                    className="w-4 h-4 rounded-full border"
                                                                    style={{backgroundColor: status.color}}
                                                                />
                                                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                                                    {status.color}
                                                                </code>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {status.is_default ? (
                                                                <Badge variant="default">Default</Badge>
                                                            ) : (
                                                                <span className="text-sm text-muted-foreground">-</span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {status.is_closed ? (
                                                                <Badge variant="secondary">Closed</Badge>
                                                            ) : (
                                                                <span className="text-sm text-muted-foreground">Open</span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant={status.is_visible ? 'default' : 'secondary'}>
                                                                {status.is_visible ? 'Visible' : 'Hidden'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-sm text-muted-foreground">
                                                            {formatDate(status.created_at)}
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
                                                                    <DropdownMenuItem onClick={() => handleEditStatus(status)}>
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        className="text-destructive"
                                                                        onClick={() => handleDeleteStatus(status)}
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
                            </CardContent>
                        </Card>
                    </div>

                    {/* Create Label Dialog */}
                    <Dialog open={isCreateLabelDialogOpen} onOpenChange={setIsCreateLabelDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Label</DialogTitle>
                                <DialogDescription>
                                    Add a new label for categorizing tickets
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateLabel}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="label-name">Name</FormLabel>
                                        <Input
                                            id="label-name"
                                            value={labelData.name}
                                            onChange={(e) => setLabelData('name', e.target.value)}
                                            placeholder="e.g., Bug, Feature Request"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="label-visible"
                                            checked={labelData.is_visible}
                                            onCheckedChange={(checked) => setLabelData('is_visible', checked)}
                                        />
                                        <FormLabel htmlFor="label-visible" className="cursor-pointer">
                                            Visible to users
                                        </FormLabel>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsCreateLabelDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={labelProcessing}>
                                        Create Label
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Create Category Dialog */}
                    <Dialog open={isCreateCategoryDialogOpen} onOpenChange={setIsCreateCategoryDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Category</DialogTitle>
                                <DialogDescription>
                                    Add a new category for organizing tickets
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateCategory}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="category-name">Name</FormLabel>
                                        <Input
                                            id="category-name"
                                            value={categoryData.name}
                                            onChange={(e) => setCategoryData('name', e.target.value)}
                                            placeholder="e.g., Technical Support, Billing"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="category-form">Form (Optional)</FormLabel>
                                        <Select
                                            value={categoryData.form_id || undefined}
                                            onValueChange={(value) => setCategoryData('form_id', value)}
                                        >
                                            <SelectTrigger id="category-form">
                                                <SelectValue placeholder="Default Form" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {forms.map((form) => (
                                                    <SelectItem key={form.id} value={form.id}>
                                                        {form.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-sm text-muted-foreground">
                                            Leave empty to use the default ticket form
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="category-visible"
                                            checked={categoryData.is_visible}
                                            onCheckedChange={(checked) => setCategoryData('is_visible', checked)}
                                        />
                                        <FormLabel htmlFor="category-visible" className="cursor-pointer">
                                            Visible to users
                                        </FormLabel>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsCreateCategoryDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={categoryProcessing}>
                                        Create Category
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Label Dialog */}
                    <Dialog open={isEditLabelDialogOpen} onOpenChange={setIsEditLabelDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Label</DialogTitle>
                                <DialogDescription>
                                    Update the label details
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUpdateLabel}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="edit-label-name">Name</FormLabel>
                                        <Input
                                            id="edit-label-name"
                                            value={labelData.name}
                                            onChange={(e) => setLabelData('name', e.target.value)}
                                            placeholder="e.g., Bug, Feature Request"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="edit-label-visible"
                                            checked={labelData.is_visible}
                                            onCheckedChange={(checked) => setLabelData('is_visible', checked)}
                                        />
                                        <FormLabel htmlFor="edit-label-visible" className="cursor-pointer">
                                            Visible to users
                                        </FormLabel>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsEditLabelDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={labelProcessing}>
                                        Update Label
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Category Dialog */}
                    <Dialog open={isEditCategoryDialogOpen} onOpenChange={setIsEditCategoryDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Category</DialogTitle>
                                <DialogDescription>
                                    Update the category details
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUpdateCategory}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="edit-category-name">Name</FormLabel>
                                        <Input
                                            id="edit-category-name"
                                            value={categoryData.name}
                                            onChange={(e) => setCategoryData('name', e.target.value)}
                                            placeholder="e.g., Technical Support, Billing"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="edit-category-form">Form (Optional)</FormLabel>
                                        <Select
                                            value={categoryData.form_id || undefined}
                                            onValueChange={(value) => setCategoryData('form_id', value)}
                                        >
                                            <SelectTrigger id="edit-category-form">
                                                <SelectValue placeholder="Default Form" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {forms.map((form) => (
                                                    <SelectItem key={form.id} value={form.id}>
                                                        {form.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-sm text-muted-foreground">
                                            Leave empty to use the default ticket form
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="edit-category-visible"
                                            checked={categoryData.is_visible}
                                            onCheckedChange={(checked) => setCategoryData('is_visible', checked)}
                                        />
                                        <FormLabel htmlFor="edit-category-visible" className="cursor-pointer">
                                            Visible to users
                                        </FormLabel>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsEditCategoryDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={categoryProcessing}>
                                        Update Category
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Label Confirmation Dialog */}
                    <Dialog open={isDeleteLabelDialogOpen} onOpenChange={setIsDeleteLabelDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Label</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete "{deletingLabel?.name}"? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDeleteLabelDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={confirmDeleteLabel}
                                >
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Category Confirmation Dialog */}
                    <Dialog open={isDeleteCategoryDialogOpen} onOpenChange={setIsDeleteCategoryDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Category</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete "{deletingCategory?.name}"? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDeleteCategoryDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={confirmDeleteCategory}
                                >
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Create Status Dialog */}
                    <Dialog open={isCreateStatusDialogOpen} onOpenChange={setIsCreateStatusDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Status</DialogTitle>
                                <DialogDescription>
                                    Add a new status for tracking ticket progress
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateStatus}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="status-name">Name</FormLabel>
                                        <Input
                                            id="status-name"
                                            value={statusData.name}
                                            onChange={(e) => setStatusData('name', e.target.value)}
                                            placeholder="e.g., In Progress, Waiting"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="status-color">Color (Hex)</FormLabel>
                                        <div className="flex gap-2">
                                            <Input
                                                id="status-color"
                                                type="color"
                                                value={statusData.color}
                                                onChange={(e) => setStatusData('color', e.target.value)}
                                                className="w-20 h-10"
                                            />
                                            <Input
                                                value={statusData.color}
                                                onChange={(e) => setStatusData('color', e.target.value)}
                                                placeholder="#808080"
                                                pattern="^#[0-9A-Fa-f]{6}$"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="status-default"
                                            checked={statusData.is_default}
                                            onCheckedChange={(checked) => setStatusData('is_default', checked)}
                                        />
                                        <FormLabel htmlFor="status-default" className="cursor-pointer">
                                            Set as default status for new tickets
                                        </FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="status-closed"
                                            checked={statusData.is_closed}
                                            onCheckedChange={(checked) => setStatusData('is_closed', checked)}
                                        />
                                        <FormLabel htmlFor="status-closed" className="cursor-pointer">
                                            Mark tickets with this status as closed
                                        </FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="status-visible"
                                            checked={statusData.is_visible}
                                            onCheckedChange={(checked) => setStatusData('is_visible', checked)}
                                        />
                                        <FormLabel htmlFor="status-visible" className="cursor-pointer">
                                            Visible to users
                                        </FormLabel>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsCreateStatusDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={statusProcessing}>
                                        Create Status
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Edit Status Dialog */}
                    <Dialog open={isEditStatusDialogOpen} onOpenChange={setIsEditStatusDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Status</DialogTitle>
                                <DialogDescription>
                                    Update the status details
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUpdateStatus}>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="edit-status-name">Name</FormLabel>
                                        <Input
                                            id="edit-status-name"
                                            value={statusData.name}
                                            onChange={(e) => setStatusData('name', e.target.value)}
                                            placeholder="e.g., In Progress, Waiting"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <FormLabel htmlFor="edit-status-color">Color (Hex)</FormLabel>
                                        <div className="flex gap-2">
                                            <Input
                                                id="edit-status-color"
                                                type="color"
                                                value={statusData.color}
                                                onChange={(e) => setStatusData('color', e.target.value)}
                                                className="w-20 h-10"
                                            />
                                            <Input
                                                value={statusData.color}
                                                onChange={(e) => setStatusData('color', e.target.value)}
                                                placeholder="#808080"
                                                pattern="^#[0-9A-Fa-f]{6}$"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="edit-status-default"
                                            checked={statusData.is_default}
                                            onCheckedChange={(checked) => setStatusData('is_default', checked)}
                                        />
                                        <FormLabel htmlFor="edit-status-default" className="cursor-pointer">
                                            Set as default status for new tickets
                                        </FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="edit-status-closed"
                                            checked={statusData.is_closed}
                                            onCheckedChange={(checked) => setStatusData('is_closed', checked)}
                                        />
                                        <FormLabel htmlFor="edit-status-closed" className="cursor-pointer">
                                            Mark tickets with this status as closed
                                        </FormLabel>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="edit-status-visible"
                                            checked={statusData.is_visible}
                                            onCheckedChange={(checked) => setStatusData('is_visible', checked)}
                                        />
                                        <FormLabel htmlFor="edit-status-visible" className="cursor-pointer">
                                            Visible to users
                                        </FormLabel>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsEditStatusDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={statusProcessing}>
                                        Update Status
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Status Confirmation Dialog */}
                    <Dialog open={isDeleteStatusDialogOpen} onOpenChange={setIsDeleteStatusDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Status</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete "{deletingStatus?.name}"? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDeleteStatusDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={confirmDeleteStatus}
                                >
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
