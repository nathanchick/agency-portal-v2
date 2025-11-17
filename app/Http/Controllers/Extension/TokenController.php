<?php

namespace App\Http\Controllers\Extension;

use App\Http\Controllers\Controller;
use App\Models\ExtensionToken;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TokenController extends Controller
{
    /**
     * Show the extension token generation page
     */
    public function create(): Response
    {
        return Inertia::render('Extension/Token', [
            'existingTokens' => ExtensionToken::where('user_id', auth()->id())
                ->valid()
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(fn($token) => [
                    'id' => $token->id,
                    'name' => $token->name,
                    'created_at' => $token->created_at->toIso8601String(),
                    'last_used_at' => $token->last_used_at?->toIso8601String(),
                    'expires_at' => $token->expires_at->toIso8601String(),
                ]),
        ]);
    }

    /**
     * Generate a new extension token
     */
    public function generate(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
        ]);

        // Rate limiting: max 5 tokens per hour
        $recentTokens = ExtensionToken::where('user_id', $request->user()->id)
            ->where('created_at', '>', now()->subHour())
            ->count();

        if ($recentTokens >= 5) {
            return response()->json([
                'error' => 'Too many tokens generated. Please try again later.',
            ], 429);
        }

        $tokenData = ExtensionToken::generate(
            $request->user(),
            $request->input('name', 'Chrome Extension')
        );

        return response()->json([
            'success' => true,
            'token' => $tokenData['token'],
            'expires_at' => $tokenData['model']->expires_at->toIso8601String(),
            'message' => 'Extension token generated successfully. Copy it now - you won\'t be able to see it again.',
        ]);
    }

    /**
     * Validate an extension token (called by extension)
     */
    public function validate(Request $request): JsonResponse
    {
        $request->validate([
            'token' => ['required', 'string'],
        ]);

        $extensionToken = ExtensionToken::validateToken($request->input('token'));

        if (!$extensionToken) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid or expired token.',
            ], 401);
        }

        $extensionToken->load('user.currentOrganisation');

        return response()->json([
            'valid' => true,
            'user' => [
                'id' => $extensionToken->user->id,
                'name' => $extensionToken->user->name,
                'email' => $extensionToken->user->email,
                'organisation' => [
                    'id' => $extensionToken->user->currentOrganisation->id,
                    'name' => $extensionToken->user->currentOrganisation->name,
                ],
            ],
        ]);
    }

    /**
     * Revoke an extension token
     */
    public function revoke(Request $request, string $tokenId): JsonResponse
    {
        $token = ExtensionToken::where('id', $tokenId)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $token->delete();

        return response()->json([
            'success' => true,
            'message' => 'Token revoked successfully.',
        ]);
    }
}