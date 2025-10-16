"use client"

import * as React from "react"
import {
    Activity,
    AudioWaveform,
    BookOpen,
    Bot, Clock,
    Command,
    Frame,
    GalleryVerticalEnd, HeartPulseIcon, LockIcon,
    Map,
    PieChart, PoundSterling,
    Settings2,
    SquareTerminal, TicketCheckIcon,
    Users,
    Briefcase,
    Flag,
    FileText,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { NavSecondary } from "@/components/nav-secondary"
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
    // Organisation user navigation
    navMainOrganisation: [
        {
            title: "Dashboard",
            url: route('dashboard'),
            icon: SquareTerminal,
        },
        {
            title: "Documents",
            url: "#",
            icon: FileText,
            items: [
                {
                    title: "Completed",
                    url: "#",
                },
                {
                    title: "Pending",
                    url: "#",
                },
            ],
        },
        {
            title: "Customers",
            url: "/customers",
            icon: Users,
        },
        {
            title: "Projects",
            url: "#",
            icon: Briefcase,
            items: [
                {
                    title: "Active",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Banners",
            url: "#",
            icon: Flag,
        },
    ],
    // Customer user navigation
    navMainCustomer: [
        {
            title: "Dashboard",
            url: route('dashboard'),
            icon: SquareTerminal,
        },
        {
            title: "Deployments",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Future Planned",
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
                    title: "Current Usuage",
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
                    title: "User Acceptance",
                    url: "#",
                },
                {
                    title: "Change Requests",
                    url: "#",
                },
                {
                    title: "Production Access",
                    url: "#",
                },
                {
                    title: "Terms & Contracts",
                    url: "#",
                }
            ],
        },
        {
            title: "Tickets",
            url: "#",
            icon: TicketCheckIcon,
            items: [
                {
                    title: "My Tickets (Open)",
                    url: route('my-tickets'),
                },
                {
                    title: "All Tickets",
                    url: route('all-tickets'),
                },
                {
                    title: "Closed Tickets",
                    url: "#",
                },
                {
                    title: "Reports",
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
                    title: "Broken Links",
                    url: "#",
                },
                {
                    title: "Cron Status",
                    url: "#",
                },
                {
                    title: "Uptime Report",
                    url: "#",
                },
                {
                    title: "Google Page Speed",
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
                    title: "Security Scan",
                    url: "#",
                },
                {
                    title: "CSP Monitoring",
                    url: "#",
                },
                {
                    title: "Vulnerability Report",
                    url: "#",
                },
                {
                    title: "SSL Status",
                    url: "#",
                },
            ],
        },
        {
            title: "Billing/Subscriptions",
            url: "#",
            icon: PoundSterling,
            items: [
                {
                    title: "Invoices",
                    url: "#",
                },
                {
                    title: "Active Billing",
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
    navSecondary: [
        {
            title: "Service Status",
            url: "#",
            icon: Activity,
        },
        {
            title: "View our Knowledge Base",
            url: "#",
            icon: Map,
        },
    ]
}

export function AppSidebar({ userType = 'customer', ...props }: React.ComponentProps<typeof Sidebar> & { userType?: 'organisation' | 'customer' }) {
    // Select navigation based on user type
    const navItems = userType === 'organisation' ? data.navMainOrganisation : data.navMainCustomer

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navItems} />
                <NavProjects projects={data.projects} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
