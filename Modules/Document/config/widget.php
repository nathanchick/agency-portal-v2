<?php

/**
 * Dashboard Widget Configuration for Document Module
 *
 * This file defines the dashboard widgets available in the Document module.
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
        'created_documents' => [
            // Display
            'name' => 'Created Documents',
            'description' => 'Document requests you have created with status overview',
            'icon' => 'FilePlus',

            // Permissions
            'roles' => ['Admin', 'Manager', 'User'],

            // Layout
            'default_width' => 1,
            'default_visible' => true,
            'default_position' => 3,

            // Frontend
            'component' => 'CreatedDocumentsWidget',

            // Configuration
            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of documents to show',
                    'default' => 10,
                    'min' => 5,
                    'max' => 50,
                    'help' => 'Maximum number of documents to display in the list',
                ],
                'status' => [
                    'type' => 'select',
                    'label' => 'Status filter',
                    'options' => [
                        'all' => 'All Documents',
                        'pending' => 'Pending Only',
                        'completed' => 'Completed Only',
                        'void' => 'Void Only',
                    ],
                    'default' => 'all',
                    'help' => 'Filter documents by their current status',
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
                    'help' => 'How often to automatically refresh widget data. Refresh pauses when tab is hidden.',
                ],
            ],
        ],
    ],

    /**
     * Widgets for customer users
     * These widgets are available to customer users viewing their dashboard
     */
    'customer' => [
        'assigned_documents' => [
            // Display
            'name' => 'My Documents',
            'description' => 'Documents assigned to you with quick status overview',
            'icon' => 'FileCheck',

            // Permissions
            'roles' => ['Admin', 'Manager', 'User'],

            // Layout
            'default_width' => 2,
            'default_visible' => true,
            'default_position' => 1,

            // Frontend
            'component' => 'AssignedDocumentsWidget',

            // Configuration
            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'number',
                    'label' => 'Number of documents to show',
                    'default' => 5,
                    'min' => 5,
                    'max' => 20,
                    'help' => 'Maximum number of documents to display in the list',
                ],
                'status' => [
                    'type' => 'select',
                    'label' => 'Status filter',
                    'options' => [
                        'all' => 'All Documents',
                        'pending' => 'Pending Only',
                        'completed' => 'Completed Only',
                    ],
                    'default' => 'pending',
                    'help' => 'Filter documents by their current status',
                ],
                'show_team_documents' => [
                    'type' => 'yes_no',
                    'label' => 'Show team documents',
                    'default' => false,
                    'help' => 'Show all documents for your customer, not just yours (Managers/Admins only)',
                    'visible_roles' => ['Admin', 'Manager'], // Only show this setting to Admin/Manager
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
                    'help' => 'How often to automatically refresh your documents. Refresh pauses when tab is hidden.',
                ],
            ],
        ],
    ],
];
