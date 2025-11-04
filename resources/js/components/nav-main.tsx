"use client"

import { ChevronRight, X, type LucideIcon } from "lucide-react"
import { usePage, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { useState } from 'react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
            isActive?: boolean
            isDeletable?: boolean
            filterId?: string
        }[]
    }[]
}) {
    const { url } = usePage()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [filterToDelete, setFilterToDelete] = useState<{ id: string; name: string } | null>(null)

    // Helper function to check if URLs match (ignoring query strings and domain)
    const urlsMatch = (navUrl: string, currentUrl: string) => {
        // Extract just the path from the navigation URL (remove domain)
        const navPath = navUrl.split('?')[0].replace(/^https?:\/\/[^\/]+/, '')
        const currentPath = currentUrl.split('?')[0]
        return navPath === currentPath
    }

    const handleDeleteFilter = (e: React.MouseEvent, filterId: string, filterName: string) => {
        e.preventDefault()
        e.stopPropagation()

        setFilterToDelete({ id: filterId, name: filterName })
        setDeleteDialogOpen(true)
    }

    const confirmDeleteFilter = () => {
        if (filterToDelete) {
            router.delete(route('tickets.filters.destroy', filterToDelete.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteDialogOpen(false)
                    setFilterToDelete(null)
                },
            })
        }
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isItemActive = urlsMatch(item.url, url) || item.items?.some(sub => urlsMatch(sub.url, url))

                    if (item.items === undefined) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild tooltip={item.title} isActive={urlsMatch(item.url, url)}>
                                    <a href={item.url}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    }

                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={isItemActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title} className="group/subitem">
                                                <SidebarMenuSubButton asChild isActive={urlsMatch(subItem.url, url)}>
                                                    <a href={subItem.url} className="flex items-center justify-between w-full">
                                                        <span>{subItem.title}</span>
                                                        {subItem.isDeletable && subItem.filterId && (
                                                            <button
                                                                onClick={(e) => handleDeleteFilter(e, subItem.filterId!, subItem.title)}
                                                                className="opacity-0 group-hover/subitem:opacity-100 transition-opacity ml-2 p-0.5 hover:bg-muted rounded"
                                                                title="Delete filter"
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        )}
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    )
                })}
            </SidebarMenu>

            {/* Delete Filter Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Saved Filter</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{filterToDelete?.name}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDeleteFilter}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarGroup>
    )
}
