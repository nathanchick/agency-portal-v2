import {useState, useEffect} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {AlertCircle, Link2, Loader2, ExternalLink} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface BrokenLinksCardProps {
    websiteId: string;
}

interface BrokenLink {
    crawled_url: string;
    status_code: number;
    found_on_url: string;
    link_text: string;
    internal: boolean;
}

export default function BrokenLinksCard({websiteId}: BrokenLinksCardProps) {
    const [data, setData] = useState<BrokenLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBrokenLinks = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(route('ohdear.broken-links', {websiteId}), {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch broken links');
            }

            const brokenLinks = await response.json();
            setData(brokenLinks);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrokenLinks();
    }, [websiteId]);

    const getStatusCodeColor = (statusCode: number) => {
        if (statusCode === 404) return 'destructive';
        if (statusCode >= 400 && statusCode < 500) return 'warning';
        if (statusCode >= 500) return 'secondary';
        return 'outline';
    };

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Broken Links</CardTitle>
                    <CardDescription>
                        View broken links detected on your website
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <Loader2 className="h-12 w-12 mx-auto mb-4 opacity-50 animate-spin"/>
                            <p className="text-muted-foreground">Loading broken links...</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Broken Links</CardTitle>
                    <CardDescription>
                        View broken links detected on your website
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    if (data.length === 0) {
        return (
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
                            <Link2 className="h-12 w-12 mx-auto mb-4 opacity-50 text-green-500"/>
                            <p className="font-medium">No broken links found!</p>
                            <p className="text-sm mt-2">Your website has no broken links</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Broken Links</CardTitle>
                <CardDescription>
                    Found {data.length} broken link{data.length !== 1 ? 's' : ''} on your website
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Status</TableHead>
                                <TableHead>Broken URL</TableHead>
                                <TableHead>Link Text</TableHead>
                                <TableHead>Found On</TableHead>
                                <TableHead className="w-[100px]">Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((link, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Badge variant={getStatusCodeColor(link.status_code)}>
                                            {link.status_code}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">
                                        {link.crawled_url}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {link.link_text || <span className="text-muted-foreground italic">No text</span>}
                                    </TableCell>
                                    <TableCell>
                                        <a
                                            href={link.found_on_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-primary hover:underline"
                                        >
                                            <span className="truncate max-w-xs">{link.found_on_url}</span>
                                            <ExternalLink className="h-3 w-3 flex-shrink-0"/>
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={link.internal ? 'outline' : 'secondary'}>
                                            {link.internal ? 'Internal' : 'External'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
