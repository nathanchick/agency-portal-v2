<?php

namespace Modules\Document\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Modules\Document\Models\DocumentRequest;

class DocumentRequestNotification extends Notification
{
    use Queueable;

    public $documentRequest;

    public $requiresSignature;

    /**
     * Create a new notification instance.
     */
    public function __construct(DocumentRequest $documentRequest, bool $requiresSignature = true)
    {
        $this->documentRequest = $documentRequest;
        $this->requiresSignature = $requiresSignature;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $this->documentRequest->load(['document', 'organisation']);

        $subject = $this->requiresSignature
            ? 'Document Signature Required'
            : 'Document Ready for Review';

        $actionUrl = $this->requiresSignature
            ? url('/customer/documents/'.$this->documentRequest->id.'/view-sign')
            : url('/customer/documents/'.$this->documentRequest->id.'/view');

        $actionText = $this->requiresSignature
            ? 'View & Sign Document'
            : 'View Document';

        $message = (new MailMessage)
            ->subject($subject)
            ->greeting('Hello '.$notifiable->name.'!');

        if ($this->requiresSignature) {
            $message->line('You have been requested to review and sign the following document:');
        } else {
            $message->line('You have been sent the following document for review:');
        }

        $message->line('**Document:** '.$this->documentRequest->document->name)
            ->line('**From:** '.$this->documentRequest->organisation->name);

        if ($this->documentRequest->notes) {
            $message->line('**Notes:** '.$this->documentRequest->notes);
        }

        $message->action($actionText, $actionUrl)
            ->line('If you have any questions about this document, please contact '.$this->documentRequest->organisation->name.'.');

        return $message;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'document_request_id' => $this->documentRequest->id,
            'document_name' => $this->documentRequest->document->name,
            'requires_signature' => $this->requiresSignature,
        ];
    }
}
