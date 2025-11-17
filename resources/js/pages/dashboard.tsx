import { useEffect, useState } from "react"
import { router, usePage } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { AppSidebar } from "@/components/app-sidebar"
import { NotificationBell } from "@/components/notification-bell"
import { useNotifications } from "@/hooks/useNotifications"
import { AddWidgetDialog } from "@/components/dashboard/AddWidgetDialog"
import { ConfigureWidgetDialog } from "@/components/dashboard/ConfigureWidgetDialog"
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
import { Edit, Save, X, AlertCircle, LayoutGrid, GripVertical, Plus, Settings2 } from "lucide-react"
import { toast } from "sonner"
import { getWidget } from "@/widgets"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

/**
 * SortableWidget - Wrapper component for drag-and-drop functionality
 */
interface SortableWidgetProps {
    widget: UserWidget
    config?: WidgetConfig
    isEditing: boolean
    children: React.ReactNode
    onConfigure?: (widget: UserWidget) => void
}

function SortableWidget({ widget, config, isEditing, children, onConfigure }: SortableWidgetProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: widget.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    // Determine the column span based on widget width
    const getColSpanClass = () => {
        const spans = []
        spans.push('col-span-1')
        if (widget.width >= 2) spans.push('md:col-span-2')
        if (widget.width >= 3) spans.push('lg:col-span-3')
        return spans.join(' ')
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${getColSpanClass()} ${isDragging ? 'z-50' : ''}`}
        >
            <div className="relative h-full">
                {/* Drag handle - only visible in edit mode */}
                {isEditing && (
                    <div
                        {...attributes}
                        {...listeners}
                        className="absolute -top-2 -left-2 z-10 cursor-grab active:cursor-grabbing bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                        title="Drag to reorder"
                    >
                        <GripVertical className="h-4 w-4" />
                    </div>
                )}

                {/* Settings button - only visible in edit mode and if widget is configurable */}
                {isEditing && config?.configurable && onConfigure && (
                    <div
                        className="absolute -top-2 -right-2 z-10 pointer-events-auto"
                        title="Configure widget"
                    >
                        <Button
                            size="icon"
                            variant="default"
                            className="h-8 w-8 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                            onClick={() => onConfigure(widget)}
                        >
                            <Settings2 className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* Widget content */}
                <div className={isEditing ? 'pointer-events-none' : ''}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    const { count, refreshCount } = useNotifications()
    const { props } = usePage()

    const [widgets, setWidgets] = useState<UserWidget[]>((props as any).widgets || [])
    const [availableWidgets, setAvailableWidgets] = useState<WidgetConfig[]>((props as any).availableWidgets || [])
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isAddWidgetDialogOpen, setIsAddWidgetDialogOpen] = useState(false)
    const [configureWidget, setConfigureWidget] = useState<UserWidget | null>(null)
    const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState(false)

    // Configure drag-and-drop sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Require 8px movement before drag starts
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    // Handle drag end - update widget positions
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            setWidgets((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over.id)

                // Move the widget in the array
                const newItems = arrayMove(items, oldIndex, newIndex)

                // Update positions based on new order
                return newItems.map((item, index) => ({
                    ...item,
                    position: index,
                }))
            })
        }
    }

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
        setWidgets((props as any).widgets || [])
        setIsEditing(false)
        setIsAddWidgetDialogOpen(false)
    }

    const handleAddWidget = (widgetConfig: WidgetConfig) => {
        // Create a new widget with a temporary ID (will be replaced by backend)
        const newWidget: UserWidget = {
            id: Date.now(), // Temporary ID
            widget_key: widgetConfig.key,
            position: widgets.length, // Add at the end
            width: widgetConfig.default_width,
            is_visible: true,
            settings: {}, // Start with empty settings, can be configured later
        }

        setWidgets([...widgets, newWidget])
        toast.success(`Added ${widgetConfig.name} to your dashboard`)
    }

    const handleConfigureWidget = (widget: UserWidget) => {
        setConfigureWidget(widget)
        setIsConfigureDialogOpen(true)
    }

    const handleSaveWidgetSettings = async (widgetId: number, settings: Record<string, any>) => {
        // Update the widget's settings in state
        setWidgets(prevWidgets =>
            prevWidgets.map(w =>
                w.id === widgetId
                    ? { ...w, settings }
                    : w
            )
        )

        toast.success('Widget settings updated')
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
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={visibleWidgets.map(w => w.id)}
                                strategy={rectSortingStrategy}
                            >
                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {visibleWidgets
                                        .sort((a, b) => a.position - b.position)
                                        .map((widget) => {
                                            const config = availableWidgets.find(w => w.key === widget.widget_key)

                                            // Get the widget component from the registry
                                            const WidgetComponent = getWidget(widget.widget_key)

                                            // Determine what to render
                                            let widgetContent: React.ReactNode

                                            if (WidgetComponent) {
                                                // Widget component exists, render it
                                                widgetContent = (
                                                    <WidgetComponent
                                                        settings={widget.settings}
                                                        isEditing={isEditing}
                                                    />
                                                )
                                            } else {
                                                // Fallback: Widget not found in registry
                                                widgetContent = (
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
                                                            <Alert variant="destructive">
                                                                <AlertCircle className="h-4 w-4" />
                                                                <AlertTitle>Widget Not Found</AlertTitle>
                                                                <AlertDescription>
                                                                    The widget component "{widget.widget_key}" is not registered.
                                                                    <br />
                                                                    <span className="text-xs mt-2 block">
                                                                        Expected component: {config?.component || 'Unknown'}
                                                                    </span>
                                                                </AlertDescription>
                                                            </Alert>
                                                        </CardContent>
                                                    </Card>
                                                )
                                            }

                                            return (
                                                <SortableWidget
                                                    key={widget.id}
                                                    widget={widget}
                                                    config={config}
                                                    isEditing={isEditing}
                                                    onConfigure={handleConfigureWidget}
                                                >
                                                    {widgetContent}
                                                </SortableWidget>
                                            )
                                        })}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}

                    {isEditing && (
                        <Card className="border-dashed">
                            <CardContent className="pt-6">
                                <div className="text-center text-sm text-muted-foreground">
                                    <p className="mb-2 flex items-center justify-center gap-2">
                                        <GripVertical className="h-4 w-4" />
                                        Editing Mode Active
                                    </p>
                                    <p className="text-xs mb-4">
                                        Drag the grip icon on each widget to reorder. Click "Add Widget" to add more widgets to your dashboard.
                                    </p>
                                    <Button
                                        onClick={() => setIsAddWidgetDialogOpen(true)}
                                        variant="outline"
                                        className="gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Widget
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Add Widget Dialog */}
                    <AddWidgetDialog
                        open={isAddWidgetDialogOpen}
                        onClose={() => setIsAddWidgetDialogOpen(false)}
                        availableWidgets={availableWidgets}
                        currentWidgets={widgets}
                        onAdd={handleAddWidget}
                    />

                    {/* Configure Widget Dialog */}
                    <ConfigureWidgetDialog
                        open={isConfigureDialogOpen}
                        onClose={() => {
                            setIsConfigureDialogOpen(false)
                            setConfigureWidget(null)
                        }}
                        widget={configureWidget}
                        widgetConfig={configureWidget ? availableWidgets.find(w => w.key === configureWidget.widget_key) || null : null}
                        onSave={handleSaveWidgetSettings}
                    />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
