import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {Head, router} from '@inertiajs/react';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Input} from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {Calendar} from '@/components/ui/calendar';
import {CalendarIcon, MoreHorizontal, Plus} from 'lucide-react';
import {useState, useEffect, useRef} from 'react';
import {route} from 'ziggy-js';
import {Badge} from '@/components/ui/badge';
import {format} from 'date-fns';

interface DocumentRequest {
    id: string;
    customer: {
        id: string;
        name: string;
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
    };
    status: 'not_sent' | 'processing' | 'completed' | 'void';
    created_at: string;
    signed_at?: string;
}

interface Document {
    id: string;
    name: string;
    format: string;
}

interface Customer {
    id: string;
    name: string;
}

interface Props {
    documentRequests: {
        data: DocumentRequest[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    documents: Document[];
    customers: Customer[];
    filters: {
        customer_id?: string;
        user_name?: string;
        status?: string;
        date_from?: string;
        date_to?: string;
    };
}

export default function PendingDocuments({documentRequests, documents, customers, filters}: Props) {
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showDateFromDialog, setShowDateFromDialog] = useState(false);
    const [showDateToDialog, setShowDateToDialog] = useState(false);
    const [filterValues, setFilterValues] = useState(filters);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedDocumentType, setSelectedDocumentType] = useState('');
    const dateFromRef = useRef<HTMLDivElement>(null);
    const dateToRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dateFromRef.current && !dateFromRef.current.contains(event.target as Node)) {
                setShowDateFromDialog(false);
            }
            if (dateToRef.current && !dateToRef.current.contains(event.target as Node)) {
                setShowDateToDialog(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const statusColors = {
        not_sent: 'bg-gray-500',
        processing: 'bg-blue-500',
        completed: 'bg-green-500',
        void: 'bg-red-500',
    };

    const handleFilter = () => {
        router.get(route('documents.pending'), filterValues, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClearFilters = () => {
        setFilterValues({});
        router.get(route('documents.pending'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const [voidDialogOpen, setVoidDialogOpen] = useState(false);
    const [resendDialogOpen, setResendDialogOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<DocumentRequest | null>(null);

    const handleVoidClick = (request: DocumentRequest) => {
        setSelectedRequest(request);
        setVoidDialogOpen(true);
    };

    const confirmVoid = () => {
        if (selectedRequest) {
            router.post(route('documents.void', selectedRequest.id), {}, {
                onSuccess: () => {
                    setVoidDialogOpen(false);
                    setSelectedRequest(null);
                },
            });
        }
    };

    const handleResendClick = (request: DocumentRequest) => {
        setSelectedRequest(request);
        setResendDialogOpen(true);
    };

    const confirmResend = () => {
        if (selectedRequest) {
            router.post(route('documents.resend', selectedRequest.id), {}, {
                onSuccess: () => {
                    setResendDialogOpen(false);
                    setSelectedRequest(null);
                },
            });
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Pending Documents"/>
                <AppSidebarHeader
                    breadcrumbs={[
                        {label: 'Dashboard', href: '/dashboard'},
                        {label: 'Documents - Pending'},
                    ]}
                />
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Pending Documents</h2>
                        <p className="text-muted-foreground">
                            Manage document requests that are not yet completed
                        </p>
                    </div>

                    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4"/>
                                New Document
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Create Document Request</DialogTitle>
                                <DialogDescription>
                                    Select a customer and document type to continue
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dialog-customer">Customer *</Label>
                                    <Select
                                        value={selectedCustomer}
                                        onValueChange={setSelectedCustomer}
                                    >
                                        <SelectTrigger id="dialog-customer">
                                            <SelectValue placeholder="Select customer"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.map((customer) => (
                                                <SelectItem key={customer.id} value={customer.id}>
                                                    {customer.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dialog-document-type">Document Type *</Label>
                                    <Select
                                        value={selectedDocumentType}
                                        onValueChange={setSelectedDocumentType}
                                    >
                                        <SelectTrigger id="dialog-document-type">
                                            <SelectValue placeholder="Select document type"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {documents.map((doc) => (
                                                <SelectItem key={doc.id} value={doc.id}>
                                                    {doc.name} ({doc.format === 'form_builder' ? 'Form' : 'Upload'})
                                                </SelectItem>
                                            ))}
                                            <SelectItem value="upload_pdf">Upload PDF to Share</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <Button
                                        onClick={() => {
                                            if (selectedCustomer && selectedDocumentType) {
                                                router.get(route('documents.create', {
                                                    customer_id: selectedCustomer,
                                                    document_type: selectedDocumentType
                                                }));
                                            }
                                        }}
                                        disabled={!selectedCustomer || !selectedDocumentType}
                                        className="flex-1"
                                    >
                                        Next
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setShowCreateDialog(false);
                                            setSelectedCustomer('');
                                            setSelectedDocumentType('');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters */}
                <div className="rounded-lg border bg-card p-4 overflow-visible">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 overflow-visible">
                        <div className="space-y-2">
                            <Label htmlFor="customer_id">Customer</Label>
                            <Select
                                value={filterValues.customer_id || ''}
                                onValueChange={(value) =>
                                    setFilterValues({...filterValues, customer_id: value})
                                }
                            >
                                <SelectTrigger id="customer_id">
                                    <SelectValue placeholder="Select customer"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {customers.map((customer) => (
                                        <SelectItem key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="user_name">User Name</Label>
                            <Input
                                id="user_name"
                                placeholder="Search user..."
                                value={filterValues.user_name || ''}
                                onChange={(e) =>
                                    setFilterValues({...filterValues, user_name: e.target.value})
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={filterValues.status || ''}
                                onValueChange={(value) =>
                                    setFilterValues({...filterValues, status: value})
                                }
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="All statuses"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="not_sent">Not Sent</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2" ref={dateFromRef}>
                            <Label htmlFor="date_from">Date From</Label>
                            <div className="relative">
                                <Button
                                    id="date_from"
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !filterValues.date_from && 'text-muted-foreground'
                                    )}
                                    onClick={() => setShowDateFromDialog(!showDateFromDialog)}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                    {filterValues.date_from ? (
                                        format(new Date(filterValues.date_from), 'PPP')
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                                {showDateFromDialog && (
                                    <div className="absolute left-0 top-full z-50 mt-1 rounded-md border bg-popover shadow-md">
                                        <Calendar
                                            mode="single"
                                            selected={filterValues.date_from ? new Date(filterValues.date_from) : undefined}
                                            onSelect={(date) => {
                                                setFilterValues({
                                                    ...filterValues,
                                                    date_from: date ? format(date, 'yyyy-MM-dd') : undefined,
                                                });
                                                setShowDateFromDialog(false);
                                            }}
                                            initialFocus
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2" ref={dateToRef}>
                            <Label htmlFor="date_to">Date To</Label>
                            <div className="relative">
                                <Button
                                    id="date_to"
                                    variant="outline"
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !filterValues.date_to && 'text-muted-foreground'
                                    )}
                                    onClick={() => setShowDateToDialog(!showDateToDialog)}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                    {filterValues.date_to ? (
                                        format(new Date(filterValues.date_to), 'PPP')
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                                {showDateToDialog && (
                                    <div className="absolute left-0 top-full z-50 mt-1 rounded-md border bg-popover shadow-md">
                                        <Calendar
                                            mode="single"
                                            selected={filterValues.date_to ? new Date(filterValues.date_to) : undefined}
                                            onSelect={(date) => {
                                                setFilterValues({
                                                    ...filterValues,
                                                    date_to: date ? format(date, 'yyyy-MM-dd') : undefined,
                                                });
                                                setShowDateToDialog(false);
                                            }}
                                            initialFocus
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <Button onClick={handleFilter}>Apply Filters</Button>
                        <Button variant="outline" onClick={handleClearFilters}>
                            Clear Filters
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-lg border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Document</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="w-[70px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documentRequests.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                                        No pending documents found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                documentRequests.data.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell className="font-medium">
                                            {request.customer.name}
                                        </TableCell>
                                        <TableCell>
                                            {request.user ? (
                                                <div>
                                                    <div>{request.user.name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {request.user.email}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{request.document.name}</TableCell>
                                        <TableCell>
                                            <Badge className={statusColors[request.status]}>
                                                {request.status.replace('_', ' ')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(request.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4"/>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => router.get(route('customer.documents.view-sign', request.id))}
                                                    >
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleResendClick(request)}>
                                                        Resend
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleVoidClick(request)}
                                                        className="text-destructive"
                                                    >
                                                        Void
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {documentRequests.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Showing {documentRequests.data.length} of {documentRequests.total} results
                        </div>
                        <div className="flex gap-2">
                            {documentRequests.current_page > 1 && (
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.get(
                                            route('documents.pending', {
                                                ...filterValues,
                                                page: documentRequests.current_page - 1,
                                            })
                                        )
                                    }
                                >
                                    Previous
                                </Button>
                            )}
                            {documentRequests.current_page < documentRequests.last_page && (
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        router.get(
                                            route('documents.pending', {
                                                ...filterValues,
                                                page: documentRequests.current_page + 1,
                                            })
                                        )
                                    }
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                )}
                    </div>
                </div>
            </SidebarInset>

            {/* Void Confirmation Dialog */}
            <Dialog open={voidDialogOpen} onOpenChange={setVoidDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Void Document Request</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to void this document request? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setVoidDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmVoid}
                        >
                            Void Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Resend Confirmation Dialog */}
            <Dialog open={resendDialogOpen} onOpenChange={setResendDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Resend Document Request</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to resend this document request?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setResendDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmResend}
                        >
                            Resend
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
}
