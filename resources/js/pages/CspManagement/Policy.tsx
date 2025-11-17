import { Head, Link, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Shield, ArrowLeft, Globe, AlertCircle } from 'lucide-react';
import { route } from 'ziggy-js';

interface Website {
    id: string;
    url: string;
}

interface Props {
    website: Website;
    websites: Website[];
    policy: Record<string, string[]> | null;
    headerType: string | null;
    error: string | null;
}

export default function Policy({ website, websites, policy, headerType, error }: Props) {
    const handleWebsiteChange = (websiteId: string) => {
        router.get(route('customer.csp.violations.policy', websiteId));
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`CSP Policy - ${website.url}`} />
                <AppSidebarHeader
                    breadcrumbs={[
                        { title: 'Dashboard', href: route('dashboard') },
                        { title: 'CSP Violations', href: route('customer.csp.violations.index') },
                        { title: 'Current Policy' },
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-2">
                                <Shield className="h-8 w-8" />
                                Current CSP Policy
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Live Content Security Policy from production website
                            </p>
                        </div>
                        <Link href={route('customer.csp.violations.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Violations
                            </Button>
                        </Link>
                    </div>

                    {/* Website Selector */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                Select Website
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select value={website.id} onValueChange={handleWebsiteChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {websites.map((w) => (
                                        <SelectItem key={w.id} value={w.id}>
                                            {w.url}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    {/* Error Alert */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Policy Display */}
                    {policy && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>CSP Directives</CardTitle>
                                        <CardDescription className="mt-2">
                                            Fetched from: <span className="font-mono text-sm">{website.url}</span>
                                        </CardDescription>
                                    </div>
                                    {headerType && (
                                        <Badge variant={headerType === 'Enforce' ? 'default' : 'secondary'}>
                                            {headerType} Mode
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[250px]">Directive</TableHead>
                                            <TableHead>Allowed Sources</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(policy).map(([directive, sources]) => (
                                            <TableRow key={directive}>
                                                <TableCell className="font-mono text-sm font-medium align-top">
                                                    {directive}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-2">
                                                        {sources.length > 0 ? (
                                                            sources.map((source, idx) => (
                                                                <Badge
                                                                    key={idx}
                                                                    variant={
                                                                        source.startsWith("'") && source.endsWith("'")
                                                                            ? 'default'
                                                                            : 'outline'
                                                                    }
                                                                    className="font-mono text-xs"
                                                                >
                                                                    {source}
                                                                </Badge>
                                                            ))
                                                        ) : (
                                                            <span className="text-muted-foreground text-sm">
                                                                No sources defined
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {Object.keys(policy).length === 0 && (
                                    <div className="text-center py-12">
                                        <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                        <p className="text-muted-foreground">No CSP directives found</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
