<?php

namespace Modules\OpenAi\Services;

use Modules\Organisation\Models\Organisation;
use Modules\Ticket\Models\Ticket;
use OpenAI;

class OpenAiService
{
    protected ?string $apiKey;
    protected PiiRedactionService $piiRedactionService;

    public function __construct(Organisation $organisation, PiiRedactionService $piiRedactionService)
    {
        $this->apiKey = $this->getApiKey($organisation);
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
                'model' => 'gpt-3.5-turbo',
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
                'model' => 'gpt-3.5-turbo',
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
