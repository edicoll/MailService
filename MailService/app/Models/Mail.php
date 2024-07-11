<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mail extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'body',
        'sender_id',
        'reciever_id',
        'sender_mail',
        'sender_deleted',
        'receiver_deleted',
        'trash',
        'junk'
    ];
}
