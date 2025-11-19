import OrganisationController from '@/actions/App/Http/Controllers/Settings/OrganisationController';
import GitHubOAuthController from '@/actions/Modules/GitHub/Http/Controllers/GitHubOAuthController';
import {type BreadcrumbItem} from '@/types';
import {Transition} from '@headlessui/react';
import {Form, Head, router} from '@inertiajs/react';
import {useState} from 'react';
import {Github} from 'lucide-react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import ModuleSettings, {type ModuleSettingsData} from '@/components/settings/module-settings';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import {edit} from '@/routes/organisation';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Organisation settings',
        href: edit().url,
    },
];

interface OrganisationData {
    id: string;
    name: string;
    logo: string | null;
    billing_email: string;
}

interface GitHubConnection {
    connected: boolean;
    account_login?: string;
    account_type?: string;
    scope?: string;
}

export default function Organisation({
    organisation,
    moduleSettings,
    githubConnection,
}: {
    organisation: OrganisationData;
    moduleSettings: Record<string, ModuleSettingsData>;
    githubConnection: GitHubConnection;
}) {
    const [logoPreview, setLogoPreview] = useState<string | null>(
        organisation.logo,
    );

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Organisation settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Organisation information"
                        description="Update your organisation details"
                    />

                    <Form
                        {...OrganisationController.update.form()}
                        options={{
                            preserveScroll: true,
                            forceFormData: true,
                        }}
                        className="space-y-6"
                    >
                        {({processing, recentlySuccessful, errors}) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">
                                        Organisation Name
                                    </Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={organisation.name}
                                        name="name"
                                        required
                                        placeholder="Organisation name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="logo">Logo</Label>

                                    {logoPreview && (
                                        <div className="mb-2">
                                            <img
                                                src={logoPreview}
                                                alt="Logo preview"
                                                className="h-32 w-32 rounded border object-cover"
                                            />
                                        </div>
                                    )}

                                    <Input
                                        id="logo"
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                                        name="logo"
                                        onChange={handleLogoChange}
                                    />

                                    <p className="text-sm text-muted-foreground">
                                        Square image recommended. Max 2MB.
                                        Accepted formats: JPEG, PNG, SVG
                                    </p>

                                    <InputError
                                        className="mt-2"
                                        message={errors.logo}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="billing_email">
                                        Billing Email
                                    </Label>

                                    <Input
                                        id="billing_email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={organisation.billing_email}
                                        name="billing_email"
                                        required
                                        placeholder="billing@example.com"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.billing_email}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-organisation-button"
                                    >
                                        Save
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            Saved
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>

                    {/* GitHub Integration - Only show if GitHub module is enabled */}
                    {moduleSettings.GitHub?.settings?.status?.value === '1' && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Github className="h-5 w-5" />
                                    <CardTitle>GitHub Integration</CardTitle>
                                </div>
                                <CardDescription>
                                    Connect your GitHub account to link repositories with projects
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {githubConnection.connected ? (
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between rounded-lg border p-4">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">
                                                    Connected as{' '}
                                                    <span className="font-semibold">
                                                        {githubConnection.account_login}
                                                    </span>
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {githubConnection.account_type}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        Scopes: {githubConnection.scope}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to disconnect from GitHub? This will remove access to repository data.')) {
                                                        router.delete(GitHubOAuthController.disconnect.url());
                                                    }
                                                }}
                                            >
                                                Disconnect
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">
                                            Connect your GitHub account to enable repository linking and synchronization features.
                                        </p>
                                        <Button
                                            onClick={() => {
                                                window.location.href = GitHubOAuthController.connect.url();
                                            }}
                                            className="gap-2"
                                        >
                                            <Github className="h-4 w-4" />
                                            Connect GitHub
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Module settings - independent from main form */}
                    <ModuleSettings
                        moduleSettings={moduleSettings}
                        saveUrl={
                            OrganisationController.updateModuleSettings.url()
                        }
                    />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
