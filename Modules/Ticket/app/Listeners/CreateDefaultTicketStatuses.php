<?php

namespace Modules\Ticket\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Ticket\Models\TicketStatus;

class CreateDefaultTicketStatuses implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  \Modules\Organisation\Models\Organisation  $organisation
     */
    public function handle($organisation): void
    {

        // Create default ticket statuses for new organisation
        TicketStatus::create([
            'organisation_id' => $organisation->id,
            'name' => 'Open',
            'slug' => 'open',
            'color' => '#3b82f6',
            'is_default' => true,
            'is_closed' => false,
            'is_visible' => true,
            'order' => 1,
        ]);

        TicketStatus::create([
            'organisation_id' => $organisation->id,
            'name' => 'Pending',
            'slug' => 'pending',
            'color' => '#eab308',
            'is_default' => false,
            'is_closed' => false,
            'is_visible' => true,
            'order' => 2,
        ]);

        TicketStatus::create([
            'organisation_id' => $organisation->id,
            'name' => 'Closed',
            'slug' => 'closed',
            'color' => '#6b7280',
            'is_default' => false,
            'is_closed' => true,
            'is_visible' => true,
            'order' => 3,
        ]);
    }
}
