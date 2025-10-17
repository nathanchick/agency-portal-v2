<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Main Web Routes
 */

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Organisation routes (customer management, projects, websites)
require __DIR__.'/organisation.php';

// Customer routes (tickets, support)
require __DIR__.'/customer.php';

// Settings routes
require __DIR__.'/settings.php';

// Authentication routes
require __DIR__.'/auth.php';
