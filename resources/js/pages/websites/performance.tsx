import {Head, router} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {ArrowLeft, Activity, Link2, Lightbulb, Map} from 'lucide-react';
import UptimeMetricsCard from '@/components/uptime/uptime-metrics-card';

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
}

export default function WebsitePerformance({website, isCustomerView}: Props) {
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

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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

                    <Tabs defaultValue="uptime" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="uptime">
                                <Activity className="h-4 w-4 mr-2"/>
                                Uptime
                            </TabsTrigger>
                            <TabsTrigger value="broken-links">
                                <Link2 className="h-4 w-4 mr-2"/>
                                Broken Links
                            </TabsTrigger>
                            <TabsTrigger value="lighthouse">
                                <Lightbulb className="h-4 w-4 mr-2"/>
                                Lighthouse
                            </TabsTrigger>
                            <TabsTrigger value="sitemap">
                                <Map className="h-4 w-4 mr-2"/>
                                Sitemap
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="uptime">
                            <UptimeMetricsCard websiteId={website.id}/>
                        </TabsContent>

                        <TabsContent value="broken-links">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Broken Links</CardTitle>
                                    <CardDescription>
                                        View broken links detected on your website
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                                        <div className="text-center">
                                            <Link2 className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                                            <p>Broken links data will appear here</p>
                                            <p className="text-sm mt-2">Monitoring integration pending</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="lighthouse">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Lighthouse Scores</CardTitle>
                                    <CardDescription>
                                        Performance, accessibility, and SEO metrics
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                                        <div className="text-center">
                                            <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                                            <p>Lighthouse scores will appear here</p>
                                            <p className="text-sm mt-2">Monitoring integration pending</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="sitemap">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sitemap</CardTitle>
                                    <CardDescription>
                                        Sitemap validation and monitoring
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                                        <div className="text-center">
                                            <Map className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                                            <p>Sitemap data will appear here</p>
                                            <p className="text-sm mt-2">Monitoring integration pending</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
