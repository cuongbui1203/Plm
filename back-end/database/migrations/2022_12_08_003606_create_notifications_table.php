<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('idSender')->unsigned();
            $table->string('idReceiver');
            $table->string('sender');
            $table->string('Receiver');
            $table->string('data');
            $table->enum('accepted', ['request', 'pending', 'reject', 'accept'])
                    ->nullable(false)->default('request');
            $table->string('addId')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
};