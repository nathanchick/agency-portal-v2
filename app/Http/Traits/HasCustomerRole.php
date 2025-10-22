<?php

declare(strict_types=1);

namespace App\Http\Traits;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Modules\Customer\Models\Customer;
use Modules\Organisation\Models\Role;

trait HasCustomerRole
{
    /**
     * Get the role of the user within the specified customer context.
     *
     * @param User $user
     * @param Customer $customer
     * @return string
     */
    protected function getCustomerUserRole(User $user, Customer $customer): string
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
}
