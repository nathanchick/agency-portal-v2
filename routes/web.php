<?php

use App\Http\Controllers\TicketController;
use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('my-tickets', [TicketController::class, 'myTickets'])->name('my-tickets');
    Route::get('all-tickets', [TicketController::class, 'allTickets'])->name('all-tickets');
    Route::get('tickets/create', [TicketController::class, 'create'])->name('tickets.create');
    Route::post('tickets', [TicketController::class, 'store'])->name('tickets.store');

    Route::resource('customers', CustomerController::class);
    Route::post('customers/{customer}/users/create', [CustomerController::class, 'createUser'])->name('customers.users.create');
    Route::post('customers/{customer}/users', [CustomerController::class, 'attachUser'])->name('customers.users.attach');
    Route::put('customers/{customer}/users/{user}/role', [CustomerController::class, 'updateUserRole'])->name('customers.users.update-role');
    Route::delete('customers/{customer}/users/{user}', [CustomerController::class, 'detachUser'])->name('customers.users.detach');
    Route::post('customers/{customer}/projects', [CustomerController::class, 'storeProject'])->name('customers.projects.store');
    Route::delete('customers/{customer}/projects/{project}', [CustomerController::class, 'destroyProject'])->name('customers.projects.destroy');
    Route::post('customers/{customer}/websites', [CustomerController::class, 'storeWebsite'])->name('customers.websites.store');
    Route::delete('customers/{customer}/websites/{website}', [CustomerController::class, 'destroyWebsite'])->name('customers.websites.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
