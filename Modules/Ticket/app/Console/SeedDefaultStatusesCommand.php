<?php

namespace Modules\Ticket\Console;

use Illuminate\Console\Command;
use Modules\Organisation\Models\Organisation;
use Modules\Ticket\Models\TicketStatus;

class SeedDefaultStatusesCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'ticket:seed-default-statuses';

    /**
     * The console command description.
     */
    protected $description = 'Add default ticket statuses (Open, Pending, Closed) to all organisations that don\'t have them';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $organisations = Organisation::all();
        $created = 0;

        foreach ($organisations as $organisation) {
            // Check if this organisation already has statuses
            $existingCount = TicketStatus::where('organisation_id', $organisation->id)->count();

            if ($existingCount > 0) {
                $this->info("Skipping {$organisation->name} - already has {$existingCount} statuses");
                continue;
            }

            // Create default statuses
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

            $this->info("Created default statuses for {$organisation->name}");
            $created++;
        }

        $this->info("Done! Created default statuses for {$created} organisations.");

        return self::SUCCESS;
    }
}
