<?php

use Illuminate\Support\Facades\Route;
use Modules\Timesheet\Http\Controllers\TimesheetController;
use Modules\Timesheet\Http\Controllers\Api\Widget\TimesheetWidgetController;
use Modules\Timesheet\Http\Controllers\Api\Extension\TimesheetExtensionController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('timesheets', TimesheetController::class)->names('timesheet');
});

// Extension API endpoints
Route::middleware(['extension.token', 'throttle:60,1'])->prefix('extension')->name('extension.')->group(function () {
    Route::get('/user', [TimesheetExtensionController::class, 'user'])->name('user');
    Route::get('/services', [TimesheetExtensionController::class, 'services'])->name('services');
    Route::get('/recent-entries', [TimesheetExtensionController::class, 'recentEntries'])->name('recent-entries');
    Route::post('/time-entries', [TimesheetExtensionController::class, 'createEntry'])->name('time-entries.create');

    // Timer endpoints
    Route::get('/timer/current', [TimesheetExtensionController::class, 'currentTimer'])->name('timer.current');
    Route::post('/timer/start', [TimesheetExtensionController::class, 'startTimer'])->name('timer.start');
    Route::post('/timer/{timer}/stop', [TimesheetExtensionController::class, 'stopTimer'])->name('timer.stop');
});
