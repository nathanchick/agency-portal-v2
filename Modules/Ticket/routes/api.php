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
