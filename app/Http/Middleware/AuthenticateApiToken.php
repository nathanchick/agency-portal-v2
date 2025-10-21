<?php

namespace App\Http\Middleware;

use Modules\Organisation\Models\ApiToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateApiToken
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token) {
            return response()->json([
                'message' => 'Unauthenticated. Please provide a valid API token.',
            ], 401);
        }

        // Hash the token to compare with database
        $hashedToken = hash('sha256', $token);

        // Find the API token
        $apiToken = ApiToken::where('token', $hashedToken)->first();

        if (! $apiToken) {
            return response()->json([
                'message' => 'Invalid API token.',
            ], 401);
        }

        // Check if token is expired
        if ($apiToken->expires_at && $apiToken->expires_at->isPast()) {
            return response()->json([
                'message' => 'API token has expired.',
            ], 401);
        }

        // Mark token as used
        $apiToken->markAsUsed();

        // Attach token and organisation to the request
        $request->merge([
            'api_token' => $apiToken,
            'organisation_id' => $apiToken->organisation_id,
        ]);

        return $next($request);
    }
}
