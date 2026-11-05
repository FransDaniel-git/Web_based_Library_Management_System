<?php

use Illuminate\Support\Facades\Route;

// Named login route required by Laravel's auth middleware. This backend is API-only,
// so unauthenticated web requests receive a JSON 401 instead of an HTML login page.
Route::get('/login', function () {
    return response()->json(['message' => 'Unauthenticated.'], 401);
})->name('login');

Route::get('/', function () {
    return view('welcome');
});
