<?php

namespace Modules\Ticket\Services;

use Modules\OpenAi\Services\OpenAiService;
use Modules\OpenAi\Services\PiiRedactionService;
use Modules\Ticket\Models\Ticket;
use Modules\Ticket\Models\TicketSummary;

class TicketSummaryService
{
    protected OpenAiService $openAiService;
    protected PiiRedactionService $piiRedactionService;

    public function __construct(OpenAiService $openAiService, PiiRedactionService $piiRedactionService)
    {
        $this->openAiService = $openAiService;
        $this->piiRedactionService = $piiRedactionService;
    }

    /**
     * Get summary for a ticket (retrieves existing or generates new)
     */
    public function getSummary(Ticket $ticket): ?TicketSummary
    {
        // Load existing summary
        $summary = $ticket->summary;

        // If no summary exists, generate one
        if (!$summary) {
            return $this->generateSummary($ticket);
        }

        // If summary is stale, regenerate
        if ($this->shouldRegenerate($ticket)) {
            return $this->regenerateSummary($ticket);
        }

        return $summary;
    }

    /**
     * Check if summary should be regenerated
     */
    public function shouldRegenerate(Ticket $ticket): bool
    {
        $summary = $ticket->summary;

        if (!$summary) {
            return true;
        }

        // Load messages count
        $currentMessageCount = $ticket->messages()->count();

        // Check if new messages have been added since summary was generated
        if ($currentMessageCount > $summary->message_count) {
            return true;
        }

        // Check if last message ID differs
        $lastMessage = $ticket->messages()->latest()->first();
        if ($lastMessage && $summary->last_message_id !== $lastMessage->id) {
            return true;
        }

        return false;
    }

    /**
     * Generate a new summary
     */
    public function generateSummary(Ticket $ticket): ?TicketSummary
    {
        if (!$this->openAiService->isConfigured()) {
            \Log::info('OpenAI not configured for organisation', [
                'organisation_id' => $ticket->organisation_id,
                'ticket_id' => $ticket->id,
            ]);
            return null;
        }

        try {
            // Generate summary text via OpenAI
            $summaryText = $this->openAiService->generateTicketSummary($ticket);

            // Get message statistics
            $messageCount = $ticket->messages()->count();
            $lastMessage = $ticket->messages()->latest()->first();

            // Create summary record
            $summary = TicketSummary::create([
                'ticket_id' => $ticket->id,
                'summary' => $summaryText,
                'message_count' => $messageCount,
                'last_message_id' => $lastMessage?->id,
                'generated_at' => now(),
            ]);

            \Log::info('Ticket summary generated', [
                'ticket_id' => $ticket->id,
                'summary_id' => $summary->id,
                'message_count' => $messageCount,
            ]);

            return $summary;

        } catch (\Exception $e) {
            \Log::error('Failed to generate ticket summary', [
                'ticket_id' => $ticket->id,
                'error' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Regenerate existing summary (force)
     */
    public function regenerateSummary(Ticket $ticket): ?TicketSummary
    {
        // Delete existing summary
        if ($ticket->summary) {
            $ticket->summary->delete();
        }

        // Generate new summary
        return $this->generateSummary($ticket);
    }

    /**
     * Check if summaries are enabled for the ticket's organisation
     *
     * This method provides granular control with two-tier checking:
     * 1. Module-level: OpenAI integration must be enabled
     * 2. Feature-level: Ticket summary feature must be specifically enabled
     *
     * This allows for fine-grained control where OpenAI can be enabled
     * for some features but not others.
     */
    public function isEnabledForOrganisation(Ticket $ticket): bool
    {
        $organisation = $ticket->customer->organisation;

        // First check: Is the OpenAI module enabled for this organisation?
        $openAiEnabled = $organisation->settings()
            ->where('module', 'OpenAi')
            ->where('key', 'status')
            ->first();

        if (!$openAiEnabled || $openAiEnabled->value !== '1') {
            return false;
        }

        // Second check: Is the ticket summary feature specifically enabled?
        $ticketSummaryEnabled = $organisation->settings()
            ->where('module', 'OpenAi')
            ->where('key', 'ticket_summary_status')
            ->first();

        return $ticketSummaryEnabled && $ticketSummaryEnabled->value === '1';
    }

    /**
     * Delete summary for a ticket
     */
    public function deleteSummary(Ticket $ticket): bool
    {
        if ($ticket->summary) {
            return $ticket->summary->delete();
        }

        return false;
    }
}
