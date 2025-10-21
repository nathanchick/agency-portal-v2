<?php

use Illuminate\Support\Facades\Route;
use Modules\Webhook\Http\Controllers\WebhookController;

/**
 * Webhook Routes
 */
Route::middleware(['auth', 'verified', 'organisation'])->group(function () {
    // Webhooks - Only Admin can access
    Route::get('/webhooks', [WebhookController::class, 'index'])->name('webhooks.index')->middleware('role:Admin');
    Route::get('/webhooks/jobs', [WebhookController::class, 'jobs'])->name('webhooks.jobs')->middleware('role:Admin');
    Route::get('/webhooks/create', [WebhookController::class, 'create'])->name('webhooks.create')->middleware('role:Admin');
    Route::post('/webhooks', [WebhookController::class, 'store'])->name('webhooks.store')->middleware('role:Admin');
    Route::get('/webhooks/{webhook}/edit', [WebhookController::class, 'edit'])->name('webhooks.edit')->middleware('role:Admin');
    Route::put('/webhooks/{webhook}', [WebhookController::class, 'update'])->name('webhooks.update')->middleware('role:Admin');
    Route::delete('/webhooks/{webhook}', [WebhookController::class, 'destroy'])->name('webhooks.destroy')->middleware('role:Admin');
    Route::post('/webhooks/{webhook}/toggle', [WebhookController::class, 'toggle'])->name('webhooks.toggle')->middleware('role:Admin');
    Route::post('/webhooks/{webhook}/regenerate-secret', [WebhookController::class, 'regenerateSecret'])->name('webhooks.regenerate-secret')->middleware('role:Admin');
});
