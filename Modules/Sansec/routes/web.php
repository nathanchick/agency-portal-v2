<?php

use Illuminate\Support\Facades\Route;
use Modules\Sansec\Http\Controllers\SansecController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('sansecs', SansecController::class)->names('sansec');
});
