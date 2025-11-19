<?php

return [
    'name' => 'GitHub',

    /*
    |--------------------------------------------------------------------------
    | OAuth Configuration
    |--------------------------------------------------------------------------
    |
    | GitHub OAuth credentials are now configured via .env file:
    | - GITHUB_CLIENT_ID
    | - GITHUB_CLIENT_SECRET
    | - GITHUB_API_URL
    |
    */

    'redirect_uri' => env('APP_URL').'/github/oauth/callback',

    'client_id' => env('GITHUB_CLIENT_ID'),

    'client_secret' => env('GITHUB_CLIENT_SECRET'),

    'api_url' => env('GITHUB_API_URL', 'https://api.github.com'),

    /*
    |--------------------------------------------------------------------------
    | OAuth Scopes
    |--------------------------------------------------------------------------
    |
    | Required OAuth scopes for GitHub API access.
    | See: https://docs.github.com/en/developers/apps/scopes-for-oauth-apps
    |
    */

    'scopes' => [
        'repo',      // Access to repositories (private and public)
        'read:org',  // Read organization membership
        'read:user', // Read user profile information
    ],

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
            'description' => 'Enable GitHub integration for this organisation',
        ],
    ],
];
