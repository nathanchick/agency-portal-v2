"use client"

import * as React from "react"
import {ChevronsUpDown, GalleryVerticalEnd} from "lucide-react"
import { usePage, router } from "@inertiajs/react"
import { route } from "ziggy-js"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

export function OrganisationSwitcher() {
    const {isMobile} = useSidebar()
    const { auth } = usePage<{
        auth: {
            user: { organisations?: Array<{ id: string; name: string }> };
            currentOrganisation: { id: string; name: string } | null;
        }
    }>().props

    // Get user's organisations (in the future this will support multiple)
    const organisations = auth.user?.organisations || []
    const currentOrganisation = auth.currentOrganisation

    const [activeOrganisation, setActiveOrganisation] = React.useState(currentOrganisation)
    const hasMultipleOrganisations = organisations.length > 1

    const handleOrganisationSwitch = (organisation: { id: string; name: string }) => {
        setActiveOrganisation(organisation)
        router.post(route('organisation.switch'), {
            organisation_id: organisation.id,
        }, {
            preserveScroll: false,
            preserveState: false,
        })
    }

    if (!currentOrganisation) {
        return null
    }

    // If only one organisation, show simple button without dropdown
    if (!hasMultipleOrganisations) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            <GalleryVerticalEnd className="size-4"/>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{currentOrganisation.name}</span>
                            <span className="truncate text-xs">Organisation</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }

    // Multiple organisations - show dropdown
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <GalleryVerticalEnd className="size-4"/>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{activeOrganisation?.name || currentOrganisation.name}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-muted-foreground text-xs">
                            Organisations
                        </DropdownMenuLabel>
                        {organisations.map((organisation, index) => (
                            <DropdownMenuItem
                                key={organisation.id}
                                onClick={() => handleOrganisationSwitch(organisation)}
                                className="gap-2 p-2"
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border">
                                    <GalleryVerticalEnd className="size-3.5 shrink-0"/>
                                </div>
                                {organisation.name}
                                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
