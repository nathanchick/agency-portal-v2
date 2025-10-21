<?php

use Illuminate\Support\Facades\Route;
use Modules\Ticket\Http\Controllers\TicketController;

/*
|--------------------------------------------------------------------------
| Ticket Module Web Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    // Ticket Portal - Customer users viewing and creating tickets
    Route::get('/tickets', [TicketController::class, 'myTickets'])->name('tickets.view');
    Route::get('/tickets/view/all', [TicketController::class, 'allTickets'])->name('tickets.view.all');
    Route::get('/tickets/create', [TicketController::class, 'create'])->name('tickets.create');
    Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
});
