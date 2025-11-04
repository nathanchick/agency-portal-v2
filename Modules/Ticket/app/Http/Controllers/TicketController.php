<?php

namespace Modules\Ticket\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Traits\HasOrganisationRole;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Customer\Models\Customer;
use Modules\Ticket\Models\Category;
use Modules\Ticket\Models\Label;
use Modules\Ticket\Models\SavedTicketFilter;
use Modules\Ticket\Models\Ticket;
use Modules\Ticket\Models\TicketForm;
use Modules\Ticket\Models\TicketStatus;

class TicketController extends Controller
{
    use HasOrganisationRole;

    /**
     * Display all tickets for organisation users
     * - Admin: sees ALL customers in organisation
     * - Manager/User: sees customers where allow_all_users is true OR user is assigned to customer
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        // Check if user is an Admin for this organisation
        $role = $this->getCurrentOrganisationUserRole();
        $isAdmin = $role === 'Admin';

        if ($isAdmin) {
            // Admin sees all customers in the organisation
            $customerIds = Customer::where('organisation_id', $organisationId)
                ->pluck('id');
        } else {
            // Get customer IDs where allow_all_users is true
            $allowAllCustomerIds = Customer::where('organisation_id', $organisationId)
                ->where('allow_all_users', true)
                ->pluck('id');

            // Get customer IDs where user is assigned
            $assignedCustomerIds = $user->customers()
                ->where('organisation_id', $organisationId)
                ->pluck('customers.id');

            // Merge both sets of customer IDs
            $customerIds = $allowAllCustomerIds->merge($assignedCustomerIds)->unique();
        }

        // Get tickets for these customers
        $query = Ticket::with([
            'user',
            'customer',
            'categories',
            'labels',
            'assignedTo',
            'messages' => fn($q) => $q->latest()->limit(1)->with('user')
        ])
            ->whereIn('customer_id', $customerIds)
            ->latest();

        // Filter by customer if provided
        if ($request->filled('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        // Filter by status if provided
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by label if provided
        if ($request->filled('label_id')) {
            $query->whereHas('labels', function ($q) use ($request) {
                $q->where('ticket_labels.id', $request->label_id);
            });
        }

        // Filter by category if provided
        if ($request->filled('category_id')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('ticket_categories.id', $request->category_id);
            });
        }

        // Filter by assigned user if provided
        if ($request->filled('assigned_to')) {
            if ($request->assigned_to === 'unassigned') {
                $query->whereNull('assigned_to');
            } else {
                $query->where('assigned_to', $request->assigned_to);
            }
        }

        // Apply sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $allowedSortFields = ['created_at', 'updated_at', 'priority', 'status'];
        if (in_array($sortBy, $allowedSortFields)) {
            $query->orderBy($sortBy, $sortOrder);
        } else {
            $query->latest();
        }

        $tickets = $query->paginate(15)->withQueryString();

        // Get customers for filter dropdown
        $customers = Customer::whereIn('id', $customerIds)
            ->orderBy('name')
            ->get(['id', 'name']);

        // Get labels and categories for filter dropdowns
        $labels = Label::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $categories = Category::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        // Get organisation users for assignment
        $organisationUsers = $user->organisations()->find($organisationId)->users()->get(['id', 'name']);

        // Get statuses for filters and dropdowns
        $statuses = TicketStatus::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->orderBy('order')
            ->get(['id', 'name', 'slug', 'color']);

        return Inertia::render('tickets/index', [
            'tickets' => $tickets,
            'customers' => $customers,
            'labels' => $labels,
            'categories' => $categories,
            'statuses' => $statuses,
            'organisationUsers' => $organisationUsers,
            'filters' => $request->only(['customer_id', 'status', 'label_id', 'category_id', 'assigned_to']),
            'sort' => [
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    /**
     * Display label, category, and status management configuration
     */
    public function config(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $labelsQuery = Label::where('organisation_id', $organisationId)
            ->latest('created_at');

        $categoriesQuery = Category::where('organisation_id', $organisationId)
            ->with('form')
            ->latest('created_at');

        $statusesQuery = TicketStatus::where('organisation_id', $organisationId)
            ->orderBy('order');

        $labels = $labelsQuery->get();
        $categories = $categoriesQuery->get();
        $statuses = $statusesQuery->get();
        $forms = TicketForm::where('organisation_id', $organisationId)->get(['id', 'name']);

        return Inertia::render('tickets/config', [
            'labels' => $labels,
            'categories' => $categories,
            'statuses' => $statuses,
            'forms' => $forms,
        ]);
    }

