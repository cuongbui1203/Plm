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
        Schema::table('products',function (Blueprint $table){
            $table->foreign('idProductLine')
                ->references('productLineId')
                ->on('productLines');
            $table->foreign('idStatus')
                ->references('id')
                ->on('statuses');
        });
        Schema::table('work_plates',function (Blueprint $table){
            $table->foreign('roleId')
                ->references('id')
                ->on('roles');
        });
        Schema::table('users',function (Blueprint $table){
            $table->foreign('workPlateId')
                ->references('id')
                ->on('work_plates');
            $table->foreign('imageId')
                ->references('id')
                ->on('images');
            $table->foreign('roleId')
                ->references('id')
                ->on('roles');
        });
        Schema::table('productLines', function (Blueprint $table) {
            $table->foreign('imgId')
                ->references('id')
                ->on('images');
        });
        Schema::table('notifications', function (Blueprint $table) {
            $table->foreign('idSender')
                ->references('id')
                ->on('users');
            $table->foreign('idReceiver')
                ->references('id')
                ->on('work_plates');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('failed_jobs');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('password_resets');

        Schema::dropIfExists('products');
        Schema::dropIfExists('productLines');
        Schema::dropIfExists('statuses');
        Schema::dropIfExists('personal_access_tokens');
        Schema::dropIfExists('users');
        Schema::dropIfExists('images');
        Schema::dropIfExists('work_plates');
        Schema::dropIfExists('roles');
    }
};
