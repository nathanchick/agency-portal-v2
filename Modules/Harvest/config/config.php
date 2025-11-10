<?php

return [
    'name' => 'Harvest Data Sync',
    'organisation_settings' => [
        'status' => [
            'label' => 'Enabled',
            'type' => 'yes_no',
            'description' => 'Enable Harvest Data sync, it will pull time sheets/clients/projects from Harvest',
        ],
        'HARVEST_ACCOUNT_ID' => [
            'label' => 'Harvest Account ID',
            'type' => 'encrypted',
        ],
        'HARVEST_BEARER' => [
            'label' => 'Harvest Bearer Token',
            'type' => 'encrypted',
        ],
    ],
    'customer_settings' => [
        'harvest_client_id' => [
            'label' => 'Harvest Client ID',
            'type' => 'number',
            'description' => 'Link this customer to a Harvest client',
        ],
    ]
];
