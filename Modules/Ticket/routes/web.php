<?php

use Illuminate\Support\Facades\Route;
use Modules\Ticket\Http\Controllers\AutomationRuleController;
use Modules\Ticket\Http\Controllers\Customer\CustomerTicketController;
use Modules\Ticket\Http\Controllers\TicketController;

/*
|--------------------------------------------------------------------------
| Ticket Module Web Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'organisation'])->group(function () {
    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index')->middleware('role:Admin|Manager|User');
    Route::get('/tickets/config', [TicketController::class, 'config'])->name('tickets.config')->middleware('role:Admin|Manager');
    Route::get('/tickets/create', [TicketController::class, 'create'])->name('tickets.create')->middleware('role:Admin|Manager|User');
    Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store')->middleware('role:Admin|Manager|User');

    // Saved filters
    Route::post('/tickets/filters/save', [TicketController::class, 'saveFilter'])->name('tickets.filters.save')->middleware('role:Admin|Manager|User');
    Route::delete('/tickets/filters/{filter}', [TicketController::class, 'destroyFilter'])->name('tickets.filters.destroy')->middleware('role:Admin|Manager|User');

    // Form management
    Route::get('/tickets/forms', [TicketController::class, 'forms'])->name('tickets.forms.index')->middleware('role:Admin|Manager');
    Route::get('/tickets/forms/create', [TicketController::class, 'createForm'])->name('tickets.forms.create')->middleware('role:Admin|Manager');
    Route::post('/tickets/forms', [TicketController::class, 'storeForm'])->name('tickets.forms.store')->middleware('role:Admin|Manager');
    Route::get('/tickets/forms/{ticketForm}/edit', [TicketController::class, 'editForm'])->name('tickets.forms.edit')->middleware('role:Admin|Manager');
    Route::put('/tickets/forms/{ticketForm}', [TicketController::class, 'updateForm'])->name('tickets.forms.update')->middleware('role:Admin|Manager');
    Route::delete('/tickets/forms/{ticketForm}', [TicketController::class, 'destroyForm'])->name('tickets.forms.destroy')->middleware('role:Admin|Manager');

    // Automation Rules
    Route::get('/tickets/automation-rules', [AutomationRuleController::class, 'index'])->name('tickets.automation-rules.index')->middleware('role:Admin|Manager');
    Route::get('/tickets/automation-rules/create', [AutomationRuleController::class, 'create'])->name('tickets.automation-rules.create')->middleware('role:Admin|Manager');
    Route::post('/tickets/automation-rules', [AutomationRuleController::class, 'store'])->name('tickets.automation-rules.store')->middleware('role:Admin|Manager');
    Route::get('/tickets/automation-rules/{automationRule}/edit', [AutomationRuleController::class, 'edit'])->name('tickets.automation-rules.edit')->middleware('role:Admin|Manager');
    Route::put('/tickets/automation-rules/{automationRule}', [AutomationRuleController::class, 'update'])->name('tickets.automation-rules.update')->middleware('role:Admin|Manager');
    Route::delete('/tickets/automation-rules/{automationRule}', [AutomationRuleController::class, 'destroy'])->name('tickets.automation-rules.destroy')->middleware('role:Admin|Manager');
    Route::patch('/tickets/automation-rules/{automationRule}/toggle', [AutomationRuleController::class, 'toggle'])->name('tickets.automation-rules.toggle')->middleware('role:Admin|Manager');
    Route::patch('/tickets/automation-rules/{automationRule}/priority', [AutomationRuleController::class, 'updatePriority'])->name('tickets.automation-rules.priority')->middleware('role:Admin|Manager');

    // Ticket detail and updates (must come after specific routes)
    Route::get('/tickets/{ticket}', [TicketController::class, 'show'])->name('tickets.show')->middleware('role:Admin|Manager|User');
    Route::patch('/tickets/{ticket}/status', [TicketController::class, 'updateStatus'])->name('tickets.update-status')->middleware('role:Admin|Manager|User');
    Route::patch('/tickets/{ticket}/priority', [TicketController::class, 'updatePriority'])->name('tickets.update-priority')->middleware('role:Admin|Manager|User');
    Route::patch('/tickets/{ticket}/assignment', [TicketController::class, 'updateAssignment'])->name('tickets.update-assignment')->middleware('role:Admin|Manager|User');
    Route::patch('/tickets/{ticket}/category', [TicketController::class, 'updateTicketCategory'])->name('tickets.update-category')->middleware('role:Admin|Manager|User');
    Route::post('/tickets/{ticket}/labels', [TicketController::class, 'addLabel'])->name('tickets.add-label')->middleware('role:Admin|Manager|User');
    Route::delete('/tickets/{ticket}/labels/{label}', [TicketController::class, 'removeLabel'])->name('tickets.remove-label')->middleware('role:Admin|Manager|User');
    Route::post('/tickets/{ticket}/messages', [TicketController::class, 'addMessage'])->name('tickets.add-message')->middleware('role:Admin|Manager|User');

    // Label management
    Route::post('/tickets/labels', [TicketController::class, 'storeLabel'])->name('tickets.labels.store')->middleware('role:Admin|Manager');
    Route::put('/tickets/labels/{label}', [TicketController::class, 'updateLabel'])->name('tickets.labels.update')->middleware('role:Admin|Manager');
    Route::delete('/tickets/labels/{label}', [TicketController::class, 'destroyLabel'])->name('tickets.labels.destroy')->middleware('role:Admin|Manager');

    // Category management
    Route::post('/tickets/categories', [TicketController::class, 'storeCategory'])->name('tickets.categories.store')->middleware('role:Admin|Manager');
    Route::put('/tickets/categories/{category}', [TicketController::class, 'updateCategory'])->name('tickets.categories.update')->middleware('role:Admin|Manager');
    Route::delete('/tickets/categories/{category}', [TicketController::class, 'destroyCategory'])->name('tickets.categories.destroy')->middleware('role:Admin|Manager');

    // Status management
    Route::post('/tickets/statuses', [TicketController::class, 'storeStatusDefinition'])->name('tickets.statuses.store')->middleware('role:Admin|Manager');
    Route::put('/tickets/statuses/{ticketStatus}', [TicketController::class, 'updateStatusDefinition'])->name('tickets.statuses.update')->middleware('role:Admin|Manager');
    Route::delete('/tickets/statuses/{ticketStatus}', [TicketController::class, 'destroyStatusDefinition'])->name('tickets.statuses.destroy')->middleware('role:Admin|Manager');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Ticket Portal - Customer users viewing and creating tickets
    Route::get('/customer/tickets', [CustomerTicketController::class, 'myTickets'])->name('customer.tickets.view');
    Route::get('/customer/tickets/view/all', [CustomerTicketController::class, 'allTickets'])->name('customer.tickets.view.all');
    Route::get('/customer/tickets/view/closed', [CustomerTicketController::class, 'closedTickets'])->name('customer.tickets.view.closed');
    Route::get('/customer/tickets/create', [CustomerTicketController::class, 'create'])->name('customer.tickets.create');
    Route::post('/customer/tickets', [CustomerTicketController::class, 'store'])->name('customer.tickets.store');
    Route::get('/customer/tickets/{ticket}', [CustomerTicketController::class, 'show'])->name('customer.tickets.show');
});
