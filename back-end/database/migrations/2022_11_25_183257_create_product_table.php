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
        Schema::create('products', function (Blueprint $table) {
            $table->string('productId')
                    ->primary()
                    ->nullable(false);
            $table->string('name');
	        $table->string('visit');
            $table->string('idProductLine')->nullable(false)->default('test0');
            $table->bigInteger('idStatus')->unsigned()->nullable(false)->default(1);
            $table->string('canAddRequest')->nullable(false)->default('1');
            $table->string('history');
            $table->string('infoCustomer');
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