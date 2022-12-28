<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductLine extends Model
{
    use HasFactory;

    protected $table = 'productlines';
    protected $fillable = [
        'productLineId',
        'name',
        'info',
        'quantity',
        'imgId'
    ];
}