<?php

use Illuminate\Support\Facades\Route;
use Modules\Deployment\Http\Controllers\Customer\CustomerDeploymentController;
use Modules\Deployment\Http\Controllers\DeploymentController;

/**
 * Deployment Management Routes (Organisation Users Only)
 */
Route::middleware(['auth', 'verified', 'organisation'])->group(function () {
    Route::get('/deployments', [DeploymentController::class, 'index'])->name('deployments.index');
    Route::get('/deployments/config', [DeploymentController::class, 'config'])->name('deployments.config');
    Route::post('/deployments', [DeploymentController::class, 'store'])->name('deployments.store');
    Route::delete('/deployments/{deployment}', [DeploymentController::class, 'destroy'])->name('deployments.destroy');
});

/**
 * Customer Deployment Routes (Customer Users)
 */
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/customer/deployments', [CustomerDeploymentController::class, 'index'])->name('customer.deployments.index');

    // Widget API endpoints
    Route::prefix('api/widgets/deployments')->name('api.widgets.deployments.')->group(function () {
        Route::get('recent-customer', [\Modules\Deployment\Http\Controllers\Api\Widget\DeploymentWidgetController::class, 'recentCustomerDeployments'])->name('recent-customer');
    });
});
