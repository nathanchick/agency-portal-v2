<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

/**
 * Organisation Routes
 *
 * These routes are for organisation users managing customers, projects, and websites
 */

Route::middleware(['auth', 'verified'])->group(function () {
    // Customer Management
    Route::resource('customers', CustomerController::class);

    // Customer Users
    Route::post('customers/{customer}/users/create', [CustomerController::class, 'createUser'])->name('customers.users.create');
    Route::post('customers/{customer}/users', [CustomerController::class, 'attachUser'])->name('customers.users.attach');
    Route::put('customers/{customer}/users/{user}/role', [CustomerController::class, 'updateUserRole'])->name('customers.users.update-role');
    Route::delete('customers/{customer}/users/{user}', [CustomerController::class, 'detachUser'])->name('customers.users.detach');

    // Projects
    Route::post('customers/{customer}/projects', [CustomerController::class, 'storeProject'])->name('customers.projects.store');
    Route::put('customers/{customer}/projects/{project}', [CustomerController::class, 'updateProject'])->name('customers.projects.update');
    Route::delete('customers/{customer}/projects/{project}', [CustomerController::class, 'destroyProject'])->name('customers.projects.destroy');

    // Websites
    Route::post('customers/{customer}/websites', [CustomerController::class, 'storeWebsite'])->name('customers.websites.store');
    Route::put('customers/{customer}/websites/{website}', [CustomerController::class, 'updateWebsite'])->name('customers.websites.update');
    Route::put('customers/{customer}/websites/{website}/project', [CustomerController::class, 'updateWebsiteProject'])->name('customers.websites.update-project');
    Route::delete('customers/{customer}/websites/{website}', [CustomerController::class, 'destroyWebsite'])->name('customers.websites.destroy');
});
