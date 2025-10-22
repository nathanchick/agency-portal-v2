<?php

use Illuminate\Support\Facades\Route;
use Modules\Ohdear\Http\Controllers\OhdearController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('ohdears', OhdearController::class)->names('ohdear');
});
