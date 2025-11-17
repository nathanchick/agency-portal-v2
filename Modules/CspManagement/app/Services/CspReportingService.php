<?php

namespace Modules\CspManagement\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Modules\CspManagement\Models\CspViolation;
use Carbon\Carbon;

class CspReportingService
{
    private string $apiUrl;
    private string $apiToken;
    private int $timeout;
    private int $retryTimes;
    private int $retryDelay;

    public function __construct()
    {
        $this->apiUrl = config('cspmanagement.api_url');
        $this->apiToken = config('cspmanagement.api_token');
        $this->timeout = config('cspmanagement.api_timeout', 30);
        $this->retryTimes = config('cspmanagement.api_retry_times', 3);
        $this->retryDelay = config('cspmanagement.api_retry_delay', 100);
    }

    /**
     * Fetch violations from the CSP API for a specific customer.
     *
     * @param string $customerId
     * @param array $filters Optional filters (status, date_from, date_to, etc.)
     * @return array
     * @throws \Exception
     */
    public function fetchViolationsFromApi(string $customerId, array $filters = []): array
    {
        try {
            // Build URL with token as query parameter
            $url = "{$this->apiUrl}/policies/$customerId";

            $response = Http::timeout($this->timeout)
                ->retry($this->retryTimes, $this->retryDelay)
                ->withHeaders([
                    'Accept' => 'application/json',
                ])
                ->get($url, array_merge(['token' => $this->apiToken], $filters));

            if ($response->failed()) {
                Log::error('CSP API request failed', [
                    'customer_id' => $customerId,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                throw new \Exception("Failed to fetch violations from CSP API: " . $response->status());
            }

            $data = $response->json();

            Log::info('CSP API violations fetched successfully', [
                'customer_id' => $customerId,
                'count' => count($data ?? []),
            ]);

            return $data ?? [];

        } catch (\Exception $e) {
            Log::error('Error fetching CSP violations', [
                'customer_id' => $customerId,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Sync violations from the CSP API to the local database.
     *
     * @param string $customerId
     * @param string|null $websiteId
     * @return array Statistics about the sync operation
     */
    public function syncViolations(string $customerId, ?string $websiteId = null): array
    {
        $stats = [
            'fetched' => 0,
            'created' => 0,
            'updated' => 0,
            'skipped' => 0,
            'errors' => 0,
        ];

        try {
            $filters = [];
            if ($websiteId) {
                $filters['website_id'] = $websiteId;
            }

            $violations = $this->fetchViolationsFromApi($customerId, $filters);
            $stats['fetched'] = count($violations);

            foreach ($violations as $violationData) {
                try {
                    $result = $this->processViolation($customerId, $websiteId, $violationData);
                    $stats[$result]++;
                } catch (\Exception $e) {
                    $stats['errors']++;
                    Log::error('Error processing violation', [
                        'customer_id' => $customerId,
                        'violation' => $violationData,
                        'error' => $e->getMessage(),
                    ]);
                }
            }

            Log::info('CSP violations sync completed', [
                'customer_id' => $customerId,
                'website_id' => $websiteId,
                'stats' => $stats,
            ]);

        } catch (\Exception $e) {
            Log::error('Error during CSP violations sync', [
                'customer_id' => $customerId,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }

        return $stats;
    }

    /**
     * Process a single violation from the API response.
     *
     * @param string $customerId
     * @param string|null $websiteId
     * @param array $violationData
     * @return string 'created', 'updated', or 'skipped'
     */
    private function processViolation(string $customerId, ?string $websiteId, array $violationData): string
    {
        // Map API fields to local database fields
        $directive = $violationData['directive'] ?? '';
        $blockedUri = $violationData['blocked_url'] ?? '';
        $documentUri = $violationData['document_url'] ?? '';

        // Extract host from API or parse from blocked URL
        $host = $violationData['host'] ?? null;
        if (!$host && $blockedUri) {
            $parsedUrl = parse_url($blockedUri);
            $host = $parsedUrl['host'] ?? null;
        }

        // Find existing violation using composite index
        $existing = CspViolation::where('customer_id', $customerId)
            ->where('directive', $directive)
            ->where('blocked_uri', $blockedUri)
            ->where('document_uri', $documentUri)
            ->first();

        if ($existing) {
            // Update occurrence count and last seen timestamp
            $existing->update([
                'occurrence_count' => $existing->occurrence_count + 1,
                'last_seen_at' => isset($violationData['updated_at'])
                    ? Carbon::parse($violationData['updated_at'])
                    : Carbon::now(),
            ]);

            return 'updated';
        }

        // Create new violation
        CspViolation::create([
            'customer_id' => $customerId,
            'website_id' => $websiteId,
            'directive' => $directive,
            'host' => $host,
            'blocked_uri' => $blockedUri,
            'document_uri' => $documentUri,
            'violated_directive' => $directive,
            'effective_directive' => null,
            'source_file' => $violationData['source_file'] ?? null,
            'line_number' => null,
            'column_number' => null,
            'disposition' => !empty($violationData['disposition']) ? $violationData['disposition'] : 'enforce',
            'status' => 'new',
            'occurrence_count' => 1,
            'first_seen_at' => isset($violationData['created_at'])
                ? Carbon::parse($violationData['created_at'])
                : Carbon::now(),
            'last_seen_at' => isset($violationData['updated_at'])
                ? Carbon::parse($violationData['updated_at'])
                : Carbon::now(),
            'raw_report' => $violationData,
        ]);

        return 'created';
    }

    /**
     * Get violation statistics for a customer.
     *
     * @param string $customerId
     * @param string|null $websiteId
     * @return array
     */
    public function getViolationStats(string $customerId, ?string $websiteId = null): array
    {
        $query = CspViolation::forCustomer($customerId);

        if ($websiteId) {
            $query->forWebsite($websiteId);
        }

        return [
            'total' => $query->count(),
            'new' => (clone $query)->where('status', 'new')->count(),
            'approved' => (clone $query)->where('status', 'approved')->count(),
            'rejected' => (clone $query)->where('status', 'rejected')->count(),
            'ignored' => (clone $query)->where('status', 'ignored')->count(),
            'by_directive' => (clone $query)
                ->selectRaw('directive, count(*) as count')
                ->groupBy('directive')
                ->orderByDesc('count')
                ->pluck('count', 'directive')
                ->toArray(),
        ];
    }
}
