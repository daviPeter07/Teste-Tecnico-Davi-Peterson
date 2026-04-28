<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductService
{
    public function listProducts(array $filters = []): LengthAwarePaginator
    {
        $search = $filters['search'] ?? null;
        $userId = $filters['user_id'] ?? null;
        $perPage = $filters['per_page'] ?? 10;

        return Product::query()
            ->with('user')
            ->when($userId, fn ($query) => $query->where('user_id', $userId))
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'ILIKE', "%{$search}%")
                        ->orWhere('description', 'ILIKE', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($perPage);
    }

    public function createProduct(array $data): Product
    {
        return Product::create($data);
    }

    public function getProduct(Product $product): Product
    {
        return $product->load('user');
    }

    public function updateProduct(Product $product, array $data): Product
    {
        $product->update($data);

        return $product->refresh()->load('user');
    }

    public function deleteProduct(Product $product): void
    {
        $product->delete();
    }
}
