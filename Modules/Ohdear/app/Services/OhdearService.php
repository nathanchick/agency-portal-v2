<?php

namespace Modules\Ohdear\Services;

use OhDear\PhpSdk\OhDear;
use Modules\Ohdear\Models\OhdearWebsite;
use Modules\Website\Models\Website;

class OhdearService
{
    protected OhDear $client;

    public function __construct()
    {
        $this->client = new OhDear(config('services.ohdear.api_key'));
    }

    /**
     * Create monitors in Oh Dear for each URL
     * Base URL gets all checks, additional URLs only get uptime and lighthouse
     */
    public function createSite(Website $website, array $urls): array
    {
        $ohdearWebsites = [];
        $customer = $website->customer()->first();
        $baseUrl = $website->url;

        // Create a separate monitor for each URL
        foreach ($urls as $url) {
            // Base URL gets all checks, additional URLs only get uptime and lighthouse
            $isBaseUrl = $url === $baseUrl;
            $checks = $isBaseUrl
                ? ['uptime', 'broken_links', 'certificate_health', 'lighthouse', 'cron', 'sitemap', 'mixed_content']
                : ['uptime', 'lighthouse'];

            $monitor = $this->client->createMonitor([
                'url' => $url,
                'team_id' => config('services.ohdear.team_id'),
                'type' => 'http',
                'tags' => [$customer->name],
                'group_name' => $customer->organisation_id,
                'checks' => $checks,
            ]);

            // Store the mapping in our database
            $ohdearWebsites[] = OhdearWebsite::create([
                'website_id' => $website->id,
                'ohdear_site_id' => $monitor->id,
                'team_id' => config('services.ohdear.team_id'),
                'url' => $url,
                'urls' => [$url], // Keep for backwards compatibility
            ]);
        }

        return $ohdearWebsites;
    }

    /**
     * Get uptime metrics for a monitor
     */
    public function getUptimeMetrics(int $monitorId, string $range = 'day'): array
    {
        // Determine date range based on parameter
        $ranges = [
            'hour' => ['hours' => 1, 'split' => 'minute'],
            'day' => ['days' => 1, 'split' => 'hour'],
            'week' => ['days' => 7, 'split' => 'hour'],
            'month' => ['days' => 30, 'split' => 'day'],
        ];

        $config = $ranges[$range] ?? $ranges['day'];

        if (isset($config['hours'])) {
            $startDate = now()->subHours($config['hours'])->toIso8601String();
        } else {
            $startDate = now()->subDays($config['days'])->toIso8601String();
        }

        $endDate = now()->toIso8601String();

        try {
            // Get HTTP uptime metrics
            $metrics = $this->client->httpUptimeMetrics($monitorId, $startDate, $endDate, $config['split']);

            // Get monitor details for uptime percentage
            $monitor = $this->client->monitor($monitorId);

            return [
                'metrics' => iterator_to_array($metrics),
                'uptime_percentage_7_days' => $monitor->uptimePercentage ?? 100,
                'uptime_percentage_12_months' => $monitor->uptimePercentage ?? 100,
                'monitor' => [
                    'id' => $monitor->id ?? $monitorId,
                    'url' => $monitor->url ?? '',
                    'status' => $monitor->status ?? 'unknown',
                ],
            ];
        } catch (\Exception $e) {
            return [
                'metrics' => [],
                'uptime_percentage_7_days' => 0,
                'uptime_percentage_12_months' => 0,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Get daily uptime breakdown for the last 8 days
     */
    public function getDailyUptimeBreakdown(int $monitorId): array
    {
        $breakdown = [];

        try {
            for ($i = 0; $i < 8; $i++) {
                $date = now()->subDays($i);
                $startDate = $date->startOfDay()->toIso8601String();
                $endDate = $date->endOfDay()->toIso8601String();

                // Get metrics for this day
                $metrics = $this->client->httpUptimeMetrics($monitorId, $startDate, $endDate, 'hour');
                $metricsArray = iterator_to_array($metrics);

                // Calculate uptime percentage for the day
                $totalChecks = count($metricsArray);
                $successfulChecks = count(array_filter($metricsArray, function($metric) {
                    return isset($metric->was_successful) && $metric->was_successful;
                }));

                $uptimePercentage = $totalChecks > 0 ? ($successfulChecks / $totalChecks) * 100 : 100;

                $breakdown[] = [
                    'date' => $date->format('Y-m-d'),
                    'label' => $i === 0 ? 'Today' : ($i === 1 ? 'Yesterday' : $date->format('Y-m-d')),
                    'uptime_percentage' => round($uptimePercentage, 2),
                ];
            }
        } catch (\Exception $e) {
            // Return empty breakdown on error
        }

        return $breakdown;
    }

    /**
     * Get broken links for a monitor
     */
    public function getBrokenLinks(int $monitorId): array
    {
        $brokenLinks = $this->client->brokenLinks($monitorId);

        return iterator_to_array($brokenLinks);
    }

    /**
     * Get lighthouse report for a monitor
     */
    public function getLighthouseReport(int $monitorId): ?array
    {
        try {
            $lighthouse = $this->client->latestLighthouseReport($monitorId);

            return [
                'performance' => $lighthouse->scores['performance'] ?? null,
                'accessibility' => $lighthouse->scores['accessibility'] ?? null,
                'best_practices' => $lighthouse->scores['best-practices'] ?? null,
                'seo' => $lighthouse->scores['seo'] ?? null,
                'pwa' => $lighthouse->scores['pwa'] ?? null,
            ];
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Get sitemap status for a monitor
     */
    public function getSitemapStatus(int $monitorId): ?array
    {
        try {
            // Oh Dear doesn't have a dedicated sitemap endpoint in the SDK
            // This would need to be implemented when needed
            return null;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Get all monitors for the configured team
     */
    public function getAllMonitors(): array
    {
        $teamId = (int) config('services.ohdear.team_id');
        $monitors = $this->client->monitors($teamId);

        return iterator_to_array($monitors);
    }

    /**
     * Add a single monitor URL (for additional URLs after initial setup)
     * Additional URLs only get uptime and lighthouse checks
     */
    public function addMonitorUrl(Website $website, string $url): OhdearWebsite
    {
        $customer = $website->customer()->first();

        $monitor = $this->client->createMonitor([
            'url' => $url,
            'team_id' => config('services.ohdear.team_id'),
            'type' => 'http',
            'tags' => [$customer->name],
            'group_name' => $customer->organisation_id,
            'checks' => ['uptime', 'lighthouse'], // Additional URLs only get uptime and lighthouse
        ]);

        // Store the mapping in our database
        return OhdearWebsite::create([
            'website_id' => $website->id,
            'ohdear_site_id' => $monitor->id,
            'team_id' => config('services.ohdear.team_id'),
            'url' => $url,
            'urls' => [$url],
        ]);
    }

    /**
     * Delete a monitor from Oh Dear
     */
    public function deleteMonitor(int $monitorId): void
    {
        $this->client->deleteMonitor($monitorId);
    }
}
