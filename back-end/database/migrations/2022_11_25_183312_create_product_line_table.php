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
        Schema::create('productLines', function (Blueprint $table) {
            $table->string('productLineId')
                        ->unique()
                        ->primary();
            $table->string('name')->nullable(false)->default('-1');
            $table->string('info');
            $table->string('batch');
            $table->integer('quantity');
            $table->bigInteger('imgId')->unsigned();
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