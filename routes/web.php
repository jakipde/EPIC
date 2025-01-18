<?php

use App\Http\Controllers\TestModalPageController;
use App\Http\Controllers\AccessoriesController;
use App\Http\Controllers\DataEntryController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductSubCategoryController;
use App\Http\Controllers\TechniciansController;
use App\Http\Controllers\DevicesController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\RepairsController;
use App\Http\Controllers\SparePartsController;
use App\Http\Controllers\ToolsController;
use App\Http\Controllers\Default\FileController;
use App\Http\Controllers\Default\GeneralController;
use App\Http\Controllers\Default\PermissionController;
use App\Http\Controllers\Default\ProfileController;
use App\Http\Controllers\Default\RoleController;
use App\Http\Controllers\Default\SettingController;
use App\Http\Controllers\Default\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Define module as main route
Route::get('/', function () {
    return redirect('/login');
});

Route::get('files/{file}', [FileController::class, 'show'])->name('file.show');

// Web routes with authentication
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [GeneralController::class, 'index'])->name('dashboard');
    Route::get('/maintance', [GeneralController::class, 'maintance'])->name('maintance');

    // User
    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    Route::post('/users', [UserController::class, 'store'])->name('user.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('user.destroy');

    // Permission management
    Route::resource('_permissions', PermissionController::class)->except(['create', 'show']);

    // Role management
    Route::resource('/roles', RoleController::class);

    // Settings and profile management
    Route::get('/settings', [SettingController::class, 'index'])->name('setting.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('setting.update');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Repairs management routes
Route::prefix('/repairs')->group(function () {
    Route::get('/dashboard', [RepairsController::class, 'index'])->name('repairs.dashboard');
    Route::get('/data-management', [RepairsController::class, 'datamanagement'])->name('repairs.data-management');
    Route::get('/reports', [RepairsController::class, 'reports'])->name('repairs.reports');

});

// Devices management routes
Route::resource('devices', DevicesController::class);
Route::get('/devices/dashboard', [DevicesController::class, 'dashboard'])->name('devices.dashboard');
Route::get('/devices/overview', [DevicesController::class, 'overview'])->name('devices.overview');

// Accessories management routes
Route::resource('accessories', AccessoriesController::class);
Route::get('/accessories/dashboard', [AccessoriesController::class, 'dashboard'])->name('accessories.dashboard');
Route::get('/accessories/overview', [AccessoriesController::class, 'overview'])->name('accessories.overview');

// Spare parts management routes
Route::prefix('/spareparts')->group(function () {
    Route::get('/datainsights', [SparePartsController::class, 'datainsights'])->name('spareparts.datainsights');
    Route::get('/warranty-report', [SparePartsController::class, 'warrantyreport'])->name('spareparts.warranty-report');
    Route::get('/{id}', [SparePartsController::class, 'show'])->name('spareparts.view');
    Route::resource('/', SparePartsController::class)->except(['show']); // Resource excluding show
});

// Suppliers management routes
Route::resource('suppliers', SupplierController::class);

// Product categories management routes
Route::resource('product-categories', ProductCategoryController::class);

// Product subcategories management routes
Route::resource('product-subcategories', ProductSubCategoryController::class);

// Tools management routes
Route::resource('tools', ToolsController::class);
Route::get('/tools/dashboard', [ToolsController::class, 'dashboard'])->name('tools.dashboard');
Route::get('/tools/overview', [ToolsController::class, 'overview'])->name('tools.overview');

// Products management routes
Route::get('/products/dashboard', [ProductsController::class, 'dashboard'])->name('products.dashboard');
Route::get('/products/overview', [ProductsController::class, 'overview'])->name('products.overview');

// Data entry routes with authentication
Route::middleware(['auth'])->group(function () {
    Route::get('/data-input', [DataEntryController::class, 'dataInput'])->name('data-entries.data-input');
    Route::get('/data-entries/bulk-input', [DataEntryController::class, 'bulkInput'])->name('data-entries.bulk-input');
    Route::post('/data-entries', [DataEntryController::class, 'store'])->name('data-entries.store');
    Route::put('/data-entries/{id}', [DataEntryController::class, 'update'])->name('data-entries.update');
    Route::delete('/data-entries/{id}', [DataEntryController::class, 'destroy'])->name('data-entries.destroy');
    Route::get('/data-entries/categories/{category}/fields', [DataEntryController::class, 'getFields'])->name('category-fields.show');
});

// Test modal pages
Route::prefix('test-modal-pages')->group(function () {
    Route::delete('{testModalPage}', [TestModalPageController::class, 'destroy'])->name('test-modal-pages.destroy');
    Route::put('{testModalPage}', [TestModalPageController::class, 'update'])->name('test-modal-pages.update');
    Route::post('/', [TestModalPageController::class, 'store'])->name('test-modal-pages.store');
    Route::get('/', [TestModalPageController::class, 'index'])->name('test-modal-pages.index');
});

// Test route for warranty report
Route::get('/test-warranty-report', function () {
    return 'Test route is working!';
});
