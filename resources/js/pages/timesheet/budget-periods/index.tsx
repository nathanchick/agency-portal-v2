import {Head, router} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {
    SidebarInset,
    SidebarProvider,
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
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Calendar, AlertCircle, CheckCircle, Eye, FileText} from 'lucide-react';
import {useState} from 'react';
import {route} from 'ziggy-js';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {Separator} from '@/components/ui/separator';

interface Customer {
    id: string;
    name: string;
}

interface Project {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
}

interface Service {
    id: string;
    name: string;
    customer: Customer;
    project?: Project;
    service_manager?: User;
    budget_period: string;
}

interface BudgetPeriod {
    id: string;
    period_start: string;
    period_end: string;
    budget_hours: number;
    hours_used: number;
    hours_rollover_from_previous: number;
    hours_rollover_to_next?: number;
    total_available_hours: number;
    remaining_hours: number;
    reconciled: boolean;
    reconciliation_action?: string;
    reconciliation_notes?: string;
    reconciled_at?: string;
    reconciled_by?: User;
}

interface Props {
    service: Service;
    periods: {
        data: BudgetPeriod[];
        links?: any[];
    };
    unreconciledPeriods: BudgetPeriod[];
}

export default function BudgetPeriodsIndex({service, periods, unreconciledPeriods}: Props) {
    const [isReconcileDialogOpen, setIsReconcileDialogOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState<BudgetPeriod | null>(null);
    const [reconciliationAction, setReconciliationAction] = useState('');
    const [reconciliationNotes, setReconciliationNotes] = useState('');

    const handleReconcile = () => {
        if (!selectedPeriod || !reconciliationAction) return;

        router.post(
            route('timesheet.services.budget-periods.reconcile', [service.id, selectedPeriod.id]),
            {
                reconciliation_action: reconciliationAction,
                reconciliation_notes: reconciliationNotes,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsReconcileDialogOpen(false);
                    setSelectedPeriod(null);
                    setReconciliationAction('');
                    setReconciliationNotes('');
                },
            }
        );
    };

    const openReconcileDialog = (period: BudgetPeriod) => {
        setSelectedPeriod(period);
        setIsReconcileDialogOpen(true);
    };

    const isOverBudget = (period: BudgetPeriod) => {
        return Number(period.hours_used || 0) > Number(period.total_available_hours || 0);
    };

    const getReconciliationBadge = (action: string) => {
        const configs: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
            rollover: { label: 'Rolled Over', variant: 'default' },
            lose: { label: 'Lost', variant: 'secondary' },
            invoice_separately: { label: 'Invoiced Separately', variant: 'outline' },
            deduct_next: { label: 'Deducted from Next', variant: 'secondary' },
        };

        const config = configs[action] || { label: action, variant: 'outline' };

        return (
            <Badge variant={config.variant}>
                {config.label}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`Budget Periods - ${service.name}`} />
                <AppSidebarHeader
                    breadcrumbs={[
                        { label: 'Dashboard', href: route('dashboard') },
                        { label: 'Services', href: route('timesheet.services.index') },
                        { label: service.name, href: route('timesheet.services.show', service.id) },
                        { label: 'Budget Periods' },
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-6 w-6" />
                                <h1 className="text-2xl font-bold">Budget Periods</h1>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {service.name} • {service.customer.name}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => router.visit(route('timesheet.services.budget-periods.ledger', service.id))}
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            View Ledger
                        </Button>
                    </div>

                    {/* Unreconciled Periods Alert */}
                    {unreconciledPeriods.length > 0 && (
                        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-yellow-900 dark:text-yellow-100">
                                    <AlertCircle className="h-5 w-5" />
                                    Periods Requiring Reconciliation
                                </CardTitle>
                                <CardDescription className="text-yellow-800 dark:text-yellow-200">
                                    The following periods have ended and need reconciliation
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {unreconciledPeriods.map((period) => (
                                    <div key={period.id} className="flex items-center justify-between bg-white dark:bg-gray-900 p-3 rounded-md">
                                        <div>
                                            <p className="font-medium">
                                                {formatDate(period.period_start)} - {formatDate(period.period_end)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {isOverBudget(period) ? (
                                                    <span className="text-red-600 dark:text-red-400 font-medium">
                                                        Over by {Math.abs(Number(period.remaining_hours || 0)).toFixed(2)}h
                                                    </span>
                                                ) : (
                                                    <span className="text-green-600 dark:text-green-400 font-medium">
                                                        {Number(period.remaining_hours || 0).toFixed(2)}h remaining
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <Button onClick={() => openReconcileDialog(period)}>
                                            Reconcile
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Budget Periods Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Budget Hours</TableHead>
                                    <TableHead>Rollover From Previous</TableHead>
                                    <TableHead>Total Available</TableHead>
                                    <TableHead>Hours Used</TableHead>
                                    <TableHead>Remaining</TableHead>
                                    <TableHead>Rollover To Next</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Reconciliation</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {periods.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={10} className="text-center text-muted-foreground">
                                            No budget periods found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    periods.data.map((period) => (
                                        <TableRow key={period.id} className={isOverBudget(period) ? 'bg-red-50 dark:bg-red-950/20' : ''}>
                                            <TableCell>
                                                <div className="font-medium">
                                                    {formatDate(period.period_start)}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    to {formatDate(period.period_end)}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-mono">{Number(period.budget_hours || 0).toFixed(2)}h</TableCell>
                                            <TableCell className="font-mono">
                                                {Number(period.hours_rollover_from_previous || 0) > 0 ? (
                                                    <span className="text-green-600 dark:text-green-400">
                                                        +{Number(period.hours_rollover_from_previous).toFixed(2)}h
                                                    </span>
                                                ) : Number(period.hours_rollover_from_previous || 0) < 0 ? (
                                                    <span className="text-red-600 dark:text-red-400">
                                                        {Number(period.hours_rollover_from_previous).toFixed(2)}h
                                                    </span>
                                                ) : '-'}
                                            </TableCell>
                                            <TableCell className="font-mono font-medium">
                                                {Number(period.total_available_hours || 0).toFixed(2)}h
                                            </TableCell>
                                            <TableCell className="font-mono">{Number(period.hours_used || 0).toFixed(2)}h</TableCell>
                                            <TableCell className="font-mono">
                                                {isOverBudget(period) ? (
                                                    <span className="text-red-600 dark:text-red-400 font-medium">
                                                        {Number(period.remaining_hours || 0).toFixed(2)}h
                                                    </span>
                                                ) : (
                                                    <span className="text-green-600 dark:text-green-400 font-medium">
                                                        {Number(period.remaining_hours || 0).toFixed(2)}h
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-mono">
                                                {period.hours_rollover_to_next ? (
                                                    Number(period.hours_rollover_to_next) > 0 ? (
                                                        <span className="text-green-600 dark:text-green-400">
                                                            +{Number(period.hours_rollover_to_next).toFixed(2)}h
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-600 dark:text-red-400">
                                                            {Number(period.hours_rollover_to_next).toFixed(2)}h
                                                        </span>
                                                    )
                                                ) : '-'}
                                            </TableCell>
                                            <TableCell>
                                                {period.reconciled ? (
                                                    <Badge variant="secondary">
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Reconciled
                                                    </Badge>
                                                ) : new Date(period.period_end) < new Date() ? (
                                                    <Badge variant="destructive">
                                                        <AlertCircle className="h-3 w-3 mr-1" />
                                                        Needs Reconciliation
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline">Active</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {period.reconciliation_action ? (
                                                    getReconciliationBadge(period.reconciliation_action)
                                                ) : '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => router.visit(route('timesheet.services.budget-periods.show', [service.id, period.id]))}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {periods.links && periods.links.length > 3 && (
                        <div className="flex justify-center gap-2">
                            {periods.links.map((link: any, index: number) => (
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

            {/* Reconcile Dialog */}
            <Dialog open={isReconcileDialogOpen} onOpenChange={setIsReconcileDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Reconcile Budget Period</DialogTitle>
                        <DialogDescription>
                            Choose how to handle the {selectedPeriod && (
                                isOverBudget(selectedPeriod) ? 'overage' : 'unused hours'
                            )} for this period.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedPeriod && (
                        <div className="space-y-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Period</p>
                                            <p className="font-medium">
                                                {formatDate(selectedPeriod.period_start)} - {formatDate(selectedPeriod.period_end)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Available</p>
                                            <p className="text-xl font-bold">{Number(selectedPeriod.total_available_hours || 0).toFixed(2)}h</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Hours Used</p>
                                            <p className="text-xl font-bold">{Number(selectedPeriod.hours_used || 0).toFixed(2)}h</p>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">
                                            {isOverBudget(selectedPeriod) ? 'Overage' : 'Remaining Hours'}
                                        </p>
                                        <p className={`text-3xl font-bold ${isOverBudget(selectedPeriod) ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                            {Math.abs(Number(selectedPeriod.remaining_hours || 0)).toFixed(2)}h
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Reconciliation Action</label>
                                <Select value={reconciliationAction} onValueChange={setReconciliationAction}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose an action" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {isOverBudget(selectedPeriod) ? (
                                            <>
                                                <SelectItem value="invoice_separately">
                                                    Invoice Separately - Bill the overage to the customer
                                                </SelectItem>
                                                <SelectItem value="deduct_next">
                                                    Deduct from Next Period - Reduce next period's budget
                                                </SelectItem>
                                                <SelectItem value="lose">
                                                    Write Off - Absorb the overage
                                                </SelectItem>
                                            </>
                                        ) : (
                                            <>
                                                <SelectItem value="rollover">
                                                    Roll Over - Add to next period's budget
                                                </SelectItem>
                                                <SelectItem value="lose">
                                                    Lose Hours - Don't carry forward
                                                </SelectItem>
                                            </>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Notes (optional)</label>
                                <Textarea
                                    value={reconciliationNotes}
                                    onChange={(e) => setReconciliationNotes(e.target.value)}
                                    placeholder="Add any notes about this reconciliation..."
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsReconcileDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleReconcile} disabled={!reconciliationAction}>
                            Confirm Reconciliation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
}
