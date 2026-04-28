<?php

namespace Tests\Feature\Users;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_validation_error_for_invalid_cpf(): void
    {
        $response = $this->postJson('/api/users', [
            'name' => 'Usuario Invalido',
            'cpf' => '12345678900',
            'email' => 'cpf.invalido@example.com',
            'password' => '123456',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('message', 'Dados invalidos.')
            ->assertJsonPath('errors.cpf.0', 'O CPF informado é inválido.');
    }

    public function test_it_returns_validation_error_for_duplicate_email(): void
    {
        User::factory()->create([
            'email' => 'duplicado@example.com',
        ]);

        $response = $this->postJson('/api/users', [
            'name' => 'Outro Usuario',
            'cpf' => '11144477735',
            'email' => 'duplicado@example.com',
            'password' => '123456',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('message', 'Dados invalidos.')
            ->assertJsonPath('errors.email.0', 'O campo e-mail já está cadastrado.');
    }
}
