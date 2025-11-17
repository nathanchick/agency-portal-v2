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
        $user = auth()->user();

        // Get user's organisations
        $organisations = $user->organisations()->get()->map(fn($org) => [
            'id' => $org->id,
            'name' => $org->name,
        ]);

        return Inertia::render('Extension/Token', [
            'organisations' => $organisations,
            'existingTokens' => ExtensionToken::where('user_id', $user->id)
                ->with('organisation')
                ->valid()
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(fn($token) => [
                    'id' => $token->id,
                    'name' => $token->name,
                    'organisation' => $token->organisation ? [
                        'id' => $token->organisation->id,
                        'name' => $token->organisation->name,
                    ] : null,
                    'created_at' => $token->created_at->toIso8601String(),
                    'last_used_at' => $token->last_used_at?->toIso8601String(),
                    'expires_at' => $token->expires_at->toIso8601String(),
                ]),
        ]);
    }

    /**
     * Generate a new extension token
     */
    public function generate(Request $request)
    {
        $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'organisation_id' => ['required', 'uuid', 'exists:organisations,id'],
        ]);

        $user = $request->user();

        // Verify user has access to this organisation
        if (!$user->organisations()->where('organisations.id', $request->organisation_id)->exists()) {
            return back()->withErrors([
                'organisation_id' => 'You do not have access to this organisation.',
            ]);
        }

        // Rate limiting: max 5 tokens per hour
        $recentTokens = ExtensionToken::where('user_id', $user->id)
            ->where('created_at', '>', now()->subHour())
            ->count();

        if ($recentTokens >= 5) {
            return back()->withErrors([
                'generate' => 'Too many tokens generated. Please try again later.',
            ]);
        }

        $tokenData = ExtensionToken::generate(
            $user,
            $request->organisation_id,
            $request->input('name', 'Chrome Extension')
        );

        return back()->with('tokenData', [
            'token' => $tokenData['token'],
            'expires_at' => $tokenData['model']->expires_at->toIso8601String(),
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

        $extensionToken->load(['user', 'organisation']);

        if (!$extensionToken->organisation) {
            return response()->json([
                'valid' => false,
                'message' => 'Token has no associated organisation.',
            ], 401);
        }

        return response()->json([
            'valid' => true,
            'user' => [
                'id' => $extensionToken->user->id,
                'name' => $extensionToken->user->name,
                'email' => $extensionToken->user->email,
                'organisation' => [
                    'id' => $extensionToken->organisation->id,
                    'name' => $extensionToken->organisation->name,
                ],
            ],
        ]);
    }

    /**
     * Revoke an extension token
     */
    public function revoke(Request $request, string $tokenId)
    {
        $token = ExtensionToken::where('id', $tokenId)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $token->delete();

        return back()->with('message', 'Token revoked successfully.');
    }
}