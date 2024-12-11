<?php

use App\Http\Controllers\Default\Api\SelectTableController;
use App\Http\Controllers\Default\FileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\RepairsController;
use App\Http\Controllers\TechniciansController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// API routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([], function () {
    Route::post('/repairs', [RepairsController::class, 'store'])->name('api.repairs.store');
Route::delete('/repairs/{id}', [RepairsController::class, 'destroy'])->name('api.repairs.delete');
    Route::get('/repairs/{id}', [RepairsController::class, 'show'])->name('api.repairs.show'); // Show a specific repair
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
