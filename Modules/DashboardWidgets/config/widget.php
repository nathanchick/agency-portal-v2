<?php

return [
    'organisation' => [
        'welcome' => [
            'name' => 'Welcome',
            'description' => 'Welcome message and quick stats',
            'icon' => 'Home',
            'component' => 'WelcomeWidget',

            'default_width' => 3,
            'default_visible' => true,
            'default_position' => 0,

            'roles' => ['Admin', 'Manager', 'User'],

            'configurable' => true,
            'settings_schema' => [
                'show_stats' => [
                    'type' => 'yes_no',
                    'label' => 'Show quick statistics',
                    'default' => true,
                ],
            ],
        ],

        'quick_links' => [
            'name' => 'Quick Links',
            'description' => 'Customizable quick access links',
            'icon' => 'Link',
            'component' => 'QuickLinksWidget',

            'default_width' => 1,
            'default_visible' => false,
            'default_position' => 1,

            'roles' => ['Admin', 'Manager', 'User'],

            'configurable' => true,
            'settings_schema' => [
                'links_count' => [
                    'type' => 'number',
                    'label' => 'Number of links to show',
                    'default' => 6,
                    'min' => 3,
                    'max' => 12,
                ],
            ],
        ],
    ],

    'customer' => [
        'welcome' => [
            'name' => 'Welcome',
            'description' => 'Welcome message for customers',
            'icon' => 'Home',
            'component' => 'CustomerWelcomeWidget',

            'default_width' => 2,
            'default_visible' => true,
            'default_position' => 0,

            'roles' => ['Admin', 'Manager', 'User'],

            'configurable' => false,
        ],
    ],
];