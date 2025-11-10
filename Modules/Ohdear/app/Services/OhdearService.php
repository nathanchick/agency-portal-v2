<?php

namespace Modules\Ohdear\Services;

use OhDear\PhpSdk\Enums\UptimeMetricsSplit;
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
            'hour' => ['hours' => 1, 'split' => UptimeMetricsSplit::Minute],
            'day' => ['days' => 1, 'split' => UptimeMetricsSplit::Hour],
            'week' => ['days' => 7, 'split' => UptimeMetricsSplit::Hour],
            'month' => ['days' => 30, 'split' => UptimeMetricsSplit::Day],
        ];

        $config = $ranges[$range] ?? $ranges['day'];

        if (isset($config['hours'])) {
            $startDate = now()->subHours($config['hours'])->format('Y-m-d H:i:s');
        } else {
            $startDate = now()->subDays($config['days'])->format('Y-m-d H:i:s');
        }


        $endDate = now()->format('Y-m-d H:i:s');

        try {
            // Get HTTP uptime metrics
            $metrics = $this->client->httpUptimeMetrics($monitorId, $startDate, $endDate, $config['split']);

            // Transform metrics from camelCase to snake_case for frontend
            $transformedMetrics = [];
            foreach ($metrics as $metric) {
                $transformedMetrics[] = [
                    'datetime' => $metric->date ?? null,
                    'total_time_in_seconds' => $metric->totalTimeInSeconds ?? null,
                    'dns_time_in_seconds' => $metric->dnsTimeInSeconds ?? null,
                    'tcp_time_in_seconds' => $metric->tcpTimeInSeconds ?? null,
                    'ssl_handshake_time_in_seconds' => $metric->sslHandshakeTimeInSeconds ?? null,
                    'download_time_in_seconds' => $metric->downloadTimeInSeconds ?? null,
                    'was_successful' => $metric->was_successful ?? $metric->wasSuccessful ?? null,
                ];
            }

            // Get monitor details for uptime percentage
            $monitor = $this->client->monitor($monitorId);

            return [
                'metrics' => $transformedMetrics,
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
                $startDate = $date->copy()->startOfDay()->format('Y-m-d H:i:s');
                $endDate = $date->copy()->endOfDay()->format('Y-m-d H:i:s');

                // Get metrics for this day
                $metrics = $this->client->httpUptimeMetrics($monitorId, $startDate, $endDate, UptimeMetricsSplit::Hour);
                $metricsArray = iterator_to_array($metrics);

                // Calculate uptime percentage for the day
                // Filter out metrics where was_successful is null (no data yet)
                $validMetrics = array_filter($metricsArray, function($metric) {
                    $wasSuccessful = $metric->was_successful ?? $metric->wasSuccessful ?? null;
                    return $wasSuccessful !== null;
                });

                $totalChecks = count($validMetrics);
                $successfulChecks = count(array_filter($validMetrics, function($metric) {
                    $wasSuccessful = $metric->was_successful ?? $metric->wasSuccessful ?? false;
                    return $wasSuccessful === true;
                }));

                // If no valid metrics, return 100% (no downtime recorded)
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

        // Transform from camelCase to snake_case for frontend
        $transformed = [];
        foreach ($brokenLinks as $link) {
            $transformed[] = [
                'crawled_url' => $link->crawledUrl ?? '',
                'status_code' => $link->statusCode ?? 0,
                'found_on_url' => $link->foundOnUrl ?? '',
                'link_text' => $link->linkText ?? '',
                'internal' => $link->internal ?? false,
            ];
        }

        return $transformed;
    }

    /**
     * Get latest lighthouse report for a monitor
     */
    public function getLighthouseReport(int $monitorId): ?array
    {
        try {
            $lighthouse = $this->client->latestLighthouseReport($monitorId);

            // Log the jsonReport to see its structure
            \Log::info('Lighthouse JSON Report', [
                'monitor_id' => $monitorId,
                'report_id' => $lighthouse->id ?? null,
                'has_json_report' => isset($lighthouse->jsonReport),
                'json_report_type' => gettype($lighthouse->jsonReport ?? null),
                'json_report_sample' => $lighthouse->jsonReport ? json_encode($lighthouse->jsonReport) : null,
            ]);

            return [
                'id' => $lighthouse->id ?? null,
                'created_at' => $lighthouse->createdAt ?? null,
                'monitor_id' => $monitorId,

                // Scores (excluding PWA)
                'performance_score' => $lighthouse->performanceScore ?? null,
                'accessibility_score' => $lighthouse->accessibilityScore ?? null,
                'best_practices_score' => $lighthouse->bestPracticesScore ?? null,
                'seo_score' => $lighthouse->seoScore ?? null,

                // Core Web Vitals
                'first_contentful_paint_ms' => $lighthouse->firstContentfulPaintInMs ?? null,
                'speed_index_ms' => $lighthouse->speedIndexInMs ?? null,
                'largest_contentful_paint_ms' => $lighthouse->largestContentfulPaintInMs ?? null,
                'time_to_interactive_ms' => $lighthouse->timeToInteractiveInMs ?? null,
                'total_blocking_time_ms' => $lighthouse->totalBlockingTimeInMs ?? null,
                'cumulative_layout_shift' => $lighthouse->cumulativeLayoutShift ?? null,

                // Metadata
                'performed_on_checker_server' => $lighthouse->performedOnCheckerServer ?? null,

                // Screenshot
                'full_page_screenshot' => $lighthouse->fullPageScreenshot ?? null,

                // Full JSON report (may be null for latest report endpoint)
                'json_report' => $lighthouse->jsonReport ?? null,

                // HTML report not needed - frontend uses JSON with react2-lighthouse-viewer
                'html_report' => null,
            ];
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Get historical lighthouse reports for a monitor
     */
    public function getLighthouseReports(int $monitorId): array
    {
        try {
            $reports = $this->client->lighthouseReports($monitorId);

            $transformed = [];
            foreach ($reports as $report) {
                $transformed[] = [
                    'id' => $report->id ?? null,
                    'created_at' => $report->createdAt ?? null,
                    'monitor_id' => $monitorId,

                    // Scores (excluding PWA)
                    'performance_score' => $report->performanceScore ?? null,
                    'accessibility_score' => $report->accessibilityScore ?? null,
                    'best_practices_score' => $report->bestPracticesScore ?? null,
                    'seo_score' => $report->seoScore ?? null,

                    // Core Web Vitals
                    'first_contentful_paint_ms' => $report->firstContentfulPaintInMs ?? null,
                    'speed_index_ms' => $report->speedIndexInMs ?? null,
                    'largest_contentful_paint_ms' => $report->largestContentfulPaintInMs ?? null,
                    'time_to_interactive_ms' => $report->timeToInteractiveInMs ?? null,
                    'total_blocking_time_ms' => $report->totalBlockingTimeInMs ?? null,
                    'cumulative_layout_shift' => $report->cumulativeLayoutShift ?? null,

                    // Metadata
                    'performed_on_checker_server' => $report->performedOnCheckerServer ?? null,

                    // Screenshot
                    'full_page_screenshot' => $report->fullPageScreenshot ?? null,
                ];
            }

            return $transformed;
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Get a specific lighthouse report by ID with full JSON data
     */
    public function getLighthouseReportById(int $monitorId, int $reportId): ?array
    {
        try {
            $report = $this->client->lighthouseReport($monitorId, $reportId);

            return [
                'id' => $report->id ?? null,
                'created_at' => $report->createdAt ?? null,
                'monitor_id' => $monitorId,

                // Scores (excluding PWA)
                'performance_score' => $report->performanceScore ?? null,
                'accessibility_score' => $report->accessibilityScore ?? null,
                'best_practices_score' => $report->bestPracticesScore ?? null,
                'seo_score' => $report->seoScore ?? null,

                // Core Web Vitals
                'first_contentful_paint_ms' => $report->firstContentfulPaintInMs ?? null,
                'speed_index_ms' => $report->speedIndexInMs ?? null,
                'largest_contentful_paint_ms' => $report->largestContentfulPaintInMs ?? null,
                'time_to_interactive_ms' => $report->timeToInteractiveInMs ?? null,
                'total_blocking_time_ms' => $report->totalBlockingTimeInMs ?? null,
                'cumulative_layout_shift' => $report->cumulativeLayoutShift ?? null,

                // Metadata
                'performed_on_checker_server' => $report->performedOnCheckerServer ?? null,

                // Screenshot
                'full_page_screenshot' => $report->fullPageScreenshot ?? null,

                // Full JSON report
                'json_report' => $report->jsonReport ?? null,
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
            $sitemap = $this->client->sitemap($monitorId);

            // Transform from camelCase to snake_case for frontend
            return [
                'check_url' => $sitemap->checkUrl ?? '',
                'total_url_count' => $sitemap->totalUrlCount ?? 0,
                'total_issues_count' => $sitemap->totalIssuesCount ?? 0,
                'has_issues' => $sitemap->hasIssues ?? false,
                'issues' => $sitemap->issues ?? [],
                'sitemap_indexes' => array_map(function($index) {
                    return [
                        'url' => $index['url'] ?? '',
                        'issues' => $index['issues'] ?? [],
                    ];
                }, $sitemap->sitemapIndexes ?? []),
                'sitemaps' => array_map(function($sitemapData) {
                    return [
                        'url' => $sitemapData['url'] ?? '',
                        'url_count' => $sitemapData['urlCount'] ?? 0,
                        'issues' => $sitemapData['issues'] ?? [],
                    ];
                }, $sitemap->sitemaps ?? []),
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Update sitemap URL for a monitor
     */
    public function updateSitemapUrl(int $monitorId, string $sitemapUrl): void
    {
        // Extract the path from the full URL (e.g., https://example.com/sitemap.xml -> sitemap.xml)
        $parsedUrl = parse_url($sitemapUrl);
        $path = isset($parsedUrl['path']) ? ltrim($parsedUrl['path'], '/') : 'sitemap.xml';

        // Update the sitemap check settings with the path
        $this->client->updateMonitor($monitorId, [
            'sitemap_check_settings' => [
                'path' => $path,
                'speed' => 'default',
            ],
        ]);
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
