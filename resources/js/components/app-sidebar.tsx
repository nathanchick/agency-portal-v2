"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { NavSecondary } from "@/components/nav-secondary"
import { OrganisationSwitcher } from "@/components/organisation-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useNavigation } from "@/hooks/useNavigation"
import { secondaryNavigation } from "@/config/navigation"

// This is sample data.
const data = {
    projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { items } = useNavigation()

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <OrganisationSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={items} />
                <NavProjects projects={data.projects} />
                <NavSecondary items={secondaryNavigation} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
