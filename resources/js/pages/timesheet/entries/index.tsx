import {Head, router} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
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
import {Badge} from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Clock, Plus, Play, Square, Edit, Trash2, ChevronLeft, ChevronRight, Calendar} from 'lucide-react';
import {useState, useEffect} from 'react';
import {route} from 'ziggy-js';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {TimeEntryDialog} from './time-entry-dialog';

interface Customer {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface Task {
    id: string;
    name: string;
}

interface Service {
    id: string;
    name: string;
    customer?: Customer;
    tasks: Task[];
}

interface TimeEntry {
    id: string;
    service: Service;
    task: Task;
    date: string;
    duration_hours: number;
    description?: string;
    billable: boolean;
    timer_running: boolean;
    start_time?: string;
    end_time?: string;
}

interface Props {
    timeEntries: Record<string, TimeEntry[]>;
    services: Service[];
    runningTimer?: TimeEntry & { elapsed_seconds: number };
    weekStart: string;
    weekEnd: string;
    previousWeek: string;
    nextWeek: string;
    isCurrentWeek: boolean;
    dailyTotals: Record<string, number>;
    weeklyTotal: number;
    currentUserRole?: string;
    organisationUsers: User[];
    selectedUserId: string;
}

export default function TimeEntriesIndex({
    timeEntries,
    services,
    runningTimer,
    weekStart,
    weekEnd,
    previousWeek,
    nextWeek,
    isCurrentWeek,
    dailyTotals,
    weeklyTotal,
    currentUserRole,
    organisationUsers,
    selectedUserId,
}: Props) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showStopDialog, setShowStopDialog] = useState(false);
    const [stopDescription, setStopDescription] = useState('');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
    const [showEntryDialog, setShowEntryDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
    const [editingEntry, setEditingEntry] = useState<TimeEntry | undefined>(undefined);
    const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

    // Timer countdown effect
    useEffect(() => {
        if (!runningTimer) return;

        const calculateElapsed = () => {
            const startTime = new Date(runningTimer.start_time!).getTime();
            const now = new Date().getTime();
            return Math.floor((now - startTime) / 1000);
        };

        setElapsedTime(calculateElapsed());

        const interval = setInterval(() => {
            setElapsedTime(calculateElapsed());
        }, 1000);

        return () => clearInterval(interval);
    }, [runningTimer]);

    const formatElapsedTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatWeekRange = () => {
        const start = new Date(weekStart);
        const end = new Date(weekEnd);
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', options)}`;
    };

    const handleUserChange = (userId: string) => {
        router.get(route('timesheet.entries.index'), {
            user_id: userId,
            week_start: weekStart,
        });
    };

    const handleWeekNavigation = (newWeekStart: string) => {
        const params: any = { week_start: newWeekStart };
        if (selectedUserId && currentUserRole !== 'User') {
            params.user_id = selectedUserId;
        }
        router.get(route('timesheet.entries.index'), params);
    };

    const handleToday = () => {
        const params: any = {};
        if (selectedUserId && currentUserRole !== 'User') {
            params.user_id = selectedUserId;
        }
        router.get(route('timesheet.entries.index'), params);
    };

    const handleStopTimer = () => {
        if (!runningTimer) return;

        router.post(
            route('timesheet.timer.stop', runningTimer.id),
            { description: stopDescription },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowStopDialog(false);
                    setStopDescription('');
                },
            }
        );
    };

    const handleAddEntry = (date: string) => {
        setSelectedDate(date);
        setDialogMode('create');
        setEditingEntry(undefined);
        setShowEntryDialog(true);
    };

    const handleEditEntry = (entry: TimeEntry) => {
        setDialogMode('edit');
        setEditingEntry({
            id: entry.id,
            service_id: entry.service.id,
            task_id: entry.task.id,
            date: entry.date,
            duration_hours: entry.duration_hours,
            description: entry.description,
            billable: entry.billable,
            timer_running: entry.timer_running,
            start_time: entry.start_time,
            end_time: entry.end_time,
        } as TimeEntry);
        setShowEntryDialog(true);
    };

    const handleDelete = (entryId: string) => {
        setEntryToDelete(entryId);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (entryToDelete) {
            router.delete(route('timesheet.entries.destroy', entryToDelete), {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setEntryToDelete(null);
                },
            });
        }
    };

    const getDayOfWeek = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    };

    const getWeekDates = () => {
        const dates = [];
        const start = new Date(weekStart);
        for (let i = 0; i < 7; i++) {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
    };

    const selectedUser = organisationUsers.find(u => u.id === selectedUserId);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title="Time Entries" />
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={route('dashboard')}>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Time Entries</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* Header with User Selector and Week Navigation */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {currentUserRole && currentUserRole !== 'User' && organisationUsers.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">Viewing:</span>
                                    <Select value={selectedUserId} onValueChange={handleUserChange}>
                                        <SelectTrigger className="w-[250px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {organisationUsers.map((user) => (
                                                <SelectItem key={user.id} value={user.id}>
                                                    {user.name} ({user.role})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleWeekNavigation(previousWeek)}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="text-center min-w-[200px]">
                                <div className="font-semibold">{formatWeekRange()}</div>
                                {isCurrentWeek && (
                                    <Badge variant="outline" className="mt-1 text-xs">This Week</Badge>
                                )}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleWeekNavigation(nextWeek)}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            {!isCurrentWeek && (
                                <Button variant="outline" onClick={handleToday}>
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Today
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Running Timer Card */}
                    {runningTimer && (
                        <div className="bg-primary/10 border-primary border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="font-semibold">Timer Running</span>
                                    </div>
                                    <p className="text-sm mt-1">
                                        <span className="font-semibold text-muted-foreground">{runningTimer.service.customer?.name && `${runningTimer.service.customer.name}`} </span>
                                    </p>
                                    <p className="text-sm mt-1">
                                        <span className="text-muted-foreground">{runningTimer.service.name} • {runningTimer.task.name}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl font-mono font-bold">
                                        {formatElapsedTime(elapsedTime)}
                                    </div>
                                    <Button onClick={() => setShowStopDialog(true)} variant="destructive">
                                        <Square className="h-4 w-4 mr-2" />
                                        Stop
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Week View */}
                    <div className="border rounded-lg overflow-hidden">
                        {getWeekDates().map((date) => {
                            const entries = timeEntries[date] || [];
                            const total = dailyTotals[date] || 0;
                            const isToday = date === new Date().toISOString().split('T')[0];

                            return (
                                <div key={date} className={`border-b last:border-b-0 ${isToday ? 'bg-primary/5' : ''}`}>
                                    <div className="flex">
                                        {/* Date Column */}
                                        <div className="w-48 p-4 border-r bg-muted/30">
                                            <div className="font-semibold">{getDayOfWeek(date)}</div>
                                            <div className="text-sm text-muted-foreground">{formatDate(date)}</div>
                                        </div>

                                        {/* Entries Column */}
                                        <div className="flex-1 p-4">
                                            {/* Existing Entries */}
                                            {entries.map((entry) => (
                                                <div key={entry.id} className={`flex justify-between items-center mb-2 p-2 rounded ${entry.timer_running ? 'bg-primary/10 border border-primary' : 'hover:bg-muted/50'}`}>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            {entry.timer_running && (
                                                                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                                            )}
                                                            {entry.service.customer?.name && (
                                                                <>
                                                                    <span className="font-medium text-muted-foreground">{entry.service.customer.name}</span>
                                                                    <span className="text-muted-foreground">•</span>
                                                                </>
                                                            )}
                                                            <span className="font-medium">{entry.service.name}</span>
                                                            <span className="text-muted-foreground">•</span>
                                                            <span>{entry.task.name}</span>
                                                            {entry.billable && <Badge variant="outline" className="text-xs">Billable</Badge>}
                                                            {entry.timer_running && <Badge variant="default" className="text-xs">Timer Running</Badge>}
                                                        </div>
                                                        {entry.description && (
                                                            <p className="text-sm text-muted-foreground">{entry.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono font-semibold">{entry.duration_hours.toFixed(2)}h</span>
                                                        {!entry.timer_running && (
                                                            <>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleEditEntry(entry)}
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleDelete(entry.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Add Entry Button - Only show for today and past dates */}
                                            {new Date(date) <= new Date(new Date().toDateString()) ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleAddEntry(date)}
                                                    className="text-muted-foreground"
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add Entry
                                                </Button>
                                            ) : (
                                                <p className="text-xs text-muted-foreground italic py-2">
                                                    Time entries cannot be logged for future dates
                                                </p>
                                            )}
                                        </div>

                                        {/* Total Column */}
                                        <div className="w-24 p-4 border-l text-right">
                                            <div className="font-mono font-semibold">{total.toFixed(2)}h</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Weekly Total */}
                        <div className="bg-muted/50 p-4 flex justify-end items-center gap-4">
                            <span className="font-semibold">Weekly Total:</span>
                            <span className="text-2xl font-mono font-bold">{weeklyTotal.toFixed(2)}h</span>
                        </div>
                    </div>
                </div>
            </SidebarInset>

            {/* Stop Timer Dialog */}
            <Dialog open={showStopDialog} onOpenChange={setShowStopDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Stop Timer</DialogTitle>
                        <DialogDescription>
                            Add a description for this time entry before stopping the timer.
                        </DialogDescription>
                    </DialogHeader>
                    <Textarea
                        value={stopDescription}
                        onChange={(e) => setStopDescription(e.target.value)}
                        placeholder="What did you work on?"
                        rows={3}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowStopDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleStopTimer} variant="destructive">
                            <Square className="h-4 w-4 mr-2" />
                            Stop Timer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Time Entry</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this time entry? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete} variant="destructive">
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Time Entry Dialog */}
            <TimeEntryDialog
                open={showEntryDialog}
                onOpenChange={setShowEntryDialog}
                services={services}
                mode={dialogMode}
                entry={editingEntry}
                selectedDate={selectedDate}
                runningTimer={runningTimer}
            />
        </SidebarProvider>
    );
}
