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

Route::post('/register',[create_user::class,'register']);
Route::post('/login',[create_user::class,'login']);

/** */

//user
Route::post('/logout',[create_user::class,'logout']);

//status
Route::get('/status/get/all',[StatusController::class,'index']);
Route::get('/status/get/{id}',[StatusController ::class,'show']);

// product
Route::post('/create-product',[ProductController::class,'create']);
Route::get('/product/get/all',[ProductController::class,'index']);
Route::get('/product/get/{id}',[ProductController::class,'getId']);

//productLine
Route::get('/product-line/get/all',[ProductLineController::class,'index']);
Route::post('/product-line/create',[ProductLineController::class,'create']);
Route::get('/product-line/get/{id}',[ProductLineController::class,'getId']);

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
