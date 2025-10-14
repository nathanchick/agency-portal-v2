"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Bot, Clock,
    Command,
    Frame,
    GalleryVerticalEnd, HeartPulseIcon, LockIcon,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Deploy eCommerce",
            logo: GalleryVerticalEnd,
            plan: "Organisation",
        },
        {
            name: "Allens of Kingsbury",
            logo: AudioWaveform,
            plan: "Customer",
        },
        {
            name: "Case Luggage",
            logo: Command,
            plan: "Customer",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Deployments",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Past",
                    url: "#",
                },
                {
                    title: "Planned",
                    url: "#",
                },
            ],
        },
        {
            title: "Timesheets",
            url: "#",
            icon: Clock,
            items: [
                {
                    title: "Technical Support",
                    url: "#",
                },
                {
                    title: "Marketing Support",
                    url: "#",
                },
                {
                    title: "Reports",
                    url: "#",
                }
            ],
        },
        {
            title: "Documents",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "Tickets",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "Site Health",
            url: "#",
            icon: HeartPulseIcon,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "Security",
            url: "#",
            icon: LockIcon,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "Billing/Subscriptions",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        // {
        //     name: "Design Engineering",
        //     url: "#",
        //     icon: Frame,
        // },
        // {
        //     name: "Sales & Marketing",
        //     url: "#",
        //     icon: PieChart,
        // },
        // {
        //     name: "Travel",
        //     url: "#",
        //     icon: Map,
        // },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
