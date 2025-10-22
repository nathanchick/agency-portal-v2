import {Head, router, usePage} from '@inertiajs/react';
import {AppSidebar} from '@/components/app-sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {Separator} from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {Badge} from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {MoreHorizontal, Plus, Rocket, Copy, Check, Loader2} from 'lucide-react';
import {useState, useMemo, useEffect} from 'react';
import {route} from 'ziggy-js';

interface Customer {
    id: string;
    name: string;
    websites?: Website[];
}

interface Website {
    id: string;
    url: string;
    type: string;
}

interface DeploymentHistory {
    id: string;
    git_tag: string | null;
    git_commit_sha: string | null;
    git_branch: string | null;
    status: 'success' | 'failed' | 'pending';
    deployed_at: string | null;
}

interface Deployment {
    id: string;
    customer: Customer;
    website: Website;
    webhook_token: string;
    created_at: string;
    latest_deployment?: DeploymentHistory;
}

interface Props {
    webhooks: {
        data: Deployment[];
        links: any[];
        meta: any;
    };
    customers: Customer[];
    filters: {
        customer_id?: string;
    };
}

export default function DeploymentsConfig({webhooks, customers, filters}: Props) {
    const {flash} = usePage().props as any;
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showSetupDialog, setShowSetupDialog] = useState(false);
    const [deploymentToDelete, setDeploymentToDelete] = useState<string | null>(null);
    const [setupDeployment, setSetupDeployment] = useState<Deployment | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState(filters.customer_id || '');

    // Create dialog state
    const [createCustomer, setCreateCustomer] = useState('');
    const [createWebsite, setCreateWebsite] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Get websites for selected customer
    const websites = useMemo(() => {
        if (!createCustomer) return [];
        const customer = customers.find(c => c.id === createCustomer);
        return customer?.websites || [];
    }, [createCustomer, customers]);

    // Check for webhook URL in flash data
    useEffect(() => {
        if (flash?.webhookUrl) {
            setWebhookUrl(flash.webhookUrl);
            setShowCreateDialog(true);
        }
    }, [flash]);

    const handleCreateDeployment = () => {
        if (!createCustomer || !createWebsite) return;

        setSubmitting(true);
        router.post(
            route('deployments.store'),
            {
                customer_id: createCustomer,
                website_id: createWebsite,
            },
            {
                onFinish: () => {
                    setSubmitting(false);
                },
            }
        );
    };

    const resetCreateForm = () => {
        setCreateCustomer('');
        setCreateWebsite('');
        setWebhookUrl(null);
        setCopied(false);
    };

    const handleCloseCreateDialog = () => {
        resetCreateForm();
        setShowCreateDialog(false);
    };

    const copyWebhookUrl = () => {
        if (webhookUrl) {
            navigator.clipboard.writeText(webhookUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDelete = () => {
        if (deploymentToDelete) {
            router.delete(route('deployments.destroy', deploymentToDelete), {
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setDeploymentToDelete(null);
                },
            });
        }
    };

    const handleFilterChange = (key: string, value: string | undefined) => {
        const newFilters = {...filters};
        if (value) {
            newFilters[key as keyof typeof filters] = value;
        } else {
            delete newFilters[key as keyof typeof filters];
        }

        router.get(route('deployments.config'), newFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
            success: 'default',
            pending: 'secondary',
            failed: 'destructive',
        };

        return (
            <Badge variant={variants[status] || 'secondary'}>
                {status}
            </Badge>
        );
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not deployed yet';
        return new Date(dateString).toLocaleString();
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href={route('dashboard')}>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={route('deployments.index')}>
                                        Deployments
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Configuration</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Head title="Webhook Configuration"/>

                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Webhook Configuration</h1>
                        <Button onClick={() => setShowCreateDialog(true)}>
                            <Plus className="mr-2 h-4 w-4"/>
                            Add New Webhook
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4">
                        <Select
                            value={selectedCustomer || undefined}
                            onValueChange={(value) => {
                                setSelectedCustomer(value);
                                handleFilterChange('customer_id', value);
                            }}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="All Customers"/>
                            </SelectTrigger>
                            <SelectContent>
                                {customers.map((customer) => (
                                    <SelectItem key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Webhooks Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Website</TableHead>
                                    <TableHead>Webhook Token</TableHead>
                                    <TableHead>Last Deployment</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {webhooks.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <Rocket className="h-8 w-8 text-muted-foreground mb-2"/>
                                                <p className="text-sm text-muted-foreground">
                                                    No webhooks configured. Create your first deployment webhook to get
                                                    started.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    webhooks.data.map((deployment) => (
                                        <TableRow key={deployment.id}>
                                            <TableCell className="font-medium">
                                                {deployment.customer.name}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-sm">{deployment.website.url}</span>
                                                    <Badge variant="outline" className="w-fit text-xs mt-1">
                                                        {deployment.website.type}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <code className="text-xs bg-muted px-2 py-1 rounded">
                                                    {deployment.webhook_token?.substring(0, 12)}...
                                                </code>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {deployment.latest_deployment?.deployed_at ? formatDate(deployment.latest_deployment.deployed_at) : 'Never'}
                                            </TableCell>
                                            <TableCell>
                                                {deployment.latest_deployment ? getStatusBadge(deployment.latest_deployment.status) : <Badge variant="secondary">Not deployed</Badge>}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {formatDate(deployment.created_at)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4"/>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSetupDeployment(deployment);
                                                                setShowSetupDialog(true);
                                                            }}
                                                        >
                                                            Setup Instructions
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setDeploymentToDelete(deployment.id);
                                                                setShowDeleteDialog(true);
                                                            }}
                                                            className="text-destructive"
                                                        >
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {webhooks.links && webhooks.links.length > 3 && (
                        <div className="flex items-center justify-center gap-2">
                            {webhooks.links.map((link: any, index: number) => (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    dangerouslySetInnerHTML={{__html: link.label}}
                                />
                            ))}
                        </div>
                    )}

                    {/* Create Deployment Dialog */}
                    <Dialog open={showCreateDialog} onOpenChange={handleCloseCreateDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {webhookUrl ? 'Deployment Created Successfully' : 'Create Deployment Webhook'}
                                </DialogTitle>
                                <DialogDescription>
                                    {webhookUrl
                                        ? 'Your deployment webhook has been created. Use this URL in your deployment pipeline.'
                                        : 'Select a customer and website to create a deployment webhook.'}
                                </DialogDescription>
                            </DialogHeader>

                            {webhookUrl ? (
                                <div className="space-y-4">
                                    <Alert>
                                        <AlertDescription>
                                            <div className="flex items-center gap-2">
                                                <code className="flex-1 text-xs bg-muted px-3 py-2 rounded break-all">
                                                    {webhookUrl}
                                                </code>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={copyWebhookUrl}
                                                >
                                                    {copied ? (
                                                        <Check className="h-4 w-4" />
                                                    ) : (
                                                        <Copy className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            ) : (
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="customer">Customer</Label>
                                        <Select
                                            value={createCustomer}
                                            onValueChange={setCreateCustomer}
                                        >
                                            <SelectTrigger id="customer">
                                                <SelectValue placeholder="Select a customer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {customers.map((customer) => (
                                                    <SelectItem key={customer.id} value={customer.id}>
                                                        {customer.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="website">Website</Label>
                                        <Select
                                            value={createWebsite}
                                            onValueChange={setCreateWebsite}
                                            disabled={!createCustomer || websites.length === 0}
                                        >
                                            <SelectTrigger id="website">
                                                <SelectValue
                                                    placeholder={
                                                        !createCustomer
                                                            ? 'Select a customer first'
                                                            : websites.length === 0
                                                            ? 'No websites available'
                                                            : 'Select a website'
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {websites.map((website) => (
                                                    <SelectItem key={website.id} value={website.id}>
                                                        <div className="flex flex-col">
                                                            <span>{website.url}</span>
                                                            <span className="text-xs text-muted-foreground">
                                                                {website.type}
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}

                            <DialogFooter>
                                {webhookUrl ? (
                                    <Button onClick={handleCloseCreateDialog}>Done</Button>
                                ) : (
                                    <>
                                        <Button variant="outline" onClick={handleCloseCreateDialog}>
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleCreateDeployment}
                                            disabled={!createCustomer || !createWebsite || submitting}
                                        >
                                            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Create Webhook
                                        </Button>
                                    </>
                                )}
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Setup Instructions Dialog */}
                    <Dialog open={showSetupDialog} onOpenChange={setShowSetupDialog}>
                        <DialogContent className="sm:max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>Setup Deployment Webhook</DialogTitle>
                                <DialogDescription>
                                    Follow the instructions below to integrate this webhook into your deployment pipeline.
                                </DialogDescription>
                            </DialogHeader>

                            {setupDeployment && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Webhook URL</Label>
                                        <div className="flex items-center gap-2">
                                            <code className="flex-1 text-xs bg-muted px-3 py-2 rounded break-all">
                                                {route('api.deployments.webhook', {token: setupDeployment.webhook_token})}
                                            </code>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(
                                                        route('api.deployments.webhook', {token: setupDeployment.webhook_token})
                                                    );
                                                }}
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <Tabs defaultValue="curl" className="w-full">
                                        <TabsList className="grid w-full grid-cols-2  max-w-sm">
                                            <TabsTrigger value="curl">cURL</TabsTrigger>
                                            <TabsTrigger value="github">GitHub Actions</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="curl" className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="mb-4">Basic Example</Label>
                                                <div className="bg-muted p-4 rounded-md overflow-x-auto mt-4">
                                                    <pre className="text-xs whitespace-pre-wrap break-all">
{`curl -X POST '${route('api.deployments.webhook', {token: setupDeployment.webhook_token})}' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "branch": "main",
    "tag": "v1.0.0",
    "commit_sha": "abc123def456",
    "status": "success"
  }'`}
                                                    </pre>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Payload Parameters</Label>
                                                <div className="text-sm space-y-1">
                                                    <p><code className="bg-muted px-1 py-0.5 rounded text-xs">branch</code> - Git branch name (optional)</p>
                                                    <p><code className="bg-muted px-1 py-0.5 rounded text-xs">tag</code> - Git tag/version (optional)</p>
                                                    <p><code className="bg-muted px-1 py-0.5 rounded text-xs">commit_sha</code> - Git commit SHA (optional)</p>
                                                    <p><code className="bg-muted px-1 py-0.5 rounded text-xs">status</code> - Deployment status: success, pending, or failed (optional, defaults to pending)</p>
                                                </div>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="github" className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>GitHub Actions Workflow</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Add this step to your <code className="bg-muted px-1 py-0.5 rounded text-xs">.github/workflows/deploy.yml</code>
                                                </p>
                                                <div className="bg-muted p-4 rounded-md overflow-x-auto">
                                                    <pre className="text-xs whitespace-pre-wrap break-all">
{`- name: Notify Deployment
  if: success()
  run: |
    curl -X POST '${route('api.deployments.webhook', {token: setupDeployment.webhook_token})}' \\
      -H 'Content-Type: application/json' \\
      -d "{
        \\"branch\\": \\"$\{GITHUB_REF_NAME}\\",
        \\"tag\\": \\"$\{GITHUB_REF_TYPE == 'tag' && GITHUB_REF_NAME || ''}\\",
        \\"commit_sha\\": \\"$\{GITHUB_SHA}\\",
        \\"status\\": \\"success\\"
      }"`}
                                                    </pre>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Complete Workflow Example</Label>
                                                <div className="bg-muted p-4 rounded-md overflow-x-auto mt-4">
                                                    <pre className="text-xs whitespace-pre-wrap break-all">
{`name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      # Your deployment steps here
      - name: Deploy Application
        run: |
          echo "Deploy your application..."

      - name: Notify Deployment Success
        if: success()
        run: |
          curl -X POST '${route('api.deployments.webhook', {token: setupDeployment.webhook_token})}' \\
            -H 'Content-Type: application/json' \\
            -d "{
              \\"branch\\": \\"$\{GITHUB_REF_NAME}\\",
              \\"commit_sha\\": \\"$\{GITHUB_SHA}\\",
              \\"status\\": \\"success\\"
            }"

      - name: Notify Deployment Failure
        if: failure()
        run: |
          curl -X POST '${route('api.deployments.webhook', {token: setupDeployment.webhook_token})}' \\
            -H 'Content-Type: application/json' \\
            -d "{
              \\"branch\\": \\"$\{GITHUB_REF_NAME}\\",
              \\"commit_sha\\": \\"$\{GITHUB_SHA}\\",
              \\"status\\": \\"failed\\"
            }"`}
                                                    </pre>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            )}

                            <DialogFooter>
                                <Button onClick={() => setShowSetupDialog(false)}>
                                    Close
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Deployment Webhook</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this deployment webhook? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                    Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}