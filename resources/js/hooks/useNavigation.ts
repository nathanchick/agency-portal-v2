import { usePage } from '@inertiajs/react'
import { navigation, NavigationItem, UserType, RoleType } from '@/config/navigation'
import { route } from 'ziggy-js'

interface SavedFilter {
    id: string
    name: string
    filters: Record<string, string>
}

interface AuthProps {
    userType: UserType
    role: RoleType
    savedTicketFilters?: SavedFilter[]
}

export function useNavigation() {
    const { auth } = usePage<{ auth: AuthProps }>().props

    const filterByRole = (items: NavigationItem[]): NavigationItem[] => {
        return items
            .filter(item => {
                // If no roles specified, show to everyone
                if (!item.roles || item.roles.length === 0) return true
                // Check if user's role is in the allowed roles
                return item.roles.includes(auth.role)
            })
            .map(item => {
                // Filter sub-items if they exist
                if (item.items) {
                    return {
                        ...item,
                        items: item.items.filter(subItem => {
                            if (!subItem.roles || subItem.roles.length === 0) return true
                            return subItem.roles.includes(auth.role)
                        })
                    }
                }
                return item
            })
            // Remove items that have no sub-items after filtering
            .filter(item => {
                if (item.items) {
                    return item.items.length > 0
                }
                return true
            })
    }

    const getNavigationItems = (): NavigationItem[] => {
        let items = auth.userType === 'organisation'
            ? navigation.organisation
            : navigation.customer

        // Inject saved ticket filters dynamically
        if (auth.savedTicketFilters && auth.savedTicketFilters.length > 0 && auth.userType === 'organisation') {
            items = items.map(item => {
                if (item.title === 'Tickets' && item.items) {
                    // Find the index of "All Tickets"
                    const allTicketsIndex = item.items.findIndex(sub => sub.title === 'All Tickets')

                    if (allTicketsIndex !== -1) {
                        // Create filter items
                        const filterItems = auth.savedTicketFilters!.map(filter => ({
                            title: filter.name,
                            url: route('tickets.index', filter.filters),
                            roles: ['Admin', 'Manager', 'User'] as RoleType[],
                            isDeletable: true,
                            filterId: filter.id,
                        }))

                        // Insert filter items after "All Tickets"
                        const newItems = [
                            ...item.items.slice(0, allTicketsIndex + 1),
                            ...filterItems,
                            ...item.items.slice(allTicketsIndex + 1),
                        ]

                        return { ...item, items: newItems }
                    }
                }
                return item
            })
        }

        return filterByRole(items)
    }

    return {
        items: getNavigationItems(),
        userType: auth.userType,
        userRole: auth.role,
    }
}
