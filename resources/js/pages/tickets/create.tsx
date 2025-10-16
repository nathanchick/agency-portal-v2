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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"

interface Category {
    id: string
    name: string
}

interface Label {
    id: string
    name: string
}

interface Props {
    categories: Category[]
    labels: Label[]
}

export default function CreateTicket({ categories, labels }: Props) {
    const { auth } = usePage<{ auth: { userType: 'organisation' | 'customer' } }>().props
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        message: '',
        priority: 'low',
        category_ids: [] as string[],
        label_ids: [] as string[],
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        post('/tickets')
    }

    const toggleCategory = (categoryId: string) => {
        setData('category_ids',
            data.category_ids.includes(categoryId)
                ? data.category_ids.filter(id => id !== categoryId)
                : [...data.category_ids, categoryId]
        )
    }

    const toggleLabel = (labelId: string) => {
        setData('label_ids',
            data.label_ids.includes(labelId)
                ? data.label_ids.filter(id => id !== labelId)
                : [...data.label_ids, labelId]
        )
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
                                    <BreadcrumbLink href="/my-tickets">
                                        My Tickets
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>New Ticket</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="rounded-lg border bg-card">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">Create New Ticket</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Brief description of the issue"
                                        className={errors.title ? 'border-destructive' : ''}
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-destructive">{errors.title}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        placeholder="Detailed description of your issue"
                                        rows={6}
                                        className={errors.message ? 'border-destructive' : ''}
                                    />
                                    {errors.message && (
                                        <p className="text-sm text-destructive">{errors.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select value={data.priority} onValueChange={(value) => setData('priority', value)}>
                                        <SelectTrigger>
                                            <SelectValue />
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

                                {categories.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>Categories</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {categories.map((category) => (
                                                <div key={category.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`category-${category.id}`}
                                                        checked={data.category_ids.includes(category.id)}
                                                        onCheckedChange={() => toggleCategory(category.id)}
                                                    />
                                                    <label
                                                        htmlFor={`category-${category.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {category.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {labels.length > 0 && (
                                    <div className="space-y-2">
                                        <Label>Labels</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {labels.map((label) => (
                                                <div key={label.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`label-${label.id}`}
                                                        checked={data.label_ids.includes(label.id)}
                                                        onCheckedChange={() => toggleLabel(label.id)}
                                                    />
                                                    <label
                                                        htmlFor={`label-${label.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {label.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create Ticket'}
                                    </Button>
                                    <Button type="button" variant="outline" asChild>
                                        <a href="/my-tickets">Cancel</a>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
