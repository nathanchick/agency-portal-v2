<?php

/**
 * Dashboard Widget Configuration for Timesheet Module
 *
 * This file defines the dashboard widgets available in the Timesheet module.
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
        'weekly_summary' => [
            // Display
            'name' => 'Weekly Summary',
            'description' => 'Current week\'s timesheet entries and totals',
            'icon' => 'Clock',

            // Permissions
            'roles' => ['Admin', 'Manager', 'User'],

            // Layout
            'default_width' => 2,  // Medium width for summary data
            'default_visible' => true,
            'default_position' => 0,

            // Frontend
            'component' => 'WeeklySummaryWidget',

            // Configuration
            'configurable' => true,
            'settings_schema' => [
                'show_billable_hours' => [
                    'type' => 'yes_no',
                    'label' => 'Show billable hours breakdown',
                    'default' => true,
                ],
                'show_projects' => [
                    'type' => 'yes_no',
                    'label' => 'Show projects worked on',
                    'default' => true,
                ],
                'group_by' => [
                    'type' => 'select',
                    'label' => 'Group entries by',
                    'options' => [
                        'day' => 'By Day',
                        'service' => 'By Service',
                        'customer' => 'By Customer',
                    ],
                    'default' => 'day',
                ],
            ],
        ],
    ],

    /**
     * Widgets for customer users
     * These widgets are available to customers viewing their own dashboard
     */
    'customer' => [
        'weekly_summary' => [
            // Display
            'name' => 'Weekly Summary',
            'description' => 'Time logged this week on your projects',
            'icon' => 'Clock',

            // Permissions
            'roles' => ['Admin', 'Manager', 'User'],

            // Layout
            'default_width' => 2,
            'default_visible' => true,
            'default_position' => 0,

            // Frontend
            'component' => 'WeeklySummaryWidget',

            // Configuration
            'configurable' => true,
            'settings_schema' => [
                'show_billable_hours' => [
                    'type' => 'yes_no',
                    'label' => 'Show billable hours',
                    'default' => true,
                ],
                'show_projects' => [
                    'type' => 'yes_no',
                    'label' => 'Show projects',
                    'default' => true,
                ],
            ],
        ],
    ],
];
