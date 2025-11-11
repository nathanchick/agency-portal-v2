<?php

namespace Modules\PostMark\Services;

use Illuminate\Support\Facades\Log;
use Modules\PostMark\Exceptions\UserNotFoundException;
use Modules\PostMark\Models\InboundEmail;
use Modules\Ticket\Models\Ticket;

class TicketCreator
{
    public function __construct(
        private UserMatcher $userMatcher,
        private EmailParser $emailParser
    ) {
    }

    /**
     * Create a new ticket from an inbound email
     *
     * @throws UserNotFoundException
     */
    public function createFromEmail(InboundEmail $inboundEmail): Ticket
    {
        // Get user, customer, and organisation context
        $context = $this->userMatcher->getEmailContext($inboundEmail);

        if (! $context['customer']) {
            throw new \Exception('Unable to determine customer context for user: '.$context['user']->email);
        }

        // Get clean email body and subject
        $cleanBody = $this->emailParser->getCleanBody($inboundEmail);
        $cleanSubject = $this->emailParser->getCleanSubject($inboundEmail);

        // Get default ticket settings from config
        $defaultStatus = config('postmark.default_ticket_status', 'open');
        $defaultPriority = config('postmark.default_ticket_priority', 'medium');

        // Create the ticket
        $ticket = Ticket::create([
            'organisation_id' => $context['organisation']->id,
            'customer_id' => $context['customer']->id,
            'user_id' => $context['user']->id,
            'title' => $cleanSubject,
            'message' => $cleanBody,
            'priority' => $defaultPriority,
            'status' => $defaultStatus,
            'postmark_message_id' => $inboundEmail->postmark_message_id,
        ]);

        Log::info('Ticket created from email', [
            'ticket_id' => $ticket->id,
            'inbound_email_id' => $inboundEmail->id,
            'from_email' => $inboundEmail->from_email,
            'subject' => $cleanSubject,
        ]);

        return $ticket;
    }
}
