<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    case ProductCreate = 'ProductCreate';
    case ProductRead = 'ProductRead';
    case ProductUpdate = 'ProductUpdate';
    case ProductDelete = 'ProductDelete';
    case OrderCreate = 'OrderCreate';
    case OrderRead = 'OrderRead';
    case OrderUpdate = 'OrderUpdate';
    case OrderDelete = 'OrderDelete';
    case CategoryCreate = 'CategoryCreate';
    case CategoryRead = 'CategoryRead';
    case CategoryUpdate = 'CategoryUpdate';
    case CategoryDelete = 'CategoryDelete';
    case EmployeeCreate = 'EmployeeCreate';
    case EmployeeRead = 'EmployeeRead';
    case EmployeeUpdate = 'EmployeeUpdate';
    case EmployeeDelete = 'EmployeeDelete';
    case UserDelete = 'UserDelete';
    case UserUpdate = 'UserUpdate';
    case UserRead = 'UserRead';
}
