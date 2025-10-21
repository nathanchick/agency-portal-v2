import {AppSidebar} from '@/components/app-sidebar';
import {Head, router, useForm} from '@inertiajs/react';
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
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
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
import {FormEvent, useState} from 'react';
import FormBuilder from '@/components/form-builder';

interface Document {
    id: string;
    name: string;
    format: 'form_builder' | 'upload';
    filename?: string;
    content?: string;
}

interface Props {
    document: Document;
}

export default function EditDocumentType({document}: Props) {
    const [format, setFormat] = useState<'form_builder' | 'upload'>(document.format);
    const {data, setData, post, processing, errors} = useForm({
        name: document.name,
        format: document.format,
        content: document.content || '',
        file: null as File | null,
        _method: 'PUT',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('document-types.update', document.id));
    };

    const handleFormatChange = (value: string) => {
        const newFormat = value as 'form_builder' | 'upload';
        setFormat(newFormat);
        setData('format', newFormat);
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Edit Document Type"/>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/dashboard">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={route('document-types.index')}>
                                        Document Types
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Edit</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Edit Document Type</h2>
                            <p className="text-muted-foreground">
                                Update the document template details
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Document Type Details</CardTitle>
                                    <CardDescription>
                                        Update the details for this document type
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Document Name *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., User Acceptance Form"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-destructive">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="format">Format *</Label>
                                        <Select
                                            value={format}
                                            onValueChange={handleFormatChange}
                                        >
                                            <SelectTrigger id="format">
                                                <SelectValue placeholder="Select format"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="form_builder">Form Builder</SelectItem>
                                                <SelectItem value="upload">Upload Document</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.format && (
                                            <p className="text-sm text-destructive">{errors.format}</p>
                                        )}
                                    </div>

                                    {format === 'form_builder' ? (
                                        <div className="space-y-2">
                                            <Label>Form Builder</Label>
                                            <FormBuilder
                                                value={data.content}
                                                onChange={(value) => setData('content', value)}
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Drag and drop fields to build your form
                                            </p>
                                            {errors.content && (
                                                <p className="text-sm text-destructive">{errors.content}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {document.filename && (
                                                <div className="space-y-2">
                                                    <Label>Current Document</Label>
                                                    <div className="rounded-md border bg-muted/50 p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={1.5}
                                                                        stroke="currentColor"
                                                                        className="h-5 w-5 text-primary"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium">{document.filename}</p>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        Uploaded document
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => window.open(route('document-types.preview', document.id), '_blank')}
                                                                >
                                                                    Preview
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => window.location.href = route('document-types.download', document.id)}
                                                                >
                                                                    Download
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="space-y-2">
                                                <Label htmlFor="file">
                                                    {document.filename ? 'Replace Document' : 'Upload Document'}
                                                </Label>
                                                <Input
                                                    id="file"
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                                />
                                                <p className="text-sm text-muted-foreground">
                                                    Accepted formats: PDF, DOC, DOCX (Max 10MB).
                                                    {document.filename && ' Leave empty to keep current file.'}
                                                </p>
                                                {errors.file && (
                                                    <p className="text-sm text-destructive">{errors.file}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Updating...' : 'Update Document Type'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => router.get(route('document-types.index'))}
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
