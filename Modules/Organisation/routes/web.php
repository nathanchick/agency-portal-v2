<?php

use Illuminate\Support\Facades\Route;
use Modules\Organisation\Http\Controllers\ApiTokenController;
use Modules\Organisation\Http\Controllers\OrganisationController;

/**
 * Organisation Management Routes
 */
Route::middleware(['auth', 'verified', 'organisation'])->group(function () {
    // API Tokens - Only Admin can access
    Route::get('/api-tokens', [ApiTokenController::class, 'index'])->name('api-tokens.index')->middleware('role:Admin');
    Route::get('/api-tokens/create', [ApiTokenController::class, 'create'])->name('api-tokens.create')->middleware('role:Admin');
    Route::post('/api-tokens', [ApiTokenController::class, 'store'])->name('api-tokens.store')->middleware('role:Admin');
    Route::get('/api-tokens/{apiToken}', [ApiTokenController::class, 'show'])->name('api-tokens.show')->middleware('role:Admin');
    Route::get('/api-tokens/{apiToken}/edit', [ApiTokenController::class, 'edit'])->name('api-tokens.edit')->middleware('role:Admin');
    Route::put('/api-tokens/{apiToken}', [ApiTokenController::class, 'update'])->name('api-tokens.update')->middleware('role:Admin');
    Route::delete('/api-tokens/{apiToken}', [ApiTokenController::class, 'destroy'])->name('api-tokens.destroy')->middleware('role:Admin');
});

/**
 * Organisation Switching (available to all authenticated users)
 */
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/organisation/switch', [OrganisationController::class, 'switch'])->name('organisation.switch');
});
