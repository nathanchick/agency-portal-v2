<?php

namespace Modules\OpenAi\Services;

class PiiRedactionService
{
    /**
     * Redaction patterns with their replacement tokens
     */
    protected array $patterns = [
        // Email addresses
        'email' => [
            'pattern' => '/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/',
            'replacement' => '[EMAIL]',
        ],
        // Phone numbers (various formats)
        'phone' => [
            'pattern' => '/\b(?:\+?1[-.]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b|\b\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}\b/',
            'replacement' => '[PHONE]',
        ],
        // Credit card numbers (basic Luhn check)
        'credit_card' => [
            'pattern' => '/\b(?:\d{4}[-\s]?){3}\d{4}\b/',
            'replacement' => '[CREDIT_CARD]',
        ],
        // Common password patterns in text
        'password' => [
            'pattern' => '/\b(?:password|passwd|pwd)[\s:=]+[\S]+/i',
            'replacement' => 'password: [REDACTED]',
        ],
        // API keys and tokens (common patterns)
        'api_key' => [
            'pattern' => '/\b(?:api[-_]?key|token|secret)[\s:=]+[A-Za-z0-9_\-]{20,}\b/i',
            'replacement' => 'api_key: [REDACTED]',
        ],
    ];

    /**
     * Redact PII from the given text
     */
    public function redact(string $text): string
    {
        foreach ($this->patterns as $type => $config) {
            $text = preg_replace($config['pattern'], $config['replacement'], $text);
        }

        return $text;
    }

    /**
     * Redact PII with tracking of what was redacted
     */
    public function redactWithTracking(string $text): array
    {
        $redactedText = $text;
        $redactions = [];

        foreach ($this->patterns as $type => $config) {
            $matches = [];
            preg_match_all($config['pattern'], $redactedText, $matches);

            if (!empty($matches[0])) {
                $redactions[$type] = count($matches[0]);
                $redactedText = preg_replace($config['pattern'], $config['replacement'], $redactedText);
            }
        }

        return [
            'redacted_text' => $redactedText,
            'redactions' => $redactions,
            'original_length' => strlen($text),
            'redacted_length' => strlen($redactedText),
        ];
    }

    /**
     * Check if text contains potential PII without redacting
     */
    public function containsPii(string $text): bool
    {
        foreach ($this->patterns as $config) {
            if (preg_match($config['pattern'], $text)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Validate credit card number using Luhn algorithm
     */
    protected function isValidCreditCard(string $number): bool
    {
        $number = preg_replace('/\D/', '', $number);

        if (strlen($number) < 13 || strlen($number) > 19) {
            return false;
        }

        $sum = 0;
        $numDigits = strlen($number);
        $parity = $numDigits % 2;

        for ($i = 0; $i < $numDigits; $i++) {
            $digit = (int)$number[$i];

            if ($i % 2 == $parity) {
                $digit *= 2;
            }

            if ($digit > 9) {
                $digit -= 9;
            }

            $sum += $digit;
        }

        return ($sum % 10) == 0;
    }

    /**
     * Add custom redaction pattern
     */
    public function addPattern(string $name, string $pattern, string $replacement): void
    {
        $this->patterns[$name] = [
            'pattern' => $pattern,
            'replacement' => $replacement,
        ];
    }

    /**
     * Get all configured patterns
     */
    public function getPatterns(): array
    {
        return $this->patterns;
    }
}
