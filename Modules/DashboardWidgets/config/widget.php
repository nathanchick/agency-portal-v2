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
                'links' => [
                    'type' => 'json',
                    'label' => 'Quick Links',
                    'description' => 'Customizable list of quick access links',
                    'default' => [
                        [
                            'name' => 'Tickets',
                            'route' => 'tickets.index',
                            'icon' => 'Ticket',
                            'openInNewTab' => false,
                        ],
                        [
                            'name' => 'Customers',
                            'route' => 'customers.index',
                            'icon' => 'Users',
                            'openInNewTab' => false,
                        ],
                        [
                            'name' => 'Timesheet',
                            'route' => 'timesheet.entries.index',
                            'icon' => 'Clock',
                            'openInNewTab' => false,
                        ],
                        [
                            'name' => 'Documents',
                            'route' => 'documents.pending',
                            'icon' => 'FileText',
                            'openInNewTab' => false,
                        ],
                        [
                            'name' => 'Settings',
                            'route' => 'settings.organisation',
                            'icon' => 'Settings',
                            'openInNewTab' => false,
                        ],
                        [
                            'name' => 'Deployments',
                            'route' => 'deployments.index',
                            'icon' => 'Rocket',
                            'openInNewTab' => false,
                        ],
                    ],
                ],
                'columns' => [
                    'type' => 'select',
                    'label' => 'Grid columns',
                    'description' => 'Number of columns in the grid layout',
                    'default' => 2,
                    'options' => [
                        1 => '1 Column',
                        2 => '2 Columns',
                        3 => '3 Columns',
                    ],
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