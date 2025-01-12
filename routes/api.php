<?php

use App\Http\Controllers\Default\Api\SelectTableController;
use App\Http\Controllers\Default\FileController;
use App\Http\Controllers\AdminsController;
use App\Http\Controllers\TechniciansController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductSubCategoryController;
use App\Http\Controllers\DataEntryController;
use App\Http\Controllers\RepairsController;
use App\Http\Controllers\BrandsController;
use App\Http\Controllers\DevicesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// API routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Customers Routes
Route::get('/customers', [CustomersController::class, 'index']); // Fetch all customers
Route::post('/customers', [CustomersController::class, 'store']); // Create a new customer

// Repairs Routes
Route::group([], function () {
    Route::post('/repairs', [RepairsController::class, 'store'])->name('api.repairs.store');
    Route::delete('/repairs/{id}', [RepairsController::class, 'destroy'])->name('api.repairs.delete');
    Route::get('/repairs/{id}', [RepairsController::class, 'show'])->name('api.repairs.show');
    Route::put('/repairs/{id}', [RepairsController::class, 'update'])->name('api.repairs.update');
});

Route::get('/brands', [BrandsController::class, 'index']); // Fetch all brands
Route::get('/models', [DevicesController::class, 'index']); // Fetch models based on brand

// Cashiers and Technicians Routes
Route::get('/cashiers', [AdminsController::class, 'index']); // Fetch all cashiers
Route::get('/technicians', [TechniciansController::class, 'index']); // Fetch all technicians

// Group for default API routes with JWT verification
Route::middleware(['JwtCustomApiVerification::class'])
    ->prefix('_default')
    ->group(function () {
        Route::get('/select/{table}', SelectTableController::class)->name('api.select.table');
        Route::post('files', [FileController::class, 'store'])->name('api.file.store');
    });

// Supplier Routes
Route::group([], function () {
    Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
    Route::post('/suppliers', [SupplierController::class, 'store'])->name('suppliers.store');
    Route::get('/suppliers/{id}', [SupplierController::class, 'show'])->name('suppliers.show');
    Route::put('/suppliers/{id}', [SupplierController::class, 'update'])->name('suppliers.update');
    Route::delete('/suppliers/{id}', [SupplierController::class, 'destroy'])->name('suppliers.destroy');
});

// Product Category Routes
Route::group([], function () {
    Route::get('/product-categories', [ProductCategoryController::class, 'index'])->name('product_categories.index');
    Route::post('/product-categories', [ProductCategoryController::class, 'store'])->name('product_categories.store');
    Route::get('/product-categories/{id}', [ProductCategoryController::class, 'show'])->name('product_categories.show');
    Route::put('/product-categories/{id}', [ProductCategoryController::class, 'update'])->name('product_categories.update');
    Route::delete('/product-categories/{id}', [ProductCategoryController::class, 'destroy'])->name('product_categories.destroy');
});

// Product Subcategory Routes
Route::group([], function () {
    Route::get('/product-subcategories', [ProductSubCategoryController::class, 'index'])->name('product_subcategories.index');
    Route::post('/product-subcategories', [ProductSubCategoryController::class, 'store'])->name('product_subcategories.store');
    Route::get('/product-subcategories/{id}', [ProductSubCategoryController::class, 'show'])->name('product_subcategories.show');
    Route::put('/product-subcategories/{id}', [ProductSubCategoryController::class, 'update'])->name('product_subcategories.update');
    Route::delete('/product-subcategories/{id}', [ProductSubCategoryController::class, 'destroy'])->name('product_subcategories.destroy');
});
