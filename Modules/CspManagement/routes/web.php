<?php

use Illuminate\Support\Facades\Route;
use Modules\CspManagement\Http\Controllers\Customer\CustomerCspViolationController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Customer CSP Management Routes
    Route::prefix('customer')->name('customer.')->group(function () {
        Route::get('csp-violations', [CustomerCspViolationController::class, 'index'])
            ->name('csp.violations.index');

        Route::get('csp-violations/resolved', [CustomerCspViolationController::class, 'resolved'])
            ->name('csp.violations.resolved');

        Route::get('csp-violations/audit', [CustomerCspViolationController::class, 'audit'])
            ->name('csp.violations.audit');

        Route::get('csp-violations/audit/export', [CustomerCspViolationController::class, 'exportAudit'])
            ->name('csp.violations.audit.export');

        Route::get('csp-violations/policy/{website}', [CustomerCspViolationController::class, 'showPolicy'])
            ->name('csp.violations.policy');

        Route::get('csp-violations/host/{host}/{directive}', [CustomerCspViolationController::class, 'showHost'])
            ->name('csp.violations.showHost');

        Route::get('csp-violations/{id}', [CustomerCspViolationController::class, 'show'])
            ->name('csp.violations.show');

        Route::post('csp-violations/approve', [CustomerCspViolationController::class, 'approve'])
            ->name('csp.violations.approve');

        Route::post('csp-violations/reject', [CustomerCspViolationController::class, 'reject'])
            ->name('csp.violations.reject');

        Route::post('csp-violations/ignore', [CustomerCspViolationController::class, 'ignore'])
            ->name('csp.violations.ignore');

        Route::post('csp-violations/sync', [CustomerCspViolationController::class, 'sync'])
            ->name('csp.violations.sync');
    });
});
