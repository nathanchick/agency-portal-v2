<?php

namespace Modules\Ticket\Listeners;

use Modules\Ticket\Events\TicketCreated;
use Modules\Ticket\Events\TicketUpdated;
use Modules\Ticket\Models\AutomationRule;
use Illuminate\Support\Facades\Log;

class ProcessAutomationRules
{
    /**
     * Handle the event.
     */
    public function handle(TicketCreated|TicketUpdated $event): void
    {
        $ticket = $event->ticket;

        Log::info('ProcessAutomationRules: Event fired', [
            'event' => get_class($event),
            'ticket_id' => $ticket->id,
            'organisation_id' => $ticket->organisation_id,
        ]);

        // Determine the trigger based on the event type
        $trigger = match (get_class($event)) {
            TicketCreated::class => 'ticket_created',
            TicketUpdated::class => 'ticket_updated',
            default => null,
        };

        if (!$trigger) {
            Log::warning('ProcessAutomationRules: Unknown trigger', ['event' => get_class($event)]);
            return;
        }

        // Get all active automation rules for this organisation and trigger
        $rules = AutomationRule::query()
            ->forOrganisation($ticket->organisation_id)
            ->forTrigger($trigger)
            ->active()
            ->get();

        Log::info('ProcessAutomationRules: Found rules', [
            'trigger' => $trigger,
            'count' => $rules->count(),
            'rule_ids' => $rules->pluck('id')->toArray(),
        ]);

        // Process each rule in priority order (already ordered by scope)
        foreach ($rules as $rule) {
            Log::info('ProcessAutomationRules: Checking rule', [
                'rule_id' => $rule->id,
                'rule_name' => $rule->name,
            ]);

            if ($rule->matchesTicket($ticket)) {
                Log::info('ProcessAutomationRules: Rule matched, executing actions', [
                    'rule_id' => $rule->id,
                    'actions_count' => count($rule->actions),
                ]);

                $rule->executeActions($ticket);

                // Stop processing further rules if configured
                if ($rule->stop_processing) {
                    Log::info('ProcessAutomationRules: Stop processing flag set', [
                        'rule_id' => $rule->id,
                    ]);
                    break;
                }
            } else {
                Log::info('ProcessAutomationRules: Rule did not match', [
                    'rule_id' => $rule->id,
                ]);
            }
        }

        Log::info('ProcessAutomationRules: Completed');
    }
}