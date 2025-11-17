"use client"

import * as React from "react"
import {ChevronsUpDown, GalleryVerticalEnd, Users} from "lucide-react"
import { usePage, router } from "@inertiajs/react"
import { route } from "ziggy-js"
import AppLogoIcon from "@/components/app-logo-icon"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

type Organisation = { id: string; name: string; logo: string | null };
type Customer = { id: string; name: string; organisation_id: string; organisation?: Organisation };

export function OrganisationSwitcher() {
    const {isMobile} = useSidebar()
    const { auth } = usePage<{
        auth: {
            user: {
                organisations?: Array<Organisation>;
                customers?: Array<Customer>;
            };
            currentOrganisation: Organisation | null;
            currentCustomer: Customer | null;
            userType: 'organisation' | 'customer';
        }
    }>().props

    // Get user's organisations and customers
    const organisations = auth.user?.organisations || []
    const customers = auth.user?.customers || []
    const currentOrganisation = auth.currentOrganisation
    const currentCustomer = auth.currentCustomer
    const userType = auth.userType

    const [activeOrganisation, setActiveOrganisation] = React.useState(currentOrganisation)
    const [activeCustomer, setActiveCustomer] = React.useState(currentCustomer)
    const hasMultipleItems = organisations.length + customers.length > 1

    const handleOrganisationSwitch = (organisation: Organisation) => {
        setActiveOrganisation(organisation)
        setActiveCustomer(null)
        router.post(route('organisation.switch'), {
            organisation_id: organisation.id,
        }, {
            preserveScroll: false,
            preserveState: false,
        })
    }

    const handleCustomerSwitch = (customer: Customer) => {
        setActiveCustomer(customer)
        setActiveOrganisation(customer.organisation || null)
        router.post(route('customer.switch'), {
            customer_id: customer.id,
        }, {
            preserveScroll: false,
            preserveState: false,
        })
    }

    if (!currentOrganisation) {
        return null
    }

    // Determine display name and type
    const displayName = currentOrganisation.name
    const displayType = userType === 'customer' && currentCustomer ? currentCustomer.name : 'Organisation'
    const displayIcon = userType === 'customer' && currentCustomer ? Users : GalleryVerticalEnd

    // If only one item total, show simple button without dropdown
    if (!hasMultipleItems) {
        const Icon = displayIcon
        const isOrganisation = userType === 'organisation'

        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                            {currentOrganisation.logo ? (
                                <img src={currentOrganisation.logo} alt={currentOrganisation.name} className="size-8 object-cover" />
                            ) : (
                                isOrganisation ? (
                                    <AppLogoIcon className="size-4"/>
                                ) : (
                                    <Icon className="size-4"/>
                                )
                            )}
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{displayName}</span>
                            <span className="truncate text-xs">{displayType}</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }

    // Multiple items - show dropdown with both organisations and customers
    const Icon = displayIcon
    const isOrganisation = userType === 'organisation'

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                                {currentOrganisation.logo ? (
                                    <img src={currentOrganisation.logo} alt={currentOrganisation.name} className="size-8 object-cover" />
                                ) : (
                                    isOrganisation ? (
                                        <AppLogoIcon className="size-8"/>
                                    ) : (
                                        <Icon className="size-4"/>
                                    )
                                )}
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{displayName}</span>
                                <span className="truncate text-xs">{displayType}</span>
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
                        {organisations.length > 1 && (
                            <>
                                <DropdownMenuLabel className="text-muted-foreground text-xs">
                                    Organisations
                                </DropdownMenuLabel>
                                {organisations.map((organisation) => (
                                    <DropdownMenuItem
                                        key={organisation.id}
                                        onClick={() => handleOrganisationSwitch(organisation)}
                                        className="gap-2 p-2"
                                    >
                                        <div className="flex size-6 items-center justify-center rounded-md border">
                                            <GalleryVerticalEnd className="size-3.5 shrink-0"/>
                                        </div>
                                        {organisation.name}
                                    </DropdownMenuItem>
                                ))}
                            </>
                        )}
                        {organisations.length > 1 && customers.length > 1 && <DropdownMenuSeparator />}
                        {customers.length > 1 && (
                            <>
                                <DropdownMenuLabel className="text-muted-foreground text-xs">
                                    Customers
                                </DropdownMenuLabel>
                                {customers.map((customer) => (
                                    <DropdownMenuItem
                                        key={customer.id}
                                        onClick={() => handleCustomerSwitch(customer)}
                                        className="gap-2 p-2"
                                    >
                                        <div className="flex size-6 items-center justify-center rounded-md border">
                                            <Users className="size-3.5 shrink-0"/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>{customer.name}</span>
                                            {customer.organisation && (
                                                <span className="text-muted-foreground text-xs">
                                                    {customer.organisation.name}
                                                </span>
                                            )}
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
