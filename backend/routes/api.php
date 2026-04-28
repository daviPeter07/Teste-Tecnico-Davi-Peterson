<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
*/

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function (): void {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::apiResource('users', UserController::class);
Route::apiResource('products', ProductController::class);
Route::get('users/{user}/products', [ProductController::class, 'productsByUser']);
