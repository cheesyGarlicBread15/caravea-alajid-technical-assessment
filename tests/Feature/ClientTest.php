<?php

use App\Models\Client;
use App\Models\Task;
use Inertia\Testing\AssertableInertia;

it('lists clients with their task counts', function () {
    $client = Client::factory()->create();
    Task::factory()->count(2)->forClient($client)->create();

    $this->get(route('clients.index'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('clients/Index')
            ->has('clients', 1)
            ->where('clients.0.tasks_count', 2)
        );
});

it('stores a client', function () {
    $response = $this->post(route('clients.store'), [
        'name' => 'Acme Inc.',
        'description' => 'A valued client',
    ]);

    $client = Client::first();

    $response->assertRedirect(route('clients.show', $client));
    $response->assertSessionHas('success');

    expect($client->name)->toBe('Acme Inc.');
});

it('requires a name', function () {
    $this->post(route('clients.store'), ['name' => ''])
        ->assertSessionHasErrors('name');

    expect(Client::count())->toBe(0);
});

it('shows a client with its tasks', function () {
    $client = Client::factory()->create();
    Task::factory()->count(3)->forClient($client)->create();

    $this->get(route('clients.show', $client))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('clients/Show')
            ->where('client.id', $client->id)
            ->has('client.tasks', 3)
        );
});

it('updates a client', function () {
    $client = Client::factory()->create(['name' => 'Old name']);

    $this->put(route('clients.update', $client), [
        'name' => 'New name',
        'description' => null,
    ])->assertRedirect(route('clients.show', $client));

    expect($client->refresh()->name)->toBe('New name');
});

it('deletes a client', function () {
    $client = Client::factory()->create();

    $this->delete(route('clients.destroy', $client))
        ->assertRedirect(route('clients.index'));

    expect(Client::find($client->id))->toBeNull();
});
