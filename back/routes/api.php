<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});



    Route::group(["middleware" => "isUser"], function () {
        Route::group(['middleware' => 'auth:api'], function () {
            // Route::get('/users', [DemoController::class, 'getAllUsers']);
            Route::get('user/{id}',[ProfileController::class,'get_user']);
            Route::post('add-post',[PostController::class,'add_post']);
            Route::post('update/{id}',[ProfileController::class,'update_user']);
            Route::post('user',[ProfileController::class,'getUser']);
    });

    // other users routes
});

