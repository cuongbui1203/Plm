<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class createProductLine extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // for ($i = 0; $i < 10; $i++) {
            //
            DB::table('productLines')->insert([
                [
                    'productLineId' => 'test0',
                    'name' => 'name0',
                    'info' => '0',
                    'quantity' => 10,
                    'batch' => '1222',
                    'imgId' => 1,
                ]
            ]);
        // }
    }
    
}