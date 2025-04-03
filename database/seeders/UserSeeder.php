<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use App\Enums\RolesEnum;
use App\Enums\PermissionsEnum;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Usuario',
            'email' => 'user@example.com'
        ])->assignRole(RolesEnum::User->value);

        User::factory()->create([
            'name' => 'Empleado',
            'email' => 'employee@example.com'
        ])->assignRole(RolesEnum::Employee->value);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com'
        ])->assignRole(RolesEnum::Admin->value);
    }
}
