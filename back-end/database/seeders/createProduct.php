<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class createProduct extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        for( $i = 0;$i<10;$i++){
            //
                DB::table('products')->insert([
                    [
                        'productId'=>'test'.(string)($i),
                        'name'=>fake()->name(),
                        'history'=>fake()->paragraph(1),
                        'idStatus'=>1,
                        'idProductLine'=>'test0',
                        
                    ]
            ]);}
    }
}