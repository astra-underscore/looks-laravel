<?php

namespace App\Enums;

enum ProductStatusEnum: string
{
    case Draft = 'borrador
    ';
    case Published = 'publicado';

    public static function labels(): array 
    {
        return [
            self::Draft->value => __('borrador'),
            self::Published->value => __('publicado')
        ];
    }

    public static function colors(): array
    {
        return [
            'gray' => self::Draft->value,
            'success' => self::Published->value, 
        ];
    }
}
