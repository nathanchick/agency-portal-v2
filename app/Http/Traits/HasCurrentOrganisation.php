<?php

namespace App\Http\Traits;

use Modules\Organisation\Models\Organisation;

trait HasCurrentOrganisation
{
    public function getCurrentDirectOrganisation()
    {
        $user = auth()->user();

        if (! $user) {
            return null;
        }

        // IMPORTANT: Refresh user to get latest last_organisation_id from database
        $user->refresh();

        // Try to get from multitenancy first
        $organisation = Organisation::current();

        // Try database if not found
        if (! $organisation && $user->last_organisation_id) {
            $organisation = $user->organisations()->find($user->last_organisation_id);
        }

        return $organisation;
    }

    /**
     * Get the current organisation for the authenticated user
     */
    protected function getCurrentOrganisation(): ?Organisation
    {
        $user = auth()->user();

        if (! $user) {
            return null;
        }

        // IMPORTANT: Refresh user to get latest last_organisation_id from database
        $user->refresh();

        // Try to get from multitenancy first
        $organisation = Organisation::current();

        // Try database if not found
        if (! $organisation && $user->last_organisation_id) {
            // Try direct organisations first
            $organisation = $user->organisations()->find($user->last_organisation_id);

            // If not found, check if accessible through customer
            if (! $organisation) {
                $hasCustomerAccess = \Illuminate\Support\Facades\DB::table('customers')
                    ->join('customer_user', 'customers.id', '=', 'customer_user.customer_id')
                    ->where('customer_user.user_id', $user->id)
                    ->where('customers.organisation_id', $user->last_organisation_id)
                    ->exists();

                if ($hasCustomerAccess) {
                    // Get through customer relationship, not direct find
                    $customer = $user->customers()
                        ->where('customers.organisation_id', $user->last_organisation_id)
                        ->first();
                    $organisation = $customer?->organisation;
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
                    $organisation = $firstCustomer->organisation;
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
