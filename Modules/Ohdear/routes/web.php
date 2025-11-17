<?php

use Illuminate\Support\Facades\Route;
use Modules\Ohdear\Http\Controllers\OhdearController;
use Modules\Ohdear\Http\Controllers\Customer\CustomerOhdearController;

Route::middleware(['auth', 'verified'])->prefix('ohdear')->name('ohdear.')->group(function () {
    Route::post('websites/{websiteId}/setup', [OhdearController::class, 'setup'])->name('setup');
    Route::post('websites/{websiteId}/urls', [OhdearController::class, 'addUrl'])->name('add-url');
    Route::delete('websites/{websiteId}/urls/{ohdearWebsiteId}', [OhdearController::class, 'deleteUrl'])->name('delete-url');
    Route::get('websites/{websiteId}/uptime', [OhdearController::class, 'uptime'])->name('uptime');
    Route::get('websites/{websiteId}/broken-links', [OhdearController::class, 'brokenLinks'])->name('broken-links');
    Route::get('websites/{websiteId}/lighthouse', [OhdearController::class, 'lighthouse'])->name('lighthouse');
    Route::get('websites/{websiteId}/lighthouse/history/{monitorId}', [OhdearController::class, 'lighthouseHistory'])->name('lighthouse-history');
    Route::get('websites/{websiteId}/lighthouse/report/{monitorId}/{reportId}', [OhdearController::class, 'lighthouseReportDetails'])->name('lighthouse-report-details');
    Route::get('websites/{websiteId}/sitemap', [OhdearController::class, 'sitemap'])->name('sitemap');
    Route::put('websites/{websiteId}/sitemap-url', [OhdearController::class, 'updateSitemapUrl'])->name('update-sitemap-url');
});

// Customer Site Health Routes
Route::middleware(['auth', 'verified'])->prefix('customer/health')->name('customer.health.')->group(function () {
    Route::get('{website}/uptime', [CustomerOhdearController::class, 'uptime'])->name('uptime');
    Route::get('{website}/broken-links', [CustomerOhdearController::class, 'brokenLinks'])->name('broken-links');
    Route::get('{website}/lighthouse', [CustomerOhdearController::class, 'lighthouse'])->name('lighthouse');
    Route::get('{website}/sitemap', [CustomerOhdearController::class, 'sitemap'])->name('sitemap');
});
