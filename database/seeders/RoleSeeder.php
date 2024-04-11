<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $admin = Role::create(['name' => 'admin']); // Utworzenie roli "admin"
        $admin = Role::create(['name' => 'moderator']); // Utworzenie roli "admin"
        $user = Role::create(['name' => 'user']); // Utworzenie roli "admin"
        $user = Role::create(['name' => 'observer']);

    }
}
