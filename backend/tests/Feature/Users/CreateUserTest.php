<?php

namespace Tests\Feature\Users;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateUserTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_user_successfully(): void
    {
        $payload = [
            'name' => 'Davi Peterson',
            'cpf' => '52998224725',
            'email' => 'davi@example.com',
            'password' => '123456',
        ];

        $response = $this->postJson('/api/users', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('message', 'Usuário criado com sucesso.')
            ->assertJsonPath('data.name', $payload['name'])
            ->assertJsonPath('data.cpf', $payload['cpf'])
            ->assertJsonPath('data.email', $payload['email'])
            ->assertJsonMissingPath('data.password');

        $this->assertDatabaseHas('users', [
            'name' => $payload['name'],
            'cpf' => $payload['cpf'],
            'email' => $payload['email'],
        ]);

        $user = User::where('email', $payload['email'])->firstOrFail();
        $this->assertNotSame($payload['password'], $user->password);
    }
}
