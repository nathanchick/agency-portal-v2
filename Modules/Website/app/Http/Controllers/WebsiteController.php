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
     * Redirect to uptime section (default)
     */
    public function performance(string $id)
    {
        return redirect()->route('websites.performance.uptime', $id);
    }

    /**
     * Display the uptime performance section
     */
    public function performanceUptime(string $id)
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
            'currentSection' => 'uptime',
        ]);
    }

    /**
     * Display the broken links performance section
     */
    public function performanceBrokenLinks(string $id)
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
            'currentSection' => 'broken-links',
        ]);
    }

    /**
     * Display the lighthouse performance section
     */
    public function performanceLighthouse(string $id)
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
            'currentSection' => 'lighthouse',
        ]);
    }

    /**
     * Display the sitemap performance section
     */
    public function performanceSitemap(string $id)
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
            'currentSection' => 'sitemap',
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
