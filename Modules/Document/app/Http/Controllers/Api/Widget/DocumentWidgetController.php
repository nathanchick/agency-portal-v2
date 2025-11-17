<?php

namespace Modules\Document\Http\Controllers\Api\Widget;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Document\Models\DocumentHistory;
use Modules\Document\Models\DocumentRequest;

/**
 * Document Widget API Controller
 *
 * Provides data endpoints for dashboard widgets related to documents.
 */
class DocumentWidgetController extends Controller
{
    /**
     * Get documents created by the current user
     * For organisation dashboard
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function created(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'limit' => ['sometimes', 'integer', 'min:5', 'max:50'],
            'status' => ['sometimes', 'string', 'in:all,pending,completed,void'],
        ]);

        $limit = $validated['limit'] ?? 10;
        $statusFilter = $validated['status'] ?? 'all';

        $organisationId = session('current_organisation_id');
        $userId = auth()->id();

        if (!$organisationId || !$userId) {
            return response()->json([
                'error' => 'No organisation or user context',
                'documents' => [],
                'stats' => [
                    'total_pending' => 0,
                    'total_completed' => 0,
                ],
            ], 400);
        }

        // Get document request IDs where this user "sent" them
        $createdDocumentIds = DocumentHistory::where('user_id', $userId)
            ->whereIn('action', ['sent', 'resent'])
            ->pluck('document_request_id')
            ->unique();

        // Base query for documents
        $baseQuery = DocumentRequest::query()
            ->whereIn('id', $createdDocumentIds)
            ->where('organisation_id', $organisationId);

        // Calculate statistics
        $stats = [
            'total_pending' => (clone $baseQuery)->whereIn('status', ['not_sent', 'processing'])->count(),
            'total_completed' => (clone $baseQuery)->where('status', 'completed')->count(),
        ];

        // Apply status filter for list
        $query = (clone $baseQuery)
            ->with(['customer:id,name', 'user:id,name', 'document:id,name'])
            ->select([
                'id',
                'customer_id',
                'user_id',
                'document_id',
                'status',
                'created_at',
                'updated_at',
            ])
            ->orderBy('created_at', 'desc');

        if ($statusFilter === 'pending') {
            $query->whereIn('status', ['not_sent', 'processing']);
        } elseif ($statusFilter === 'completed') {
            $query->where('status', 'completed');
        } elseif ($statusFilter === 'void') {
            $query->where('status', 'void');
        }

        $documents = $query->limit($limit)->get();

        $documentData = $documents->map(function ($doc) {
            return [
                'id' => $doc->id,
                'document_name' => $doc->document?->name ?? 'Uploaded PDF',
                'status' => $doc->status,
                'customer' => $doc->customer ? [
                    'id' => $doc->customer->id,
                    'name' => $doc->customer->name,
                ] : null,
                'assignee' => $doc->user ? [
                    'id' => $doc->user->id,
                    'name' => $doc->user->name,
                ] : null,
                'created_at' => $doc->created_at->toIso8601String(),
                'updated_at' => $doc->updated_at->toIso8601String(),
            ];
        });

        return response()->json([
            'documents' => $documentData,
            'stats' => $stats,
        ]);
    }

    /**
     * Get documents assigned to the current user
     * For customer dashboard
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function assigned(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'limit' => ['sometimes', 'integer', 'min:5', 'max:20'],
            'status' => ['sometimes', 'string', 'in:all,pending,completed'],
            'show_team_documents' => ['sometimes', 'boolean'],
        ]);

        $limit = $validated['limit'] ?? 5;
        $statusFilter = $validated['status'] ?? 'pending';
        $showTeamDocuments = $validated['show_team_documents'] ?? false;

        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'error' => 'No user context',
                'documents' => [],
                'stats' => [
                    'total_pending' => 0,
                    'total_completed' => 0,
                ],
            ], 400);
        }

        // Base query
        $baseQuery = DocumentRequest::query();

        // Check if user wants to see team documents and has permission
        if ($showTeamDocuments && $user->hasAnyRole(['Admin', 'Manager'])) {
            // Get all customers the user belongs to
            $customerIds = $user->customers()->pluck('customers.id');
            $baseQuery->whereIn('customer_id', $customerIds);
        } else {
            // Only documents assigned to this user
            $baseQuery->where('user_id', $user->id);
        }

        // Calculate statistics
        $stats = [
            'total_pending' => (clone $baseQuery)->whereIn('status', ['not_sent', 'processing'])->count(),
            'total_completed' => (clone $baseQuery)->where('status', 'completed')->count(),
        ];

        // Apply status filter for list
        $query = (clone $baseQuery)
            ->with(['customer:id,name', 'document:id,name'])
            ->select([
                'id',
                'customer_id',
                'user_id',
                'document_id',
                'status',
                'created_at',
                'updated_at',
            ])
            ->orderBy('created_at', 'desc');

        if ($statusFilter === 'pending') {
            $query->whereIn('status', ['not_sent', 'processing']);
        } elseif ($statusFilter === 'completed') {
            $query->where('status', 'completed');
        }

        $documents = $query->limit($limit)->get();

        $documentData = $documents->map(function ($doc) use ($user) {
            return [
                'id' => $doc->id,
                'document_name' => $doc->document?->name ?? 'Document',
                'status' => $doc->status,
                'customer' => $doc->customer ? [
                    'id' => $doc->customer->id,
                    'name' => $doc->customer->name,
                ] : null,
                'is_assigned_to_me' => $doc->user_id === $user->id,
                'created_at' => $doc->created_at->toIso8601String(),
                'updated_at' => $doc->updated_at->toIso8601String(),
            ];
        });

        return response()->json([
            'documents' => $documentData,
            'stats' => $stats,
        ]);
    }
}
