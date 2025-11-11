<?php

namespace Modules\PostMark\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class VerifyPostMarkWebhook
{
    /**
     * Handle an incoming request.
     *
     * PostMark doesn't provide signature validation for inbound webhooks by default.
     * This middleware performs basic validation checks:
     * 1. Validates the request structure matches PostMark's format
     * 2. Can optionally validate source IP (PostMark IPs)
     * 3. Can optionally require a secret token in query params or headers
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Skip validation in local environment if configured
        if (config('postmark.skip_webhook_validation', false)) {
            return $next($request);
        }

        // Validate basic PostMark webhook structure
        if (! $this->isValidPostMarkWebhook($request)) {
            Log::warning('Invalid PostMark webhook structure', [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json(['error' => 'Invalid webhook'], 403);
        }

        // Optional: Verify webhook token if configured
        $webhookToken = config('postmark.inbound_webhook_token');
        if ($webhookToken) {
            $providedToken = $request->header('X-PostMark-Token') ?? $request->query('token');

            if ($providedToken !== $webhookToken) {
                Log::warning('PostMark webhook token mismatch', [
                    'ip' => $request->ip(),
                ]);

                return response()->json(['error' => 'Unauthorized'], 403);
            }
        }

        // Optional: Verify source IP is from PostMark
        if (config('postmark.verify_webhook_ip', false)) {
            if (! $this->isPostMarkIP($request->ip())) {
                Log::warning('PostMark webhook from invalid IP', [
                    'ip' => $request->ip(),
                ]);

                return response()->json(['error' => 'Unauthorized'], 403);
            }
        }

        return $next($request);
    }

    /**
     * Validate that the request has the expected PostMark webhook structure
     */
    private function isValidPostMarkWebhook(Request $request): bool
    {
        // Check for required PostMark fields
        return $request->has('MessageID') &&
               $request->has('FromFull') &&
               $request->has('ToFull');
    }

    /**
     * Check if the IP is from PostMark's known IP ranges
     * PostMark's documented IPs: https://postmarkapp.com/support/article/800-ips-for-firewalls
     */
    private function isPostMarkIP(string $ip): bool
    {
        $postmarkIPs = [
            '3.134.147.250',
            '50.31.156.6',
            '50.31.156.77',
            '18.217.206.57',
        ];

        return in_array($ip, $postmarkIPs);
    }
}
