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
import {Textarea} from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Info} from 'lucide-react';
import {FormEvent} from 'react';
import {route} from 'ziggy-js';
import FormRenderer from '@/components/form-renderer';
import {FormField} from '@/components/form-builder';

interface Customer {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
    form?: {
        id: string;
        name: string;
        content: string;
    };
}

interface Label {
    id: string;
    name: string;
}

interface Props {
    customer: Customer;
    categories: Category[];
    labels: Label[];
    selectedCategory?: Category;
}

export default function CreateTicket({customer, categories, labels, selectedCategory}: Props) {
    const {data, setData, post, processing, errors} = useForm({
        customer_id: customer.id,
        category_ids: selectedCategory ? [selectedCategory.id] : [],
        label_ids: [],
        title: '',
        priority: 'medium',
        message: '',
        metadata: {},
    });

    // Get the currently selected category to show its form
    const currentCategory = categories.find(c => data.category_ids.includes(c.id));

    // Parse form fields from category form content
    const formFields: FormField[] = currentCategory?.form?.content ? (() => {
        try {
            return JSON.parse(currentCategory.form.content);
        } catch {
            return [];
        }
    })() : [];

    const handleFormFieldChange = (fieldId: string, value: any) => {
        setData('metadata', {
            ...data.metadata,
            [fieldId]: value,
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('customer.tickets.store'));
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Create Ticket"/>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={route('dashboard')}>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={route('customer.tickets.view')}>
                                        Tickets
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
                            <h2 className="text-3xl font-bold tracking-tight">Create Ticket</h2>
                            <p className="text-muted-foreground">
                                Create a new ticket for {customer.name}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ticket Details</CardTitle>
                                    <CardDescription>
                                        Fill out the information below to create a ticket
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Brief description of the issue"
                                            required
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-destructive">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Priority */}
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor="priority">Priority *</Label>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-4 w-4 text-muted-foreground cursor-help"/>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="max-w-xs">
                                                        <div className="space-y-1">
                                                            <p><strong>Low:</strong> Minor issues, no urgency</p>
                                                            <p><strong>Medium:</strong> Important but not critical</p>
                                                            <p><strong>High:</strong> Critical issues requiring immediate attention</p>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <Select
                                            value={data.priority}
                                            onValueChange={(value) => setData('priority', value)}
                                        >
                                            <SelectTrigger id="priority">
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.priority && (
                                            <p className="text-sm text-destructive">{errors.priority}</p>
                                        )}
                                    </div>

                                    {/* Dynamic Form Fields */}
                                    {formFields.length > 0 && (
                                        <FormRenderer
                                            fields={formFields}
                                            values={data.metadata}
                                            onChange={handleFormFieldChange}
                                            errors={errors}
                                        />
                                    )}

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Detailed description of the issue or request"
                                            rows={6}
                                            required
                                        />
                                        {errors.message && (
                                            <p className="text-sm text-destructive">{errors.message}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Creating...' : 'Create Ticket'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => router.get(route('customer.tickets.view'))}
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
