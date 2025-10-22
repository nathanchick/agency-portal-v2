<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $user = $request->validateCredentials();

        if (Features::enabled(Features::twoFactorAuthentication()) && $user->hasEnabledTwoFactorAuthentication()) {
            $request->session()->put([
                'login.id' => $user->getKey(),
                'login.remember' => $request->boolean('remember'),
            ]);

            return to_route('two-factor.login');
        }

        Auth::login($user, $request->boolean('remember'));

        // Update last login timestamp
        $user->last_login_at = now();
        $user->save();

        $request->session()->regenerate();

        // Set current organisation and customer from user's last logged in values
        $this->setCurrentOrganisationAndCustomer($user, $request);

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Set current organisation and customer in session from user's last logged in values
     */
    protected function setCurrentOrganisationAndCustomer($user, Request $request): void
    {
        $organisationId = null;
        $customerId = null;
        $needsReset = false;

        // Check if values are null (first login or never set)
        if (! $user->last_organisation_id && ! $user->last_customer_id) {
            $needsReset = true;
        }

        // Try to use last logged in organisation if set
        if ($user->last_organisation_id && ! $needsReset) {
            // Verify user still has access to this organisation
            $hasDirectAccess = $user->organisations()->where('organisations.id', $user->last_organisation_id)->exists();
            $hasCustomerAccess = \Illuminate\Support\Facades\DB::table('customers')
                ->join('customer_user', 'customers.id', '=', 'customer_user.customer_id')
                ->where('customer_user.user_id', $user->id)
                ->where('customers.organisation_id', $user->last_organisation_id)
                ->exists();

            if ($hasDirectAccess || $hasCustomerAccess) {
                $organisationId = $user->last_organisation_id;
            } else {
                // User no longer has access - need to reset
                $needsReset = true;
            }
        }

        // Try to use last logged in customer if set
        if ($user->last_customer_id && ! $needsReset) {
            $hasCustomerAccess = $user->customers()->where('customers.id', $user->last_customer_id)->exists();
            if ($hasCustomerAccess) {
                $customerId = $user->last_customer_id;
                // Also verify customer's organisation matches
                $customer = $user->customers()->find($user->last_customer_id);
                if ($customer && $organisationId && $customer->organisation_id !== $organisationId) {
                    $needsReset = true;
                    $customerId = null;
                }
            } else {
                // User no longer has access - need to reset
                $needsReset = true;
            }
        }

        // If no valid last values or user lost access, reset to defaults
        if (! $organisationId || $needsReset) {
            // Priority 1: First organisation role (organisation user)
            $firstOrg = $user->organisations()->first();
            if ($firstOrg) {
                $organisationId = $firstOrg->id;
                $customerId = null; // Organisation users don't get auto-assigned to customers
            } else {
                // Priority 2: First customer (customer user)
                $firstCustomer = $user->customers()->first();
                if ($firstCustomer) {
                    $organisationId = $firstCustomer->organisation_id;
                    $customerId = $firstCustomer->id;
                } else {
                    // User has no assignments - fail login
                    Auth::guard('web')->logout();
                    $request->session()->invalidate();
                    $request->session()->regenerateToken();

                    abort(403, 'You are not assigned to any organisation or customer. Please contact your administrator.');
                }
            }

            // Reset the user's last values to the new defaults
            $user->update([
                'last_organisation_id' => $organisationId,
                'last_customer_id' => $customerId,
            ]);
        }

        // Set session values
        if ($organisationId) {
            $request->session()->put('current_organisation_id', $organisationId);
        }
        if ($customerId) {
            $request->session()->put('current_customer_id', $customerId);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
