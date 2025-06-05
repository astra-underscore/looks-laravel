<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'image' => $this->getFirstMediaUrl('images'),
            'images' => $this->getMedia('images')->map(function ($image) {
                return [
                    'id' => $image->id,
                    'thumb' => $image->getUrl('thumb'),
                    'small' => $image->getUrl('small'),
                    'large' => $image->getUrl('large'),
                    'preview' => $image->getUrl('preview'),
                ];
            }),
            'department' => [
                'id' => $this->department->id,
                'name' => $this->department->name,
            ],
            'variationsTypes' => $this->variationsTypes->map(function ($variationType) {
                return [
                    'id' => $variationType->id,
                    'name' => $variationType->name,
                    'type' => $variationType->type,
                    'options' => $variationType->options->map(function ($option) {
                        return [
                            'id' => $option->id,
                            'name' => $option->name,
                            'images' => $option->getMedia('images')->map(function ($image) {
                                return [
                                    'id' => $image->id,
                                    'thumb' => $image->getUrl('thumb'),
                                    'small' => $image->getUrl('small'),
                                    'large' => $image->getUrl('large'),
                                    'preview' => $image->getUrl('preview'),
                                ];
                            }),
                        ];
                    }),
                ];
            }),
            'variations' => $this->variations->map(function ($variation) {
              return [
               'id' => $variation->id,
                  'variation_type_option_ids' => $variation->variation_type_option_ids,
                  'quantity' => $variation->quantity,
                  'price' => $variation->price,
            ];
    })
        ];
    }
}
