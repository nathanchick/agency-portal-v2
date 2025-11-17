<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Organisation Dashboard Widgets
    |--------------------------------------------------------------------------
    |
    | Widgets available to organisation users (internal staff)
    |
    */
    'organisation' => [
        'billing_overview' => [
            'name' => 'Billing Overview',
            'description' => 'Organisation-wide billing summary across all customers',
            'icon' => 'DollarSign',
            'component' => 'BillingOverviewWidget',

            'default_width' => 2,
            'default_visible' => true,
            'default_position' => 0,

            'roles' => ['Admin', 'Manager'],

            'configurable' => true,
            'settings_schema' => [
                'refresh_interval' => [
                    'type' => 'number',
                    'label' => 'Auto-refresh interval (seconds)',
                    'default' => 0,
                    'min' => 0,
                    'max' => 300,
                    'help' => 'Set to 0 to disable auto-refresh',
                ],
            ],
        ],

        'outstanding_invoices' => [
            'name' => 'Outstanding Invoices',
            'description' => 'List of customers with outstanding invoices',
            'icon' => 'Clock',
            'component' => 'OutstandingInvoicesWidget',

            'default_width' => 1,
            'default_visible' => true,
            'default_position' => 1,

            'roles' => ['Admin', 'Manager', 'User'],

            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of customers to show',
                    'default' => 10,
                    'min' => 5,
                    'max' => 20,
                ],
                'sort_by' => [
                    'type' => 'select',
                    'label' => 'Sort by',
                    'options' => [
                        'amount_desc' => 'Highest Amount First',
                        'amount_asc' => 'Lowest Amount First',
                        'date_desc' => 'Most Recent First',
                        'date_asc' => 'Oldest First',
                    ],
                    'default' => 'amount_desc',
                ],
                'refresh_interval' => [
                    'type' => 'number',
                    'label' => 'Auto-refresh interval (seconds)',
                    'default' => 0,
                    'min' => 0,
                    'max' => 300,
                ],
            ],
        ],

        'overdue_invoices' => [
            'name' => 'Overdue Invoices',
            'description' => 'Alert widget for overdue invoices requiring attention',
            'icon' => 'AlertTriangle',
            'component' => 'OverdueInvoicesWidget',

            'default_width' => 1,
            'default_visible' => true,
            'default_position' => 2,

            'roles' => ['Admin', 'Manager'],

            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of customers to show',
                    'default' => 10,
                    'min' => 5,
                    'max' => 15,
                ],
                'min_days_overdue' => [
                    'type' => 'number',
                    'label' => 'Minimum days overdue',
                    'default' => 1,
                    'min' => 1,
                    'max' => 90,
                    'help' => 'Only show invoices overdue by at least this many days',
                ],
                'refresh_interval' => [
                    'type' => 'number',
                    'label' => 'Auto-refresh interval (seconds)',
                    'default' => 0,
                    'min' => 0,
                    'max' => 300,
                ],
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Customer Dashboard Widgets
    |--------------------------------------------------------------------------
    |
    | Widgets available to customer users (clients)
    |
    */
    'customer' => [
        'my_billing' => [
            'name' => 'My Billing',
            'description' => 'Your billing status and recent invoices',
            'icon' => 'Receipt',
            'component' => 'MyBillingWidget',

            'default_width' => 2,
            'default_visible' => true,
            'default_position' => 0,

            'roles' => ['Admin', 'Manager', 'User'],

            'configurable' => true,
            'settings_schema' => [
                'show_recent_invoices' => [
                    'type' => 'yes_no',
                    'label' => 'Show recent invoices',
                    'default' => true,
                ],
                'recent_invoice_count' => [
                    'type' => 'number',
                    'label' => 'Number of recent invoices',
                    'default' => 5,
                    'min' => 3,
                    'max' => 10,
                ],
                'refresh_interval' => [
                    'type' => 'number',
                    'label' => 'Auto-refresh interval (seconds)',
                    'default' => 0,
                    'min' => 0,
                    'max' => 300,
                ],
            ],
        ],
    ],
];