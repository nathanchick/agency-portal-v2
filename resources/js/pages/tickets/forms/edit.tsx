import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {Head, router, useForm} from '@inertiajs/react';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {FormEvent} from 'react';
import FormBuilder from '@/components/form-builder';
import {route} from 'ziggy-js';

interface TicketForm {
    id: string;
    name: string;
    content?: string;
    is_default: boolean;
}

interface Props {
    form: TicketForm;
}

export default function EditTicketForm({form}: Props) {
    const {data, setData, post, processing, errors} = useForm({
        name: form.name,
        content: form.content || '',
        _method: 'PUT',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('tickets.forms.update', form.id));
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Edit Ticket Form"/>
                <AppSidebarHeader
                    breadcrumbs={[
                        {label: 'Dashboard', href: route('dashboard')},
                        {label: 'Tickets', href: route('tickets.index')},
                        {label: 'Forms', href: route('tickets.forms.index')},
                        {label: 'Edit'},
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Edit Ticket Form</h2>
                            <p className="text-muted-foreground">
                                Update the form details and fields
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Form Details</CardTitle>
                                    <CardDescription>
                                        Update the details for this ticket form
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Form Name *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., Technical Issue Form, Billing Request"
                                            required
                                            disabled={form.is_default}
                                        />
                                        {form.is_default && (
                                            <p className="text-sm text-muted-foreground">
                                                Default form name cannot be changed
                                            </p>
                                        )}
                                        {errors.name && (
                                            <p className="text-sm text-destructive">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Form Builder</Label>
                                        <FormBuilder
                                            value={data.content}
                                            onChange={(value) => setData('content', value)}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Drag and drop fields to build your form. This form will be shown when users create tickets in categories using this form.
                                        </p>
                                        {errors.content && (
                                            <p className="text-sm text-destructive">{errors.content}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Updating...' : 'Update Form'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => router.get(route('tickets.forms.index'))}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </form>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
