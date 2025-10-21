import {AppSidebar} from '@/components/app-sidebar';
import {Head, router} from '@inertiajs/react';
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
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {AlertTriangle} from 'lucide-react';

interface DocumentHistory {
    id: string;
    action: string;
    user_name: string;
    user_email: string;
    created_at: string;
    meta_data?: Record<string, any>;
}

interface DocumentRequest {
    id: string;
    customer: {
        id: string;
        name: string;
        organisation: {
            id: string;
            name: string;
        };
    };
    user?: {
        id: string;
        name: string;
        email: string;
    };
    document: {
        id: string;
        name: string;
        format: string;
        content?: string;
    };
    status: 'not_sent' | 'processing' | 'completed' | 'void';
    content?: string;
    notes?: string;
    uploaded_file?: string;
    created_at: string;
    history: DocumentHistory[];
}

interface Props {
    documentRequest: DocumentRequest;
    canView: boolean;
    canApprove: boolean;
    accessReason: 'assigned_user' | 'customer_manager' | 'document_creator' | 'organisation_admin';
}

export default function ViewSignDocument({documentRequest, canView, canApprove, accessReason}: Props) {
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showDeclineDialog, setShowDeclineDialog] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const [isDeclining, setIsDeclining] = useState(false);

    const statusColors = {
        not_sent: 'bg-gray-500',
        processing: 'bg-blue-500',
        completed: 'bg-green-500',
        void: 'bg-red-500',
    };

    const accessReasonLabels = {
        assigned_user: 'Assigned to you',
        customer_manager: 'Customer Manager/Admin',
        document_creator: 'Document Creator',
        organisation_admin: 'Organisation Admin/Manager',
    };

    const handleApprove = () => {
        setIsApproving(true);
        router.post(
            `/customer/documents/${documentRequest.id}/approve`,
            {},
            {
                onSuccess: () => {
                    setShowApproveDialog(false);
                    setIsApproving(false);
                },
                onError: () => {
                    setIsApproving(false);
                },
            }
        );
    };

    const handleDecline = () => {
        setIsDeclining(true);
        router.post(
            `/customer/documents/${documentRequest.id}/decline`,
            {},
            {
                onSuccess: () => {
                    setShowDeclineDialog(false);
                    setIsDeclining(false);
                },
                onError: () => {
                    setIsDeclining(false);
                },
            }
        );
    };

    if (!canView) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Access Denied</h1>
                    <p className="text-muted-foreground">You do not have permission to view this document.</p>
                </div>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title={`View & Sign - ${documentRequest.document.name}`}/>
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
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/customer/documents/my-pending">
                                        Documents
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>View & Sign</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight">{documentRequest.document.name}</h2>
                                <p className="text-muted-foreground">
                                    Review and {canApprove ? 'approve' : 'view'} this document
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Badge className={statusColors[documentRequest.status]}>
                                    {documentRequest.status.replace('_', ' ')}
                                </Badge>
                                <Badge variant="outline">{accessReasonLabels[accessReason]}</Badge>
                            </div>
                        </div>

                        {/* Document Info */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Document Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div>
                                        <span className="text-sm font-medium">Document:</span>
                                        <p className="text-sm text-muted-foreground">{documentRequest.document.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium">Format:</span>
                                        <p className="text-sm text-muted-foreground">{documentRequest.document.format}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium">Customer:</span>
                                        <p className="text-sm text-muted-foreground">{documentRequest.customer.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium">Organisation:</span>
                                        <p className="text-sm text-muted-foreground">
                                            {documentRequest.customer.organisation.name}
                                        </p>
                                    </div>
                                    {documentRequest.user && (
                                        <div>
                                            <span className="text-sm font-medium">Assigned To:</span>
                                            <p className="text-sm text-muted-foreground">
                                                {documentRequest.user.name} ({documentRequest.user.email})
                                            </p>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-sm font-medium">Created:</span>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(documentRequest.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Notes */}
                            {documentRequest.notes && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">{documentRequest.notes}</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Document Content */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Document Content</CardTitle>
                                <CardDescription>
                                    Review the document details below
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {(() => {
                                    if (documentRequest.uploaded_file) {
                                        // Show PDF viewer for uploaded files
                                        return (
                                            <div className="w-full">
                                                <embed
                                                    src={documentRequest.uploaded_file}
                                                    type="application/pdf"
                                                    className="w-full h-[800px] rounded-lg border"
                                                />
                                                <div className="mt-4">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => window.open(documentRequest.uploaded_file, '_blank')}
                                                    >
                                                        Open in New Tab
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    } else if (documentRequest.content && documentRequest.document.content) {
                                        // Form builder content: field definitions in document.content, values in documentRequest.content
                                        try {
                                            const fieldValues = JSON.parse(documentRequest.content);
                                            const fieldDefinitions = JSON.parse(documentRequest.document.content);

                                            if (Array.isArray(fieldDefinitions)) {
                                                return (
                                                    <div className="rounded-lg border bg-muted/50 p-6 space-y-4">
                                                        {fieldDefinitions.map((field: any) => (
                                                            <div key={field.id} className="space-y-2">
                                                                <label className="text-sm font-medium">
                                                                    {field.label}
                                                                    {field.required && <span className="text-destructive ml-1">*</span>}
                                                                </label>
                                                                <div className="rounded-md bg-background px-3 py-2 text-sm border">
                                                                    {fieldValues[field.id] || '-'}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div className="rounded-lg border bg-muted/50 p-4">
                                                        <pre className="text-sm">{JSON.stringify(fieldValues, null, 2)}</pre>
                                                    </div>
                                                );
                                            }
                                        } catch (e) {
                                            console.error('Failed to parse form data:', e);
                                            return (
                                                <div
                                                    className="prose max-w-none rounded-lg border bg-muted/50 p-4"
                                                    dangerouslySetInnerHTML={{__html: documentRequest.content}}
                                                />
                                            );
                                        }
                                    } else if (documentRequest.content) {
                                        // HTML content
                                        return (
                                            <div
                                                className="prose max-w-none rounded-lg border bg-muted/50 p-4"
                                                dangerouslySetInnerHTML={{__html: documentRequest.content}}
                                            />
                                        );
                                    } else {
                                        return <p className="text-sm text-muted-foreground">No content available</p>;
                                    }
                                })()}
                            </CardContent>
                        </Card>

                        {/* History */}
                        {documentRequest.history.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Document History</CardTitle>
                                    <CardDescription>
                                        Timeline of actions taken on this document
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {documentRequest.history.map((entry) => (
                                            <div key={entry.id} className="flex items-start gap-3 rounded-lg border p-3">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">{entry.action}</Badge>
                                                        <span className="text-sm font-medium">{entry.user_name}</span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">{entry.user_email}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {new Date(entry.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Actions */}
                        {canApprove && documentRequest.status !== 'completed' && documentRequest.status !== 'void' && (
                            <Alert variant="warning">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Binding Agreement</AlertTitle>
                                <AlertDescription>
                                    <div className="space-y-4 flex space-x-20">
                                        <p>
                                            By approving this document, you are entering into a legally binding agreement.
                                            Please ensure you have read and understood all terms before proceeding.
                                            This action cannot be undone.
                                        </p>
                                        <div className="flex justify-end gap-2">
                                            <Button onClick={() => setShowApproveDialog(true)}>
                                                Approve Document
                                            </Button>
                                            <Button variant="ghost" onClick={() => setShowDeclineDialog(true)}>
                                                Decline Document
                                            </Button>
                                        </div>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        )}
                        <Button
                            variant="outline"
                            onClick={() => router.visit('/customer/documents/my-pending')}
                        >
                            Back to List
                        </Button>
                    </div>
                </div>
            </SidebarInset>

            {/* Approve Confirmation Dialog */}
            <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Approve Document</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to approve this document? This action will mark the document as
                            completed and cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowApproveDialog(false)} disabled={isApproving}>
                            Cancel
                        </Button>
                        <Button onClick={handleApprove} disabled={isApproving}>
                            {isApproving ? 'Approving...' : 'Approve'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Decline Confirmation Dialog */}
            <Dialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Decline Document</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to decline this document? This action will reject the document
                            and cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDeclineDialog(false)} disabled={isDeclining}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDecline} disabled={isDeclining}>
                            {isDeclining ? 'Declining...' : 'Decline'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
}