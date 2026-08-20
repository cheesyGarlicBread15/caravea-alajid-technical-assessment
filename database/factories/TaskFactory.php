<?php

namespace Database\Factories;

use App\Enums\Task\TaskStatusEnum;
use App\Models\Client;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->optional()->paragraph(),
            'status' => fake()->randomElement(TaskStatusEnum::cases())->value,
            'client_id' => null,
        ];
    }

    /**
     * Set the task to a specific status.
     */
    public function status(TaskStatusEnum $status): static
    {
        return $this->state(fn (array $attributes): array => [
            'status' => $status->value,
        ]);
    }

    /**
     * Assign the task to a client (creating one if none is given).
     */
    public function forClient(?Client $client = null): static
    {
        return $this->state(fn (array $attributes): array => [
            'client_id' => ($client ?? Client::factory()->create())->id,
        ]);
    }
}
