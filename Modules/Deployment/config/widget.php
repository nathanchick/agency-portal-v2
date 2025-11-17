<?php

return [
    'customer' => [
        'recent_deployments' => [
            'name' => 'Recent Deployments',
            'description' => 'Recent deployment history for your websites',
            'icon' => 'Rocket',
            'component' => 'RecentDeploymentsWidget',

            'default_width' => 2,
            'default_visible' => true,
            'default_position' => 2,

            'roles' => ['Admin', 'Manager', 'User'],

            'configurable' => true,
            'settings_schema' => [
                'limit' => [
                    'type' => 'select',
                    'label' => 'Number of deployments to show',
                    'default' => 3,
                    'options' => [
                        3 => '3 Deployments',
                        5 => '5 Deployments',
                        10 => '10 Deployments',
                    ],
                ],
                'refresh_interval' => [
                    'type' => 'select',
                    'label' => 'Auto-refresh interval',
                    'description' => 'How often to automatically refresh the widget data',
                    'default' => 0,
                    'options' => [
                        0 => 'Never',
                        30 => 'Every 30 seconds',
                        60 => 'Every minute',
                        300 => 'Every 5 minutes',
                        900 => 'Every 15 minutes',
                    ],
                ],
            ],
        ],
    ],
];