<?php

use Illuminate\Support\Facades\Route;
use Modules\Deployment\Http\Controllers\Api\DeploymentWebhookController;

/**
 * Public Webhook Endpoint (No Authentication Required)
 */
Route::post('/deployments/webhook/{token}', [DeploymentWebhookController::class, 'webhook'])->name('deployments.webhook');
