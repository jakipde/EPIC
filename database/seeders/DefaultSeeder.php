<?php

namespace Database\Seeders;

use App\Constants\PermissionConstant;
use App\Constants\SettingConstant;
use App\Models\Default\Permission;
use App\Models\Default\Setting;
use App\Models\Default\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DefaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed settings
        foreach (SettingConstant::SYSTEM as $setting) {
            Setting::insert(['id' => Str::ulid(), ...$setting]);
        }

        // Seed permissions
        foreach (PermissionConstant::LIST as $permission) {
            Permission::insert(['id' => Str::ulid(), ...$permission]);
        }

        // Create users with roles directly
        User::create([
            'id' => Str::ulid(), // Manually set the id
            'name' => 'Zaky P',
            'email' => 'zakypde@gmail.com',
            'password' => bcrypt('erytchandra12'),
            'role' => 'technician', // Assigning technician role directly
        ]);

        User::create([
            'id' => Str::ulid(), // Manually set the id
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'role' => 'admin', // Assigning admin role directly
        ]);

        // Create a guest user
        User::create([
            'id' => Str::ulid(), // Manually set the id
            'name' => 'Guest User',
            'email' => 'guest@guest.com',
            'password' => bcrypt('guestpassword'),
            'role' => 'guest', // Assigning guest role directly
        ]);
    }
}
