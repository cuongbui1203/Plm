<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductLine extends Model
{
    use HasFactory;

    /**
     * Create Id for ProductLine
     *
     * @param string $idFactory
     * @param string $batch
     * @return string
     */
    public static function createId($idFactory,$batch){
        // if()
        return $idFactory.$batch;
    }

    protected $fillable = [
        'productLineId',
        'name',
        'info',
        'quantity',
        'batch',
        'imgId'
    ];
}