<?php

use Illuminate\Support\Facades\Route;
use Modules\Website\Http\Controllers\WebsiteController;
use Modules\Website\Http\Controllers\Customer\CustomerWebsiteController;

// Organisation user routes
Route::middleware(['auth', 'verified'])->prefix('websites')->name('websites.')->group(function () {
    Route::get('/', [WebsiteController::class, 'index'])->name('index');
    Route::get('/{id}/performance', [WebsiteController::class, 'performance'])->name('performance');
    Route::get('/{id}/security', [WebsiteController::class, 'security'])->name('security');
});

// Customer user routes
Route::middleware(['auth', 'verified'])->prefix('customer/websites')->name('customer.websites.')->group(function () {
    Route::get('/', [CustomerWebsiteController::class, 'index'])->name('index');
    Route::get('/{id}/performance', [CustomerWebsiteController::class, 'performance'])->name('performance');
    Route::get('/{id}/security', [CustomerWebsiteController::class, 'security'])->name('security');
});
