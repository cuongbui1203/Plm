<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\create_user;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductLineController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\WorkPlateController;
use App\Http\Middleware\RoleAdminMiddleware;
use App\Http\Middleware\RoleFactoryMiddleware;
use App\Http\Middleware\RoleShopMiddleware;
use App\Http\Middleware\RolettbhMiddleware;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/user/login',[create_user::class,'login']);
Route::get('/user/logout',[create_user::class,'logout']);
Route::get('/image/get/{id}', [ImageController::class, 'getImage']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::middleware([RoleAdminMiddleware::class])->group(function () {
        Route::post('/user/register',[create_user::class,'register']);
        Route::get('users', [create_user::class, 'getAllUsers']);
        Route::delete('/users/{id}/delete',[create_user::class,'destroy']);
        Route::post('/product-lines/create',[ProductLineController::class,'create']);
        Route::post('product-lines/{id}/update', [ProductLineController::class, 'update']);
        Route::delete('product-lines/{id}/delete', [ProductLineController::class, 'deleteId']);
        Route::post('work-plate/{id}/update', [WorkPlateController::class,'update']);
        Route::delete('work-plate/{id}/delete', [WorkPlateController::class,'deleteId']);
        Route::post('work-plate/create', [WorkPlateController::class, 'create']);
    });
    Route::middleware([RoleShopMiddleware::class])->group(function () {
        Route::post('/product/{id}/ban', [ProductController::class, 'bans']);
    });
    
    Route::middleware([RolettbhMiddleware::class])->group(function () {
    });
    
    Route::middleware([RoleFactoryMiddleware::class])->group(function () {
        Route::post('/products/create',[ProductController::class,'create']);
        Route::post('/products/{id}/change',[ProductController::class,'update']);
        Route::delete('/products/{id}/delete', [ProductController::class, 'deleteId']);
    });
    //user
    Route::get('/user',[create_user::class,'index']);
    Route::get('/users/orderby', [create_user::class, 'getOrderByColum']);
    Route::post('/user/{id}/change', [create_user::class, 'update']);
    // Role
    Route::get('/roles', [create_user::class,'getAllRole']);
    Route::get('/roles/{id}', [create_user::class, 'getRoleById']);

    //status
    Route::get('/statuses',[StatusController::class,'index']);
    Route::get('/statuses/{id}',[StatusController ::class,'show']);

    // product
    Route::get('/products',[ProductController::class,'index']);
    Route::get('/products/get/{id}',[ProductController::class,'getId']);
    Route::get('/products/orderby', [ProductController::class, 'getOrderByColum']);
    Route::post('/products/search', [ProductController::class, 'search']);
    //productLine
    Route::get('/product-lines',[ProductLineController::class,'index']);
    Route::get('/product-lines/get/{id}',[ProductLineController::class,'getId']);
    Route::get('/product-lines/orderby', [ProductLineController::class, 'getOrderByColum']);
    Route::post('product-lines/search', [ProductLineController::class, 'search']);
    Route::get('/product-lines/{idProductLine}/status/{idStatus}', [ProductLineController::class, 'getProductByStatus']);

    //img
    Route::post('/image', [ImageController::class, 'store']);

    //notification
    Route::get('/request/{id}', [NotificationController::class, 'show']);
    Route::get('/request/user/{id}',[NotificationController::class,'getAllNotification']);
    Route::post('/request/create', [NotificationController::class, 'create']);
    Route::post('/request/{id}/update', [NotificationController::class, 'requestNotification']);
    Route::delete('/request/{id}/delete', [NotificationController::class, 'destroy']);

    //workPlate
    Route::get('work-plates', [WorkPlateController::class, 'index']);
    Route::get('work-plate/{id}', [WorkPlateController::class, 'getWorkPlateById']);
    Route::get('work-plates/role/{id}', [WorkPlateController::class,'getByIdRole']);
});