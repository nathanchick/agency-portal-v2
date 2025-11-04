<?php

namespace Modules\Ticket\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Ticket\Models\Category;
use Modules\Ticket\Models\Label;
use Modules\Ticket\Models\Ticket;
use Modules\Ticket\Models\TicketStatus;

class CustomerTicketController extends Controller
{
    public function myTickets(Request $request)
    {
        $user = $request->user();

        // Get customer for current user
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'No customer associated with this user');
        }

        $organisationId = $customer->organisation_id;

        // Get closed status slugs
        $closedStatusSlugs = TicketStatus::where('organisation_id', $organisationId)
            ->where('is_closed', true)
            ->pluck('slug');

        $query = Ticket::with([
            'user',
            'customer',
            'categories',
            'labels',
            'messages' => fn($q) => $q->latest()->limit(1)->with('user')
        ])
            ->where('user_id', $user->id)
            ->where('customer_id', $customer->id)
            ->whereNotIn('status', $closedStatusSlugs);

        // Filter by status if provided
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by priority if provided
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        // Filter by category if provided
        if ($request->filled('category_id')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('ticket_categories.id', $request->category_id);
            });
        }

        // Apply sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $query->orderBy($sortBy, $sortOrder);

        $tickets = $query->paginate(20);

        // Get filter options
        $categories = Category::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $statuses = TicketStatus::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->where('is_closed', false)
            ->orderBy('order')
            ->get(['id', 'name', 'slug', 'color']);

        return Inertia::render('tickets/my', [
            'tickets' => $tickets,
            'categories' => $categories,
            'statuses' => $statuses,
            'filters' => [
                'status' => $request->status,
                'priority' => $request->priority,
                'category_id' => $request->category_id,
            ],
            'sort' => [
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    public function closedTickets(Request $request)
    {
        $user = $request->user();

        // Get customer for current user
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'No customer associated with this user');
        }

        $organisationId = $customer->organisation_id;

        // Get closed status slugs
        $closedStatusSlugs = TicketStatus::where('organisation_id', $organisationId)
            ->where('is_closed', true)
            ->pluck('slug');

        $query = Ticket::with([
            'user',
            'customer',
            'categories',
            'labels',
            'messages' => fn($q) => $q->latest()->limit(1)->with('user')
        ])
            ->where('user_id', $user->id)
            ->where('customer_id', $customer->id)
            ->whereIn('status', $closedStatusSlugs);

        // Filter by status if provided
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by priority if provided
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        // Filter by category if provided
        if ($request->filled('category_id')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('ticket_categories.id', $request->category_id);
            });
        }

        // Apply sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $query->orderBy($sortBy, $sortOrder);

        $tickets = $query->paginate(20);

        // Get filter options
        $categories = Category::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $statuses = TicketStatus::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->where('is_closed', true)
            ->orderBy('order')
            ->get(['id', 'name', 'slug', 'color']);

        return Inertia::render('tickets/closed', [
            'tickets' => $tickets,
            'categories' => $categories,
            'statuses' => $statuses,
            'filters' => [
                'status' => $request->status,
                'priority' => $request->priority,
                'category_id' => $request->category_id,
            ],
            'sort' => [
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    public function allTickets(Request $request)
    {
        $user = $request->user();

        // Get customer for current user
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'No customer associated with this user');
        }

        $organisationId = $customer->organisation_id;

        // Get all tickets for the customer
        $query = Ticket::with([
            'user',
            'customer',
            'categories',
            'labels',
            'messages' => fn($q) => $q->latest()->limit(1)->with('user')
        ])
            ->where('customer_id', $customer->id);

        // Filter by status if provided
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by priority if provided
        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        // Filter by category if provided
        if ($request->filled('category_id')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('ticket_categories.id', $request->category_id);
            });
        }

        // Apply sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $query->orderBy($sortBy, $sortOrder);

        $tickets = $query->paginate(20);

        // Get filter options
        $categories = Category::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $statuses = TicketStatus::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->orderBy('order')
            ->get(['id', 'name', 'slug', 'color']);

        return Inertia::render('tickets/all', [
            'tickets' => $tickets,
            'categories' => $categories,
            'statuses' => $statuses,
            'filters' => [
                'status' => $request->status,
                'priority' => $request->priority,
                'category_id' => $request->category_id,
            ],
            'sort' => [
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    public function show(Request $request, Ticket $ticket)
    {
        $user = $request->user();

        // Get customer for current user
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'No customer associated with this user');
        }

        // Ensure ticket belongs to this customer
        if ($ticket->customer_id !== $customer->id) {
            abort(403, 'You do not have access to this ticket');
        }

        $ticket->load([
            'user',
            'customer',
            'categories',
            'labels',
            'messages' => fn($q) => $q->with('user')->latest()
        ]);

        return Inertia::render('tickets/customer-show', [
            'ticket' => $ticket,
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user();

        // Get customer for current user
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'No customer associated with this user');
        }

        $organisationId = $customer->organisation_id;

        // Get selected category if provided
        $selectedCategory = null;
        if ($request->filled('category_id')) {
            $selectedCategory = Category::where('organisation_id', $organisationId)
                ->where('id', $request->category_id)
                ->first();
        }

        $categories = Category::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->with('form')
            ->get();

        $labels = Label::where('organisation_id', $organisationId)
            ->where('is_visible', true)
            ->get();

        return Inertia::render('tickets/create', [
            'customer' => $customer,
            'categories' => $categories,
            'labels' => $labels,
            'selectedCategory' => $selectedCategory,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        // Get customer for current user
        $customer = $user->last_customer_id ? $user->customers()->find($user->last_customer_id) : null;

        if (!$customer) {
            abort(403, 'No customer associated with this user');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'priority' => 'required|in:low,medium,high',
            'category_ids' => 'array',
            'category_ids.*' => 'exists:ticket_categories,id',
            'label_ids' => 'array',
            'label_ids.*' => 'exists:ticket_labels,id',
            'metadata' => 'array',
        ]);

        // Get the default status for this organisation
        $defaultStatus = TicketStatus::where('organisation_id', $customer->organisation_id)
            ->where('is_default', true)
            ->first();

        $ticket = Ticket::create([
            'organisation_id' => $customer->organisation_id,
            'customer_id' => $customer->id,
            'user_id' => $user->id,
            'title' => $validated['title'],
            'message' => $validated['message'],
            'priority' => $validated['priority'],
            'status' => $defaultStatus?->slug ?? 'open',
            'metadata' => $validated['metadata'] ?? [],
        ]);

        if (! empty($validated['category_ids'])) {
            $ticket->categories()->attach($validated['category_ids']);
        }

        if (! empty($validated['label_ids'])) {
            $ticket->labels()->attach($validated['label_ids']);
        }

        return redirect()->route('customer.tickets.view')->with('success', 'Ticket created successfully!');
    }
}
