<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\create_user;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductLineController;
use App\Http\Controllers\Api\StatusController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user/register',[create_user::class,'register']);
Route::post('/user/login',[create_user::class,'login']);


//user
Route::post('/user/logout',[create_user::class,'logout']);
Route::delete('/users/{idUser}/delete',[create_user::class,'destroy']);
//status
Route::get('/statuses',[StatusController::class,'index']);
Route::get('/statuses/{id}',[StatusController ::class,'show']);

// product
Route::post('/products/create',[ProductController::class,'create']);
Route::get('/products',[ProductController::class,'index']);
Route::get('/products/{id}',[ProductController::class,'getId']);
Route::patch('/products/{id}/change',[ProductController::class,'']);

//productLine
Route::post('/product-lines/create',[ProductLineController::class,'create']);
Route::get('/product-lines',[ProductLineController::class,'index']);
Route::get('/product-lines/{id}',[ProductLineController::class,'getId']);

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