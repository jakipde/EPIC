<?php

use App\Http\Controllers\Default\Api\SelectTableController;
use App\Http\Controllers\Default\FileController;
use App\Http\Controllers\AdminsController;
use App\Http\Controllers\TechniciansController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductSubCategoryController;
use App\Http\Controllers\RepairsController;
use App\Http\Controllers\BrandsController;
use App\Http\Controllers\DevicesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

    // API routes
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    // Customers API routes
    Route::prefix('customers')->group(function () {
        Route::get('/', [CustomersController::class, 'index']);  // Fetch all customers
        Route::post('/', [CustomersController::class, 'store']); // Add a new customer
        Route::get('/{id}', [CustomersController::class, 'show']); // Fetch a single customer by ID
        Route::put('/{id}', [CustomersController::class, 'update']); // Update a customer
        Route::delete('/{id}', [CustomersController::class, 'destroy']); // Delete a customer
    });

    // Repairs API routes
    Route::prefix('repairs')->group(function () {
        Route::post('/', [RepairsController::class, 'store'])->name('api.repairs.store');
        Route::delete('/{id}', [RepairsController::class, 'destroy'])->name('api.repairs.delete');
        Route::get('/{id}', [RepairsController::class, 'show'])->name('api.repairs.show');
        Route::put('/{id}', [RepairsController::class, 'update'])->name('api.repairs.update');
    });

    Route::get('/brands', [BrandsController::class, 'index']); // Fetch all brands
    Route::get('/models', [DevicesController::class, 'index']); // Fetch models based on brand

    // Cashiers and Technicians Routes
    Route::get('/cashiers', [AdminsController::class, 'index']); // Fetch all cashiers
    Route::get('/technicians', [TechniciansController::class, 'index']); // Fetch all technicians

    // Cashiers and Technicians API routes
    Route::get('/cashiers', [AdminsController::class, 'index']);
    Route::get('/technicians', [TechniciansController::class, 'index']);

    // Default API routes with JWT verification
    Route::middleware(['JwtCustomApiVerification'])->prefix('_default')->group(function () {
        Route::get('/select/{table}', SelectTableController::class)->name('api.select.table');
        Route::post('files', [FileController::class, 'store'])->name('api.file.store');
    });

    // Suppliers API routes
    Route::prefix('suppliers')->group(function () {
        Route::get('/', [SupplierController::class, 'index'])->name('suppliers.index');
        Route::post('/', [SupplierController::class, 'store'])->name('suppliers.store');
        Route::get('{id}', [SupplierController::class, 'show'])->name('suppliers.show');
        Route::put('{id}', [SupplierController::class, 'update'])->name('suppliers.update');
        Route::delete('{id}', [SupplierController::class, 'destroy'])->name('suppliers.destroy');
    });

    // Product Category API routes
    Route::prefix('product-categories')->group(function () {
        Route::get('/', [ProductCategoryController::class, 'index'])->name('product_categories.index');
        Route::post('/', [ProductCategoryController::class, 'store'])->name('product_categories.store');
        Route::get('{id}', [ProductCategoryController::class, 'show'])->name('product_categories.show');
        Route::put('{id}', [ProductCategoryController::class, 'update'])->name('product_categories.update');
        Route::delete('{id}', [ProductCategoryController::class, 'destroy'])->name('product_categories.destroy');
    });

    // Product Subcategory API routes
    Route::prefix('product-subcategories')->group(function () {
        Route::get('/', [ProductSubCategoryController::class, 'index'])->name('product_subcategories.index');
        Route::post('/', [ProductSubCategoryController::class, 'store'])->name('product_subcategories.store');
        Route::get('{id}', [ProductSubCategoryController::class, 'show'])->name('product_subcategories.show');
        Route::put('{id}', [ProductSubCategoryController::class, 'update'])->name('product_subcategories.update');
        Route::delete('{id}', [ProductSubCategoryController::class, 'destroy'])->name('product_subcategories.destroy');
    });
