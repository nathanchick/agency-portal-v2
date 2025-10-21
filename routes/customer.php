<?php

use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;

/**
 * Customer Routes
 *
 * These routes are for customer users accessing tickets and support features
 */

Route::middleware(['auth', 'verified'])->group(function () {
    // Documents
    Route::get('/customer/documents/my-pending', [\App\Http\Controllers\CustomerDocumentController::class, 'myPending'])->name('customer.documents.my-pending');
    Route::get('/customer/documents/my-completed', [\App\Http\Controllers\CustomerDocumentController::class, 'myCompleted'])->name('customer.documents.my-completed');
    Route::get('/customer/documents/all-pending', [\App\Http\Controllers\CustomerDocumentController::class, 'allPending'])->name('customer.documents.all-pending');
    Route::get('/customer/documents/all-completed', [\App\Http\Controllers\CustomerDocumentController::class, 'allCompleted'])->name('customer.documents.all-completed');
    Route::get('/customer/documents/{id}/view-sign', [\App\Http\Controllers\CustomerDocumentController::class, 'viewSign'])->name('customer.documents.view-sign');
    Route::post('/customer/documents/{id}/approve', [\App\Http\Controllers\CustomerDocumentController::class, 'approve'])->name('customer.documents.approve');
    Route::post('/customer/documents/{id}/decline', [\App\Http\Controllers\CustomerDocumentController::class, 'decline'])->name('customer.documents.decline');

    // Tickets
    Route::get('/tickets', [TicketController::class, 'myTickets'])->name('tickets.view');
    Route::get('/tickets/view/all', [TicketController::class, 'allTickets'])->name('tickets.view.all');
    Route::get('/tickets/create', [TicketController::class, 'create'])->name('tickets.create');
    Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
});
