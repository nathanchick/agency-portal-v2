<?php

/**
 * Dashboard Widget Configuration for Ticket Module
 *
 * This file defines the dashboard widgets available in the Ticket module.
 * Widgets are organized by user type (organisation or customer).
 *
 * Each widget configuration includes:
 * - Display properties (name, description, icon)
 * - Permission settings (roles)
 * - Layout preferences (default width, visibility, position)
 * - Component mapping (React component name)
 * - Configuration options (settings schema)
 */

return [
    /**
     * Widgets for organisation users
     * These widgets are available to internal staff viewing the organisation dashboard
     */
    'organisation' => [
        'recent_tickets' => [
            // Display
            'name' => 'Recent Tickets',
            'description' => 'Display recent support tickets across all customers',
            'icon' => 'Ticket',

            // Permissions
            'roles' => ['Admin', 'Manager', 'User'],

            // Layout
            'default_width' => 1,  // 1-3 columns (1 = narrow, 2 = medium, 3 = wide)
            'default_visible' => true,
            'default_position' => 0,

            // Frontend
            'component' => 'RecentTicketsWidget',

            // Configuration
            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of tickets to show',
                    'default' => 10,
                    'min' => 5,
                    'max' => 50,
                ],
                'status' => [
                    'type' => 'select',
                    'label' => 'Status filter',
                    'options' => [
                        'all' => 'All Tickets',
                        'open' => 'Open Only',
                        'closed' => 'Closed Only',
                    ],
                    'default' => 'open',
                ],
                'refresh_interval' => [
                    'type' => 'select',
                    'label' => 'Auto-refresh interval',
                    'options' => [
                        '0' => 'Manual only (no auto-refresh)',
                        '30' => 'Every 30 seconds',
                        '60' => 'Every minute',
                        '300' => 'Every 5 minutes',
                        '600' => 'Every 10 minutes',
                    ],
                    'default' => '0',
                    'help' => 'How often to automatically refresh widget data. Refresh pauses when tab is hidden.',
                ],
            ],
        ],

        'ticket_statistics' => [
            // Display
            'name' => 'Ticket Statistics',
            'description' => 'Overview of ticket metrics and trends',
            'icon' => 'BarChart3',

            // Permissions
            'roles' => ['Admin', 'Manager'],  // Only Admin and Manager can see

            // Layout
            'default_width' => 2,  // Medium width for charts
            'default_visible' => true,
            'default_position' => 1,

            // Frontend
            'component' => 'TicketStatsWidget',

            // Configuration
            'configurable' => true,
            'settings_schema' => [
                'date_range' => [
                    'type' => 'select',
                    'label' => 'Date range',
                    'options' => [
                        '7' => 'Last 7 Days',
                        '30' => 'Last 30 Days',
                        '90' => 'Last 90 Days',
                    ],
                    'default' => '30',
                ],
                'refresh_interval' => [
                    'type' => 'select',
                    'label' => 'Auto-refresh interval',
                    'options' => [
                        '0' => 'Manual only (no auto-refresh)',
                        '60' => 'Every minute',
                        '300' => 'Every 5 minutes',
                        '600' => 'Every 10 minutes',
                    ],
                    'default' => '0',
                    'help' => 'How often to automatically refresh statistics. Refresh pauses when tab is hidden.',
                ],
            ],
        ],
    ],

    /**
     * Widgets for customer users
     * These widgets are available to customers viewing their own dashboard
     */
    'customer' => [
        'my_tickets' => [
            // Display
            'name' => 'My Tickets',
            'description' => 'Your recent support tickets',
            'icon' => 'Ticket',

            // Permissions
            'roles' => ['Admin', 'Manager', 'User'],

            // Layout
            'default_width' => 2,
            'default_visible' => true,
            'default_position' => 0,

            // Frontend
            'component' => 'MyTicketsWidget',

            // Configuration
            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of tickets to show',
                    'default' => 5,
                    'min' => 5,
                    'max' => 20,
                ],
                'status' => [
                    'type' => 'select',
                    'label' => 'Status filter',
                    'options' => [
                        'all' => 'All Tickets',
                        'open' => 'Open Only',
                        'closed' => 'Closed Only',
                    ],
                    'default' => 'all',
                ],
                'refresh_interval' => [
                    'type' => 'select',
                    'label' => 'Auto-refresh interval',
                    'options' => [
                        '0' => 'Manual only (no auto-refresh)',
                        '30' => 'Every 30 seconds',
                        '60' => 'Every minute',
                        '300' => 'Every 5 minutes',
                    ],
                    'default' => '0',
                    'help' => 'How often to automatically refresh your tickets. Refresh pauses when tab is hidden.',
                ],
            ],
        ],
    ],
];
