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

// Authentication route
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// User role-based route
Route::get('/users', function (Request $request) {
    $roleName = $request->query('role_name');
    
    if (!$roleName) {
        return response()->json(['error' => 'role_name is required'], 400);
    }

    if (!in_array($roleName, ['Technician', 'Cashier'])) {
        return response()->json(['error' => 'Invalid role name'], 400);
    }

    $role = Role::where('name', $roleName)->first();
    if (!$role) {
        return response()->json(['error' => 'Role not found'], 404);
    }

    return response()->json(User::where('role_id', $role->id)->get());
});

// JWT protected routes
Route::middleware([JwtCustomApiVerification::class])
    ->prefix('_default')
    ->group(function () {
        Route::get('/select/{table}', SelectTableController::class)->name('api.select.table');
        Route::post('files', [FileController::class, 'store'])->name('api.file.store');
    });

// Resourceful routes with consistent naming
$resources = [
    'repairs' => RepairsController::class,
    'customers' => CustomersController::class,
    'suppliers' => SupplierController::class,
    'product-categories' => ProductCategoryController::class,
    'product-subcategories' => ProductSubCategoryController::class
];

foreach ($resources as $prefix => $controller) {
    Route::prefix($prefix)->group(function () use ($controller, $prefix) {
        Route::get('/', [$controller, 'index'])->name("{$prefix}.index");
        Route::post('/', [$controller, 'store'])->name("{$prefix}.store");
        Route::get('/{id}', [$controller, 'show'])->name("{$prefix}.show");
        Route::put('/{id}', [$controller, 'update'])->name("{$prefix}.update");
        Route::delete('/{id}', [$controller, 'destroy'])->name("{$prefix}.destroy");
    });
}

// Additional standalone routes
Route::get('/brands', [BrandsController::class, 'index']);
Route::get('/devices', [DevicesController::class, 'index']);