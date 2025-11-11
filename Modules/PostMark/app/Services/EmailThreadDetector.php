<?php

namespace Modules\PostMark\Services;

use Modules\PostMark\Models\InboundEmail;
use Modules\Ticket\Models\Ticket;

class EmailThreadDetector
{
    /**
     * Determine if the email is a reply based on StrippedTextReply field
     */
    public function isReply(InboundEmail $inboundEmail): bool
    {
        return ! empty($inboundEmail->stripped_text_reply) || ! empty($inboundEmail->in_reply_to);
    }

    /**
     * Extract In-Reply-To header value from headers array
     */
    public function extractInReplyTo(array $headers): ?string
    {
        foreach ($headers as $header) {
            if (isset($header['Name']) && $header['Name'] === 'In-Reply-To') {
                // Remove angle brackets if present: <message-id> -> message-id
                return trim($header['Value'], '<>');
            }
        }

        return null;
    }

    /**
     * Extract References header and parse into array of message IDs
     */
    public function extractReferences(array $headers): array
    {
        foreach ($headers as $header) {
            if (isset($header['Name']) && $header['Name'] === 'References') {
                // References can be space-separated list of message IDs
                $references = $header['Value'];

                // Split by spaces and remove angle brackets
                return array_map(
                    fn ($ref) => trim($ref, '<>'),
                    preg_split('/\s+/', $references, -1, PREG_SPLIT_NO_EMPTY)
                );
            }
        }

        return [];
    }

    /**
     * Find ticket by PostMark MessageID using multi-tier fallback strategy
     *
     * Strategy:
     * 1. Check In-Reply-To header against tickets.postmark_message_id
     * 2. Check References headers against tickets.postmark_message_id
     * 3. Parse subject line for ticket reference [Ticket #123]
     */
    public function findTicket(InboundEmail $inboundEmail): ?Ticket
    {
        // Strategy 1: Check In-Reply-To header
        if ($inboundEmail->in_reply_to) {
            $ticket = Ticket::where('postmark_message_id', $inboundEmail->in_reply_to)->first();
            if ($ticket) {
                return $ticket;
            }
        }

        // Strategy 2: Check References headers
        if ($inboundEmail->references) {
            $references = $this->extractReferences($inboundEmail->raw_headers ?? []);
            if (! empty($references)) {
                $ticket = Ticket::whereIn('postmark_message_id', $references)
                    ->orderBy('created_at', 'desc')
                    ->first();
                if ($ticket) {
                    return $ticket;
                }
            }
        }

        // Strategy 3: Parse subject for ticket reference
        $ticketId = $this->extractTicketIdFromSubject($inboundEmail->subject);
        if ($ticketId) {
            $ticket = Ticket::where('uuid', $ticketId)
                ->orWhere('id', $ticketId)
                ->first();
            if ($ticket) {
                return $ticket;
            }
        }

        return null;
    }

    /**
     * Extract ticket ID from subject line
     * Patterns: [Ticket #123], (Ticket #123), Re: Ticket 123, #123
     */
    private function extractTicketIdFromSubject(?string $subject): ?string
    {
        if (empty($subject)) {
            return null;
        }

        // Pattern 1: [Ticket #123] or (Ticket #123)
        if (preg_match('/[\[\(]Ticket\s*#?(\d+)[\]\)]/i', $subject, $matches)) {
            return $matches[1];
        }

        // Pattern 2: Ticket 123 or Ticket #123
        if (preg_match('/Ticket\s*#?(\d+)/i', $subject, $matches)) {
            return $matches[1];
        }

        // Pattern 3: #123 (at start or after Re:)
        if (preg_match('/(?:^|Re:\s*)#(\d+)/i', $subject, $matches)) {
            return $matches[1];
        }

        // Pattern 4: UUID format (if tickets use UUIDs in subject)
        if (preg_match('/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i', $subject, $matches)) {
            return $matches[1];
        }

        return null;
    }
}
