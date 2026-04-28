<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ReportSqlController extends Controller
{
    public function index(): JsonResponse
    {
        $usersSummary = DB::select(<<<'SQL'
            SELECT
                u.id AS user_id,
                u.name,
                u.email,
                COUNT(p.id) AS total_products,
                COALESCE(AVG(p.price), 0)::numeric(10,2) AS average_price,
                COALESCE(SUM(p.price), 0)::numeric(10,2) AS total_price
            FROM users u
            LEFT JOIN products p ON p.user_id = u.id
            GROUP BY u.id, u.name, u.email
            ORDER BY u.id
        SQL);

        $productsRows = DB::select(<<<'SQL'
            SELECT
                p.id,
                p.user_id,
                p.name,
                p.price,
                p.description,
                p.created_at,
                p.updated_at
            FROM products p
            ORDER BY p.user_id, p.id
        SQL);

        $productsByUser = [];
        foreach ($productsRows as $product) {
            $userId = (int) $product->user_id;
            $productsByUser[$userId][] = [
                'id' => (int) $product->id,
                'name' => $product->name,
                'price' => (float) $product->price,
                'description' => $product->description,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ];
        }

        $data = array_map(function (object $user) use ($productsByUser): array {
            $userId = (int) $user->user_id;

            return [
                'user_id' => $userId,
                'name' => $user->name,
                'email' => $user->email,
                'products' => $productsByUser[$userId] ?? [],
                'total_products' => (int) $user->total_products,
                'average_price' => (float) $user->average_price,
                'total_price' => (float) $user->total_price,
            ];
        }, $usersSummary);

        return response()->json([
            'message' => 'Relatório SQL gerado com sucesso.',
            'data' => $data,
        ]);
    }
}
