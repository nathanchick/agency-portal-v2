<?php

use Illuminate\Support\Facades\Route;
use Modules\Timesheet\Http\Controllers\TimesheetController;
use Modules\Timesheet\Http\Controllers\Api\Widget\TimesheetWidgetController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('timesheets', TimesheetController::class)->names('timesheet');
});

/*
|--------------------------------------------------------------------------
| Widget API Routes
|--------------------------------------------------------------------------
| These routes provide data for dashboard widgets.
| They require authentication but don't use API token middleware.
*/

Route::middleware(['auth', 'verified'])->prefix('widgets/timesheet')->name('api.widgets.timesheet.')->group(function () {
    Route::get('weekly-summary', [TimesheetWidgetController::class, 'weeklySummary'])->name('weekly-summary');
});
