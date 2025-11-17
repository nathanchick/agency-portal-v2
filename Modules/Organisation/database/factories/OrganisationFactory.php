<?php

namespace Modules\Organisation\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Organisation\Models\Organisation;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\Organisation\Models\Organisation>
 */
class OrganisationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Organisation::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'billing_email' => fake()->companyEmail(),
            'billing_address1' => fake()->streetAddress(),
            'billing_city' => fake()->city(),
            'billing_state' => fake()->state(),
            'billing_zip' => fake()->postcode(),
            'billing_country' => fake()->country(),
            'status' => 1,
        ];
    }
}
