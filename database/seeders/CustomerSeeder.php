<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Organisation;
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

        if (!$organisation) {
            $this->command->error('Organisation not found. Please run OrganisationSeeder first.');
            return;
        }

        Customer::firstOrCreate(
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

        $this->command->info('Customer "Demo Customer" created successfully!');
    }
}
