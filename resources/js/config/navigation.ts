import {
    Activity,
    BookOpen,
    Bot,
    Clock,
    GalleryVerticalEnd,
    HeartPulseIcon,
    LockIcon,
    Map,
    PoundSterling,
    Rocket,
    SquareTerminal,
    TicketCheckIcon,
    Users,
    FileText,
} from "lucide-react"
import { route } from "ziggy-js"

export type UserType = 'organisation' | 'customer'
export type RoleType = 'Admin' | 'Manager' | 'User'

export interface NavigationItem {
    title: string
    url: string
    icon: any
    roles?: RoleType[]
    items?: NavigationSubItem[]
}

export interface NavigationSubItem {
    title: string
    url: string
    roles?: RoleType[]
    isDeletable?: boolean
    filterId?: string
}

export interface NavigationConfig {
    organisation: NavigationItem[]
    customer: NavigationItem[]
}

export const navigation: NavigationConfig = {
    organisation: [
        {
            title: "Dashboard",
            url: route('dashboard'),
            icon: SquareTerminal,
            roles: ['Admin', 'Manager', 'User'],
        },
        {
            title: "Customers",
            url: route('customers.index'),
            icon: Users,
            roles: ['Admin', 'Manager'],
        },
        {
            title: "Deployments",
            url: route('deployments.index'),
            icon: Rocket,
            roles: ['Admin', 'Manager'],
            items: [
                {
                    title: "History",
                    url: route('deployments.index'),
                    roles: ['Admin', 'Manager'],
                },
                {
                    title: "Configuration",
                    url: route('deployments.config'),
                    roles: ['Admin', 'Manager'],
                },
            ],
        },
        {
            title: "Documents",
            url: route('documents.pending'),
            icon: FileText,
            roles: ['Admin', 'Manager', 'User'],
            items: [
                {
                    title: "Pending",
                    url: route('documents.pending'),
                    roles: ['Admin', 'Manager', 'User'],
                },
                {
                    title: "Completed",
                    url: route('documents.completed'),
                    roles: ['Admin', 'Manager', 'User'],
                },
                {
                    title: "Document Types",
                    url: route('document-types.index'),
                    roles: ['Admin'],
                },
            ],
        },
        {
            title: "Tickets",
            url: route('tickets.index'),
            icon: TicketCheckIcon,
            roles: ['Admin', 'Manager', 'User'],
            items: [
                {
                    title: "All Tickets",
                    url: route('tickets.index'),
                    roles: ['Admin', 'Manager', 'User'],
                },
                // Saved filters will be dynamically inserted after "All Tickets" by useNavigation hook
                {
                    title: "Field Configuration",
                    url: route('tickets.config'),
                    roles: ['Admin', 'Manager'],
                },
                {
                    title: "Form Configuration",
                    url: route('tickets.forms.index'),
                    roles: ['Admin', 'Manager'],
                },
                {
                    title: "Automation Rules",
                    url: route('tickets.automation-rules.index'),
                    roles: ['Admin', 'Manager'],
                },
            ],
        },
        {
            title: "Timesheet",
            url: route('timesheet.entries.index'),
            icon: Clock,
            roles: ['Admin', 'Manager', 'User'],
            items: [
                {
                    title: "Time Entries",
                    url: route('timesheet.entries.index'),
                    roles: ['Admin', 'Manager', 'User'],
                },
                {
                    title: "Services",
                    url: route('timesheet.services.index'),
                    roles: ['Admin', 'Manager'],
                },
                {
                    title: "Tasks",
                    url: route('timesheet.tasks.index'),
                    roles: ['Admin', 'Manager'],
                },
            ],
        },
    ],
    customer: [
        {
            title: "Dashboard",
            url: route('dashboard'),
            icon: SquareTerminal,
            roles: ['Admin', 'Manager', 'User'],
        },
        {
            title: "Deployments",
            url: route('customer.deployments.index'),
            icon: Rocket,
            roles: ['Admin', 'Manager', 'User'],
        },
        {
            title: "Timesheets",
            url: "#",
            icon: Clock,
            roles: ['Admin', 'Manager', 'User'],
            items: [
                {
                    title: "Current Usuage",
                    url: "#",
                    roles: ['Admin', 'Manager', 'User'],
                },
                {
                    title: "Reports",
                    url: "#",
                    roles: ['Admin', 'Manager'],
                },
            ],
        },
        {
            title: "Documents",
            url: route('customer.documents.my-pending'),
            icon: BookOpen,
            roles: ['Admin', 'Manager', 'User'],
            items: [
                {
                    title: "My Pending Docs",
                    url: route('customer.documents.my-pending'),
                    roles: ['Admin', 'Manager', 'User'],
                },
                {
                    title: "My Completed Docs",
                    url: route('customer.documents.my-completed'),
                    roles: ['Admin', 'Manager', 'User'],
                },
                {
                    title: "All Pending Docs",
                    url: route('customer.documents.all-pending'),
                    roles: ['Admin', 'Manager'],
                },
                {
                    title: "All Completed Docs",
                    url: route('customer.documents.all-completed'),
                    roles: ['Admin', 'Manager'],
                },
            ],
        },
        {
            title: "Tickets",
            url: "#",
            icon: TicketCheckIcon,
            roles: ['Admin', 'Manager', 'User'],
            items: [
                {
                    title: "My Open Tickets",
                    url: route('customer.tickets.view'),
                    roles: ['Admin', 'Manager', 'User'],
                },
                {
                    title: "My Closed Tickets",
                    url: route('customer.tickets.view.closed'),
                    roles: ['Admin', 'Manager','User'],
                },
                {
                    title: "All Tickets",
                    url: route('customer.tickets.view.all'),
                    roles: ['Admin', 'Manager'],
                },
            ],
        },
        {
            title: "Site Health",
            url: "#",
            icon: HeartPulseIcon,
            roles: ['Admin', 'Manager'],
            items: [
                {
                    title: "Broken Links",
                    url: "#",
                    roles: ['Admin', 'Manager'],
                },
                {
                    title: "Cron Status",
                    url: "#",
                    roles: ['Admin', 'Manager'],
                },
                {
                    title: "Uptime Report",
                    url: "#",
                    roles: ['Admin', 'Manager'],
                },
                {
                    title: "Google Page Speed",
                    url: "#",
                    roles: ['Admin', 'Manager'],
                },
            ],
        },
        {
            title: "Security",
            url: "#",
            icon: LockIcon,
            roles: ['Admin'],
            items: [
                {
                    title: "Security Scan",
                    url: "#",
                    roles: ['Admin'],
                },
                {
                    title: "CSP Monitoring",
                    url: "#",
                    roles: ['Admin'],
                },
                {
                    title: "Vulnerability Report",
                    url: "#",
                    roles: ['Admin'],
                },
                {
                    title: "SSL Status",
                    url: "#",
                    roles: ['Admin'],
                },
            ],
        },
        {
            title: "Billing/Subscriptions",
            url: "#",
            icon: PoundSterling,
            roles: ['Admin', 'Manager'],
            items: [
                {
                    title: "Invoices",
                    url: "#",
                    roles: ['Admin', 'Manager'],
                },
                {
                    title: "Active Billing",
                    url: "#",
                    roles: ['Admin'],
                },
            ],
        },
    ],
}

export const secondaryNavigation = [
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

export const organisations = [
    {
        name: "Deploy eCommerce",
        logo: GalleryVerticalEnd,
        plan: "Organisation",
    },
]
