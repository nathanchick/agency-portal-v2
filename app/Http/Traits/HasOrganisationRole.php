<?php

namespace App\Http\Traits;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Modules\Organisation\Models\Organisation;

trait HasOrganisationRole
{
    /**
     * Get the organisation directly assigned to the currently authenticated user based on session data.
     *
     * @return Organisation|null
     */
    protected function getCurrentDirectOrganisation()
    {
        $user = auth()->user();
        if (! $user) {
            return null;
        }

        return $user->last_organisation_id ?
            $user->organisations()->find($user->last_organisation_id) :
            null;
    }

    /**
     * Get the organisation associated with the currently authenticated user as a customer based on database data.
     *
     * @return Organisation|null
     */
    protected function getCurrentCustomerOrganisation()
    {
        $user = auth()->user();
        if (! $user) {
            return null;
        }

        if (! $user->last_organisation_id) {
            return null;
        }

        // Verify user has customer access to this organisation
        $hasCustomerAccess = DB::table('customers')
            ->join('customer_user', 'customers.id', '=', 'customer_user.customer_id')
            ->where('customer_user.user_id', $user->id)
            ->where('customers.organisation_id', $user->last_organisation_id)
            ->exists();

        if ($hasCustomerAccess) {
            // Get organisation through customer relationship, not direct find
            $customer = $user->customers()
                ->where('customers.organisation_id', $user->last_organisation_id)
                ->first();

            return $customer?->organisation;
        }

        return null;
    }

    /**
     * Get the role of the currently authenticated user within the current organisation.
     *
     * @return string/null
     */
    protected function getCurrentOrganisationUserRole(): ?string
    {
        $user = auth()->user();

        $organisation = $this->getCurrentDirectOrganisation();

        if($organisation) {
            return $this->getOrganisationUserRole($user, $organisation);
        }

        return null;
    }

    /**
     * Get the role of a user within a specific organisation.
     *
     * @param User $user
     * @param Organisation $organisation
     * @return string|null
     */
    protected function getOrganisationUserRole(User $user, Organisation $organisation): ?string
    {
        $roles = DB::table('model_has_roles')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('model_has_roles.model_id', $user->id)
            ->where('model_has_roles.model_type', User::class)
            ->where('model_has_roles.team_id', $organisation->id)
            ->pluck('roles.name')
            ->toArray();

        return $roles[0] ?? null;
    }
}
