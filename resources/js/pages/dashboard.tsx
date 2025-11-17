import { useEffect, useState } from "react"
import { router, usePage } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { AppSidebar } from "@/components/app-sidebar"
import { NotificationBell } from "@/components/notification-bell"
import { useNotifications } from "@/hooks/useNotifications"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Edit, Save, X, AlertCircle, LayoutGrid } from "lucide-react"
import { toast } from "sonner"

interface UserWidget {
    id: number
    widget_key: string
    position: number
    width: number
    is_visible: boolean
    settings?: Record<string, any>
}

interface WidgetConfig {
    key: string
    module: string
    name: string
    description: string
    icon?: string
    component: string
    default_width: number
    default_visible: boolean
    roles: string[]
    configurable: boolean
    settings_schema?: Record<string, any>
}

interface DashboardPageProps {
    widgets: UserWidget[]
    availableWidgets: WidgetConfig[]
}

export default function Page() {
    const { count, refreshCount } = useNotifications()
    const { props } = usePage<DashboardPageProps>()

    const [widgets, setWidgets] = useState<UserWidget[]>(props.widgets || [])
    const [availableWidgets, setAvailableWidgets] = useState<WidgetConfig[]>(props.availableWidgets || [])
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Fetch widgets from API on mount (optional - using Inertia props by default)
    useEffect(() => {
        // If we want to fetch fresh data instead of using Inertia props
        // We can uncomment this to fetch via API
        /*
        const fetchWidgets = async () => {
            try {
                setIsLoading(true)
                setError(null)
                const response = await fetch(route('dashboard.widgets.index'))
                if (!response.ok) throw new Error('Failed to load widgets')
                const data = await response.json()
                setWidgets(data.user_widgets || [])
                setAvailableWidgets(data.available_widgets || [])
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load widgets')
            } finally {
                setIsLoading(false)
            }
        }
        fetchWidgets()
        */
    }, [])

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    const handleCancel = () => {
        // Reset to original widgets from props
        setWidgets(props.widgets || [])
        setIsEditing(false)
    }

    const handleSave = async () => {
        try {
            setIsSaving(true)
            setError(null)

            const response = await fetch(route('dashboard.widgets.save'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ widgets }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || 'Failed to save layout')
            }

            const data = await response.json()

            toast.success("Dashboard layout saved successfully")

            setIsEditing(false)

            // Update with saved widgets
            if (data.widgets) {
                setWidgets(data.widgets)
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to save layout'
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setIsSaving(false)
        }
    }

    // Loading skeleton
    if (isLoading) {
        return (
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4 flex-1">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="ml-auto px-4">
                            <NotificationBell count={count} onUpdate={refreshCount} />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-48 w-full" />
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )
    }

    // Error state
    if (error && !isEditing) {
        return (
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4 flex-1">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="ml-auto px-4">
                            <NotificationBell count={count} onUpdate={refreshCount} />
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                        <Button onClick={() => window.location.reload()}>
                            Reload Page
                        </Button>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )
    }

    // Empty state
    const visibleWidgets = widgets.filter(w => w.is_visible)
    const hasNoWidgets = visibleWidgets.length === 0

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4 flex-1">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="ml-auto px-4 flex items-center gap-2">
                        {isEditing ? (
                            <>
                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {isSaving ? 'Saving...' : 'Save'}
                                </Button>
                                <Button
                                    onClick={handleCancel}
                                    disabled={isSaving}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <X className="h-4 w-4" />
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={handleEditToggle}
                                variant="outline"
                                size="sm"
                                className="gap-2"
                            >
                                <Edit className="h-4 w-4" />
                                Customize Dashboard
                            </Button>
                        )}
                        <NotificationBell count={count} onUpdate={refreshCount} />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {hasNoWidgets && !isEditing ? (
                        <Card>
                            <CardHeader className="text-center">
                                <div className="flex justify-center mb-4">
                                    <LayoutGrid className="h-12 w-12 text-muted-foreground" />
                                </div>
                                <CardTitle>No Widgets Configured</CardTitle>
                                <CardDescription>
                                    Your dashboard is empty. Click "Customize Dashboard" to add widgets.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-center">
                                <Button onClick={handleEditToggle} className="gap-2">
                                    <Edit className="h-4 w-4" />
                                    Customize Dashboard
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {visibleWidgets
                                .sort((a, b) => a.position - b.position)
                                .map((widget) => {
                                    const config = availableWidgets.find(w => w.key === widget.widget_key)

                                    return (
                                        <div
                                            key={widget.id}
                                            className={`
                                                col-span-1
                                                ${widget.width >= 2 ? 'md:col-span-2' : ''}
                                                ${widget.width >= 3 ? 'lg:col-span-3' : ''}
                                            `}
                                        >
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg">
                                                        {config?.name || widget.widget_key}
                                                    </CardTitle>
                                                    {config?.description && (
                                                        <CardDescription>
                                                            {config.description}
                                                        </CardDescription>
                                                    )}
                                                </CardHeader>
                                                <CardContent>
                                                    {isEditing ? (
                                                        <div className="text-sm text-muted-foreground py-8 text-center">
                                                            Preview disabled in edit mode
                                                        </div>
                                                    ) : (
                                                        <div className="text-sm text-muted-foreground py-8 text-center">
                                                            Widget content will be displayed here
                                                            <br />
                                                            <span className="text-xs">
                                                                Component: {config?.component || 'Unknown'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )
                                })}
                        </div>
                    )}

                    {isEditing && (
                        <Card className="border-dashed">
                            <CardContent className="pt-6">
                                <div className="text-center text-sm text-muted-foreground">
                                    <p className="mb-2">Editing Mode Active</p>
                                    <p className="text-xs">
                                        Drag and drop, widget settings, and add widget features will be implemented in subsequent tasks.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
