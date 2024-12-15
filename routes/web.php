<?php

use App\Http\Controllers\TestModalPageController;
use App\Http\Controllers\AccessoriesController;
use App\Http\Controllers\DataEntryController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomersController;
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

// define module as main route
// Route::get('/', [App\Module\Shortlink\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/', function () {
    return redirect('/login');
});

Route::get('files/{file}', [FileController::class, 'show'])->name('file.show');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [GeneralController::class, 'index'])->name('dashboard');
    Route::get('/maintance', [GeneralController::class, 'maintance'])->name('maintance');

    // User
    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    Route::post('/users', [UserController::class, 'store'])->name('user.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('user.destroy');

    // Permission
    Route::delete('_permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');
    Route::put('_permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
    Route::post('_permissions', [PermissionController::class, 'store'])->name('permissions.store');
    Route::get('_permissions', [PermissionController::class, 'index'])->name('permissions.index');

    // Role
    Route::resource('/roles', RoleController::class);

    // Setting
    Route::get('/settings', [SettingController::class, 'index'])->name('setting.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('setting.update');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

        Route::get('/repairs/create', [RepairsController::class, 'create'])->name('repairs.create');
        Route::post('/repairs', [RepairsController::class, 'store'])->name('repairs.store');
        Route::get('/repairs/dashboard', [RepairsController::class, 'dashboard'])->name('repairs.dashboard');
        Route::get('/repairs/overview', [RepairsController::class, 'overview'])->name('repairs.overview');
        Route::get('/repairs/{id}', [RepairsController::class, 'show'])->name('repairs.show');
        Route::put('/repairs/{id}', [RepairsController::class, 'update'])->name('api.repairs.update');
        Route::delete('/repairs/{id}', [RepairsController::class, 'destroy'])->name('api.repairs.destroy');

        Route::get('/customers', [CustomersController::class, 'index'])->name('api.customers.index');
        Route::post('/customers', [CustomersController::class, 'store'])->name('customers.store');
        Route::get('/technicians', [TechniciansController::class, 'index'])->name('api.technicians.index');
        Route::post('/technicians', [TechniciansController::class, 'store'])->name('technicians.store');


        Route::resource('devices', DevicesController::class);
        Route::get('/devices/dashboard', [DevicesController::class, 'dashboard'])->name('devices.dashboard');
        Route::get('/devices/overview', [DevicesController::class, 'overview'])->name('devices.overview');

        Route::resource('accessories', AccessoriesController::class);
        Route::get('/accessories/dashboard', [AccessoriesController::class, 'dashboard'])->name('accessories.dashboard');
        Route::get('/accessories/overview', [AccessoriesController::class, 'overview'])->name('accessories.overview');

        Route::get('/spareparts/dashboard', [SparePartsController::class, 'dashboard'])->name('spareparts.dashboard');
        Route::get('/spareparts/{id}', [SparePartsController::class, 'show'])->name('spareparts.view');
        Route::get('/spareparts/warranty-report', [SparePartsController::class, 'warrantyreport'])->name('spareparts.warranty-report');
        Route::resource('spareparts', SparePartsController::class);

        Route::resource('tools', ToolsController::class);
        Route::get('/tools/dashboard', [ToolsController::class, 'dashboard'])->name('tools.dashboard');
        Route::get('/tools/overview', [ToolsController::class, 'overview'])->name('tools.overview');

        Route::get('/products/dashboard', [ProductsController::class, 'dashboard'])->name('products.dashboard');
        Route::get('/products/overview', [ProductsController::class, 'overview'])->name('products.overview');

        Route::get('/data-input', [DataEntryController::class, 'dataInput'])->name('data-entries.data-input');
        Route::get('/data-entries/bulk-input', [DataEntryController::class, 'bulkInput'])->name('data-entries.bulk-input');
        Route::post('/data-entries', [DataEntryController::class, 'store'])->name('data-entries.store');
        Route::put('/data-entries/{id}', [DataEntryController::class, 'update'])->name('data-entries.update');
        Route::delete('/data-entries/{id}', [DataEntryController::class, 'destroy'])->name('data-entries.destroy');
        Route::get('/data-entries/categories/{category}/fields', [DataEntryController::class, 'getFields'])->name('category-fields.show');
        Route::get('/data-entries/categories/{category}/fields', [CategoryController::class, 'getFields'])->name('data-entries.categories.fields');

    Route::delete('test-modal-pages/{testModalPage}', [TestModalPageController::class,'destroy'])->name('test-modal-pages.destroy');
    Route::put('test-modal-pages/{testModalPage}', [TestModalPageController::class,'update'])->name('test-modal-pages.update');
    Route::post('test-modal-pages', [TestModalPageController::class,'store'])->name('test-modal-pages.store');
    Route::get('test-modal-pages', [TestModalPageController::class,'index'])->name('test-modal-pages.index');

    // Setting
    Route::get('/settings', [SettingController::class, 'index'])->name('setting.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('setting.update');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/test-warranty-report', function () {
        return 'Test route is working!';
    });
