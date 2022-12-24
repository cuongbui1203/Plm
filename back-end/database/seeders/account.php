<?php

namespace Database\Seeders;

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
            'id'=>"teeeet",
            'name' => 'test',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'created_at' => today(),
            'roleId' => 1
        ]);
        
    }
}