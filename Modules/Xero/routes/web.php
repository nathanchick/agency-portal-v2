<?php

use Illuminate\Support\Facades\Route;
use Modules\Xero\Http\Controllers\XeroController;
use Modules\Xero\Http\Controllers\XeroInvoiceController;
use Modules\Xero\Http\Controllers\XeroOAuthController;

/*
|--------------------------------------------------------------------------
| Xero Module Web Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'organisation'])->group(function () {
    /*
    |--------------------------------------------------------------------------
    | OAuth Connection Routes
    |--------------------------------------------------------------------------
    |
    | Routes for connecting and disconnecting the organisation to/from Xero
    | via OAuth 2.0 authentication flow.
    |
    */

    Route::prefix('xero/oauth')->name('xero.oauth.')->group(function () {
        Route::get('connect', [XeroOAuthController::class, 'connect'])
            ->name('connect');

        Route::get('callback', [XeroOAuthController::class, 'callback'])
            ->name('callback');

        Route::post('disconnect', [XeroOAuthController::class, 'disconnect'])
            ->name('disconnect');

        Route::get('status', [XeroOAuthController::class, 'status'])
            ->name('status');
    });

    /*
    |--------------------------------------------------------------------------
    | Xero Invoice Routes
    |--------------------------------------------------------------------------
    */

    Route::prefix('xero/invoices')->name('xero.invoices.')->group(function () {
        Route::get('/', [XeroInvoiceController::class, 'index'])->name('index');
        Route::get('/stats', [XeroInvoiceController::class, 'stats'])->name('stats');
        Route::post('/sync', [XeroInvoiceController::class, 'sync'])->name('sync');
        Route::get('/{id}', [XeroInvoiceController::class, 'show'])->name('show');
    });

    /*
    |--------------------------------------------------------------------------
    | Xero Management Routes
    |--------------------------------------------------------------------------
    */

    Route::resource('xeros', XeroController::class)->names('xero');
});
