<?php

namespace Modules\Ticket\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Ticket\Models\Ticket;
use Modules\Ticket\Models\Category;
use Modules\Ticket\Models\Label;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
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

    public function create()
    {
        $categories = Category::where('is_visible', true)->get();
        $labels = Label::where('is_visible', true)->get();

        return Inertia::render('tickets/create', [
            'categories' => $categories,
            'labels' => $labels,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'priority' => 'required|in:low,medium,high',
            'category_ids' => 'array',
            'category_ids.*' => 'exists:categories,id',
            'label_ids' => 'array',
            'label_ids.*' => 'exists:labels,id',
        ]);

        $ticket = auth()->user()->tickets()->create([
            'title' => $validated['title'],
            'message' => $validated['message'],
            'priority' => $validated['priority'],
            'status' => 'open',
        ]);

        if (!empty($validated['category_ids'])) {
            $ticket->categories()->attach($validated['category_ids']);
        }

        if (!empty($validated['label_ids'])) {
            $ticket->labels()->attach($validated['label_ids']);
        }

        return redirect()->route('tickets.view')->with('success', 'Ticket created successfully!');
    }
}
