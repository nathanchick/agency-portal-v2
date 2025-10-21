<?php

namespace Modules\Ticket\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Ticket\Models\Ticket;

class TicketController extends Controller
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
     * Display a listing of tickets
     */
    public function index(Request $request, string $organisation)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('read:tickets')) {
            return response()->json([
                'message' => 'This token does not have permission to read tickets.',
            ], 403);
        }

        $tickets = Ticket::where('organisation_id', $organisation)
            ->with(['user', 'assignedTo'])
            ->paginate(15);

        return response()->json($tickets);
    }

    /**
     * Store a newly created ticket
     */
    public function store(Request $request, string $organisation)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('write:tickets')) {
            return response()->json([
                'message' => 'This token does not have permission to create tickets.',
            ], 403);
        }

        $validated = $request->validate([
            'user_id' => 'required|uuid|exists:users,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'priority' => 'nullable|string|in:low,normal,high,critical',
            'status' => 'nullable|string|in:open,in_progress,resolved,closed',
            'is_resolved' => 'nullable|boolean',
            'is_locked' => 'nullable|boolean',
            'assigned_to' => 'nullable|uuid|exists:users,id',
        ]);

        $ticket = Ticket::create([
            ...$validated,
            'organisation_id' => $organisation,
        ]);

        return response()->json($ticket->load(['user', 'assignedTo']), 201);
    }

    /**
     * Display the specified ticket
     */
    public function show(Request $request, string $organisation, string $ticket)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('read:tickets')) {
            return response()->json([
                'message' => 'This token does not have permission to read tickets.',
            ], 403);
        }

        $ticket = Ticket::where('organisation_id', $organisation)
            ->with(['user', 'assignedTo', 'messages'])
            ->findOrFail($ticket);

        return response()->json($ticket);
    }

    /**
     * Update the specified ticket
     */
    public function update(Request $request, string $organisation, string $ticket)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('write:tickets')) {
            return response()->json([
                'message' => 'This token does not have permission to update tickets.',
            ], 403);
        }

        $ticketModel = Ticket::where('organisation_id', $organisation)
            ->findOrFail($ticket);

        $validated = $request->validate([
            'user_id' => 'sometimes|required|uuid|exists:users,id',
            'title' => 'sometimes|required|string|max:255',
            'message' => 'sometimes|required|string',
            'priority' => 'nullable|string|in:low,normal,high,critical',
            'status' => 'nullable|string|in:open,in_progress,resolved,closed',
            'is_resolved' => 'nullable|boolean',
            'is_locked' => 'nullable|boolean',
            'assigned_to' => 'nullable|uuid|exists:users,id',
        ]);

        $ticketModel->update($validated);

        return response()->json($ticketModel->load(['user', 'assignedTo']));
    }

    /**
     * Remove the specified ticket
     */
    public function destroy(Request $request, string $organisation, string $ticket)
    {
        $this->validateOrganisation($request, $organisation);

        $apiToken = $request->input('api_token');

        if (! $apiToken->can('delete:tickets')) {
            return response()->json([
                'message' => 'This token does not have permission to delete tickets.',
            ], 403);
        }

        $ticketModel = Ticket::where('organisation_id', $organisation)
            ->findOrFail($ticket);

        $ticketModel->delete();

        return response()->json(null, 204);
    }
}
