<?php

namespace Database\Seeders;

use App\Models\Organisation;
use App\Models\Customer;
use Modules\Organisation\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the roles
        $roles = ['Admin', 'Manager', 'User'];

        // Get all organisations
        $organisations = Organisation::all();

        // Create organisation-scoped roles
        foreach ($organisations as $organisation) {
            foreach ($roles as $roleName) {
                Role::firstOrCreate([
                    'name' => $roleName,
                    'guard_name' => 'web',
                    'team_id' => $organisation->id,
                ]);

                $this->command->info("Created/Found role: {$roleName} for Organisation: {$organisation->name}");
            }
        }

        // Get all customers
        $customers = Customer::all();

        // Create customer-scoped roles
        foreach ($customers as $customer) {
            foreach ($roles as $roleName) {
                Role::firstOrCreate([
                    'name' => $roleName,
                    'guard_name' => 'web',
                    'team_id' => $customer->id,
                ]);

                $this->command->info("Created/Found role: {$roleName} for Customer: {$customer->name}");
            }
        }

        $this->command->info('Roles seeded successfully!');
    }
}
