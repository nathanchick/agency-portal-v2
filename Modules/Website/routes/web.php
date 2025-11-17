<?php

use Illuminate\Support\Facades\Route;
use Modules\Website\Http\Controllers\WebsiteController;
use Modules\Website\Http\Controllers\Customer\CustomerWebsiteController;

// Organisation user routes
Route::middleware(['auth', 'verified', 'organisation'])->prefix('websites')->name('websites.')->group(function () {
    Route::get('/', [WebsiteController::class, 'index'])->name('index');
    Route::get('/{id}/edit', [WebsiteController::class, 'edit'])->name('edit');
    Route::put('/{id}', [WebsiteController::class, 'update'])->name('update');
    Route::patch('/{id}/modules', [WebsiteController::class, 'updateModuleSettings'])->name('modules.update');
    Route::get('/{id}/performance', [WebsiteController::class, 'performance'])->name('performance');
    Route::get('/{id}/performance/uptime', [WebsiteController::class, 'performanceUptime'])->name('performance.uptime');
    Route::get('/{id}/performance/broken-links', [WebsiteController::class, 'performanceBrokenLinks'])->name('performance.broken-links');
    Route::get('/{id}/performance/lighthouse', [WebsiteController::class, 'performanceLighthouse'])->name('performance.lighthouse');
    Route::get('/{id}/performance/sitemap', [WebsiteController::class, 'performanceSitemap'])->name('performance.sitemap');
    Route::get('/{id}/security', [WebsiteController::class, 'security'])->name('security');
});

// Customer user routes
Route::middleware(['auth', 'verified'])->prefix('customer/websites')->name('customer.websites.')->group(function () {
    Route::get('/', [CustomerWebsiteController::class, 'index'])->name('index');
    Route::get('/{id}/performance', [CustomerWebsiteController::class, 'performance'])->name('performance');
    Route::get('/{id}/performance/uptime', [CustomerWebsiteController::class, 'performanceUptime'])->name('performance.uptime');
    Route::get('/{id}/performance/broken-links', [CustomerWebsiteController::class, 'performanceBrokenLinks'])->name('performance.broken-links');
    Route::get('/{id}/performance/lighthouse', [CustomerWebsiteController::class, 'performanceLighthouse'])->name('performance.lighthouse');
    Route::get('/{id}/performance/sitemap', [CustomerWebsiteController::class, 'performanceSitemap'])->name('performance.sitemap');
    Route::get('/{id}/security', [CustomerWebsiteController::class, 'security'])->name('security');
});
