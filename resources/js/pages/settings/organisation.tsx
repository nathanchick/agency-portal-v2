import OrganisationController from '@/actions/App/Http/Controllers/Settings/OrganisationController';
import {type BreadcrumbItem} from '@/types';
import {Transition} from '@headlessui/react';
import {Form, Head} from '@inertiajs/react';
import {useState} from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
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

export default function Organisation({
    organisation,
    moduleSettings,
}: {
    organisation: OrganisationData;
    moduleSettings: Record<string, ModuleSettingsData>;
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
