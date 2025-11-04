<?php

namespace Modules\Document\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Modules\Document\Models\DocumentRequest;

class DocumentStatusChangeNotification extends Notification
{
    use Queueable;

    public $documentRequest;

    public $action; // 'approved' or 'declined'

    public $actionBy;

    /**
     * Create a new notification instance.
     */
    public function __construct(DocumentRequest $documentRequest, string $action, User $actionBy)
    {
        $this->documentRequest = $documentRequest;
        $this->action = $action;
        $this->actionBy = $actionBy;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $this->documentRequest->load(['document', 'organisation', 'customer']);

        $subject = $this->action === 'approved'
            ? 'Document Approved'
            : 'Document Declined';

        $actionUrl = url('/customer/documents/'.$this->documentRequest->id.'/view-sign');

        $message = (new MailMessage)
            ->subject($subject)
            ->greeting('Hello '.$notifiable->name.'!');

        if ($this->action === 'approved') {
            $message->line('A document has been approved by '.$this->actionBy->name.'.');
        } else {
            $message->line('A document has been declined by '.$this->actionBy->name.'.');
        }

        $message->line('**Document:** '.$this->documentRequest->document->name)
            ->line('**Customer:** '.$this->documentRequest->customer->name)
            ->line('**Action By:** '.$this->actionBy->name.' ('.$this->actionBy->email.')');

        if ($this->documentRequest->notes) {
            $message->line('**Original Notes:** '.$this->documentRequest->notes);
        }

        $message->action('View Document', $actionUrl);

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
            'action' => $this->action,
            'action_by' => $this->actionBy->name,
        ];
    }
}
