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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Briefcase, Clock, DollarSign, TrendingUp, Calendar, AlertCircle, Download, FileText, ExternalLink} from 'lucide-react';
import {route} from 'ziggy-js';
import {useState, useEffect} from 'react';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer} from 'recharts';
import {ExternalReferenceBadge} from '@/components/timesheet/external-reference-badge';
import {ExternalReferenceDialog} from '@/components/timesheet/external-reference-dialog';

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

interface TimeEntry {
    id: string;
    date: string;
    user: User;
    task?: Task;
    description?: string;
    duration_hours: number;
    hourly_rate: number;
    external_reference?: string;
}

interface ReportData {
    time_entries: TimeEntry[];
    summary: {
        total_hours: number;
        total_amount: number;
        entry_count: number;
    };
}

interface Props {
    service: Service;
    currentPeriod?: BudgetPeriod;
    timeEntriesStats: TimeEntriesStats;
    budgetPeriods: BudgetPeriod[];
}

export default function CustomerServiceShow({service, currentPeriod, timeEntriesStats, budgetPeriods}: Props) {
    const [timeFrame, setTimeFrame] = useState('this_month');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedExternalReference, setSelectedExternalReference] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

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
            case 'Monthly':
                return 12;
            case 'Quarterly':
                return 4;
            case 'Yearly':
                return 1;
            case 'OneTime':
                return 1;
            default:
                return 12;
        }
    };

    const maxPeriods = getMaxPeriods();

    const chartData = budgetPeriods
        .sort((a, b) => new Date(b.period_start).getTime() - new Date(a.period_start).getTime())
        .slice(0, maxPeriods)
        .reverse()
        .map(period => ({
            period: new Date(period.period_start).toLocaleDateString('en-US', {month: 'short', year: 'numeric'}),
            budgetHours: Number(period.total_available_hours),
            usedHours: Number(period.hours_used),
        }));

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
            case 'Monthly':
                return 'Last 12 months comparison';
            case 'Quarterly':
                return 'Last 4 quarters comparison';
            case 'Yearly':
                return 'Annual comparison';
            case 'OneTime':
                return 'Project usage';
            default:
                return 'Historical comparison of budget vs. actual usage';
        }
    };

    const handleGenerateReport = async () => {
        setLoading(true);

        const filters: any = {
            time_frame: timeFrame,
        };

        if (timeFrame === 'custom') {
            filters.start_date = startDate;
            filters.end_date = endDate;
        }

        try {
            const getCookie = (name: string) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop()?.split(';').shift();
                return '';
            };

            const response = await fetch(route('customer.timesheet.services.report.generate', service.id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN') || ''),
                },
                credentials: 'same-origin',
                body: JSON.stringify(filters),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setReportData(data);
        } catch (error) {
            console.error('Failed to generate report:', error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-generate report on mount
    useEffect(() => {
        handleGenerateReport();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleExportCSV = () => {
        const filters: any = {
            time_frame: timeFrame,
        };

        if (timeFrame === 'custom') {
            filters.start_date = startDate;
            filters.end_date = endDate;
        }

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route('customer.timesheet.services.report.export', service.id);
        form.style.display = 'none';

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);

        Object.entries(filters).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value as string;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

        setTimeout(() => {
            if (form.parentNode) {
                document.body.removeChild(form);
            }
        }, 100);
    };

    const handleExternalReferenceClick = (externalReference: string) => {
        setSelectedExternalReference(externalReference);
        setDialogOpen(true);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`Service: ${service.name}`} />
                <AppSidebarHeader
                    breadcrumbs={[
                        {title: 'Dashboard', href: route('dashboard')},
                        {title: service.name, href: ''},
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
                                onClick={() => router.visit(route('customer.timesheet.services.ledger', service.id))}
                            >
                                View Ledger
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
                                                tick={{fontSize: 12}}
                                                angle={-45}
                                                textAnchor="end"
                                                height={80}
                                            />
                                            <YAxis
                                                label={{value: 'Hours', angle: -90, position: 'insideLeft'}}
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
                                        <p className="text-2xl font-bold">£{timeEntriesStats.total_amount ? Number(timeEntriesStats.total_amount).toFixed(2) : '0.00'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timesheet Report Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Timesheet Report</CardTitle>
                            <CardDescription>Generate a detailed report of time entries</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Filters */}
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="time-frame">Time Frame</Label>
                                    <Select value={timeFrame} onValueChange={setTimeFrame}>
                                        <SelectTrigger id="time-frame">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="this_month">This Month</SelectItem>
                                            <SelectItem value="last_month">Last Month</SelectItem>
                                            <SelectItem value="this_year">This Year</SelectItem>
                                            <SelectItem value="last_year">Last Year</SelectItem>
                                            <SelectItem value="custom">Custom Range</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {timeFrame === 'custom' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="start-date">Start Date</Label>
                                            <Input
                                                id="start-date"
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="end-date">End Date</Label>
                                            <Input
                                                id="end-date"
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={handleGenerateReport}
                                    disabled={loading || (timeFrame === 'custom' && (!startDate || !endDate))}
                                >
                                    {loading ? 'Generating...' : 'Generate Report'}
                                </Button>
                                {reportData && (
                                    <Button variant="outline" onClick={handleExportCSV}>
                                        <Download className="h-4 w-4 mr-2" />
                                        Export CSV
                                    </Button>
                                )}
                            </div>

                            {/* Results Table */}
                            {reportData && (
                                <div className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">
                                                    {Number(reportData.summary.total_hours || 0).toFixed(2)}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {reportData.summary.entry_count} entries
                                                </p>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
                                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">
                                                    £{Number(reportData.summary.total_amount || 0).toFixed(2)}
                                                </div>
                                                <p className="text-xs text-muted-foreground">Billable value</p>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">Entries</CardTitle>
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">
                                                    {reportData.summary.entry_count}
                                                </div>
                                                <p className="text-xs text-muted-foreground">Time entries</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>User</TableHead>
                                                    <TableHead>Task</TableHead>
                                                    <TableHead>Description</TableHead>
                                                    <TableHead>Feature</TableHead>
                                                    <TableHead className="text-right">Hours</TableHead>
                                                    <TableHead className="text-right">Cost</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {reportData.time_entries.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                                                            No time entries found
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    reportData.time_entries.map((entry) => (
                                                        <TableRow key={entry.id}>
                                                            <TableCell className="font-medium">
                                                                {formatDate(entry.date)}
                                                            </TableCell>
                                                            <TableCell>{entry.user.name}</TableCell>
                                                            <TableCell>{entry.task?.name || '-'}</TableCell>
                                                            <TableCell>
                                                                <div className="max-w-xs truncate">
                                                                    {entry.description || '-'}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <ExternalReferenceBadge
                                                                    externalReference={entry.external_reference || null}
                                                                    onClick={entry.external_reference ? () => handleExternalReferenceClick(entry.external_reference!) : undefined}
                                                                />
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                {Number(entry.duration_hours || 0).toFixed(2)}
                                                            </TableCell>
                                                            <TableCell className="text-right font-medium">
                                                                £{Number((entry.duration_hours * entry.hourly_rate) || 0).toFixed(2)}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>

            {/* External Reference Dialog */}
            {selectedExternalReference && (
                <ExternalReferenceDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    externalReference={selectedExternalReference}
                    serviceId={service.id}
                />
            )}
        </SidebarProvider>
    );
}
