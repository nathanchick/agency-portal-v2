<?php

use Illuminate\Support\Facades\Route;
use Modules\Billing\Http\Controllers\Customer\BillingController as CustomerBillingController;
use Modules\Billing\Http\Controllers\BillingController;
use Modules\Billing\Http\Controllers\Api\WidgetController;

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
    // Dashboard Widget API Endpoints
    Route::prefix('api/widgets/billing')->name('api.widgets.billing.')->group(function () {
        // Organisation user widgets
        Route::get('/overview', [WidgetController::class, 'overview'])->name('overview');
        Route::get('/outstanding', [WidgetController::class, 'outstanding'])->name('outstanding');
        Route::get('/overdue', [WidgetController::class, 'overdue'])->name('overdue');

        // Customer user widgets
        Route::get('/my-billing', [WidgetController::class, 'myBilling'])->name('my-billing');
    });

    // Customer Billing Routes (customer-facing)
    Route::prefix('customer/billing')->name('customer.billing.')->group(function () {
        Route::get('/', [CustomerBillingController::class, 'index'])->name('index');
        Route::get('/stats', [CustomerBillingController::class, 'stats'])->name('stats');
        Route::get('/{id}', [CustomerBillingController::class, 'show'])->name('show');
    });

    // Organisation Billing Routes (organisation-facing)
    Route::prefix('customers/billing')->name('customers.billing.')->middleware('role:Admin|Manager')->group(function () {
        Route::get('/', [BillingController::class, 'overview'])->name('overview');
        Route::get('/{customer}/stats', [BillingController::class, 'customerStats'])->name('customer.stats');
    });
});
