import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Shield,
    ArrowLeft,
    CheckCircle,
    XCircle,
    MinusCircle,
    AlertCircle,
    Calendar,
    Hash,
    Globe,
    Sparkles,
    Loader2,
} from 'lucide-react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import type { CspViolation, CspDecisionForm } from '@/types/csp';
import type { SharedData } from '@/types';
import type { CspViolationAnalysis } from '@/types/csp-analysis';
import { analyzeCspViolation } from '@/actions/Modules/OpenAi/Http/Controllers/OpenAiController';
import { CspViolationAnalysisDialog } from '@/components/csp-violation-analysis-dialog';

interface Props {
    host: string;
    directive: string;
    violations: CspViolation[];
    stats: {
        total_urls: number;
        total_occurrences: number;
        first_seen_at: string;
        last_seen_at: string;
        status: 'new' | 'approved' | 'rejected' | 'ignored';
    };
}

export default function HostDetail({ host, directive, violations, stats }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [showIgnoreDialog, setShowIgnoreDialog] = useState(false);

    // Analysis state
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<CspViolationAnalysis | null>(null);
    const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);

    const { data, setData, post, processing, reset } = useForm<CspDecisionForm>({
        notes: '',
    });

    // Collect blocked URLs for analysis
    const groupedViolations = violations.map(v => ({
        blocked_url: v.blocked_uri,
        document_url: v.document_uri,
        occurrence_count: v.occurrence_count,
    }));

    const handleApprove = () => {
        post(route('customer.csp.violations.approve'), {
            data: {
                host,
                directive,
                notes: data.notes,
            },
            preserveScroll: true,
            onSuccess: () => {
                setShowApproveDialog(false);
                reset();
            },
        });
    };

    const handleReject = () => {
        post(route('customer.csp.violations.reject'), {
            data: {
                host,
                directive,
                notes: data.notes,
            },
            preserveScroll: true,
            onSuccess: () => {
                setShowRejectDialog(false);
                reset();
            },
        });
    };

    const handleIgnore = () => {
        post(route('customer.csp.violations.ignore'), {
            data: {
                host,
                directive,
                notes: data.notes,
            },
            preserveScroll: true,
            onSuccess: () => {
                setShowIgnoreDialog(false);
                reset();
            },
        });
    };

    const handleAnalyzeViolations = async () => {
        if (!auth.currentCustomer) return;

        setIsAnalyzing(true);
        setAnalysisError(null);

        try {
            const response = await analyzeCspViolation({
                customer_id: auth.currentCustomer.id,
                host: host,
                directive: directive,
                blocked_urls: groupedViolations.map(v => v.blocked_url),
            });

            setAnalysis(response.analysis);
            setShowAnalysisDialog(true);
        } catch (error: any) {
            console.error('Analysis failed:', error);
            setAnalysisError(error.response?.data?.message || 'Failed to analyze violations');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: any; icon: any; label: string; className?: string }> = {
            new: { variant: 'outline', icon: AlertCircle, label: 'New', className: 'border-blue-200 bg-blue-50 text-blue-700' },
            approved: { variant: 'outline', icon: CheckCircle, label: 'Approved', className: 'border-green-200 bg-green-50 text-green-700' },
            rejected: { variant: 'destructive', icon: XCircle, label: 'Rejected' },
            ignored: { variant: 'secondary', icon: MinusCircle, label: 'Ignored' },
        };

        const config = variants[status] || variants.new;
        const Icon = config.icon;

        return (
            <Badge variant={config.variant as any} className={`gap-1 ${config.className || ''}`}>
                <Icon className="h-3 w-3" />
                {config.label}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isNew = stats.status === 'new';

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`CSP Violations - ${host}`} />
                <AppSidebarHeader
                    breadcrumbs={[
                        { title: 'Dashboard', href: route('dashboard') },
                        { title: 'CSP Violations', href: route('customer.csp.violations.index') },
                        { title: host },
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-2">
                                <Globe className="h-8 w-8" />
                                {host}
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                CSP violations for <Badge variant="outline" className="font-mono">{directive}</Badge>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="default"
                                onClick={handleAnalyzeViolations}
                                disabled={isAnalyzing || !auth.currentCustomer}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        Analyze Violations
                                    </>
                                )}
                            </Button>
                            <Link href={route('customer.csp.violations.index')}>
                                <Button variant="outline">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to List
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Analysis Error Alert */}
                    {analysisError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{analysisError}</AlertDescription>
                        </Alert>
                    )}

                    {/* Status and Actions */}
                    {isNew && (
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <AlertCircle className="h-8 w-8 text-blue-500" />
                                        <div>
                                            <h3 className="font-semibold text-lg">Action Required</h3>
                                            <p className="text-sm text-muted-foreground">
                                                This host requires your review and decision. Your action will apply to all {stats.total_urls} URL(s).
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="default"
                                            onClick={() => setShowApproveDialog(true)}
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Approve All
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => setShowRejectDialog(true)}
                                        >
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Reject All
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowIgnoreDialog(true)}
                                        >
                                            <MinusCircle className="h-4 w-4 mr-2" />
                                            Ignore All
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Host Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Host Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-muted-foreground">Directive</Label>
                                    <div className="mt-1">
                                        <Badge variant="outline" className="font-mono text-sm">
                                            {directive}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Status</Label>
                                    <div className="mt-1">
                                        {getStatusBadge(stats.status)}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Host</Label>
                                    <div className="mt-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
                                        {host}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Statistics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Hash className="h-5 w-5" />
                                    Statistics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-muted-foreground">Total URLs</Label>
                                    <div className="mt-1">
                                        <Badge variant="secondary" className="text-lg px-4 py-1">
                                            {stats.total_urls}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground">Total Occurrences</Label>
                                    <div className="mt-1">
                                        <Badge variant="secondary" className="text-lg px-4 py-1">
                                            {stats.total_occurrences}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        First Seen
                                    </Label>
                                    <div className="mt-1 text-sm">
                                        {formatDate(stats.first_seen_at)}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Last Seen
                                    </Label>
                                    <div className="mt-1 text-sm">
                                        {formatDate(stats.last_seen_at)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* URLs Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Blocked URLs</CardTitle>
                            <CardDescription>
                                All URLs from this host that have triggered CSP violations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Blocked URL</TableHead>
                                        <TableHead>Document URL</TableHead>
                                        <TableHead className="text-center">Occurrences</TableHead>
                                        <TableHead>Last Seen</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {violations.map((violation) => (
                                        <TableRow key={violation.id}>
                                            <TableCell className="font-mono text-xs max-w-md truncate" title={violation.blocked_uri}>
                                                {violation.blocked_uri}
                                            </TableCell>
                                            <TableCell className="max-w-md truncate" title={violation.document_uri}>
                                                {violation.document_uri}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="secondary">{violation.occurrence_count}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(violation.last_seen_at)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>

            {/* Approve Dialog */}
            <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            Approve All Violations for {host}
                        </DialogTitle>
                        <DialogDescription>
                            This will approve all {stats.total_urls} URL(s) from this host and whitelist them in your CSP policy.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="approve-notes">Notes (Optional)</Label>
                            <Textarea
                                id="approve-notes"
                                placeholder="Add any notes about this decision..."
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={3}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleApprove} disabled={processing}>
                            {processing ? 'Approving...' : `Approve All ${stats.total_urls} URL(s)`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reject Dialog */}
            <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <XCircle className="h-5 w-5 text-red-500" />
                            Reject All Violations for {host}
                        </DialogTitle>
                        <DialogDescription>
                            This will reject all {stats.total_urls} URL(s) from this host and keep them blocked in your CSP policy.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="reject-notes">Notes (Optional)</Label>
                            <Textarea
                                id="reject-notes"
                                placeholder="Add any notes about this decision..."
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={3}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleReject} disabled={processing}>
                            {processing ? 'Rejecting...' : `Reject All ${stats.total_urls} URL(s)`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Ignore Dialog */}
            <Dialog open={showIgnoreDialog} onOpenChange={setShowIgnoreDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <MinusCircle className="h-5 w-5 text-gray-500" />
                            Ignore All Violations for {host}
                        </DialogTitle>
                        <DialogDescription>
                            This will dismiss all {stats.total_urls} URL(s) from this host without taking any action on your CSP policy.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="ignore-notes">Notes (Optional)</Label>
                            <Textarea
                                id="ignore-notes"
                                placeholder="Add any notes about this decision..."
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={3}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowIgnoreDialog(false)}>
                            Cancel
                        </Button>
                        <Button variant="secondary" onClick={handleIgnore} disabled={processing}>
                            {processing ? 'Ignoring...' : `Ignore All ${stats.total_urls} URL(s)`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Analysis Dialog */}
            {analysis && (
                <CspViolationAnalysisDialog
                    analysis={analysis}
                    isOpen={showAnalysisDialog}
                    onClose={() => setShowAnalysisDialog(false)}
                />
            )}
        </SidebarProvider>
    );
}
