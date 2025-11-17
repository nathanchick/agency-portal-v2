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
import {Textarea} from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {FormEvent, useState} from 'react';
import FormRenderer from '@/components/form-renderer';
import {FormField} from '@/components/form-builder';

interface User {
    id: string;
    name: string;
    email: string;
}

interface Document {
    id: string;
    name: string;
    format: 'form_builder' | 'upload';
    content?: string;
}

interface Customer {
    id: string;
    name: string;
}

interface Props {
    customer: Customer;
    customerUsers: User[];
    document?: Document;
    documentType: 'form_builder' | 'upload' | 'upload_pdf';
}

export default function CreateDocumentRequest({customer, customerUsers, document, documentType}: Props) {
    const [formValues, setFormValues] = useState<Record<string, any>>({});

    const formFields: FormField[] = document?.content ? (() => {
        try {
            return JSON.parse(document.content);
        } catch {
            return [];
        }
    })() : [];

    const {data, setData, post, processing, errors} = useForm({
        customer_id: customer.id,
        document_id: document?.id || null,
        user_id: '',
        cc_email: '',
        cc_name: '',
        notes: '',
        file: null as File | null,
        requires_approval: true,
        send_option: 'now' as 'now' | 'schedule',
        scheduled_send_at: '',
        content: '',
    });

    const handleFormFieldChange = (fieldId: string, value: any) => {
        const updatedValues = {...formValues, [fieldId]: value};
        setFormValues(updatedValues);
        setData('content', JSON.stringify(updatedValues));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('documents.store'));
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Create Document Request"/>
                <AppSidebarHeader
                    breadcrumbs={[
                        {title: 'Dashboard', href: '/dashboard'},
                        {title: 'Documents', href: route('documents.pending')},
                        {title: 'Create Request', href: route('documents.create')},
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Create Document Request</h2>
                            <p className="text-muted-foreground">
                                {documentType === 'upload_pdf'
                                    ? 'Upload a PDF document to share with customer'
                                    : documentType === 'form_builder'
                                    ? 'Create a form-based document request'
                                    : 'Create a document request from template'
                                }
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Customer Info Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Customer Information</CardTitle>
                                    <CardDescription>Selected customer: {customer.name}</CardDescription>
                                </CardHeader>
                            </Card>

                            {/* Recipient Details Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recipient Details</CardTitle>
                                    <CardDescription>
                                        Select who should receive this document
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="user_id">Primary Recipient *</Label>
                                        <Select
                                            value={data.user_id}
                                            onValueChange={(value) => setData('user_id', value)}
                                        >
                                            <SelectTrigger id="user_id">
                                                <SelectValue placeholder="Select user"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {customerUsers.map((user) => (
                                                    <SelectItem key={user.id} value={user.id}>
                                                        {user.name} ({user.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.user_id && (
                                            <p className="text-sm text-destructive">{errors.user_id}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cc_name">CC Name</Label>
                                            <Input
                                                id="cc_name"
                                                value={data.cc_name}
                                                onChange={(e) => setData('cc_name', e.target.value)}
                                                placeholder="Optional CC recipient name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cc_email">CC Email</Label>
                                            <Input
                                                id="cc_email"
                                                type="email"
                                                value={data.cc_email}
                                                onChange={(e) => setData('cc_email', e.target.value)}
                                                placeholder="Optional CC email address"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Document Content Card - varies by type */}
                            {documentType === 'upload_pdf' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Document Upload</CardTitle>
                                        <CardDescription>
                                            Upload the PDF document to share
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="file">Upload PDF *</Label>
                                            <Input
                                                id="file"
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                                required
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Only PDF files are accepted
                                            </p>
                                            {errors.file && (
                                                <p className="text-sm text-destructive">{errors.file}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Requires Customer Approval?</Label>
                                            <RadioGroup
                                                value={data.requires_approval ? 'yes' : 'no'}
                                                onValueChange={(value) => setData('requires_approval', value === 'yes')}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="yes" id="approval-yes"/>
                                                    <Label htmlFor="approval-yes" className="font-normal">
                                                        Yes - Requires approval (status: processing)
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="no" id="approval-no"/>
                                                    <Label htmlFor="approval-no" className="font-normal">
                                                        No - Auto-complete (status: completed)
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {documentType === 'form_builder' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{document?.name}</CardTitle>
                                        <CardDescription>
                                            Please fill out all required fields below
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {formFields.length > 0 ? (
                                            <FormRenderer
                                                fields={formFields}
                                                values={formValues}
                                                onChange={handleFormFieldChange}
                                                errors={errors}
                                            />
                                        ) : (
                                            <div className="p-4 bg-muted rounded-md">
                                                <p className="text-sm text-muted-foreground">
                                                    No form fields configured for this document template.
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {documentType === 'upload' && document && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Document Template</CardTitle>
                                        <CardDescription>
                                            Using template: {document.name}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="p-4 bg-muted rounded-md">
                                            <p className="text-sm text-muted-foreground">
                                                The pre-configured document template will be sent to the customer.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Notes Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Additional Notes</CardTitle>
                                    <CardDescription>
                                        Add any notes or instructions for this document request
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="Optional notes..."
                                        rows={4}
                                    />
                                </CardContent>
                            </Card>

                            {/* Send Options Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Send Options</CardTitle>
                                    <CardDescription>
                                        Choose when to send this document request
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <RadioGroup
                                        value={data.send_option}
                                        onValueChange={(value) => setData('send_option', value as 'now' | 'schedule')}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="now" id="send-now"/>
                                            <Label htmlFor="send-now" className="font-normal">
                                                Create and send now
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="schedule" id="send-schedule"/>
                                            <Label htmlFor="send-schedule" className="font-normal">
                                                Create and schedule send
                                            </Label>
                                        </div>
                                    </RadioGroup>

                                    {data.send_option === 'schedule' && (
                                        <div className="space-y-2">
                                            <Label htmlFor="scheduled_send_at">Schedule Send Date & Time *</Label>
                                            <Input
                                                id="scheduled_send_at"
                                                type="datetime-local"
                                                value={data.scheduled_send_at}
                                                onChange={(e) => setData('scheduled_send_at', e.target.value)}
                                                required={data.send_option === 'schedule'}
                                            />
                                            {errors.scheduled_send_at && (
                                                <p className="text-sm text-destructive">{errors.scheduled_send_at}</p>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : data.send_option === 'now' ? 'Create and Send' : 'Create and Schedule'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.get(route('documents.pending'))}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
