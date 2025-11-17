<?php

use Illuminate\Support\Facades\Route;
use Modules\GitHub\Http\Controllers\GitHubOAuthController;

/*
|--------------------------------------------------------------------------
| Web Routes - GitHub OAuth
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->prefix('github')->group(function () {
    // OAuth flow
    Route::get('/oauth/connect', [GitHubOAuthController::class, 'connect'])->name('github.oauth.connect');
    Route::get('/oauth/callback', [GitHubOAuthController::class, 'callback'])->name('github.oauth.callback');
    Route::delete('/oauth/disconnect', [GitHubOAuthController::class, 'disconnect'])->name('github.oauth.disconnect');
});
