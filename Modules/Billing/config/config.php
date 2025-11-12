<?php

return [
    'name' => 'Billing',

    /*
    |--------------------------------------------------------------------------
    | Default Billing Provider
    |--------------------------------------------------------------------------
    |
    | The default billing provider to use when none is explicitly configured
    | for a customer. Available providers: 'xero', 'quickbooks'
    |
    */
    'default_provider' => env('BILLING_DEFAULT_PROVIDER', 'xero'),

    /*
    |--------------------------------------------------------------------------
    | Provider Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for each billing provider.
    |
    */
    'providers' => [
        'xero' => [
            'enabled' => true,
        ],
        'quickbooks' => [
            'enabled' => false, // Enable when QuickBooks provider is implemented
        ],
    ],
];
