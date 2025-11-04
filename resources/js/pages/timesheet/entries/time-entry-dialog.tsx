import {FormEventHandler, useEffect, useState} from 'react';
import {router} from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {route} from 'ziggy-js';

interface Customer {
    id: string;
    name: string;
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
    id?: string;
    service_id: string;
    task_id: string;
    date: string;
    start_time?: string;
    end_time?: string;
    duration_hours: number;
    description?: string;
}

interface TimeEntryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    services: Service[];
    mode: 'create' | 'edit';
    entry?: TimeEntry;
    selectedDate?: string;
    runningTimer?: TimeEntry;
}

export function TimeEntryDialog({
    open,
    onOpenChange,
    services,
    mode,
    entry,
    selectedDate,
    runningTimer,
}: TimeEntryDialogProps) {
    const [formData, setFormData] = useState({
        service_id: entry?.service_id || '',
        task_id: entry?.task_id || '',
        date: entry?.date || selectedDate || new Date().toISOString().split('T')[0],
        start_time: entry?.start_time ? new Date(entry.start_time).toTimeString().slice(0, 5) : '',
        end_time: entry?.end_time ? new Date(entry.end_time).toTimeString().slice(0, 5) : '',
        duration_hours: entry?.duration_hours?.toString() || '',
        description: entry?.description || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);
    const [showDateField, setShowDateField] = useState(false);
    const [showDurationField, setShowDurationField] = useState(false);

    // Reset form when dialog opens/closes or entry changes
    useEffect(() => {
        if (open) {
            setFormData({
                service_id: entry?.service_id || '',
                task_id: entry?.task_id || '',
                date: entry?.date || selectedDate || new Date().toISOString().split('T')[0],
                start_time: entry?.start_time ? new Date(entry.start_time).toTimeString().slice(0, 5) : '',
                end_time: entry?.end_time ? new Date(entry.end_time).toTimeString().slice(0, 5) : '',
                duration_hours: entry?.duration_hours?.toString() || '',
                description: entry?.description || '',
            });
            setErrors({});
            setShowDateField(false);
            setShowDurationField(false);
        }
    }, [open, entry, selectedDate]);

    // Auto-calculate duration when start_time or end_time changes
    useEffect(() => {
        if (formData.start_time && formData.end_time) {
            const [startHours, startMinutes] = formData.start_time.split(':').map(Number);
            const [endHours, endMinutes] = formData.end_time.split(':').map(Number);

            const startTotalMinutes = startHours * 60 + startMinutes;
            const endTotalMinutes = endHours * 60 + endMinutes;

            let durationMinutes = endTotalMinutes - startTotalMinutes;

            // Handle overnight times
            if (durationMinutes < 0) {
                durationMinutes += 24 * 60;
            }

            const durationHours = (durationMinutes / 60).toFixed(2);
            setFormData(prev => ({ ...prev, duration_hours: durationHours }));
        }
    }, [formData.start_time, formData.end_time]);

    // Get available tasks based on selected service
    const selectedService = services.find(s => s.id === formData.service_id);
    const availableTasks = selectedService?.tasks || [];

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Group services by customer
    const groupedServices = services.reduce((acc, service) => {
        const customerName = service.customer?.name || 'No Customer';
        if (!acc[customerName]) {
            acc[customerName] = [];
        }
        acc[customerName].push(service);
        return acc;
    }, {} as Record<string, Service[]>);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        // Check if user is trying to start a timer (no duration, no end time, but has start time)
        const isStartingTimer = !formData.duration_hours && !formData.end_time && formData.start_time;

        if (isStartingTimer && mode === 'create') {
            // Check if there's already a running timer
            if (runningTimer) {
                setErrors({ duration_hours: 'You already have a running timer. Please stop it first.' });
                setProcessing(false);
                return;
            }

            // Start a timer
            router.post(route('timesheet.timer.start'), {
                service_id: formData.service_id,
                task_id: formData.task_id,
                description: formData.description,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    onOpenChange(false);
                    setProcessing(false);
                },
                onError: (errors) => {
                    setErrors(errors);
                    setProcessing(false);
                },
            });
        } else {
            // Regular time entry (with duration)
            if (!formData.duration_hours) {
                setErrors({ duration_hours: 'Duration is required when not starting a timer' });
                setProcessing(false);
                return;
            }

            const submitData = {
                service_id: formData.service_id,
                task_id: formData.task_id,
                date: formData.date,
                duration_hours: parseFloat(formData.duration_hours),
                description: formData.description,
            };

            if (mode === 'create') {
                router.post(route('timesheet.entries.store'), submitData, {
                    preserveScroll: true,
                    onSuccess: () => {
                        onOpenChange(false);
                        setProcessing(false);
                    },
                    onError: (errors) => {
                        setErrors(errors);
                        setProcessing(false);
                    },
                });
            } else if (mode === 'edit' && entry?.id) {
                router.put(route('timesheet.entries.update', entry.id), submitData, {
                    preserveScroll: true,
                    onSuccess: () => {
                        onOpenChange(false);
                        setProcessing(false);
                    },
                    onError: (errors) => {
                        setErrors(errors);
                        setProcessing(false);
                    },
                });
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{mode === 'create' ? 'Add Time Entry' : 'Edit Time Entry'}</DialogTitle>
                    <DialogDescription>
                        {mode === 'create'
                            ? 'Record time spent on a task.'
                            : 'Update the time entry details.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Date */}
                        <div className="grid gap-2">
                            <Label htmlFor="date">Date *</Label>
                            {!showDateField ? (
                                <div className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
                                    <span className="text-sm">{formatDate(formData.date)}</span>
                                    <button
                                        type="button"
                                        onClick={() => setShowDateField(true)}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Change date
                                    </button>
                                </div>
                            ) : (
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            )}
                            {errors.date && (
                                <p className="text-sm text-destructive">{errors.date}</p>
                            )}
                        </div>

                        {/* Service */}
                        <div className="grid gap-2">
                            <Label htmlFor="service">Service *</Label>
                            <Select
                                value={formData.service_id}
                                onValueChange={(value) => setFormData({ ...formData, service_id: value, task_id: '' })}
                            >
                                <SelectTrigger id="service">
                                    <SelectValue placeholder="Select service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(groupedServices).map(([customerName, customerServices]) => (
                                        <SelectGroup key={customerName}>
                                            <SelectLabel className="font-semibold text-foreground">{customerName}</SelectLabel>
                                            {customerServices.map((service) => (
                                                <SelectItem key={service.id} value={service.id} className="pl-6">
                                                    {service.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.service_id && (
                                <p className="text-sm text-destructive">{errors.service_id}</p>
                            )}
                        </div>

                        {/* Task */}
                        <div className="grid gap-2">
                            <Label htmlFor="task">Task *</Label>
                            <Select
                                value={formData.task_id}
                                onValueChange={(value) => setFormData({ ...formData, task_id: value })}
                                disabled={!formData.service_id || availableTasks.length === 0}
                            >
                                <SelectTrigger id="task">
                                    <SelectValue placeholder="Select task" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableTasks.map((task) => (
                                        <SelectItem key={task.id} value={task.id}>
                                            {task.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.task_id && (
                                <p className="text-sm text-destructive">{errors.task_id}</p>
                            )}
                        </div>

                        {/* Time Range */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start_time">Start Time</Label>
                                <Input
                                    id="start_time"
                                    type="time"
                                    value={formData.start_time}
                                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="end_time">End Time</Label>
                                <Input
                                    id="end_time"
                                    type="time"
                                    value={formData.end_time}
                                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Duration - Hidden by default */}
                        {!showDurationField ? (
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Duration will be calculated from start and end times
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setShowDurationField(true)}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Edit duration manually
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-2">
                                <Label htmlFor="duration_hours">Duration (hours)</Label>
                                <Input
                                    id="duration_hours"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    value={formData.duration_hours}
                                    onChange={(e) => setFormData({ ...formData, duration_hours: e.target.value })}
                                    placeholder="Enter duration, use start/end times, or leave empty to start timer"
                                />
                                {errors.duration_hours && (
                                    <p className="text-sm text-destructive">{errors.duration_hours}</p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Leave duration empty with only a start time to start a running timer
                                </p>
                            </div>
                        )}

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="What did you work on?"
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                mode === 'create' ? (formData.start_time && !formData.end_time && !formData.duration_hours ? 'Starting Timer...' : 'Adding...') : 'Updating...'
                            ) : (
                                mode === 'create' ? (formData.start_time && !formData.end_time && !formData.duration_hours ? 'Start Timer' : 'Add Entry') : 'Update Entry'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
