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
     * Redirect to uptime section (default)
     */
    public function performance(string $id)
    {
        return redirect()->route('customer.websites.performance.uptime', $id);
    }

    /**
     * Display the uptime performance section
     */
    public function performanceUptime(string $id)
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
            'currentSection' => 'uptime',
        ]);
    }

    /**
     * Display the broken links performance section
     */
    public function performanceBrokenLinks(string $id)
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
            'currentSection' => 'broken-links',
        ]);
    }

    /**
     * Display the lighthouse performance section
     */
    public function performanceLighthouse(string $id)
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
            'currentSection' => 'lighthouse',
        ]);
    }

    /**
     * Display the sitemap performance section
     */
    public function performanceSitemap(string $id)
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
            'currentSection' => 'sitemap',
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
