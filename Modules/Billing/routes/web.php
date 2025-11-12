<?php

use Illuminate\Support\Facades\Route;
use Modules\Billing\Http\Controllers\Customer\BillingController;

/*
|--------------------------------------------------------------------------
| Billing Module Web Routes
|--------------------------------------------------------------------------
|
| Customer-facing billing routes.
| Provides provider-agnostic access to invoices.
|
*/

Route::middleware(['auth', 'verified'])->group(function () {
    // Customer Billing Routes
    Route::prefix('customer/billing')->name('customer.billing.')->group(function () {
        Route::get('/', [BillingController::class, 'index'])->name('index');
        Route::get('/stats', [BillingController::class, 'stats'])->name('stats');
        Route::get('/{id}', [BillingController::class, 'show'])->name('show');
    });
});
