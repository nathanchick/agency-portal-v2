## Ohdear Monitors API Data Example
```
{
    "data": [
        {
            "id": 1,
            "team_id": 1,
            "type": "http",
            "url": "https://freek.dev",
            "uses_https": true,
            "sort_url": "freek.dev",
            "label": "freek.dev",
            "group_name": "",
            "tags": [],
            "description": null,
            "notes": null,
            "latest_run_date": "2019-09-16 07:29:02",
            "summarized_check_result": "succeeded",
            "checks": [
                {
                    "id": 100,
                    "type": "uptime",
                    "label": "Uptime",
                    "enabled": true,
                    "latest_run_ended_at": "2019-09-16 07:29:02",
                    "latest_run_result": "succeeded",
                    "summary": "Up",
                    "settings": {
                        "uptime_check_location": "paris",
                        "uptime_check_expected_final_redirect_url": null,
                        "uptime_check_failed_notification_threshold": null,
                        "uptime_check_http_verb": null,
                        "uptime_check_timeout": null,
                        "uptime_check_max_redirect_count": null,
                        "uptime_check_payload": null,
                        "uptime_check_valid_status_codes": null,
                        "uptime_check_look_for_string": null,
                        "uptime_check_absent_string": null,
                        "uptime_check_expected_response_headers": null,
                        "http_client_headers": null
                    },
                    "active_snooze": null
                },
                {
                    "id": 101,
                    "type": "broken_links",
                    "label": "Broken links",
                    "enabled": true,
                    "latest_run_ended_at": "2019-09-16 07:29:05",
                    "latest_run_result": "succeeded",
                    "summary": "None",
                    "settings": {
                        "broken_links_check_include_external_links": null,
                        "broken_links_whitelisted_urls": null,
                        "crawler_headers": [],
                        "crawler_speed": "default",
                        "broken_link_types": null,
                        "respect_robots": true
                    },
                    "active_snooze": null
                }
            ],
            "uptime_check_settings": {
                "location": "paris",
                "look_for_string": "",
                "absent_string": null,
                "expected_response_headers": [],
                "failed_notification_threshold": 2,
                "http_verb": "get",
                "payload": [],
                "timeout": 5,
                "valid_status_codes": ["2*"],
                "max_redirect_count": 5,
                "expected_final_redirect_url": null,
                "http_client_headers": []
            },
            "certificate_health_check_settings": {
                "expires_soon_threshold_in_days": null
            },
            "broken_links_check_settings": {
                "whitelisted_urls": [],
                "check_include_external_links": false,
                "types": ["link", "image", "script", "stylesheet", "og:image"],
                "do_not_crawl_urls": [],
                "force_crawl_urls": [],
                "new_links_only": false
            },
            "dns_check_settings": {
                "extra_cnames": [],
                "monitor_main_domain": false,
                "ignored_record_types": ["SOA"],
                "check_nameservers_in_sync": true
            },
            "lighthouse_check_settings": {
                "continent": "europe",
                "cpu_slowdown_modifier": 0,
                "notification_settings": null,
                "preferred_server_name": "lighthouse-checker-frankfurt-1",
                "http_client_headers": []
            },
            "application_health_check_settings": {
                "result_url": null,
                "secret": "your-secret-key",
                "headers": []
            },
            "domain_check_settings": {
                "not_supported_reason": null,
                "expires_soon_threshold_in_days": null
            },
            "performance_check_settings": {
                "threshold_in_ms": 3500,
                "change_percentage": 50
            },
            "sitemap_check_settings": {
                "path": "sitemap.xml",
                "speed": "default"
            },
            "crawler_headers": [],
            "send_report_to_emails": [],
            "include_check_types_in_report": [],
            "badge_id": "badge-123",
            "marked_for_deletion_at": null,
            "created_at": "2019-09-16 07:25:00",
            "updated_at": "2019-09-16 07:25:00"
        },
        {
            "id": 2,
            "team_id": 1,
            "type": "ping",
            "url": "spatie.be",
            "uses_https": false,
            "sort_url": "spatie.be",
            "label": "spatie.be",
            "group_name": "",
            "tags": [],
            "description": null,
            "notes": null,
            "latest_run_date": "2019-09-16 07:30:00",
            "summarized_check_result": "succeeded",
            "checks": [
                {
                    "id": 200,
                    "type": "uptime",
                    "label": "Uptime",
                    "enabled": true,
                    "latest_run_ended_at": "2019-09-16 07:30:00",
                    "latest_run_result": "succeeded",
                    "summary": "Up",
                    "settings": {
                        "uptime_check_location": "paris",
                        "uptime_check_expected_final_redirect_url": null,
                        "uptime_check_failed_notification_threshold": null,
                        "uptime_check_http_verb": null,
                        "uptime_check_timeout": null,
                        "uptime_check_max_redirect_count": null,
                        "uptime_check_payload": null,
                        "uptime_check_valid_status_codes": null,
                        "uptime_check_look_for_string": null,
                        "uptime_check_absent_string": null,
                        "uptime_check_expected_response_headers": null,
                        "http_client_headers": null
                    },
                    "active_snooze": null
                }
            ],
            "uptime_check_settings": {
                "location": "paris",
                "ttl": 64,
                "count": 5,
                "packet_size_in_bytes": 56,
                "acceptable_packet_loss_percentage": 0,
                "acceptable_average_response_time_in_ms": 400,
                "timeout_in_seconds": 1,
                "interval_in_seconds": 1,
                "failed_notification_threshold": 2
            },
            "badge_id": "badge-456",
            "created_at": "2019-09-16 07:26:00",
            "updated_at": "2019-09-16 07:26:00"
        },
        {
            "id": 3,
            "team_id": 1,
            "type": "tcp",
            "url": "smtp.gmail.com:3306",
            "uses_https": false,
            "sort_url": "smtp.gmail.com:3306",
            "label": "smtp.gmail.com:3306",
            "group_name": "",
            "tags": [],
            "description": null,
            "notes": null,
            "latest_run_date": "2019-09-16 07:31:00",
            "summarized_check_result": "succeeded",
            "checks": [
                {
                    "id": 300,
                    "type": "uptime",
                    "label": "Uptime",
                    "enabled": true,
                    "latest_run_ended_at": "2019-09-16 07:31:00",
                    "latest_run_result": "succeeded",
                    "summary": "Up",
                    "settings": {
                        "uptime_check_location": "paris",
                        "uptime_check_expected_final_redirect_url": null,
                        "uptime_check_failed_notification_threshold": null,
                        "uptime_check_http_verb": null,
                        "uptime_check_timeout": null,
                        "uptime_check_max_redirect_count": null,
                        "uptime_check_payload": null,
                        "uptime_check_valid_status_codes": null,
                        "uptime_check_look_for_string": null,
                        "uptime_check_absent_string": null,
                        "uptime_check_expected_response_headers": null,
                        "http_client_headers": null
                    },
                    "active_snooze": null
                }
            ],
            "uptime_check_settings": {
                "location": "paris",
                "tcp_send_string": "",
                "timeout_in_ms": 1000,
                "look_for_string_in_welcome_message": "",
                "look_for_string_in_send_string_response": "",
                "failed_notification_threshold": 2
            },
            "badge_id": "badge-789",
            "created_at": "2019-09-16 07:27:00",
            "updated_at": "2019-09-16 07:27:00"
        }
    ],
    "links": {
        "first": "https://ohdear.app/api/monitors?page%5Bnumber%5D=1",
        "last": "https://ohdear.app/api/monitors?page%5Bnumber%5D=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "path": "https://ohdear.app/api/monitors",
        "per_page": 200,
        "to": 3,
        "total": 3
    }
}
```

