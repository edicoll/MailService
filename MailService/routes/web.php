<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MailController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// route invoked by log in
Route::get('/dashboard', [MailController::class, 'inbox'])->name('dashboard');

// navigation bar routes
Route::get('/inbox', [MailController::class, 'inbox'])->middleware(['auth', 'verified'])->name('inbox');
Route::get('/sent', [MailController::class, 'sent'])->middleware(['auth', 'verified'])->name('sent');
Route::get('/junk', [MailController::class, 'junk'])->middleware(['auth', 'verified'])->name('junk');
Route::get('/trash', [MailController::class, 'trash'])->middleware(['auth', 'verified'])->name('trash');
Route::get('/newmail', [MailController::class, 'newmail'])->middleware(['auth', 'verified'])->name('newmail');

//sending mail
Route::post('/addmail', [MailController::class, 'addmail'])->middleware(['auth', 'verified'])->name('addmail');

//deleting mail
Route::delete('/delete_sender_mail', [MailController::class, 'delete_sender_mail'])->middleware(['auth', 'verified'])->name('delete_sender_mail');
Route::delete('/delete_reciever_mail', [MailController::class, 'delete_reciever_mail'])->middleware(['auth', 'verified'])->name('delete_reciever_mail');

//trash
Route::post('/move_to_trash', [MailController::class, 'move_to_trash'])->middleware(['auth', 'verified'])->name('move_to_trash');
Route::delete('/delete_from_trash', [MailController::class, 'delete_from_trash'])->middleware(['auth', 'verified'])->name('delete_from_trash');

//junk
Route::delete('/delete_from_junk', [MailController::class, 'delete_from_junk'])->middleware(['auth', 'verified'])->name('delete_from_junk');
Route::get('/not_junk', [MailController::class, 'not_junk'])->middleware(['auth', 'verified'])->name('not_junk');


//open mail
Route::get('/open_mail_inbox', [MailController::class, 'open_mail_inbox'])->middleware(['auth', 'verified'])->name('open_mail_inbox');
Route::get('/open_mail_sent', [MailController::class, 'open_mail_sent'])->middleware(['auth', 'verified'])->name('open_mail_sent');

//replying mail
Route::get('/reply', [MailController::class, 'reply'])->middleware(['auth', 'verified'])->name('reply');

//forwarding mail
Route::get('/forward', [MailController::class, 'forward'])->middleware(['auth', 'verified'])->name('forward');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


});

require __DIR__.'/auth.php';
