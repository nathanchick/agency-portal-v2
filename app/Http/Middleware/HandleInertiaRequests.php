<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
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
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();

        // Determine user type based on team-scoped roles in current organisation
        $userType = 'customer';
        $currentOrganisation = \App\Models\Organisation::current();
        $currentCustomer = null;

        if ($user) {
            // First, check if user belongs to a customer
            $currentCustomer = $user->customers()->first();

            if ($currentCustomer) {
                // Customer user - get organisation through customer relationship
                $currentOrganisation = \App\Models\Organisation::find($currentCustomer->organisation_id);
                $userType = 'customer';

            } else {
                // Not a customer user, check for organisation user
                if (!$currentOrganisation) {
                    // Try to get from user's organisations
                    $currentOrganisation = $user->organisations()->first();
                }


                if ($currentOrganisation) {
                    // Check if user has any organisation-level roles (team = organisation_id)
                    // Use DB query directly to avoid Spatie Permission's team context issues
                    $organisationRoles = DB::table('model_has_roles')
                        ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
                        ->where('model_has_roles.model_id', $user->id)
                        ->where('model_has_roles.model_type', 'App\Models\User')
                        ->where('model_has_roles.team_id', $currentOrganisation->id)
                        ->pluck('roles.name')
                        ->toArray();


                    if (!empty($organisationRoles)) {
                        $userType = 'organisation';
                    }
                }
            }
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user,
                'userType' => $userType,
                'currentOrganisation' => $currentOrganisation,
                'currentCustomer' => $currentCustomer,
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'permissions' => $user && $currentOrganisation
                ? $user->getPermissionsViaRoles()->pluck('name')
                : [],
            'roles' => $user && $currentOrganisation
                ? $user->roles()->where('roles.team_id', $currentOrganisation->id)->pluck('name')
                : [],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'message' => $request->session()->get('message'),
            ],
        ];
    }
}
