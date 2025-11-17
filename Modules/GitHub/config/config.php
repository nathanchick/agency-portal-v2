<?php

return [
    'name' => 'GitHub',

    /*
    |--------------------------------------------------------------------------
    | OAuth Configuration
    |--------------------------------------------------------------------------
    |
    | Redirect URI for OAuth callbacks. The client credentials (Client ID
    | and Client Secret) are stored per-organisation in organisation_settings.
    |
    */

    'redirect_uri' => env('APP_URL').'/github/oauth/callback',

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
        'GITHUB_CLIENT_ID' => [
            'label' => 'GitHub Client ID',
            'type' => 'text',
            'description' => 'Your GitHub OAuth App Client ID (from GitHub Settings > Developer settings > OAuth Apps)',
            'required' => true,
        ],
        'GITHUB_CLIENT_SECRET' => [
            'label' => 'GitHub Client Secret',
            'type' => 'encrypted',
            'description' => 'Your GitHub OAuth App Client Secret (from GitHub Developer settings)',
            'required' => true,
        ],
        'GITHUB_API_URL' => [
            'label' => 'GitHub API URL',
            'type' => 'text',
            'description' => 'GitHub API base URL (default for GitHub.com, change for GitHub Enterprise)',
            'default' => 'https://api.github.com',
        ],
    ],
];
