<?php

return [
    'name' => 'CspManagement',

    /*
    |--------------------------------------------------------------------------
    | CSP API Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for the external CSP reporting service API.
    | Endpoint: {api_url}/policies/{client_id}?token={api_token}
    |
    */

    'api_url' => env('CSP_API_URL', 'https://csp.deploy.co.uk'),
    'api_token' => env('CSP_API_TOKEN', 'bc4b25fbe9db20e39160084e374bcc33'),

    /*
    |--------------------------------------------------------------------------
    | API Request Settings
    |--------------------------------------------------------------------------
    |
    | Timeout and retry configuration for API requests.
    |
    */

    'api_timeout' => env('CSP_API_TIMEOUT', 30),
    'api_retry_times' => env('CSP_API_RETRY_TIMES', 3),
    'api_retry_delay' => env('CSP_API_RETRY_DELAY', 100),

    /*
    |--------------------------------------------------------------------------
    | Test Customer
    |--------------------------------------------------------------------------
    |
    | Customer ID for testing purposes.
    |
    */

    'test_customer_id' => env('CSP_TEST_CUSTOMER_ID', '99aaa83e-58dc-4d66-aebb-4a07b0d3e259'),
];
