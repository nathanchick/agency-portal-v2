<?php

use Illuminate\Support\Facades\Route;
use Modules\ClickUp\Http\Controllers\ClickUpSpaceController;
use Modules\ClickUp\Http\Controllers\ClickUpTaskController;

/*
|--------------------------------------------------------------------------
| ClickUp API Routes
|--------------------------------------------------------------------------
|
| API routes for ClickUp integration.
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    // Space routes
    Route::get('/v1/clickup/spaces', [ClickUpSpaceController::class, 'index'])->name('clickup.spaces.index');

    // Task routes
    Route::post('/v1/tickets/{ticket}/clickup-task', [ClickUpTaskController::class, 'store'])->name('clickup.tasks.store');
    Route::get('/v1/tickets/{ticket}/clickup-task', [ClickUpTaskController::class, 'show'])->name('clickup.tasks.show');
});
