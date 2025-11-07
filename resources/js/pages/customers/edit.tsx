import { Head, Link, useForm, usePage, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { AppSidebar } from '@/components/app-sidebar'
import {AppSidebarHeader} from '@/components/app-sidebar-header'
import {
    SidebarInset,
    SidebarProvider,
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
import { Trash2, Plus, UserPlus, Pencil } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

interface User {
    id: string
    name: string
    email: string
    role_name?: string
}

interface Project {
    id: string
    name: string
    notes?: string
    is_default?: boolean
}

interface Website {
    id: string
    type: 'production' | 'staging' | 'development'
    url: string
    notes?: string
    project?: Project
    project_id?: string
}

interface Customer {
    id: string
    name: string
    status: number
    allow_all_users: boolean
    users: User[]
    projects: Project[]
    websites: Website[]
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
    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isCreateProjectDialogOpen, setIsCreateProjectDialogOpen] = useState(false)
    const [isCreateWebsiteDialogOpen, setIsCreateWebsiteDialogOpen] = useState(false)
    const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false)
    const [isEditWebsiteDialogOpen, setIsEditWebsiteDialogOpen] = useState(false)
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [editingWebsite, setEditingWebsite] = useState<Website | null>(null)
    const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<string | null>(null)
    const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
    const [deleteWebsiteDialogOpen, setDeleteWebsiteDialogOpen] = useState(false)
    const [websiteToDelete, setWebsiteToDelete] = useState<string | null>(null)
    const [deleteCustomerDialogOpen, setDeleteCustomerDialogOpen] = useState(false)
    const [deleteConfirmText, setDeleteConfirmText] = useState('')


    const { data, setData, put, processing, errors } = useForm({
        name: customer.name,
        status: customer.status.toString(),
        allow_all_users: customer.allow_all_users,
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

    const {
        data: newProjectData,
        setData: setNewProjectData,
        post: createProject,
        processing: creatingProject,
        errors: newProjectErrors,
        reset: resetNewProject,
    } = useForm({
        name: '',
        notes: '',
    })

    const {
        data: editProjectData,
        setData: setEditProjectData,
        put: updateProject,
        processing: updatingProject,
        errors: editProjectErrors,
        reset: resetEditProject,
    } = useForm({
        name: '',
        notes: '',
    })

    const {
        data: newWebsiteData,
        setData: setNewWebsiteData,
        post: createWebsite,
        processing: creatingWebsite,
        errors: newWebsiteErrors,
        reset: resetNewWebsite,
    } = useForm({
        project_id: '',
        type: 'production' as 'production' | 'staging' | 'development',
        url: '',
        notes: '',
    })

    const {
        data: editWebsiteData,
        setData: setEditWebsiteData,
        put: updateWebsite,
        processing: updatingWebsite,
        errors: editWebsiteErrors,
        reset: resetEditWebsite,
    } = useForm({
        project_id: '',
        type: 'production' as 'production' | 'staging' | 'development',
        url: '',
        notes: '',
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
        setUserToDelete(userId)
        setDeleteUserDialogOpen(true)
    }

    const confirmRemoveUser = () => {
        if (userToDelete) {
            router.delete(route('customers.users.detach', { customer: customer.id, user: userToDelete }), {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteUserDialogOpen(false)
                    setUserToDelete(null)
                },
            })
        }
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

    const handleCreateProject = (e: React.FormEvent) => {
        e.preventDefault()
        createProject(route('customers.projects.store', customer.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateProjectDialogOpen(false)
                resetNewProject()
            },
        })
    }

    const handleEditProject = (project: Project) => {
        setEditingProject(project)
        setEditProjectData({
            name: project.name,
            notes: project.notes || '',
        })
        setIsEditProjectDialogOpen(true)
    }

    const handleUpdateProject = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingProject) {
            updateProject(route('customers.projects.update', { customer: customer.id, project: editingProject.id }), {
                preserveScroll: true,
                onSuccess: () => {
                    setIsEditProjectDialogOpen(false)
                    setEditingProject(null)
                    resetEditProject()
                },
            })
        }
    }

    const handleDeleteProject = (projectId: string) => {
        setProjectToDelete(projectId)
        setDeleteProjectDialogOpen(true)
    }

    const confirmDeleteProject = () => {
        if (projectToDelete) {
            router.delete(route('customers.projects.destroy', { customer: customer.id, project: projectToDelete }), {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteProjectDialogOpen(false)
                    setProjectToDelete(null)
                },
            })
        }
    }

    const handleCreateWebsite = (e: React.FormEvent) => {
        e.preventDefault()
        createWebsite(route('customers.websites.store', customer.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateWebsiteDialogOpen(false)
                resetNewWebsite()
            },
        })
    }

    const handleEditWebsite = (website: Website) => {
        setEditingWebsite(website)
        setEditWebsiteData({
            project_id: website.project_id || '',
            type: website.type,
            url: website.url,
            notes: website.notes || '',
        })
        setIsEditWebsiteDialogOpen(true)
    }

    const handleUpdateWebsite = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingWebsite) {
            updateWebsite(route('customers.websites.update', { customer: customer.id, website: editingWebsite.id }), {
                preserveScroll: true,
                onSuccess: () => {
                    setIsEditWebsiteDialogOpen(false)
                    setEditingWebsite(null)
                    resetEditWebsite()
                },
            })
        }
    }

    const handleDeleteWebsite = (websiteId: string) => {
        setWebsiteToDelete(websiteId)
        setDeleteWebsiteDialogOpen(true)
    }

    const confirmDeleteWebsite = () => {
        if (websiteToDelete) {
            router.delete(route('customers.websites.destroy', { customer: customer.id, website: websiteToDelete }), {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteWebsiteDialogOpen(false)
                    setWebsiteToDelete(null)
                },
            })
        }
    }

    const handleWebsiteProjectChange = (websiteId: string, projectId: string) => {
        router.put(
            route('customers.websites.update-project', { customer: customer.id, website: websiteId }),
            { project_id: projectId },
            {
                preserveScroll: true,
            }
        )
    }

    const handleDeleteCustomer = () => {
        setDeleteConfirmText('')
        setDeleteCustomerDialogOpen(true)
    }

    const confirmDeleteCustomer = () => {
        if (deleteConfirmText === 'DELETE') {
            router.delete(route('customers.destroy', customer.id))
        }
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader breadcrumbs={[
                    { title: 'Dashboard', href: route('dashboard') },
                    { title: 'Customers', href: route('customers.index') },
                    { title: 'Edit Customer', href: route('customers.edit', customer.id) }
                ]} />
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

                                    <div className="space-y-4 mt-8">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="allow_all_users"
                                                checked={data.allow_all_users}
                                                onCheckedChange={(checked) => setData('allow_all_users', checked)}
                                            />
                                            <Label htmlFor="allow_all_users" className="cursor-pointer">
                                                Allow all Organisation users
                                            </Label>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {data.allow_all_users
                                                ? 'All Organisation users are able to view this customer and all related data'
                                                : 'Only assigned Organisation users are able to view this customer and related data'}
                                        </p>
                                        {errors.allow_all_users && (
                                            <p className="text-sm text-red-500">{errors.allow_all_users}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2 pt-4 justify-between">
                                        <div className="flex gap-2">
                                            <Button type="submit" disabled={processing}>
                                                {processing ? 'Updating...' : 'Update Customer'}
                                            </Button>
                                            <Link href={route('customers.index')}>
                                                <Button type="button" variant="outline">
                                                    Cancel
                                                </Button>
                                            </Link>
                                        </div>
                                        <Button type="button" variant="destructive" onClick={handleDeleteCustomer}>
                                            Delete Customer
                                        </Button>
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
                                                                <Trash2 className="h-4 w-4 text-destructive" />
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

                        <Dialog open={deleteUserDialogOpen} onOpenChange={setDeleteUserDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Remove User</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to remove this user from the customer? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setDeleteUserDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={confirmRemoveUser}
                                    >
                                        Remove User
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Card>
                            <CardHeader>
                                <CardTitle>Projects</CardTitle>
                                <CardDescription>
                                    Manage projects for this customer
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-end">
                                        <Dialog open={isCreateProjectDialogOpen} onOpenChange={setIsCreateProjectDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button type="button">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Create Project
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Create Project</DialogTitle>
                                                    <DialogDescription>
                                                        Add a new project for this customer
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={handleCreateProject} className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="project-name">Project Name</Label>
                                                        <Input
                                                            id="project-name"
                                                            value={newProjectData.name}
                                                            onChange={(e) => setNewProjectData('name', e.target.value)}
                                                            placeholder="Enter project name"
                                                            required
                                                        />
                                                        {newProjectErrors.name && (
                                                            <p className="text-sm text-red-500">{newProjectErrors.name}</p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="project-notes">Notes (Optional)</Label>
                                                        <Input
                                                            id="project-notes"
                                                            value={newProjectData.notes}
                                                            onChange={(e) => setNewProjectData('notes', e.target.value)}
                                                            placeholder="Enter project notes"
                                                        />
                                                        {newProjectErrors.notes && (
                                                            <p className="text-sm text-red-500">{newProjectErrors.notes}</p>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-2 justify-end">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() => setIsCreateProjectDialogOpen(false)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button type="submit" disabled={creatingProject}>
                                                            {creatingProject ? 'Creating...' : 'Create Project'}
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    {customer.projects.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Notes</TableHead>
                                                    <TableHead className="w-[100px]">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {customer.projects.map((project) => (
                                                    <TableRow key={project.id}>
                                                        <TableCell>{project.name}</TableCell>
                                                        <TableCell>{project.notes || '-'}</TableCell>
                                                        <TableCell>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleEditProject(project)}
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                                {!project.is_default && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => handleDeleteProject(project.id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            No projects for this customer yet.
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Dialog open={deleteProjectDialogOpen} onOpenChange={setDeleteProjectDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Project</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete this project? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setDeleteProjectDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={confirmDeleteProject}
                                    >
                                        Delete Project
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isEditProjectDialogOpen} onOpenChange={setIsEditProjectDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Project</DialogTitle>
                                    <DialogDescription>
                                        Update project information
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleUpdateProject} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-project-name">Project Name</Label>
                                        <Input
                                            id="edit-project-name"
                                            value={editProjectData.name}
                                            onChange={(e) => setEditProjectData('name', e.target.value)}
                                            placeholder="Enter project name"
                                            required
                                        />
                                        {editProjectErrors.name && (
                                            <p className="text-sm text-red-500">{editProjectErrors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-project-notes">Notes (Optional)</Label>
                                        <Input
                                            id="edit-project-notes"
                                            value={editProjectData.notes}
                                            onChange={(e) => setEditProjectData('notes', e.target.value)}
                                            placeholder="Enter project notes"
                                        />
                                        {editProjectErrors.notes && (
                                            <p className="text-sm text-red-500">{editProjectErrors.notes}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsEditProjectDialogOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={updatingProject}>
                                            {updatingProject ? 'Updating...' : 'Update Project'}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <Card>
                            <CardHeader>
                                <CardTitle>Websites</CardTitle>
                                <CardDescription>
                                    Manage websites for this customer
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-end">
                                        <Dialog open={isCreateWebsiteDialogOpen} onOpenChange={setIsCreateWebsiteDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button type="button">
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Create Website
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Create Website</DialogTitle>
                                                    <DialogDescription>
                                                        Add a new website for this customer
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={handleCreateWebsite} className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="website-project">Project</Label>
                                                        <Select
                                                            value={newWebsiteData.project_id}
                                                            onValueChange={(value) => setNewWebsiteData('project_id', value)}
                                                        >
                                                            <SelectTrigger id="website-project">
                                                                <SelectValue placeholder="Select project" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {customer.projects.map((project) => (
                                                                    <SelectItem key={project.id} value={project.id}>
                                                                        {project.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {newWebsiteErrors.project_id && (
                                                            <p className="text-sm text-red-500">{newWebsiteErrors.project_id}</p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="website-type">Type</Label>
                                                        <Select
                                                            value={newWebsiteData.type}
                                                            onValueChange={(value) => setNewWebsiteData('type', value as 'production' | 'staging' | 'development')}
                                                        >
                                                            <SelectTrigger id="website-type">
                                                                <SelectValue placeholder="Select type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="production">Production</SelectItem>
                                                                <SelectItem value="staging">Staging</SelectItem>
                                                                <SelectItem value="development">Development</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {newWebsiteErrors.type && (
                                                            <p className="text-sm text-red-500">{newWebsiteErrors.type}</p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="website-url">URL</Label>
                                                        <Input
                                                            id="website-url"
                                                            value={newWebsiteData.url}
                                                            onChange={(e) => setNewWebsiteData('url', e.target.value)}
                                                            placeholder="https://example.com"
                                                            required
                                                        />
                                                        {newWebsiteErrors.url && (
                                                            <p className="text-sm text-red-500">{newWebsiteErrors.url}</p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="website-notes">Notes (Optional)</Label>
                                                        <Textarea
                                                            id="website-notes"
                                                            value={newWebsiteData.notes}
                                                            onChange={(e) => setNewWebsiteData('notes', e.target.value)}
                                                            placeholder="Enter website notes"
                                                        />
                                                        {newWebsiteErrors.notes && (
                                                            <p className="text-sm text-red-500">{newWebsiteErrors.notes}</p>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-2 justify-end">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() => setIsCreateWebsiteDialogOpen(false)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button type="submit" disabled={creatingWebsite}>
                                                            {creatingWebsite ? 'Creating...' : 'Create Website'}
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    {customer.websites.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Assigned To</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>URL</TableHead>
                                                    <TableHead>Notes</TableHead>
                                                    <TableHead className="w-[100px]">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {customer.websites.map((website) => (
                                                    <TableRow key={website.id}>
                                                        <TableCell>
                                                            <Select
                                                                value={website.project_id ?? ''}
                                                                onValueChange={(value) => handleWebsiteProjectChange(website.id, value)}
                                                            >
                                                                <SelectTrigger className="w-[180px]">
                                                                    <SelectValue placeholder="Select project" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {customer.projects.map((project) => (
                                                                        <SelectItem key={project.id} value={project.id}>
                                                                            {project.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </TableCell>
                                                        <TableCell className="capitalize">{website.type}</TableCell>
                                                        <TableCell>
                                                            <a href={website.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                                {website.url}
                                                            </a>
                                                        </TableCell>
                                                        <TableCell>{website.notes || '-'}</TableCell>
                                                        <TableCell>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleEditWebsite(website)}
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteWebsite(website.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            No websites for this customer yet.
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Dialog open={deleteWebsiteDialogOpen} onOpenChange={setDeleteWebsiteDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Website</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete this website? This action cannot be undone.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setDeleteWebsiteDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={confirmDeleteWebsite}
                                    >
                                        Delete Website
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isEditWebsiteDialogOpen} onOpenChange={setIsEditWebsiteDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Website</DialogTitle>
                                    <DialogDescription>
                                        Update website information
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleUpdateWebsite} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-website-project">Project</Label>
                                        <Select
                                            value={editWebsiteData.project_id}
                                            onValueChange={(value) => setEditWebsiteData('project_id', value)}
                                        >
                                            <SelectTrigger id="edit-website-project">
                                                <SelectValue placeholder="Select project" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {customer.projects.map((project) => (
                                                    <SelectItem key={project.id} value={project.id}>
                                                        {project.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {editWebsiteErrors.project_id && (
                                            <p className="text-sm text-red-500">{editWebsiteErrors.project_id}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-website-type">Type</Label>
                                        <Select
                                            value={editWebsiteData.type}
                                            onValueChange={(value) => setEditWebsiteData('type', value as 'production' | 'staging' | 'development')}
                                        >
                                            <SelectTrigger id="edit-website-type">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="production">Production</SelectItem>
                                                <SelectItem value="staging">Staging</SelectItem>
                                                <SelectItem value="development">Development</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {editWebsiteErrors.type && (
                                            <p className="text-sm text-red-500">{editWebsiteErrors.type}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-website-url">URL</Label>
                                        <Input
                                            id="edit-website-url"
                                            value={editWebsiteData.url}
                                            onChange={(e) => setEditWebsiteData('url', e.target.value)}
                                            placeholder="https://example.com"
                                            required
                                        />
                                        {editWebsiteErrors.url && (
                                            <p className="text-sm text-red-500">{editWebsiteErrors.url}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="edit-website-notes">Notes (Optional)</Label>
                                        <Textarea
                                            id="edit-website-notes"
                                            value={editWebsiteData.notes}
                                            onChange={(e) => setEditWebsiteData('notes', e.target.value)}
                                            placeholder="Enter website notes"
                                        />
                                        {editWebsiteErrors.notes && (
                                            <p className="text-sm text-red-500">{editWebsiteErrors.notes}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsEditWebsiteDialogOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={updatingWebsite}>
                                            {updatingWebsite ? 'Updating...' : 'Update Website'}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={deleteCustomerDialogOpen} onOpenChange={setDeleteCustomerDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Delete Customer</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete <strong>{customer.name}</strong>? This action cannot be undone and will delete all associated data including users, projects, and websites.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="delete-confirm">
                                            Type <strong>DELETE</strong> to confirm
                                        </Label>
                                        <Input
                                            id="delete-confirm"
                                            value={deleteConfirmText}
                                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                                            placeholder="DELETE"
                                        />
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setDeleteCustomerDialogOpen(false)
                                                setDeleteConfirmText('')
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={confirmDeleteCustomer}
                                            disabled={deleteConfirmText !== 'DELETE'}
                                        >
                                            Delete Customer
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
