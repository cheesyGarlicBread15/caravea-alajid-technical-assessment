<?php

use App\Enums\Task\TaskStatusEnum;
use App\Models\Client;
use App\Models\Task;
use Inertia\Testing\AssertableInertia;

it('lists tasks on the index page', function () {
    Task::factory()->count(3)->create();

    $this->get(route('tasks.index'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('tasks/Index')
            ->has('tasks', 3)
        );
});

it('shows the create form with clients and statuses', function () {
    Client::factory()->count(2)->create();

    $this->get(route('tasks.create'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('tasks/Create')
            ->has('clients', 2)
            ->has('statuses', 3)
        );
});

it('stores a task assigned to a client', function () {
    $client = Client::factory()->create();

    $response = $this->post(route('tasks.store'), [
        'title' => 'Write tests',
        'description' => 'Cover the task endpoints',
        'status' => TaskStatusEnum::PENDING->value,
        'client_id' => $client->id,
    ]);

    $task = Task::first();

    $response->assertRedirect(route('tasks.show', $task));
    $response->assertSessionHas('success');

    expect($task)->not->toBeNull()
        ->and($task->title)->toBe('Write tests')
        ->and($task->status)->toBe(TaskStatusEnum::PENDING)
        ->and($task->client_id)->toBe($client->id);
});

it('stores a task without a client', function () {
    $this->post(route('tasks.store'), [
        'title' => 'Unassigned task',
        'status' => TaskStatusEnum::IN_PROGRESS->value,
        'client_id' => '',
    ])->assertSessionHasNoErrors();

    expect(Task::sole()->client_id)->toBeNull();
});

it('requires a title and a valid status', function () {
    $this->post(route('tasks.store'), [
        'title' => '',
        'status' => 'not-a-status',
    ])->assertSessionHasErrors(['title', 'status']);

    expect(Task::count())->toBe(0);
});

it('rejects a non-existent client', function () {
    $this->post(route('tasks.store'), [
        'title' => 'Bad client',
        'status' => TaskStatusEnum::PENDING->value,
        'client_id' => 999,
    ])->assertSessionHasErrors('client_id');

    expect(Task::count())->toBe(0);
});

it('shows a task', function () {
    $task = Task::factory()->forClient()->create();

    $this->get(route('tasks.show', $task))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('tasks/Show')
            ->where('task.id', $task->id)
            ->has('task.client')
            ->has('statuses', 3)
        );
});

it('updates a task', function () {
    $task = Task::factory()->status(TaskStatusEnum::PENDING)->create([
        'title' => 'Old title',
    ]);

    $this->put(route('tasks.update', $task), [
        'title' => 'New title',
        'description' => null,
        'status' => TaskStatusEnum::COMPLETED->value,
        'client_id' => null,
    ])->assertRedirect(route('tasks.show', $task));

    expect($task->refresh())
        ->title->toBe('New title')
        ->status->toBe(TaskStatusEnum::COMPLETED)
        ->client_id->toBeNull();
});

it('deletes a task', function () {
    $task = Task::factory()->create();

    $this->delete(route('tasks.destroy', $task))
        ->assertRedirect(route('tasks.index'));

    expect(Task::find($task->id))->toBeNull();
});
