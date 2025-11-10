<?php

return [
    'name' => 'Sansec',
    'organisation_settings' => [
        'status' => [
            'label' => 'Enabled',
            'type' => 'yes_no',
            'description' => 'Enable sansec security sancs for your website',
        ],
        'SANSEC_API_KEY' => [
            'label' => 'Sansec API',
            'type' => 'encrypted',
        ],
    ],
];
