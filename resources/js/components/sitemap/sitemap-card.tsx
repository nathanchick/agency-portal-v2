import {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {AlertCircle, Map, Loader2, Settings, CheckCircle, XCircle, ExternalLink} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {ConfigureSitemapDialog} from './configure-sitemap-dialog';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {ChevronDown} from 'lucide-react';

interface SitemapCardProps {
    websiteId: string;
    websiteUrl: string;
}

interface SitemapData {
    check_url: string;
    total_url_count: number;
    total_issues_count: number;
    has_issues: boolean;
    issues: Array<{message: string; type: string}>;
    sitemap_indexes: Array<{url: string; issues: any[]}>;
    sitemaps: Array<{url: string; url_count: number; issues: any[]}>;
    error?: string;
}

export default function SitemapCard({websiteId, websiteUrl}: SitemapCardProps) {
    const [data, setData] = useState<SitemapData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchSitemapData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(route('ohdear.sitemap', {websiteId}), {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch sitemap data');
            }

            const sitemapData = await response.json();
            setData(sitemapData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSitemapData();
    }, [websiteId]);

    const handleSitemapUpdated = () => {
        setDialogOpen(false);
        fetchSitemapData();
    };

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Sitemap</CardTitle>
                    <CardDescription>
                        Sitemap validation and monitoring
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <Loader2 className="h-12 w-12 mx-auto mb-4 opacity-50 animate-spin"/>
                            <p className="text-muted-foreground">Loading sitemap data...</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error || data?.error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Sitemap</CardTitle>
                    <CardDescription>
                        Sitemap validation and monitoring
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>{error || data?.error}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    if (!data) {
        return (
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
                            <p>No sitemap data available</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <CardTitle>Sitemap</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                                <a
                                    href={data.check_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs hover:underline flex items-center gap-1"
                                >
                                    {data.check_url}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
                            <Settings className="h-4 w-4 mr-2"/>
                            Configure
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Total URLs</p>
                            <p className="text-2xl font-bold">{data.total_url_count}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Issues Found</p>
                            <p className="text-2xl font-bold flex items-center gap-2">
                                {data.total_issues_count}
                                {data.has_issues ? (
                                    <XCircle className="h-5 w-5 text-destructive"/>
                                ) : (
                                    <CheckCircle className="h-5 w-5 text-green-500"/>
                                )}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Status</p>
                            <Badge variant={data.has_issues ? 'destructive' : 'default'} className="mt-1">
                                {data.has_issues ? 'Has Issues' : 'Healthy'}
                            </Badge>
                        </div>
                    </div>

                    {/* General Issues */}
                    {data.issues && data.issues.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="font-semibold">General Issues</h3>
                            <div className="space-y-2">
                                {data.issues.map((issue, index) => (
                                    <Alert key={index} variant="destructive">
                                        <AlertCircle className="h-4 w-4"/>
                                        <AlertDescription>
                                            <span className="font-medium">{issue.type}:</span> {issue.message}
                                        </AlertDescription>
                                    </Alert>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sitemap Indexes */}
                    {data.sitemap_indexes && data.sitemap_indexes.length > 0 && (
                        <Collapsible>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" className="flex w-full justify-between p-4 border rounded-lg">
                                    <span className="font-semibold">Sitemap Indexes ({data.sitemap_indexes.length})</span>
                                    <ChevronDown className="h-4 w-4"/>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-3">
                                <div className="space-y-3">
                                    {data.sitemap_indexes.map((index, idx) => (
                                        <div key={idx} className="border rounded-lg p-3 space-y-2">
                                            <p className="font-mono text-sm">{index.url}</p>
                                            {index.issues && index.issues.length > 0 && (
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-destructive">
                                                        {index.issues.length} issue(s)
                                                    </p>
                                                    {index.issues.map((issue: any, i: number) => (
                                                        <p key={i} className="text-sm text-muted-foreground">
                                                            • {issue.message}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    )}

                    {/* Individual Sitemaps */}
                    {data.sitemaps && data.sitemaps.length > 0 && (
                        <Collapsible>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" className="flex w-full justify-between p-4 border rounded-lg">
                                    <span className="font-semibold">Individual Sitemaps ({data.sitemaps.length})</span>
                                    <ChevronDown className="h-4 w-4"/>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-3">
                                <div className="space-y-3">
                                    {data.sitemaps.map((sitemap, idx) => (
                                        <div key={idx} className="border rounded-lg p-3 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <p className="font-mono text-sm">{sitemap.url}</p>
                                                <Badge variant="outline">{sitemap.url_count} URLs</Badge>
                                            </div>
                                            {sitemap.issues && sitemap.issues.length > 0 && (
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-destructive">
                                                        {sitemap.issues.length} issue(s)
                                                    </p>
                                                    {sitemap.issues.map((issue: any, i: number) => (
                                                        <p key={i} className="text-sm text-muted-foreground">
                                                            • {issue.message}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    )}
                </CardContent>
            </Card>

            <ConfigureSitemapDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                websiteId={websiteId}
                websiteUrl={websiteUrl}
                currentSitemapUrl={data.check_url}
                onSuccess={handleSitemapUpdated}
            />
        </>
    );
}
