<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'post.sendToMainPage']);
        Permission::create(['name' => 'post.hide']);
        Permission::create(['name' => 'post.showReport']);
        Permission::create(['name' => 'post.delete']);
        Permission::create(['name' => 'post.create']); //create posts
        Permission::create(['name' => 'user.ban']);
        Permission::create(['name' => 'comment.create']);
        Permission::create(['name' => 'comment.delete']);

        $adminRole = Role::findByName('admin');
        $adminRole->givePermissionTo('post.sendToMainPage');
        $adminRole->givePermissionTo('post.hide');
        $adminRole->givePermissionTo('post.showReport');
        $adminRole->givePermissionTo('post.delete');
        $adminRole->givePermissionTo('post.create');
        $adminRole->givePermissionTo('user.ban');
        $adminRole->givePermissionTo('comment.create');
        $adminRole->givePermissionTo('comment.delete');

        $moderatorRole = Role::findByName('moderator');
        $moderatorRole->givePermissionTo('post.sendToMainPage');
        $moderatorRole->givePermissionTo('post.hide');
        $moderatorRole->givePermissionTo('post.showReport');
        $moderatorRole->givePermissionTo('post.create');
        $moderatorRole->givePermissionTo('comment.create');

        $userRole = Role::findByName('user');
        $userRole->givePermissionTo('comment.create');
        $userRole->givePermissionTo('post.create');
    }
}
