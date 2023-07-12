<?php


use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\S13\FileStorageController;
use App\Http\Controllers\api\S16\PostController;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    // 16 CRUD OPERATIONS
    Route::prefix('S16')->group(function () {
        Route::get('/posts/categories', [PostController::class, 'categories']);
        Route::resource('posts', PostController::class);
    });
});



// 13 file storage
Route::prefix('S13')->middleware(['auth:sanctum'])->group(function () {
    Route::post('/upload', [FileStorageController::class, 'upload']);
    Route::get('/test', [FileStorageController::class, 'babi']);
});


// auth
Route::prefix('auth')->middleware(['guest'])->controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('login')->name('login');
    Route::post('/register', 'register')->name('register')->name('register');
    Route::get('/refresh', [AuthController::class, 'refresh'])->name('refresh');
});
Route::middleware('auth:sanctum')->post('/auth/logout', [AuthController::class, 'logout'])->name('logout');
