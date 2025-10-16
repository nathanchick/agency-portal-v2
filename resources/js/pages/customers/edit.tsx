import { Head, Link, useForm, usePage, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Trash2, Plus, UserPlus } from 'lucide-react'
import { useState } from 'react'

interface User {
    id: string
    name: string
    email: string
    role_name?: string
}

interface Customer {
    id: string
    name: string
    status: number
    users: User[]
}

interface Role {
    id: string
    name: string
}

interface Props {
    customer: Customer
    availableUsers: User[]
    roles: Role[]
}

export default function EditCustomer({ customer, availableUsers, roles }: Props) {
    const { auth } = usePage<{ auth: { userType: 'organisation' | 'customer' } }>().props
    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)


    const { data, setData, put, processing, errors } = useForm({
        name: customer.name,
        status: customer.status.toString(),
    })

    const {
        data: newUserData,
        setData: setNewUserData,
        post: createUser,
        processing: creatingUser,
        errors: newUserErrors,
        reset: resetNewUser,
    } = useForm({
        name: '',
        email: '',
        role: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('customers.update', customer.id))
    }

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault()
        createUser(route('customers.users.create', customer.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateDialogOpen(false)
                resetNewUser()
            },
        })
    }

    const handleAddUser = () => {
        if (!selectedUserId) return

        router.post(
            route('customers.users.attach', customer.id),
            { user_id: selectedUserId },
            {
                preserveScroll: true,
                onSuccess: () => setSelectedUserId(''),
            }
        )
    }

    const handleRemoveUser = (userId: string) => {
        router.delete(route('customers.users.detach', { customer: customer.id, user: userId }), {
            preserveScroll: true,
        })
    }

    const handleRoleChange = (userId: string, roleName: string) => {
        router.put(
            route('customers.users.update-role', { customer: customer.id, user: userId }),
            { role: roleName },
            {
                preserveScroll: true,
            }
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar userType={auth.userType} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={route('dashboard')}>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={route('customers.index')}>
                                        Customers
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Edit Customer</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Head title="Edit Customer" />

                    <div className="max-w-4xl space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Edit Customer</CardTitle>
                                <CardDescription>
                                    Update customer information
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Company/Business Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter name"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) => setData('status', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Active</SelectItem>
                                                <SelectItem value="0">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-sm text-red-500">{errors.status}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Updating...' : 'Update Customer'}
                                        </Button>
                                        <Link href={route('customers.index')}>
                                            <Button type="button" variant="outline">
                                                Cancel
                                            </Button>
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Assigned Users</CardTitle>
                                <CardDescription>
                                    Manage users assigned to this customer
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                                            <SelectTrigger className="flex-1">
                                                <SelectValue placeholder="Select a user to add" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableUsers.map((user) => (
                                                    <SelectItem key={user.id} value={user.id}>
                                                        {user.name} ({user.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            type="button"
                                            onClick={handleAddUser}
                                            disabled={!selectedUserId}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add User
                                        </Button>
                                        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button type="button" variant="outline">
                                                    <UserPlus className="h-4 w-4 mr-2" />
                                                    Create New User
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Add User to Customer</DialogTitle>
                                                    <DialogDescription>
                                                        Add a user by email. New users will receive an email to set their password. Existing users will be notified of their new organisation assignment.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={handleCreateUser} className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="new-user-name">Name</Label>
                                                        <Input
                                                            id="new-user-name"
                                                            value={newUserData.name}
                                                            onChange={(e) => setNewUserData('name', e.target.value)}
                                                            placeholder="Enter user name"
                                                            required
                                                        />
                                                        {newUserErrors.name && (
                                                            <p className="text-sm text-red-500">{newUserErrors.name}</p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="new-user-email">Email</Label>
                                                        <Input
                                                            id="new-user-email"
                                                            type="email"
                                                            value={newUserData.email}
                                                            onChange={(e) => setNewUserData('email', e.target.value)}
                                                            placeholder="Enter email address"
                                                            required
                                                        />
                                                        {newUserErrors.email && (
                                                            <p className="text-sm text-red-500">{newUserErrors.email}</p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="new-user-role">Role</Label>
                                                        <Select
                                                            value={newUserData.role}
                                                            onValueChange={(value) => setNewUserData('role', value)}
                                                        >
                                                            <SelectTrigger id="new-user-role">
                                                                <SelectValue placeholder="Select a role" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {roles.map((role) => (
                                                                    <SelectItem key={role.id} value={role.name}>
                                                                        {role.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {newUserErrors.role && (
                                                            <p className="text-sm text-red-500">{newUserErrors.role}</p>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-2 justify-end">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() => setIsCreateDialogOpen(false)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button type="submit" disabled={creatingUser}>
                                                            {creatingUser ? 'Creating...' : 'Create User'}
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    {customer.users.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Email</TableHead>
                                                    <TableHead>Role</TableHead>
                                                    <TableHead className="w-[100px]">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {customer.users.map((user) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell>{user.name}</TableCell>
                                                        <TableCell>{user.email}</TableCell>
                                                        <TableCell>
                                                            <Select
                                                                value={user.role_name ?? ''}
                                                                onValueChange={(value) => handleRoleChange(user.id, value)}
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
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleRemoveUser(user.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4 text-red-500" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            No users assigned to this customer yet.
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
