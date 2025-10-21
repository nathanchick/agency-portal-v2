import {Head, Link, useForm} from '@inertiajs/react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Checkbox} from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import ApiWebhooksLayout from '@/layouts/api-webhooks/layout';
import HeadingSmall from '@/components/heading-small';
import {type BreadcrumbItem} from '@/types';
import {route} from 'ziggy-js';
import {ChevronLeft} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

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

interface Props {
    availableAbilities: Record<string, Record<string, string>>;
}

export default function CreateApiToken({availableAbilities}: Props) {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        abilities: [] as string[],
        expires_at: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('api-tokens.store'));
    };

    const toggleAbility = (ability: string) => {
        setData(
            'abilities',
            data.abilities.includes(ability)
                ? data.abilities.filter((a) => a !== ability)
                : [...data.abilities, ability]
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create API Token"/>

            <ApiWebhooksLayout>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={route('api-tokens.index')}>
                                <ChevronLeft className="h-4 w-4"/>
                            </Link>
                        </Button>
                        <HeadingSmall
                            title="Create API Token"
                            description="Create a new API token for external system integration"
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Token Details</CardTitle>
                                <CardDescription>
                                    Configure the token name and permissions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Token Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g., Production API Access"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="expires_at">Expiration Date (Optional)</Label>
                                    <Input
                                        id="expires_at"
                                        type="date"
                                        value={data.expires_at}
                                        onChange={(e) => setData('expires_at', e.target.value)}
                                    />
                                    {errors.expires_at && (
                                        <p className="text-sm text-destructive">{errors.expires_at}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        Leave blank for tokens that never expire
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Abilities</CardTitle>
                                <CardDescription>
                                    Select which actions this token can perform
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {Object.entries(availableAbilities).map(([group, abilities]) => (
                                        <div key={group} className="space-y-3">
                                            <h4 className="text-sm font-semibold">{group}</h4>
                                            <div className="space-y-2 pl-4 border-l-2 border-muted">
                                                {Object.entries(abilities).map(([key, label]) => (
                                                    <div key={key} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={key}
                                                            checked={data.abilities.includes(key)}
                                                            onCheckedChange={() => toggleAbility(key)}
                                                        />
                                                        <Label htmlFor={key} className="text-sm font-normal cursor-pointer">
                                                            {label}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {errors.abilities && (
                                    <p className="text-sm text-destructive mt-2">{errors.abilities}</p>
                                )}
                            </CardContent>
                        </Card>

                        <div className="flex items-center gap-2">
                            <Button type="submit" disabled={processing}>
                                Create Token
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href={route('api-tokens.index')}>Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </ApiWebhooksLayout>
        </AppLayout>
    );
}