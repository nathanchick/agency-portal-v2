<?php

namespace Modules\Ohdear\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Website\Models\Website;

class CustomerOhdearController extends Controller
{
    /**
     * Display the uptime section for customer
     */
    public function uptime(string $website): Response
    {
        $user = auth()->user();

        // Get the customer user is currently logged in as
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'You must be logged in as a customer to view site health.');
        }

        $websiteModel = Website::with(['customer', 'project', 'ohdearWebsites'])
            ->where('customer_id', $customer->id)
            ->findOrFail($website);

        return Inertia::render('websites/performance', [
            'website' => $websiteModel,
            'isCustomerView' => true,
            'currentSection' => 'uptime',
        ]);
    }

    /**
     * Display the broken links section for customer
     */
    public function brokenLinks(string $website): Response
    {
        $user = auth()->user();

        // Get the customer user is currently logged in as
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'You must be logged in as a customer to view site health.');
        }

        $websiteModel = Website::with(['customer', 'project', 'ohdearWebsites'])
            ->where('customer_id', $customer->id)
            ->findOrFail($website);

        return Inertia::render('websites/performance', [
            'website' => $websiteModel,
            'isCustomerView' => true,
            'currentSection' => 'broken-links',
        ]);
    }

    /**
     * Display the lighthouse (page speed) section for customer
     */
    public function lighthouse(string $website): Response
    {
        $user = auth()->user();

        // Get the customer user is currently logged in as
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'You must be logged in as a customer to view site health.');
        }

        $websiteModel = Website::with(['customer', 'project', 'ohdearWebsites'])
            ->where('customer_id', $customer->id)
            ->findOrFail($website);

        return Inertia::render('websites/performance', [
            'website' => $websiteModel,
            'isCustomerView' => true,
            'currentSection' => 'lighthouse',
        ]);
    }

    /**
     * Display the sitemap section for customer
     */
    public function sitemap(string $website): Response
    {
        $user = auth()->user();

        // Get the customer user is currently logged in as
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'You must be logged in as a customer to view site health.');
        }

        $websiteModel = Website::with(['customer', 'project', 'ohdearWebsites'])
            ->where('customer_id', $customer->id)
            ->findOrFail($website);

        return Inertia::render('websites/performance', [
            'website' => $websiteModel,
            'isCustomerView' => true,
            'currentSection' => 'sitemap',
        ]);
    }
}
