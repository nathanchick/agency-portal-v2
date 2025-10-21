<?php

use Illuminate\Support\Facades\Route;
use Modules\Document\Http\Controllers\Api\DocumentRequestController;

/**
 * Document API Routes
 */
Route::middleware('api.token')->prefix('organisations/{organisation}')->name('api.')->group(function () {
    // Document Request API endpoints
    Route::apiResource('document-requests', DocumentRequestController::class);
});
