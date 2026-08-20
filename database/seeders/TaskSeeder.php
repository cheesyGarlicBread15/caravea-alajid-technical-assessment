<?php

namespace Database\Seeders;

use App\Enums\Task\TaskStatusEnum;
use App\Models\Client;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Seed the tasks table.
     *
     * Assumes ClientSeeder has already run so clients exist to attach to.
     */
    public function run(): void
    {
        $clients = Client::all();

        // Give every existing client a handful of tasks with a random status.
        $clients->each(function (Client $client): void {
            Task::factory()
                ->count(5)
                ->forClient($client)
                ->create();
        });

        // A guaranteed task in each status on the first client, so every
        // column of the board is populated for the demo.
        $firstClient = $clients->first();

        if ($firstClient !== null) {
            foreach (TaskStatusEnum::cases() as $status) {
                Task::factory()
                    ->forClient($firstClient)
                    ->status($status)
                    ->create();
            }
        }

        // A few unassigned tasks (client_id stays null from the factory default).
        Task::factory()->count(3)->create();
    }
}
