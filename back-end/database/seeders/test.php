<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class test extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
<<<<<<< HEAD
        DB::table('images')->insert(['img'=>'']);
=======
        DB::table('images')->insert([
            'img'=>'',
        ]);
>>>>>>> 156a85506c4629f5c6a8e55e20eab4fe067084b0
    }
}