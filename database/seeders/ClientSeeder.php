<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Seed the clients table.
     */
    public function run(): void
    {
        // A couple of named clients so the demo data has recognizable anchors.
        Client::factory()->create([
            'name' => 'Acme Corporation',
            'description' => 'Primary demo client with a full task board.',
        ]);

        Client::factory()->create([
            'name' => 'Globex Industries',
            'description' => 'Secondary demo client.',
        ]);

        // Plus a batch of random clients to fill out the list.
        Client::factory()->count(20)->create();
    }
}
