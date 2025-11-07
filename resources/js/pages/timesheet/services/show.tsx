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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {Briefcase, Edit, Clock, DollarSign, TrendingUp, Calendar, AlertCircle} from 'lucide-react';
import {route} from 'ziggy-js';
import {useState} from 'react';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

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

interface Task {
    id: string;
    name: string;
}

interface BudgetPeriod {
    id: string;
    period_start: string;
    period_end: string;
    budget_hours: number;
    hours_used: number;
    hours_rollover_from_previous: number;
    total_available_hours: number;
    remaining_hours: number;
    reconciled: boolean;
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
    created_by_user?: User;
}

interface Service {
    id: string;
    name: string;
    description?: string;
    customer: Customer;
    project?: Project;
    status: string;
    billing_type: string;
    budget_period: string;
    current_budget_hours?: number;
    current_budget_amount?: number;
    budget_rollover_enabled: boolean;
    start_date: string;
    end_date?: string;
    default_hourly_rate?: number;
    service_manager?: User;
    tasks: Task[];
}

interface TimeEntriesStats {
    total_hours: number;
    billable_hours: number;
    total_amount: number;
}

interface Props {
    service: Service;
    currentPeriod?: BudgetPeriod;
    timeEntriesStats: TimeEntriesStats;
    budgetPeriods: BudgetPeriod[];
    budgetChanges: BudgetChange[];
}

