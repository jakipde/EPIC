<?php

use App\Http\Controllers\Default\Api\SelectTableController;
use App\Http\Controllers\Default\FileController;
use App\Http\Middleware\JwtCustomApiVerification;
use App\Models\Default\User;
use App\Models\Default\Role;
use App\Http\Controllers\RepairsController;
use App\Http\Controllers\AdminsController;
use App\Http\Controllers\TechniciansController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductSubCategoryController;
use App\Http\Controllers\BrandsController;
use App\Http\Controllers\DevicesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users', function (Request $request) {
    $roleName = $request->query('role_name'); // Fetch role_name from query parameters

    // Validate role_name is provided
    if (!$roleName) {
        return response()->json(['error' => 'role_name is required'], 400);
    }

    // Validating the role name
    $validRoles = ['Technician', 'Cashier'];
    if (!in_array($roleName, $validRoles)) {
        return response()->json(['error' => 'Invalid role name'], 400);
    }

    // Fetch the role by name
    $role = Role::where('name', $roleName)->first();

    if (!$role) {
        return response()->json(['error' => 'Role not found'], 404);
    }

    // Fetch users based on role_id (which is a ULID)
    $users = User::where('role_id', $role->id)->get();

    return response()->json($users); // Return users as JSON
});

Route::middleware([JwtCustomApiVerification::class])
    ->prefix('_default')
    ->group(function () {
        Route::get('/select/{table}', SelectTableController::class)->name('api.select.table');
        Route::post('files', [FileController::class, 'store'])->name('api.file.store');
    });

<<<<<<< Updated upstream
=======
// Category-related API routes
Route::group([], function () {
    Route::get('/categories/{id}/fields', [CategoryController::class, 'getFields'])->name('api.categories.fields');
});

>>>>>>> Stashed changes
    Route::prefix('repairs')->group(function () {
        Route::post('/', [RepairsController::class, 'store'])->name('repairs.store');
        Route::get('/', [RepairsController::class, 'index'])->name('repairs.index');
        Route::get('/{id}', [RepairsController::class, 'show'])->name('repairs.show');
        Route::put('/{id}', [RepairsController::class, 'update'])->name('repairs.update');
        Route::delete('/{id}', [RepairsController::class, 'destroy'])->name('repairs.delete');
    });

    // Customers API routes
    Route::prefix('customers')->group(function () {
<<<<<<< Updated upstream
        Route::get('/', [CustomersController::class, 'index']);  // Fetch all customers
=======
        Route::get('/', [CustomersController::class, 'index']);
>>>>>>> Stashed changes
        Route::post('/', [CustomersController::class, 'store']); // Add a new customer
        Route::get('/{id}', [CustomersController::class, 'show']); // Fetch a single customer by ID
        Route::put('/{id}', [CustomersController::class, 'update']); // Update a customer
        Route::delete('/{id}', [CustomersController::class, 'destroy']); // Delete a customer
    });

    Route::get('/brands', [BrandsController::class, 'index']);
    Route::get('/devices', [DevicesController::class, 'index']);

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
<<<<<<< Updated upstream
    });
=======
    });
>>>>>>> Stashed changes
