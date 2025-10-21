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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Download, Eye} from 'lucide-react';

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

interface Props {
    documentRequests: {
        data: DocumentRequest[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function AllPendingDocuments({documentRequests}: Props) {
    const statusColors = {
        not_sent: 'bg-gray-500',
        processing: 'bg-blue-500',
        completed: 'bg-green-500',
        void: 'bg-red-500',
    };

    const handleView = (id: string) => {
        router.get(`/customer/documents/${id}/view-sign`);
    };

    const handleDownload = (id: string) => {
        window.location.href = `/customer/documents/${id}/download`;
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="All Pending Documents"/>
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
                                    <BreadcrumbPage>All Pending Documents</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">All Pending Documents</h2>
                            <p className="text-muted-foreground">
                                All pending documents for your organisation
                            </p>
                        </div>

                        <div className="rounded-lg border bg-card">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Assignee</TableHead>
                                        <TableHead>Document</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="w-[180px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documentRequests.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-muted-foreground h-32">
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
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleView(request.id)}
                                                        >
                                                            <Eye className="h-4 w-4 mr-2"/>
                                                            View
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleDownload(request.id)}
                                                        >
                                                            <Download className="h-4 w-4 mr-2"/>
                                                            Download
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
