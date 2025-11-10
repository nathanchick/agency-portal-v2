import {Head, useForm} from '@inertiajs/react';
import {route} from 'ziggy-js';
import {AppSidebar} from '@/components/app-sidebar';
import {AppSidebarHeader} from '@/components/app-sidebar-header';
import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar';
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
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import ModuleSettings, {
    type ModuleSettingsData,
} from '@/components/settings/module-settings';
import WebsiteController from '@/actions/Modules/Website/Http/Controllers/WebsiteController';

interface Customer {
    id: string;
    name: string;
}

interface Project {
    id: string;
    name: string;
}

interface Website {
    id: string;
    url: string;
    type: string;
    notes?: string;
    customer: Customer;
    project?: Project;
}

interface Props {
    website: Website;
    moduleSettings: Record<string, ModuleSettingsData>;
}

export default function EditWebsite({website, moduleSettings}: Props) {
    const {data, setData, put, processing, errors} = useForm({
        url: website.url,
        type: website.type,
        notes: website.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(WebsiteController.update.url({id: website.id}), {
            preserveScroll: true,
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader title="Edit Website" />

                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="grid gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Website Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="url">URL</Label>
                                        <Input
                                            id="url"
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                            placeholder="https://example.com"
                                        />
                                        {errors.url && (
                                            <p className="text-sm text-red-600">{errors.url}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="type">Environment Type</Label>
                                        <Select
                                            value={data.type}
                                            onValueChange={(value) => setData('type', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="production">
                                                    Production
                                                </SelectItem>
                                                <SelectItem value="staging">Staging</SelectItem>
                                                <SelectItem value="development">
                                                    Development
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && (
                                            <p className="text-sm text-red-600">{errors.type}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <Textarea
                                            id="notes"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="Optional notes about this website"
                                            rows={4}
                                        />
                                        {errors.notes && (
                                            <p className="text-sm text-red-600">{errors.notes}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Module Settings Section */}
                        <ModuleSettings
                            moduleSettings={moduleSettings}
                            saveUrl={route('websites.modules.update', {
                                id: website.id,
                            })}
                            disableCollapse={true}
                        />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
