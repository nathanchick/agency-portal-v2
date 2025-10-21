<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

/**
 * Organisation Routes
 *
 * These routes are for organisation users managing customers, projects, and websites
 */

Route::middleware(['auth', 'verified', 'organisation'])->group(function () {
    // Document Types - Only Admin can access
    Route::resource('document-types', \App\Http\Controllers\DocumentTypeController::class)->middleware('role:Admin');
    // Secure file download/preview routes with organization verification
    Route::get('document-types/{document}/download', [\App\Http\Controllers\DocumentTypeController::class, 'download'])->name('document-types.download')->middleware('role:Admin');
    Route::get('document-types/{document}/preview', [\App\Http\Controllers\DocumentTypeController::class, 'preview'])->name('document-types.preview')->middleware('role:Admin');

    // Document Management - All organisation users can access
    Route::get('/documents/pending', [\App\Http\Controllers\DocumentController::class, 'pending'])->name('documents.pending');
    Route::get('/documents/completed', [\App\Http\Controllers\DocumentController::class, 'completed'])->name('documents.completed');
    Route::get('/documents/create', [\App\Http\Controllers\DocumentController::class, 'create'])->name('documents.create');
    Route::post('/documents', [\App\Http\Controllers\DocumentController::class, 'store'])->name('documents.store');
    Route::get('/documents/{documentRequest}/edit', [\App\Http\Controllers\DocumentController::class, 'edit'])->name('documents.edit');
    Route::put('/documents/{documentRequest}', [\App\Http\Controllers\DocumentController::class, 'update'])->name('documents.update');
    Route::post('/documents/{documentRequest}/void', [\App\Http\Controllers\DocumentController::class, 'void'])->name('documents.void');
    Route::post('/documents/{documentRequest}/resend', [\App\Http\Controllers\DocumentController::class, 'resend'])->name('documents.resend');

    // Customer Management - Only Admin and Manager can access
    Route::resource('customers', CustomerController::class)->middleware('role:Admin|Manager');

    // Customer Users - Only Admin and Manager can manage users
    Route::post('customers/{customer}/users/create', [CustomerController::class, 'createUser'])->name('customers.users.create')->middleware('role:Admin|Manager');
    Route::post('customers/{customer}/users', [CustomerController::class, 'attachUser'])->name('customers.users.attach')->middleware('role:Admin|Manager');
    Route::put('customers/{customer}/users/{user}/role', [CustomerController::class, 'updateUserRole'])->name('customers.users.update-role')->middleware('role:Admin|Manager');
    Route::delete('customers/{customer}/users/{user}', [CustomerController::class, 'detachUser'])->name('customers.users.detach')->middleware('role:Admin|Manager');

    // Projects - All organisation users can manage
    Route::post('customers/{customer}/projects', [CustomerController::class, 'storeProject'])->name('customers.projects.store')->middleware('role:Admin|Manager|User');
    Route::put('customers/{customer}/projects/{project}', [CustomerController::class, 'updateProject'])->name('customers.projects.update')->middleware('role:Admin|Manager|User');
    Route::delete('customers/{customer}/projects/{project}', [CustomerController::class, 'destroyProject'])->name('customers.projects.destroy')->middleware('role:Admin|Manager');

    // Websites - All organisation users can manage
    Route::post('customers/{customer}/websites', [CustomerController::class, 'storeWebsite'])->name('customers.websites.store')->middleware('role:Admin|Manager|User');
    Route::put('customers/{customer}/websites/{website}', [CustomerController::class, 'updateWebsite'])->name('customers.websites.update')->middleware('role:Admin|Manager|User');
    Route::put('customers/{customer}/websites/{website}/project', [CustomerController::class, 'updateWebsiteProject'])->name('customers.websites.update-project')->middleware('role:Admin|Manager|User');
    Route::delete('customers/{customer}/websites/{website}', [CustomerController::class, 'destroyWebsite'])->name('customers.websites.destroy')->middleware('role:Admin|Manager');

    // Webhooks - Only Admin can access
    Route::get('/webhooks', [\App\Http\Controllers\WebhookController::class, 'index'])->name('webhooks.index')->middleware('role:Admin');
    Route::get('/webhooks/jobs', [\App\Http\Controllers\WebhookController::class, 'jobs'])->name('webhooks.jobs')->middleware('role:Admin');
    Route::get('/webhooks/create', [\App\Http\Controllers\WebhookController::class, 'create'])->name('webhooks.create')->middleware('role:Admin');
    Route::post('/webhooks', [\App\Http\Controllers\WebhookController::class, 'store'])->name('webhooks.store')->middleware('role:Admin');
    Route::get('/webhooks/{webhook}/edit', [\App\Http\Controllers\WebhookController::class, 'edit'])->name('webhooks.edit')->middleware('role:Admin');
    Route::put('/webhooks/{webhook}', [\App\Http\Controllers\WebhookController::class, 'update'])->name('webhooks.update')->middleware('role:Admin');
    Route::delete('/webhooks/{webhook}', [\App\Http\Controllers\WebhookController::class, 'destroy'])->name('webhooks.destroy')->middleware('role:Admin');
    Route::post('/webhooks/{webhook}/toggle', [\App\Http\Controllers\WebhookController::class, 'toggle'])->name('webhooks.toggle')->middleware('role:Admin');
    Route::post('/webhooks/{webhook}/regenerate-secret', [\App\Http\Controllers\WebhookController::class, 'regenerateSecret'])->name('webhooks.regenerate-secret')->middleware('role:Admin');

    // API Tokens - Only Admin can access
    Route::get('/api-tokens', [\App\Http\Controllers\ApiTokenController::class, 'index'])->name('api-tokens.index')->middleware('role:Admin');
    Route::get('/api-tokens/create', [\App\Http\Controllers\ApiTokenController::class, 'create'])->name('api-tokens.create')->middleware('role:Admin');
    Route::post('/api-tokens', [\App\Http\Controllers\ApiTokenController::class, 'store'])->name('api-tokens.store')->middleware('role:Admin');
    Route::get('/api-tokens/{apiToken}', [\App\Http\Controllers\ApiTokenController::class, 'show'])->name('api-tokens.show')->middleware('role:Admin');
    Route::get('/api-tokens/{apiToken}/edit', [\App\Http\Controllers\ApiTokenController::class, 'edit'])->name('api-tokens.edit')->middleware('role:Admin');
    Route::put('/api-tokens/{apiToken}', [\App\Http\Controllers\ApiTokenController::class, 'update'])->name('api-tokens.update')->middleware('role:Admin');
    Route::delete('/api-tokens/{apiToken}', [\App\Http\Controllers\ApiTokenController::class, 'destroy'])->name('api-tokens.destroy')->middleware('role:Admin');
});
