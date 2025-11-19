<?php

namespace Modules\ClickUp\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Modules\ClickUp\Jobs\CreateClickUpTask;
use Modules\ClickUp\Models\ClickUpTask;
use Modules\Customer\Models\CustomerSetting;
use Modules\Ticket\Models\Ticket;

/**
 * ClickUpTaskController
 *
 * Handles creation and management of ClickUp tasks from tickets.
 */
class ClickUpTaskController extends Controller
{
    /**
     * Create a ClickUp task from a ticket.
     *
     * @param Request $request
     * @param Ticket $ticket
     * @return JsonResponse
     */
    public function store(Request $request, Ticket $ticket): JsonResponse
    {
        try {
            // Validate customer has ClickUp Space configured
            $spaceId = CustomerSetting::where('customer_id', $ticket->customer_id)
                ->where('module', 'ClickUp')
                ->where('key', 'clickup_space_id')
                ->value('value');

            if (! $spaceId) {
                return response()->json([
                    'error' => 'Customer does not have a ClickUp Space configured.',
                    'message' => 'Please assign a ClickUp Space to this customer in their settings.',
                ], 400);
            }

            // Check if task already exists for this ticket
            $existingTask = ClickUpTask::where('ticket_id', $ticket->id)->first();

            if ($existingTask) {
                return response()->json([
                    'error' => 'A ClickUp task already exists for this ticket.',
                    'task' => $existingTask,
                ], 409);
            }

            // Dispatch background job to create task
            CreateClickUpTask::dispatch($ticket, $request->input('list_id'));

            Log::info('ClickUp Task: Job dispatched', [
                'ticket_id' => $ticket->id,
            ]);

            return response()->json([
                'message' => 'ClickUp task is being created...',
                'status' => 'pending',
            ], 202);

        } catch (\Exception $e) {
            Log::error('ClickUp Task: Failed to dispatch job', [
                'ticket_id' => $ticket->id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'error' => 'Failed to create ClickUp task.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get ClickUp task for a ticket.
     *
     * @param Ticket $ticket
     * @return JsonResponse
     */
    public function show(Ticket $ticket): JsonResponse
    {
        $task = ClickUpTask::where('ticket_id', $ticket->id)->first();

        if (! $task) {
            return response()->json([
                'task' => null,
            ], 404);
        }

        return response()->json([
            'task' => $task,
        ]);
    }
}
