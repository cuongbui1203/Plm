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
            $table->longText('info');
            $table->integer('quantity')->nullable(false)->default(0);
            $table->bigInteger('imgId')->unsigned()->nullable(false)->default(1);
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