<?php

namespace App\Models\WorkPlate;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * Thực thể Nhà máy
 */
class Factory extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'name',
        'address'
    ];

    
}