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

    // Organisation Switcher
    Route::post('/organisation/switch', [\App\Http\Controllers\OrganisationController::class, 'switch'])
        ->name('organisation.switch');

    // Team Management - Admin only
    Route::resource('team', \App\Http\Controllers\TeamController::class)
        ->middleware('role:Admin');
    Route::put('team/{team}/update-role', [\App\Http\Controllers\TeamController::class, 'updateRole'])
        ->name('team.update-role')
        ->middleware('role:Admin');
    Route::post('team/{team}/resend-invite', [\App\Http\Controllers\TeamController::class, 'resendInvite'])
        ->name('team.resend-invite')
        ->middleware('role:Admin');
});

// Organisation routes (customer management, projects, websites)
require __DIR__.'/organisation.php';

// Customer routes (tickets, support)
require __DIR__.'/customer.php';

// Settings routes
require __DIR__.'/settings.php';

// Authentication routes
require __DIR__.'/auth.php';
