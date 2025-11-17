/**
 * QuickLinksWidget Component
 *
 * Displays customizable quick access links for frequently used pages.
 * Placeholder implementation - will be fully implemented in Task 28.
 */

import { BaseWidget } from '@/widgets/BaseWidget'
import { WidgetProps } from '@/widgets'
import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { ExternalLink } from 'lucide-react'

export function QuickLinksWidget({ settings, isEditing }: WidgetProps) {
    // Placeholder quick links
    const quickLinks = [
        { name: 'Tickets', url: route('tickets.index'), icon: 'Ticket' },
        { name: 'Customers', url: route('customers.index'), icon: 'Users' },
        { name: 'Timesheet', url: route('timesheet.entries.index'), icon: 'Clock' },
        { name: 'Documents', url: route('documents.pending'), icon: 'FileText' },
        { name: 'Settings', url: route('settings.organisation'), icon: 'Settings' },
        { name: 'Deployments', url: route('deployments.index'), icon: 'Rocket' },
    ]

    const linksCount = settings?.links_count || 6
    const displayLinks = quickLinks.slice(0, linksCount)

    if (isEditing) {
        return (
            <BaseWidget title="Quick Links" icon="Link">
                <div className="text-sm text-muted-foreground text-center py-8">
                    Quick access links will be displayed here
                </div>
            </BaseWidget>
        )
    }

    return (
        <BaseWidget title="Quick Links" icon="Link">
            <div className="grid grid-cols-2 gap-2">
                {displayLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.url}
                        className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                        <ExternalLink className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm font-medium truncate">{link.name}</span>
                    </Link>
                ))}
            </div>
        </BaseWidget>
    )
}
