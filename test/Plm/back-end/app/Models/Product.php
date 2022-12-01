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
        $id = $id.DB::table('productLines')->where('productLineId','=',$idProductLine)->get('batch')[0]->batch;
        // if(ctype_xdigit($num)) return null;
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
