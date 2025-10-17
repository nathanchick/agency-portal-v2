import { Head, Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Mail, Plus, Trash2 } from 'lucide-react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface TeamMember {
    id: string
    name: string
    email: string
    role: string | null
    created_at: string
    last_login_at: string | null
}

interface Role {
    id: string
    name: string
}

interface Props {
    teamMembers: TeamMember[]
    roles: Role[]
    userType: string
    currentOrganisation: { id: string; name: string } | null
    currentCustomer: { id: string; name: string } | null
}

export default function ManageTeam({ teamMembers, roles, userType, currentOrganisation, currentCustomer }: Props) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [resendDialogOpen, setResendDialogOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

    const handleDeleteClick = (userId: string) => {
        setSelectedUserId(userId)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConfirm = () => {
        if (selectedUserId) {
            router.delete(route('team.destroy', selectedUserId))
        }
        setDeleteDialogOpen(false)
        setSelectedUserId(null)
    }

    const handleRoleChange = (userId: string, roleName: string) => {
        router.put(
            route('team.update-role', userId),
            { role: roleName },
            {
                preserveScroll: true,
            }
        )
    }

    const handleResendClick = (userId: string) => {
        setSelectedUserId(userId)
        setResendDialogOpen(true)
    }

    const handleResendConfirm = () => {
        if (selectedUserId) {
            router.post(
                route('team.resend-invite', selectedUserId),
                {},
                {
                    preserveScroll: true,
                }
            )
        }
        setResendDialogOpen(false)
        setSelectedUserId(null)
    }

    const teamName = userType === 'organisation'
        ? currentOrganisation?.name
        : currentCustomer?.name

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/dashboard">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Manage Team</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Head title="Manage Team" />

                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold">Manage Team</h1>
                            <p className="text-muted-foreground mt-1">
                                {teamName}
                            </p>
                        </div>
                        <Link href={route('team.create')}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Team Member
                            </Button>
                        </Link>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Last Login</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teamMembers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                            No team members found. Add your first team member to get started.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    teamMembers.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell className="font-medium">{member.name}</TableCell>
                                            <TableCell>{member.email}</TableCell>
                                            <TableCell>
                                                <Select
                                                    value={member.role ?? ''}
                                                    onValueChange={(value) => handleRoleChange(member.id, value)}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {roles.map((role) => (
                                                            <SelectItem key={role.id} value={role.name}>
                                                                {role.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(member.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                {member.last_login_at
                                                    ? new Date(member.last_login_at).toLocaleDateString()
                                                    : 'Never'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    {!member.last_login_at && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleResendClick(member.id)}
                                                            title="Resend invitation"
                                                        >
                                                            <Mail className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(member.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
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
            </SidebarInset>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Team Member</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to remove this team member? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Remove
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Resend Invitation Dialog */}
            <Dialog open={resendDialogOpen} onOpenChange={setResendDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Resend Invitation</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to resend the invitation email to this team member? They will receive a new password setup link.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setResendDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleResendConfirm}>
                            Resend
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    )
}
