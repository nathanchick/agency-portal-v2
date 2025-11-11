import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {Head, router, useForm} from '@inertiajs/react';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Label as FormLabel} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {Separator} from '@/components/ui/separator';
import {ArrowLeft, X} from 'lucide-react';
import {route} from 'ziggy-js';
import {FormEvent, useState} from 'react';
import {Media} from '@/types';
import {FileUpload} from '@/components/tickets/FileUpload';
import {AttachmentList} from '@/components/tickets/AttachmentList';

interface User {
    id: string;
    name: string;
}

interface Customer {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
}

interface Label {
    id: string;
    name: string;
}

interface TicketStatus {
    id: string;
    name: string;
    slug: string;
    color: string;
}

interface Message {
    id: string;
    user: User;
    message: string;
    created_at: string;
    media?: Media[];
}

interface TicketSummary {
    id: string;
    summary: string;
    message_count: number;
    generated_at: string;
}

interface Ticket {
    id: string;
    title: string;
    message: string;
    priority: string;
    status: string;
    is_resolved: boolean;
    is_locked: boolean;
    created_at: string;
    updated_at: string;
    metadata: any;
    user: User;
    customer: Customer;
    categories: Category[];
    labels: Label[];
    messages: Message[];
    assigned_to?: User;
    media?: Media[];
}

interface Props {
    ticket: Ticket;
    organisationUsers: User[];
    categories: Category[];
    labels: Label[];
    statuses: TicketStatus[];
    summary?: TicketSummary | null;
}

