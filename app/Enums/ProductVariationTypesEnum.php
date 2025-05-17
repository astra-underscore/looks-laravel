<?php

namespace App\Enums;

enum ProductVariationTypesEnum: string
{
    case Select = 'Select';
    case Radio = 'Radio';
    case Image = 'Image';

    public static function labels(): array
    {
        return [
            self::Select->value => __('Múltiples'),
            self::Radio->value => __('Único'),
            self::Image->value => __('Imagen')
        ];
    }
}
