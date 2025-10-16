import { AppSidebar } from "@/components/app-sidebar"
import { usePage } from '@inertiajs/react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Ticket {
    id: string
    title: string
    status: string
    priority: string
    created_at: string
    user: {
        name: string
        email: string
    }
    categories: Array<{ name: string }>
    labels: Array<{ name: string }>
}

interface Props {
    tickets: Ticket[]
}

export default function AllTickets({ tickets }: Props) {
    const { auth } = usePage<{ auth: { userType: 'organisation' | 'customer' } }>().props

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'destructive'
            case 'medium': return 'default'
            case 'low': return 'secondary'
            default: return 'outline'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'default'
            case 'in_progress': return 'secondary'
            case 'closed': return 'outline'
            default: return 'outline'
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar userType={auth.userType} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
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
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>All Tickets</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="rounded-lg border bg-card">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">All Organisation Tickets</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Submitted By</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Categories</TableHead>
                                        <TableHead>Created</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tickets.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                                                No tickets found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        tickets.map((ticket) => (
                                            <TableRow key={ticket.id}>
                                                <TableCell className="font-medium">{ticket.title}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{ticket.user.name}</span>
                                                        <span className="text-xs text-muted-foreground">{ticket.user.email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getStatusColor(ticket.status)}>
                                                        {ticket.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getPriorityColor(ticket.priority)}>
                                                        {ticket.priority}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-1 flex-wrap">
                                                        {ticket.categories.map((cat, idx) => (
                                                            <Badge key={idx} variant="outline">
                                                                {cat.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(ticket.created_at).toLocaleDateString()}
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
    )
}
