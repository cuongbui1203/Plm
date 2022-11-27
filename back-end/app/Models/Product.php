<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    use HasFactory,Notifiable;

    public static function createId(string $idProductLine,string $num ){
        $id = $idProductLine;
        $id = $id.(string)DB::table('productLine')->where('productLineId','=',$idProductLine)->get('batch');
        $id = $id.$num;
        return $id;
    }

    protected $fillable = [
        'productId',
        'productLineId',
        'name',
        'idStatus',
        'history',
    ];


}