<?php

namespace Modules\Deployment\Http\Controllers\Api\Widget;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Deployment\Models\DeploymentHistory;

/**
 * Deployment Widget API Controller
 *
 * Provides data endpoints for dashboard widgets related to deployments.
 * These endpoints are designed to be lightweight and return minimal data
 * optimized for widget display.
 */
class DeploymentWidgetController extends Controller
{
    /**
     * Get recent deployments for customer users
     *
     * Returns a list of recent deployments for the current customer.
     * The results are filtered by the customer's ID.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function recentCustomerDeployments(Request $request): JsonResponse
    {
        // Validate request parameters
        $validated = $request->validate([
            'limit' => ['sometimes', 'integer', 'min:1', 'max:10'],
        ]);

        $limit = $validated['limit'] ?? 3;

        // Get authenticated user
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'error' => 'Unauthenticated',
                'deployments' => [],
            ], 401);
        }

        // Get customer for current user
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            return response()->json([
                'error' => 'No customer associated with user',
                'deployments' => [],
            ], 400);
        }

        // Build query
        $deployments = DeploymentHistory::query()
            ->with(['deployment.website:id,name,domain'])
            ->whereHas('deployment', function ($q) use ($customer) {
                $q->where('customer_id', $customer->id);
            })
            ->select([
                'id',
                'deployment_id',
                'git_tag',
                'git_commit_sha',
                'git_branch',
                'status',
                'deployed_at',
                'created_at',
            ])
            ->orderBy('deployed_at', 'desc')
            ->limit($limit)
            ->get();

        // Transform data for widget consumption
        $deploymentData = $deployments->map(function ($deployment) {
            return [
                'id' => $deployment->id,
                'website' => $deployment->deployment->website ? [
                    'id' => $deployment->deployment->website->id,
                    'name' => $deployment->deployment->website->name,
                    'domain' => $deployment->deployment->website->domain,
                ] : null,
                'git_tag' => $deployment->git_tag,
                'git_commit_sha' => $deployment->git_commit_sha ? substr($deployment->git_commit_sha, 0, 8) : null,
                'git_branch' => $deployment->git_branch,
                'status' => $deployment->status,
                'deployed_at' => $deployment->deployed_at?->toIso8601String(),
                'created_at' => $deployment->created_at->toIso8601String(),
            ];
        });

        return response()->json([
            'deployments' => $deploymentData,
        ]);
    }
}