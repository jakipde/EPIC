<?php

use App\Http\Controllers\Default\Api\SelectTableController;
use App\Http\Controllers\Default\FileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomersController; // Assuming you have this controller
use App\Http\Controllers\TechniciansController; // Assuming you have this controller
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// API routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Group for default API routes with JWT verification
Route::middleware(['JwtCustomApiVerification::class'])
    ->prefix('_default')
    ->group(function () {
        Route::get('/select/{table}', SelectTableController::class)->name('api.select.table');
        Route::post('files', [FileController::class, 'store'])->name('api.file.store');
    });

// Category-related API routes
Route::group([], function () {
    Route::get('/categories/{id}/fields', [CategoryController::class, 'getFields'])->name('api.categories.fields');
});

// Additional routes for customers and technicians
Route::get('/customers', [CustomersController::class, 'index'])->name('api.customers.index');
Route::get('/technicians', [TechniciansController::class, 'index'])->name('api.technicians.index');
