<?php

return [
    /*
    |--------------------------------------------------------------------------
    | PostMark Inbound Webhook Configuration
    |--------------------------------------------------------------------------
    */

    /**
     * Skip webhook validation (useful for local development)
     */
    'skip_webhook_validation' => env('POSTMARK_SKIP_VALIDATION', false),

    /**
     * Verify webhook requests come from PostMark IPs
     */
    'verify_webhook_ip' => env('POSTMARK_VERIFY_IP', true),

    /**
     * Optional webhook token for additional security
     * Can be passed as X-PostMark-Token header or ?token= query param
     */
    'inbound_webhook_token' => env('POSTMARK_INBOUND_WEBHOOK_TOKEN'),

    /**
     * PostMark API Token (for sending emails)
     */
    'api_token' => env('POSTMARK_TOKEN'),
];
