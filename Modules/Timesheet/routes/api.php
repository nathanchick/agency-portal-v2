<?php

use Illuminate\Support\Facades\Route;
use Modules\Timesheet\Http\Controllers\TimesheetController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('timesheets', TimesheetController::class)->names('timesheet');
});