export default function ShowTicket({ticket, organisationUsers, categories, labels, statuses, summary}: Props) {
    const [selectedLabels, setSelectedLabels] = useState<string[]>(ticket.labels.map(l => l.id));
    const [availableLabel, setAvailableLabel] = useState('');
    const [conversationExpanded, setConversationExpanded] = useState(false);
    const [currentSummary, setCurrentSummary] = useState<TicketSummary | null | undefined>(summary);
    const [isRegeneratingSummary, setIsRegeneratingSummary] = useState(false);
    const [summaryError, setSummaryError] = useState<string | null>(null);
    const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);

    const {data, setData, post, processing, reset} = useForm({
        message: '',
        is_private: false,
        set_status: '',
        attachments: [] as File[],
    });

    // Helper function to get initials from name
    const getInitials = (name: string): string => {
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Helper function to get consistent avatar color
    const getAvatarColor = (userId: string): string => {
        const colors = [
            'bg-blue-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-green-500',
            'bg-yellow-500',
            'bg-red-500',
            'bg-indigo-500',
            'bg-teal-500',
        ];
        const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    // Helper function to parse message into paragraphs
    const parseMessageParagraphs = (message: string): {paragraphs: string[], signature: string | null} => {
        // Common signature indicators (ordered by specificity - most specific first)
        const signaturePatterns = [
            // Freshdesk-specific patterns
            /\n\n?Powered by Freshdesk/i,
            /\n\n?View this ticket online/i,
            /\n\n?This is an automated message/i,
            /\n\n?Check your ticket status/i,
            /\n\n?To respond to this ticket/i,
            /\n\n?Reply to this email/i,
            // Generic signature patterns
            /\n\n---+\s*$/,
            /\n---+\s*$/,
            /\n\n--\s*$/,
            /\n--\s*$/,
            /\n\nBest regards,?/i,
            /\n\nBest,?/i,
            /\n\nThanks,?/i,
            /\n\nThank you,?/i,
            /\n\nRegards,?/i,
            /\n\nSincerely,?/i,
            /\n\nKind regards,?/i,
            /\n\nWarm regards,?/i,
        ];

        let signatureIndex = -1;

        for (const pattern of signaturePatterns) {
            const match = message.match(pattern);
            if (match && match.index !== undefined) {
                signatureIndex = match.index;
                break;
            }
        }

        if (signatureIndex > -1) {
            const body = message.substring(0, signatureIndex).trim();
            const signature = message.substring(signatureIndex).trim();

            // Split body into paragraphs by double line breaks
            const paragraphs = body.split(/\n\n+/).filter(p => p.trim().length > 0);
            return {paragraphs, signature};
        }

        // Split into paragraphs by double line breaks
        const paragraphs = message.split(/\n\n+/).filter(p => p.trim().length > 0);
        return {paragraphs, signature: null};
    };

    const handleAssignmentChange = (assignedTo: string) => {
        router.patch(route('tickets.update-assignment', ticket.id), {
            assigned_to: assignedTo || null
        }, {
            preserveScroll: true,
        });
    };

    const handleStatusChange = (status: string) => {
        router.patch(route('tickets.update-status', ticket.id), {
            status
        }, {
            preserveScroll: true,
        });
    };

    const handleCategoryChange = (categoryId: string) => {
        router.patch(route('tickets.update-category', ticket.id), {
            category_id: categoryId
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleAddLabel = () => {
        if (!availableLabel) return;
        router.post(route('tickets.add-label', ticket.id), {
            label_id: availableLabel
        }, {
            preserveScroll: true,
            onSuccess: () => setAvailableLabel(''),
        });
    };

    const handleRemoveLabel = (labelId: string) => {
        router.delete(route('tickets.remove-label', {ticket: ticket.id, label: labelId}), {
            preserveScroll: true,
        });
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

    const handleSubmitMessage = (e: FormEvent, setStatus = false) => {
        e.preventDefault();
        post(route('tickets.add-message', ticket.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setAttachmentFiles([]);
            },
        });
    };

    const handleRegenerateSummary = async () => {
        setIsRegeneratingSummary(true);
        setSummaryError(null);

        try {
            const response = await fetch(route('tickets.summary.regenerate', ticket.id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            const data = await response.json();

            if (data.success) {
                setCurrentSummary(data.summary);
                setSummaryError(null);
            } else {
                setSummaryError(data.message || 'Failed to generate summary');
            }
        } catch (error) {
            setSummaryError('An error occurred while generating the summary');
        } finally {
            setIsRegeneratingSummary(false);
        }
    };
    const getPriorityBadge = (priority: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
            high: 'destructive',
            medium: 'default',
            low: 'secondary',
        };

        return (
            <Badge variant={variants[priority] || 'secondary'}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Badge>
        );
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
            open: 'default',
            closed: 'secondary',
            pending: 'default',
        };

        return (
            <Badge variant={variants[status] || 'secondary'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const isClosed = ticket.status === 'closed';

    // Component to render text with proper line breaks
    const TextWithLineBreaks = ({text}: {text: string}) => {
        const lines = text.split('\n');
        return (
            <>
                {lines.map((line, idx) => (
                    <span key={idx}>
                        {line}
                        {idx < lines.length - 1 && <br />}
                    </span>
                ))}
            </>
        );
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title={`Ticket: ${ticket.title}`}/>
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: route('dashboard') },
                    { title: 'Tickets', href: route('tickets.index') },
                    { title: ticket.title, href: route('tickets.show', ticket.id) }
                ]} />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center gap-2 mt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.get(route('tickets.index'))}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2"/>
                            Back to Tickets
                        </Button>
                    </div>

                    {/* 2-Column Layout */}
                    <div className="grid gap-4 lg:grid-cols-3">
                        {/* Main Column - 2/3 width */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Ticket Header */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-2xl">{ticket.title}</CardTitle>
                                            <CardDescription>
                                                Created by {ticket.user.name} on {formatDate(ticket.created_at)}
                                            </CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            {getPriorityBadge(ticket.priority)}
                                            {getStatusBadge(ticket.status)}
                                            {ticket.is_locked && (
                                                <Badge variant="outline">Locked</Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">Original Message</p>
                                        <div className="rounded-lg bg-muted p-4">
                                            {(() => {
                                                const {paragraphs, signature} = parseMessageParagraphs(ticket.message);
                                                return (
                                                    <>
                                                        <div className="space-y-3 text-sm leading-relaxed">
                                                            {paragraphs.map((paragraph, idx) => (
                                                                <p key={idx}>
                                                                    <TextWithLineBreaks text={paragraph} />
                                                                </p>
                                                            ))}
                                                        </div>
                                                        {signature && (
                                                            <div className="mt-4 pt-3 border-t border-border/50 text-sm text-muted-foreground">
                                                                <TextWithLineBreaks text={signature} />
                                                            </div>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>

                                    {/* Ticket Attachments */}
                                    {ticket.media && ticket.media.length > 0 && (
                                        <>
                                            <Separator className="my-4"/>
                                            <AttachmentList
                                                attachments={ticket.media}
                                                canDelete={true}
                                                showTimestamp={true}
                                            />
                                        </>
                                    )}

                                    {ticket.metadata && Object.keys(ticket.metadata).length > 0 && (
                                        <>
                                            <Separator className="my-4"/>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground mb-2">Additional Information</p>
                                                <div className="grid gap-2">
                                                    {Object.entries(ticket.metadata).map(([key, value]) => (
                                                        <div key={key} className="grid grid-cols-3 gap-4 text-sm">
                                                            <span className="font-medium text-muted-foreground">{key}:</span>
                                                            <span className="col-span-2">{String(value)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* AI Summary */}
                            {currentSummary && (
                                <Card className="border-l-4 border-l-blue-500">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    <span>AI Summary</span>
                                                    <Badge variant="secondary" className="text-xs">Beta</Badge>
                                                </CardTitle>
                                                <CardDescription>
                                                    Generated {new Date(currentSummary.generated_at).toLocaleString()} • {currentSummary.message_count} messages analyzed
                                                </CardDescription>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleRegenerateSummary}
                                                disabled={isRegeneratingSummary}
                                            >
                                                {isRegeneratingSummary ? 'Regenerating...' : 'Refresh Summary'}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {summaryError ? (
                                            <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                                                {summaryError}
                                            </div>
                                        ) : (
                                            <div className="space-y-3 text-sm">
                                                {currentSummary.summary.split('\n').map((line, idx) => {
                                                    const trimmedLine = line.trim();

                                                    if (!trimmedLine) return null;

                                                    // Bold headers (e.g., **Issue Summary:**)
                                                    if (trimmedLine.match(/^\*\*.*\*\*:?/)) {
                                                        const text = trimmedLine.replace(/\*\*/g, '');
                                                        return (
                                                            <h4 key={idx} className="font-semibold text-base mt-4 first:mt-0">
                                                                {text}
                                                            </h4>
                                                        );
                                                    }

                                                    // Bullet points
                                                    if (trimmedLine.startsWith('- ')) {
                                                        return (
                                                            <li key={idx} className="ml-4 list-disc">
                                                                {trimmedLine.substring(2)}
                                                            </li>
                                                        );
                                                    }

                                                    // Regular paragraphs
                                                    return (
                                                        <p key={idx} className="leading-relaxed">
                                                            {trimmedLine}
                                                        </p>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Responses */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Responses ({ticket.messages.length})</CardTitle>
                                    <CardDescription>
                                        Conversation history for this ticket
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {ticket.messages.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <p>No responses yet</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Show collapse/expand button if there are more than 6 messages */}
                                            {ticket.messages.length > 6 && (
                                                <div className="mb-4 flex justify-center">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setConversationExpanded(!conversationExpanded)}
                                                    >
                                                        {conversationExpanded ? (
                                                            <>Hide earlier responses</>
                                                        ) : (
                                                            <>Show {ticket.messages.length - 3} earlier responses</>
                                                        )}
                                                    </Button>
                                                </div>
                                            )}

                                            <div className="space-y-6">
                                                {(() => {
                                                    // Determine which messages to show
                                                    const messagesToShow = ticket.messages.length > 6 && !conversationExpanded
                                                        ? ticket.messages.slice(-3) // Show last 3 messages
                                                        : ticket.messages; // Show all messages

                                                    return messagesToShow.map((message) => {
                                                const {paragraphs, signature} = parseMessageParagraphs(message.message);
                                                const initials = getInitials(message.user.name);
                                                const avatarColor = getAvatarColor(message.user.id);

                                                return (
                                                    <div key={message.id} className="flex gap-4 hover:bg-muted/50 -mx-4 px-4 py-3 rounded-lg transition-colors">
                                                        {/* Avatar */}
                                                        <div className="flex-shrink-0">
                                                            <div className={`w-10 h-10 rounded-full ${avatarColor} text-white flex items-center justify-center font-semibold text-sm`}>
                                                                {initials}
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-1 min-w-0">
                                                            {/* Header */}
                                                            <div className="flex items-baseline gap-2 mb-1">
                                                                <span className="font-semibold text-primary">{message.user.name}</span>
                                                                <span className="text-sm text-muted-foreground">replied</span>
                                                            </div>
                                                            <div className="text-xs text-muted-foreground mb-3">
                                                                {formatDate(message.created_at)}
                                                            </div>

                                                            {/* Message body with paragraphs */}
                                                            <div className="space-y-3 text-sm leading-relaxed">
                                                                {paragraphs.map((paragraph, idx) => (
                                                                    <p key={idx}>
                                                                        <TextWithLineBreaks text={paragraph} />
                                                                    </p>
                                                                ))}
                                                            </div>

                                                            {/* Signature if detected */}
                                                            {signature && (
                                                                <div className="mt-4 pt-3 border-t text-sm text-muted-foreground">
                                                                    <TextWithLineBreaks text={signature} />
                                                                </div>
                                                            )}

                                                            {/* Message Attachments */}
                                                            {message.media && message.media.length > 0 && (
                                                                <div className="mt-4">
                                                                    <AttachmentList
                                                                        attachments={message.media}
                                                                        canDelete={true}
                                                                        showTimestamp={false}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                                    });
                                                })()}
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Message Response Area - Only show if not closed */}
                            {!isClosed && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Add Response</CardTitle>
                                        <CardDescription>
                                            Send a message to respond to this ticket
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmitMessage} className="space-y-4">
                                            <div>
                                                <Textarea
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    placeholder="Type your response here..."
                                                    rows={5}
                                                    required
                                                />
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="is_private"
                                                    checked={data.is_private}
                                                    onCheckedChange={(checked) => setData('is_private', checked as boolean)}
                                                />
                                                <FormLabel htmlFor="is_private" className="cursor-pointer text-sm font-normal">
                                                    Private message (only visible to organisation users)
                                                </FormLabel>
                                            </div>

                                            {/* File Upload */}
                                            <div>
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

                                            <div className="flex gap-2">
                                                <Button type="submit" disabled={processing}>
                                                    Send
                                                </Button>
                                                <Select
                                                    value={data.set_status}
                                                    onValueChange={(value) => setData('set_status', value)}
                                                >
                                                    <SelectTrigger className="w-[200px]">
                                                        <SelectValue placeholder="Send & Set Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {statuses.map((status) => (
                                                            <SelectItem key={status.id} value={status.slug}>
                                                                Set to {status.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {data.set_status && (
                                                    <Button
                                                        type="submit"
                                                        variant="secondary"
                                                        disabled={processing}
                                                    >
                                                        Send & Set Status
                                                    </Button>
                                                )}
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar - 1/3 width */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ticket Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Customer */}
                                    <div>
                                        <FormLabel>Customer</FormLabel>
                                        <p className="text-sm mt-1">{ticket.customer.name}</p>
                                    </div>

                                    <Separator/>

                                    {/* Category */}
                                    <div>
                                        <FormLabel htmlFor="category">Category</FormLabel>
                                        <Select
                                            value={ticket.categories[0]?.id || ''}
                                            onValueChange={handleCategoryChange}
                                        >
                                            <SelectTrigger id="category" className="mt-1">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Separator/>

                                    {/* Labels */}
                                    <div>
                                        <FormLabel>Labels</FormLabel>
                                        <div className="flex gap-1 flex-wrap mt-2 mb-2">
                                            {ticket.labels.map((label) => (
                                                <Badge key={label.id} variant="outline" className="text-xs">
                                                    {label.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveLabel(label.id)}
                                                        className="ml-1 hover:text-destructive"
                                                    >
                                                        <X className="h-3 w-3"/>
                                                    </button>
                                                </Badge>
                                            ))}
                                            {ticket.labels.length === 0 && (
                                                <p className="text-sm text-muted-foreground">No labels</p>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <Select
                                                value={availableLabel}
                                                onValueChange={setAvailableLabel}
                                            >
                                                <SelectTrigger className="flex-1">
                                                    <SelectValue placeholder="Add label" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {labels.filter(l => !ticket.labels.find(tl => tl.id === l.id)).map((label) => (
                                                        <SelectItem key={label.id} value={label.id}>
                                                            {label.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={handleAddLabel}
                                                disabled={!availableLabel}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </div>

                                    <Separator/>

                                    {/* Status */}
                                    <div>
                                        <FormLabel htmlFor="status">Status</FormLabel>
                                        <Select
                                            value={ticket.status}
                                            onValueChange={handleStatusChange}
                                        >
                                            <SelectTrigger id="status" className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statuses.map((status) => (
                                                    <SelectItem key={status.id} value={status.slug}>
                                                        {status.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Separator/>

                                    {/* Assigned User */}
                                    <div>
                                        <FormLabel htmlFor="assigned-to">Assigned To</FormLabel>
                                        <Select
                                            value={ticket.assigned_to?.id || 'unassigned'}
                                            onValueChange={(value) => handleAssignmentChange(value === 'unassigned' ? '' : value)}
                                        >
                                            <SelectTrigger id="assigned-to" className="mt-1">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="unassigned">Unassigned</SelectItem>
                                                {organisationUsers.map((user) => (
                                                    <SelectItem key={user.id} value={user.id}>
                                                        {user.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
