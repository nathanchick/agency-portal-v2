<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Modules\Organisation\Models\Organisation;
use Symfony\Component\HttpFoundation\Response;

class SetPermissionTeam
{
    /**
     * Handle an incoming request.
     *
     * Set the current organisation as the permission team context for Spatie Permission
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (config('app.debug')) {
            \Log::debug('SetPermissionTeam - Start', [
                'has_user' => $user !== null,
                'user_id' => $user?->id,
            ]);
        }

        if ($user) {
            // Try to get current organisation from tenant context
            // If no tenant is set, fall back to user's first organisation
            $currentOrganisation = null;

            try {
                $currentOrganisation = Organisation::current();
            } catch (\Spatie\Multitenancy\Exceptions\NoCurrentTenant $e) {
                // Exception caught - no tenant
            }

            // If still no organisation, get from user
            if (! $currentOrganisation) {
                $currentOrganisation = $user->organisations()->first();
            }

            if (config('app.debug')) {
                \Log::debug('SetPermissionTeam - Organisation Check', [
                    'has_organisation' => $currentOrganisation !== null,
                    'organisation_id' => $currentOrganisation?->id,
                    'organisation_name' => $currentOrganisation?->name,
                ]);
            }

            if ($currentOrganisation) {
                // Set the team ID for Spatie Permission
                setPermissionsTeamId($currentOrganisation->id);

                // Debug logging in development
                if (config('app.debug')) {
                    \Log::debug('SetPermissionTeam - Team Set', [
                        'user_id' => $user->id,
                        'organisation_id' => $currentOrganisation->id,
                        'organisation_name' => $currentOrganisation->name,
                        'team_id_set' => getPermissionsTeamId(),
                        'user_roles' => $user->roles()->where('roles.team_id', $currentOrganisation->id)->pluck('name')->toArray(),
                    ]);
                }
            } else {
                \Log::warning('SetPermissionTeam - No organisation found for user', [
                    'user_id' => $user->id,
                    'user_email' => $user->email,
                ]);
            }
        }

        return $next($request);
    }
}
