<?php

namespace Modules\CspManagement\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;
use Modules\CspManagement\Models\CspViolation;
use Modules\CspManagement\Models\CspViolationDecision;
use Modules\CspManagement\Services\CspReportingService;
use Modules\Website\Models\Website;

class CustomerCspViolationController extends Controller
{
    public function __construct(
        private CspReportingService $cspReportingService
    ) {}

    /**
     * Display a listing of pending CSP violations grouped by host for the current customer.
     */
    public function index(Request $request): Response
    {
        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        $query = CspViolation::forCustomer($customerId)
            ->new()
            ->groupedByHost();

        // Apply filters
        if ($request->filled('directive')) {
            $query->where('directive', $request->directive);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('host', 'like', "%{$search}%");
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'last_seen_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $query->orderBy($sortBy, $sortOrder);

        $violations = $query->paginate(20)->withQueryString();

        // Get statistics
        $stats = $this->cspReportingService->getViolationStats($customerId);

        // Get production websites for CSP policy dropdown
        $websites = Website::where('customer_id', $customerId)
            ->where('type', 'production')
            ->select('id', 'url')
            ->orderBy('url')
            ->get();

        // Check if customer has ANY violations at all (to show setup warning)
        $hasAnyViolations = CspViolation::forCustomer($customerId)->exists();

        return Inertia::render('CspManagement/Index', [
            'violations' => $violations,
            'stats' => $stats,
            'filters' => [
                'directive' => $request->directive,
                'search' => $request->search,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
            'websites' => $websites,
            'hasAnyViolations' => $hasAnyViolations,
            'customerId' => $customerId,
        ]);
    }

    /**
     * Display a listing of resolved CSP violations for the current customer.
     */
    public function resolved(Request $request): Response
    {
        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        $query = CspViolation::forCustomer($customerId)
            ->with(['website', 'decider'])
            ->resolved();

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('directive')) {
            $query->where('directive', $request->directive);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('blocked_uri', 'like', "%{$search}%")
                    ->orWhere('document_uri', 'like', "%{$search}%")
                    ->orWhere('source_file', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'decided_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $query->orderBy($sortBy, $sortOrder);

        $violations = $query->paginate(20)->withQueryString();

        return Inertia::render('CspManagement/Resolved', [
            'violations' => $violations,
            'filters' => [
                'status' => $request->status,
                'directive' => $request->directive,
                'search' => $request->search,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    /**
     * Display all violations for a specific host and directive.
     */
    public function showHost(Request $request, string $host, string $directive): Response
    {
        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        // Get all violations for this host and directive
        $violations = CspViolation::forCustomer($customerId)
            ->forHost($host, $directive)
            ->with(['website', 'decider'])
            ->orderByDesc('last_seen_at')
            ->get();

        // Get summary stats
        $stats = [
            'total_urls' => $violations->count(),
            'total_occurrences' => $violations->sum('occurrence_count'),
            'first_seen_at' => $violations->min('first_seen_at'),
            'last_seen_at' => $violations->max('last_seen_at'),
            'status' => $violations->first()?->status ?? 'new',
        ];

        return Inertia::render('CspManagement/HostDetail', [
            'host' => $host,
            'directive' => $directive,
            'violations' => $violations,
            'stats' => $stats,
        ]);
    }

    /**
     * Display the specified CSP violation.
     */
    public function show(Request $request, string $id): Response
    {
        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        $violation = CspViolation::forCustomer($customerId)
            ->with(['website', 'decider', 'decisions.user'])
            ->findOrFail($id);

        return Inertia::render('CspManagement/Show', [
            'violation' => $violation,
        ]);
    }

    /**
     * Approve CSP violation(s) - either by host+directive or single violation ID.
     */
    public function approve(Request $request, string $id = null)
    {
        $request->validate([
            'notes' => 'nullable|string|max:1000',
            'host' => 'nullable|string|required_without:id',
            'directive' => 'nullable|string|required_with:host',
        ]);

        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        // Bulk operation by host+directive
        if ($request->filled('host') && $request->filled('directive')) {
            $violations = CspViolation::forCustomer($customerId)
                ->forHost($request->host, $request->directive)
                ->get();

            foreach ($violations as $violation) {
                $this->recordDecision($violation, 'approved', $request);
                $violation->update([
                    'status' => 'approved',
                    'decided_by' => $request->user()->id,
                    'decided_at' => now(),
                    'decision_notes' => $request->notes,
                ]);
            }

            return back()->with('success', "Approved {$violations->count()} violation(s) for host {$request->host}.");
        }

        // Single violation operation
        $violation = CspViolation::forCustomer($customerId)->findOrFail($id);
        $this->recordDecision($violation, 'approved', $request);
        $violation->update([
            'status' => 'approved',
            'decided_by' => $request->user()->id,
            'decided_at' => now(),
            'decision_notes' => $request->notes,
        ]);

        return back()->with('success', 'Violation approved successfully. This resource will be whitelisted.');
    }

    /**
     * Reject CSP violation(s) - either by host+directive or single violation ID.
     */
    public function reject(Request $request, string $id = null)
    {
        $request->validate([
            'notes' => 'nullable|string|max:1000',
            'host' => 'nullable|string|required_without:id',
            'directive' => 'nullable|string|required_with:host',
        ]);

        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        // Bulk operation by host+directive
        if ($request->filled('host') && $request->filled('directive')) {
            $violations = CspViolation::forCustomer($customerId)
                ->forHost($request->host, $request->directive)
                ->get();

            foreach ($violations as $violation) {
                $this->recordDecision($violation, 'rejected', $request);
                $violation->update([
                    'status' => 'rejected',
                    'decided_by' => $request->user()->id,
                    'decided_at' => now(),
                    'decision_notes' => $request->notes,
                ]);
            }

            return back()->with('success', "Rejected {$violations->count()} violation(s) for host {$request->host}.");
        }

        // Single violation operation
        $violation = CspViolation::forCustomer($customerId)->findOrFail($id);
        $this->recordDecision($violation, 'rejected', $request);
        $violation->update([
            'status' => 'rejected',
            'decided_by' => $request->user()->id,
            'decided_at' => now(),
            'decision_notes' => $request->notes,
        ]);

        return back()->with('success', 'Violation rejected. This resource will remain blocked.');
    }

    /**
     * Ignore CSP violation(s) - either by host+directive or single violation ID.
     */
    public function ignore(Request $request, string $id = null)
    {
        $request->validate([
            'notes' => 'nullable|string|max:1000',
            'host' => 'nullable|string|required_without:id',
            'directive' => 'nullable|string|required_with:host',
        ]);

        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        // Bulk operation by host+directive
        if ($request->filled('host') && $request->filled('directive')) {
            $violations = CspViolation::forCustomer($customerId)
                ->forHost($request->host, $request->directive)
                ->get();

            foreach ($violations as $violation) {
                $this->recordDecision($violation, 'ignored', $request);
                $violation->update([
                    'status' => 'ignored',
                    'decided_by' => $request->user()->id,
                    'decided_at' => now(),
                    'decision_notes' => $request->notes,
                ]);
            }

            return back()->with('success', "Ignored {$violations->count()} violation(s) for host {$request->host}.");
        }

        // Single violation operation
        $violation = CspViolation::forCustomer($customerId)->findOrFail($id);
        $this->recordDecision($violation, 'ignored', $request);
        $violation->update([
            'status' => 'ignored',
            'decided_by' => $request->user()->id,
            'decided_at' => now(),
            'decision_notes' => $request->notes,
        ]);

        return back()->with('success', 'Violation ignored.');
    }

    /**
     * Sync violations from the CSP API.
     */
    public function sync(Request $request)
    {
        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        try {
            $stats = $this->cspReportingService->syncViolations($customerId);

            return back()->with('success', "Sync completed: {$stats['created']} created, {$stats['updated']} updated.");
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to sync violations: ' . $e->getMessage());
        }
    }

    /**
     * Display the audit trail of all CSP violation decisions.
     */
    public function audit(Request $request): Response
    {
        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        $query = CspViolationDecision::query()
            ->whereHas('violation', function ($q) use ($customerId) {
                $q->where('customer_id', $customerId);
            })
            ->with(['violation:id,host,directive,blocked_uri,document_uri', 'user:id,name,email'])
            ->orderByDesc('created_at');

        // Date range filter
        $dateRange = $request->get('date_range', '30');
        if ($dateRange !== 'all') {
            $query->where('created_at', '>=', now()->subDays((int)$dateRange));
        }

        $decisions = $query->paginate(50)->withQueryString();

        return Inertia::render('CspManagement/Audit', [
            'decisions' => $decisions,
            'filters' => [
                'date_range' => $dateRange,
            ],
        ]);
    }

    /**
     * Export audit trail to CSV.
     */
    public function exportAudit(Request $request)
    {
        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        $query = CspViolationDecision::query()
            ->whereHas('violation', function ($q) use ($customerId) {
                $q->where('customer_id', $customerId);
            })
            ->with(['violation:id,host,directive,blocked_uri,document_uri', 'user:id,name,email'])
            ->orderByDesc('created_at');

        // Date range filter
        $dateRange = $request->get('date_range', '30');
        if ($dateRange !== 'all') {
            $query->where('created_at', '>=', now()->subDays((int)$dateRange));
        }

        $decisions = $query->get();

        $filename = 'csp-audit-trail-' . now()->format('Y-m-d') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        $callback = function () use ($decisions) {
            $file = fopen('php://output', 'w');

            // CSV Headers
            fputcsv($file, [
                'Timestamp',
                'Action',
                'Host',
                'Directive',
                'Blocked URI',
                'Document URI',
                'User Name',
                'User Email',
                'User Agent',
                'IP Address',
                'Notes',
            ]);

            // CSV Data
            foreach ($decisions as $decision) {
                fputcsv($file, [
                    $decision->created_at->toDateTimeString(),
                    $decision->action,
                    $decision->violation->host ?? '',
                    $decision->violation->directive ?? '',
                    $decision->violation->blocked_uri ?? '',
                    $decision->violation->document_uri ?? '',
                    $decision->user_name,
                    $decision->user_email,
                    $decision->user_agent ?? '',
                    $decision->ip_address ?? '',
                    $decision->notes ?? '',
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Record a decision in the audit trail.
     */
    private function recordDecision(CspViolation $violation, string $action, Request $request): void
    {
        CspViolationDecision::create([
            'csp_violation_id' => $violation->id,
            'action' => $action,
            'user_id' => $request->user()->id,
            'user_name' => $request->user()->name,
            'user_email' => $request->user()->email,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'notes' => $request->notes,
            'meta_data' => [
                'directive' => $violation->directive,
                'blocked_uri' => $violation->blocked_uri,
                'document_uri' => $violation->document_uri,
            ],
        ]);
    }

    /**
     * Show CSP policy for a website.
     */
    public function showPolicy(Request $request, string $website)
    {
        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        $websiteModel = Website::where('customer_id', $customerId)
            ->where('id', $website)
            ->firstOrFail();

        $policy = null;
        $error = null;
        $headerType = null;

        try {
            // Fetch the website with a timeout
            $response = Http::timeout(10)
                ->get($websiteModel->url);

            // Get all headers
            $allHeaders = $response->headers();

            // Try to find CSP header (case-insensitive search)
            $cspHeader = null;
            foreach ($allHeaders as $headerName => $headerValue) {
                $lowerHeaderName = strtolower($headerName);
                if ($lowerHeaderName === 'content-security-policy') {
                    $cspHeader = is_array($headerValue) ? $headerValue[0] : $headerValue;
                    $headerType = 'Enforce';
                    break;
                } elseif ($lowerHeaderName === 'content-security-policy-report-only') {
                    $cspHeader = is_array($headerValue) ? $headerValue[0] : $headerValue;
                    $headerType = 'Report-Only';
                    break;
                }
            }

            if ($cspHeader) {
                // Parse CSP header into directives
                $policy = $this->parseCspHeader($cspHeader);
            } else {
                $error = 'No Content-Security-Policy header found on this website.';
            }
        } catch (\Exception $e) {
            $error = 'Failed to fetch website: ' . $e->getMessage();
        }

        // Get all production websites for dropdown
        $websites = Website::where('customer_id', $customerId)
            ->where('type', 'production')
            ->select('id', 'url')
            ->orderBy('url')
            ->get();

        return Inertia::render('CspManagement/Policy', [
            'website' => $websiteModel,
            'websites' => $websites,
            'policy' => $policy,
            'headerType' => $headerType,
            'error' => $error,
        ]);
    }

    /**
     * Get production websites for current customer.
     */
    public function getProductionWebsites(Request $request)
    {
        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        $websites = Website::where('customer_id', $customerId)
            ->where('type', 'production')
            ->select('id', 'url')
            ->orderBy('url')
            ->get();

        return response()->json(['websites' => $websites]);
    }

    /**
     * Fetch current CSP policy from a live website.
     */
    public function fetchCurrentPolicy(Request $request)
    {
        $request->validate([
            'website_id' => 'required|uuid|exists:websites,id',
        ]);

        $customerId = $request->user()->last_customer_id;

        if (!$customerId) {
            abort(403, 'No customer selected');
        }

        $website = Website::where('customer_id', $customerId)
            ->where('id', $request->website_id)
            ->firstOrFail();

        try {
            // Fetch the website with a timeout
            $response = Http::timeout(10)
                ->get($website->url);

            // Get all headers for debugging
            $allHeaders = $response->headers();

            // Try to find CSP header (case-insensitive search)
            $cspHeader = null;
            foreach ($allHeaders as $headerName => $headerValue) {
                if (in_array(strtolower($headerName), ['content-security-policy', 'content-security-policy-report-only'])) {
                    $cspHeader = is_array($headerValue) ? $headerValue[0] : $headerValue;
                    break;
                }
            }

            if (!$cspHeader) {
                return response()->json([
                    'success' => false,
                    'message' => 'No Content-Security-Policy header found on this website.',
                    'policy' => null,
                    'debug' => array_keys($allHeaders),
                ]);
            }

            // Parse CSP header into directives
            $policy = $this->parseCspHeader($cspHeader);

            return response()->json([
                'success' => true,
                'message' => 'CSP policy fetched successfully.',
                'policy' => $policy,
                'raw' => $cspHeader,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch website: ' . $e->getMessage(),
                'policy' => null,
            ], 500);
        }
    }

    /**
     * Parse CSP header string into organized array of directives.
     */
    private function parseCspHeader(string $cspHeader): array
    {
        $policy = [];

        // Split by semicolon to get individual directives
        $directives = array_filter(array_map('trim', explode(';', $cspHeader)));

        foreach ($directives as $directive) {
            // Split directive into name and sources
            $parts = preg_split('/\s+/', $directive, 2);

            if (count($parts) >= 1) {
                $directiveName = $parts[0];
                $sources = isset($parts[1]) ? array_filter(explode(' ', $parts[1])) : [];

                $policy[$directiveName] = $sources;
            }
        }

        return $policy;
    }
}