    /**
     * Store a new label
     */
    public function storeLabel(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_visible' => 'boolean',
        ]);

        $slug = \Illuminate\Support\Str::slug($validated['name']);

        Label::create([
            'organisation_id' => $organisationId,
            'name' => $validated['name'],
            'slug' => $slug,
            'is_visible' => $validated['is_visible'] ?? true,
        ]);

        return back()->with('success', 'Label created successfully');
    }

    /**
     * Update a label
     */
    public function updateLabel(Request $request, Label $label)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($label->organisation_id !== $organisationId) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_visible' => 'boolean',
        ]);

        $slug = \Illuminate\Support\Str::slug($validated['name']);

        $label->update([
            'name' => $validated['name'],
            'slug' => $slug,
            'is_visible' => $validated['is_visible'] ?? true,
        ]);

        return back()->with('success', 'Label updated successfully');
    }

    /**
     * Delete a label
     */
    public function destroyLabel(Label $label)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($label->organisation_id !== $organisationId) {
            abort(403);
        }

        $label->delete();

        return back()->with('success', 'Label deleted successfully');
    }

    /**
     * Store a new category
     */
    public function storeCategory(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'form_id' => 'nullable|exists:ticket_forms,id',
            'is_visible' => 'boolean',
        ]);

        $slug = \Illuminate\Support\Str::slug($validated['name']);

        Category::create([
            'organisation_id' => $organisationId,
            'name' => $validated['name'],
            'slug' => $slug,
            'form_id' => $validated['form_id'] ?? null,
            'is_visible' => $validated['is_visible'] ?? true,
        ]);

        return back()->with('success', 'Category created successfully');
    }

    /**
     * Update a category
     */
    public function updateCategory(Request $request, Category $category)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($category->organisation_id !== $organisationId) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'form_id' => 'nullable|exists:ticket_forms,id',
            'is_visible' => 'boolean',
        ]);

        $slug = \Illuminate\Support\Str::slug($validated['name']);

        $category->update([
            'name' => $validated['name'],
            'slug' => $slug,
            'form_id' => $validated['form_id'] ?? null,
            'is_visible' => $validated['is_visible'] ?? true,
        ]);

        return back()->with('success', 'Category updated successfully');
    }

    /**
     * Delete a category
     */
    public function destroyCategory(Category $category)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($category->organisation_id !== $organisationId) {
            abort(403);
        }

        $category->delete();

        return back()->with('success', 'Category deleted successfully');
    }

    /**
     * Display ticket forms list
     */
    public function forms()
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $forms = TicketForm::where('organisation_id', $organisationId)
            ->latest('created_at')
            ->get();

        return Inertia::render('tickets/forms/index', [
            'forms' => $forms,
        ]);
    }

    /**
     * Show create ticket form page
     */
    public function createForm()
    {
        return Inertia::render('tickets/forms/create');
    }

    /**
     * Store a new ticket form
     */
    public function storeForm(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        TicketForm::create([
            'organisation_id' => $organisationId,
            'name' => $validated['name'],
            'content' => $validated['content'] ?? '',
            'is_default' => false,
        ]);

        return redirect()->route('tickets.forms.index')->with('success', 'Ticket form created successfully');
    }

    /**
     * Show edit ticket form page
     */
    public function editForm(TicketForm $ticketForm)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticketForm->organisation_id !== $organisationId) {
            abort(403);
        }

        return Inertia::render('tickets/forms/edit', [
            'form' => $ticketForm,
        ]);
    }

    /**
     * Update a ticket form
     */
    public function updateForm(Request $request, TicketForm $ticketForm)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticketForm->organisation_id !== $organisationId) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $ticketForm->update([
            'name' => $validated['name'],
            'content' => $validated['content'] ?? '',
        ]);

        return redirect()->route('tickets.forms.index')->with('success', 'Ticket form updated successfully');
    }

    /**
     * Delete a ticket form
     */
    public function destroyForm(TicketForm $ticketForm)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticketForm->organisation_id !== $organisationId) {
            abort(403);
        }

        if ($ticketForm->is_default) {
            return back()->with('error', 'Cannot delete the default form');
        }

        $ticketForm->delete();

        return back()->with('success', 'Ticket form deleted successfully');
    }

    public function myTickets()
    {
        $tickets = Ticket::with(['user', 'categories', 'labels'])
            ->where('user_id', auth()->id())
            ->where('status', '!=', 'closed')
            ->latest()
            ->get();

        return Inertia::render('tickets/my', [
            'tickets' => $tickets,
        ]);
    }

    public function allTickets()
    {
        // Get all tickets for users in the same organisation
        $tickets = Ticket::with(['user', 'categories', 'labels'])
            ->latest()
            ->get();

        return Inertia::render('tickets/all', [
            'tickets' => $tickets,
        ]);
    }

    /**
     * Show create ticket page for organisation users
     */
    public function create(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'category_id' => 'required|exists:ticket_categories,id',
        ]);

        // Verify customer belongs to organisation
        $customer = Customer::where('id', $request->customer_id)
            ->where('organisation_id', $organisationId)
            ->firstOrFail();

        // Get category with form
        $category = Category::with('form')
            ->where('id', $request->category_id)
            ->where('organisation_id', $organisationId)
            ->firstOrFail();

        return Inertia::render('tickets/create', [
            'customer' => $customer,
            'category' => $category,
        ]);
    }

    /**
     * Store new ticket from organisation user
     */
    public function store(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'category_id' => 'required|exists:ticket_categories,id',
            'title' => 'required|string|max:255',
            'priority' => 'required|in:low,medium,high',
            'message' => 'required|string',
            'form_data' => 'nullable|array',
        ]);

        // Verify customer belongs to organisation
        $customer = Customer::where('id', $validated['customer_id'])
            ->where('organisation_id', $organisationId)
            ->firstOrFail();

        $ticket = Ticket::create([
            'organisation_id' => $organisationId,
            'customer_id' => $customer->id,
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'message' => $validated['message'],
            'priority' => $validated['priority'],
            'status' => 'open',
            'metadata' => $validated['form_data'] ?? null,
        ]);

        // Attach the category
        $ticket->categories()->attach($validated['category_id']);

        return redirect()->route('tickets.index')->with('success', 'Ticket created successfully');
    }

    /**
     * Show a single ticket
     */
    public function show(Ticket $ticket)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        // Verify ticket belongs to organisation and user has access
        if ($ticket->organisation_id !== $organisationId) {
            abort(403);
        }

        // Load all relationships
        $ticket->load([
            'user',
            'customer',
            'categories',
            'labels',
            'assignedTo',
            'messages.user'
        ]);

        // Get organisation users for assignment
        $user = request()->user();
        $organisationUsers = $user->organisations()->find($organisationId)->users()->get(['id', 'name']);

        // Get all categories and labels for editing
        $categories = Category::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $labels = Label::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $statuses = TicketStatus::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->orderBy('order')
            ->get(['id', 'name', 'slug', 'color']);

        return Inertia::render('tickets/show', [
            'ticket' => $ticket,
            'organisationUsers' => $organisationUsers,
            'categories' => $categories,
            'labels' => $labels,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Save a ticket filter preset
     */
    public function saveFilter(Request $request)
    {
        $user = $request->user();
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'filters' => 'required|array',
        ]);

        SavedTicketFilter::create([
            'user_id' => $user->id,
            'organisation_id' => $organisationId,
            'name' => $validated['name'],
            'filters' => $validated['filters'],
        ]);

        return back()->with('success', 'Filter saved successfully');
    }

    /**
     * Delete a saved filter
     */
    public function destroyFilter(SavedTicketFilter $filter)
    {
        $user = request()->user();

        // Ensure the filter belongs to the current user
        if ($filter->user_id !== $user->id) {
            abort(403);
        }

        $filter->delete();

        return back()->with('success', 'Filter deleted successfully');
    }

    /**
     * Update ticket status
     */
    public function updateStatus(Request $request, Ticket $ticket)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticket->organisation_id !== $organisationId) {
            abort(403);
        }

        // Get valid status slugs for this organisation
        $validStatuses = TicketStatus::where('organisation_id', $organisationId)
            ->pluck('slug')
            ->toArray();

        $validated = $request->validate([
            'status' => 'required|in:' . implode(',', $validStatuses),
        ]);

        $ticket->update(['status' => $validated['status']]);

        return back()->with('success', 'Ticket status updated successfully');
    }

    /**
     * Update ticket priority
     */
    public function updatePriority(Request $request, Ticket $ticket)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticket->organisation_id !== $organisationId) {
            abort(403);
        }

        $validated = $request->validate([
            'priority' => 'required|in:low,medium,high',
        ]);

        $ticket->update(['priority' => $validated['priority']]);

        return back()->with('success', 'Ticket priority updated successfully');
    }

    /**
     * Update ticket assigned user
     */
    public function updateAssignment(Request $request, Ticket $ticket)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticket->organisation_id !== $organisationId) {
            abort(403);
        }

        $validated = $request->validate([
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $ticket->update(['assigned_to' => $validated['assigned_to']]);

        return back()->with('success', 'Ticket assignment updated successfully');
    }

    /**
     * Update ticket's category (different from updateCategory which updates the category itself)
     */
    public function updateTicketCategory(Request $request, Ticket $ticket)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticket->organisation_id !== $organisationId) {
            abort(403);
        }

        $validated = $request->validate([
            'category_id' => 'required|exists:ticket_categories,id',
        ]);

        // Sync the category (replaces all existing categories with the new one)
        $ticket->categories()->sync([$validated['category_id']]);

        return back()->with('success', 'Ticket category updated successfully');
    }

    /**
     * Add a label to a ticket
     */
    public function addLabel(Request $request, Ticket $ticket)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticket->organisation_id !== $organisationId) {
            abort(403);
        }

        $validated = $request->validate([
            'label_id' => 'required|exists:ticket_labels,id',
        ]);

        // Verify label belongs to organisation
        $label = Label::where('id', $validated['label_id'])
            ->where('organisation_id', $organisationId)
            ->firstOrFail();

        // Attach the label if not already attached
        if (!$ticket->labels()->where('ticket_labels.id', $label->id)->exists()) {
            $ticket->labels()->attach($label->id);
        }

        return back()->with('success', 'Label added successfully');
    }

    /**
     * Remove a label from a ticket
     */
    public function removeLabel(Ticket $ticket, Label $label)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticket->organisation_id !== $organisationId) {
            abort(403);
        }

        if ($label->organisation_id !== $organisationId) {
            abort(403);
        }

        $ticket->labels()->detach($label->id);

        return back()->with('success', 'Label removed successfully');
    }

    /**
     * Add a message to a ticket
     */
    public function addMessage(Request $request, Ticket $ticket)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticket->organisation_id !== $organisationId) {
            abort(403);
        }

        // Get valid status slugs for this organisation
        $validStatuses = TicketStatus::where('organisation_id', $organisationId)
            ->pluck('slug')
            ->toArray();

        $validated = $request->validate([
            'message' => 'required|string',
            'is_private' => 'boolean',
            'set_status' => 'nullable|in:' . implode(',', $validStatuses),
        ]);

        $ticket->messages()->create([
            'user_id' => $request->user()->id,
            'message' => $validated['message'],
            'is_private' => $validated['is_private'] ?? false,
        ]);

        // Update status if requested
        if (!empty($validated['set_status'])) {
            $ticket->update(['status' => $validated['set_status']]);
        }

        return back()->with('success', 'Message added successfully');
    }

    /**
     * Store a new ticket status
     */
    public function storeStatusDefinition(Request $request)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7', // hex color
            'is_default' => 'boolean',
            'is_closed' => 'boolean',
            'is_visible' => 'boolean',
        ]);

        $slug = \Illuminate\Support\Str::slug($validated['name']);

        // If this is set as default, unset any other default statuses
        if ($validated['is_default'] ?? false) {
            TicketStatus::where('organisation_id', $organisationId)->update(['is_default' => false]);
        }

        TicketStatus::create([
            'organisation_id' => $organisationId,
            'name' => $validated['name'],
            'slug' => $slug,
            'color' => $validated['color'],
            'is_default' => $validated['is_default'] ?? false,
            'is_closed' => $validated['is_closed'] ?? false,
            'is_visible' => $validated['is_visible'] ?? true,
            'order' => TicketStatus::where('organisation_id', $organisationId)->max('order') + 1,
        ]);

        return back()->with('success', 'Status created successfully');
    }

    /**
     * Update a ticket status
     */
    public function updateStatusDefinition(Request $request, TicketStatus $ticketStatus)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticketStatus->organisation_id !== $organisationId) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:7',
            'is_default' => 'boolean',
            'is_closed' => 'boolean',
            'is_visible' => 'boolean',
        ]);

        $slug = \Illuminate\Support\Str::slug($validated['name']);

        // If this is set as default, unset any other default statuses
        if ($validated['is_default'] ?? false) {
            TicketStatus::where('organisation_id', $organisationId)
                ->where('id', '!=', $ticketStatus->id)
                ->update(['is_default' => false]);
        }

        $ticketStatus->update([
            'name' => $validated['name'],
            'slug' => $slug,
            'color' => $validated['color'],
            'is_default' => $validated['is_default'] ?? false,
            'is_closed' => $validated['is_closed'] ?? false,
            'is_visible' => $validated['is_visible'] ?? true,
        ]);

        return back()->with('success', 'Status updated successfully');
    }

    /**
     * Delete a ticket status
     */
    public function destroyStatusDefinition(TicketStatus $ticketStatus)
    {
        $organisationId = $this->getCurrentDirectOrganisation()->id;

        if ($ticketStatus->organisation_id !== $organisationId) {
            abort(403);
        }

        $ticketStatus->delete();

        return back()->with('success', 'Status deleted successfully');
    }
}
