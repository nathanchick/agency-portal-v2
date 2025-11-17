<?php

use Illuminate\Support\Facades\Route;
use Modules\OpenAi\Http\Controllers\OpenAiController;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::apiResource('openais', OpenAiController::class)->names('openai');
    Route::post('openai/analyze-ticket', [OpenAiController::class, 'analyzeTicket'])->name('openai.analyze-ticket');
    Route::post('openai/analyze-csp-violation', [OpenAiController::class, 'analyzeCspViolation'])->name('openai.analyze-csp-violation');
});
