<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $clients = Client::query()
            ->withCount('tasks')
            ->latest()
            ->get();

        return Inertia::render('clients/Index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('clients/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]);

        $client = Client::create($validated);

        return redirect()->route('clients.show', $client);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client): Response
    {
        $client->load('tasks');

        return Inertia::render('clients/Show', [
            'client' => $client,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client): RedirectResponse
    {
        $client->delete();

        return redirect()->route('clients.index');
    }
}
