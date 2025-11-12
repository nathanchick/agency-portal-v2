<?php

return [
    'name' => 'Xero',

    /*
    |--------------------------------------------------------------------------
    | OAuth Configuration
    |--------------------------------------------------------------------------
    |
    | Redirect URI for OAuth callbacks. The client credentials (Client ID
    | and Client Secret) are stored per-organisation in organisation_settings.
    |
    */

    'redirect_uri' => env('APP_URL').'/xero/oauth/callback',

    /*
    |--------------------------------------------------------------------------
    | OAuth Scopes
    |--------------------------------------------------------------------------
    |
    | Required OAuth scopes for Xero API access.
    | See: https://developer.xero.com/documentation/guides/oauth2/scopes
    |
    */

    'scopes' => [
        'openid',                   // Required for OAuth2/OIDC
        'email',                    // Required for OAuth2/OIDC
        'profile',                  // Required for OAuth2/OIDC
        'offline_access',           // Required for refresh tokens
        'accounting.settings',      // Read organisation settings
        'accounting.transactions',  // Read and write invoices, credit notes, etc.
        'accounting.contacts',      // Read contacts (customers)
        'accounting.attachments',   // Read/write attachments
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
            'description' => 'Enable Xero integration for this organisation',
        ],
        'XERO_CLIENT_ID' => [
            'label' => 'Xero Client ID',
            'type' => 'text',
            'description' => 'Your Xero OAuth 2.0 Client ID (from Xero Developer Portal)',
            'required' => true,
        ],
        'XERO_CLIENT_SECRET' => [
            'label' => 'Xero Client Secret',
            'type' => 'encrypted',
            'description' => 'Your Xero OAuth 2.0 Client Secret (from Xero Developer Portal)',
            'required' => true,
        ],
        'XERO_TENANT_ID' => [
            'label' => 'Xero Tenant ID',
            'type' => 'text',
            'description' => 'Your Xero tenant ID (auto-filled after connecting)',
            'readonly' => true,
        ],
        'XERO_DEFAULT_ACCOUNT_CODE' => [
            'label' => 'Default Sales Account Code',
            'type' => 'text',
            'description' => 'Default account code for invoice line items (e.g., 200 for Sales)',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Customer Settings
    |--------------------------------------------------------------------------
    |
    | Customer-level settings for linking portal customers to Xero contacts.
    |
    */

    'customer_settings' => [
        'xero_contact_id' => [
            'label' => 'Xero Contact ID',
            'type' => 'text',
            'description' => 'Link this customer to a Xero contact',
        ],
    ],
];
