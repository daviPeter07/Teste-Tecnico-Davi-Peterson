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
        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortDir = strtolower((string) ($filters['sort_dir'] ?? 'desc'));

        $allowedSortFields = ['created_at', 'name', 'price'];
        if (! in_array($sortBy, $allowedSortFields, true)) {
            $sortBy = 'created_at';
        }

        if (! in_array($sortDir, ['asc', 'desc'], true)) {
            $sortDir = 'desc';
        }

        return Product::query()
            ->with('user')
            ->when($userId, fn ($query) => $query->where('user_id', $userId))
            ->when($search, function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'ILIKE', "%{$search}%")
                        ->orWhere('description', 'ILIKE', "%{$search}%");
                });
            })
            ->orderBy($sortBy, $sortDir)
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
