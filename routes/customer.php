<?php

use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

/**
 * Customer Routes
 *
 * These routes are for customer users accessing tickets and support features
 */

Route::middleware(['auth', 'verified'])->group(function () {
    // Tickets
    Route::get('/tickets', [TicketController::class, 'myTickets'])->name('tickets.view');
    Route::get('/tickets/view/all', [TicketController::class, 'allTickets'])->name('tickets.view.all');
    Route::get('/tickets/create', [TicketController::class, 'create'])->name('tickets.create');
    Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
});
