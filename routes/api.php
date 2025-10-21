<?php

use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\DocumentRequestController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\WebsiteController;
use App\Http\Controllers\Api\TicketController;
use Illuminate\Support\Facades\Route;

/**
 * API Routes
 *
 * These routes are for external systems accessing the API via API tokens
 */

Route::middleware('api.token')->prefix('organisations/{organisation}')->name('api.')->group(function () {
    // Customer API endpoints
    Route::apiResource('customers', CustomerController::class);

    // Document Request API endpoints
    Route::apiResource('document-requests', DocumentRequestController::class);

    // Project API endpoints
    Route::apiResource('projects', ProjectController::class);

    // Website API endpoints
    Route::apiResource('websites', WebsiteController::class);

    // Ticket API endpoints
    Route::apiResource('tickets', TicketController::class);
});