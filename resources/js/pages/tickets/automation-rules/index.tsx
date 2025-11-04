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
import {Switch} from '@/components/ui/switch';
import {MoreHorizontal, Plus, Zap, ArrowUpDown} from 'lucide-react';
import {useState} from 'react';
import {route} from 'ziggy-js';

interface AutomationRule {
    id: string;
    name: string;
    description: string;
    priority: number;
    is_active: boolean;
    trigger: 'ticket_created' | 'ticket_updated';
    condition_match: 'all' | 'any';
    conditions: any[];
    actions: any[];
    stop_processing: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    createdRules: AutomationRule[];
    updatedRules: AutomationRule[];
}

export default function AutomationRulesIndex({createdRules, updatedRules}: Props) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [ruleToDelete, setRuleToDelete] = useState<AutomationRule | null>(null);

    const handleCreate = (trigger: 'ticket_created' | 'ticket_updated') => {
        router.get(route('tickets.automation-rules.create', {trigger}));
    };

    const handleEdit = (id: string) => {
        router.get(route('tickets.automation-rules.edit', id));
    };

    const handleToggle = (rule: AutomationRule) => {
        router.patch(route('tickets.automation-rules.toggle', rule.id), {}, {
            preserveScroll: true,
        });
    };

    const handleDeleteClick = (rule: AutomationRule) => {
        setRuleToDelete(rule);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (ruleToDelete) {
            router.delete(route('tickets.automation-rules.destroy', ruleToDelete.id), {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setRuleToDelete(null);
                },
            });
        }
    };

    const renderRulesTable = (rules: AutomationRule[], emptyMessage: string) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">
                        <ArrowUpDown className="h-4 w-4"/>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Conditions</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rules.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center">
                                <Zap className="h-8 w-8 text-muted-foreground mb-2"/>
                                <p className="text-sm text-muted-foreground">
                                    {emptyMessage}
                                </p>
                            </div>
                        </TableCell>
                    </TableRow>
                ) : (
                    rules.map((rule) => (
                        <TableRow key={rule.id}>
                            <TableCell className="text-center text-muted-foreground">
                                {rule.priority}
                            </TableCell>
                            <TableCell className="font-medium">
                                <div className="flex flex-col">
                                    <span>{rule.name}</span>
                                    {rule.description && (
                                        <span className="text-xs text-muted-foreground">
                                            {rule.description}
                                        </span>
                                    )}
                                </div>
                                {rule.stop_processing && (
                                    <Badge variant="outline" className="ml-2">
                                        Stop Processing
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Badge variant="secondary">
                                        {rule.conditions.length}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                        ({rule.condition_match === 'all' ? 'All match' : 'Any match'})
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">
                                    {rule.actions.length}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Switch
                                    checked={rule.is_active}
                                    onCheckedChange={() => handleToggle(rule)}
                                />
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4"/>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEdit(rule.id)}>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleDeleteClick(rule)}
                                            className="text-destructive"
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
    );

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Automation Rules"/>
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
                                    <BreadcrumbPage>Automation Rules</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Automation Rules</h2>
                            <p className="text-muted-foreground">
                                Create automated workflows to handle ticket routing, assignments, and notifications
                            </p>
                        </div>

                        {/* Ticket Created Rules */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">When Ticket is Created</h3>
                                    <p className="text-sm text-muted-foreground">
                                        These rules run automatically when a new ticket is created
                                    </p>
                                </div>
                                <Button onClick={() => handleCreate('ticket_created')}>
                                    <Plus className="mr-2 h-4 w-4"/>
                                    New Rule
                                </Button>
                            </div>

                            <div className="rounded-lg border bg-card">
                                {renderRulesTable(createdRules, 'No rules for ticket creation yet. Create your first rule to automate new ticket workflows.')}
                            </div>
                        </div>

                        {/* Ticket Updated Rules */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">When Ticket is Updated</h3>
                                    <p className="text-sm text-muted-foreground">
                                        These rules run automatically when an existing ticket is updated
                                    </p>
                                </div>
                                <Button onClick={() => handleCreate('ticket_updated')}>
                                    <Plus className="mr-2 h-4 w-4"/>
                                    New Rule
                                </Button>
                            </div>

                            <div className="rounded-lg border bg-card">
                                {renderRulesTable(updatedRules, 'No rules for ticket updates yet. Create your first rule to automate ticket update workflows.')}
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Automation Rule</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{ruleToDelete?.name}"? This action cannot be undone and the rule will stop executing.
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