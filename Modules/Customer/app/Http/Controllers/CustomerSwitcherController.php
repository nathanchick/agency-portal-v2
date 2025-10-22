<?php

namespace Modules\Customer\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CustomerSwitcherController extends Controller
{
    /**
     * Switch the current customer for the user
     */
    public function switch(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
        ]);

        $user = $request->user();
        $customerId = $validated['customer_id'];

        // Verify user has access to this customer
        $hasAccess = $user->customers()->where('customers.id', $customerId)->exists();

        if (! $hasAccess) {
            return back()->with('error', 'You do not have access to this customer.');
        }

        // Get the customer to find its organisation
        $customer = $user->customers()->find($customerId);

        if (! $customer) {
            return back()->with('error', 'Customer not found.');
        }

        // Store the selected customer in the session
        $request->session()->put('current_customer_id', $customerId);

        // Also update the organisation to match the customer's organisation
        $request->session()->put('current_organisation_id', $customer->organisation_id);

        // Update user's last customer and organisation
        $user->update([
            'last_customer_id' => $customerId,
            'last_organisation_id' => $customer->organisation_id,
        ]);

        return redirect()->route('dashboard')->with('success', 'Customer switched successfully.');
    }
}
