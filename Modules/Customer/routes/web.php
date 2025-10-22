<?php

use Illuminate\Support\Facades\Route;
use Modules\Customer\Http\Controllers\CustomerController;

/*
|--------------------------------------------------------------------------
| Customer Module Web Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'organisation'])->group(function () {
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
});

/**
 * Customer Switching (available to all authenticated users)
 */
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/customer/switch', [\Modules\Customer\Http\Controllers\CustomerSwitcherController::class, 'switch'])->name('customer.switch');
});
