<?php

namespace Modules\OpenAi\Services;

use Modules\Organisation\Models\Organisation;
use Modules\Ticket\Models\Ticket;
use OpenAI;

class OpenAiService
{
    protected ?string $apiKey;
    protected string $model;
    protected PiiRedactionService $piiRedactionService;
    protected Organisation $organisation;

    public function __construct(Organisation $organisation, PiiRedactionService $piiRedactionService)
    {
        $this->organisation = $organisation;
        $this->apiKey = $this->getApiKey($organisation);
        $this->model = $this->getModel($organisation);
        $this->piiRedactionService = $piiRedactionService;
    }

    /**
     * Get OpenAI API key from organisation settings
     */
    protected function getApiKey(Organisation $organisation): ?string
    {
        $setting = $organisation->settings()
            ->where('module', 'OpenAi')
            ->where('key', 'OPENAI_API_KEY')
            ->first();

        return $setting?->value;
    }

    /**
     * Get OpenAI model from organisation settings
     */
    protected function getModel(Organisation $organisation): string
    {
        $setting = $organisation->settings()
            ->where('module', 'OpenAi')
            ->where('key', 'openai_model')
            ->first();

        return $setting?->value ?? 'gpt-4o-mini';
    }

    /**
     * Get the current model being used
     */
    public function getCurrentModel(): string
    {
        return $this->model;
    }

    /**
     * Check if OpenAI is configured and enabled for the organisation
     */
    public function isConfigured(): bool
    {
        return !empty($this->apiKey);
    }

    /**
     * Generate a summary for a ticket
     *
     * @throws \Exception
     */
    public function generateTicketSummary(Ticket $ticket): string
    {
        if (!$this->isConfigured()) {
            throw new \Exception('OpenAI API key not configured for this organisation');
        }

        // Load ticket with messages
        $ticket->load(['messages.user', 'user', 'customer']);

        // Build the prompt with redacted content
        $prompt = $this->buildPrompt($ticket);

        try {
            $client = OpenAI::client($this->apiKey);

            $response = $client->chat()->create([
                'model' => $this->model,
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are a helpful assistant that summarizes customer support ticket conversations. Focus on facts and provide concise, actionable summaries.',
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt,
                    ],
                ],
                'temperature' => 0.7,
                'max_tokens' => 500,
            ]);

