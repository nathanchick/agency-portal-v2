<?php

namespace Modules\Website\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasCurrentOrganisation;
use App\Services\ModuleSettingsService;
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

    /**
     * Show the edit website page
     */
    public function edit(string $id, ModuleSettingsService $settingsService)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $website = Website::with(['customer', 'project'])
            ->whereHas('customer', function ($query) use ($organisationId) {
                $query->where('organisation_id', $organisationId);
            })
            ->findOrFail($id);

        // Get module settings for this website
        $moduleSettings = $settingsService->getWebsiteSettings($website);

        return Inertia::render('websites/edit', [
            'website' => [
                'id' => $website->id,
                'url' => $website->url,
                'type' => $website->type,
                'notes' => $website->notes,
                'customer' => [
                    'id' => $website->customer->id,
                    'name' => $website->customer->name,
                ],
                'project' => $website->project ? [
                    'id' => $website->project->id,
                    'name' => $website->project->name,
                ] : null,
            ],
            'moduleSettings' => $moduleSettings,
        ]);
    }

    /**
     * Update the website
     */
    public function update(Request $request, string $id, ModuleSettingsService $settingsService)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $website = Website::whereHas('customer', function ($query) use ($organisationId) {
            $query->where('organisation_id', $organisationId);
        })->findOrFail($id);

        $validated = $request->validate([
            'type' => 'sometimes|in:production,staging,development',
            'url' => 'sometimes|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $website->update($validated);

        // Save module settings if provided
        if ($request->has('module_settings')) {
            $settingsService->saveWebsiteSettings($website, $request->input('module_settings'));
        }

        return redirect()->route('websites.edit', $website->id)->with('success', 'Website updated successfully');
    }

    /**
     * Update module settings for the website
     */
    public function updateModuleSettings(Request $request, string $id, ModuleSettingsService $settingsService)
    {
        $organisationId = $this->getCurrentOrganisationId();

        $website = Website::whereHas('customer', function ($query) use ($organisationId) {
            $query->where('organisation_id', $organisationId);
        })->findOrFail($id);

        $validated = $request->validate([
            'module_name' => 'required|string',
            'settings' => 'required|array',
        ]);

        // Save settings for the specific module
        $settingsService->saveWebsiteSettings($website, [
            $validated['module_name'] => $validated['settings'],
        ]);

        return back()->with('success', 'Module settings updated successfully');
    }
}
