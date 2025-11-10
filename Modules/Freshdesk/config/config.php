<?php

return [
    'name' => 'Freshdesk Data Sync',
    'organisation_settings' => [
        'status' => [
            'label' => 'Enabled',
            'type' => 'yes_no',
            'description' => 'Enable Freshdesk integration for this organisation',
        ],
        'FRESHDESK_DOMAIN' => [
            'label' => 'Freshdesk Domain',
            'type' => 'text',
            'description' => 'Your Freshdesk domain (e.g., yourcompany.freshdesk.com)',
        ],
        'FRESHDESK_API_KEY' => [
            'label' => 'Freshdesk API Key',
            'type' => 'encrypted',
            'description' => 'Your Freshdesk API key',
        ],
    ],
    'customer_settings' => [
        'freshdesk_company_id' => [
            'label' => 'Freshdesk Company ID',
            'type' => 'text',
            'description' => 'Link this customer to a Freshdesk company',
        ],
    ]
];
