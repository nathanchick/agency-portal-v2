<?php

use Illuminate\Support\Facades\Route;
use Modules\Ticket\Http\Controllers\Api\TicketController;

/*
|--------------------------------------------------------------------------
| Ticket Module API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('api.token')->prefix('organisations/{organisation}')->name('api.')->group(function () {
    // Ticket API endpoints
    Route::apiResource('tickets', TicketController::class);
});
