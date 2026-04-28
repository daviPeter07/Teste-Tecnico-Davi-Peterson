<?php

namespace Tests\Feature\Authorization;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PolicyEnforcementTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_protected_user_and_product_routes(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create(['user_id' => $user->id]);

        $this->getJson('/api/users')->assertStatus(401);
        $this->getJson('/api/products')->assertStatus(401);
        $this->getJson("/api/users/{$user->id}/products")->assertStatus(401);
        $this->getJson("/api/products/{$product->id}")->assertStatus(401);
    }

    public function test_user_cannot_update_or_delete_another_user_resource(): void
    {
        $authenticatedUser = User::factory()->create();
        $otherUser = User::factory()->create();

        Sanctum::actingAs($authenticatedUser);

        $updateResponse = $this->patchJson("/api/users/{$otherUser->id}", [
            'name' => 'Nome Alterado',
        ]);

        $deleteResponse = $this->deleteJson("/api/users/{$otherUser->id}");

        $updateResponse->assertStatus(403);
        $deleteResponse->assertStatus(403);
    }

    public function test_user_cannot_update_or_delete_another_users_product(): void
    {
        $authenticatedUser = User::factory()->create();
        $ownerUser = User::factory()->create();
        $product = Product::factory()->create(['user_id' => $ownerUser->id]);

        Sanctum::actingAs($authenticatedUser);

        $updateResponse = $this->patchJson("/api/products/{$product->id}", [
            'name' => 'Produto Alterado',
        ]);

        $deleteResponse = $this->deleteJson("/api/products/{$product->id}");

        $updateResponse->assertStatus(403);
        $deleteResponse->assertStatus(403);
    }
}
