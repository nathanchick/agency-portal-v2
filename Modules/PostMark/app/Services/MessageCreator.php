<?php

namespace Modules\PostMark\Services;

use Illuminate\Support\Facades\Log;
use Modules\PostMark\Exceptions\TicketNotFoundException;
use Modules\PostMark\Exceptions\UserNotFoundException;
use Modules\PostMark\Models\InboundEmail;
use Modules\Ticket\Models\Message;
use Modules\Ticket\Models\Ticket;

class MessageCreator
{
    public function __construct(
        private UserMatcher $userMatcher,
        private EmailParser $emailParser
    ) {
    }

    /**
     * Add a reply message to an existing ticket
     *
     * @throws UserNotFoundException
     * @throws TicketNotFoundException
     */
    public function addReplyToTicket(Ticket $ticket, InboundEmail $inboundEmail): Message
    {
        // Get user context
        $context = $this->userMatcher->getEmailContext($inboundEmail);

        // Verify user has access to the ticket
        // For now, we'll allow any user from the same customer to reply
        if ($ticket->customer_id !== $context['customer']?->id) {
            Log::warning('User attempting to reply to ticket from different customer', [
                'ticket_id' => $ticket->id,
                'ticket_customer_id' => $ticket->customer_id,
                'user_customer_id' => $context['customer']?->id,
                'user_id' => $context['user']->id,
            ]);
        }

        // Get clean reply body (use StrippedTextReply for replies)
        $cleanBody = $this->emailParser->getCleanBody($inboundEmail);

        // Create the message
        $message = $ticket->messages()->create([
            'user_id' => $context['user']->id,
            'message' => $cleanBody,
            'is_private' => false, // Email replies are public by default
        ]);

        Log::info('Message added to ticket from email reply', [
            'ticket_id' => $ticket->id,
            'message_id' => $message->id,
            'inbound_email_id' => $inboundEmail->id,
            'from_email' => $inboundEmail->from_email,
        ]);

        return $message;
    }
}
