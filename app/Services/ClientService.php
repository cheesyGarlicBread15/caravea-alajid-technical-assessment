<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Support\Collection;

class ClientService
{
    public function clientOptions(): Collection
    {
        return Client::orderBy('name')
            ->get(['id', 'name'])
            ->map(fn (Client $client): array => [
                'id' => $client->id,
                'name' => $client->name,
            ]);
    }
}
