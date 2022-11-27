<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductLine extends Model
{
    use HasFactory;

    public static function createId($idFactory,$batch,$num){
        return $idFactory.$batch.$num;
    }

    protected $fillable = [
        'productLineId',
        'name',
        'info',
        'quantity',
        'batch',
    ];
}