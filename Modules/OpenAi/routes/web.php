<?php

use Illuminate\Support\Facades\Route;
use Modules\OpenAi\Http\Controllers\OpenAiController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('openais', OpenAiController::class)->names('openai');
    Route::post('openai/analyze-ticket', [OpenAiController::class, 'analyzeTicket'])->name('openai.analyze-ticket');
    Route::post('openai/analyze-csp-violation', [OpenAiController::class, 'analyzeCspViolation'])->name('openai.analyze-csp-violation');
});
