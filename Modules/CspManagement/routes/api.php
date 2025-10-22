<?php

use Illuminate\Support\Facades\Route;
use Modules\CspManagement\Http\Controllers\CspManagementController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('cspmanagements', CspManagementController::class)->names('cspmanagement');
});
