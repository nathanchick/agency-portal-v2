<?php

namespace App\Http\Middleware;

use App\Models\ExtensionToken;
use Closure;
use Illuminate\Http\Request;
use Modules\Organisation\Models\Organisation;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateExtensionTokenWithOrganisation
{
    /**
     * Handle an incoming request.
     *
     * Authenticates extension token and validates organisation access.
     * Sets the organisation in multitenancy context.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Validate bearer token
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'message' => 'Unauthorized. Extension token required.',
            ], 401);
        }

        $extensionToken = ExtensionToken::validateToken($token);

        if (!$extensionToken) {
            return response()->json([
                'message' => 'Invalid or expired extension token.',
            ], 401);
        }

        // 2. Get requested organisation from header (fallback to token's organisation)
        $requestedOrgId = $request->header('X-Organisation-Id')
            ?? $extensionToken->organisation_id;

        if (!$requestedOrgId) {
            return response()->json([
                'message' => 'Organisation ID required. Please specify X-Organisation-Id header.',
            ], 400);
        }

        // 3. Validate user has DIRECT access to requested organisation
        $user = $extensionToken->user;

        $hasAccess = $user->organisations()
            ->where('organisations.id', $requestedOrgId)
            ->exists();

        if (!$hasAccess) {
            return response()->json([
                'message' => 'You do not have access to this organisation.',
            ], 403);
        }

        // 4. Load organisation and set in container (for compatibility with existing code)
        $organisation = Organisation::find($requestedOrgId);

        if (!$organisation) {
            return response()->json([
                'message' => 'Organisation not found.',
            ], 404);
        }

        // Set current organisation in the container (used by Organisation::current())
        app()->forgetInstance('currentTenant');
        app()->instance('currentTenant', $organisation);

        // 5. Set authenticated user
        auth()->setUser($user);
        $request->setUserResolver(fn () => $user);

        // 6. Add organisation to request for easy access in controllers
        $request->merge(['_current_organisation_id' => $requestedOrgId]);

        return $next($request);
    }
}
