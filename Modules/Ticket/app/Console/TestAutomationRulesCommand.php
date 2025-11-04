<?php

namespace Modules\Ticket\Console;

use Illuminate\Console\Command;
use Modules\Ticket\Models\Ticket;
use Modules\Ticket\Models\AutomationRule;
use Modules\Ticket\Events\TicketCreated;
use Modules\Ticket\Events\TicketUpdated;

class TestAutomationRulesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ticket:test-automation
                            {ticket_id : The ID of the ticket to test}
                            {trigger : The trigger type (created or updated)}
                            {--dry-run : Show what would happen without executing actions}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test automation rules against a specific ticket';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $ticketId = $this->argument('ticket_id');
        $trigger = $this->argument('trigger');
        $dryRun = $this->option('dry-run');

        // Validate trigger
        if (!in_array($trigger, ['created', 'updated'])) {
            $this->error('Trigger must be either "created" or "updated"');
            return 1;
        }

        // Load the ticket
        $ticket = Ticket::find($ticketId);
        if (!$ticket) {
            $this->error("Ticket not found: {$ticketId}");
            return 1;
        }

        $this->info("Testing automation rules for Ticket #{$ticket->id}");
        $this->info("Organisation: {$ticket->organisation_id}");
        $this->info("Trigger: {$trigger}");
        $this->info("Dry run: " . ($dryRun ? 'Yes' : 'No'));
        $this->newLine();

        // Get the trigger type
        $triggerType = $trigger === 'created' ? 'ticket_created' : 'ticket_updated';

        // Get all active automation rules for this organisation and trigger
        $rules = AutomationRule::query()
            ->forOrganisation($ticket->organisation_id)
            ->forTrigger($triggerType)
            ->active()
            ->get();

        if ($rules->isEmpty()) {
            $this->warn("No active automation rules found for trigger: {$triggerType}");
            return 0;
        }

        $this->info("Found {$rules->count()} active rule(s)");
        $this->newLine();

        // Process each rule
        $executedCount = 0;
        foreach ($rules as $rule) {
            $this->line("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            $this->info("Rule: {$rule->name} (Priority: {$rule->priority})");

            if ($rule->description) {
                $this->line("Description: {$rule->description}");
            }

            // Check if rule matches
            $matches = $rule->matchesTicket($ticket);

            if ($matches) {
                $this->info("✓ Rule MATCHED");
                $this->newLine();

                // Show conditions
                if (!empty($rule->conditions)) {
                    $this->line("Conditions ({$rule->condition_match}):");
                    foreach ($rule->conditions as $index => $condition) {
                        $field = $condition['field'] ?? 'unknown';
                        $operator = $condition['operator'] ?? 'unknown';
                        $value = $condition['value'] ?? 'unknown';
                        $this->line("  {$index}. {$field} {$operator} {$value}");
                    }
                    $this->newLine();
                }

                // Show actions
                $this->line("Actions (" . count($rule->actions) . "):");
                foreach ($rule->actions as $index => $action) {
                    $type = $action['type'] ?? 'unknown';
                    $value = $action['value'] ?? '';
                    $this->line("  {$index}. {$type}" . ($value ? ": {$value}" : ''));
                }
                $this->newLine();

                // Execute actions (if not dry-run)
                if (!$dryRun) {
                    $this->line("Executing actions...");
                    $rule->executeActions($ticket);
                    $this->info("✓ Actions executed");
                } else {
                    $this->comment("(Dry run - actions not executed)");
                }

                $executedCount++;

                // Check stop processing
                if ($rule->stop_processing) {
                    $this->newLine();
                    $this->warn("Stop processing flag is set - no further rules will be processed");
                    break;
                }
            } else {
                $this->comment("✗ Rule did not match");

                // Show why it didn't match
                if (!empty($rule->conditions)) {
                    $this->newLine();
                    $this->line("Conditions ({$rule->condition_match}):");
                    foreach ($rule->conditions as $index => $condition) {
                        $field = $condition['field'] ?? 'unknown';
                        $operator = $condition['operator'] ?? 'unknown';
                        $expectedValue = $condition['value'] ?? 'unknown';

                        $ticketValue = $this->getTicketFieldValue($ticket, $field);
                        $matches = $this->evaluateCondition($condition, $ticket);

                        $status = $matches ? '✓' : '✗';
                        $this->line("  {$status} {$field} {$operator} {$expectedValue} (ticket value: {$ticketValue})");
                    }
                }
            }

            $this->newLine();
        }

        $this->line("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        $this->newLine();
        $this->info("Summary:");
        $this->line("Total rules checked: {$rules->count()}");
        $this->line("Rules matched: {$executedCount}");

        if ($dryRun) {
            $this->comment("This was a dry run - no actions were executed");
        }

        return 0;
    }

    /**
     * Get a field value from a ticket
     */
    protected function getTicketFieldValue(Ticket $ticket, string $field): mixed
    {
        return match ($field) {
            'category_id' => implode(', ', $ticket->categories->pluck('id')->toArray()) ?: 'none',
            'customer_id' => $ticket->customer_id ?? 'null',
            'user_id' => $ticket->user_id ?? 'null',
            'assigned_to' => $ticket->assigned_to ?? 'null',
            'priority' => $ticket->priority ?? 'null',
            'status_id' => $ticket->status_id ?? 'null',
            'labels' => implode(', ', $ticket->labels->pluck('id')->toArray()) ?: 'none',
            default => $ticket->form_data[$field] ?? 'null',
        };
    }

    /**
     * Evaluate a single condition
     */
    protected function evaluateCondition(array $condition, Ticket $ticket): bool
    {
        $field = $condition['field'] ?? null;
        $operator = $condition['operator'] ?? 'is';
        $value = $condition['value'] ?? null;

        if (!$field) {
            return false;
        }

        $ticketValue = match ($field) {
            'category_id' => $ticket->categories->pluck('id')->toArray(),
            'customer_id' => $ticket->customer_id,
            'user_id' => $ticket->user_id,
            'assigned_to' => $ticket->assigned_to,
            'priority' => $ticket->priority,
            'status_id' => $ticket->status_id,
            'labels' => $ticket->labels->pluck('id')->toArray(),
            default => $ticket->form_data[$field] ?? null,
        };

        return match ($operator) {
            'is' => is_array($ticketValue) ? in_array($value, $ticketValue) : $ticketValue == $value,
            'is_not' => is_array($ticketValue) ? !in_array($value, $ticketValue) : $ticketValue != $value,
            'contains' => is_string($ticketValue) && str_contains(strtolower($ticketValue), strtolower($value)),
            'does_not_contain' => is_string($ticketValue) && !str_contains(strtolower($ticketValue), strtolower($value)),
            'in' => is_array($value) && in_array($ticketValue, $value),
            'not_in' => is_array($value) && !in_array($ticketValue, $value),
            default => false,
        };
    }
}
