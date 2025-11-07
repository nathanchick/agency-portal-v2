import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Clock, DollarSign, Calendar, AlertCircle, Loader2} from 'lucide-react';
import {useState, useEffect} from 'react';
import {route} from 'ziggy-js';

interface User {
    id: string;
    name: string;
}

interface TimeEntry {
    id: string;
    date: string;
    user: User;
    description?: string;
    duration_hours: number;
    hourly_rate: number;
    billable: boolean;
}

interface ExternalReferenceData {
    service: string;
    id: string;
    permalink?: string;
}

interface ExternalReferenceSummary {
    external_reference: ExternalReferenceData;
    total_hours: number;
    total_cost: number;
    entry_count: number;
    date_range: {
        start: string;
        end: string;
    };
    time_entries: TimeEntry[];
}

interface ExternalReferenceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    externalReference: string;
    serviceId: string;
}

export function ExternalReferenceDialog({
    open,
    onOpenChange,
    externalReference,
    serviceId,
}: ExternalReferenceDialogProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ExternalReferenceSummary | null>(null);
    const [referenceData, setReferenceData] = useState<ExternalReferenceData | null>(null);

    useEffect(() => {
        if (open && externalReference) {
            fetchData();
        }
    }, [open, externalReference]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Parse the external reference
            const parsed = JSON.parse(externalReference);

            // Extract permalink from the parsed data
            const permalink = parsed.permalink;
            if (!permalink) {
                throw new Error('No permalink found in external reference');
            }

            const url = route('customer.timesheet.services.external-reference', serviceId);
            const params = new URLSearchParams({ permalink: permalink });

            const response = await fetch(
                `${url}?${params.toString()}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    credentials: 'same-origin',
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            setReferenceData(result.external_reference);
        } catch (err) {
            console.error('Failed to fetch external reference data:', err);
            setError('Failed to load feature data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {referenceData
                            ? `${referenceData.service} #${referenceData.id}`
                            : 'Feature Time Report'}
                    </DialogTitle>
                    <DialogDescription>
                        Detailed breakdown of time entries for this feature
                    </DialogDescription>
                </DialogHeader>

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
                        <AlertCircle className="h-5 w-5" />
                        <p>{error}</p>
                    </div>
                )}

                {data && !loading && !error && (
                    <div className="space-y-4">
                        {/* Summary Cards */}
                        <div className="grid gap-4 md:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {Number(data.total_hours || 0).toFixed(2)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {data.entry_count} {data.entry_count === 1 ? 'entry' : 'entries'}
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
                                        £{Number(data.total_cost || 0).toFixed(2)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Billable value</p>
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-2">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Date Range</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg font-bold">
                                        {formatDate(data.date_range.start)} - {formatDate(data.date_range.end)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Work period</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Time Entries Table */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Time Entries</CardTitle>
                                <CardDescription>
                                    All time logged for this feature
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Description</TableHead>
                                                <TableHead className="text-right">Hours</TableHead>
                                                <TableHead className="text-right">Rate</TableHead>
                                                <TableHead className="text-right">Cost</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {data.time_entries.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                                                        No time entries found
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                data.time_entries.map((entry) => (
                                                    <TableRow key={entry.id}>
                                                        <TableCell className="font-medium">
                                                            {formatDate(entry.date)}
                                                        </TableCell>
                                                        <TableCell>{entry.user.name}</TableCell>
                                                        <TableCell>
                                                            <div className="max-w-xs truncate">
                                                                {entry.description || '-'}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {Number(entry.duration_hours || 0).toFixed(2)}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            £{Number(entry.hourly_rate || 0).toFixed(2)}
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
                            </CardContent>
                        </Card>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
