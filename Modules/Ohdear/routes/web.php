<?php

use Illuminate\Support\Facades\Route;
use Modules\Ohdear\Http\Controllers\OhdearController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('ohdears', OhdearController::class)->names('ohdear');
});
