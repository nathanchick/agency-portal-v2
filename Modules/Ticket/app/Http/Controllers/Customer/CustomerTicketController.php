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
            'categories.form',
            'labels',
            'media',
            'messages' => fn($q) => $q->with(['user', 'media'])->latest()
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

        // Get customer's websites with platform information
        $websites = $customer->websites()
            ->with('settings')
            ->get()
            ->map(function ($website) {
                // Get platform type from settings
                $platformTypeSetting = $website->settings()
                    ->where('module', 'Website')
                    ->where('key', 'platform_type')
                    ->first();

                return [
                    'id' => $website->id,
                    'url' => $website->url,
                    'type' => $website->type,
                    'platform_type' => $platformTypeSetting?->value ?? null,
                ];
            });

        // Get OpenAI quality settings for the organization
        $organisation = $customer->organisation;
        $qualitySettings = $organisation->settings()
            ->where('module', 'OpenAi')
            ->whereIn('key', [
                'status',
                'ticket_quality_assistant_status',
                'ticket_quality_auto_check',
                'ticket_quality_min_score',
                'ticket_quality_good_threshold',
                'ticket_quality_fair_threshold'
            ])
            ->get()
            ->pluck('value', 'key');

        $ticketQualityConfig = [
            'enabled' => ($qualitySettings['status'] ?? '0') === '1'
                && ($qualitySettings['ticket_quality_assistant_status'] ?? '0') === '1',
            'autoCheck' => ($qualitySettings['ticket_quality_auto_check'] ?? '0') === '1',
            'minScore' => (int) ($qualitySettings['ticket_quality_min_score'] ?? 60),
            'goodThreshold' => (int) ($qualitySettings['ticket_quality_good_threshold'] ?? 75),
            'fairThreshold' => (int) ($qualitySettings['ticket_quality_fair_threshold'] ?? 60),
        ];

        return Inertia::render('tickets/create', [
            'customer' => $customer,
            'categories' => $categories,
            'labels' => $labels,
            'selectedCategory' => $selectedCategory,
            'websites' => $websites,
            'ticketQualityConfig' => $ticketQualityConfig,
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
            'website_id' => 'nullable|uuid|exists:websites,id',
            'metadata' => 'array',
            'attachments' => 'nullable|array|max:5',
            'attachments.*' => 'file|max:10240|mimes:jpeg,png,gif,webp,pdf,zip,txt,csv,xls,xlsx,doc,docx',
        ]);

        // Get the default status for this organisation
        $defaultStatus = TicketStatus::where('organisation_id', $customer->organisation_id)
            ->where('is_default', true)
            ->first();

        $ticket = Ticket::create([
            'organisation_id' => $customer->organisation_id,
            'customer_id' => $customer->id,
            'website_id' => $validated['website_id'] ?? null,
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

        // Handle file attachments
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $ticket->addMedia($file)
                    ->sanitizingFileName(function($fileName) {
                        return strtolower(str_replace(['#', '/', '\\', ' '], '-', $fileName));
                    })
                    ->toMediaCollection('attachments');
            }
        }

        return redirect()->route('customer.tickets.view')->with('success', 'Ticket created successfully!');
    }

    public function addMessage(Request $request, Ticket $ticket)
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

        $validated = $request->validate([
            'message' => 'required|string',
            'attachments' => 'nullable|array|max:5',
            'attachments.*' => 'file|max:10240|mimes:jpeg,png,gif,webp,pdf,zip,txt,csv,xls,xlsx,doc,docx',
        ]);

        $message = $ticket->messages()->create([
            'user_id' => $user->id,
            'message' => $validated['message'],
            'is_private' => false, // Customer messages are never private
        ]);

        // Handle file attachments
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $message->addMedia($file)
                    ->sanitizingFileName(function($fileName) {
                        return strtolower(str_replace(['#', '/', '\\', ' '], '-', $fileName));
                    })
                    ->toMediaCollection('attachments');
            }
        }

        return back()->with('success', 'Message added successfully');
    }
}
