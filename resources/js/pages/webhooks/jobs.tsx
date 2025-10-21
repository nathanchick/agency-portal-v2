import {Head} from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import ApiWebhooksLayout from '@/layouts/api-webhooks/layout';
import HeadingSmall from '@/components/heading-small';
import {type BreadcrumbItem} from '@/types';
import {route} from 'ziggy-js';
import {Clock, CheckCircle, XCircle} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'API & Webhooks',
        href: route('webhooks.index'),
    },
];

interface Job {
    id: string | number;
    uuid?: string;
    status: 'pending' | 'failed';
    queue: string;
    attempts?: number;
    created_at?: string;
    failed_at?: string;
    webhook_id?: string;
    webhook_name?: string;
    event?: string;
    url?: string;
    exception?: string;
}

interface Props {
    jobs: Job[];
}

export default function WebhookJobs({jobs}: Props) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                        <Clock className="h-3 w-3"/>
                        Pending
                    </Badge>
                );
            case 'failed':
                return (
                    <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                        <XCircle className="h-3 w-3"/>
                        Failed
                    </Badge>
                );
            default:
                return (
                    <Badge variant="default" className="flex items-center gap-1 w-fit">
                        <CheckCircle className="h-3 w-3"/>
                        Completed
                    </Badge>
                );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Webhook Jobs"/>

            <ApiWebhooksLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Pending Jobs"
                        description="View recent and failed webhook jobs"
                    />

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Webhook</TableHead>
                                    <TableHead>Event</TableHead>
                                    <TableHead>URL</TableHead>
                                    <TableHead>Attempts</TableHead>
                                    <TableHead>Timestamp</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jobs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No webhook jobs found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    jobs.map((job, index) => (
                                        <TableRow key={`${job.id}-${index}`}>
                                            <TableCell>{getStatusBadge(job.status)}</TableCell>
                                            <TableCell className="font-medium">
                                                {job.webhook_name || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {job.event ? (
                                                    <Badge variant="outline">{job.event}</Badge>
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {job.url || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {job.attempts !== undefined ? job.attempts : '-'}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {job.failed_at || job.created_at || '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {jobs.some((job) => job.status === 'failed') && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Failed Job Details</h3>
                            {jobs
                                .filter((job) => job.status === 'failed')
                                .map((job, index) => (
                                    <div
                                        key={`failed-${job.id}-${index}`}
                                        className="rounded-lg border bg-muted/50 p-4"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">
                                                    {job.webhook_name || 'Unknown Webhook'}
                                                </p>
                                                <Badge variant="outline" className="text-xs">
                                                    {job.event}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground break-all">
                                                {job.url}
                                            </p>
                                            {job.exception && (
                                                <div className="mt-2 rounded bg-destructive/10 p-2">
                                                    <p className="text-xs font-mono text-destructive">
                                                        {job.exception}
                                                    </p>
                                                </div>
                                            )}
                                            <p className="text-xs text-muted-foreground">
                                                Failed at: {job.failed_at}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </ApiWebhooksLayout>
        </AppLayout>
    );
}