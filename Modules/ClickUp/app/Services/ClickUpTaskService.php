<?php

namespace Modules\ClickUp\Services;

use Illuminate\Support\Facades\Log;
use Modules\ClickUp\Models\ClickUpTask;
use Modules\Customer\Models\Customer;
use Modules\Customer\Models\CustomerSetting;
use Modules\Organisation\Models\Organisation;
use Modules\Ticket\Models\Ticket;

/**
 * ClickUpTaskService
 *
 * Handles creation and management of ClickUp tasks from portal tickets.
 */
class ClickUpTaskService
{
    /**
     * Create a new service instance.
     */
    public function __construct(
        private ClickUpApiService $apiService
    ) {
    }

    /**
     * Create a ClickUp task from a ticket.
     *
     * @param Ticket $ticket
     * @param string|null $listId Optional list ID. If not provided, will use default list for customer's space.
     * @return ClickUpTask|null
     */
    public function createTaskFromTicket(Ticket $ticket, ?string $listId = null): ?ClickUpTask
    {
        try {
            $organisation = $ticket->organisation;
            $customer = $ticket->customer;

            // Get list ID if not provided
            if (! $listId) {
                $listId = $this->getDefaultListId($customer);

                if (! $listId) {
                    Log::warning('ClickUp Task: No list ID found for customer', [
                        'ticket_id' => $ticket->id,
                        'customer_id' => $customer->id,
                    ]);

                    return null;
                }
            }

            // Prepare task data
            $taskData = [
                'name' => $this->formatTicketTitle($ticket),
                'description' => $this->formatTicketDescription($ticket),
                'priority' => $this->mapPriority($ticket->priority),
                'tags' => ['support', 'ticket'],
            ];

            // Add assigned user if available
            if ($ticket->assigned_to) {
                // Note: This would require mapping portal users to ClickUp users
                // For now, we'll skip assignee mapping
            }

            // Create task via API
            $response = $this->apiService->createTask($organisation, $listId, $taskData);

            // Store task in database
            $clickUpTask = ClickUpTask::create([
                'organisation_id' => $organisation->id,
                'ticket_id' => $ticket->id,
                'clickup_task_id' => $response['id'],
                'clickup_list_id' => $listId,
                'clickup_space_id' => $this->getSpaceIdForList($customer, $listId),
                'name' => $response['name'],
                'description' => $response['description'] ?? null,
                'status' => $response['status']['status'] ?? null,
                'priority' => $response['priority']['id'] ?? null,
                'url' => $response['url'] ?? "https://app.clickup.com/t/{$response['id']}",
            ]);

            // Update ticket metadata with ClickUp task info
            $this->linkTaskToTicket($ticket, $clickUpTask);

            Log::info('ClickUp Task: Created successfully', [
                'ticket_id' => $ticket->id,
                'task_id' => $clickUpTask->clickup_task_id,
                'url' => $clickUpTask->url,
            ]);

            return $clickUpTask;

        } catch (\Exception $e) {
            Log::error('ClickUp Task: Failed to create task', [
                'ticket_id' => $ticket->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Format ticket title with required prefix.
     * Format: [TICKET-{uuid}] {title}
     *
     * @param Ticket $ticket
     * @return string
     */
    private function formatTicketTitle(Ticket $ticket): string
    {
        return "[TICKET-{$ticket->uuid}] {$ticket->title}";
    }

    /**
     * Format ticket description for ClickUp.
     *
     * @param Ticket $ticket
     * @return string
     */
    private function formatTicketDescription(Ticket $ticket): string
    {
        $description = $ticket->message;

        // Add ticket metadata
        $metadata = "\n\n---\n\n";
        $metadata .= "**Ticket Information:**\n";
        $metadata .= "- Ticket ID: {$ticket->uuid}\n";
        $metadata .= "- Customer: {$ticket->customer->name}\n";
        $metadata .= "- Status: {$ticket->status}\n";
        $metadata .= "- Priority: {$ticket->priority}\n";

        if ($ticket->assigned_to) {
            $assignedUser = $ticket->assignedUser;
            $metadata .= "- Assigned To: {$assignedUser->name}\n";
        }

        $metadata .= "- Portal URL: ".route('tickets.show', $ticket->id)."\n";

        return $description.$metadata;
    }

    /**
     * Map ticket priority to ClickUp priority.
     * ClickUp: 1=urgent, 2=high, 3=normal, 4=low
     *
     * @param string $ticketPriority
     * @return int
     */
    private function mapPriority(string $ticketPriority): int
    {
        return match (strtolower($ticketPriority)) {
            'urgent' => 1,
            'high' => 2,
            'medium', 'normal' => 3,
            'low' => 4,
            default => 3, // Default to normal
        };
    }

    /**
     * Get the default list ID for a customer's ClickUp space.
     *
     * @param Customer $customer
     * @return string|null
     */
    private function getDefaultListId(Customer $customer): ?string
    {
        // Get customer's ClickUp Space ID from settings
        $spaceId = CustomerSetting::where('customer_id', $customer->id)
            ->where('module', 'ClickUp')
            ->where('key', 'clickup_space_id')
            ->value('value');

        if (! $spaceId) {
            return null;
        }

        // Try to get a cached list ID for this space
        $cacheKey = "clickup.space.{$spaceId}.default_list";

        return \Cache::remember($cacheKey, 3600, function () use ($customer, $spaceId) {
            try {
                $organisation = $customer->organisation;

                // First, try to get folderless lists
                $folderlessLists = $this->apiService->getFolderlessLists($organisation, $spaceId);

                if (! empty($folderlessLists)) {
                    return $folderlessLists[0]['id'];
                }

                // If no folderless lists, get first folder's first list
                $folders = $this->apiService->getFolders($organisation, $spaceId);

                if (! empty($folders)) {
                    $lists = $this->apiService->getLists($organisation, $folders[0]['id']);

                    if (! empty($lists)) {
                        return $lists[0]['id'];
                    }
                }

                return null;

            } catch (\Exception $e) {
                Log::warning('ClickUp Task: Failed to get default list ID', [
                    'customer_id' => $customer->id,
                    'space_id' => $spaceId,
                    'error' => $e->getMessage(),
                ]);

                return null;
            }
        });
    }

    /**
     * Get space ID for a list (from customer settings).
     *
     * @param Customer $customer
     * @param string $listId
     * @return string|null
     */
    private function getSpaceIdForList(Customer $customer, string $listId): ?string
    {
        return CustomerSetting::where('customer_id', $customer->id)
            ->where('module', 'ClickUp')
            ->where('key', 'clickup_space_id')
            ->value('value');
    }

    /**
     * Link a ClickUp task to a ticket by updating ticket metadata.
     *
     * @param Ticket $ticket
     * @param ClickUpTask $task
     */
    private function linkTaskToTicket(Ticket $ticket, ClickUpTask $task): void
    {
        $metadata = $ticket->metadata ?? [];
        $metadata['clickup_task_id'] = $task->clickup_task_id;
        $metadata['clickup_task_url'] = $task->url;

        $ticket->update(['metadata' => $metadata]);
    }

    /**
     * Sync task metadata from ClickUp API.
     *
     * @param ClickUpTask $task
     * @return ClickUpTask
     */
    public function syncTaskMetadata(ClickUpTask $task): ClickUpTask
    {
        try {
            $organisation = $task->organisation;
            $response = $this->apiService->getTask($organisation, $task->clickup_task_id);

            $task->update([
                'name' => $response['name'],
                'description' => $response['description'] ?? null,
                'status' => $response['status']['status'] ?? null,
                'priority' => $response['priority']['id'] ?? null,
                'url' => $response['url'] ?? $task->url,
            ]);

            Log::debug('ClickUp Task: Metadata synced', [
                'task_id' => $task->clickup_task_id,
            ]);

            return $task;

        } catch (\Exception $e) {
            Log::warning('ClickUp Task: Failed to sync metadata', [
                'task_id' => $task->clickup_task_id,
                'error' => $e->getMessage(),
            ]);

            return $task;
        }
    }
}