export default function ServiceShow({service, currentPeriod, timeEntriesStats, budgetPeriods, budgetChanges}: Props) {
    const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);
    const [budgetFormData, setBudgetFormData] = useState({
        new_budget_hours: service.current_budget_hours?.toString() || '',
        new_budget_amount: service.current_budget_amount?.toString() || '',
        effective_from: new Date().toISOString().split('T')[0],
        effective_to: '',
        reason: '',
        apply_to_existing_periods: false,
    });

    const handleBudgetAdjustment = () => {
        router.post(
            route('timesheet.services.budget-adjustments.store', service.id),
            budgetFormData,
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsBudgetDialogOpen(false);
                    setBudgetFormData({
                        new_budget_hours: service.current_budget_hours?.toString() || '',
                        new_budget_amount: service.current_budget_amount?.toString() || '',
                        effective_from: new Date().toISOString().split('T')[0],
                        effective_to: '',
                        reason: '',
                        apply_to_existing_periods: false,
                    });
                },
            }
        );
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
            Active: 'default',
            Archived: 'secondary',
            Completed: 'secondary',
        };

        return (
            <Badge variant={variants[status] || 'secondary'}>
                {status}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getBudgetProgress = () => {
        if (!currentPeriod) return 0;
        return (Number(currentPeriod.hours_used) / Number(currentPeriod.total_available_hours)) * 100;
    };

    const isOverBudget = () => {
        if (!currentPeriod) return false;
        return Number(currentPeriod.hours_used) > Number(currentPeriod.total_available_hours);
    };

    // Prepare chart data
    const getMaxPeriods = () => {
        switch (service.budget_period) {
            case 'Monthly': return 12;
            case 'Quarterly': return 4;
            case 'Yearly': return 1;
            case 'OneTime': return 1;
            default: return 12;
        }
    };

    const maxPeriods = getMaxPeriods();

    const chartData = budgetPeriods
        .sort((a, b) => new Date(b.period_start).getTime() - new Date(a.period_start).getTime()) // Sort newest first
        .slice(0, maxPeriods) // Take only the last N periods
        .reverse() // Reverse for chronological order in chart
        .map(period => ({
            period: new Date(period.period_start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            budgetHours: Number(period.total_available_hours),
            usedHours: Number(period.hours_used),
        }));

    // Check if any period has a non-zero budget
    const hasBudget = chartData.some(p => p.budgetHours > 0);

    const chartConfig = {
        ...(hasBudget && {
            budgetHours: {
                label: "Budget Hours",
                color: "hsl(217 91% 60%)",
            },
        }),
        usedHours: {
            label: "Used Hours",
            color: "hsl(142.1 76.2% 36.3%)",
        },
    };

    const getChartDescription = () => {
        switch (service.budget_period) {
            case 'Monthly': return 'Last 12 months comparison';
            case 'Quarterly': return 'Last 4 quarters comparison';
            case 'Yearly': return 'Annual comparison';
            case 'OneTime': return 'Project usage';
            default: return 'Historical comparison of budget vs. actual usage';
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`Service: ${service.name}`} />
p                <AppSidebarHeader
                    breadcrumbs={[
                        { label: 'Dashboard', href: route('dashboard') },
                        { label: 'Services', href: route('timesheet.services.index') },
                        { label: service.name },
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <Briefcase className="h-8 w-8" />
                            <div>
                                <h1 className="text-2xl font-bold">{service.name}</h1>
                                <p className="text-sm text-muted-foreground">
                                    {service.customer.name} {service.project && `• ${service.project.name}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => router.visit(route('timesheet.services.budget-periods.index', service.id))}
                            >
                                Budget History
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsBudgetDialogOpen(true)}
                            >
                                <DollarSign className="h-4 w-4 mr-2" />
                                Adjust Budget
                            </Button>
                            <Button
                                onClick={() => router.visit(route('timesheet.services.edit', service.id))}
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Service
                            </Button>
                        </div>
                    </div>

                    {/* Service Details */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {getStatusBadge(service.status)}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Billing Type</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">
                                    {service.billing_type === 'Hourly' ? 'Hourly' : service.billing_type === 'FixedFee' ? 'Fixed Fee' : 'Non-Billable'}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Budget Period</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold">{service.budget_period}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Service Manager</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm">{service.service_manager?.name || 'Not assigned'}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Current Budget Period */}
                    {currentPeriod && (
                        <Card className={isOverBudget() ? 'border-destructive' : ''}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Current Budget Period</CardTitle>
                                        <CardDescription>
                                            {formatDate(currentPeriod.period_start)} - {formatDate(currentPeriod.period_end)}
                                        </CardDescription>
                                    </div>
                                    {isOverBudget() && (
                                        <Badge variant="destructive">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            Over Budget
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Hours Used</p>
                                            <p className="text-2xl font-bold">{Number(currentPeriod.hours_used).toFixed(2)}h</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Total Available</p>
                                            <p className="text-2xl font-bold">{Number(currentPeriod.total_available_hours).toFixed(2)}h</p>
                                            {Number(currentPeriod.hours_rollover_from_previous) > 0 && (
                                                <p className="text-xs text-muted-foreground">
                                                    (includes {Number(currentPeriod.hours_rollover_from_previous).toFixed(2)}h rollover)
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Remaining</p>
                                            <p className={`text-2xl font-bold ${isOverBudget() ? 'text-destructive' : 'text-green-600'}`}>
                                                {Number(currentPeriod.remaining_hours).toFixed(2)}h
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${isOverBudget() ? 'bg-destructive' : 'bg-primary'}`}
                                            style={{width: `${Math.min(getBudgetProgress(), 100)}%`}}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Budget Adjustments */}
                    {budgetChanges.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Budget Adjustments</CardTitle>
                                <CardDescription>History of budget changes for this service</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {budgetChanges.map((change, index) => {
                                        const isActive = !change.effective_to || new Date(change.effective_to) >= new Date();

                                        // If there's an effective_to date, budget reverts to the old values
                                        const willRevertTo = change.effective_to
                                            ? `${Number(change.old_budget_hours || 0).toFixed(2)}h / £${Number(change.old_budget_amount || 0).toFixed(2)}`
                                            : 'Permanent';

                                        return (
                                            <div
                                                key={change.id}
                                                className={`p-4 rounded-lg border ${isActive ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' : 'bg-muted/50'}`}
                                            >
                                                <div className="grid gap-4 md:grid-cols-4">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Budget Change</p>
                                                        <p className="text-sm font-medium">
                                                            {Number(change.old_budget_hours || 0).toFixed(2)}h → {Number(change.new_budget_hours || 0).toFixed(2)}h
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            £{Number(change.old_budget_amount || 0).toFixed(2)} → £{Number(change.new_budget_amount || 0).toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Duration</p>
                                                        <p className="text-sm font-medium">
                                                            {formatDate(change.effective_from)}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {change.effective_to ? `to ${formatDate(change.effective_to)}` : 'Ongoing'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Will Revert To</p>
                                                        <p className="text-sm font-medium">
                                                            {willRevertTo}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Changed By</p>
                                                        <p className="text-sm font-medium">
                                                            {change.created_by_user?.name || 'System'}
                                                        </p>
                                                        {isActive && (
                                                            <Badge variant="default" className="mt-1">Active</Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                {change.reason && (
                                                    <div className="mt-3 pt-3 border-t">
                                                        <p className="text-xs text-muted-foreground">Reason</p>
                                                        <p className="text-sm">{change.reason}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Budget Usage Trends Chart */}
                    {chartData.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Budget Usage Trends</CardTitle>
                                <CardDescription>{getChartDescription()}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                                    <ResponsiveContainer width="100%" height={400}>
                                        <BarChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="period"
                                                tick={{ fontSize: 12 }}
                                                angle={-45}
                                                textAnchor="end"
                                                height={80}
                                            />
                                            <YAxis
                                                label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
                                            />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Legend />
                                            {hasBudget && (
                                                <Bar
                                                    dataKey="budgetHours"
                                                    fill="hsl(217 91% 60%)"
                                                    name="Budget Hours"
                                                    radius={[4, 4, 0, 0]}
                                                />
                                            )}
                                            <Bar
                                                dataKey="usedHours"
                                                fill="hsl(142.1 76.2% 36.3%)"
                                                name="Used Hours"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    )}

                    {/* Time Tracking Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Time Tracking Summary</CardTitle>
                            <CardDescription>All-time statistics for this service</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="flex items-center gap-4">
                                    <Clock className="h-8 w-8 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Hours</p>
                                        <p className="text-2xl font-bold">{timeEntriesStats.total_hours ? Number(timeEntriesStats.total_hours).toFixed(2) : '0.00'}h</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Billable Hours</p>
                                        <p className="text-2xl font-bold">{timeEntriesStats.billable_hours ? Number(timeEntriesStats.billable_hours).toFixed(2) : '0.00'}h</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <DollarSign className="h-8 w-8 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Value</p>
                                        <p className="text-2xl font-bold">${timeEntriesStats.total_amount ? Number(timeEntriesStats.total_amount).toFixed(2) : '0.00'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Service Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Service Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {service.description && (
                                <div>
                                    <p className="text-sm font-medium">Description</p>
                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                </div>
                            )}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium">Start Date</p>
                                    <p className="text-sm text-muted-foreground">{formatDate(service.start_date)}</p>
                                </div>
                                {service.end_date && (
                                    <div>
                                        <p className="text-sm font-medium">End Date</p>
                                        <p className="text-sm text-muted-foreground">{formatDate(service.end_date)}</p>
                                    </div>
                                )}
                                {service.default_hourly_rate && (
                                    <div>
                                        <p className="text-sm font-medium">Default Hourly Rate</p>
                                        <p className="text-sm text-muted-foreground">${service.default_hourly_rate}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium">Budget Rollover</p>
                                    <p className="text-sm text-muted-foreground">
                                        {service.budget_rollover_enabled ? 'Enabled' : 'Disabled'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tasks */}
                    {service.tasks && service.tasks.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Associated Tasks</CardTitle>
                                <CardDescription>Tasks available for time tracking on this service</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {service.tasks.map((task) => (
                                        <Badge key={task.id} variant="outline">
                                            {task.name}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </SidebarInset>

            {/* Budget Adjustment Dialog */}
            <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Adjust Service Budget</DialogTitle>
                        <DialogDescription>
                            Create a budget adjustment for {service.name}. This will track the change history and optionally update existing budget periods.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Budget Hours</p>
                                        <p className="text-xl font-bold">{Number(service.current_budget_hours || 0).toFixed(2)}h</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Budget Amount</p>
                                        <p className="text-xl font-bold">£{Number(service.current_budget_amount || 0).toFixed(2)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="new_budget_hours">New Budget Hours</Label>
                                <Input
                                    id="new_budget_hours"
                                    type="number"
                                    step="0.01"
                                    value={budgetFormData.new_budget_hours}
                                    onChange={(e) => setBudgetFormData({...budgetFormData, new_budget_hours: e.target.value})}
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <Label htmlFor="new_budget_amount">New Budget Amount (£)</Label>
                                <Input
                                    id="new_budget_amount"
                                    type="number"
                                    step="0.01"
                                    value={budgetFormData.new_budget_amount}
                                    onChange={(e) => setBudgetFormData({...budgetFormData, new_budget_amount: e.target.value})}
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="effective_from">Effective From *</Label>
                                <Input
                                    id="effective_from"
                                    type="date"
                                    value={budgetFormData.effective_from}
                                    onChange={(e) => setBudgetFormData({...budgetFormData, effective_from: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="effective_to">Effective To (Optional)</Label>
                                <Input
                                    id="effective_to"
                                    type="date"
                                    value={budgetFormData.effective_to}
                                    onChange={(e) => setBudgetFormData({...budgetFormData, effective_to: e.target.value})}
                                />
                                <p className="text-xs text-muted-foreground mt-1">Leave empty for ongoing</p>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="reason">Reason for Adjustment *</Label>
                            <Textarea
                                id="reason"
                                value={budgetFormData.reason}
                                onChange={(e) => setBudgetFormData({...budgetFormData, reason: e.target.value})}
                                placeholder="Explain why the budget is being adjusted..."
                                rows={3}
                                required
                            />
                        </div>

                        <div className="flex items-center space-x-2 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                            <Checkbox
                                id="apply_to_existing"
                                checked={budgetFormData.apply_to_existing_periods}
                                onCheckedChange={(checked) => setBudgetFormData({...budgetFormData, apply_to_existing_periods: checked as boolean})}
                            />
                            <div>
                                <Label htmlFor="apply_to_existing" className="font-medium cursor-pointer">
                                    Apply to existing budget periods
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Update budget for all existing periods within the effective date range
                                </p>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBudgetDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleBudgetAdjustment}
                            disabled={!budgetFormData.reason || !budgetFormData.effective_from}
                        >
                            Create Budget Adjustment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
}
