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
import {ArrowLeft, Shield, FileText, ScanLine} from 'lucide-react';

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

export default function WebsiteSecurity({website, isCustomerView}: Props) {
    const baseRoute = isCustomerView ? '/customer/websites' : '/websites';
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title={`Security - ${website.customer.name}`}/>
                <AppSidebarHeader
                    breadcrumbs={[
                        {title: 'Dashboard', href: '/dashboard'},
                        {title: 'Websites', href: baseRoute},
                        {title: 'Security', href: ''},
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">
                                {website.customer.name} Security
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

                    <Tabs defaultValue="csp" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="csp">
                                <FileText className="h-4 w-4 mr-2"/>
                                CSP Management
                            </TabsTrigger>
                            <TabsTrigger value="scanning">
                                <ScanLine className="h-4 w-4 mr-2"/>
                                Security Scanning
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="csp">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Content Security Policy Management</CardTitle>
                                    <CardDescription>
                                        Manage and monitor your website's Content Security Policy
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                                        <div className="text-center">
                                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                                            <p>CSP management data will appear here</p>
                                            <p className="text-sm mt-2">CSP Management integration pending</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="scanning">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Security Scanning</CardTitle>
                                    <CardDescription>
                                        Security vulnerability scanning powered by Sansec
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                                        <div className="text-center">
                                            <ScanLine className="h-12 w-12 mx-auto mb-4 opacity-50"/>
                                            <p>Security scanning results will appear here</p>
                                            <p className="text-sm mt-2">Sansec integration pending</p>
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
