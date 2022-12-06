<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        for ($i = 0; $i < 10; $i++) {
            //
            DB::table('productLines')->insert([
                [
                    'productLineId' => 'test' . (string) ($i),
                    'name' => 'name' . (string) $i,
                    'info' => (string) $i,
                    'quantity' => $i,
                    'batch' => '1222',
                ]
            ]);
        }
    }
    
}