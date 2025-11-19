<?php

use App\Http\Controllers\Api\Extension\ExtensionOrganisationController;
use App\Http\Controllers\Extension\TokenController;
use Illuminate\Support\Facades\Route;

/**
 * API Routes
 *
 * These routes are for external systems accessing the API via API tokens
 *
 * API routes have been moved to their respective modules:
 * - Customer API → Modules/Customer/routes/api.php
 * - Ticket API → Modules/Ticket/routes/api.php
 * - Document Request API → Modules/Document/routes/api.php
 */

// Extension token validation endpoint (no auth required - validates itself)
Route::post('/extension/auth/validate', [TokenController::class, 'validate'])->name('extension.auth.validate');

// Extension organisation list (requires basic token auth, no org context needed)
Route::middleware(['extension.token'])->prefix('extension')->name('extension.')->group(function () {
    Route::get('/organisations', [ExtensionOrganisationController::class, 'list'])->name('organisations');
});
