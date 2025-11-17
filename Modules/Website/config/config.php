<?php

return [
    'name' => 'Website',

    'organisation_settings' => [
        'status' => [
            'label' => 'Enable Platform Information Tracking',
            'type' => 'yes_no',
            'description' => 'Track platform details (CMS, versions) for each website',
            'default' => '1',
        ],
    ],

    'website_settings' => [
        'platform_type' => [
            'label' => 'Platform Type',
            'type' => 'select',
            'description' => 'The platform/CMS this website is built on',
            'options' => [
                'magento2' => 'Magento 2',
                'shopify' => 'Shopify',
                'wordpress' => 'WordPress',
                'magento1' => 'Magento 1',
                'drupal' => 'Drupal',
                'laravel' => 'Laravel',
                'other' => 'Other',
            ],
            'default' => null,
        ],
        'platform_version' => [
            'label' => 'Platform Version',
            'type' => 'text',
            'description' => 'Version of the platform (e.g., 2.4.6, 6.3.2)',
            'default' => null,
        ],
        'php_version' => [
            'label' => 'PHP Version',
            'type' => 'text',
            'description' => 'PHP version running on the server (e.g., 8.2)',
            'default' => null,
        ],
    ],
];
