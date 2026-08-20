<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Services\ClientService;
use App\Services\TaskService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function __construct(
        protected TaskService $taskService,
        protected ClientService $clientService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $tasks = Task::with('client')
            ->latest()
            ->get();

        return Inertia::render('tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('tasks/Create', [
            'clients' => $this->clientService->clientOptions(),
            'statuses' => $this->taskService->statusOptions(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $task = Task::create($request->validated());
        $title = $task->title;

        return redirect()
            ->route('tasks.show', $task)
            ->with('success', "Task {$title} created.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task): Response
    {
        $task->load('client');

        return Inertia::render('tasks/Show', [
            'task' => $task,
            'clients' => $this->clientService->clientOptions(),
            'statuses' => $this->taskService->statusOptions(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        $task->update($request->validated());
        $title = $task->title;

        return redirect()
            ->route('tasks.show', $task)
            ->with('success', "Task {$title} updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): RedirectResponse
    {
        $title = $task->title;
        $task->delete();

        return redirect()
            ->route('tasks.index')
            ->with('success', "Task {$title} deleted.");
    }
}
