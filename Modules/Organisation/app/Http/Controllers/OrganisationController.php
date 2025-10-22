<?php

namespace Modules\Organisation\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Organisation\Models\Organisation;

class OrganisationController extends Controller
{
    /**
     * Switch the current organisation for the user
     */
    public function switch(Request $request)
    {
        $validated = $request->validate([
            'organisation_id' => 'required|exists:organisations,id',
        ]);

        $user = $request->user();
        $organisationId = $validated['organisation_id'];

        // Verify user has access to this organisation (directly or through customer)
        $hasDirectAccess = $user->organisations()->where('organisations.id', $organisationId)->exists();

        $hasCustomerAccess = \Illuminate\Support\Facades\DB::table('customers')
            ->join('customer_user', 'customers.id', '=', 'customer_user.customer_id')
            ->where('customer_user.user_id', $user->id)
            ->where('customers.organisation_id', $organisationId)
            ->exists();

        if (! $hasDirectAccess && ! $hasCustomerAccess) {
            return back()->with('error', 'You do not have access to this organisation.');
        }

        // Store the selected organisation in the session
        $request->session()->put('current_organisation_id', $organisationId);

        // Update user's last organisation
        $user->update(['last_organisation_id' => $organisationId]);
        $user->update(['last_customer_id' => null]);

        return redirect()->route('dashboard')->with('success', 'Organisation switched successfully.');
    }
}
