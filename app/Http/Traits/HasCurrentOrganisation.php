<?php

namespace App\Http\Traits;

use Modules\Organisation\Models\Organisation;

trait HasCurrentOrganisation
{
    /**
     * Get the current organisation for the authenticated user
     */
    protected function getCurrentOrganisation(): ?Organisation
    {
        $user = auth()->user();

        if (! $user) {
            return null;
        }

        // Try to get from multitenancy first
        $organisation = Organisation::current();

        // Try session if not found
        if (! $organisation && session('current_organisation_id')) {
            $sessionOrgId = session('current_organisation_id');

            // Try direct organisations first
            $organisation = $user->organisations()->find($sessionOrgId);

            // If not found, check if accessible through customer
            if (! $organisation) {
                $hasCustomerAccess = \Illuminate\Support\Facades\DB::table('customers')
                    ->join('customer_user', 'customers.id', '=', 'customer_user.customer_id')
                    ->where('customer_user.user_id', $user->id)
                    ->where('customers.organisation_id', $sessionOrgId)
                    ->exists();

                if ($hasCustomerAccess) {
                    $organisation = Organisation::find($sessionOrgId);
                }
            }
        }

        // Fall back to first organisation (direct or through customer)
        if (! $organisation) {
            $organisation = $user->organisations()->first();

            // If still not found, try first customer's organisation
            if (! $organisation) {
                $firstCustomer = $user->customers()->first();
                if ($firstCustomer) {
                    $organisation = Organisation::find($firstCustomer->organisation_id);
                }
            }
        }

        return $organisation;
    }

    /**
     * Get the current organisation ID for the authenticated user
     */
    protected function getCurrentOrganisationId(): string
    {
        $organisation = $this->getCurrentOrganisation();

        if (! $organisation) {
            abort(403, 'You must belong to an organisation to perform this action.');
        }

        return $organisation->id;
    }
}
