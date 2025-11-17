<?php

return [
    'name' => 'Freshdesk Data Sync',
    'organisation_settings' => [
        'status' => [
            'label' => 'Enabled',
            'type' => 'yes_no',
            'description' => 'Enable Freshdesk integration for this organisation',
        ],
        'FRESHDESK_DOMAIN' => [
            'label' => 'Freshdesk Domain',
            'type' => 'text',
            'description' => 'Your Freshdesk domain (e.g., yourcompany.freshdesk.com)',
        ],
        'FRESHDESK_API_KEY' => [
            'label' => 'Freshdesk API Key',
            'type' => 'encrypted',
            'description' => 'Your Freshdesk API key',
        ],
    ],
    'customer_settings' => [
        'freshdesk_company_id' => [
            'label' => 'Freshdesk Company ID',
            'type' => 'text',
            'description' => 'Link this customer to a Freshdesk company',
        ],
    ],
    'rate_limiting' => [
        // Delay between individual API requests (milliseconds)
        'delay_between_requests_ms' => 200, // 200ms = max ~300 requests/min

        // Delay between pagination pages (milliseconds)
        'delay_between_pages_ms' => 1000, // 1 second between pages

        // Retry configuration for failed requests
        'retry_attempts' => 3, // Number of retry attempts
        'retry_delay_ms' => 2000, // Initial retry delay (2 seconds)
        'exponential_backoff' => true, // Double delay on each retry

        // Rate limit monitoring
        'respect_rate_limit_headers' => true, // Parse X-RateLimit-* headers
        'min_remaining_requests' => 50, // Pause if remaining requests below this
        'pause_duration_seconds' => 60, // How long to pause when near limit
    ]
];
