<?php

namespace App\Http\Traits;

use Modules\Customer\Models\Customer;

trait HasCurrentCustomer
{
    /**
     * Get the current customer for the authenticated user
     *
     * @return Customer|null
     */
    protected function getCurrentCustomer(): ?Customer
    {
        $user = auth()->user();

        if (!$user) {
            return null;
        }

        if (!$user->last_customer_id) {
            return null;
        }

        return $user->customers()->find($user->last_customer_id);
    }
}
