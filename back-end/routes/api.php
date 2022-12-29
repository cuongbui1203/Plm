<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\create_user;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductLineController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\WorkPlateController;
use App\Models\Role;
use Illuminate\Support\Facades\DB;

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

Route::middleware('auth:sanctum')->get('/user',[create_user::class,'index']);

Route::post('/user/register',[create_user::class,'register']);
Route::post('/user/login',[create_user::class,'login']);

//user
Route::get('/user/logout',[create_user::class,'logout']);
Route::get('/users/orderby', [create_user::class, 'getOrderByColum']);
Route::delete('/users/{id}/delete',[create_user::class,'destroy']);
Route::patch('/users/{id}/change', [create_user::class, 'update']);
Route::get('users', [create_user::class, 'getAllUsers']);
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
Route::post('/products/create',[ProductController::class,'create']);
Route::post('/products/search', [ProductController::class, 'search']);
Route::patch('/products/{id}/change',[ProductController::class,'update']);
Route::delete('/products/{id}/delete', [ProductController::class, 'deleteId']);
//productLine
Route::get('/product-lines',[ProductLineController::class,'index']);
Route::get('/product-lines/get/{id}',[ProductLineController::class,'getId']);
Route::get('/product-lines/orderby', [ProductLineController::class, 'getOrderByColum']);
Route::post('product-lines/search', [ProductLineController::class, 'search']);
Route::post('/product-lines/create',[ProductLineController::class,'create']);
Route::get('/product-lines/{idProductLine}/status/{idStatus}', [ProductLineController::class, 'getProductByStatus']);
Route::patch('product-lines/{id}/update', [ProductLineController::class, 'update']);
Route::delete('product-lines/{id}/delete', [ProductLineController::class, 'deleteId']);

//img
Route::get('/image/get/{id}', [ImageController::class, 'getImage']);
Route::post('/image', [ImageController::class, 'store']);

//notification
Route::get('/notifications/{id}', [NotificationController::class, 'show']);
Route::get('/notifications/user/{id}',[NotificationController::class,'getAllNotification']);
Route::get('/notifications/recv/{id}', [NotificationController::class, 'showRecvNotification']);
Route::post('/notifications/create', [NotificationController::class, 'create']);
Route::patch('notifications/{id}/update', [NotificationController::class, 'requestNotification']);

//workPlate
Route::get('work-plates', [WorkPlateController::class, 'index']);
Route::get('work-plate/{id}', [WorkPlateController::class, 'getWorkPlateById']);
Route::post('work-plate/create', [WorkPlateController::class, 'create']);
Route::get('work-plates/role/{id}', [WorkPlateController::class,'getByIdRole']);
Route::patch('work-plate/{id}/update', [WorkPlateController::class,'update']);
Route::delete('work-plate/{id}/delete', [WorkPlateController::class,'deleteId']);
// Route::group(['middleware'=>'auth:sanctum'],function(){
//     //user
//     Route::post('/logout',[create_user::class,'logout']);

//     //status
//     Route::get('/status/all',[StatusController::class,'index']);

//     // product
//     Route::post('/create-product',[ProductController::class,'create']);
//     Route::get('/product/all',[ProductController::class,'index']);
//     Route::get('/product/{id}',[ProductController::class,'getId']);

//     //productLine
//     Route::get('/product-line/get',[ProductLineController::class,'index']);

// });