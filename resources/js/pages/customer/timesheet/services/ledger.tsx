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
import {ArrowLeft, CheckCircle, AlertCircle, Clock} from 'lucide-react';
import {route} from 'ziggy-js';

interface Customer {
    id: string;
    name: string;
}

interface Project {
    id: string;
    name: string;
}

interface Service {
    id: string;
    name: string;
    customer: Customer;
    project?: Project;
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

interface PaginatedBudgetPeriods {
    data: BudgetPeriod[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links?: any[];
}

interface Props {
    service: Service;
    budgetPeriods: PaginatedBudgetPeriods;
}

export default function CustomerServiceLedger({service, budgetPeriods}: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const getStatusBadge = (period: BudgetPeriod) => {
        const remaining = Number(period.remaining_hours);
        const isOverBudget = remaining < 0;
        const isPeriodEnded = new Date(period.period_end) < new Date();

        if (isOverBudget) {
            return (
                <Badge variant="destructive" className="gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Over Budget
                </Badge>
            );
        }

        if (isPeriodEnded && period.reconciled) {
            return (
                <Badge variant="secondary" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Reconciled
                </Badge>
            );
        }

        if (isPeriodEnded) {
            return (
                <Badge variant="outline" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Completed
                </Badge>
            );
        }

        return (
            <Badge variant="default" className="gap-1">
                <Clock className="h-3 w-3" />
                Active
            </Badge>
        );
    };

    const getUsagePercentage = (period: BudgetPeriod) => {
        const total = Number(period.total_available_hours);
        const used = Number(period.hours_used);
        if (total === 0) return 0;
        return Math.min((used / total) * 100, 100);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`Budget Ledger: ${service.name}`} />
                <AppSidebarHeader
                    breadcrumbs={[
                        {title: 'Dashboard', href: route('dashboard')},
                        {title: service.name, href: route('customer.timesheet.services.show', service.id)},
                        {title: 'Budget Ledger', href: ''},
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.visit(route('customer.timesheet.services.show', service.id))}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Service
                        </Button>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">{service.name}</h1>
                        <p className="text-sm text-muted-foreground">
                            {service.customer.name} {service.project && `• ${service.project.name}`}
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Budget Ledger</CardTitle>
                            <CardDescription>
                                Historical view of all budget periods for this service
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Period</TableHead>
                                            <TableHead className="text-right">Budget Hours</TableHead>
                                            <TableHead className="text-right">Rollover</TableHead>
                                            <TableHead className="text-right">Total Available</TableHead>
                                            <TableHead className="text-right">Used Hours</TableHead>
                                            <TableHead className="text-right">Remaining</TableHead>
                                            <TableHead>Usage</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {budgetPeriods.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                                                    No budget periods found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            budgetPeriods.data.map((period) => {
                                                const isOverBudget = Number(period.remaining_hours) < 0;
                                                const usagePercentage = getUsagePercentage(period);

                                                return (
                                                    <TableRow key={period.id}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-col">
                                                                <span>{formatDate(period.period_start)}</span>
                                                                <span className="text-xs text-muted-foreground">
                                                                    to {formatDate(period.period_end)}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {Number(period.budget_hours).toFixed(2)}h
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {Number(period.hours_rollover_from_previous) > 0 ? (
                                                                <span className="text-green-600 font-medium">
                                                                    +{Number(period.hours_rollover_from_previous).toFixed(2)}h
                                                                </span>
                                                            ) : (
                                                                <span className="text-muted-foreground">-</span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right font-medium">
                                                            {Number(period.total_available_hours).toFixed(2)}h
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {Number(period.hours_used).toFixed(2)}h
                                                        </TableCell>
                                                        <TableCell className={`text-right font-medium ${isOverBudget ? 'text-destructive' : 'text-green-600'}`}>
                                                            {Number(period.remaining_hours).toFixed(2)}h
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="w-full max-w-[120px]">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                                                        <div
                                                                            className={`h-full ${isOverBudget ? 'bg-destructive' : 'bg-primary'}`}
                                                                            style={{width: `${usagePercentage}%`}}
                                                                        />
                                                                    </div>
                                                                    <span className="text-xs text-muted-foreground min-w-[40px] text-right">
                                                                        {usagePercentage.toFixed(0)}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {getStatusBadge(period)}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {budgetPeriods.links && budgetPeriods.links.length > 3 && (
                                <div className="flex items-center justify-center gap-2 mt-4">
                                    {budgetPeriods.links.map((link: any, index: number) => (
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
                        </CardContent>
                    </Card>

                    {/* Summary Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Legend</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Badge variant="default" className="gap-1">
                                    <Clock className="h-3 w-3" />
                                    Active
                                </Badge>
                                <span className="text-sm text-muted-foreground">Period is currently active</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    Completed
                                </Badge>
                                <span className="text-sm text-muted-foreground">Period has ended</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="gap-1">
                                    <CheckCircle className="h-3 w-3" />
                                    Reconciled
                                </Badge>
                                <span className="text-sm text-muted-foreground">Period has been reconciled and closed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant="destructive" className="gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    Over Budget
                                </Badge>
                                <span className="text-sm text-muted-foreground">Period has exceeded available budget hours</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
