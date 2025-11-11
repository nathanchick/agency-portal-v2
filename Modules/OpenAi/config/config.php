<?php

return [
    'name' => 'OpenAi',
    'organisation_settings' => [
        'status' => [
            'label' => 'Enabled',
            'type' => 'yes_no',
            'description' => 'Enable OpenAi integration for this organisation',
        ],
        'OPENAI_API_KEY' => [
            'label' => 'OpenAi API Key',
            'type' => 'encrypted',
            'description' => 'Your OpenAi API key',
        ],
        'ticket_summary_status' => [
            'label' => 'Enable Ticket Summary',
            'type' => 'yes_no',
            'description' => 'Enable automatic ticket summarization using OpenAi',
        ],
    ],
];
