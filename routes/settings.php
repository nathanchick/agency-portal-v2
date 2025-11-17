<?php

use App\Http\Controllers\Extension\TokenController;
use App\Http\Controllers\Settings\OrganisationController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/organisation', [OrganisationController::class, 'edit'])->name('organisation.edit');
    Route::patch('settings/organisation', [OrganisationController::class, 'update'])->name('organisation.update');
    Route::patch('settings/organisation/modules', [OrganisationController::class, 'updateModuleSettings'])->name('organisation.modules.update');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');

    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

    Route::get('settings/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');

    // Extension token management
    Route::get('extension-token', [TokenController::class, 'create'])->name('extension.token.create');
    Route::post('extension-token', [TokenController::class, 'generate'])->name('extension.token.generate');
    Route::delete('extension-token/{token}', [TokenController::class, 'revoke'])->name('extension.token.revoke');
});
