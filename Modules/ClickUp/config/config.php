<?php

return [
    'name' => 'ClickUp',

    /*
    |--------------------------------------------------------------------------
    | OAuth Configuration
    |--------------------------------------------------------------------------
    |
    | ClickUp OAuth credentials are configured via .env file:
    | - CLICKUP_CLIENT_ID
    | - CLICKUP_CLIENT_SECRET
    | - CLICKUP_REDIRECT_URI
    |
    */

    'redirect_uri' => env('CLICKUP_REDIRECT_URI', env('APP_URL').'/clickup/oauth/callback'),

    'client_id' => env('CLICKUP_CLIENT_ID'),

    'client_secret' => env('CLICKUP_CLIENT_SECRET'),

    'api_url' => env('CLICKUP_API_URL', 'https://api.clickup.com/api/v2'),

    /*
    |--------------------------------------------------------------------------
    | OAuth URLs
    |--------------------------------------------------------------------------
    |
    | ClickUp OAuth endpoints for authorization and token exchange.
    |
    */

    'authorize_url' => 'https://app.clickup.com/api',

    'token_url' => 'https://api.clickup.com/api/v2/oauth/token',

    /*
    |--------------------------------------------------------------------------
    | Module Settings
    |--------------------------------------------------------------------------
    |
    | Organisation-level settings managed through the module settings UI.
    |
    */

    'organisation_settings' => [
        'status' => [
            'label' => 'Enabled',
            'type' => 'yes_no',
            'description' => 'Enable ClickUp integration for this organisation',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Rate Limiting
    |--------------------------------------------------------------------------
    |
    | ClickUp API rate limits per minute.
    | Default: 100 requests/minute for most plans.
    |
    */

    'rate_limit' => [
        'requests_per_minute' => env('CLICKUP_RATE_LIMIT', 100),
        'warning_threshold' => env('CLICKUP_RATE_LIMIT_THRESHOLD', 90), // Warn at 90%
    ],

    /*
    |--------------------------------------------------------------------------
    | Cache TTLs
    |--------------------------------------------------------------------------
    |
    | Cache durations for various ClickUp API responses (in seconds).
    |
    */

    'cache_ttl' => [
        'token' => 3300,        // 55 minutes
        'teams' => 3600,        // 1 hour
        'spaces' => 1800,       // 30 minutes
        'folders' => 1800,      // 30 minutes
        'lists' => 900,         // 15 minutes
        'tasks' => 300,         // 5 minutes
    ],
];