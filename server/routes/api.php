<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmailController;
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

// Route::get('/records', [RecordController::class, 'index']);

Route::get('/records/{user_id}', [RecordController::class, 'show']);

Route::get('/records/{id}/details', [RecordController::class, 'showDetails']);

Route::post('/records', [RecordController::class, 'store']);

Route::put('/records/{id}', [RecordController::class, 'update']);

Route::delete('/records/{id}', [RecordController::class, 'destroy']);

Route::post('/login', [UserController::class, 'login'])->name('login');

Route::post('/register', [UserController::class, 'register'])->name('register');

Route::post('/support', [EmailController::class,'sendEmail'])->name('sendEmail');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


