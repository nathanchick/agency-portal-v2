<?php

namespace Modules\Website\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Website\Models\Website;

class WebsiteController extends Controller
{
    use HasCurrentOrganisation;

    /**
     * Display a listing of all websites for organisation users
     */
    public function index()
    {
        $organisationId = $this->getCurrentOrganisationId();

        // Get all websites for the organisation
        $websites = Website::with(['customer', 'project', 'ohdearWebsites'])
            ->whereHas('customer', function ($query) use ($organisationId) {
                $query->where('organisation_id', $organisationId);
            })
            ->join('customers', 'websites.customer_id', '=', 'customers.id')
            ->orderBy('customers.name')
            ->orderBy('websites.url')
            ->select('websites.*')
            ->get();

        return Inertia::render('websites/index', [
            'websites' => $websites,
            'isCustomerView' => false,
        ]);
    }

    /**
     * Display the performance page for a website
     */
    public function performance(string $id)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $website = Website::with(['customer', 'project', 'ohdearWebsites'])
            ->whereHas('customer', function ($query) use ($organisationId) {
                $query->where('organisation_id', $organisationId);
            })
            ->findOrFail($id);

        return Inertia::render('websites/performance', [
            'website' => $website,
            'isCustomerView' => false,
        ]);
    }

    /**
     * Display the security page for a website
     */
    public function security(string $id)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $website = Website::with(['customer', 'project', 'ohdearWebsites'])
            ->whereHas('customer', function ($query) use ($organisationId) {
                $query->where('organisation_id', $organisationId);
            })
            ->findOrFail($id);

        return Inertia::render('websites/security', [
            'website' => $website,
            'isCustomerView' => false,
        ]);
    }
}
