import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'

/**
 * Debug component that logs auth data to console
 * Only active in development mode
 */
export function AuthDebug() {
    const { auth, roles, permissions } = usePage().props

    useEffect(() => {
        if (import.meta.env.DEV) {
            console.log('🔐 Auth Debug Info:')
            console.log('User Type:', (auth as any)?.userType)
            console.log('User Role:', (auth as any)?.role)
            console.log('Spatie Roles:', roles)
            console.log('Spatie Permissions:', permissions)
            console.log('Current Organisation:', (auth as any)?.currentOrganisation)
            console.log('Current Customer:', (auth as any)?.currentCustomer)
            console.log('Full Auth Data:', auth)
        }
    }, [auth, roles, permissions])

    return null
}
