<?php

use Illuminate\Support\Facades\Route;
use Modules\Customer\Http\Controllers\Api\CustomerController;
use Modules\Customer\Http\Controllers\Api\ProjectController;
use Modules\Customer\Http\Controllers\Api\WebsiteController;

/*
|--------------------------------------------------------------------------
| Customer Module API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('api.token')->prefix('organisations/{organisation}')->name('api.')->group(function () {
    // Customer API endpoints
    Route::apiResource('customers', CustomerController::class);

    // Project API endpoints
    Route::apiResource('projects', ProjectController::class);

    // Website API endpoints
    Route::apiResource('websites', WebsiteController::class);
});
