<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class work_plate extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('work_plates')->insert([
            'id'=>'1',
            'name'=>'ban dieu hanh',
            'roleId'=>1,
            'address'=>'Ha noi',
            'created_at'=>date('Y-m-d H:i:m'),
            'updated_at'=>date('Y-m-d H:i:m'),
        ]);
        DB::table('work_plates')->insert([
            'id'=>'2',
            'name'=>'nha may 1',
            'roleId'=>2,
            'address'=>'Ha noi',
            'created_at'=>date('Y-m-d H:i:m'),
            'updated_at'=>date('Y-m-d H:i:m'),
        ]);
        DB::table('work_plates')->insert([
            'id'=>'3',
            'name'=>'cua hang',
            'roleId'=>3,
            'address'=>'Ha noi',
            'created_at'=>date('Y-m-d H:i:m'),
            'updated_at'=>date('Y-m-d H:i:m'),
        ]);
        DB::table('work_plates')->insert([
            'id'=>'4',
            'name'=>'Trung tam bao hanh',
            'roleId'=>4,
            'address'=>'Ha noi',
            'created_at'=>date('Y-m-d H:i:m'),
            'updated_at'=>date('Y-m-d H:i:m'),
        ]);
    }
}