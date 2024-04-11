<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@localhost',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('12345678'),
            'remember_token' => Str::random(10),
        ]);

        // $adminRole = Role::findByName('admin');

        // if (isset($adminRole)) {
        //     $admin->assignRole($adminRole);
        // }
    }
}
