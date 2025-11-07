<?php

use Illuminate\Support\Facades\Route;
use Modules\Timesheet\Http\Controllers\Customer\CustomerReportController;
use Modules\Timesheet\Http\Controllers\Customer\CustomerServiceController;
use Modules\Timesheet\Http\Controllers\ReportController;
use Modules\Timesheet\Http\Controllers\SavedReportController;
use Modules\Timesheet\Http\Controllers\ScheduledReportController;
use Modules\Timesheet\Http\Controllers\ServiceBudgetPeriodController;
use Modules\Timesheet\Http\Controllers\ServiceController;
use Modules\Timesheet\Http\Controllers\TaskController;
use Modules\Timesheet\Http\Controllers\TimeEntryController;

/*
|--------------------------------------------------------------------------
| Timesheet Module Web Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'organisation'])->group(function () {
    // Time Entries
    Route::get('/timesheet/entries', [TimeEntryController::class, 'index'])->name('timesheet.entries.index')->middleware('role:Admin|Manager|User');
    Route::get('/timesheet/entries/create', [TimeEntryController::class, 'create'])->name('timesheet.entries.create')->middleware('role:Admin|Manager|User');
    Route::post('/timesheet/entries', [TimeEntryController::class, 'store'])->name('timesheet.entries.store')->middleware('role:Admin|Manager|User');
    Route::get('/timesheet/entries/{timeEntry}/edit', [TimeEntryController::class, 'edit'])->name('timesheet.entries.edit')->middleware('role:Admin|Manager|User');
    Route::put('/timesheet/entries/{timeEntry}', [TimeEntryController::class, 'update'])->name('timesheet.entries.update')->middleware('role:Admin|Manager|User');
    Route::delete('/timesheet/entries/{timeEntry}', [TimeEntryController::class, 'destroy'])->name('timesheet.entries.destroy')->middleware('role:Admin|Manager|User');

    // Timer functionality
    Route::post('/timesheet/timer/start', [TimeEntryController::class, 'startTimer'])->name('timesheet.timer.start')->middleware('role:Admin|Manager|User');
    Route::post('/timesheet/timer/{timeEntry}/stop', [TimeEntryController::class, 'stopTimer'])->name('timesheet.timer.stop')->middleware('role:Admin|Manager|User');

    // Services
    Route::get('/timesheet/services', [ServiceController::class, 'index'])->name('timesheet.services.index')->middleware('role:Admin|Manager');
    Route::get('/timesheet/services/create', [ServiceController::class, 'create'])->name('timesheet.services.create')->middleware('role:Admin|Manager');
    Route::post('/timesheet/services', [ServiceController::class, 'store'])->name('timesheet.services.store')->middleware('role:Admin|Manager');
    Route::get('/timesheet/services/{service}', [ServiceController::class, 'show'])->name('timesheet.services.show')->middleware('role:Admin|Manager');
    Route::get('/timesheet/services/{service}/edit', [ServiceController::class, 'edit'])->name('timesheet.services.edit')->middleware('role:Admin|Manager');
    Route::put('/timesheet/services/{service}', [ServiceController::class, 'update'])->name('timesheet.services.update')->middleware('role:Admin|Manager');
    Route::delete('/timesheet/services/{service}', [ServiceController::class, 'destroy'])->name('timesheet.services.destroy')->middleware('role:Admin|Manager');

    // Service Tasks
    Route::post('/timesheet/services/{service}/tasks/attach', [ServiceController::class, 'attachTask'])->name('timesheet.services.tasks.attach')->middleware('role:Admin|Manager');
    Route::delete('/timesheet/services/{service}/tasks/{task}', [ServiceController::class, 'detachTask'])->name('timesheet.services.tasks.detach')->middleware('role:Admin|Manager');

    // Service Users
    Route::post('/timesheet/services/{service}/users/attach', [ServiceController::class, 'attachUser'])->name('timesheet.services.users.attach')->middleware('role:Admin|Manager');
    Route::delete('/timesheet/services/{service}/users/{user}', [ServiceController::class, 'detachUser'])->name('timesheet.services.users.detach')->middleware('role:Admin|Manager');

    // Budget Adjustments
    Route::post('/timesheet/services/{service}/budget-adjustments', [ServiceController::class, 'storeBudgetAdjustment'])->name('timesheet.services.budget-adjustments.store')->middleware('role:Admin|Manager');

    // Budget Periods
    Route::get('/timesheet/services/{service}/budget-periods', [ServiceBudgetPeriodController::class, 'index'])->name('timesheet.services.budget-periods.index')->middleware('role:Admin|Manager');
    Route::get('/timesheet/services/{service}/budget-periods/ledger', [ServiceBudgetPeriodController::class, 'ledger'])->name('timesheet.services.budget-periods.ledger')->middleware('role:Admin|Manager');
    Route::get('/timesheet/services/{service}/budget-periods/{period}', [ServiceBudgetPeriodController::class, 'show'])->name('timesheet.services.budget-periods.show')->middleware('role:Admin|Manager');
    Route::post('/timesheet/services/{service}/budget-periods/{period}/reconcile', [ServiceBudgetPeriodController::class, 'reconcile'])->name('timesheet.services.budget-periods.reconcile')->middleware('role:Admin|Manager');

    // Tasks
    Route::get('/timesheet/tasks', [TaskController::class, 'index'])->name('timesheet.tasks.index')->middleware('role:Admin|Manager');
    Route::get('/timesheet/tasks/create', [TaskController::class, 'create'])->name('timesheet.tasks.create')->middleware('role:Admin|Manager');
    Route::post('/timesheet/tasks', [TaskController::class, 'store'])->name('timesheet.tasks.store')->middleware('role:Admin|Manager');
    Route::get('/timesheet/tasks/{task}/edit', [TaskController::class, 'edit'])->name('timesheet.tasks.edit')->middleware('role:Admin|Manager');
    Route::put('/timesheet/tasks/{task}', [TaskController::class, 'update'])->name('timesheet.tasks.update')->middleware('role:Admin|Manager');
    Route::delete('/timesheet/tasks/{task}', [TaskController::class, 'destroy'])->name('timesheet.tasks.destroy')->middleware('role:Admin|Manager');

    // Reports
    Route::get('/timesheet/reports', [ReportController::class, 'index'])->name('timesheet.reports.index')->middleware('role:Admin|Manager');
    Route::post('/timesheet/reports/generate', [ReportController::class, 'generate'])->name('timesheet.reports.generate')->middleware('role:Admin|Manager');
    Route::post('/timesheet/reports/export', [ReportController::class, 'export'])->name('timesheet.reports.export')->middleware('role:Admin|Manager');

    // Saved Reports
    Route::get('/timesheet/reports/saved', [SavedReportController::class, 'index'])->name('timesheet.reports.saved.index')->middleware('role:Admin|Manager');
    Route::post('/timesheet/reports/saved', [SavedReportController::class, 'store'])->name('timesheet.reports.saved.store')->middleware('role:Admin|Manager');
    Route::put('/timesheet/reports/saved/{savedReport}', [SavedReportController::class, 'update'])->name('timesheet.reports.saved.update')->middleware('role:Admin|Manager');
    Route::delete('/timesheet/reports/saved/{savedReport}', [SavedReportController::class, 'destroy'])->name('timesheet.reports.saved.destroy')->middleware('role:Admin|Manager');
    Route::get('/timesheet/reports/saved/{savedReport}/load', [SavedReportController::class, 'load'])->name('timesheet.reports.saved.load')->middleware('role:Admin|Manager');

    // Scheduled Reports
    Route::get('/timesheet/reports/scheduled', [ScheduledReportController::class, 'index'])->name('timesheet.reports.scheduled.index')->middleware('role:Admin|Manager');
    Route::post('/timesheet/reports/scheduled', [ScheduledReportController::class, 'store'])->name('timesheet.reports.scheduled.store')->middleware('role:Admin|Manager');
    Route::put('/timesheet/reports/scheduled/{scheduledReport}', [ScheduledReportController::class, 'update'])->name('timesheet.reports.scheduled.update')->middleware('role:Admin|Manager');
    Route::delete('/timesheet/reports/scheduled/{scheduledReport}', [ScheduledReportController::class, 'destroy'])->name('timesheet.reports.scheduled.destroy')->middleware('role:Admin|Manager');
    Route::post('/timesheet/reports/scheduled/{scheduledReport}/toggle', [ScheduledReportController::class, 'toggle'])->name('timesheet.reports.scheduled.toggle')->middleware('role:Admin|Manager');
});

// Customer Timesheet Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Customer Service Views
    Route::get('/customer/timesheet/services/{service}', [CustomerServiceController::class, 'show'])->name('customer.timesheet.services.show');
    Route::get('/customer/timesheet/services/{service}/ledger', [CustomerServiceController::class, 'ledger'])->name('customer.timesheet.services.ledger');

    // Customer Reports
    Route::post('/customer/timesheet/services/{service}/report/generate', [CustomerReportController::class, 'generate'])->name('customer.timesheet.services.report.generate');
    Route::post('/customer/timesheet/services/{service}/report/export', [CustomerReportController::class, 'export'])->name('customer.timesheet.services.report.export');
    Route::get('/customer/timesheet/services/{service}/external-reference', [CustomerReportController::class, 'getExternalReferenceReport'])->name('customer.timesheet.services.external-reference');
});
