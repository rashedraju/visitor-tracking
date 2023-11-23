<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::prefix('analytics')->group(function (){
    Route::get('/visitor', [\App\Http\Controllers\VisitorController::class, 'store']);
    Route::get('/visit', [\App\Http\Controllers\VisitController::class, 'store']);
});
