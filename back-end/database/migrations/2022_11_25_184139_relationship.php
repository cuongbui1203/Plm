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
        // Schema::table('products',function(Blueprint $table){
        //     $table->foreign('idProductLine')
        //         ->references('productLineId')
        //         ->on('productLine');
        //     $table->foreign('idStatus')
        //         ->references('id')
        //         ->on('status');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('products');
        Schema::dropIfExists('statuses');
        Schema::dropIfExists('productLines');
        // Schema::dropIfExists('');
    }
};