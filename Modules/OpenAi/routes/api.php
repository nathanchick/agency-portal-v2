<?php

use Illuminate\Support\Facades\Route;
use Modules\OpenAi\Http\Controllers\OpenAiController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('openais', OpenAiController::class)->names('openai');
});
