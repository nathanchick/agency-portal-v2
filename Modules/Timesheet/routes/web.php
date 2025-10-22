<?php

use Illuminate\Support\Facades\Route;
use Modules\Timesheet\Http\Controllers\TimesheetController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('timesheets', TimesheetController::class)->names('timesheet');
});
