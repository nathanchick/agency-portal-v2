<?php

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
