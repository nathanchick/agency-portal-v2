import {useState} from 'react';
import {Head, router, Link} from '@inertiajs/react';
import {route} from 'ziggy-js';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Activity, Shield, ExternalLink, Settings, Pencil} from 'lucide-react';
import SetupMonitoringDialog from '@/components/setup-monitoring-dialog';

interface Customer {
    id: string;
    name: string;
}

interface Project {
    id: string;
    name: string;
}

interface OhdearWebsite {
    id: string;
    website_id: string;
    ohdear_site_id: number;
    team_id: string;
    url: string;
    urls: string[];
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
    ohdear_websites: OhdearWebsite[];
}

interface Props {
    websites: Website[];
    isCustomerView: boolean;
}

export default function WebsitesIndex({websites, isCustomerView}: Props) {
    const baseRoute = isCustomerView ? '/customer/websites' : '/websites';
    const [setupDialogOpen, setSetupDialogOpen] = useState(false);
    const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);

    const handlePerformance = (websiteId: string) => {
        router.get(`${baseRoute}/${websiteId}/performance`);
    };

    const handleSecurity = (websiteId: string) => {
        router.get(`${baseRoute}/${websiteId}/security`);
    };

    const handleSetupMonitoring = (website: Website) => {
        setSelectedWebsite(website);
        setSetupDialogOpen(true);
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Websites"/>
                <AppSidebarHeader
                    breadcrumbs={[
                        {title: 'Dashboard', href: '/dashboard'},
                        {title: 'Websites', href: ''},
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Websites</h2>
                            <p className="text-muted-foreground">
                                Monitor performance and security for your websites
                            </p>
                        </div>
                    </div>

                    {websites.length === 0 && (
                        <Card>
                            <CardContent className="flex items-center justify-center h-96">
                                <div className="text-center text-muted-foreground">
                                    <p>No websites found</p>
                                    <p className="text-sm mt-2">
                                        Contact your administrator to add websites
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {websites.map((website) => (
                            <Card key={website.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="flex items-center gap-2">
                                                {website.customer.name}
                                                <Badge variant="outline">{website.type}</Badge>
                                            </CardTitle>
                                            <CardDescription className="mt-2">
                                                <a
                                                    href={website.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 hover:underline"
                                                >
                                                    {website.url}
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </CardDescription>
                                            {website.project && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Project: {website.project.name}
                                                </p>
                                            )}
                                        </div>
                                        <Link href={route('websites.edit', {id: website.id})}>
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {website.notes && (
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {website.notes}
                                        </p>
                                    )}
                                    <div className="flex gap-2">
                                        {website.ohdear_websites?.length > 0 ? (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleSetupMonitoring(website)}
                                                    className=""
                                                >
                                                    <Settings className="h-4 w-4"/>
                                                </Button>
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    onClick={() => handlePerformance(website.id)}
                                                    className="flex-1"
                                                >
                                                    <Activity className="h-4 w-4 mr-2"/>
                                                    Performance
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => handleSetupMonitoring(website)}
                                                className="flex-1"
                                            >
                                                <Settings className="h-4 w-4 mr-2"/>
                                                Setup Monitoring
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSecurity(website.id)}
                                            className="flex-1"
                                        >
                                            <Shield className="h-4 w-4 mr-2"/>
                                            Security
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </SidebarInset>

            {selectedWebsite && (
                <SetupMonitoringDialog
                    open={setupDialogOpen}
                    onClose={() => setSetupDialogOpen(false)}
                    websiteId={selectedWebsite.id}
                    websiteUrl={selectedWebsite.url}
                    existingMonitors={selectedWebsite.ohdear_websites || []}
                />
            )}
        </SidebarProvider>
    );
}
