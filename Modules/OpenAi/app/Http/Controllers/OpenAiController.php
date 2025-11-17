<?php

namespace Modules\OpenAi\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Modules\OpenAi\Models\TicketQualityAnalysis;
use Modules\OpenAi\Services\CspViolationAnalysisService;
use Modules\OpenAi\Services\OpenAiService;
use Modules\OpenAi\Services\PiiRedactionService;
use Modules\OpenAi\Services\TicketQualityService;
use Modules\Organisation\Models\Organisation;
use Modules\Website\Models\Website;

class OpenAiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('openai::index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('openai::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('openai::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('openai::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id) {}

    /**
     * Analyze ticket quality and provide improvement suggestions
     */
    public function analyzeTicket(Request $request): JsonResponse
    {
        // Validate request
        $validated = $request->validate([
            'title' => 'required|string|min:10|max:255',
            'message' => 'required|string|min:20',
            'priority' => 'required|in:low,medium,high',
            'category' => 'nullable|string',
            'website_id' => 'nullable|uuid|exists:websites,id',
            'customer_id' => 'required|uuid|exists:customers,id',
            'metadata' => 'nullable|array',
        ]);

        // Rate limiting: 10 requests per hour per user
        $key = 'analyze-ticket:' . $request->user()->id;
        if (RateLimiter::tooManyAttempts($key, 10)) {
            $seconds = RateLimiter::availableIn($key);

            return response()->json([
                'error' => 'Too many requests. Please try again in ' . ceil($seconds / 60) . ' minutes.',
            ], 429);
        }

        RateLimiter::hit($key, 3600); // 1 hour

        try {
            // Get website if provided
            $website = null;
            if (!empty($validated['website_id'])) {
                $website = Website::find($validated['website_id']);

                // Verify user has access to this website through customer
                $customer = $request->user()->customers()->find($validated['customer_id']);
                if (!$customer || $website->customer_id !== $customer->id) {
                    return response()->json([
                        'error' => 'Unauthorized access to this website.',
                    ], 403);
                }
            }

            // Get organisation
            $customer = $request->user()->customers()->find($validated['customer_id']);
            if (!$customer) {
                return response()->json([
                    'error' => 'Customer not found.',
                ], 404);
            }

            $organisation = $customer->organisation;
            if (!$organisation) {
                return response()->json([
                    'error' => 'Organisation not found.',
                ], 404);
            }

            // Check if OpenAI and ticket quality assistant are enabled (single query)
            $settings = $organisation->settings()
                ->where('module', 'OpenAi')
                ->whereIn('key', ['status', 'ticket_quality_assistant_status', 'ticket_quality_good_threshold', 'ticket_quality_fair_threshold'])
                ->get()
                ->pluck('value', 'key');

            if (!isset($settings['status']) || $settings['status'] !== '1') {
                return response()->json([
                    'error' => 'AI ticket quality assistant is not enabled for your organisation.',
                ], 403);
            }

            if (isset($settings['ticket_quality_assistant_status']) && $settings['ticket_quality_assistant_status'] !== '1') {
                return response()->json([
                    'error' => 'AI ticket quality assistant is not enabled.',
                ], 403);
            }

            // Initialize services
            $openAiService = new OpenAiService($organisation, new PiiRedactionService());
            $ticketQualityService = new TicketQualityService($openAiService, new PiiRedactionService());

            // Analyze ticket
            $ticketData = [
                'title' => $validated['title'],
                'message' => $validated['message'],
                'priority' => $validated['priority'],
                'category' => $validated['category'] ?? 'general',
                'metadata' => $validated['metadata'] ?? [],
            ];

            $analysis = $ticketQualityService->analyzeTicket($ticketData, $website);

            // Store analysis
            $ticketQualityService->storeAnalysis(
                $analysis,
                $ticketData,
                null, // ticket_id - not created yet
                $validated['customer_id'],
                $validated['website_id'] ?? null
            );

            return response()->json([
                'success' => true,
                'analysis' => $analysis,
                'thresholds' => [
                    'good' => (int) ($settings['ticket_quality_good_threshold'] ?? 75),
                    'fair' => (int) ($settings['ticket_quality_fair_threshold'] ?? 60),
                ],
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'errors' => $e->errors(),
            ], 422);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        } catch (\Exception $e) {
            \Log::error('Ticket quality analysis failed', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id,
            ]);

            return response()->json([
                'error' => 'Failed to analyze ticket. Please try again later.',
            ], 500);
        }
    }

    /**
     * Analyze CSP violation and provide security assessment
     */
    public function analyzeCspViolation(Request $request): JsonResponse
    {
        // Validate request
        $validated = $request->validate([
            'customer_id' => 'required|uuid|exists:customers,id',
            'host' => 'required|string|max:255',
            'directive' => 'required|string|max:255',
            'blocked_urls' => 'required|array|min:1',
            'blocked_urls.*' => 'required|string',
        ]);

        // Rate limiting: 10 requests per minute per user
        $key = 'analyze-csp-violation:' . $request->user()->id;
        if (RateLimiter::tooManyAttempts($key, 10)) {
            $seconds = RateLimiter::availableIn($key);

            return response()->json([
                'error' => 'Too many requests. Please try again in ' . ceil($seconds / 60) . ' minutes.',
            ], 429);
        }

        RateLimiter::hit($key, 60); // 1 minute

        try {
            // Verify user has access to this customer
            $customer = $request->user()->customers()->find($validated['customer_id']);
            if (!$customer) {
                return response()->json([
                    'error' => 'Unauthorized access to this customer.',
                ], 403);
            }

            // Get organisation
            $organisation = $customer->organisation;
            if (!$organisation) {
                return response()->json([
                    'error' => 'Organisation not found.',
                ], 404);
            }

            // Check if OpenAI and CSP violation analysis are enabled
            $settings = $organisation->settings()
                ->where('module', 'OpenAi')
                ->whereIn('key', ['status', 'csp_violation_analysis_status'])
                ->get()
                ->pluck('value', 'key');

            if (!isset($settings['status']) || $settings['status'] !== '1') {
                return response()->json([
                    'error' => 'OpenAI integration is not enabled for your organisation.',
                ], 403);
            }

            if (isset($settings['csp_violation_analysis_status']) && $settings['csp_violation_analysis_status'] !== '1') {
                return response()->json([
                    'error' => 'CSP violation analysis is not enabled for your organisation.',
                ], 403);
            }

            // Initialize services
            $openAiService = new OpenAiService($organisation, new PiiRedactionService());
            $cspAnalysisService = new CspViolationAnalysisService($openAiService, new PiiRedactionService(), $organisation);

            // Analyze CSP violation
            $analysis = $cspAnalysisService->analyzeViolation(
                $validated['customer_id'],
                $validated['host'],
                $validated['directive'],
                $validated['blocked_urls']
            );

            // Store analysis
            $storedAnalysis = $cspAnalysisService->storeAnalysis(
                $validated['customer_id'],
                $validated['host'],
                $validated['directive'],
                $validated['blocked_urls'],
                $analysis
            );

            return response()->json([
                'success' => true,
                'analysis' => [
                    'id' => $storedAnalysis->id,
                    'trust_assessment' => $analysis['trust_assessment'],
                    'risk_level' => $analysis['risk_level'],
                    'findings' => $analysis['findings'],
                    'recommendations' => $analysis['recommendations'],
                    'tokens_used' => $analysis['tokens_used'],
                    'cost' => $analysis['cost'],
                    'model' => $analysis['model'],
                ],
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'errors' => $e->errors(),
            ], 422);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        } catch (\Exception $e) {
            \Log::error('CSP violation analysis failed', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id,
            ]);

            return response()->json([
                'error' => 'Failed to analyze CSP violation. Please try again later.',
            ], 500);
        }
    }
}
