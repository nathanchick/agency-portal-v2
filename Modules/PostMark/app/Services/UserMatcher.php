<?php

namespace Modules\PostMark\Services;

use App\Models\User;
use Modules\Customer\Models\Customer;
use Modules\Organisation\Models\Organisation;
use Modules\PostMark\Exceptions\UserNotFoundException;
use Modules\PostMark\Models\InboundEmail;

class UserMatcher
{
    /**
     * Find user by email address (case-insensitive)
     *
     * @throws UserNotFoundException
     */
    public function findUserByEmail(string $email): User
    {
        $user = User::whereRaw('LOWER(email) = ?', [strtolower($email)])->first();

        if (! $user) {
            throw new UserNotFoundException("User not found for email: {$email}");
        }

        return $user;
    }

    /**
     * Determine customer context for the user
     *
     * Strategy:
     * 1. Use organisation from InboundEmail (since we now have org in webhook URL)
     * 2. Use User's last_customer_id if it belongs to that organisation
     * 3. If User has only 1 customer in that org → Use that
     * 4. If User has multiple customers in that org → Use first
     * 5. Return null if no customers found
     */
    public function determineCustomerContext(User $user, InboundEmail $inboundEmail): ?Customer
    {
        // If we have organisation_id from the webhook URL, use it for context
        if ($inboundEmail->organisation_id) {
            return $this->determineCustomerForOrganisation($user, $inboundEmail->organisation_id);
        }

        // Fallback: Use last_customer_id if available
        if ($user->last_customer_id) {
            $customer = Customer::find($user->last_customer_id);
            if ($customer) {
                return $customer;
            }
        }

        // Get all user's customers
        $customers = $user->customers;

        // If only one customer, use it
        if ($customers->count() === 1) {
            return $customers->first();
        }

        // If multiple customers, use first (or could prompt user)
        if ($customers->count() > 0) {
            return $customers->first();
        }

        return null;
    }

    /**
     * Determine customer for a specific organisation
     */
    private function determineCustomerForOrganisation(User $user, string $organisationId): ?Customer
    {
        // Get user's customers that belong to this organisation
        $customers = $user->customers()
            ->where('customers.organisation_id', $organisationId)
            ->get();

        // If no customers in this organisation, return null
        if ($customers->isEmpty()) {
            return null;
        }

        // If user's last_customer_id matches one of these customers, use it
        if ($user->last_customer_id) {
            $lastCustomer = $customers->firstWhere('id', $user->last_customer_id);
            if ($lastCustomer) {
                return $lastCustomer;
            }
        }

        // Otherwise, return the first customer in this organisation
        return $customers->first();
    }

    /**
     * Determine organisation context from customer
     */
    public function determineOrganisationContext(?Customer $customer): ?Organisation
    {
        if (! $customer) {
            return null;
        }

        return $customer->organisation;
    }

    /**
     * Get complete context (user, customer, organisation) from email
     *
     * @return array{user: User, customer: Customer|null, organisation: Organisation|null}
     * @throws UserNotFoundException
     */
    public function getEmailContext(InboundEmail $inboundEmail): array
    {
        $user = $this->findUserByEmail($inboundEmail->from_email);
        $customer = $this->determineCustomerContext($user, $inboundEmail);
        $organisation = $this->determineOrganisationContext($customer);

        return [
            'user' => $user,
            'customer' => $customer,
            'organisation' => $organisation,
        ];
    }
}
