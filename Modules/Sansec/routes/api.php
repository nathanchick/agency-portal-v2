<?php

use Illuminate\Support\Facades\Route;
use Modules\Sansec\Http\Controllers\SansecController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('sansecs', SansecController::class)->names('sansec');
});
