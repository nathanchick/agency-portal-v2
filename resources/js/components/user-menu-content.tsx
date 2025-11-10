import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import { type User } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import {LogOut, Settings, UserCog, Building2, Users, Shield, Webhook} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserMenuContentProps {
    user: User;
}

interface Organisation {
    id: string;
    name: string;
    logo: string | null;
}

interface Customer {
    id: string;
    name: string;
}

interface AuthProps {
    userType: string;
    role: string;
    currentOrganisation: Organisation | null;
    currentCustomer: Customer | null;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const { auth } = usePage<{ auth: AuthProps }>().props;
    const cleanup = useMobileNavigation();
    const isAdmin = auth.role === 'Admin';
    const isOrganisationAdmin = isAdmin && auth.userType === 'organisation';

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="px-2 py-1.5">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {auth.userType === 'organisation' ? (
                                <Building2 className="h-3 w-3" />
                            ) : (
                                <Users className="h-3 w-3" />
                            )}
                            <span className="capitalize">{auth.userType}</span>
                        </div>
                        <Badge variant="secondary" className="h-5 text-xs">
                            <Shield className="mr-1 h-3 w-3" />
                            {auth.role}
                        </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                        {auth.currentOrganisation?.name || auth.currentCustomer?.name}
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href={edit()}
                        as="button"
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        Account Settings
                    </Link>
                </DropdownMenuItem>
                {isAdmin && (
                    <DropdownMenuItem asChild>
                        <Link
                            className="block w-full"
                            href={route('team.index')}
                            as="button"
                            onClick={cleanup}
                        >
                            <UserCog className="mr-2" />
                            Manage Team
                        </Link>
                    </DropdownMenuItem>
                )}
                {isOrganisationAdmin && (
                    <DropdownMenuItem asChild>
                        <Link
                            className="block w-full"
                            href={route('webhooks.index')}
                            as="button"
                            onClick={cleanup}
                        >
                            <Webhook className="mr-2" />
                            API & Webhooks
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
