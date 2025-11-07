<?php

use Illuminate\Support\Facades\Route;
use Modules\Freshdesk\Http\Controllers\FreshdeskController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('freshdesks', FreshdeskController::class)->names('freshdesk');
});
