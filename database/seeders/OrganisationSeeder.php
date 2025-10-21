<?php

namespace Database\Seeders;

use Modules\Organisation\Models\Organisation;
use Illuminate\Database\Seeder;

class OrganisationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Organisation::firstOrCreate(
            ['billing_email' => 'sarah.woolley@deploy.co.uk'],
            [
                'name' => 'Deploy eCommerce Ltd',
                'billing_email' => 'sarah.woolley@deploy.co.uk',
                'billing_address1' => 'Unit G2, Bellringer Road',
                'billing_city' => 'Stoke-on-Trent',
                'billing_state' => 'Staffordshire',
                'billing_zip' => 'ST4 8GB',
                'billing_country' => 'United Kingdom',
                'status' => 1,
            ]
        );

        $this->command->info('Organisation "Deploy eCommerce Ltd" created successfully!');

        Organisation::firstOrCreate(
            ['billing_email' => 'dummy@example.co.uk'],
            [
                'name' => 'Example Ltd',
                'billing_email' => 'dummy@example.co.uk',
                'billing_address1' => 'Unit G2, Bellringer Road',
                'billing_city' => 'Stoke-on-Trent',
                'billing_state' => 'Staffordshire',
                'billing_zip' => 'ST4 8GB',
                'billing_country' => 'United Kingdom',
                'status' => 1,
            ]
        );

        $this->command->info('Organisation "Example Ltd" created successfully!');
    }
}
