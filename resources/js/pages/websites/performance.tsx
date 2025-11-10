import {Head, router} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {ArrowLeft} from 'lucide-react';
import {WebsitePerformanceNav} from '@/components/website-performance-nav';
import UptimeMetricsCard from '@/components/uptime/uptime-metrics-card';
import BrokenLinksCard from '@/components/broken-links/broken-links-card';
import SitemapCard from '@/components/sitemap/sitemap-card';
import LighthouseCard from '@/components/lighthouse/lighthouse-card';

interface Customer {
    id: string;
    name: string;
}

interface Project {
    id: string;
    name: string;
}

interface Website {
    id: string;
    customer_id: string;
    project_id: string | null;
    type: string;
    url: string;
    notes: string | null;
    customer: Customer;
    project?: Project;
}

interface Props {
    website: Website;
    isCustomerView: boolean;
    currentSection: 'uptime' | 'broken-links' | 'lighthouse' | 'sitemap';
}

export default function WebsitePerformance({website, isCustomerView, currentSection}: Props) {
    const baseRoute = isCustomerView ? '/customer/websites' : '/websites';
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title={`Performance - ${website.customer.name}`}/>
                <AppSidebarHeader
                    breadcrumbs={[
                        {title: 'Dashboard', href: '/dashboard'},
                        {title: 'Websites', href: baseRoute},
                        {title: 'Performance', href: ''},
                    ]}
                />

                <WebsitePerformanceNav websiteId={website.id} isCustomerView={isCustomerView}/>

                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">
                                {website.customer.name} Performance
                            </h2>
                            <p className="text-muted-foreground mt-1">
                                {website.url}
                            </p>
                            {website.project && (
                                <Badge variant="outline" className="mt-2">
                                    Project: {website.project.name}
                                </Badge>
                            )}
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => router.get(baseRoute)}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2"/>
                            Back to Websites
                        </Button>
                    </div>

                    {currentSection === 'uptime' && (
                        <UptimeMetricsCard websiteId={website.id}/>
                    )}

                    {currentSection === 'broken-links' && (
                        <BrokenLinksCard websiteId={website.id}/>
                    )}

                    {currentSection === 'lighthouse' && (
                        <LighthouseCard websiteId={website.id}/>
                    )}

                    {currentSection === 'sitemap' && (
                        <SitemapCard websiteId={website.id} websiteUrl={website.url}/>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
