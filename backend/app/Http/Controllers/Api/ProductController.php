<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Products\StoreProductRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\User;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $productService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $products = $this->productService->listProducts([
            'search' => $request->query('search'),
            'user_id' => $request->query('user_id'),
            'per_page' => $request->query('per_page', 10),
        ]);

        return response()->json([
            'message' => 'Produtos listados com sucesso.',
            'data' => ProductResource::collection($products),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function productsByUser(Request $request, User $user): JsonResponse
    {
        $products = $this->productService->listProducts([
            'search' => $request->query('search'),
            'user_id' => $user->id,
            'per_page' => $request->query('per_page', 10),
        ]);

        return response()->json([
            'message' => 'Produtos do usuário listados com sucesso.',
            'data' => ProductResource::collection($products),
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = $this->productService->createProduct($request->validated());

        return response()->json([
            'message' => 'Produto criado com sucesso.',
            'data' => new ProductResource($product->load('user')),
        ], 201);
    }

    public function show(Product $product): JsonResponse
    {
        $product = $this->productService->getProduct($product);

        return response()->json([
            'message' => 'Produto encontrado com sucesso.',
            'data' => new ProductResource($product),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        $product = $this->productService->updateProduct($product, $request->validated());

        return response()->json([
            'message' => 'Produto atualizado com sucesso.',
            'data' => new ProductResource($product),
        ]);
    }

    public function destroy(Product $product): JsonResponse
    {
        $this->productService->deleteProduct($product);

        return response()->json([
            'message' => 'Produto excluído com sucesso.',
        ]);
    }
}
