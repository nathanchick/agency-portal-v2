<?php

namespace Modules\Document\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Document\Models\DocumentRequest;

class DocumentRequestController extends Controller
{
    /**
     * Validate that the API token belongs to the requested organisation
     */
    protected function validateOrganisation(Request $request, string $organisationId)
    {
        $apiToken = $request->input('api_token');

        if ($apiToken->organisation_id !== $organisationId) {
            abort(403, 'This API token does not have access to the requested organisation.');
        }
    }

    /**
     * Display a listing of document requests
     */
    public function index(Request $request, string $organisation)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('read:document-requests')) {
            return response()->json([
                'message' => 'This token does not have permission to read document requests.',
            ], 403);
        }

        $documentRequests = DocumentRequest::where('organisation_id', $organisation)
            ->with(['customer', 'document', 'user'])
            ->paginate(15);

        return response()->json($documentRequests);
    }

    /**
     * Store a newly created document request
     */
    public function store(Request $request, string $organisation)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('write:document-requests')) {
            return response()->json([
                'message' => 'This token does not have permission to create document requests.',
            ], 403);
        }

        $validated = $request->validate([
            'customer_id' => 'required|uuid|exists:customers,id',
            'user_id' => 'required|uuid|exists:users,id',
            'document_id' => 'required|uuid|exists:documents,id',
            'cc_email' => 'nullable|email',
            'cc_name' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'notes' => 'nullable|string',
            'uploaded_file' => 'nullable|string',
            'requires_approval' => 'nullable|boolean',
            'scheduled_send_at' => 'nullable|date',
            'status' => 'nullable|string|in:pending,sent,approved,declined,completed',
        ]);

        $documentRequest = DocumentRequest::create([
            ...$validated,
            'organisation_id' => $organisation,
        ]);

        return response()->json($documentRequest->load(['customer', 'document', 'user']), 201);
    }

    /**
     * Display the specified document request
     */
    public function show(Request $request, string $organisation, string $documentRequest)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('read:document-requests')) {
            return response()->json([
                'message' => 'This token does not have permission to read document requests.',
            ], 403);
        }

        $documentRequest = DocumentRequest::where('organisation_id', $organisation)
            ->with(['customer', 'document', 'user', 'history'])
            ->findOrFail($documentRequest);

        return response()->json($documentRequest);
    }

    /**
     * Update the specified document request
     */
    public function update(Request $request, string $organisation, string $documentRequest)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('write:document-requests')) {
            return response()->json([
                'message' => 'This token does not have permission to update document requests.',
            ], 403);
        }

        $documentRequestModel = DocumentRequest::where('organisation_id', $organisation)
            ->findOrFail($documentRequest);

        $validated = $request->validate([
            'customer_id' => 'sometimes|required|uuid|exists:customers,id',
            'user_id' => 'sometimes|required|uuid|exists:users,id',
            'document_id' => 'sometimes|required|uuid|exists:documents,id',
            'cc_email' => 'nullable|email',
            'cc_name' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'notes' => 'nullable|string',
            'uploaded_file' => 'nullable|string',
            'requires_approval' => 'nullable|boolean',
            'scheduled_send_at' => 'nullable|date',
            'status' => 'nullable|string|in:pending,sent,approved,declined,completed',
        ]);

        $documentRequestModel->update($validated);

        return response()->json($documentRequestModel->load(['customer', 'document', 'user']));
    }

    /**
     * Remove the specified document request
     */
    public function destroy(Request $request, string $organisation, string $documentRequest)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('delete:document-requests')) {
            return response()->json([
                'message' => 'This token does not have permission to delete document requests.',
            ], 403);
        }

        $documentRequestModel = DocumentRequest::where('organisation_id', $organisation)
            ->findOrFail($documentRequest);

        $documentRequestModel->delete();

        return response()->json(null, 204);
    }
}
