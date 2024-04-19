<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FacebookController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/create', [PostController::class, 'create'])->name('post.create');
    Route::get('/post/edit/{post}', [PostController::class, 'edit'])->name('post.edit');
    Route::post('/post/store', [PostController::class, 'store'])->name('post.store');
    Route::put('/post/update/{post}', [PostController::class, 'update'])->name('post.update');
    Route::delete('post/delete/{post}', [PostController::class, 'destroy'])->name('post.destroy');

    Route::post('/image/store/{post}', [ImageController::class, 'store'])->name('image.store');
    Route::delete('image/delete/{image}', [ImageController::class, 'destroy'])->name('image.destroy');

    Route::get('/clearDB', [FacebookController::class, 'clear'])->name('facebook.clearDB');
    Route::get('/refreshPosts', [FacebookController::class, 'refresh'])->name('facebook.refreshPosts');
});

Route::get('/category', [CategoryController::class, 'index'])->name('category.index');

Route::get('/post/{category}', [PostController::class, 'index'])->name('post.index');
Route::get('/fetchPosts', [PostController::class, 'fetchPosts'])->name('post.fetchPosts');
Route::get('/image/fetchImages/{post}', [ImageController::class, 'fetchImages'])->name('image.fetchImages');

require __DIR__.'/auth.php';
