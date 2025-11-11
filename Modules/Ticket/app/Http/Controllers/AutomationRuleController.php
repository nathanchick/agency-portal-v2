<?php

namespace Modules\Ticket\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasOrganisationRole;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Ticket\Models\AutomationRule;
use Modules\Ticket\Models\Category;
use Modules\Ticket\Models\Label;
use Modules\Ticket\Models\TicketStatus;
use Modules\Ticket\Models\TicketForm;
use App\Models\User;

class AutomationRuleController extends Controller
{
    use HasOrganisationRole;

    public function index(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $createdRules = AutomationRule::where('organisation_id', $organisationId)
            ->where('trigger', 'ticket_created')
            ->orderBy('priority', 'desc')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($rule) {
                return [
                    'id' => $rule->id,
                    'name' => $rule->name,
                    'description' => $rule->description,
                    'priority' => $rule->priority,
                    'is_active' => $rule->is_active,
                    'trigger' => $rule->trigger,
                    'condition_match' => $rule->condition_match,
                    'conditions' => $rule->conditions,
                    'actions' => $rule->actions,
                    'stop_processing' => $rule->stop_processing,
                    'created_at' => $rule->created_at,
                    'updated_at' => $rule->updated_at,
                ];
            });

        $updatedRules = AutomationRule::where('organisation_id', $organisationId)
            ->where('trigger', 'ticket_updated')
            ->orderBy('priority', 'desc')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($rule) {
                return [
                    'id' => $rule->id,
                    'name' => $rule->name,
                    'description' => $rule->description,
                    'priority' => $rule->priority,
                    'is_active' => $rule->is_active,
                    'trigger' => $rule->trigger,
                    'condition_match' => $rule->condition_match,
                    'conditions' => $rule->conditions,
                    'actions' => $rule->actions,
                    'stop_processing' => $rule->stop_processing,
                    'created_at' => $rule->created_at,
                    'updated_at' => $rule->updated_at,
                ];
            });

        return Inertia::render('tickets/automation-rules/index', [
            'createdRules' => $createdRules,
            'updatedRules' => $updatedRules,
        ]);
    }

    public function create(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;
        $trigger = $request->query('trigger', 'ticket_created');

        $categories = Category::where('organisation_id', $organisationId)->get(['id', 'name']);
        $labels = Label::where('organisation_id', $organisationId)->get(['id', 'name']);
        $statuses = TicketStatus::where('organisation_id', $organisationId)->get(['id', 'name', 'color']);
        $forms = TicketForm::where('organisation_id', $organisationId)->get(['id', 'name', 'content']);
        // Get organisation users (only users with roles)
        $users = User::query()
            ->join('organisation_user', 'users.id', '=', 'organisation_user.user_id')
            ->join('model_has_roles', function ($join) use ($organisationId) {
                $join->on('users.id', '=', 'model_has_roles.model_id')
                    ->where('model_has_roles.model_type', '=', User::class)
                    ->where('model_has_roles.team_id', '=', $organisationId);
            })
            ->where('organisation_user.organisation_id', $organisationId)
            ->select('users.id', 'users.name', 'users.email')
            ->distinct()
            ->get();
        $customers = $this->getCurrentDirectOrganisation()->customers()->get(['id', 'name']);

        return Inertia::render('tickets/automation-rules/create', [
            'trigger' => $trigger,
            'categories' => $categories,
            'labels' => $labels,
            'statuses' => $statuses,
            'forms' => $forms,
            'users' => $users,
            'customers' => $customers,
        ]);
    }

    public function store(Request $request)
    {
        \Log::info('AutomationRule Store - Request data:', [
            'actions' => $request->input('actions'),
        ]);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'trigger' => 'required|in:ticket_created,ticket_updated',
            'condition_match' => 'required|in:all,any',
            'conditions' => 'required|array',
            'conditions.*.field' => 'required|string',
            'conditions.*.operator' => 'required|in:is,is_not,contains,does_not_contain,in,not_in',
            'conditions.*.value' => 'required',
            'actions' => 'required|array',
            'actions.*.type' => 'required|string',
            'actions.*.value' => 'nullable|string',
            'actions.*.field' => 'nullable|string',
            'stop_processing' => 'boolean',
        ]);

        \Log::info('AutomationRule Store - Validated data:', [
            'actions' => $validated['actions'],
        ]);

        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $rule = AutomationRule::create([
            'organisation_id' => $organisationId,
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'priority' => $validated['priority'],
            'is_active' => $validated['is_active'] ?? true,
            'trigger' => $validated['trigger'],
            'condition_match' => $validated['condition_match'],
            'conditions' => $validated['conditions'],
            'actions' => $validated['actions'],
            'stop_processing' => $validated['stop_processing'] ?? false,
        ]);

        \Log::info('AutomationRule Store - Created rule:', [
            'id' => $rule->id,
            'actions' => $rule->actions,
        ]);

        return redirect()->route('tickets.automation-rules.index')
            ->with('success', 'Automation rule created successfully.');
    }

    public function edit(Request $request, AutomationRule $automationRule)
    {
        // Ensure the rule belongs to the current organisation
        if ($automationRule->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $categories = Category::where('organisation_id', $organisationId)->get(['id', 'name']);
        $labels = Label::where('organisation_id', $organisationId)->get(['id', 'name']);
        $statuses = TicketStatus::where('organisation_id', $organisationId)->get(['id', 'name', 'color']);
        $forms = TicketForm::where('organisation_id', $organisationId)->get(['id', 'name', 'content']);
        // Get organisation users (only users with roles)
        $users = User::query()
            ->join('organisation_user', 'users.id', '=', 'organisation_user.user_id')
            ->join('model_has_roles', function ($join) use ($organisationId) {
                $join->on('users.id', '=', 'model_has_roles.model_id')
                    ->where('model_has_roles.model_type', '=', User::class)
                    ->where('model_has_roles.team_id', '=', $organisationId);
            })
            ->where('organisation_user.organisation_id', $organisationId)
            ->select('users.id', 'users.name', 'users.email')
            ->distinct()
            ->get();
        $customers = $this->getCurrentDirectOrganisation()->customers()->get(['id', 'name']);

        return Inertia::render('tickets/automation-rules/edit', [
            'rule' => [
                'id' => $automationRule->id,
                'name' => $automationRule->name,
                'description' => $automationRule->description,
                'priority' => $automationRule->priority,
                'is_active' => $automationRule->is_active,
                'trigger' => $automationRule->trigger,
                'condition_match' => $automationRule->condition_match,
                'conditions' => $automationRule->conditions,
                'actions' => $automationRule->actions,
                'stop_processing' => $automationRule->stop_processing,
            ],
            'categories' => $categories,
            'labels' => $labels,
            'statuses' => $statuses,
            'forms' => $forms,
            'users' => $users,
            'customers' => $customers,
        ]);
    }

    public function update(Request $request, AutomationRule $automationRule)
    {
        // Ensure the rule belongs to the current organisation
        if ($automationRule->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        \Log::info('AutomationRule Update - Request data:', [
            'rule_id' => $automationRule->id,
            'actions' => $request->input('actions'),
        ]);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'trigger' => 'required|in:ticket_created,ticket_updated',
            'condition_match' => 'required|in:all,any',
            'conditions' => 'required|array',
            'conditions.*.field' => 'required|string',
            'conditions.*.operator' => 'required|in:is,is_not,contains,does_not_contain,in,not_in',
            'conditions.*.value' => 'required',
            'actions' => 'required|array',
            'actions.*.type' => 'required|string',
            'actions.*.value' => 'nullable|string',
            'actions.*.field' => 'nullable|string',
            'stop_processing' => 'boolean',
        ]);

        \Log::info('AutomationRule Update - Validated data:', [
            'rule_id' => $automationRule->id,
            'actions' => $validated['actions'],
        ]);

        $automationRule->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'priority' => $validated['priority'],
            'is_active' => $validated['is_active'] ?? true,
            'trigger' => $validated['trigger'],
            'condition_match' => $validated['condition_match'],
            'conditions' => $validated['conditions'],
            'actions' => $validated['actions'],
            'stop_processing' => $validated['stop_processing'] ?? false,
        ]);

        \Log::info('AutomationRule Update - Updated rule:', [
            'rule_id' => $automationRule->id,
            'actions' => $automationRule->fresh()->actions,
        ]);

        return redirect()->route('tickets.automation-rules.index')
            ->with('success', 'Automation rule updated successfully.');
    }

    public function destroy(Request $request, AutomationRule $automationRule)
    {
        // Ensure the rule belongs to the current organisation
        if ($automationRule->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $automationRule->delete();

        return redirect()->route('tickets.automation-rules.index')
            ->with('success', 'Automation rule deleted successfully.');
    }

    public function toggle(Request $request, AutomationRule $automationRule)
    {
        // Ensure the rule belongs to the current organisation
        if ($automationRule->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $automationRule->update([
            'is_active' => !$automationRule->is_active,
        ]);

        return back()->with('success', 'Automation rule ' . ($automationRule->is_active ? 'activated' : 'deactivated') . ' successfully.');
    }

    public function updatePriority(Request $request, AutomationRule $automationRule)
    {
        // Ensure the rule belongs to the current organisation
        if ($automationRule->organisation_id !== $this->getCurrentDirectOrganisation()->id) {
            abort(403);
        }

        $validated = $request->validate([
            'priority' => 'required|integer|min:0',
        ]);

        $automationRule->update([
            'priority' => $validated['priority'],
        ]);

        return back()->with('success', 'Priority updated successfully.');
    }
}