<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Enums\RolesEnum;
use App\Enums\PermissionsEnum;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);
        $employeeRole = Role::create(['name' => RolesEnum::Employee->value]);

        $productCreate = Permission::create(['name' => PermissionsEnum::ProductCreate->value]);
        $productRead = Permission::create(['name' => PermissionsEnum::ProductRead->value]);
        $productUpdate = Permission::create(['name' => PermissionsEnum::ProductUpdate->value]);
        $productDelete = Permission::create(['name' => PermissionsEnum::ProductDelete->value]);
        $orderCreate = Permission::create(['name' => PermissionsEnum::OrderCreate->value]);
        $orderRead = Permission::create(['name' => PermissionsEnum::OrderRead->value]);
        $orderUpdate = Permission::create(['name' => PermissionsEnum::OrderUpdate->value]);
        $orderDelete = Permission::create(['name' => PermissionsEnum::OrderDelete->value]);
        $categoryCreate = Permission::create(['name' => PermissionsEnum::CategoryCreate->value]);
        $categoryRead = Permission::create(['name' => PermissionsEnum::CategoryRead->value]);
        $categoryUpdate = Permission::create(['name' => PermissionsEnum::CategoryUpdate->value]);
        $categoryDelete = Permission::create(['name' => PermissionsEnum::CategoryDelete->value]);
        $employeeCreate = Permission::create(['name' => PermissionsEnum::EmployeeCreate->value]);
        $employeeRead = Permission::create(['name' => PermissionsEnum::EmployeeRead->value]);
        $employeeUpdate = Permission::create(['name' => PermissionsEnum::EmployeeUpdate->value]);
        $employeeDelete = Permission::create(['name' => PermissionsEnum::EmployeeDelete->value]);
        $userDelete = Permission::create(['name' => PermissionsEnum::UserDelete->value]);
        $userUpdate = Permission::create(['name' => PermissionsEnum::UserUpdate->value]);
        $userRead = Permission::create(['name' => PermissionsEnum::UserRead->value]);

        $userRole->syncPermissions([
            $productRead,
            $orderRead,
            $categoryRead,
            $userRead,
            $userUpdate,
            $userDelete
        ]);

        $employeeRole->syncPermissions([
            $productCreate,
            $productRead,
            $productUpdate,
            $productDelete,
            $categoryCreate,
            $categoryRead,
            $categoryUpdate,
            $categoryDelete,
        ]);

        $adminRole->syncPermissions([
            $orderRead,
            $orderUpdate,
            $orderDelete,
            $employeeCreate,
            $employeeRead,
            $employeeUpdate,
            $employeeDelete,
            $userRead,
            $userDelete
        ]);
    }
}
