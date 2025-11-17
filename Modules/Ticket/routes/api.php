<?php

use Illuminate\Support\Facades\Route;
use Modules\Ticket\Http\Controllers\Api\TicketController;
use Modules\Ticket\Http\Controllers\Api\Widget\TicketWidgetController;

/*
|--------------------------------------------------------------------------
| Ticket Module API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('api.token')->prefix('organisations/{organisation}')->name('api.')->group(function () {
    // Ticket API endpoints
    Route::apiResource('tickets', TicketController::class);
});

/*
|--------------------------------------------------------------------------
| Widget API Routes
|--------------------------------------------------------------------------
| These routes provide data for dashboard widgets.
| They require authentication but don't use API token middleware.
*/

Route::middleware(['auth', 'verified'])->prefix('widgets/tickets')->name('api.widgets.tickets.')->group(function () {
    Route::get('recent', [TicketWidgetController::class, 'recent'])->name('recent');
    Route::get('statistics', [TicketWidgetController::class, 'statistics'])->name('statistics');
});
