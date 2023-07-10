<?php


use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\F13FileStorage;
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

Route::middleware(['auth:sanctum', 'abilities'])->get('/user', function (Request $request) {
    return $request->user();
});

// 13 file storage
Route::prefix('F13')->middleware(['auth:sanctum'])->group(function () {
    Route::post('/upload', [F13FileStorage::class, 'upload']);
    Route::get('/test', [F13FileStorage::class, 'babi']);
});


// auth
Route::prefix('auth')->middleware(['guest'])->controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('login')->name('login');
    Route::post('/register', 'register')->name('register')->name('register');
    Route::get('/refresh', [AuthController::class, 'refresh'])->name('refresh');
});
Route::middleware('auth:sanctum')->post('/auth/logout', [AuthController::class, 'logout'])->name('logout');
