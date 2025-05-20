<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListResoure;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function home() {
        $products = Product::query()
            ->published()
            ->paginate(12);

        return Inertia::render('Home',[
            'products' => ProductListResoure::collection($products),
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('Product/Show', [
            'product' => new ProductResource($product),
            'variationOptions' => request('options', [])
        ]);
    }
}
