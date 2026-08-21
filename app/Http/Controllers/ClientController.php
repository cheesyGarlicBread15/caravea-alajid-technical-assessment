<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $clients = Client::withCount('tasks')
            ->latest()
            ->latest('id')
            ->get();

        return inertia('clients/Index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return inertia('clients/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request): RedirectResponse
    {
        $client = Client::create($request->validated());
        $name = $client->name;

        return redirect()
            ->route('clients.show', $client)
            ->with('success', "Client {$name} created.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client): Response
    {
        $client->load('tasks');

        return inertia('clients/Show', [
            'client' => $client,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client): RedirectResponse
    {
        $client->update($request->validated());
        $name = $client->name;

        return redirect()
            ->route('clients.show', $client)
            ->with('success', "Client {$name} updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client): RedirectResponse
    {
        $name = $client->name;
        $client->delete();

        return redirect()
            ->route('clients.index')
            ->with('success', "Client {$name} deleted.");
    }
}
