<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthEndpointsTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_logs_in_and_returns_a_token(): void
    {
        $user = User::factory()->create([
            'email' => 'auth@example.com',
            'password' => '123456',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => '123456',
            'device_name' => 'phpunit',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('message', 'Login realizado com sucesso.')
            ->assertJsonPath('data.email', $user->email)
            ->assertJsonPath('token_type', 'Bearer')
            ->assertJsonStructure(['token']);

        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_id' => $user->id,
            'tokenable_type' => User::class,
        ]);
    }

    public function test_it_denies_login_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'wrong@example.com',
            'password' => '123456',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'wrong@example.com',
            'password' => 'wrong-pass',
            'device_name' => 'phpunit',
        ]);

        $response->assertStatus(422)
            ->assertJsonPath('message', 'As credenciais fornecidas estão incorretas.')
            ->assertJsonPath('errors.email.0', 'As credenciais fornecidas estão incorretas.');
    }

    public function test_it_returns_authenticated_user_on_me_and_allows_logout(): void
    {
        $user = User::factory()->create([
            'email' => 'me@example.com',
            'password' => '123456',
        ]);

        $loginResponse = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => '123456',
            'device_name' => 'phpunit',
        ]);

        $token = $loginResponse->json('token');

        $meResponse = $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/me');

        $meResponse->assertStatus(200)
            ->assertJsonPath('message', 'Usuário autenticado.')
            ->assertJsonPath('data.id', $user->id);

        $logoutResponse = $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/logout');

        $logoutResponse->assertStatus(200)
            ->assertJsonPath('message', 'Logout realizado com sucesso.');

        $this->assertDatabaseMissing('personal_access_tokens', [
            'tokenable_id' => $user->id,
            'tokenable_type' => User::class,
        ]);
    }
}
