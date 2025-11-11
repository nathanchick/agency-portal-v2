<?php

use Illuminate\Support\Facades\Route;
use Modules\OpenAi\Http\Controllers\OpenAiController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('openais', OpenAiController::class)->names('openai');
});