---

## Implementation Notes

### Property Naming Conventions

The OhDear PHP SDK returns data in **camelCase**, but our frontend expects **snake_case**. Always transform properties in the `OhdearService.php` layer.

**SDK Returns (camelCase):**
```php
$metric->totalTimeInSeconds
$metric->dnsTimeInSeconds
$metric->wasSuccessful
$link->crawledUrl
$link->statusCode
$sitemap->checkUrl
$sitemap->totalUrlCount
```

**Frontend Expects (snake_case):**
```typescript
total_time_in_seconds
dns_time_in_seconds
was_successful
crawled_url
status_code
check_url
total_url_count
```

### Uptime Metrics

**Date Format Issue:**
The OhDear API expects dates in `Y-m-d H:i:s` format, NOT ISO8601.

```php
// ✅ Correct
$startDate = now()->subDays(7)->format('Y-m-d H:i:s');

// ❌ Wrong
$startDate = now()->subDays(7)->toIso8601String();
```

**Property Mappings:**
```php
'datetime' => $metric->date ?? null,  // Note: 'date' from SDK becomes 'datetime' for frontend
'total_time_in_seconds' => $metric->totalTimeInSeconds ?? null,
'dns_time_in_seconds' => $metric->dnsTimeInSeconds ?? null,
'tcp_time_in_seconds' => $metric->tcpTimeInSeconds ?? null,
'ssl_handshake_time_in_seconds' => $metric->sslHandshakeTimeInSeconds ?? null,
'download_time_in_seconds' => $metric->downloadTimeInSeconds ?? null,
'was_successful' => $metric->was_successful ?? $metric->wasSuccessful ?? null,
```

