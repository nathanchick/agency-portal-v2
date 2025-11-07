import {useState, useEffect} from 'react';
import {router} from '@inertiajs/react';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Badge} from '@/components/ui/badge';
import {Plus, Trash2, AlertCircle, Shield, Activity} from 'lucide-react';

interface OhdearWebsite {
    id: string;
    website_id: string;
    ohdear_site_id: number;
    team_id: string;
    url: string;
    urls: string[];
}

interface SetupMonitoringDialogProps {
    open: boolean;
    onClose: () => void;
    websiteId: string;
    websiteUrl: string;
    existingMonitors?: OhdearWebsite[];
}

export default function SetupMonitoringDialog({open, onClose, websiteId, websiteUrl, existingMonitors = []}: SetupMonitoringDialogProps) {
    const isManageMode = existingMonitors.length > 0;
    const [newUrl, setNewUrl] = useState('');
    const [publicConfirmation, setPublicConfirmation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // For setup mode - collect all URLs to send at once
    const [setupUrls, setSetupUrls] = useState<string[]>([websiteUrl]);

    useEffect(() => {
        // Reset state when dialog opens/closes
        if (open) {
            setNewUrl('');
            setError(null);
            if (!isManageMode) {
                setSetupUrls([websiteUrl]);
                setPublicConfirmation(false);
            }
        }
    }, [open, websiteUrl, isManageMode]);

    const handleSetupAddUrl = () => {
        if (setupUrls.length < 5) {
            setSetupUrls([...setupUrls, '']);
        }
    };

    const handleSetupRemoveUrl = (index: number) => {
        // Can't remove the base URL (index 0)
        if (index > 0 && setupUrls.length > 1) {
            const newUrls = setupUrls.filter((_, i) => i !== index);
            setSetupUrls(newUrls);
        }
    };

    const handleSetupUrlChange = (index: number, value: string) => {
        const newUrls = [...setupUrls];
        newUrls[index] = value;
        setSetupUrls(newUrls);
    };

    const handleSetupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        const validUrls = setupUrls.filter(url => url.trim() !== '');
        if (validUrls.length === 0) {
            setError('Please add at least one URL');
            return;
        }

        if (!publicConfirmation) {
            setError('Please confirm that the website is publicly accessible');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(route('ohdear.setup', {websiteId}), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    urls: validUrls,
                    public_confirmation: publicConfirmation,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                router.reload();
                onClose();
            } else {
                setError(data.error || 'Failed to setup monitoring');
            }
        } catch (err) {
            setError('An error occurred while setting up monitoring');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddUrl = async () => {
        if (!newUrl.trim()) {
            setError('Please enter a URL');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(route('ohdear.add-url', {websiteId}), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    url: newUrl,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                router.reload();
                setNewUrl('');
            } else {
                setError(data.error || 'Failed to add URL');
            }
        } catch (err) {
            setError('An error occurred while adding URL');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteUrl = async (monitorId: string) => {
        setDeletingId(monitorId);
        setError(null);

        try {
            const response = await fetch(route('ohdear.delete-url', {websiteId, ohdearWebsiteId: monitorId}), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            const data = await response.json();

            if (response.ok) {
                router.reload();
            } else {
                setError(data.error || 'Failed to delete URL');
            }
        } catch (err) {
            setError('An error occurred while deleting URL');
        } finally {
            setDeletingId(null);
        }
    };

    const handleClose = () => {
        if (!isSubmitting && !deletingId) {
            setNewUrl('');
            setSetupUrls([websiteUrl]);
            setPublicConfirmation(false);
            setError(null);
            onClose();
        }
    };

    const isBaseUrl = (url: string) => {
        if (!url || !websiteUrl) return false;
        // Normalize URLs by removing trailing slashes and converting to lowercase for comparison
        const normalizeUrl = (u: string) => u.toLowerCase().replace(/\/$/, '');
        return normalizeUrl(url) === normalizeUrl(websiteUrl);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px]">
                {isManageMode ? (
                    // Manage Mode
                    <div>
                        <DialogHeader>
                            <DialogTitle>Manage Monitoring</DialogTitle>
                            <DialogDescription>
                                Add or remove URLs to monitor. Base URL has all checks enabled, additional URLs have uptime and lighthouse only.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4"/>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-3">
                                <Label>Existing Monitors</Label>
                                {existingMonitors.map((monitor) => (
                                    <div key={monitor.id} className="flex items-start gap-2 p-3 border rounded-lg">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{monitor.url}</span>
                                                {isBaseUrl(monitor.url) ? (
                                                    <Badge variant="default" className="text-xs">
                                                        <Shield className="h-3 w-3 mr-1"/>
                                                        All Checks
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="text-xs">
                                                        <Activity className="h-3 w-3 mr-1"/>
                                                        Limited
                                                    </Badge>
                                                )}
                                            </div>
                                            {monitor.urls && monitor.urls.length > 0 && (
                                                <div className="text-xs text-muted-foreground">
                                                    <span className="font-medium">Monitoring: </span>
                                                    <span>{monitor.urls[0]}</span>
                                                </div>
                                            )}
                                            <div className="text-xs text-muted-foreground">
                                                {isBaseUrl(monitor.url) ? (
                                                    <span>Checks: Uptime, Broken Links, Certificate Health, Lighthouse, Cron, Sitemap, Mixed Content</span>
                                                ) : (
                                                    <span>Checks: Uptime, Lighthouse</span>
                                                )}
                                            </div>
                                        </div>
                                        {!isBaseUrl(monitor.url) && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteUrl(monitor.id)}
                                                disabled={deletingId === monitor.id}
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive"/>
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {existingMonitors.length < 5 && (
                                <div className="space-y-3">
                                    <Label>Add New URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="url"
                                            placeholder="https://example.com/additional-page"
                                            value={newUrl}
                                            onChange={(e) => setNewUrl(e.target.value)}
                                            disabled={isSubmitting}
                                        />
                                        <Button
                                            type="button"
                                            onClick={handleAddUrl}
                                            disabled={isSubmitting || !newUrl.trim()}
                                        >
                                            <Plus className="h-4 w-4 mr-2"/>
                                            Add
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Additional URLs will be monitored for uptime and lighthouse checks only.
                                    </p>
                                </div>
                            )}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting || !!deletingId}>
                                Close
                            </Button>
                        </DialogFooter>
                    </div>
                ) : (
                    // Setup Mode
                    <form onSubmit={handleSetupSubmit}>
                        <DialogHeader>
                            <DialogTitle>Setup Monitoring</DialogTitle>
                            <DialogDescription>
                                Configure monitoring for this website. Base URL gets all checks, additional URLs get uptime and lighthouse only.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4"/>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-3">
                                <Label>URLs to Monitor (max 5)</Label>
                                {setupUrls.map((url, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex gap-2">
                                            <div className="flex-1 relative">
                                                <Input
                                                    type="url"
                                                    placeholder={index === 0 ? "Base URL (required)" : "https://example.com/additional"}
                                                    value={url}
                                                    onChange={(e) => handleSetupUrlChange(index, e.target.value)}
                                                    disabled={isSubmitting || index === 0}
                                                    required
                                                />
                                                {index === 0 && (
                                                    <Badge className="absolute right-2 top-1/2 -translate-y-1/2" variant="default">
                                                        Base URL
                                                    </Badge>
                                                )}
                                            </div>
                                            {index > 0 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleSetupRemoveUrl(index)}
                                                    disabled={isSubmitting}
                                                >
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            )}
                                        </div>
                                        {index === 0 && (
                                            <p className="text-xs text-muted-foreground">
                                                <Shield className="h-3 w-3 inline mr-1"/>
                                                All monitoring checks enabled (uptime, broken links, certificate, lighthouse, cron, sitemap, mixed content)
                                            </p>
                                        )}
                                        {index > 0 && (
                                            <p className="text-xs text-muted-foreground">
                                                <Activity className="h-3 w-3 inline mr-1"/>
                                                Limited checks (uptime and lighthouse only)
                                            </p>
                                        )}
                                    </div>
                                ))}
                                {setupUrls.length < 5 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleSetupAddUrl}
                                        disabled={isSubmitting}
                                        className="w-full"
                                    >
                                        <Plus className="h-4 w-4 mr-2"/>
                                        Add Another URL
                                    </Button>
                                )}
                            </div>

                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="public-confirmation"
                                    checked={publicConfirmation}
                                    onCheckedChange={(checked) => setPublicConfirmation(checked as boolean)}
                                    disabled={isSubmitting}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="public-confirmation"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        This website is publicly accessible
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                        Monitoring requires the website to be publicly accessible to perform monitoring checks.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Setting up...' : 'Setup Monitoring'}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
