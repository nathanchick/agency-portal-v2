<?php

namespace Modules\Ticket\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;
use App\Models\Organisation;

class AutomationRule extends Model
{
    use HasUuids;

    protected $table = 'ticket_automation_rules';

    protected $fillable = [
        'organisation_id',
        'name',
        'description',
        'priority',
        'is_active',
        'trigger',
        'condition_match',
        'conditions',
        'actions',
        'stop_processing',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'stop_processing' => 'boolean',
        'priority' => 'integer',
        'conditions' => 'array',
        'actions' => 'array',
    ];

    public function organisation(): BelongsTo
    {
        return $this->belongsTo(Organisation::class);
    }

    /**
     * Check if a ticket matches this rule's conditions
     */
    public function matchesTicket(Ticket $ticket): bool
    {
        \Log::info('AutomationRule: matchesTicket started', [
            'rule_id' => $this->id,
            'rule_name' => $this->name,
            'is_active' => $this->is_active,
            'ticket_id' => $ticket->id,
        ]);

        if (!$this->is_active) {
            \Log::info('AutomationRule: Rule is not active', ['rule_id' => $this->id]);
            return false;
        }

        if (empty($this->conditions)) {
            \Log::info('AutomationRule: No conditions, rule matches by default', ['rule_id' => $this->id]);
            return true;
        }

        $matches = [];
        foreach ($this->conditions as $index => $condition) {
            $result = $this->evaluateCondition($condition, $ticket);
            $matches[] = $result;
            \Log::info('AutomationRule: Condition evaluated', [
                'rule_id' => $this->id,
                'condition_index' => $index,
                'condition' => $condition,
                'result' => $result,
            ]);
        }

        $finalResult = $this->condition_match === 'all'
            ? !in_array(false, $matches, true)
            : in_array(true, $matches, true);

        \Log::info('AutomationRule: Final match result', [
            'rule_id' => $this->id,
            'condition_match' => $this->condition_match,
            'matches' => $matches,
            'final_result' => $finalResult,
        ]);

        return $finalResult;
    }

    /**
     * Evaluate a single condition against a ticket
     */
    protected function evaluateCondition(array $condition, Ticket $ticket): bool
    {
        $field = $condition['field'] ?? null;
        $operator = $condition['operator'] ?? 'is';
        $value = $condition['value'] ?? null;

        if (!$field) {
            Log::warning('AutomationRule: No field in condition', [
                'rule_id' => $this->id,
                'condition' => $condition,
            ]);
            return false;
        }

        $ticketValue = $this->getTicketFieldValue($ticket, $field);

        Log::info('AutomationRule: Evaluating condition', [
            'rule_id' => $this->id,
            'field' => $field,
            'operator' => $operator,
            'expected_value' => $value,
            'ticket_value' => $ticketValue,
            'ticket_value_type' => gettype($ticketValue),
            'expected_value_type' => gettype($value),
        ]);

        $result = match ($operator) {
            'is' => is_array($ticketValue) ? in_array($value, $ticketValue) : $ticketValue == $value,
            'is_not' => is_array($ticketValue) ? !in_array($value, $ticketValue) : $ticketValue != $value,
            'contains' => is_string($ticketValue) && str_contains(strtolower($ticketValue), strtolower($value)),
            'does_not_contain' => is_string($ticketValue) && !str_contains(strtolower($ticketValue), strtolower($value)),
            'in' => is_array($value) && in_array($ticketValue, $value),
            'not_in' => is_array($value) && !in_array($ticketValue, $value),
            default => false,
        };

        Log::info('AutomationRule: Condition result', [
            'rule_id' => $this->id,
            'field' => $field,
            'operator' => $operator,
            'result' => $result,
        ]);

        return $result;
    }

