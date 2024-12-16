<?php

use App\Http\Controllers\Default\Api\SelectTableController;
use App\Http\Controllers\Default\FileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DataEntryController;
use App\Http\Controllers\RepairsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// API routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([], function () {
    Route::post('/data-entries', [DataEntryController::class, 'store'])->name('data-entries.store');
    Route::put('/data-entries/{id}', [DataEntryController::class, 'update'])->name('data-entries.update');
    Route::delete('/data-entries/{id}', [DataEntryController::class, 'destroy'])->name('data-entries.destroy');
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/data-entries/categories/{category}/fields', [DataEntryController::class, 'getFields'])->name('category-fields.show'); // Ensure this method exists
    Route::get('/categories/{categoryId}/fields', [CategoryController::class, 'getFields']); // This should be in CategoryController
});
Route::group([], routes: function () {
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
