<?php

namespace Modules\Deployment\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Deployment\Models\Deployment;
use Modules\Deployment\Models\DeploymentHistory;

class DeploymentWebhookController extends Controller
{
    /**
     * Handle incoming deployment webhook
     */
    public function webhook(Request $request, string $token)
    {
        // Find the webhook configuration by token
        $deployment = Deployment::where('webhook_token', $token)->first();

        if (! $deployment) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid webhook token',
            ], 404);
        }

        // Extract deployment data from request
        $gitTag = $request->input('git_tag', $request->input('tag', $request->input('ref_name')));
        $gitCommitSha = $request->input('git_commit_sha', $request->input('commit_sha', $request->input('sha')));
        $gitBranch = $request->input('git_branch', $request->input('branch'));
        $status = $request->input('status', 'pending'); // Default to pending

        // Normalize status
        if (! in_array($status, ['success', 'failed', 'pending'])) {
            $status = 'pending';
        }

        // Try to find an existing deployment history with matching data (excluding status)
        $existingHistory = DeploymentHistory::where('deployment_id', $deployment->id)
            ->where('git_tag', $gitTag)
            ->where('git_commit_sha', $gitCommitSha)
            ->where('git_branch', $gitBranch)
            ->first();

        if ($existingHistory) {
            // Update the existing deployment history (primarily to update status)
            $existingHistory->update([
                'status' => $status,
                'payload' => $request->all(),
                'deployed_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Deployment updated successfully',
                'deployment_history_id' => $existingHistory->id,
                'action' => 'updated',
            ], 200);
        }

        // Create a new deployment history record
        $history = DeploymentHistory::create([
            'deployment_id' => $deployment->id,
            'git_tag' => $gitTag,
            'git_commit_sha' => $gitCommitSha,
            'git_branch' => $gitBranch,
            'status' => $status,
            'payload' => $request->all(),
            'deployed_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Deployment recorded successfully',
            'deployment_history_id' => $history->id,
            'action' => 'created',
        ], 201);
    }
}
