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
        'ticket_quality_assistant_status' => [
            'label' => 'Enable AI Ticket Quality Assistant',
            'type' => 'yes_no',
            'description' => 'Help customers write better tickets with AI-powered suggestions',
            'default' => '1',
        ],
        'ticket_quality_auto_check' => [
            'label' => 'Enable Pre-Submit Quality Check',
            'type' => 'yes_no',
            'description' => 'Automatically check ticket quality before submission',
            'default' => '1',
        ],
        'ticket_quality_min_score' => [
            'label' => 'Minimum Quality Score',
            'type' => 'number',
            'description' => 'Show pre-submit warning if score below this (0-100)',
            'default' => '60',
        ],
        'ticket_quality_good_threshold' => [
            'label' => 'Good Quality Threshold',
            'type' => 'number',
            'description' => 'Score threshold for "Good" quality label (0-100)',
            'default' => '75',
        ],
        'ticket_quality_fair_threshold' => [
            'label' => 'Fair Quality Threshold',
            'type' => 'number',
            'description' => 'Score threshold for "Fair" quality label (0-100)',
            'default' => '60',
        ],
        'openai_model' => [
            'label' => 'OpenAI Model',
            'type' => 'select',
            'description' => 'AI model to use for analysis (GPT-4o mini recommended for best value)',
            'options' => [
                'gpt-4o-mini' => 'GPT-4o mini ($0.15/$0.60 per 1M tokens) - Recommended',
                'gpt-4o' => 'GPT-4o ($2.50/$10.00 per 1M tokens) - Most capable',
                'gpt-3.5-turbo' => 'GPT-3.5 Turbo ($0.50/$1.50 per 1M tokens) - Legacy',
            ],
            'default' => 'gpt-4o-mini',
        ],
        'csp_violation_analysis_status' => [
            'label' => 'Enable CSP Violation Analysis',
            'type' => 'yes_no',
            'description' => 'Enable AI-powered security analysis of CSP violations',
            'default' => '1',
        ],
        'csp_pii_redaction_enabled' => [
            'label' => 'Enable PII Redaction for CSP Analysis',
            'type' => 'yes_no',
            'description' => 'Redact sensitive information (emails, phones, etc.) before sending CSP violations to OpenAI. Disable for more accurate URL analysis.',
            'default' => '0',
        ],
    ],
];
