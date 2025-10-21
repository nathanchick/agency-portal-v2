<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create organisation user
        $orgUser = User::firstOrCreate(
            ['email' => 'nathan.chick@deploy.co.uk'],
            [
                'name' => 'Nathan Chick',
                'password' => Hash::make('hcu@tjn0vam1whk3YFG'),
                'email_verified_at' => now(),
            ]
        );

        // Create customer user
        $customerUser = User::firstOrCreate(
            ['email' => 'nathan.chick+customer@deploy.co.uk'],
            [
                'name' => 'Nathan Chick (Customer)',
                'password' => Hash::make('hcu@tjn0vam1whk3YFG'),
                'email_verified_at' => now(),
            ]
        );

        // Seed organisation, customers, then roles
        $this->call([
            OrganisationSeeder::class,
            CustomerSeeder::class,
            RoleSeeder::class,
        ]);

        // Assign organisation user to Deploy eCommerce organisation
        $organisation = \App\Models\Organisation::where('billing_email', 'sarah.woolley@deploy.co.uk')->first();

        if ($organisation && $orgUser) {
            // Attach user to organisation if not already attached
            if (!$orgUser->organisations()->where('organisation_id', $organisation->id)->exists()) {
                $orgUser->organisations()->attach($organisation->id);
                $this->command->info("User {$orgUser->email} assigned to organisation {$organisation->name}");
            }

            // Assign Admin role to user in organisation context
            $role = \Modules\Organisation\Models\Role::where('name', 'Admin')
                ->where('guard_name', 'web')
                ->where('team_id', $organisation->id)
                ->first();

            if ($role) {
                // Check if role assignment already exists
                $hasRole = DB::table('model_has_roles')
                    ->where('role_id', $role->id)
                    ->where('model_type', 'App\Models\User')
                    ->where('model_id', $orgUser->id)
                    ->where('team_id', $organisation->id)
                    ->exists();

                if (!$hasRole) {
                    DB::table('model_has_roles')->insert([
                        'role_id' => $role->id,
                        'model_type' => 'App\Models\User',
                        'model_id' => $orgUser->id,
                        'team_id' => $organisation->id,
                    ]);
                    $this->command->info("Admin role assigned to {$orgUser->email} in {$organisation->name}");
                }
            }
        }

        // Assign organisation user to Example Ltd organisation
        $organisation = \App\Models\Organisation::where('billing_email', 'dummy@example.co.uk')->first();

        if ($organisation && $orgUser) {
            // Attach user to organisation if not already attached
            if (!$orgUser->organisations()->where('organisation_id', $organisation->id)->exists()) {
                $orgUser->organisations()->attach($organisation->id);
                $this->command->info("User {$orgUser->email} assigned to organisation {$organisation->name}");
            }

            // Assign Admin role to user in organisation context
            $role = \Modules\Organisation\Models\Role::where('name', 'Admin')
                ->where('guard_name', 'web')
                ->where('team_id', $organisation->id)
                ->first();

            if ($role) {
                // Check if role assignment already exists
                $hasRole = DB::table('model_has_roles')
                    ->where('role_id', $role->id)
                    ->where('model_type', 'App\Models\User')
                    ->where('model_id', $orgUser->id)
                    ->where('team_id', $organisation->id)
                    ->exists();

                if (!$hasRole) {
                    DB::table('model_has_roles')->insert([
                        'role_id' => $role->id,
                        'model_type' => 'App\Models\User',
                        'model_id' => $orgUser->id,
                        'team_id' => $organisation->id,
                    ]);
                    $this->command->info("Admin role assigned to {$orgUser->email} in {$organisation->name}");
                }
            }
        }

        // Assign customer user to Demo Customer
        $customer = \App\Models\Customer::where('name', 'Demo Customer')->first();

        if ($customer && $customerUser) {
            // Attach user to customer if not already attached
            if (!$customerUser->customers()->where('customer_id', $customer->id)->exists()) {
                $customerUser->customers()->attach($customer->id);
                $this->command->info("User {$customerUser->email} assigned to customer {$customer->name}");
            }

            // Assign Admin role to customer user in customer context
            $customerRole = \Modules\Organisation\Models\Role::where('name', 'Admin')
                ->where('guard_name', 'web')
                ->where('team_id', $customer->id)
                ->first();

            if ($customerRole) {
                // Check if role assignment already exists
                $hasCustomerRole = DB::table('model_has_roles')
                    ->where('role_id', $customerRole->id)
                    ->where('model_type', 'App\Models\User')
                    ->where('model_id', $customerUser->id)
                    ->where('team_id', $customer->id)
                    ->exists();

                if (!$hasCustomerRole) {
                    DB::table('model_has_roles')->insert([
                        'role_id' => $customerRole->id,
                        'model_type' => 'App\Models\User',
                        'model_id' => $customerUser->id,
                        'team_id' => $customer->id,
                    ]);
                    $this->command->info("Admin role assigned to {$customerUser->email} in {$customer->name}");
                }
            }
        }
    }
}
