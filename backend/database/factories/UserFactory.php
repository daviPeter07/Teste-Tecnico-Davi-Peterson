<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'cpf' => $this->generateValidCpf(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    private function generateValidCpf(): string
    {
        $numbers = [];

        for ($i = 0; $i < 9; $i++) {
            $numbers[] = random_int(0, 9);
        }

        $sum = 0;
        for ($i = 0, $weight = 10; $i < 9; $i++, $weight--) {
            $sum += $numbers[$i] * $weight;
        }
        $digit1 = ($sum * 10) % 11;
        $digit1 = $digit1 === 10 ? 0 : $digit1;
        $numbers[] = $digit1;

        $sum = 0;
        for ($i = 0, $weight = 11; $i < 10; $i++, $weight--) {
            $sum += $numbers[$i] * $weight;
        }
        $digit2 = ($sum * 10) % 11;
        $digit2 = $digit2 === 10 ? 0 : $digit2;
        $numbers[] = $digit2;

        return implode('', $numbers);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
