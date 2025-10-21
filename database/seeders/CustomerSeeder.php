<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Organisation;
use App\Models\Project;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the Deploy eCommerce organisation
        $organisation = Organisation::where('billing_email', 'sarah.woolley@deploy.co.uk')->first();

        if (! $organisation) {
            $this->command->error('Organisation not found. Please run OrganisationSeeder first.');

            return;
        }

        $customer = Customer::firstOrCreate(
            [
                'name' => 'Demo Customer',
                'organisation_id' => $organisation->id,
            ],
            [
                'name' => 'Demo Customer',
                'organisation_id' => $organisation->id,
                'status' => 1,
            ]
        );

        // Create default project if it doesn't exist
        Project::firstOrCreate(
            [
                'customer_id' => $customer->id,
                'is_default' => true,
            ],
            [
                'organisation_id' => $organisation->id,
                'customer_id' => $customer->id,
                'name' => 'Default',
                'notes' => 'Default project - cannot be deleted',
                'is_default' => true,
            ]
        );

        $this->command->info('Customer "Demo Customer" and default project created successfully!');
    }
}
