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
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {Play, Edit, Trash, Globe, Lock} from 'lucide-react';
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
    filters: any;
    is_public: boolean;
    created_by: string;
    created_by_user?: User;
    created_at: string;
}

interface Props {
    savedReports: SavedReport[];
}

export default function SavedReports({savedReports}: Props) {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<SavedReport | null>(null);

    const editForm = useForm({
        name: '',
        description: '',
        filters: {},
        is_public: false,
    });

    const handleEdit = (report: SavedReport) => {
        setSelectedReport(report);
        editForm.setData({
            name: report.name,
            description: report.description || '',
            filters: report.filters,
            is_public: report.is_public,
        });
        setEditDialogOpen(true);
    };

    const submitEdit = () => {
        if (!selectedReport) return;

        editForm.put(route('timesheet.reports.saved.update', selectedReport.id), {
            onSuccess: () => {
                setEditDialogOpen(false);
                editForm.reset();
                setSelectedReport(null);
            },
        });
    };

    const handleDelete = (report: SavedReport) => {
        setSelectedReport(report);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!selectedReport) return;

        router.delete(route('timesheet.reports.saved.destroy', selectedReport.id), {
            onSuccess: () => {
                setDeleteDialogOpen(false);
                setSelectedReport(null);
            },
        });
    };

    const handleLoad = (report: SavedReport) => {
        // Redirect to reports page with loaded_report parameter
        // The reports page will fetch and apply the filters
        router.get(route('timesheet.reports.index'), {
            loaded_report: report.id,
        });
    };

    const getFilterSummary = (filters: any) => {
        const parts = [];

        if (filters.time_frame) {
            parts.push(`Time: ${filters.time_frame.replace('_', ' ')}`);
        }

        if (filters.customer_ids?.length) {
            parts.push(`${filters.customer_ids.length} customer(s)`);
        }

        if (filters.service_ids?.length) {
            parts.push(`${filters.service_ids.length} service(s)`);
        }

        if (filters.task_ids?.length) {
            parts.push(`${filters.task_ids.length} task(s)`);
        }

        if (filters.user_ids?.length) {
            parts.push(`${filters.user_ids.length} user(s)`);
        }

        return parts.join(', ') || 'No filters';
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Saved Reports"/>
                <AppSidebarHeader
                    breadcrumbs={[
                        { label: 'Dashboard', href: route('dashboard') },
                        { label: 'Reports', href: route('timesheet.reports.index') },
                        { label: 'Saved Reports' },
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Saved Reports</h2>
                            <p className="text-muted-foreground">
                                Quickly load and run your saved report configurations
                            </p>
                        </div>
                    </div>

                    {savedReports.length === 0 && (
                        <Card>
                            <CardContent className="flex items-center justify-center h-96">
                                <div className="text-center text-muted-foreground">
                                    <p>No saved reports yet</p>
                                    <p className="text-sm mt-2">
                                        Create a report and click "Save Report" to save it here
                                    </p>
                                    <Button
                                        className="mt-4"
                                        onClick={() => router.get(route('timesheet.reports.index'))}
                                    >
                                        Create Report
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {savedReports.map((report) => (
                            <Card key={report.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="flex items-center gap-2">
                                                {report.name}
                                                {report.is_public ? (
                                                    <Badge variant="secondary" className="text-xs">
                                                        <Globe className="h-3 w-3 mr-1"/>
                                                        Public
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-xs">
                                                        <Lock className="h-3 w-3 mr-1"/>
                                                        Private
                                                    </Badge>
                                                )}
                                            </CardTitle>
                                            {report.description && (
                                                <CardDescription className="mt-2">
                                                    {report.description}
                                                </CardDescription>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-sm text-muted-foreground">
                                        <p className="mb-1">
                                            <strong>Filters:</strong> {getFilterSummary(report.filters)}
                                        </p>
                                        <p>
                                            <strong>Created by:</strong> {report.created_by_user?.name || 'Unknown'}
                                        </p>
                                        <p className="text-xs mt-1">
                                            {new Date(report.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleLoad(report)}
                                        >
                                            <Play className="h-4 w-4 mr-2"/>
                                            Load
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(report)}
                                        >
                                            <Edit className="h-4 w-4"/>
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(report)}
                                        >
                                            <Trash className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Edit Dialog */}
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Saved Report</DialogTitle>
                            <DialogDescription>
                                Update the name, description, or visibility of this saved report
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Name</Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                />
                                {editForm.errors.name && (
                                    <p className="text-sm text-destructive">{editForm.errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    value={editForm.data.description}
                                    onChange={(e) => editForm.setData('description', e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="edit-public"
                                    checked={editForm.data.is_public}
                                    onCheckedChange={(checked) =>
                                        editForm.setData('is_public', checked as boolean)
                                    }
                                />
                                <label
                                    htmlFor="edit-public"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Make this report public for my team
                                </label>
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
                                This will permanently delete the saved report "{selectedReport?.name}".
                                This action cannot be undone.
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
