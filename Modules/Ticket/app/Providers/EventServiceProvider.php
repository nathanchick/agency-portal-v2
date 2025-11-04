<?php

namespace Modules\Ticket\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event handler mappings for the application.
     *
     * @var array<string, array<int, string>>
     */
    protected $listen = [
        'eloquent.created: Modules\Organisation\Models\Organisation' => [
            \Modules\Ticket\Listeners\CreateDefaultTicketStatuses::class,
        ],
        \Modules\Ticket\Events\TicketCreated::class => [
            \Modules\Ticket\Listeners\ProcessAutomationRules::class,
        ],
        \Modules\Ticket\Events\TicketUpdated::class => [
            \Modules\Ticket\Listeners\ProcessAutomationRules::class,
        ],
    ];

    /**
     * Indicates if events should be discovered.
     *
     * @var bool
     */
    protected static $shouldDiscoverEvents = true;

    /**
     * Configure the proper event listeners for email verification.
     */
    protected function configureEmailVerification(): void {}
}
