<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseMediaController;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::put('/createCourse', [CourseController::class, 'store'])
    ->name('create.course');

Route::delete('/deleteUser/{uid}', [AdminDashboardController::class, 'deleteUser'])
    ->name('delete.user');

Route::delete('/deleteUsers/{ids}', [AdminDashboardController::class, 'deleteUsers'])
    ->name('delete.users');

Route::put('/updateCourse', [CourseController::class, 'update'])
    ->name('update.course');

Route::delete('/deleteCourse/{course_id}', [CourseController::class, 'delete'])
    ->name('delete.course');

Route::post('/uploadMedium', [CourseMediaController::class, 'store'])
    ->name('upload.medium');

Route::put('/updateMedium', [CourseMediaController::class, 'update'])
    ->name('update.medium');

Route::delete('/deleteMedium/{cm_id}', [CourseMediaController::class, 'delete'])
    ->name('delete.medium');

Route::get('/listUsers', [AdminDashboardController::class, 'listUsers'])
    ->name('users.list.admin');

Route::get('/listCourses', [AdminDashboardController::class, 'listCourses'])
    ->name('courses.list.admin');

Route::get('/listMedia', [AdminDashboardController::class, 'listMedia'])
    ->name('courseMedia.list.admin');

Route::get('/listUserCourses/{uid}', [CourseController::class, 'listUserCourses'])
    ->name('courses.list.users');
