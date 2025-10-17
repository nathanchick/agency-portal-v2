<?php

namespace App\Http\Middleware;

use App\Models\Organisation;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        $userType = 'customer';
        $userRole = 'User';
        $currentOrganisation = null;
        $currentCustomer = null;

        if ($user) {
            [$userType, $userRole, $currentOrganisation, $currentCustomer] = $this->determineUserContext($user);
        }

        // Load user's organisations for the organisation switcher
        if ($user) {
            // Get organisations directly assigned to the user
            $directOrganisations = $user->organisations()->select('organisations.id', 'organisations.name')->get();

            // Get organisations through customer assignments
            $customerOrganisationIds = DB::table('organisations')
                ->join('customers', 'organisations.id', '=', 'customers.organisation_id')
                ->join('customer_user', 'customers.id', '=', 'customer_user.customer_id')
                ->where('customer_user.user_id', $user->id)
                ->distinct()
                ->pluck('organisations.id');

            // Fetch customer organisations as Eloquent models
            $customerOrganisations = Organisation::whereIn('id', $customerOrganisationIds)
                ->select('id', 'name')
                ->get();

            // Merge and remove duplicates based on id
            $allOrganisations = $directOrganisations->merge($customerOrganisations)->unique('id')->values();

            // Manually set the organisations attribute
            $user->setRelation('organisations', $allOrganisations);
            $userWithOrganisations = $user;
        } else {
            $userWithOrganisations = null;
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $userWithOrganisations,
                'userType' => $userType,
                'role' => $userRole,
                'currentOrganisation' => $currentOrganisation,
                'currentCustomer' => $currentCustomer,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'permissions' => $this->getUserPermissions($user, $currentOrganisation),
            'roles' => $this->getUserRoles($user, $currentOrganisation),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'message' => $request->session()->get('message'),
            ],
        ];
    }

    /**
     * Determine user context (type, role, organisation, customer)
     */
    protected function determineUserContext(User $user): array
    {
        $userType = 'customer';
        $userRole = 'User';
        $currentOrganisation = Organisation::current();
        $currentCustomer = null;

        // Check if user is an organisation user first (organisation takes priority)
        if (!$currentOrganisation) {
            // Check if there's a stored organisation in the session
            $sessionOrganisationId = session('current_organisation_id');

            if ($sessionOrganisationId) {
                // Try to find in direct organisations first
                $currentOrganisation = $user->organisations()->find($sessionOrganisationId);

                // If not found, check if accessible through customer
                if (!$currentOrganisation) {
                    $hasCustomerAccess = DB::table('customers')
                        ->join('customer_user', 'customers.id', '=', 'customer_user.customer_id')
                        ->where('customer_user.user_id', $user->id)
                        ->where('customers.organisation_id', $sessionOrganisationId)
                        ->exists();

                    if ($hasCustomerAccess) {
                        $currentOrganisation = Organisation::find($sessionOrganisationId);
                    }
                }
            }

            // Fall back to first organisation if session org not found or not set
            if (!$currentOrganisation) {
                $currentOrganisation = $user->organisations()->first();
            }
        }

        if ($currentOrganisation) {
            // Check if user has an organisation role
            $organisationRole = DB::table('model_has_roles')
                ->where('model_id', $user->id)
                ->where('model_type', User::class)
                ->where('team_id', $currentOrganisation->id)
                ->exists();

            if ($organisationRole) {
                // Organisation user takes priority
                $userType = 'organisation';
                $userRole = $this->getOrganisationUserRole($user, $currentOrganisation);
                return [$userType, $userRole, $currentOrganisation, $currentCustomer];
            }
        }

        // Fall back to customer user
        // If we have a current organisation, try to find a customer for it
        if ($currentOrganisation) {
            $currentCustomer = $user->customers()
                ->where('customers.organisation_id', $currentOrganisation->id)
                ->first();
        }

        // If no customer found for current org, get first customer
        if (!$currentCustomer) {
            $currentCustomer = $user->customers()->first();
        }

        if ($currentCustomer) {
            // Customer user - get organisation through customer if not already set
            if (!$currentOrganisation) {
                $currentOrganisation = Organisation::find($currentCustomer->organisation_id);
            }
            $userType = 'customer';
            $userRole = $this->getCustomerUserRole($user, $currentCustomer);
        }

        return [$userType, $userRole, $currentOrganisation, $currentCustomer];
    }

    /**
     * Get customer user's role from pivot table
     */
    protected function getCustomerUserRole(User $user, $customer): string
    {
        $customerUser = DB::table('customer_user')
            ->where('user_id', $user->id)
            ->where('customer_id', $customer->id)
            ->first();

        if ($customerUser && $customerUser->role_id) {
            $role = Role::find($customerUser->role_id);
            return $role?->name ?? 'User';
        }

        return 'User';
    }

    /**
     * Get organisation user's role
     */
    protected function getOrganisationUserRole(User $user, Organisation $organisation): string
    {
        $roles = DB::table('model_has_roles')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('model_has_roles.model_id', $user->id)
            ->where('model_has_roles.model_type', User::class)
            ->where('model_has_roles.team_id', $organisation->id)
            ->pluck('roles.name')
            ->toArray();

        return $roles[0] ?? 'User';
    }

    /**
     * Get user permissions for the current organisation
     */
    protected function getUserPermissions(?User $user, ?Organisation $currentOrganisation): array
    {
        if (!$user || !$currentOrganisation) {
            return [];
        }

        // Check if user has organisation roles first (organisation takes priority)
        $hasOrganisationRole = DB::table('model_has_roles')
            ->where('model_id', $user->id)
            ->where('model_type', User::class)
            ->where('team_id', $currentOrganisation->id)
            ->exists();

        if ($hasOrganisationRole) {
            // Get organisation permissions
            return DB::table('permissions')
                ->join('role_has_permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
                ->join('model_has_roles', 'role_has_permissions.role_id', '=', 'model_has_roles.role_id')
                ->where('model_has_roles.model_id', $user->id)
                ->where('model_has_roles.model_type', User::class)
                ->where('model_has_roles.team_id', $currentOrganisation->id)
                ->distinct()
                ->pluck('permissions.name')
                ->toArray();
        }

        // Fall back to customer user permissions (only if no organisation role)
        $currentCustomer = $user->customers()->first();

        if ($currentCustomer) {
            // Get permissions from customer user's role
            $roleId = DB::table('customer_user')
                ->where('user_id', $user->id)
                ->where('customer_id', $currentCustomer->id)
                ->value('role_id');

            if ($roleId) {
                return DB::table('permissions')
                    ->join('role_has_permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
                    ->where('role_has_permissions.role_id', $roleId)
                    ->distinct()
                    ->pluck('permissions.name')
                    ->toArray();
            }
        }

        return [];
    }

    /**
     * Get user roles for the current organisation
     */
    protected function getUserRoles(?User $user, ?Organisation $currentOrganisation): array
    {
        if (!$user || !$currentOrganisation) {
            return [];
        }

        // Check if user has organisation roles first (organisation takes priority)
        $hasOrganisationRole = DB::table('model_has_roles')
            ->where('model_id', $user->id)
            ->where('model_type', User::class)
            ->where('team_id', $currentOrganisation->id)
            ->exists();

        if ($hasOrganisationRole) {
            // Get organisation role name
            $organisationRole = DB::table('roles')
                ->join('model_has_roles', 'roles.id', '=', 'model_has_roles.role_id')
                ->where('model_has_roles.model_id', $user->id)
                ->where('model_has_roles.model_type', User::class)
                ->where('roles.team_id', $currentOrganisation->id)
                ->value('roles.name');

            return $organisationRole ? [$organisationRole] : [];
        }

        // Fall back to customer user role (only if no organisation role)
        $currentCustomer = $user->customers()->first();

        if ($currentCustomer) {
            // For customer users, get role from customer_user pivot table
            $roleId = DB::table('customer_user')
                ->where('user_id', $user->id)
                ->where('customer_id', $currentCustomer->id)
                ->value('role_id');

            if ($roleId) {
                $roleName = DB::table('roles')
                    ->where('id', $roleId)
                    ->value('name');
                return $roleName ? [$roleName] : [];
            }
        }

        return [];
    }
}
