import { Head, Link, router, useForm } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
    Eye,
    Globe,
    FileCode,
    Hash,
} from 'lucide-react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import type { CspViolation, CspDecisionForm } from '@/types/csp';

interface Props {
    violation: CspViolation;
}

export default function Show({ violation }: Props) {
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [showIgnoreDialog, setShowIgnoreDialog] = useState(false);
    const [showRawReport, setShowRawReport] = useState(false);

    const { data, setData, post, processing, reset } = useForm<CspDecisionForm>({
        notes: '',
    });

    const handleApprove = () => {
        post(route('customer.csp.violations.approve', violation.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowApproveDialog(false);
                reset();
            },
        });
    };

    const handleReject = () => {
        post(route('customer.csp.violations.reject', violation.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowRejectDialog(false);
                reset();
            },
        });
    };

    const handleIgnore = () => {
        post(route('customer.csp.violations.ignore', violation.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowIgnoreDialog(false);
                reset();
            },
        });
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

    const getActionBadge = (action: string) => {
        const variants: Record<string, { variant: any; icon: any; label: string; className?: string }> = {
            approved: { variant: 'outline', icon: CheckCircle, label: 'Approved', className: 'border-green-200 bg-green-50 text-green-700' },
            rejected: { variant: 'destructive', icon: XCircle, label: 'Rejected' },
            ignored: { variant: 'secondary', icon: MinusCircle, label: 'Ignored' },
            reopened: { variant: 'outline', icon: AlertCircle, label: 'Reopened', className: 'border-blue-200 bg-blue-50 text-blue-700' },
        };

        const config = variants[action] || variants.approved;
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

    const isNew = violation.status === 'new';

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Head title={`CSP Violation - ${violation.directive}`} />
                <AppSidebarHeader
                    breadcrumbs={[
                        { title: 'Dashboard', href: route('dashboard') },
                        { title: 'CSP Violations', href: route('customer.csp.violations.index') },
                        { title: 'Violation Details' },
                    ]}
                />

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold flex items-center gap-2">
                                <Shield className="h-8 w-8" />
                                CSP Violation Details
                            </h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Review and take action on this security policy violation
                            </p>
                        </div>
                        <Link href={route('customer.csp.violations.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to List
                            </Button>
                        </Link>
                    </div>

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
                                                This violation requires your review and decision
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="default"
                                            onClick={() => setShowApproveDialog(true)}
                                        >
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => setShowRejectDialog(true)}
                                        >
                                            <XCircle className="h-4 w-4 mr-2" />
                                            Reject
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowIgnoreDialog(true)}
                                        >
                                            <MinusCircle className="h-4 w-4 mr-2" />
                                            Ignore
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Violation Details */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5" />
                                        Violation Information
                                    </CardTitle>
                                    {getStatusBadge(violation.status)}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label className="text-muted-foreground">Directive</Label>
                                        <div className="mt-1">
                                            <Badge variant="outline" className="font-mono text-sm">
                                                {violation.directive}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">Disposition</Label>
                                        <div className="mt-1">
                                            <Badge variant={violation.disposition === 'enforce' ? 'destructive' : 'secondary'}>
                                                {violation.disposition}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-muted-foreground">Blocked URI</Label>
                                    <div className="mt-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
                                        {violation.blocked_uri}
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-muted-foreground">Document URI</Label>
                                    <div className="mt-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
                                        {violation.document_uri}
                                    </div>
                                </div>

                                {violation.source_file && (
                                    <div className="grid gap-4 md:grid-cols-3">
                                        <div className="md:col-span-2">
                                            <Label className="text-muted-foreground flex items-center gap-2">
                                                <FileCode className="h-4 w-4" />
                                                Source File
                                            </Label>
                                            <div className="mt-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
                                                {violation.source_file}
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">Line:Column</Label>
                                            <div className="mt-1 p-3 bg-muted rounded-md font-mono text-sm">
                                                {violation.line_number}:{violation.column_number}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {violation.website && (
                                    <div>
                                        <Label className="text-muted-foreground flex items-center gap-2">
                                            <Globe className="h-4 w-4" />
                                            Website
                                        </Label>
                                        <div className="mt-1 flex items-center gap-2">
                                            <span className="font-medium">{violation.website.name}</span>
                                            <span className="text-muted-foreground">({violation.website.domain})</span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Occurrence Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Hash className="h-5 w-5" />
                                    Occurrence Statistics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-muted-foreground">Total Occurrences</Label>
                                    <div className="mt-1">
                                        <Badge variant="secondary" className="text-lg px-4 py-1">
                                            {violation.occurrence_count}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        First Seen
                                    </Label>
                                    <div className="mt-1 text-sm">
                                        {formatDate(violation.first_seen_at)}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Last Seen
                                    </Label>
                                    <div className="mt-1 text-sm">
                                        {formatDate(violation.last_seen_at)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Decision Info */}
                        {!isNew && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Decision Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label className="text-muted-foreground">Decided By</Label>
                                        <div className="mt-1 text-sm">
                                            {violation.decider ? (
                                                <div>
                                                    <div className="font-medium">{violation.decider.name}</div>
                                                    <div className="text-muted-foreground">{violation.decider.email}</div>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">Unknown</span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">Decided At</Label>
                                        <div className="mt-1 text-sm">
                                            {violation.decided_at ? formatDate(violation.decided_at) : '-'}
                                        </div>
                                    </div>
                                    {violation.decision_notes && (
                                        <div>
                                            <Label className="text-muted-foreground">Notes</Label>
                                            <div className="mt-1 p-3 bg-muted rounded-md text-sm">
                                                {violation.decision_notes}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Decision History */}
                    {violation.decisions && violation.decisions.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Decision History</CardTitle>
                                <CardDescription>
                                    Complete audit trail of all decisions made on this violation
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Action</TableHead>
                                            <TableHead>User</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>IP Address</TableHead>
                                            <TableHead>Notes</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {violation.decisions.map((decision) => (
                                            <TableRow key={decision.id}>
                                                <TableCell>
                                                    {getActionBadge(decision.action)}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{decision.user_name}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {decision.user_email}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {formatDate(decision.created_at)}
                                                </TableCell>
                                                <TableCell className="text-sm font-mono">
                                                    {decision.ip_address || '-'}
                                                </TableCell>
                                                <TableCell className="max-w-xs">
                                                    {decision.notes ? (
                                                        <div className="text-sm truncate" title={decision.notes}>
                                                            {decision.notes}
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}

                    {/* Raw Report */}
                    {violation.raw_report && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Raw CSP Report</CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowRawReport(!showRawReport)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        {showRawReport ? 'Hide' : 'Show'} Raw Data
                                    </Button>
                                </div>
                            </CardHeader>
                            {showRawReport && (
                                <CardContent>
                                    <pre className="p-4 bg-muted rounded-md text-xs overflow-auto max-h-96">
                                        {JSON.stringify(violation.raw_report, null, 2)}
                                    </pre>
                                </CardContent>
                            )}
                        </Card>
                    )}
                </div>
            </SidebarInset>

            {/* Approve Dialog */}
            <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            Approve Violation
                        </DialogTitle>
                        <DialogDescription>
                            This will mark the resource as approved and whitelist it in your CSP policy.
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
                            {processing ? 'Approving...' : 'Approve'}
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
                            Reject Violation
                        </DialogTitle>
                        <DialogDescription>
                            This will keep the resource blocked in your CSP policy.
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
                            {processing ? 'Rejecting...' : 'Reject'}
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
                            Ignore Violation
                        </DialogTitle>
                        <DialogDescription>
                            This will dismiss the violation without taking any action on your CSP policy.
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
                            {processing ? 'Ignoring...' : 'Ignore'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
}
