<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $role  The role name(s) to check (can be pipe-separated like "Admin|Manager")
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(403, 'Unauthorized');
        }

        // Get user's current role from shared Inertia data
        $userRole = $request->attributes->get('inertia_shared_data')['auth']['role'] ?? null;

        // If we can't get it from shared data, determine it manually
        if (!$userRole) {
            $userRole = $this->getUserRole($user);
        }

        // Split roles by pipe (Admin|Manager) and check if user has any of them
        $allowedRoles = explode('|', $role);

        if (!in_array($userRole, $allowedRoles)) {
            abort(403, 'Unauthorized - Insufficient permissions');
        }

        return $next($request);
    }

    /**
     * Get the user's role (checking both organisation and customer contexts)
     */
    protected function getUserRole($user): string
    {
        // Check organisation role first
        $organisation = $user->organisations()->first();

        if ($organisation) {
            $hasOrganisationRole = DB::table('model_has_roles')
                ->where('model_id', $user->id)
                ->where('model_type', get_class($user))
                ->where('team_id', $organisation->id)
                ->exists();

            if ($hasOrganisationRole) {
                $roleName = DB::table('roles')
                    ->join('model_has_roles', 'roles.id', '=', 'model_has_roles.role_id')
                    ->where('model_has_roles.model_id', $user->id)
                    ->where('model_has_roles.model_type', get_class($user))
                    ->where('roles.team_id', $organisation->id)
                    ->value('roles.name');

                return $roleName ?? 'User';
            }
        }

        // Fall back to customer role
        $customer = $user->customers()->first();

        if ($customer) {
            $roleId = DB::table('customer_user')
                ->where('user_id', $user->id)
                ->where('customer_id', $customer->id)
                ->value('role_id');

            if ($roleId) {
                $roleName = DB::table('roles')
                    ->where('id', $roleId)
                    ->value('name');

                return $roleName ?? 'User';
            }
        }

        return 'User';
    }
}
