import {AppSidebar} from '@/components/app-sidebar';
import {Head, router, useForm} from '@inertiajs/react';
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
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Checkbox} from '@/components/ui/checkbox';
import {FormEvent} from 'react';

interface Webhook {
    id: string;
    name: string;
    url: string;
    model: string;
    events: string[];
    secret: string;
    active: boolean;
}

interface Props {
    webhook: Webhook;
    availableModels: Record<string, string>;
    availableEvents: Record<string, string>;
}

export default function EditWebhook({webhook, availableModels, availableEvents}: Props) {
    const {data, setData, put, processing, errors} = useForm({
        name: webhook.name,
        url: webhook.url,
        model: webhook.model,
        events: webhook.events,
        secret: webhook.secret,
        active: webhook.active,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/webhooks/${webhook.id}`);
    };

    const toggleEvent = (event: string) => {
        if (data.events.includes(event)) {
            setData('events', data.events.filter((e) => e !== event));
        } else {
            setData('events', [...data.events, event]);
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <Head title="Edit Webhook"/>
                <header
                    className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/dashboard">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/webhooks">
                                        Webhooks
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Edit</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Edit Webhook</h2>
                        <p className="text-muted-foreground">
                            Update webhook configuration
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Webhook Configuration</CardTitle>
                                <CardDescription>
                                    Update the webhook details and event triggers
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="My Webhook"
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="url">Webhook URL *</Label>
                                    <Input
                                        id="url"
                                        type="url"
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}
                                        placeholder="https://example.com/webhook"
                                    />
                                    {errors.url && (
                                        <p className="text-sm text-destructive">{errors.url}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="model">Model *</Label>
                                    <Select
                                        value={data.model}
                                        onValueChange={(value) => setData('model', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a model"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(availableModels).map(([key, label]) => (
                                                <SelectItem key={key} value={key}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.model && (
                                        <p className="text-sm text-destructive">{errors.model}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Events *</Label>
                                    <div className="space-y-2">
                                        {Object.entries(availableEvents).map(([key, label]) => (
                                            <div key={key} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`event-${key}`}
                                                    checked={data.events.includes(key)}
                                                    onCheckedChange={() => toggleEvent(key)}
                                                />
                                                <label
                                                    htmlFor={`event-${key}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.events && (
                                        <p className="text-sm text-destructive">{errors.events}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="secret">Secret</Label>
                                    <Input
                                        id="secret"
                                        value={data.secret}
                                        onChange={(e) => setData('secret', e.target.value)}
                                        placeholder="Webhook secret"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Use the "Regenerate Secret" action to create a new secret
                                    </p>
                                    {errors.secret && (
                                        <p className="text-sm text-destructive">{errors.secret}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="active"
                                        checked={data.active}
                                        onCheckedChange={(checked) => setData('active', !!checked)}
                                    />
                                    <label
                                        htmlFor="active"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Active
                                    </label>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-6 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit('/webhooks')}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Webhook'}
                            </Button>
                        </div>
                    </form>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}