**Important:** Check for both `was_successful` (snake_case) and `wasSuccessful` (camelCase) as the SDK version may vary.

### Broken Links

**Property Mappings:**
```php
'crawled_url' => $link->crawledUrl ?? '',
'status_code' => $link->statusCode ?? 0,
'found_on_url' => $link->foundOnUrl ?? '',
'link_text' => $link->linkText ?? '',
'internal' => $link->internal ?? false,
```

### Sitemap Configuration

**Updating Sitemap URL:**

The sitemap configuration requires the **path only** (not full URL) and uses the `sitemap_check_settings` parameter:

```php
// ✅ Correct
$this->client->updateMonitor($monitorId, [
    'sitemap_check_settings' => [
        'path' => 'sitemap.xml',  // Just the path, not full URL
        'speed' => 'default',
    ],
]);

// ❌ Wrong approaches:
// 'sitemap_url' => $url  // This parameter doesn't exist
// 'sitemapCheckSettings' => [...] // Wrong case (should be snake_case for update)
// 'path' => 'https://example.com/sitemap.xml'  // Full URL not supported
```

**Path Extraction:**
```php
// Convert full URL to path
$parsedUrl = parse_url($sitemapUrl);
$path = ltrim($parsedUrl['path'], '/');  // Remove leading slash
// https://example.com/sitemap.xml -> sitemap.xml
// https://example.com/sitemaps/sitemap_index.xml -> sitemaps/sitemap_index.xml
```

### Monitor URL Field

**Database Issue:**
The `ohdear_websites.url` field may be `null` in existing records. Always fallback to the API-provided URL:

```php
'url' => $ohdearWebsite->url ?? $metrics['monitor']['url'] ?? '',
```

### Daily Uptime Calculation

When calculating uptime percentages from metrics where `was_successful` is `null`:

```php
// Filter out null values first
$validMetrics = array_filter($metricsArray, function($metric) {
    $wasSuccessful = $metric->was_successful ?? $metric->wasSuccessful ?? null;
    return $wasSuccessful !== null;
});

// Then calculate from valid metrics only
$totalChecks = count($validMetrics);
$successfulChecks = count(array_filter($validMetrics, function($metric) {
    $wasSuccessful = $metric->was_successful ?? $metric->wasSuccessful ?? false;
    return $wasSuccessful === true;
}));

// Return 100% if no valid metrics (no downtime recorded)
$uptimePercentage = $totalChecks > 0 ? ($successfulChecks / $totalChecks) * 100 : 100;
```

### Common Gotchas

1. **Date Property Name:** SDK returns `date` but frontend expects `datetime`
2. **Null vs False:** `was_successful` can be `null` (no data), `true` (up), or `false` (down)
3. **Sitemap Path:** Must be relative path, not full URL
4. **Update Payload:** Use snake_case for update parameters (`sitemap_check_settings`), not camelCase
5. **Monitor Identification:** Base URL monitor is always created first, use `->first()` to get it

### Routes Structure

