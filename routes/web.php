<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ClientController::class, 'index'])->name('home');

Route::resource('clients', ClientController::class)->except(['edit']);
Route::resource('tasks', TaskController::class)->except(['edit']);
