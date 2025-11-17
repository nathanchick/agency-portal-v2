/**
 * AddWidgetDialog Component
 *
 * Dialog for adding new widgets to the dashboard.
 * Displays available widgets filtered by what's already on the dashboard,
 * with search functionality and grouping by module.
 */

import { useState, useMemo } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, LayoutGrid } from 'lucide-react'
import * as LucideIcons from 'lucide-react'

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

interface AddWidgetDialogProps {
    open: boolean
    onClose: () => void
    availableWidgets: WidgetConfig[]
    currentWidgets: UserWidget[]
    onAdd: (widgetConfig: WidgetConfig) => void
}

export function AddWidgetDialog({
    open,
    onClose,
    availableWidgets,
    currentWidgets,
    onAdd,
}: AddWidgetDialogProps) {
    const [searchQuery, setSearchQuery] = useState('')

    // Filter out widgets that are already on the dashboard
    const widgetsNotOnDashboard = useMemo(() => {
        const currentWidgetKeys = new Set(currentWidgets.map(w => w.widget_key))
        return availableWidgets.filter(widget => !currentWidgetKeys.has(widget.key))
    }, [availableWidgets, currentWidgets])

    // Filter widgets by search query
    const filteredWidgets = useMemo(() => {
        if (!searchQuery.trim()) {
            return widgetsNotOnDashboard
        }

        const query = searchQuery.toLowerCase()
        return widgetsNotOnDashboard.filter(widget =>
            widget.name.toLowerCase().includes(query) ||
            widget.description.toLowerCase().includes(query) ||
            widget.module.toLowerCase().includes(query)
        )
    }, [widgetsNotOnDashboard, searchQuery])

    // Group widgets by module
    const widgetsByModule = useMemo(() => {
        const grouped = new Map<string, WidgetConfig[]>()

        filteredWidgets.forEach(widget => {
            const moduleWidgets = grouped.get(widget.module) || []
            moduleWidgets.push(widget)
            grouped.set(widget.module, moduleWidgets)
        })

        // Sort modules alphabetically
        return new Map([...grouped.entries()].sort((a, b) => a[0].localeCompare(b[0])))
    }, [filteredWidgets])

    const handleAddWidget = (widget: WidgetConfig) => {
        onAdd(widget)
        setSearchQuery('') // Clear search
        onClose()
    }

    // Get Lucide icon component by name
    const getIcon = (iconName?: string): React.ReactElement => {
        if (!iconName) return <LayoutGrid className="h-5 w-5" />

        const IconComponent = (LucideIcons as any)[iconName]
        if (IconComponent) {
            return <IconComponent className="h-5 w-5" />
        }

        return <LayoutGrid className="h-5 w-5" />
    }

    // Convert Map to array for iteration
    const widgetModuleEntries = Array.from(widgetsByModule.entries())

    const hasNoWidgetsAvailable = widgetsNotOnDashboard.length === 0
    const hasNoSearchResults = filteredWidgets.length === 0 && searchQuery.trim() !== ''

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Add Widget</DialogTitle>
                    <DialogDescription>
                        Choose a widget to add to your dashboard
                    </DialogDescription>
                </DialogHeader>

                {hasNoWidgetsAvailable ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <LayoutGrid className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-sm font-medium">No widgets available</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            All available widgets are already on your dashboard
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Search input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search widgets by name, description, or module..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Widget list */}
                        <div className="flex-1 overflow-y-auto pr-4 max-h-[500px]">
                            {hasNoSearchResults ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-sm font-medium">No widgets found</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Try searching with different keywords
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {widgetModuleEntries.map(([module, widgets]) => (
                                        <div key={module}>
                                            <div className="flex items-center gap-2 mb-3">
                                                <h3 className="text-sm font-semibold">{module}</h3>
                                                <Badge variant="secondary" className="text-xs">
                                                    {widgets.length}
                                                </Badge>
                                            </div>

                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {widgets.map((widget) => (
                                                    <Card
                                                        key={widget.key}
                                                        className="cursor-pointer hover:border-primary transition-colors group"
                                                        onClick={() => handleAddWidget(widget)}
                                                    >
                                                        <CardHeader>
                                                            <div className="flex items-start justify-between gap-3">
                                                                <div className="flex items-start gap-3 flex-1">
                                                                    <div className="mt-0.5 text-muted-foreground group-hover:text-primary transition-colors">
                                                                        {getIcon(widget.icon)}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <CardTitle className="text-base mb-1">
                                                                            {widget.name}
                                                                        </CardTitle>
                                                                        <CardDescription className="text-xs line-clamp-2">
                                                                            {widget.description}
                                                                        </CardDescription>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    size="icon"
                                                                    variant="ghost"
                                                                    className="h-8 w-8 shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        handleAddWidget(widget)
                                                                    }}
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </Button>
                                                            </div>

                                                            {/* Optional: Show widget metadata */}
                                                            <div className="flex items-center gap-2 mt-2">
                                                                {widget.configurable && (
                                                                    <Badge variant="outline" className="text-xs">
                                                                        Configurable
                                                                    </Badge>
                                                                )}
                                                                <span className="text-xs text-muted-foreground">
                                                                    Width: {widget.default_width} col{widget.default_width > 1 ? 's' : ''}
                                                                </span>
                                                            </div>
                                                        </CardHeader>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
