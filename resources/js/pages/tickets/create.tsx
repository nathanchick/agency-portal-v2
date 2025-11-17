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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Info, Sparkles, Loader2, X} from 'lucide-react';
import {FormEvent, useState} from 'react';
import {route} from 'ziggy-js';
import FormRenderer from '@/components/form-renderer';
import {FormField} from '@/components/form-builder';
import {TicketQualitySuggestions} from '@/components/ticket-quality-suggestions';
import {TicketQualityWarningDialog} from '@/components/ticket-quality-warning-dialog';
import OpenAiController from '@/actions/Modules/OpenAi/Http/Controllers/OpenAiController';
import {TicketQualityAnalysis, QualityThresholds} from '@/types/ticket-quality';
import {toast} from 'sonner';
import {Media} from '@/types';
import {FileUpload} from '@/components/tickets/FileUpload';

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

interface Website {
    id: string;
    url: string;
    type: string;
    platform_type?: string;
}

interface TicketQualityConfig {
    enabled: boolean;
    autoCheck: boolean;
    minScore: number;
    goodThreshold: number;
    fairThreshold: number;
}

interface Props {
    customer: Customer;
    categories: Category[];
    labels: Label[];
    selectedCategory?: Category;
    websites: Website[];
    ticketQualityConfig: TicketQualityConfig;
}

export default function CreateTicket({customer, categories, labels, selectedCategory, websites, ticketQualityConfig}: Props) {
    const {data, setData, post, processing, errors} = useForm({
        customer_id: customer.id,
        category_ids: selectedCategory ? [selectedCategory.id] : [],
        label_ids: [],
        title: '',
        priority: 'medium',
        message: '',
        metadata: {},
        attachments: [] as File[],
        website_id: websites.length === 1 ? websites[0].id : '',
    });

    const [analysis, setAnalysis] = useState<TicketQualityAnalysis | null>(null);
    const [thresholds, setThresholds] = useState<QualityThresholds>({ good: 75, fair: 60 });
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showQualityWarning, setShowQualityWarning] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [requestCount, setRequestCount] = useState(0);
    const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);

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

    const canRequestSuggestions = data.title.length >= 10 && data.message.length >= 20 && requestCount < 3;

    const handleAnalyzeTicket = async () => {
        if (!canRequestSuggestions) return;

        setAnalyzing(true);
        setRequestCount(requestCount + 1);

        try {
            // Enrich metadata with field labels for better AI context
            const enrichedMetadata: Record<string, any> = {};
            if (Object.keys(data.metadata).length > 0 && formFields.length > 0) {
                formFields.forEach(field => {
                    const value = data.metadata[field.id];
                    if (value) {
                        enrichedMetadata[field.label] = value;
                    }
                });
            }

            const response = await fetch(OpenAiController.analyzeTicket['/openai/analyze-ticket'].url(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: JSON.stringify({
                    title: data.title,
                    message: data.message,
                    priority: data.priority as 'low' | 'medium' | 'high',
                    category: currentCategory?.name,
                    customer_id: customer.id,
                    website_id: data.website_id || undefined,
                    metadata: Object.keys(enrichedMetadata).length > 0 ? enrichedMetadata : undefined,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to analyze ticket');
            }

            const result = await response.json();

            setAnalysis(result.analysis);
            setThresholds(result.thresholds);
            setShowSuggestions(true);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to analyze ticket');
        } finally {
            setAnalyzing(false);
        }
    };

    const handleCreateTicketFromSuggestions = () => {
        // Close the suggestions modal
        setShowSuggestions(false);
        // Submit the form
        post(route('customer.tickets.store'));
    };

    const handleContinueWriting = () => {
        // Just close the suggestions modal and let user continue editing
        setShowSuggestions(false);
    };

    const handleFilesSelected = (files: File[]) => {
        const updatedFiles = [...attachmentFiles, ...files];
        setAttachmentFiles(updatedFiles);
        setData('attachments', updatedFiles);
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = attachmentFiles.filter((_, i) => i !== index);
        setAttachmentFiles(updatedFiles);
        setData('attachments', updatedFiles);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Check if quality warning should be shown
        if (
            ticketQualityConfig.enabled &&
            ticketQualityConfig.autoCheck &&
            analysis &&
            analysis.overallScore < ticketQualityConfig.minScore
        ) {
            // Show warning dialog
            setShowQualityWarning(true);
            return;
        }

        // Proceed with submission
        post(route('customer.tickets.store'));
    };

    const handleSubmitWithLowQuality = () => {
        // User confirmed they want to submit despite low quality
        setShowQualityWarning(false);
        post(route('customer.tickets.store'));
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Create Ticket"/>
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: route('dashboard') },
                    { title: 'Tickets', href: route('customer.tickets.view') },
                    { title: 'Create', href: route('customer.tickets.create') }
                ]} />
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

                                    {/* Website Selector */}
                                    {websites.length > 0 && (
                                        <div className="space-y-2">
                                            <Label htmlFor="website">Website (Optional)</Label>
                                            <Select
                                                value={data.website_id || undefined}
                                                onValueChange={(value) => setData('website_id', value)}
                                            >
                                                <SelectTrigger id="website">
                                                    <SelectValue placeholder="Select a website (if applicable)" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {websites.map((website) => (
                                                        <SelectItem key={website.id} value={website.id}>
                                                            {website.url}
                                                            {website.platform_type && ` - ${website.platform_type.charAt(0).toUpperCase() + website.platform_type.slice(1)}`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.website_id && (
                                                <p className="text-sm text-destructive">{errors.website_id}</p>
                                            )}
                                        </div>
                                    )}

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

                                    {/* File Upload */}
                                    <div className="space-y-2">
                                        <Label>Attachments (Optional)</Label>
                                        <FileUpload
                                            onFilesSelected={handleFilesSelected}
                                            existingFiles={attachmentFiles}
                                            disabled={processing}
                                        />
                                        {attachmentFiles.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {attachmentFiles.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                                                        <span className="truncate flex-1">{file.name}</span>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleRemoveFile(index)}
                                                            disabled={processing}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* AI Suggestions Button */}
                                    <div className="border-t pt-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-sm font-medium flex items-center gap-2">
                                                    <Sparkles className="h-4 w-4 text-purple-600" />
                                                    Get AI Suggestions
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Improve your ticket before submitting ({requestCount}/3 requests used)
                                                </p>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={handleAnalyzeTicket}
                                                disabled={!canRequestSuggestions || analyzing}
                                                variant="outline"
                                            >
                                                {analyzing ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Analyzing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles className="mr-2 h-4 w-4" />
                                                        Analyze Ticket
                                                    </>
                                                )}
                                            </Button>
                                        </div>
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

            {/* AI Suggestions Modal */}
            {analysis && (
                <>
                    <TicketQualitySuggestions
                        open={showSuggestions}
                        analysis={analysis}
                        thresholds={thresholds}
                        onCreateTicket={handleCreateTicketFromSuggestions}
                        onContinueWriting={handleContinueWriting}
                    />

                    {/* Quality Warning Dialog */}
                    <TicketQualityWarningDialog
                        open={showQualityWarning}
                        analysis={analysis}
                        minScore={ticketQualityConfig.minScore}
                        onProceed={handleSubmitWithLowQuality}
                        onCancel={() => setShowQualityWarning(false)}
                    />
                </>
            )}
        </SidebarProvider>
    );
}
