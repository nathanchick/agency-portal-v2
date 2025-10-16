import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { toast, Toaster } from 'sonner'

export function ToastProvider() {
    const { flash } = usePage<{
        flash: {
            success?: string
            error?: string
            message?: string
        }
    }>().props

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success)
        }
        if (flash?.error) {
            toast.error(flash.error)
        }
        if (flash?.message) {
            toast.message(flash.message)
        }
    }, [flash])

    return <Toaster richColors position="top-right" />
}
