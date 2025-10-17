import { usePage } from '@inertiajs/react'
import { navigation, NavigationItem, NavigationSubItem, UserType, RoleType } from '@/config/navigation'

interface AuthProps {
    userType: UserType
    role: RoleType
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
        const items = auth.userType === 'organisation'
            ? navigation.organisation
            : navigation.customer

        return filterByRole(items)
    }

    return {
        items: getNavigationItems(),
        userType: auth.userType,
        userRole: auth.role,
    }
}
