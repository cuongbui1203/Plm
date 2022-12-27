<?php

namespace Database\Seeders;

use App\Http\Controllers\CreateID\create_id;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class account extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'id'=>create_id::createIdUser(1),
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'workPlateId'=>'1',
            'imageId'=>1,
            'password' => Hash::make('password'),
            'created_at' => today(),
            'roleId' => 1
        ]);
        DB::table('users')->insert([
            'id'=>create_id::createIdUser(2),
            'name' => 'Factory',
            'email' => 'factory@gmail.com',
            'workPlateId'=>'2',
            'imageId'=>1,
            'password' => Hash::make('password'),
            'created_at' => today(),
            'roleId' => 2
        ]);
        DB::table('users')->insert([
            'id'=>create_id::createIdUser(3),
            'name' => 'Shop',
            'email' => 'shop@gmail.com',
            'workPlateId'=>'3',
            'imageId'=>1,
            'password' => Hash::make('password'),
            'created_at' => today(),
            'roleId' => 3
        ]);
        DB::table('users')->insert([
            'id'=>create_id::createIdUser(4),
            'name' => 'TTBH',
            'email' => 'ttbh@gmail.com',
            'workPlateId'=>'4',
            'imageId'=>1,
            'password' => Hash::make('password'),
            'created_at' => today(),
            'roleId' => 4
        ]);
        
    }
}