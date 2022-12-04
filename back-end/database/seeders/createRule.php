<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class createRule extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rule')->insert([
            [
                'title'=>'Ban điều hành'
            ],
            [
                'title'=>'Nhà máy'
            ],
            [
                'title'=>'Shop'
            ],
            [
                'title'=>'Bảo hành'
            ]
        ]);
    }
}