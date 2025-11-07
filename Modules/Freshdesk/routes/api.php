<?php

use Illuminate\Support\Facades\Route;
use Modules\Freshdesk\Http\Controllers\FreshdeskController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('freshdesks', FreshdeskController::class)->names('freshdesk');
});
