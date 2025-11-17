<?php

use Illuminate\Support\Facades\Route;
use Modules\Timesheet\Http\Controllers\TimesheetController;
use Modules\Timesheet\Http\Controllers\Api\Widget\TimesheetWidgetController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('timesheets', TimesheetController::class)->names('timesheet');
});
