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
import {FileText, ArrowLeft, CheckCircle, AlertCircle, TrendingUp, Clock, Users, ListChecks} from 'lucide-react';
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

interface Service {
    id: string;
    name: string;
    customer: Customer;
    project?: Project;
    service_manager?: UserType;
    budget_period: string;
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
    reconciled_by?: UserType;
}

interface PeriodStats {
    entry_count: number;
    user_count: number;
    billable_hours: number;
    non_billable_hours: number;
}

interface PeriodWithStats {
    period: BudgetPeriod;
    stats: PeriodStats;
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
    created_by_user?: UserType;
}

interface Props {
    service: Service;
    periods: PeriodWithStats[];
    budgetChanges: BudgetChange[];
}

export default function BudgetLedger({service, periods, budgetChanges}: Props) {
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

    const isOverBudget = (period: BudgetPeriod) => {
        return Number(period.hours_used || 0) > Number(period.total_available_hours || 0);
    };

    // Calculate totals
    const totalBudgetHours = periods.reduce((sum, p) => sum + Number(p.period.budget_hours || 0), 0);
    const totalHoursUsed = periods.reduce((sum, p) => sum + Number(p.period.hours_used || 0), 0);
    const totalAmountUsed = periods.reduce((sum, p) => sum + Number(p.period.amount_used || 0), 0);
    const totalBillableHours = periods.reduce((sum, p) => sum + Number(p.stats.billable_hours || 0), 0);
    const totalNonBillableHours = periods.reduce((sum, p) => sum + Number(p.stats.non_billable_hours || 0), 0);
    const totalEntries = periods.reduce((sum, p) => sum + Number(p.stats.entry_count || 0), 0);

    const averageUtilization = totalBudgetHours > 0
        ? (totalHoursUsed / totalBudgetHours) * 100
        : 0;

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`Budget Ledger - ${service.name}`} />
                <AppSidebarHeader
                    breadcrumbs={[
                        { label: 'Dashboard', href: route('dashboard') },
                        { label: 'Services', href: route('timesheet.services.index') },
                        { label: service.name, href: route('timesheet.services.show', service.id) },
                        { label: 'Budget Periods', href: route('timesheet.services.budget-periods.index', service.id) },
                        { label: 'Ledger' },
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2">
                                <FileText className="h-6 w-6" />
                                <h1 className="text-2xl font-bold">Budget Ledger</h1>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {service.name} • {service.customer.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Complete financial history for {service.budget_period.toLowerCase()} service
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

                    {/* Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Periods</CardTitle>
                                <ListChecks className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{periods.length}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {periods.filter(p => p.period.reconciled).length} reconciled
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalBudgetHours.toFixed(2)}h</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Across all periods
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Used</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalHoursUsed.toFixed(2)}h</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {averageUtilization.toFixed(1)}% average utilization
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Time Entries</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalEntries}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Total logged entries
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Billable vs Non-Billable Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hours Breakdown</CardTitle>
                            <CardDescription>Billable and non-billable hours across all periods</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                                    <p className="text-sm text-muted-foreground">Billable Hours</p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {totalBillableHours.toFixed(2)}h
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {totalHoursUsed > 0 ? ((totalBillableHours / totalHoursUsed) * 100).toFixed(1) : 0}% of total
                                    </p>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                    <p className="text-sm text-muted-foreground">Non-Billable Hours</p>
                                    <p className="text-2xl font-bold">
                                        {totalNonBillableHours.toFixed(2)}h
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {totalHoursUsed > 0 ? ((totalNonBillableHours / totalHoursUsed) * 100).toFixed(1) : 0}% of total
                                    </p>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                                    <p className="text-sm text-muted-foreground">Total Amount</p>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {formatCurrency(totalAmountUsed)}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Revenue generated
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Budget Periods Ledger */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Period History</CardTitle>
                            <CardDescription>Complete record of all budget periods</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Period</TableHead>
                                            <TableHead>Budget</TableHead>
                                            <TableHead>Rollover In</TableHead>
                                            <TableHead>Total Available</TableHead>
                                            <TableHead>Used</TableHead>
                                            <TableHead>Billable</TableHead>
                                            <TableHead>Non-Billable</TableHead>
                                            <TableHead>Entries</TableHead>
                                            <TableHead>Users</TableHead>
                                            <TableHead>Remaining</TableHead>
                                            <TableHead>Rollover Out</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {periods.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={13} className="text-center text-muted-foreground">
                                                    No budget periods found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            periods.map(({period, stats}) => (
                                                <TableRow
                                                    key={period.id}
                                                    className={`cursor-pointer hover:bg-muted/50 ${isOverBudget(period) ? 'bg-red-50 dark:bg-red-950/10' : ''}`}
                                                    onClick={() => router.visit(route('timesheet.services.budget-periods.show', [service.id, period.id]))}
                                                >
                                                    <TableCell>
                                                        <div className="font-medium">
                                                            {formatDate(period.period_start)}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            to {formatDate(period.period_end)}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono">
                                                        {Number(period.budget_hours || 0).toFixed(2)}h
                                                    </TableCell>
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
                                                    <TableCell className="font-mono">
                                                        {Number(period.hours_used || 0).toFixed(2)}h
                                                    </TableCell>
                                                    <TableCell className="font-mono text-green-600 dark:text-green-400">
                                                        {Number(stats.billable_hours || 0).toFixed(2)}h
                                                    </TableCell>
                                                    <TableCell className="font-mono text-muted-foreground">
                                                        {Number(stats.non_billable_hours || 0).toFixed(2)}h
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {stats.entry_count}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {stats.user_count}
                                                    </TableCell>
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
                                                                Pending
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
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Budget Changes Timeline */}
                    {budgetChanges.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Budget Changes Timeline</CardTitle>
                                <CardDescription>History of budget adjustments</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Effective Period</TableHead>
                                                <TableHead>Hours Change</TableHead>
                                                <TableHead>Amount Change</TableHead>
                                                <TableHead>Reason</TableHead>
                                                <TableHead>Created By</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {budgetChanges.map((change) => (
                                                <TableRow key={change.id}>
                                                    <TableCell className="font-medium">
                                                        {formatDateTime(change.created_at)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <div className="text-sm">From: {formatDate(change.effective_from)}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                To: {change.effective_to ? formatDate(change.effective_to) : 'Ongoing'}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {change.old_budget_hours !== undefined && change.new_budget_hours !== undefined ? (
                                                            <div className="font-mono">
                                                                <div className="text-sm">
                                                                    {Number(change.old_budget_hours || 0).toFixed(2)}h → {Number(change.new_budget_hours || 0).toFixed(2)}h
                                                                </div>
                                                                <div className={`text-xs ${Number(change.new_budget_hours || 0) > Number(change.old_budget_hours || 0) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                                    {Number(change.new_budget_hours || 0) > Number(change.old_budget_hours || 0) ? '+' : ''}
                                                                    {(Number(change.new_budget_hours || 0) - Number(change.old_budget_hours || 0)).toFixed(2)}h
                                                                </div>
                                                            </div>
                                                        ) : '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {change.old_budget_amount !== undefined && change.new_budget_amount !== undefined ? (
                                                            <div className="font-mono text-sm">
                                                                {formatCurrency(change.old_budget_amount)} → {formatCurrency(change.new_budget_amount)}
                                                            </div>
                                                        ) : '-'}
                                                    </TableCell>
                                                    <TableCell className="max-w-xs">
                                                        {change.reason || '-'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {change.created_by_user?.name || 'System'}
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
