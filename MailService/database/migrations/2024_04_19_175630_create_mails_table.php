<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mails', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->longText('body');
            $table->foreignId('sender_id');
            $table->foreignId('reciever_id');
            $table->string('sender_mail');
            $table->boolean('sender_deleted')->default(0);
            $table->boolean('reciever_deleted')->default(0); 
            $table->boolean('trash')->default(0); 
            $table->boolean('junk')->default(0);
            

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mails');
    }
};
