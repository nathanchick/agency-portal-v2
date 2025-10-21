<?php

namespace Modules\Organisation\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Password;

class TeamInvitation extends Notification
{
    use Queueable;

    public string $teamName;
    public string $invitedBy;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $teamName, string $invitedBy)
    {
        $this->teamName = $teamName;
        $this->invitedBy = $invitedBy;
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
        $token = Password::broker()->createToken($notifiable);
        $resetUrl = url(route('password.reset', [
            'token' => $token,
            'email' => $notifiable->email,
        ], false));

        return (new MailMessage)
            ->subject('You\'ve been invited to join ' . $this->teamName)
            ->greeting('Hello!')
            ->line($this->invitedBy . ' has invited you to join ' . $this->teamName . '.')
            ->line('To get started, please set your password by clicking the button below:')
            ->action('Set Password', $resetUrl)
            ->line('This password set link will expire in ' . config('auth.passwords.'.config('auth.defaults.passwords').'.expire') . ' minutes.')
            ->line('If you did not expect this invitation, no further action is required.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