Performance monitoring is split into separate pages with sub-navigation:
- `/websites/{id}/performance` - Redirects to uptime
- `/websites/{id}/performance/uptime`
- `/websites/{id}/performance/broken-links`
- `/websites/{id}/performance/lighthouse`
- `/websites/{id}/performance/sitemap`

Each route renders the same component with a `currentSection` prop to conditionally display the appropriate card.

---

## Lighthouse Implementation

### Property Naming Conventions

The OhDear PHP SDK returns data in **camelCase**, but our frontend expects **snake_case**. Always transform properties in the `OhdearService.php` layer.

**SDK Returns (camelCase):**
```php
$report->performanceScore
$report->accessibilityScore
$report->bestPracticesScore
$report->seoScore
$report->firstContentfulPaintInMs
$report->speedIndexInMs
$report->largestContentfulPaintInMs
$report->timeToInteractiveInMs
$report->totalBlockingTimeInMs
$report->cumulativeLayoutShift
$report->performedOnCheckerServer
$report->fullPageScreenshot
$report->jsonReport
```

**Frontend Expects (snake_case):**
```typescript
performance_score
accessibility_score
best_practices_score
seo_score
first_contentful_paint_ms
speed_index_ms
largest_contentful_paint_ms
time_to_interactive_ms
total_blocking_time_ms
cumulative_layout_shift
performed_on_checker_server
full_page_screenshot
json_report
```

### Lighthouse Report Methods

**Latest Report:**
```php
// Returns latest report for a monitor (may not include jsonReport)
$report = $ohDear->latestLighthouseReport($monitorId);
```

**Historical Reports:**
```php
// Returns array of all lighthouse reports
$reports = $ohDear->lighthouseReports($monitorId);
```

**Specific Report with Full JSON:**
```php
// Returns specific report with full jsonReport data
$report = $ohDear->lighthouseReport($monitorId, $reportId);
```

### Lighthouse Score Thresholds

Scores are rated on a 0-100 scale with the following thresholds:

- **Good (Green):** 90-100
- **Needs Improvement (Yellow/Orange):** 50-89
- **Poor (Red):** 0-49

### Core Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| First Contentful Paint (FCP) | ≤ 1.8s | 1.8s - 3.0s | > 3.0s |
| Speed Index | ≤ 3.4s | 3.4s - 5.8s | > 5.8s |
| Largest Contentful Paint (LCP) | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| Time to Interactive (TTI) | ≤ 3.8s | 3.8s - 7.3s | > 7.3s |
| Total Blocking Time (TBT) | ≤ 200ms | 200ms - 600ms | > 600ms |
| Cumulative Layout Shift (CLS) | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |

### PWA Score Exclusion

We exclude the Progressive Web App (PWA) score from our implementation as it's not relevant for most of our websites.

### Full JSON Report

The `jsonReport` property contains the complete Lighthouse audit data and is only available when:
1. Fetching a specific report by ID using `lighthouseReport($monitorId, $reportId)`
2. NOT available in `latestLighthouseReport()` or `lighthouseReports()` responses

The JSON report can be used to render detailed audit information, recommendations, and opportunities for improvement.

### Property Mappings

```php
[
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
]
```

### Full Page Screenshot

The `fullPageScreenshot` property contains a URL to the full page screenshot captured during the Lighthouse audit. This screenshot shows how the page appeared when the performance metrics were collected.

The screenshot is displayed directly in the UI in a dedicated "Screenshot" section.

### Full Lighthouse Report Embedding

The complete interactive Lighthouse report can be embedded using the OhDear report URL:

**Report URL Pattern:**
```
https://ohdear.app/monitors/{monitor_id}/lighthouse-reports/{report_id}
```

**Implementation:**
- The `LighthouseReportViewer` component provides a collapsible section with "Expand view" functionality
- The report is embedded in an iframe for full interactivity
- An "Open in OhDear" button provides direct access to the report in OhDear's interface
- The iframe displays the complete Lighthouse report with all audits, opportunities, and diagnostics

**Note:** The iframe embedding requires that the OhDear report URL is publicly accessible or that authentication is properly handled.

### Lighthouse Frequency

Lighthouse reports are generated **daily** by OhDear. Reports are not generated on-demand.