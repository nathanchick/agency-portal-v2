<?php

use Illuminate\Support\Facades\Route;
use Modules\PostMark\Http\Controllers\PostMarkController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('postmarks', PostMarkController::class)->names('postmark');
});
