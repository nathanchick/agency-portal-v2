import {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {AlertCircle, Loader2, Info} from 'lucide-react';
import {toast} from 'sonner';

interface ConfigureSitemapDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    websiteId: string;
    websiteUrl: string;
    currentSitemapUrl: string;
    onSuccess: () => void;
}

export function ConfigureSitemapDialog({
    open,
    onOpenChange,
    websiteId,
    websiteUrl,
    currentSitemapUrl,
    onSuccess,
}: ConfigureSitemapDialogProps) {
    const defaultUrl = `${websiteUrl.replace(/\/$/, '')}/sitemap.xml`;
    const [sitemapUrl, setSitemapUrl] = useState(currentSitemapUrl || defaultUrl);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(route('ohdear.update-sitemap-url', {websiteId}), {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    sitemap_url: sitemapUrl,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update sitemap URL');
            }

            toast.success('Sitemap URL updated successfully!', {
                description: 'It may take up to 30 minutes for changes to be reflected.',
            });
            onSuccess();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Configure Sitemap URL</DialogTitle>
                        <DialogDescription>
                            Set the URL where your sitemap.xml file can be found. By default, this is your domain followed by '/sitemap.xml'.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4"/>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Alert>
                            <Info className="h-4 w-4"/>
                            <AlertDescription>
                                When a sitemap URL is updated, it may take up to 30 minutes for changes to be reflected in the monitoring data.
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-2">
                            <Label htmlFor="sitemap-url">Sitemap URL</Label>
                            <Input
                                id="sitemap-url"
                                type="url"
                                placeholder={defaultUrl}
                                value={sitemapUrl}
                                onChange={(e) => setSitemapUrl(e.target.value)}
                                required
                                disabled={loading}
                            />
                            <p className="text-sm text-muted-foreground">
                                Enter the full URL to your sitemap file
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm text-muted-foreground">Suggested URLs:</Label>
                            <div className="space-y-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-2 justify-start font-mono text-xs w-full"
                                    onClick={() => setSitemapUrl(defaultUrl)}
                                    disabled={loading}
                                >
                                    {defaultUrl}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-2 justify-start font-mono text-xs w-full"
                                    onClick={() => setSitemapUrl(`${websiteUrl.replace(/\/$/, '')}/sitemap_index.xml`)}
                                    disabled={loading}
                                >
                                    {websiteUrl.replace(/\/$/, '')}/sitemap_index.xml
                                </Button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
