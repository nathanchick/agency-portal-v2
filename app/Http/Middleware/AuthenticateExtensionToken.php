<?php

namespace App\Http\Middleware;

use App\Models\ExtensionToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateExtensionToken
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
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

        // Set the authenticated user from the token
        auth()->setUser($extensionToken->user);
        $request->setUserResolver(fn() => $extensionToken->user);

        return $next($request);
    }
}