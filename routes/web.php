<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Main Web Routes
 */
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

/**
 * Global authenticated routes
 */
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Organisation Switcher - moved to Modules/Organisation/routes/web.php

    // Team Management - Admin only
    Route::resource('team', \App\Http\Controllers\TeamController::class)
        ->middleware('role:Admin');
    Route::put('team/{team}/update-role', [\App\Http\Controllers\TeamController::class, 'updateRole'])
        ->name('team.update-role')
        ->middleware('role:Admin');
    Route::post('team/{team}/resend-invite', [\App\Http\Controllers\TeamController::class, 'resendInvite'])
        ->name('team.resend-invite')
        ->middleware('role:Admin');

    // Notification routes
    Route::prefix('notifications')->name('notifications.')->group(function () {
        Route::get('/', [\App\Http\Controllers\NotificationController::class, 'index'])->name('index');
        Route::get('/unread-count', [\App\Http\Controllers\NotificationController::class, 'unreadCount'])->name('unread-count');
        Route::post('/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('mark-as-read');
        Route::post('/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead'])->name('mark-all-as-read');
        Route::delete('/{id}', [\App\Http\Controllers\NotificationController::class, 'destroy'])->name('destroy');
    });
});

// Organisation routes (customer management, projects, websites)
require __DIR__.'/organisation.php';

// Customer routes (tickets, support)
require __DIR__.'/customer.php';

// Settings routes
require __DIR__.'/settings.php';

// Authentication routes
require __DIR__.'/auth.php';
