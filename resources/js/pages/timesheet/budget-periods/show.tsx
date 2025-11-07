import {Head, router} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Calendar, ArrowLeft, CheckCircle, AlertCircle, Clock, DollarSign, TrendingUp, User} from 'lucide-react';
import {route} from 'ziggy-js';

interface Customer {
    id: string;
    name: string;
}

interface Project {
    id: string;
    name: string;
}

interface UserType {
    id: string;
    name: string;
    email: string;
}

interface Task {
    id: string;
    name: string;
}

interface Service {
    id: string;
    name: string;
    customer: Customer;
    project?: Project;
    service_manager?: UserType;
}

interface BudgetPeriod {
    id: string;
    period_start: string;
    period_end: string;
    budget_hours: number;
    budget_amount: number;
    hours_used: number;
    amount_used: number;
    hours_rollover_from_previous: number;
    hours_rollover_to_next?: number;
    total_available_hours: number;
    remaining_hours: number;
    reconciled: boolean;
    reconciliation_action?: string;
    reconciliation_notes?: string;
    reconciled_at?: string;
    reconciled_by?: UserType;
}

interface TimeEntry {
    id: string;
    date: string;
    user: UserType;
    task: Task;
    duration_hours: number;
    description?: string;
    billable: boolean;
    hourly_rate: number;
    approved: boolean;
}

interface BudgetChange {
    id: string;
    effective_from: string;
    effective_to?: string;
    old_budget_hours?: number;
    new_budget_hours?: number;
    old_budget_amount?: number;
    new_budget_amount?: number;
    reason?: string;
    created_at: string;
}

interface Props {
    service: Service;
    period: BudgetPeriod;
    timeEntries: TimeEntry[];
    budgetChanges: BudgetChange[];
}

