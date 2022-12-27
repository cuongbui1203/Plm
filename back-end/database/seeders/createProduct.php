<?php

namespace Database\Seeders;

use App\Http\Controllers\CreateID\create_id;
use App\Models\Product\Product;
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

        for ($i = 0; $i < 10; $i++) {
            //`
            $product = new Product();
            
            $product['productId'] = create_id::createIdProduct();
            $product['idProductLine'] = 'test0';
            $product['name'] = "name";
            $product['idStatus'] = 1;
            $product['history'] = "";
            $product['created_at'] = date('Y-m-d H:i:s');
            $product['updated_at']= date('Y-m-d H:i:s');
            $product->save();
        }
    }
}