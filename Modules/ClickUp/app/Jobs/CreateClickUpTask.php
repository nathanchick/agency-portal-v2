<?php

namespace Modules\ClickUp\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Modules\ClickUp\Services\ClickUpTaskService;
use Modules\Ticket\Models\Ticket;

class CreateClickUpTask implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     * Uses exponential backoff: 60s, 120s, 240s
     *
     * @var array
     */
    public $backoff = [60, 120, 240];

    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 120;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Ticket $ticket,
        public ?string $listId = null
    ) {
        $this->onQueue('clickup');
    }

    /**
     * Execute the job.
     */
    public function handle(ClickUpTaskService $taskService): void
    {
        try {
            Log::info('ClickUp Task Job: Starting task creation', [
                'ticket_id' => $this->ticket->id,
                'list_id' => $this->listId,
            ]);

            $task = $taskService->createTaskFromTicket($this->ticket, $this->listId);

            if ($task) {
                Log::info('ClickUp Task Job: Task created successfully', [
                    'ticket_id' => $this->ticket->id,
                    'clickup_task_id' => $task->clickup_task_id,
                    'url' => $task->url,
                ]);
            } else {
                Log::warning('ClickUp Task Job: Task creation returned null', [
                    'ticket_id' => $this->ticket->id,
                ]);
            }

        } catch (\Exception $e) {
            Log::error('ClickUp Task Job: Failed', [
                'ticket_id' => $this->ticket->id,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('ClickUp Task Job: Failed permanently', [
            'ticket_id' => $this->ticket->id,
            'error' => $exception->getMessage(),
        ]);
    }
}
