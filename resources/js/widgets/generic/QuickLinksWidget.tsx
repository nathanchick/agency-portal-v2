/**
 * QuickLinksWidget Component
 *
 * Displays customizable quick access links for frequently used pages.
 * Users can configure which links to show, their icons, and whether to open in a new tab.
 *
 * Features:
 * - Customizable links via widget settings
 * - Icon support using Lucide icons
 * - Configurable grid layout (1-3 columns)
 * - Option to open links in new tab or same tab
 * - Default links based on common navigation routes
 */

import { BaseWidget } from '@/widgets/BaseWidget'
import { WidgetProps } from '@/widgets'
import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'
import * as LucideIcons from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Interface for a quick link item
 */
interface QuickLink {
    name: string
    route: string
    icon: string
    openInNewTab?: boolean
}

/**
 * Default quick links configuration
 * Used when no custom links are configured in settings
 */
const DEFAULT_QUICK_LINKS: QuickLink[] = [
    { name: 'Tickets', route: 'tickets.index', icon: 'Ticket', openInNewTab: false },
    { name: 'Customers', route: 'customers.index', icon: 'Users', openInNewTab: false },
    { name: 'Timesheet', route: 'timesheet.entries.index', icon: 'Clock', openInNewTab: false },
    { name: 'Documents', route: 'documents.pending', icon: 'FileText', openInNewTab: false },
    { name: 'Settings', route: 'settings.organisation', icon: 'Settings', openInNewTab: false },
    { name: 'Deployments', route: 'deployments.index', icon: 'Rocket', openInNewTab: false },
]

/**
 * Get a Lucide icon component by name
 * Falls back to Link icon if the specified icon is not found
 */
function getIconComponent(iconName: string): LucideIcon {
    const Icon = (LucideIcons as any)[iconName]
    return Icon || LucideIcons.Link
}

/**
 * QuickLinksWidget Component
 */
export function QuickLinksWidget({ settings, isEditing }: WidgetProps) {
    // Get links from settings or use defaults
    const links: QuickLink[] = settings?.links || DEFAULT_QUICK_LINKS
    const columns = settings?.columns || 2

    // Generate grid column class based on columns setting
    const gridColsClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
    }[columns] || 'grid-cols-2'

    if (isEditing) {
        return (
            <BaseWidget
                title="Quick Links"
                icon={<LucideIcons.Link className="h-5 w-5" />}
                description="Quick access to frequently used pages"
            >
                <div className="text-sm text-muted-foreground text-center py-8">
                    Configure your quick access links in widget settings
                </div>
            </BaseWidget>
        )
    }

    // Show empty state if no links are configured
    if (!links || links.length === 0) {
        return (
            <BaseWidget
                title="Quick Links"
                icon={<LucideIcons.Link className="h-5 w-5" />}
                showEmpty={true}
                empty={
                    <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground">No quick links configured</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Configure links in widget settings
                        </p>
                    </div>
                }
            />
        )
    }

    return (
        <BaseWidget
            title="Quick Links"
            icon={<LucideIcons.Link className="h-5 w-5" />}
            description="Quick access to frequently used pages"
        >
            <div className={cn('grid gap-2', gridColsClass)}>
                {links.map((link, index) => {
                    const IconComponent = getIconComponent(link.icon)

                    // Check if route exists and is valid
                    let href: string
                    try {
                        href = route(link.route)
                    } catch (error) {
                        // If route doesn't exist, skip this link
                        console.warn(`Route "${link.route}" not found for quick link "${link.name}"`)
                        return null
                    }

                    return (
                        <Link
                            key={`${link.route}-${index}`}
                            href={href}
                            className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors group"
                            target={link.openInNewTab ? '_blank' : undefined}
                            rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                        >
                            <IconComponent className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                            <span className="text-sm font-medium truncate flex-1">
                                {link.name}
                            </span>
                            {link.openInNewTab && (
                                <LucideIcons.ExternalLink className="h-3 w-3 flex-shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </Link>
                    )
                })}
            </div>
        </BaseWidget>
    )
}
