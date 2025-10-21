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

export default function CreateDocumentType() {
    const [format, setFormat] = useState<'form_builder' | 'upload'>('form_builder');
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        format: 'form_builder' as 'form_builder' | 'upload',
        content: '',
        file: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('document-types.store'));
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
                <Head title="Create Document Type"/>
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
                                    <BreadcrumbPage>Create</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Create Document Type</h2>
                            <p className="text-muted-foreground">
                                Create a new document template for your organisation
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Document Type Details</CardTitle>
                                    <CardDescription>
                                        Enter the details for your new document type
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
                                        <div className="space-y-2">
                                            <Label htmlFor="file">Upload Document *</Label>
                                            <Input
                                                id="file"
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                                required
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Accepted formats: PDF, DOC, DOCX (Max 10MB)
                                            </p>
                                            {errors.file && (
                                                <p className="text-sm text-destructive">{errors.file}</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Creating...' : 'Create Document Type'}
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