    /**
     * Get a field value from a ticket
     */
    protected function getTicketFieldValue(Ticket $ticket, string $field): mixed
    {
        return match ($field) {
            'category_id' => $ticket->categories->pluck('id')->toArray(),
            'customer_id' => $ticket->customer_id,
            'user_id' => $ticket->user_id, // Ticket creator
            'assigned_to' => $ticket->assigned_to, // Assigned user
            'priority' => $ticket->priority,
            'status_id' => $ticket->status_id,
            'labels' => $ticket->labels->pluck('id')->toArray(),
            default => $ticket->form_data[$field] ?? null,
        };
    }

    /**
     * Execute the rule's actions on a ticket
     */
    public function executeActions(Ticket $ticket): void
    {

        foreach ($this->actions as $action) {
            $this->executeAction($action, $ticket);
        }
    }

    /**
     * Execute a single action
     */
    protected function executeAction(array $action, Ticket $ticket): void
    {
        $type = $action['type'] ?? null;
        $value = $action['value'] ?? null;

        Log::info('AutomationRule: Executing action', [
            'rule_id' => $this->id,
            'type' => $type,
            'value' => $value,
            'has_value' => isset($action['value']),
            'action_full' => $action,
        ]);

        if (!$type) {
            Log::warning('AutomationRule: Action has no type', ['action' => $action]);
            return;
        }

        // Actions that require a value
        $requiresValue = ['set_category', 'add_category', 'remove_category', 'set_priority', 'set_status', 'add_labels', 'remove_labels', 'assign_user', 'add_message', 'add_private_message'];

        if (in_array($type, $requiresValue) && empty($value)) {
            Log::warning('AutomationRule: Action requires value but none provided', [
                'rule_id' => $this->id,
                'type' => $type,
            ]);
            return;
        }

        try {
            match ($type) {
                'set_category' => $ticket->categories()->sync([$value]),
                'add_category' => $ticket->categories()->syncWithoutDetaching([$value]),
                'remove_category' => $ticket->categories()->detach($value),
                'set_priority' => $ticket->update(['priority' => $value]),
                'set_status' => $ticket->update(['status_id' => $value]),
                'add_labels' => $ticket->labels()->syncWithoutDetaching([$value]),
                'remove_labels' => $ticket->labels()->detach($value),
                'assign_user' => $ticket->update(['assigned_to' => $value]),
                'add_message' => $ticket->messages()->create([
                    'user_id' => null,
                    'message' => $value,
                    'is_private' => false,
                ]),
                'add_private_message' => $ticket->messages()->create([
                    'user_id' => null,
                    'message' => $value,
                    'is_private' => true,
                ]),
                'set_form_field' => $this->setFormField($ticket, $action),
                'notify_creator' => $this->notifyCreator($ticket),
                'notify_assigned' => $this->notifyAssigned($ticket),
                default => Log::warning('AutomationRule: Unknown action type', ['type' => $type]),
            };

            Log::info('AutomationRule: Action executed successfully', [
                'rule_id' => $this->id,
                'type' => $type,
            ]);
        } catch (\Exception $e) {
            Log::error('AutomationRule: Action execution failed', [
                'rule_id' => $this->id,
                'type' => $type,
                'value' => $value,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }

    protected function setFormField(Ticket $ticket, array $action): void
    {
        $field = $action['field'] ?? null;
        $value = $action['value'] ?? null;

        if ($field) {
            $formData = $ticket->form_data ?? [];
            $formData[$field] = $value;
            $ticket->update(['form_data' => $formData]);
        }
    }

    protected function notifyCreator(Ticket $ticket): void
    {
        // TODO: Implement notification to creator
    }

    protected function notifyAssigned(Ticket $ticket): void
    {
        // TODO: Implement notification to assigned user
    }

    /**
     * Scope to get active rules ordered by priority
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('priority', 'desc');
    }

    /**
     * Scope to get rules for a specific trigger
     */
    public function scopeForTrigger($query, string $trigger)
    {
        return $query->where('trigger', $trigger);
    }

    /**
     * Scope to get rules for an organisation
     */
    public function scopeForOrganisation($query, string $organisationId)
    {
        return $query->where('organisation_id', $organisationId);
    }
}