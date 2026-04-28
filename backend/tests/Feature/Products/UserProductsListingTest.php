<?php

namespace Tests\Feature\Products;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserProductsListingTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_only_products_of_the_selected_user(): void
    {
        $targetUser = User::factory()->create();
        $otherUser = User::factory()->create();

        Product::factory()->count(2)->create(['user_id' => $targetUser->id]);
        Product::factory()->count(3)->create(['user_id' => $otherUser->id]);

        $response = $this->getJson("/api/users/{$targetUser->id}/products");

        $response->assertStatus(200)
            ->assertJsonPath('message', 'Produtos do usuário listados com sucesso.')
            ->assertJsonPath('meta.total', 2)
            ->assertJsonCount(2, 'data');

        foreach ($response->json('data') as $product) {
            $this->assertSame($targetUser->id, $product['user_id']);
        }
    }
}
