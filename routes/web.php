<?php

use App\Http\Controllers\DataEntryController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ToolsController;
use App\Http\Controllers\SparePartController;
use App\Http\Controllers\AccessoriesController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\RepairsController;
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

    // #Admin
Route::delete('data-entries/{dataEntry}', [DataEntryController::class,'destroy'])->name('data-entries.destroy');
Route::put('data-entries/{dataEntry}', [DataEntryController::class,'update'])->name('data-entries.update');
Route::post('data-entries', [DataEntryController::class,'store'])->name('data-entries.store');
Route::get('data-entries', [DataEntryController::class,'index'])->name('data-entries.index');
Route::post('products', [ProductsController::class,'update'])->name('products.update');
Route::get('products', [ProductsController::class,'index'])->name('products.index');
Route::post('tools', [ToolsController::class,'update'])->name('tools.update');
Route::get('tools', [ToolsController::class,'index'])->name('tools.index');
Route::post('spare-parts', [SparePartController::class,'update'])->name('spare-parts.update');
Route::get('spare-parts', [SparePartController::class,'index'])->name('spare-parts.index');
Route::delete('accessories/{accessories}', [AccessoriesController::class,'destroy'])->name('accessories.destroy');
Route::put('accessories/{accessories}', [AccessoriesController::class,'update'])->name('accessories.update');
Route::post('accessories', [AccessoriesController::class,'store'])->name('accessories.store');
Route::get('accessories', [AccessoriesController::class,'index'])->name('accessories.index');
    Route::resource('devices', DeviceController::class);
    Route::post('repairs', [RepairsController::class,'update'])->name('repairs.update');
Route::get('repairs', [RepairsController::class,'index'])->name('repairs.index');
});

// #Guest


// Route::get('/{link:code}', [App\Module\Shortlink\Controllers\HomeController::class, 'redirect'])->name('redirect');
