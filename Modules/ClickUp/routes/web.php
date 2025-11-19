<?php

use Illuminate\Support\Facades\Route;
use Modules\ClickUp\Http\Controllers\ClickUpOAuthController;

/*
|--------------------------------------------------------------------------
| ClickUp Web Routes
|--------------------------------------------------------------------------
|
| OAuth flow routes for ClickUp integration.
|
*/

Route::middleware(['auth', 'verified'])->group(function () {
    // OAuth routes
    Route::get('/clickup/oauth/connect', [ClickUpOAuthController::class, 'connect'])->name('clickup.oauth.connect');
    Route::get('/clickup/oauth/callback', [ClickUpOAuthController::class, 'callback'])->name('clickup.oauth.callback');
    Route::delete('/clickup/oauth/disconnect', [ClickUpOAuthController::class, 'disconnect'])->name('clickup.oauth.disconnect');
});
