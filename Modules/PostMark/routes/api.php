<?php

use Illuminate\Support\Facades\Route;
use Modules\PostMark\Http\Controllers\WebhookController;
use Modules\PostMark\Http\Middleware\VerifyPostMarkWebhook;

/**
 * PostMark Webhook Routes (Public - No Auth Required)
 * These routes are called by PostMark's servers when emails are received
 *
 * URL format: POST /api/webhooks/postmark/{organisation}/inbound
 * Example: POST /api/webhooks/postmark/9d1f8a5b-2c3e-4f6a-8b9c-1d2e3f4a5b6c/inbound
 */
Route::middleware([VerifyPostMarkWebhook::class])
    ->prefix('webhooks/postmark')
    ->group(function () {
        Route::post('/{organisation}/inbound', [WebhookController::class, 'inbound'])
            ->name('postmark.webhooks.inbound');
    });
