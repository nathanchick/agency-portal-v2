import {Head, Link} from '@inertiajs/react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import ApiWebhooksLayout from '@/layouts/api-webhooks/layout';
import HeadingSmall from '@/components/heading-small';
import {type BreadcrumbItem} from '@/types';
import {route} from 'ziggy-js';
import {ChevronLeft, Copy, AlertTriangle} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Input} from '@/components/ui/input';
import {useState} from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'API & Webhooks',
        href: route('webhooks.index'),
    },
    {
        title: 'API Tokens',
        href: route('api-tokens.index'),
    },
];

interface ApiToken {
    id: string;
    name: string;
    abilities: string[];
    last_used_at: string | null;
    expires_at: string | null;
    created_at: string;
    creator: {
        name: string;
        email: string;
    } | null;
}

interface Props {
    apiToken: ApiToken;
    plainTextToken?: string;
}

export default function ShowApiToken({apiToken, plainTextToken}: Props) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (plainTextToken) {
            navigator.clipboard.writeText(plainTextToken);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`API Token: ${apiToken.name}`}/>

            <ApiWebhooksLayout>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={route('api-tokens.index')}>
                                <ChevronLeft className="h-4 w-4"/>
                            </Link>
                        </Button>
                        <HeadingSmall
                            title={apiToken.name}
                            description="API token details and configuration"
                        />
                    </div>

                    {plainTextToken && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4"/>
                            <AlertTitle>Important: Save your token now!</AlertTitle>
                            <AlertDescription>
                                <p className="mb-3">
                                    This is the only time you will see this token. Make sure to copy it and store it securely.
                                </p>
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={plainTextToken}
                                        readOnly
                                        className="font-mono text-sm bg-background"
                                    />
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={copyToClipboard}
                                    >
                                        <Copy className="h-4 w-4 mr-2"/>
                                        {copied ? 'Copied!' : 'Copy'}
                                    </Button>
                                </div>
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Token Information</CardTitle>
                            <CardDescription>Details about this API token</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium">Name</p>
                                <p className="text-sm text-muted-foreground">{apiToken.name}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium">Created</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(apiToken.created_at).toLocaleString()}
                                    {apiToken.creator && ` by ${apiToken.creator.name}`}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium">Last Used</p>
                                <p className="text-sm text-muted-foreground">
                                    {apiToken.last_used_at
                                        ? new Date(apiToken.last_used_at).toLocaleString()
                                        : 'Never'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium">Expires</p>
                                <p className="text-sm text-muted-foreground">
                                    {apiToken.expires_at
                                        ? new Date(apiToken.expires_at).toLocaleString()
                                        : 'Never'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium mb-2">Abilities</p>
                                <div className="flex flex-wrap gap-2">
                                    {apiToken.abilities && apiToken.abilities.length > 0 ? (
                                        apiToken.abilities.map((ability) => (
                                            <Badge key={ability} variant="outline">
                                                {ability}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No abilities assigned</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route('api-tokens.edit', apiToken.id)}>Edit Token</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={route('api-tokens.index')}>Back to Tokens</Link>
                        </Button>
                    </div>
                </div>
            </ApiWebhooksLayout>
        </AppLayout>
    );
}