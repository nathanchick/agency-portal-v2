<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            'dashboard',
            'deployments',
            'timesheets',
            'documents',
            'tickets',
            'health',
            'security',
            'billing',
            'users'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $o_admin = Role::create(['name' => 'o_admin']);
        $o_admin->givePermissionTo(Permission::all());

        $o_standard = Role::create(['name' => 'o_standard']);
        $o_standard->givePermissionTo(
            ['dashboard', 'deployments', 'timesheets', 'documents', 'tickets', 'health', 'security']
        );

        $c_admin = Role::create(['name' => 'c_admin']);
        $c_admin->givePermissionTo(Permission::all());

        $c_standard = Role::create(['name' => 'c_standard']);
        $c_standard->givePermissionTo(
            ['dashboard', 'deployments', 'timesheets', 'documents', 'tickets', 'health', 'security']
        );
    }
}
