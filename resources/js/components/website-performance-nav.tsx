import {cn} from '@/lib/utils';
import {Link, usePage} from '@inertiajs/react';
import {Activity, Link2, Lightbulb, Map} from 'lucide-react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {Icon} from '@/components/icon';

interface WebsitePerformanceNavProps {
    websiteId: string;
    isCustomerView: boolean;
}

interface NavItem {
    title: string;
    section: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    {
        title: 'Uptime',
        section: 'uptime',
        icon: Activity,
    },
    {
        title: 'Broken Links',
        section: 'broken-links',
        icon: Link2,
    },
    {
        title: 'Lighthouse',
        section: 'lighthouse',
        icon: Lightbulb,
    },
    {
        title: 'Sitemap',
        section: 'sitemap',
        icon: Map,
    },
];

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

export function WebsitePerformanceNav({websiteId, isCustomerView}: WebsitePerformanceNavProps) {
    const page = usePage();
    const routePrefix = isCustomerView ? 'customer.websites' : 'websites';

    const getRouteForSection = (section: string) => {
        return route(`${routePrefix}.performance.${section}`, websiteId);
    };

    const isActiveSection = (section: string) => {
        const expectedUrl = getRouteForSection(section);
        return page.url === expectedUrl || page.url.startsWith(expectedUrl);
    };

    return (
        <div className="border-b border-sidebar-border/80 bg-background sticky top-0 z-10">
            <div className="flex items-center px-4 h-12">
                <NavigationMenu className="flex h-full items-stretch">
                    <NavigationMenuList className="flex h-full items-stretch space-x-2">
                        {navItems.map((item) => {
                            const isActive = isActiveSection(item.section);
                            return (
                                <NavigationMenuItem
                                    key={item.section}
                                    className="relative flex h-full items-center"
                                >
                                    <Link
                                        href={getRouteForSection(item.section)}
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            isActive && activeItemStyles,
                                            'h-9 cursor-pointer px-3',
                                        )}
                                    >
                                        <Icon iconNode={item.icon} className="mr-2 h-4 w-4"/>
                                        {item.title}
                                    </Link>
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                    )}
                                </NavigationMenuItem>
                            );
                        })}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
}
