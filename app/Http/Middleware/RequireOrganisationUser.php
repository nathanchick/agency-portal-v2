<?php

namespace App\Http\Middleware;

use App\Http\Traits\HasOrganisationRole;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Organisation\Models\Organisation;
use Symfony\Component\HttpFoundation\Response;

class RequireOrganisationUser
{

    use HasOrganisationRole;

    /**
     * Handle an incoming request.
     *
     * Ensures the user is an organisation user (has a role in model_has_roles)
     * for the current organisation, and not just a customer user.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(403, 'Unauthorized');
        }

        $role = $this->getCurrentOrganisationUserRole();

        // Get current organisation from session or multitenancy
        $currentOrganisation = Organisation::current();

        if (! $currentOrganisation && session('current_organisation_id')) {
            $currentOrganisation = Organisation::find(session('current_organisation_id'));
        }

        if (! $currentOrganisation) {
            $currentOrganisation = $user->organisations()->first();
        }

        if (! $currentOrganisation) {
            abort(403, 'You must belong to an organisation to access this resource.');
        }

        // Check if user has an organisation role in model_has_roles table for the CURRENT organisation
        $hasOrganisationRole = DB::table('model_has_roles')
            ->where('model_id', $user->id)
            ->where('model_type', get_class($user))
            ->where('team_id', $currentOrganisation->id)
            ->exists();

        if (! $hasOrganisationRole) {
            abort(403, 'This resource is only accessible to organisation users.');
        }

        return $next($request);
    }
}
