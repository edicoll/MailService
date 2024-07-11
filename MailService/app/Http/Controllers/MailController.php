<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Mail;
use Illuminate\Support\Facades\Route;


class MailController extends Controller
{

    //displaying the inbox with the mails of the authenticated person
    public function inbox(Request $request){
        
        $mails = Mail::where('reciever_id', auth()->user()->id)
             ->where('reciever_deleted', 0)
             ->where('trash', 0)
             ->where('junk', 0)
             ->get();

        $currentRoute = Route::currentRouteName();

        return Inertia::render('Inbox', ['mails' => $mails,'currentRoute' => $currentRoute]);
    }

    //displaying the sent with the mails of the authenticated person
    public function sent(Request $request){

        
        $mails = Mail::where('sender_id', auth()->user()->id)
             ->where('sender_deleted', 0)
             ->get();
        
             $users = User::All();

        $currentRoute = Route::currentRouteName();
       
        return Inertia::render('Sent', ['mails' => $mails, 'users' => $users, 'currentRoute' => $currentRoute]);
    }

    //displaying junk
    public function junk(Request $request){

        $mails = Mail::where('junk', true)
             ->where('reciever_id', Auth::id())
             ->get();

             $currentRoute = Route::currentRouteName();
        
        return Inertia::render('Junk', ['mails' => $mails, 'currentRoute' => $currentRoute]);
    }

    //displaying trash
    public function trash(Request $request){
        
        $mails = Mail::where('trash', true)
            ->where('reciever_id', Auth::id())
             ->get();

             $currentRoute = Route::currentRouteName();

        return Inertia::render('Trash', ['mails' => $mails, 'currentRoute' => $currentRoute]);
        
    }

    //displaying newmail for sending mails
    public function newmail(Request $request){

        $currentRoute = Route::currentRouteName();
        
        return Inertia::render('NewMail', ['currentRoute' => $currentRoute]);
    }

    //function for sending mails
    public function addmail(Request $request){

        $junk_keywords = [
            'free', 'click here', 'earn money', 'discount', 'winner', 'investment', 
            'loan', 'casino', 'limited offer', 'money back', 'risk-free', 'weight loss'
        ];


        $income = $request->validate([
             'reciever_mail' => 'required',
             'title' => 'required',
            'body' => 'required',
        ]);

        $receiver = User::where('email', $income['reciever_mail'])->first();
                            
        if (!$receiver)   return Inertia::render('NewMail');

        $income['reciever_id'] = $receiver->id;
        $income['sender_id'] = Auth()->user()->id;
        $income['sender_mail'] = Auth()->user()->email;

        $message = strtolower($income['body']);
        
        //function for junk detection
        foreach($junk_keywords as $keyword) {
                  if (strpos($message, $keyword) !== false) {
                        $income['junk'] = true;
                        break; 
                    }
        }

        Mail::Create($income);
        
        return redirect('/newmail');
    }

    // function for delete mail on sender side
    public function delete_sender_mail(Request $request){
        
        $mail = Mail::find($request->mailId);
        $mail->sender_deleted = 1;
        $mail->save();
        
        if($mail->sender_deleted && $mail->reciever_deleted && !$mail->trash) $mail->delete();
        
        return redirect('/sent');
    }

    // function for delete mail on reciever side
    public function delete_reciever_mail(Request $request){
        
        $mail = Mail::find($request->mailId);
        $mail->reciever_deleted = 1;
        $mail->save();
        
        if($mail->sender_deleted && $mail->reciever_deleted && !$mail->trash) $mail->delete();
        
        return redirect('/inbox');
    }

    //function for moving mails to trash
    public function move_to_trash(Request $request){
        
        $mail = Mail::find($request->mailId);
        $mail->trash = 1;
        $mail->save();

        return redirect('/inbox');
    }

    //function for deleting mails from trash
    public function delete_from_trash(Request $request){
        
        $mail = Mail::find($request->mailId);
        $mail->trash = 0;
        $mail->reciever_deleted = 1;
        $mail->save();
        
        $mails = Mail::where('trash', true)
            ->where('reciever_id', Auth::id())
            ->get();

        if($mail->sender_deleted && $mail->reciever_deleted && !$mail->trash) $mail->delete();

        return Inertia::render('Trash', ['mails' => $mails]);

    }

    //function for deleting mails from junk
    public function delete_from_junk(Request $request){
        
        $mail = Mail::find($request->mailId);
        $mail->delete();

        $mails = Mail::where('junk', true)
             ->where('reciever_id', Auth::id())
             ->get();

        return Inertia::render('Junk', ['mails' => $mails]);
    }

    //function for returning mails to inbox
    public function not_junk(Request $request){

        $mail = Mail::find($request->mailId);
        $mail->junk = 0;
        $mail->save();

        $mails = Mail::where('junk', true)
             ->where('reciever_id', Auth::id())
             ->get();

        return Inertia::render('Junk', ['mails' => $mails]);
    }

    //function for opening and displaying mails in inbox 
    public function open_mail_inbox(Request $request){

        $request->validate(['id' => 'required|integer']);

        $mail = Mail::findOrFail($request->id);

        return Inertia::render('OpenMail', ['mail' => $mail, 'inbox_or_sent' => true]);
    }

    //function for opening and displaying mails in sent and others 
    public function open_mail_sent(Request $request){

        $request->validate(['id' => 'required|integer']);

        $mail = Mail::findOrFail($request->id);

        return Inertia::render('OpenMail', ['mail' => $mail, 'inbox_or_sent' => false]);
    }

    //function for replying mail
    public function reply(Request $request){

        $request->validate(['id' => 'required|integer']);

        $mail = Mail::findOrFail($request->id);

        return Inertia::render('NewMail', ['mail_reply' => $mail]);
    }

    //function for forwarding mail
    public function forward(Request $request){

        $request->validate(['id' => 'required|integer']);

        $mail = Mail::findOrFail($request->id);

        return Inertia::render('NewMail', ['mail_forward' => $mail]);
    }   
}
