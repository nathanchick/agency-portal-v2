<?php

namespace Modules\Organisation\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserAddedToOrganisation extends Notification
{
    use Queueable;

    public $organisationName;
    public $customerName;

    /**
     * Create a new notification instance.
     */
    public function __construct($organisationName, $customerName)
    {
        $this->organisationName = $organisationName;
        $this->customerName = $customerName;
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
        $loginUrl = url(route('login'));

        return (new MailMessage)
            ->subject('You have been added to ' . $this->organisationName)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('You have been added to **' . $this->organisationName . '** and assigned to **' . $this->customerName . '**.')
            ->line('You can now access this organisation using your existing account credentials.')
            ->action('Login to Your Account', $loginUrl)
            ->line('If you have any questions, please contact your organisation administrator.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'organisation_name' => $this->organisationName,
            'customer_name' => $this->customerName,
        ];
    }
}
