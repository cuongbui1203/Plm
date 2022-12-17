<?php

namespace App\Models\WorkPlate;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * Thực thể ban điều hành
 */
class ExecutiveBoard extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'name',
        'address'
    ];
}