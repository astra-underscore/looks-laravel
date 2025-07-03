<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartService
{
    private ?array $cachedCartItems = null;
    protected const COOKIE_NAME = 'cartItems';
    protected const COOKIE_LIFETIME = 60 * 24 * 365; // 1 year

    public function addItemToCart(Product $product, int $quantity = 1, $optionIds = null)
    {

    }

    public function updateItemQuantity(int $productId, int $quantity, $optionIds = null)
    {

    }

    public function removeItemFromCart(int $productId, $optionIds = null)
    {

    }

    public function getCartItems()
    {
        try {
            if ($this->cachedCartItems === null) {
                if (Auth::check()) {
                    $cartItems = $this->getCartItemsFromDatabase();
                } else {
                    $cartItems = $this->getCartItemsFromCookies();
                }

                $productIds = collect($cartItems)->map(fn($item) => $item['product_id']);
                $products = Product::whereIn('id', $productIds)->with('user.employee');
            }

            return $this->cachedCartItems;
        } catch (\Exception $e) {

        }
    }

    public function getTotalPrice()
    {

    }

    public function updateItemQuantityInDatabase(int $productId, int $quantity, array $optionIds)
    {

    }

    public function saveItemToDatabase(Product $product, int $quantity, $price)
    {

    }

    public function saveItemToCookies(int $productId, int $quantity, $price)
    {

    }

    public function removeItemFromDatabase(int $productId, array $optionIds)
    {

    }

    public function removeItemFromCookies(int $productId, array $optionIds)
    {

    }

    protected function getCartItemsFromDatabase()
    {

    }

    protected function getCartItemsFromCookies()
    {

    }
}
