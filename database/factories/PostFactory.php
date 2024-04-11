<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->name(),
            'price' => $this->faker->numberBetween(50, 300),
            'width' => $this->faker->numberBetween(15, 25),
            'height' => $this->faker->numberBetween(20, 75),
            'length' => $this->faker->numberBetween(50, 45),
            'diameter' => $this->faker->numberBetween(10, 60),
            'category_id' => Category::select('id')->orderByRaw('RAND()')->first()->id,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
