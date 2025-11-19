<?php

use App\Http\Middleware\HandleThemeAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\SetPermissionTeam;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withSchedule(function (Schedule $schedule) {
        // Module schedules are registered in their respective service providers
    })
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->validateCsrfTokens(except: [
            'api/widgets/*',
            'api/extension/*',
        ]);

        $middleware->web(append: [
            HandleThemeAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \App\Http\Middleware\CheckRole::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
            'organisation' => \App\Http\Middleware\RequireOrganisationUser::class,
            'api.token' => \App\Http\Middleware\AuthenticateApiToken::class,
            'extension.token' => \App\Http\Middleware\AuthenticateExtensionToken::class,
            'extension.token.org' => \App\Http\Middleware\AuthenticateExtensionTokenWithOrganisation::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
