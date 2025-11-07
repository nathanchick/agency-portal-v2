import {Head, router} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Plus, Edit, Trash, Power, PowerOff, Calendar, Clock, Mail} from 'lucide-react';
import {useState} from 'react';
import {route} from 'ziggy-js';
import {useForm} from '@inertiajs/react';

interface User {
    id: string;
    name: string;
    email: string;
}

interface SavedReport {
    id: string;
    name: string;
    description?: string;
}

interface ScheduledReport {
    id: string;
    saved_report_id: string;
    saved_report: SavedReport;
    recipients: string[];
    schedule_frequency: 'daily' | 'weekly' | 'monthly';
    schedule_day?: number;
    schedule_time: string;
    last_sent_at?: string;
    next_run_at: string;
    is_active: boolean;
    format: 'csv' | 'pdf';
    created_by: string;
    created_by_user?: User;
    created_at: string;
}

interface Props {
    scheduledReports: ScheduledReport[];
    savedReports: SavedReport[];
}

export default function ScheduledReports({scheduledReports, savedReports}: Props) {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<ScheduledReport | null>(null);

    const createForm = useForm({
        saved_report_id: '',
        recipients: [''],
        schedule_frequency: 'daily' as 'daily' | 'weekly' | 'monthly',
        schedule_day: '',
        schedule_time: '09:00',
        format: 'csv' as 'csv' | 'pdf',
    });

    const editForm = useForm({
        recipients: [''],
        schedule_frequency: 'daily' as 'daily' | 'weekly' | 'monthly',
        schedule_day: '',
        schedule_time: '09:00',
        format: 'csv' as 'csv' | 'pdf',
    });

    const handleCreate = () => {
        createForm.reset();
        createForm.setData('recipients', ['']);
        setCreateDialogOpen(true);
    };

    const submitCreate = () => {
        // Filter out empty recipients
        const recipients = createForm.data.recipients.filter((r) => r.trim() !== '');

        createForm.transform((data) => ({
            ...data,
            recipients,
        }));

        createForm.post(route('timesheet.reports.scheduled.store'), {
            onSuccess: () => {
                setCreateDialogOpen(false);
                createForm.reset();
            },
        });
    };

    const handleEdit = (schedule: ScheduledReport) => {
        setSelectedSchedule(schedule);
        editForm.setData({
            recipients: schedule.recipients,
            schedule_frequency: schedule.schedule_frequency,
            schedule_day: schedule.schedule_day?.toString() || '',
            schedule_time: schedule.schedule_time,
            format: schedule.format,
        });
        setEditDialogOpen(true);
    };

    const submitEdit = () => {
        if (!selectedSchedule) return;

        const recipients = editForm.data.recipients.filter((r) => r.trim() !== '');

        editForm.transform((data) => ({
            ...data,
            recipients,
        }));

        editForm.put(route('timesheet.reports.scheduled.update', selectedSchedule.id), {
            onSuccess: () => {
                setEditDialogOpen(false);
                editForm.reset();
                setSelectedSchedule(null);
            },
        });
    };

    const handleDelete = (schedule: ScheduledReport) => {
        setSelectedSchedule(schedule);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!selectedSchedule) return;

        router.delete(route('timesheet.reports.scheduled.destroy', selectedSchedule.id), {
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setSelectedSchedule(null);
            },
        });
    };

    const handleToggle = (schedule: ScheduledReport) => {
        router.post(route('timesheet.reports.scheduled.toggle', schedule.id));
    };

    const addRecipient = (form: typeof createForm) => {
        form.setData('recipients', [...form.data.recipients, '']);
    };

    const removeRecipient = (form: typeof createForm, index: number) => {
        const newRecipients = form.data.recipients.filter((_, i) => i !== index);
        form.setData('recipients', newRecipients);
    };

    const updateRecipient = (form: typeof createForm, index: number, value: string) => {
        const newRecipients = [...form.data.recipients];
        newRecipients[index] = value;
        form.setData('recipients', newRecipients);
    };

    const getScheduleDescription = (schedule: ScheduledReport) => {
        const time = schedule.schedule_time;
        let desc = '';

        switch (schedule.schedule_frequency) {
            case 'daily':
                desc = `Daily at ${time}`;
                break;
            case 'weekly':
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                desc = `Weekly on ${days[schedule.schedule_day || 0]} at ${time}`;
                break;
            case 'monthly':
                desc = `Monthly on day ${schedule.schedule_day} at ${time}`;
                break;
        }

        return desc;
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Scheduled Reports"/>
                <AppSidebarHeader
                    breadcrumbs={[
                        { label: 'Dashboard', href: route('dashboard') },
                        { label: 'Reports', href: route('timesheet.reports.index') },
                        { label: 'Scheduled Reports' },
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Scheduled Reports</h2>
                            <p className="text-muted-foreground">
                                Automate report delivery via email
                            </p>
                        </div>
                        <Button onClick={handleCreate}>
                            <Plus className="h-4 w-4 mr-2"/>
                            Schedule Report
                        </Button>
                    </div>

                    {scheduledReports.length === 0 && (
                        <Card>
                            <CardContent className="flex items-center justify-center h-96">
                                <div className="text-center text-muted-foreground">
                                    <Calendar className="h-16 w-16 mx-auto mb-4 opacity-20"/>
                                    <p>No scheduled reports yet</p>
                                    <p className="text-sm mt-2">
                                        Schedule automatic delivery of saved reports via email
                                    </p>
                                    <Button className="mt-4" onClick={handleCreate}>
                                        <Plus className="h-4 w-4 mr-2"/>
                                        Create Schedule
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {scheduledReports.map((schedule) => (
                            <Card key={schedule.id} className={!schedule.is_active ? 'opacity-60' : ''}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="flex items-center gap-2">
                                                {schedule.saved_report.name}
                                                {schedule.is_active ? (
                                                    <Badge variant="default" className="text-xs">
                                                        <Power className="h-3 w-3 mr-1"/>
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="text-xs">
                                                        <PowerOff className="h-3 w-3 mr-1"/>
                                                        Paused
                                                    </Badge>
                                                )}
                                            </CardTitle>
                                            {schedule.saved_report.description && (
                                                <CardDescription className="mt-2">
                                                    {schedule.saved_report.description}
                                                </CardDescription>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground"/>
                                            <span>{getScheduleDescription(schedule)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground"/>
                                            <span>{schedule.recipients.length} recipient(s)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground"/>
                                            <span className="text-xs text-muted-foreground">
                                                Next run: {new Date(schedule.next_run_at).toLocaleString()}
                                            </span>
                                        </div>
                                        {schedule.last_sent_at && (
                                            <div className="text-xs text-muted-foreground">
                                                Last sent: {new Date(schedule.last_sent_at).toLocaleString()}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant={schedule.is_active ? 'outline' : 'default'}
                                            className="flex-1"
                                            onClick={() => handleToggle(schedule)}
                                        >
                                            {schedule.is_active ? (
                                                <>
                                                    <PowerOff className="h-4 w-4 mr-2"/>
                                                    Pause
                                                </>
                                            ) : (
                                                <>
                                                    <Power className="h-4 w-4 mr-2"/>
                                                    Activate
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(schedule)}
                                        >
                                            <Edit className="h-4 w-4"/>
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(schedule)}
                                        >
                                            <Trash className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Create Dialog */}
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Schedule Report Delivery</DialogTitle>
                            <DialogDescription>
                                Configure automatic email delivery of a saved report
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="saved-report">Saved Report</Label>
                                <Select
                                    value={createForm.data.saved_report_id}
                                    onValueChange={(value) => createForm.setData('saved_report_id', value)}
                                >
                                    <SelectTrigger id="saved-report">
                                        <SelectValue placeholder="Select a saved report"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {savedReports.map((report) => (
                                            <SelectItem key={report.id} value={report.id}>
                                                {report.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {createForm.errors.saved_report_id && (
                                    <p className="text-sm text-destructive">{createForm.errors.saved_report_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Recipients</Label>
                                {createForm.data.recipients.map((recipient, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            type="email"
                                            value={recipient}
                                            onChange={(e) => updateRecipient(createForm, index, e.target.value)}
                                            placeholder="email@example.com"
                                        />
                                        {createForm.data.recipients.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeRecipient(createForm, index)}
                                            >
                                                <Trash className="h-4 w-4"/>
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addRecipient(createForm)}
                                >
                                    <Plus className="h-4 w-4 mr-2"/>
                                    Add Recipient
                                </Button>
                                {createForm.errors.recipients && (
                                    <p className="text-sm text-destructive">{createForm.errors.recipients}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="frequency">Frequency</Label>
                                    <Select
                                        value={createForm.data.schedule_frequency}
                                        onValueChange={(value: any) => createForm.setData('schedule_frequency', value)}
                                    >
                                        <SelectTrigger id="frequency">
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {createForm.data.schedule_frequency === 'weekly' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="day-of-week">Day of Week</Label>
                                        <Select
                                            value={createForm.data.schedule_day}
                                            onValueChange={(value) => createForm.setData('schedule_day', value)}
                                        >
                                            <SelectTrigger id="day-of-week">
                                                <SelectValue placeholder="Select day"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">Sunday</SelectItem>
                                                <SelectItem value="1">Monday</SelectItem>
                                                <SelectItem value="2">Tuesday</SelectItem>
                                                <SelectItem value="3">Wednesday</SelectItem>
                                                <SelectItem value="4">Thursday</SelectItem>
                                                <SelectItem value="5">Friday</SelectItem>
                                                <SelectItem value="6">Saturday</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {createForm.data.schedule_frequency === 'monthly' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="day-of-month">Day of Month</Label>
                                        <Input
                                            id="day-of-month"
                                            type="number"
                                            min="1"
                                            max="31"
                                            value={createForm.data.schedule_day}
                                            onChange={(e) => createForm.setData('schedule_day', e.target.value)}
                                            placeholder="1-31"
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="time">Time</Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        value={createForm.data.schedule_time}
                                        onChange={(e) => createForm.setData('schedule_time', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="format">Format</Label>
                                    <Select
                                        value={createForm.data.format}
                                        onValueChange={(value: any) => createForm.setData('format', value)}
                                    >
                                        <SelectTrigger id="format">
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="csv">CSV</SelectItem>
                                            <SelectItem value="pdf" disabled>PDF (Coming Soon)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={submitCreate} disabled={createForm.processing}>
                                {createForm.processing ? 'Creating...' : 'Create Schedule'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Dialog */}
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Scheduled Report</DialogTitle>
                            <DialogDescription>
                                Update the delivery schedule and recipients
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Recipients</Label>
                                {editForm.data.recipients.map((recipient, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            type="email"
                                            value={recipient}
                                            onChange={(e) => updateRecipient(editForm, index, e.target.value)}
                                            placeholder="email@example.com"
                                        />
                                        {editForm.data.recipients.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeRecipient(editForm, index)}
                                            >
                                                <Trash className="h-4 w-4"/>
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addRecipient(editForm)}
                                >
                                    <Plus className="h-4 w-4 mr-2"/>
                                    Add Recipient
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-frequency">Frequency</Label>
                                    <Select
                                        value={editForm.data.schedule_frequency}
                                        onValueChange={(value: any) => editForm.setData('schedule_frequency', value)}
                                    >
                                        <SelectTrigger id="edit-frequency">
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {editForm.data.schedule_frequency === 'weekly' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-day-of-week">Day of Week</Label>
                                        <Select
                                            value={editForm.data.schedule_day}
                                            onValueChange={(value) => editForm.setData('schedule_day', value)}
                                        >
                                            <SelectTrigger id="edit-day-of-week">
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">Sunday</SelectItem>
                                                <SelectItem value="1">Monday</SelectItem>
                                                <SelectItem value="2">Tuesday</SelectItem>
                                                <SelectItem value="3">Wednesday</SelectItem>
                                                <SelectItem value="4">Thursday</SelectItem>
                                                <SelectItem value="5">Friday</SelectItem>
                                                <SelectItem value="6">Saturday</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {editForm.data.schedule_frequency === 'monthly' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-day-of-month">Day of Month</Label>
                                        <Input
                                            id="edit-day-of-month"
                                            type="number"
                                            min="1"
                                            max="31"
                                            value={editForm.data.schedule_day}
                                            onChange={(e) => editForm.setData('schedule_day', e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="edit-time">Time</Label>
                                    <Input
                                        id="edit-time"
                                        type="time"
                                        value={editForm.data.schedule_time}
                                        onChange={(e) => editForm.setData('schedule_time', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="edit-format">Format</Label>
                                    <Select
                                        value={editForm.data.format}
                                        onValueChange={(value: any) => editForm.setData('format', value)}
                                    >
                                        <SelectTrigger id="edit-format">
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="csv">CSV</SelectItem>
                                            <SelectItem value="pdf" disabled>PDF (Coming Soon)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={submitEdit} disabled={editForm.processing}>
                                {editForm.processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure?</DialogTitle>
                            <DialogDescription>
                                This will permanently delete the scheduled report for "
                                {selectedSchedule?.saved_report.name}". This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </SidebarInset>
        </SidebarProvider>
    );
}
