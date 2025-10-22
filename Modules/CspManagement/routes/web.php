<?php

use Illuminate\Support\Facades\Route;
use Modules\CspManagement\Http\Controllers\CspManagementController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('cspmanagements', CspManagementController::class)->names('cspmanagement');
});
