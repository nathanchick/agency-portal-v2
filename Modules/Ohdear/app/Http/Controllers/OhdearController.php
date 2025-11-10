<?php

namespace Modules\Ohdear\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Modules\Ohdear\Models\OhdearWebsite;
use Modules\Ohdear\Services\OhdearService;
use Modules\Website\Models\Website;

class OhdearController extends Controller
{
    protected OhdearService $ohdearService;

    public function __construct(OhdearService $ohdearService)
    {
        $this->ohdearService = $ohdearService;
    }

    /**
     * Setup Oh Dear monitoring for a website
     */
    public function setup(Request $request, string $websiteId)
    {
        $validator = Validator::make($request->all(), [
            'urls' => 'required|array|min:1|max:5',
            'urls.*' => 'required|url',
            'public_confirmation' => 'required|accepted',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $website = Website::findOrFail($websiteId);

        try {
            $ohdearWebsite = $this->ohdearService->createSite($website, $request->urls);

            return response()->json([
                'message' => 'Oh Dear monitoring setup successfully!',
                'ohdear_website' => $ohdearWebsite,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to setup Oh Dear monitoring: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get uptime metrics for a website
     */
    public function uptime(Request $request, string $websiteId)
    {
        $website = Website::with('ohdearWebsites')->findOrFail($websiteId);

        if ($website->ohdearWebsites->isEmpty()) {
            return response()->json([
                'error' => 'Oh Dear monitoring is not setup for this website.',
            ], 404);
        }

        $range = $request->query('range', 'day');

        try {
            $monitors = [];

            // Get uptime metrics for each monitored URL
            foreach ($website->ohdearWebsites as $ohdearWebsite) {
                $metrics = $this->ohdearService->getUptimeMetrics($ohdearWebsite->ohdear_site_id, $range);
                $dailyBreakdown = $this->ohdearService->getDailyUptimeBreakdown($ohdearWebsite->ohdear_site_id);

                $monitors[] = [
                    'id' => $ohdearWebsite->id,
                    'url' => $ohdearWebsite->url ?? $metrics['monitor']['url'] ?? '',
                    'ohdear_site_id' => $ohdearWebsite->ohdear_site_id,
                    'metrics' => $metrics,
                    'daily_breakdown' => $dailyBreakdown,
                ];
            }

            return response()->json([
                'monitors' => $monitors,
                'range' => $range,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch uptime data: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get broken links for a website
     */
    public function brokenLinks(string $websiteId)
    {
        $website = Website::with('ohdearWebsite')->findOrFail($websiteId);

        if (!$website->ohdearWebsite) {
            return response()->json([
                'error' => 'Oh Dear monitoring is not setup for this website.',
            ], 404);
        }

        try {
            $data = $this->ohdearService->getBrokenLinks($website->ohdearWebsite->ohdear_site_id);
            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch broken links: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get lighthouse reports for a website
     */
    public function lighthouse(string $websiteId)
    {
        $website = Website::with('ohdearWebsites')->findOrFail($websiteId);

        if ($website->ohdearWebsites->isEmpty()) {
            return response()->json([
                'error' => 'Oh Dear monitoring is not setup for this website.',
            ], 404);
        }

        try {
            $monitors = [];

            // Get lighthouse report for each monitored URL
            foreach ($website->ohdearWebsites as $ohdearWebsite) {
                $report = $this->ohdearService->getLighthouseReport($ohdearWebsite->ohdear_site_id);

                if ($report) {
                    $monitors[] = [
                        'id' => $ohdearWebsite->id,
                        'url' => $ohdearWebsite->url ?? '',
                        'ohdear_site_id' => $ohdearWebsite->ohdear_site_id,
                        'report' => $report,
                    ];
                }
            }

            return response()->json([
                'monitors' => $monitors,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch lighthouse reports: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get historical lighthouse reports for a monitor
     */
    public function lighthouseHistory(string $websiteId, string $monitorId)
    {
        $website = Website::with('ohdearWebsites')->findOrFail($websiteId);

        // Find the specific monitor
        $ohdearWebsite = $website->ohdearWebsites()->where('ohdear_site_id', $monitorId)->first();

        if (!$ohdearWebsite) {
            return response()->json([
                'error' => 'Monitor not found for this website.',
            ], 404);
        }

        try {
            $reports = $this->ohdearService->getLighthouseReports($monitorId);

            return response()->json([
                'monitor_id' => $monitorId,
                'url' => $ohdearWebsite->url ?? '',
                'reports' => $reports,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch lighthouse history: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get detailed lighthouse report by ID
     */
    public function lighthouseReportDetails(string $websiteId, string $monitorId, string $reportId)
    {
        $website = Website::with('ohdearWebsites')->findOrFail($websiteId);

        // Find the specific monitor
        $ohdearWebsite = $website->ohdearWebsites()->where('ohdear_site_id', $monitorId)->first();

        if (!$ohdearWebsite) {
            return response()->json([
                'error' => 'Monitor not found for this website.',
            ], 404);
        }

        try {
            $report = $this->ohdearService->getLighthouseReportById($monitorId, $reportId);

            if (!$report) {
                return response()->json([
                    'error' => 'Report not found.',
                ], 404);
            }

            return response()->json($report);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch lighthouse report details: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get sitemap status for a website
     */
    public function sitemap(string $websiteId)
    {
        $website = Website::with('ohdearWebsite')->findOrFail($websiteId);

        if (!$website->ohdearWebsite) {
            return response()->json([
                'error' => 'Oh Dear monitoring is not setup for this website.',
            ], 404);
        }

        try {
            $data = $this->ohdearService->getSitemapStatus($website->ohdearWebsite->ohdear_site_id);
            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch sitemap status: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Add a new URL to monitor for an existing website
     */
    public function addUrl(Request $request, string $websiteId)
    {
        $validator = Validator::make($request->all(), [
            'url' => 'required|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $website = Website::with('ohdearWebsites')->findOrFail($websiteId);

        // Check that base URL monitor already exists
        if ($website->ohdearWebsites->isEmpty()) {
            return response()->json([
                'error' => 'Please setup monitoring first before adding additional URLs.',
            ], 400);
        }

        // Check if URL already exists
        $urlExists = $website->ohdearWebsites()->where('url', $request->url)->exists();
        if ($urlExists) {
            return response()->json([
                'error' => 'This URL is already being monitored.',
            ], 409);
        }

        try {
            $ohdearWebsite = $this->ohdearService->addMonitorUrl($website, $request->url);

            return response()->json([
                'message' => 'URL added to monitoring successfully!',
                'ohdear_website' => $ohdearWebsite,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to add URL to monitoring: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a monitored URL
     */
    public function deleteUrl(string $websiteId, string $ohdearWebsiteId)
    {
        $website = Website::findOrFail($websiteId);
        $ohdearWebsite = OhdearWebsite::where('website_id', $websiteId)
            ->where('id', $ohdearWebsiteId)
            ->firstOrFail();

        // Prevent deletion of base URL
        if ($ohdearWebsite->url === $website->url) {
            return response()->json([
                'error' => 'Cannot delete the base URL monitor. Please delete all additional URLs first.',
            ], 400);
        }

        try {
            // Delete from Oh Dear API
            $this->ohdearService->deleteMonitor($ohdearWebsite->ohdear_site_id);

            // Delete from database
            $ohdearWebsite->delete();

            return response()->json([
                'message' => 'URL removed from monitoring successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to delete URL from monitoring: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update sitemap URL for a website
     */
    public function updateSitemapUrl(Request $request, string $websiteId)
    {
        $validator = Validator::make($request->all(), [
            'sitemap_url' => 'required|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $website = Website::with('ohdearWebsites')->findOrFail($websiteId);

        // Get the first (base) monitor - only the base URL has sitemap check enabled
        // The base URL is always created first in the monitoring setup
        $baseMonitor = $website->ohdearWebsites->first();

        if (!$baseMonitor) {
            return response()->json([
                'error' => 'No monitors found for this website. Please setup monitoring first.',
            ], 404);
        }

        try {
            $this->ohdearService->updateSitemapUrl($baseMonitor->ohdear_site_id, $request->sitemap_url);

            // Log the update for debugging
            \Log::info('Sitemap URL updated', [
                'monitor_id' => $baseMonitor->ohdear_site_id,
                'sitemap_url' => $request->sitemap_url,
            ]);

            return response()->json([
                'message' => 'Sitemap URL updated successfully!',
                'monitor_id' => $baseMonitor->ohdear_site_id,
                'sitemap_url' => $request->sitemap_url,
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Failed to update sitemap URL', [
                'monitor_id' => $baseMonitor->ohdear_site_id,
                'sitemap_url' => $request->sitemap_url,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Failed to update sitemap URL: ' . $e->getMessage(),
            ], 500);
        }
    }
}
