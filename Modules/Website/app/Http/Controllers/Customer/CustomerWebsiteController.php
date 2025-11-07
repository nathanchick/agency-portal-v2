<?php

namespace Modules\Website\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Website\Models\Website;

class CustomerWebsiteController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Display a listing of websites for the current customer
     */
    public function index()
    {
        $user = auth()->user();

        // Get the customer user is currently logged in as
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'You must be logged in as a customer to view websites.');
        }

        // Get websites for this specific customer
        $websites = Website::with(['customer', 'project', 'ohdearWebsites'])
            ->where('customer_id', $customer->id)
            ->orderBy('url')
            ->get();

        return Inertia::render('websites/index', [
            'websites' => $websites,
            'isCustomerView' => true,
        ]);
    }

    /**
     * Display the performance page for a website
     */
    public function performance(string $id)
    {
        $user = auth()->user();

        // Get the customer user is currently logged in as
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'You must be logged in as a customer to view websites.');
        }

        $website = Website::with(['customer', 'project', 'ohdearWebsites'])
            ->where('customer_id', $customer->id)
            ->findOrFail($id);

        return Inertia::render('websites/performance', [
            'website' => $website,
            'isCustomerView' => true,
        ]);
    }

    /**
     * Display the security page for a website
     */
    public function security(string $id)
    {
        $user = auth()->user();

        // Get the customer user is currently logged in as
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'You must be logged in as a customer to view websites.');
        }

        $website = Website::with(['customer', 'project', 'ohdearWebsites'])
            ->where('customer_id', $customer->id)
            ->findOrFail($id);

        return Inertia::render('websites/security', [
            'website' => $website,
            'isCustomerView' => true,
        ]);
    }
}
