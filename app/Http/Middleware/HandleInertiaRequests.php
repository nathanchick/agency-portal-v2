<?php

namespace App\Http\Middleware;

use App\Http\Traits\HasOrganisationRole;
use App\Http\Traits\HasCustomerRole;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Modules\Organisation\Models\Organisation;
use Modules\Organisation\Models\Role;
use Modules\Ticket\Models\SavedTicketFilter;
use Modules\Timesheet\Models\Service;

class HandleInertiaRequests extends Middleware
{
    use HasOrganisationRole;
    use HasCustomerRole;

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
        $user = $request->user();
        $userType = 'customer';
        $userRole = 'User';
        $currentOrganisation = null;
        $currentCustomer = null;

        if ($user) {
            [$userType, $userRole, $currentOrganisation, $currentCustomer] = $this->determineUserContext($user);

            // Get organisations directly assigned to the user (for the switcher)
            $directOrganisations = $user->organisations()->select('organisations.id', 'organisations.name')->get();

            // Get organisations through customer assignments (for the switcher)
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

            // Get customers assigned to the user (for the switcher)
            $customers = $user->customers()
                ->select('customers.id', 'customers.name', 'customers.organisation_id')
                ->with('organisation:id,name')
                ->get();

            // Manually set the customers attribute
            $user->setRelation('customers', $customers);
        }

        // Load saved ticket filters for the current user
        $savedFilters = [];
        if ($user && $currentOrganisation) {
            $savedFilters = SavedTicketFilter::where('user_id', $user->id)
                ->where('organisation_id', $currentOrganisation->id)
                ->orderBy('name', 'asc')
                ->get(['id', 'name', 'filters']);
        }

        // Load timesheet services for customer users
        $timesheetServices = [];
        if ($user && $currentOrganisation && $currentCustomer) {
            $timesheetServices = Service::forOrganisation($currentOrganisation->id)
                ->forCustomer($currentCustomer->id)
                ->active()
                ->where('billing_type', 'Hourly')
                ->orderBy('name', 'asc')
                ->get(['id', 'name']);
        }

        // Get unread notifications count
        $unreadNotificationsCount = $user ? $user->unreadNotifications()->count() : 0;

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $user,
                'userType' => $userType,
                'role' => $userRole,
                'currentOrganisation' => $currentOrganisation,
                'currentCustomer' => $currentCustomer,
                'savedTicketFilters' => $savedFilters,
                'timesheetServices' => $timesheetServices,
            ],
            'unreadNotificationsCount' => $unreadNotificationsCount,
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
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

        // Validate last_organisation_id - if user lost access, clear it
        if ($user->last_organisation_id) {
            $hasOrgAccess = $user->organisations()
                ->where('organisations.id', $user->last_organisation_id)
                ->exists();

            $hasCustomerAccess = DB::table('customers')
                ->join('customer_user', 'customers.id', '=', 'customer_user.customer_id')
                ->where('customer_user.user_id', $user->id)
                ->where('customers.organisation_id', $user->last_organisation_id)
                ->exists();

            if (! $hasOrgAccess && ! $hasCustomerAccess) {
                // User lost access - clear their context
                $user->update([
                    'last_organisation_id' => null,
                    'last_customer_id' => null,
                ]);
                $user->refresh();
            }
        }

        // Validate last_customer_id - if user lost access, clear it
        if ($user->last_customer_id) {
            $hasCustomerAccess = $user->customers()
                ->where('customers.id', $user->last_customer_id)
                ->exists();

            if (! $hasCustomerAccess) {
                $user->update(['last_customer_id' => null]);
                $user->refresh();
            }
        }

        // Check if user is an organisation user first (organisation takes priority)
        if (! $currentOrganisation) {
            $currentOrganisation = $this->getCurrentDirectOrganisation();

            // If not found, check if accessible through customer
            if (! $currentOrganisation) {
                $currentOrganisation = $this->getCurrentCustomerOrganisation($user);
            }

            // Fall back to first organisation if session org not found or not set
            if (! $currentOrganisation) {
                $currentOrganisation = $user->organisations()->first();
            }
        }

        // Load Customer if logged in as Customer User Last
        $currentCustomer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if ($currentCustomer) {
            // Customer user - get organisation through customer relationship (not direct find)
            $currentOrganisation = $currentCustomer->organisation;
            $userRole = $this->getCustomerUserRole($user, $currentCustomer);

            return [$userType, $userRole, $currentOrganisation, $currentCustomer];
        }

        // Check if user has an organisation role
        if ($currentOrganisation) {
            if( $userRole = $this->getOrganisationUserRole($user, $currentOrganisation) ) {
                // Organisation user takes priority
                $userType = 'organisation';

                return [$userType, $userRole, $currentOrganisation, $currentCustomer];
            }
        }

        if (! $currentCustomer) {
            $currentCustomer = $user->customers()->first();
        }

        return [$userType, $userRole, $currentOrganisation, $currentCustomer];
    }


    /**
     * Get user roles for the current organisation
     */
    protected function getUserRoles(?User $user, ?Organisation $currentOrganisation): array
    {
        if (! $user || ! $currentOrganisation) {
            return [];
        }

        $organisationRole = $this->getOrganisationUserRole($user, $currentOrganisation);

        if($organisationRole) {
            return [$organisationRole];
        }

        // Fall back to customer user role (only if no organisation role)
        $currentCustomer = $user->customers()->first();

        if ($currentCustomer) {
            $roleName = $this->getCustomerUserRole($user, $currentCustomer);
            return  [$roleName];
        }

        return [];
    }
}
