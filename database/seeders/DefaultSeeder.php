<?php

namespace Database\Seeders;

use App\Constants\PermissionConstant;
use App\Constants\SettingConstant;
use App\Models\Default\Permission;
use App\Models\Default\Role;
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
        foreach (SettingConstant::SYSTEM as $setting) {
            Setting::insert(['id' => Str::ulid(), ...$setting]);
        }

        foreach (PermissionConstant::LIST as $permission) {
            Permission::insert(['id' => Str::ulid(), ...$permission]);
        }

        // Create the technician role
        $technicianRole = Role::create(['name' => 'technician']);

        // Create the admin role
        $adminRole = Role::create(['name' => 'admin']);

        // Assign all permissions to the technician role
        $permissions = Permission::all();
        foreach ($permissions as $permission) {
            $technicianRole->rolePermissions()->create(['permission_id' => $permission->id]);
        }

        // Create the user "Zaky P" with the technician role
        User::create([
            'name' => 'Zaky P',
            'email' => 'zakypde@gmail.com',
            'password' => bcrypt('erytchandra12'),
            'role_id' => $technicianRole->id, // Assigning technician role
        ]);

        // Create the admin user
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'role_id' => $adminRole->id, // Assigning admin role
        ]);

        // Create the guest role and assign permissions
        $guest = Role::create(['name' => Role::GUEST]);
        $permission = Permission::where('name', 'view-shortlink')->first();
        $guest->rolePermissions()->create(['permission_id' => $permission->id]);
    }
}
