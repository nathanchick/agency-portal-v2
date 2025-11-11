<?php

namespace Modules\PostMark\Services;

use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\PostMark\Exceptions\UserNotFoundException;
use Modules\PostMark\Models\InboundEmail;
use Modules\Ticket\Models\Message;
use Modules\Ticket\Models\Ticket;

class InboundEmailProcessor
{
    public function __construct(
        private EmailThreadDetector $threadDetector,
        private EmailParser $emailParser,
        private UserMatcher $userMatcher,
        private TicketCreator $ticketCreator,
        private MessageCreator $messageCreator
    ) {
    }

    /**
     * Process an inbound email and create ticket or add message
     */
    public function process(InboundEmail $inboundEmail): void
    {
        try {
            // Step 1: Mark as processing
            $inboundEmail->markAsProcessing();

            Log::info('Processing inbound email', [
                'inbound_email_id' => $inboundEmail->id,
                'from_email' => $inboundEmail->from_email,
                'subject' => $inboundEmail->subject,
            ]);

            // Step 2: Check if this is a new email or a reply
            $isReply = $this->threadDetector->isReply($inboundEmail);

            DB::beginTransaction();

            try {
                if ($isReply) {
                    // Step 3a: Handle reply email
                    $this->processReplyEmail($inboundEmail);
                } else {
                    // Step 3b: Handle new email
                    $this->processNewEmail($inboundEmail);
                }

                DB::commit();
            } catch (Exception $e) {
                DB::rollBack();
                throw $e;
            }

            Log::info('Inbound email processed successfully', [
                'inbound_email_id' => $inboundEmail->id,
                'ticket_id' => $inboundEmail->ticket_id,
                'message_id' => $inboundEmail->message_id,
            ]);
        } catch (UserNotFoundException $e) {
            // User not found - mark as bounced
            $inboundEmail->markAsBounced('User not found: '.$e->getMessage());

            Log::warning('Inbound email bounced - user not found', [
                'inbound_email_id' => $inboundEmail->id,
                'from_email' => $inboundEmail->from_email,
                'error' => $e->getMessage(),
            ]);
        } catch (Exception $e) {
            // Other errors - mark as failed
            $inboundEmail->markAsFailed($e->getMessage());

            Log::error('Inbound email processing failed', [
                'inbound_email_id' => $inboundEmail->id,
                'from_email' => $inboundEmail->from_email,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // Re-throw to trigger job retry
            throw $e;
        }
    }

    /**
     * Process a new email (create new ticket)
     */
    private function processNewEmail(InboundEmail $inboundEmail): void
    {
        Log::info('Processing as new email', [
            'inbound_email_id' => $inboundEmail->id,
        ]);

        // Create ticket from email
        $ticket = $this->ticketCreator->createFromEmail($inboundEmail);

        // Process attachments if any
        $this->processAttachments($inboundEmail, $ticket);

        // Mark as processed
        $inboundEmail->markAsProcessed($ticket);
    }

    /**
     * Process a reply email (add message to existing ticket)
     */
    private function processReplyEmail(InboundEmail $inboundEmail): void
    {
        Log::info('Processing as reply email', [
            'inbound_email_id' => $inboundEmail->id,
        ]);

        // Try to find the ticket
        $ticket = $this->threadDetector->findTicket($inboundEmail);

        if (! $ticket) {
            // Ticket not found - treat as new email instead
            Log::warning('Reply ticket not found - treating as new email', [
                'inbound_email_id' => $inboundEmail->id,
                'in_reply_to' => $inboundEmail->in_reply_to,
            ]);

            $this->processNewEmail($inboundEmail);

            return;
        }

        // Add message to the ticket
        $message = $this->messageCreator->addReplyToTicket($ticket, $inboundEmail);

        // Process attachments if any
        $this->processAttachments($inboundEmail, $message);

        // Mark as processed
        $inboundEmail->markAsProcessed($ticket, $message);
    }

    /**
     * Process email attachments
     */
    private function processAttachments(InboundEmail $inboundEmail, Ticket|Message $model): void
    {
        $attachments = $inboundEmail->raw_payload['Attachments'] ?? [];

        if (empty($attachments)) {
            return;
        }

        Log::info('Processing email attachments', [
            'inbound_email_id' => $inboundEmail->id,
            'attachment_count' => count($attachments),
            'model_type' => get_class($model),
            'model_id' => $model->id,
        ]);

        foreach ($attachments as $attachment) {
            try {
                $this->processAttachment($attachment, $model);
            } catch (Exception $e) {
                Log::error('Failed to process attachment', [
                    'inbound_email_id' => $inboundEmail->id,
                    'attachment_name' => $attachment['Name'] ?? 'unknown',
                    'error' => $e->getMessage(),
                ]);
                // Continue processing other attachments
            }
        }
    }

    /**
     * Process a single attachment
     */
    private function processAttachment(array $attachment, Ticket|Message $model): void
    {
        // Decode base64 content
        $content = base64_decode($attachment['Content']);

        // Check file size (10MB limit)
        $maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (strlen($content) > $maxSize) {
            Log::warning('Attachment too large, skipping', [
                'attachment_name' => $attachment['Name'],
                'size' => strlen($content),
            ]);

            return;
        }

        // Create temporary file
        $tempPath = sys_get_temp_dir().'/'.uniqid('email_attachment_').'_'.$attachment['Name'];
        file_put_contents($tempPath, $content);

        try {
            // Add to media library
            $model->addMedia($tempPath)
                ->sanitizingFileName(function ($fileName) {
                    return strtolower(str_replace(['#', '/', '\\', ' '], '-', $fileName));
                })
                ->toMediaCollection('attachments');

            Log::info('Attachment processed successfully', [
                'attachment_name' => $attachment['Name'],
                'model_type' => get_class($model),
                'model_id' => $model->id,
            ]);
        } finally {
            // Clean up temporary file
            if (file_exists($tempPath)) {
                unlink($tempPath);
            }
        }
    }
}