export default function BudgetPeriodShow({service, period, timeEntries, budgetChanges}: Props) {
    const isOverBudget = period.hours_used > period.total_available_hours;
    const utilizationPercentage = period.total_available_hours > 0
        ? (period.hours_used / period.total_available_hours) * 100
        : 0;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        }).format(amount);
    };

    const getReconciliationBadge = (action: string) => {
        const configs: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
            rollover: { label: 'Rolled Over', variant: 'default' },
            lose: { label: 'Lost', variant: 'secondary' },
            invoice_separately: { label: 'Invoiced Separately', variant: 'outline' },
            deduct_next: { label: 'Deducted from Next', variant: 'destructive' },
        };

        const config = configs[action] || { label: action, variant: 'outline' };

        return (
            <Badge variant={config.variant}>
                {config.label}
            </Badge>
        );
    };

    const totalBillableHours = timeEntries
        .filter(entry => entry.billable)
        .reduce((sum, entry) => sum + entry.duration_hours, 0);

    const totalNonBillableHours = timeEntries
        .filter(entry => !entry.billable)
        .reduce((sum, entry) => sum + entry.duration_hours, 0);

    const totalAmount = timeEntries.reduce((sum, entry) => sum + (entry.duration_hours * entry.hourly_rate), 0);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`Budget Period - ${service.name}`} />
                <AppSidebarHeader
                    breadcrumbs={[
                        { label: 'Dashboard', href: route('dashboard') },
                        { label: 'Services', href: route('timesheet.services.index') },
                        { label: service.name, href: route('timesheet.services.show', service.id) },
                        { label: 'Budget Periods', href: route('timesheet.services.budget-periods.index', service.id) },
                        { label: `${formatDate(period.period_start)} - ${formatDate(period.period_end)}` },
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-6 w-6" />
                                <h1 className="text-2xl font-bold">Budget Period Details</h1>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {service.name} • {service.customer.name}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => router.visit(route('timesheet.services.budget-periods.index', service.id))}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Budget Periods
                        </Button>
                    </div>

                    {/* Period Overview */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Budget Hours</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{period.budget_hours.toFixed(2)}h</div>
                                {period.hours_rollover_from_previous !== 0 && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {period.hours_rollover_from_previous > 0 ? '+' : ''}
                                        {period.hours_rollover_from_previous.toFixed(2)}h rollover
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Available</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{period.total_available_hours.toFixed(2)}h</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Budget + rollover
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Hours Used</CardTitle>
                                <User className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{period.hours_used.toFixed(2)}h</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {utilizationPercentage.toFixed(1)}% utilized
                                </p>
                            </CardContent>
                        </Card>

                        <Card className={isOverBudget ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-green-500 bg-green-50 dark:bg-green-950/20'}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {isOverBudget ? 'Overage' : 'Remaining'}
                                </CardTitle>
                                {isOverBudget ? (
                                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                ) : (
                                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className={`text-2xl font-bold ${isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                    {Math.abs(period.remaining_hours).toFixed(2)}h
                                </div>
                                {period.hours_rollover_to_next !== undefined && period.hours_rollover_to_next !== 0 && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {period.hours_rollover_to_next > 0 ? '+' : ''}
                                        {period.hours_rollover_to_next.toFixed(2)}h to next
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Reconciliation Status */}
                    {period.reconciled && (
                        <Card className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                                    <CheckCircle className="h-5 w-5" />
                                    Period Reconciled
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Action Taken</p>
                                        <div className="mt-1">
                                            {period.reconciliation_action && getReconciliationBadge(period.reconciliation_action)}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Reconciled At</p>
                                        <p className="font-medium mt-1">
                                            {period.reconciled_at && formatDateTime(period.reconciled_at)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Reconciled By</p>
                                        <p className="font-medium mt-1">
                                            {period.reconciled_by?.name || 'System'}
                                        </p>
                                    </div>
                                </div>
                                {period.reconciliation_notes && (
                                    <div className="mt-4">
                                        <p className="text-sm text-muted-foreground">Notes</p>
                                        <p className="mt-1 text-sm">{period.reconciliation_notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Time Entries */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Time Entries</CardTitle>
                            <CardDescription>
                                All time logged during this budget period
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3 mb-4">
                                <div className="bg-muted p-3 rounded-lg">
                                    <p className="text-sm text-muted-foreground">Total Entries</p>
                                    <p className="text-xl font-bold">{timeEntries.length}</p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                                    <p className="text-sm text-muted-foreground">Billable Hours</p>
                                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                                        {totalBillableHours.toFixed(2)}h
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                                    <p className="text-sm text-muted-foreground">Non-Billable Hours</p>
                                    <p className="text-xl font-bold">
                                        {totalNonBillableHours.toFixed(2)}h
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>User</TableHead>
                                            <TableHead>Task</TableHead>
                                            <TableHead>Hours</TableHead>
                                            <TableHead>Rate</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Billable</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Description</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {timeEntries.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={9} className="text-center text-muted-foreground">
                                                    No time entries for this period.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            timeEntries.map((entry) => (
                                                <TableRow key={entry.id}>
                                                    <TableCell className="font-medium">
                                                        {formatDate(entry.date)}
                                                    </TableCell>
                                                    <TableCell>{entry.user.name}</TableCell>
                                                    <TableCell>{entry.task.name}</TableCell>
                                                    <TableCell className="font-mono">
                                                        {entry.duration_hours.toFixed(2)}h
                                                    </TableCell>
                                                    <TableCell className="font-mono">
                                                        {formatCurrency(entry.hourly_rate)}
                                                    </TableCell>
                                                    <TableCell className="font-mono">
                                                        {formatCurrency(entry.duration_hours * entry.hourly_rate)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {entry.billable ? (
                                                            <Badge variant="default">Billable</Badge>
                                                        ) : (
                                                            <Badge variant="secondary">Non-Billable</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {entry.approved ? (
                                                            <Badge variant="outline">
                                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                                Approved
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="secondary">Pending</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="max-w-xs truncate">
                                                        {entry.description || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {timeEntries.length > 0 && (
                                <div className="mt-4 p-4 bg-muted rounded-lg">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Hours</p>
                                            <p className="text-xl font-bold">{period.hours_used.toFixed(2)}h</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Amount</p>
                                            <p className="text-xl font-bold">{formatCurrency(totalAmount)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Budget Changes */}
                    {budgetChanges.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Budget Changes</CardTitle>
                                <CardDescription>
                                    Budget adjustments that affected this period
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Effective From</TableHead>
                                                <TableHead>Effective To</TableHead>
                                                <TableHead>Hours Change</TableHead>
                                                <TableHead>Amount Change</TableHead>
                                                <TableHead>Reason</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {budgetChanges.map((change) => (
                                                <TableRow key={change.id}>
                                                    <TableCell className="font-medium">
                                                        {formatDate(change.effective_from)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {change.effective_to ? formatDate(change.effective_to) : 'Ongoing'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {change.old_budget_hours !== undefined && change.new_budget_hours !== undefined ? (
                                                            <div className="font-mono">
                                                                {change.old_budget_hours.toFixed(2)}h → {change.new_budget_hours.toFixed(2)}h
                                                                <span className={change.new_budget_hours > change.old_budget_hours ? 'text-green-600 dark:text-green-400 ml-2' : 'text-red-600 dark:text-red-400 ml-2'}>
                                                                    ({change.new_budget_hours > change.old_budget_hours ? '+' : ''}{(change.new_budget_hours - change.old_budget_hours).toFixed(2)}h)
                                                                </span>
                                                            </div>
                                                        ) : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {change.old_budget_amount !== undefined && change.new_budget_amount !== undefined ? (
                                                            <div className="font-mono">
                                                                {formatCurrency(change.old_budget_amount)} → {formatCurrency(change.new_budget_amount)}
                                                            </div>
                                                        ) : '-'}
                                                    </TableCell>
                                                    <TableCell className="max-w-xs">
                                                        {change.reason || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
