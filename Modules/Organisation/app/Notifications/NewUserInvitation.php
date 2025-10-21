<?php

namespace Modules\Organisation\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Password;

class NewUserInvitation extends Notification
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
        // Generate password reset token
        $token = Password::createToken($notifiable);
        $resetUrl = url(route('password.reset', ['token' => $token, 'email' => $notifiable->email], false));

        return (new MailMessage)
            ->subject('Welcome to ' . config('app.name'))
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('You have been added to **' . $this->organisationName . '** as a user for **' . $this->customerName . '**.')
            ->line('To get started, please set your password by clicking the button below:')
            ->action('Set Your Password', $resetUrl)
            ->line('This password setup link will expire in ' . config('auth.passwords.users.expire') . ' minutes.')
            ->line('If you did not expect to receive this invitation, please ignore this email.');
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