            return trim($response->choices[0]->message->content);

        } catch (\Exception $e) {
            \Log::error('OpenAI API Error', [
                'ticket_id' => $ticket->id,
                'error' => $e->getMessage(),
            ]);

            throw new \Exception('Failed to generate summary: ' . $e->getMessage());
        }
    }

    /**
     * Build the prompt for OpenAI with PII redaction
     */
    protected function buildPrompt(Ticket $ticket): string
    {
        $prompt = "You are summarizing a customer support ticket. Provide a concise summary in the following format:\n\n";
        $prompt .= "**Issue Summary:** (1-2 sentences describing the original issue)\n\n";
        $prompt .= "**Key Developments:** (2-4 bullet points of important updates)\n\n";
        $prompt .= "**Current Status:** (1-2 sentences about where things stand and next steps)\n\n";
        $prompt .= "---\n\n";
        $prompt .= "TICKET DETAILS:\n";
        $prompt .= "- Title: " . $this->piiRedactionService->redact($ticket->title) . "\n";
        $prompt .= "- Status: " . $ticket->status . "\n";
        $prompt .= "- Priority: " . $ticket->priority . "\n";
        $prompt .= "- Customer: " . $ticket->customer->name . "\n";
        $prompt .= "- Created: " . $ticket->created_at->format('Y-m-d H:i:s') . "\n\n";

        $prompt .= "CONVERSATION (in chronological order):\n\n";

        // Add original message
        $prompt .= "1. " . $ticket->user->name . " (" . $ticket->created_at->format('Y-m-d H:i') . "):\n";
        $prompt .= $this->piiRedactionService->redact($ticket->message) . "\n\n";

        // Add all response messages
        $counter = 2;
        foreach ($ticket->messages as $message) {
            $prompt .= "{$counter}. " . $message->user->name . " (" . $message->created_at->format('Y-m-d H:i') . "):\n";
            $prompt .= $this->piiRedactionService->redact($message->message) . "\n\n";
            $counter++;
        }

        return $prompt;
    }

    /**
     * Analyze ticket quality and provide suggestions
     *
     * @param string $promptData JSON-encoded prompt with 'system' and 'user' keys
     * @return array
     * @throws \Exception
     */
    public function analyzeTicketQuality(string $promptData): array
    {
        if (!$this->isConfigured()) {
            throw new \Exception('OpenAI API key not configured for this organisation');
        }

        $promptArray = json_decode($promptData, true);
        if (!$promptArray || !isset($promptArray['system']) || !isset($promptArray['user'])) {
            throw new \InvalidArgumentException('Invalid prompt data format');
        }

        try {
            $client = OpenAI::client($this->apiKey);

            $requestData = [
                'model' => $this->model,
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => $promptArray['system'],
                    ],
                    [
                        'role' => 'user',
                        'content' => $promptArray['user'],
                    ],
                ],
                'temperature' => 0.3, // Lower temperature for more consistent output
                'max_tokens' => 800,
                'response_format' => ['type' => 'json_object'], // Force JSON response
            ];

            // Log the full request data
            \Log::debug('OpenAI Ticket Quality Analysis Request', [
                'model' => $requestData['model'],
                'temperature' => $requestData['temperature'],
                'max_tokens' => $requestData['max_tokens'],
                'system_prompt_length' => strlen($promptArray['system']),
                'system_prompt_preview' => substr($promptArray['system'], 0, 200) . '...',
                'user_prompt_length' => strlen($promptArray['user']),
                'user_prompt' => $promptArray['user'],
                'estimated_tokens' => (int)((strlen($promptArray['system']) + strlen($promptArray['user'])) / 4),
            ]);

            $response = $client->chat()->create($requestData);

            $content = trim($response->choices[0]->message->content);
            $parsed = json_decode($content, true);

            // Log the response
            \Log::debug('OpenAI Ticket Quality Analysis Response', [
                'response_length' => strlen($content),
                'tokens_used' => $response->usage->totalTokens ?? null,
                'prompt_tokens' => $response->usage->promptTokens ?? null,
                'completion_tokens' => $response->usage->completionTokens ?? null,
                'overall_score' => $parsed['overallScore'] ?? null,
                'suggestions_count' => count($parsed['suggestions'] ?? []),
            ]);

            if (!$parsed) {
                throw new \Exception('Failed to parse OpenAI response as JSON');
            }

            // Add usage information for cost tracking
            $parsed['usage'] = [
                'prompt_tokens' => $response->usage->promptTokens,
                'completion_tokens' => $response->usage->completionTokens,
                'total_tokens' => $response->usage->totalTokens,
            ];

            return $parsed;

        } catch (\Exception $e) {
            \Log::error('OpenAI Ticket Quality Analysis Error', [
                'error' => $e->getMessage(),
            ]);

            throw new \Exception('Failed to analyze ticket quality: ' . $e->getMessage());
        }
    }

    /**
     * Analyze CSP violation and provide security assessment
     *
     * @param string $promptData JSON-encoded prompt with 'system' and 'user' keys
     * @return array
     * @throws \Exception
     */
    public function analyzeCspViolation(string $promptData): array
    {
        if (!$this->isConfigured()) {
            throw new \Exception('OpenAI API key not configured for this organisation');
        }

        $promptArray = json_decode($promptData, true);
        if (!$promptArray || !isset($promptArray['system']) || !isset($promptArray['user'])) {
            throw new \InvalidArgumentException('Invalid prompt data format');
        }

        try {
            $client = OpenAI::client($this->apiKey);

            $requestData = [
                'model' => $this->model,
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => $promptArray['system'],
                    ],
                    [
                        'role' => 'user',
                        'content' => $promptArray['user'],
                    ],
                ],
                'temperature' => 0.3, // Lower temperature for more consistent security analysis
                'max_tokens' => 1000,
                'response_format' => ['type' => 'json_object'], // Force JSON response
            ];

            // Log the request
            \Log::debug('OpenAI CSP Violation Analysis Request', [
                'model' => $requestData['model'],
                'temperature' => $requestData['temperature'],
                'max_tokens' => $requestData['max_tokens'],
                'system_prompt_length' => strlen($promptArray['system']),
                'user_prompt_length' => strlen($promptArray['user']),
                'estimated_tokens' => (int)((strlen($promptArray['system']) + strlen($promptArray['user'])) / 4),
            ]);

            $response = $client->chat()->create($requestData);

            $content = trim($response->choices[0]->message->content);
            $parsed = json_decode($content, true);

            // Log the response
            \Log::debug('OpenAI CSP Violation Analysis Response', [
                'response_length' => strlen($content),
                'tokens_used' => $response->usage->totalTokens ?? null,
                'prompt_tokens' => $response->usage->promptTokens ?? null,
                'completion_tokens' => $response->usage->completionTokens ?? null,
                'trust_assessment' => $parsed['trust_assessment'] ?? null,
                'risk_level' => $parsed['risk_level'] ?? null,
            ]);

            if (!$parsed) {
                throw new \Exception('Failed to parse OpenAI response as JSON');
            }

            // Add usage information for cost tracking
            $parsed['usage'] = [
                'prompt_tokens' => $response->usage->promptTokens,
                'completion_tokens' => $response->usage->completionTokens,
                'total_tokens' => $response->usage->totalTokens,
            ];

            return $parsed;

        } catch (\Exception $e) {
            \Log::error('OpenAI CSP Violation Analysis Error', [
                'error' => $e->getMessage(),
            ]);

            throw new \Exception('Failed to analyze CSP violation: ' . $e->getMessage());
        }
    }

    /**
     * Test the OpenAI connection
     */
    public function testConnection(): bool
    {
        if (!$this->isConfigured()) {
            return false;
        }

        try {
            $client = OpenAI::client($this->apiKey);

            $response = $client->chat()->create([
                'model' => $this->model,
                'messages' => [
                    ['role' => 'user', 'content' => 'Test connection. Reply with "OK".'],
                ],
                'max_tokens' => 10,
            ]);

            return !empty($response->choices[0]->message->content);

        } catch (\Exception $e) {
            \Log::error('OpenAI Connection Test Failed', [
                'error' => $e->getMessage(),
            ]);

            return false;
        }
    }
}
