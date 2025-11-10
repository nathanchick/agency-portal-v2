<?php

return [
    'name' => 'Xero',
    'organisation_settings' => [
        'status' => [
            'label' => 'Enabled',
            'type' => 'yes_no',
            'description' => 'Enable Xero integration for this organisation',
        ],
        'XERO_TENANT_ID' => [
            'label' => 'Xero Tenant ID',
            'type' => 'text',
            'description' => 'Your Xero tenant ID',
        ],
        'XERO_CLIENT_ID' => [
            'label' => 'Xero Client ID',
            'type' => 'text',
            'description' => 'Your Xero OAuth 2.0 client ID',
        ],
        'XERO_CLIENT_SECRET' => [
            'label' => 'Xero Client Secret',
            'type' => 'encrypted',
            'description' => 'Your Xero OAuth 2.0 client secret',
        ],
    ],
    'customer_settings' => [
        'xero_contact_id' => [
            'label' => 'Xero Contact ID',
            'type' => 'text',
            'description' => 'Link this customer to a Xero contact',
        ],
    ]
];
