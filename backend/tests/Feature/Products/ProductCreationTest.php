<?php

namespace Tests\Feature\Products;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProductCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_product_successfully(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $payload = [
            'user_id' => $user->id,
            'name' => 'Teclado Mecanico',
            'price' => 249.90,
            'description' => 'Switch brown, layout ABNT2.',
        ];

        $response = $this->postJson('/api/products', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('message', 'Produto criado com sucesso.')
            ->assertJsonPath('data.user_id', $user->id)
            ->assertJsonPath('data.name', $payload['name'])
            ->assertJsonPath('data.price', $payload['price'])
            ->assertJsonPath('data.description', $payload['description']);

        $this->assertDatabaseHas('products', [
            'user_id' => $user->id,
            'name' => $payload['name'],
            'description' => $payload['description'],
        ]);
    }

    public function test_it_returns_validation_error_for_invalid_product_price(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/products', [
            'user_id' => $user->id,
            'name' => 'Mouse Gamer',
            'price' => 0,
            'description' => 'Produto com preco invalido.',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('message', 'Dados invalidos.')
            ->assertJsonPath('errors.price.0', 'O campo preço deve ser maior que 0.');

        $this->assertDatabaseMissing('products', [
            'name' => 'Mouse Gamer',
        ]);
    }
}
