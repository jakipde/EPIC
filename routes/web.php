<?php

use App\Http\Controllers\AccessoriesController;
use App\Http\Controllers\DataEntryController;
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

    // Repairs
    Route::get('/repairs/dashboard', [RepairsController::class, 'dashboard'])->name('repairs.dashboard');
    Route::get('/repairs/overview', [RepairsController::class, 'overview'])->name('repairs.overview');

    // Devices
    Route::get('/devices/dashboard', [DevicesController::class, 'dashboard'])->name('devices.dashboard');
    Route::get('/devices/overview', [DevicesController::class, 'overview'])->name('devices.overview');

    // Accessories
    Route::get('/accessories/dashboard', [AccessoriesController::class, 'dashboard'])->name('accessories.dashboard');
    Route::get('/accessories/overview', [AccessoriesController::class, 'overview'])->name('accessories.overview');

    // Spare Parts
    Route::get('/spare-parts/dashboard', [SparePartsController::class, 'dashboard'])->name('spare-parts.dashboard');
    Route::get('/spare-parts/overview', [SparePartsController::class, 'overview'])->name('spare-parts.overview');

    // Tools
    Route::get('/tools/dashboard', [ToolsController::class, 'dashboard'])->name('tools.dashboard');
    Route::get('/tools/overview', [ToolsController::class, 'overview'])->name('tools.overview');

    // Products
    Route::get('/products/dashboard', [ProductsController::class, 'dashboard'])->name('products.dashboard');
    Route::get('/products/overview', [ProductsController::class, 'overview'])->name('products.overview');

    // Data Entry
    Route::get('/data-entries/input', [DataEntryController::class, 'input'])->name('data-entries.input');
    Route::get('/data-entries/customer-input', [DataEntryController::class, 'customerInput'])->name('data-entries.customer-input');

    // Setting
    Route::get('/settings', [SettingController::class, 'index'])->name('setting.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('setting.update');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
