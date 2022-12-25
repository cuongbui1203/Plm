<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkPlates extends Model
{
    use HasFactory;
    protected $table = "work_plates";
    protected $fillable = [
        'id',
        'roleId',
        'name',
        'address',
        'updated_at',
        'created_at'
    ];
}
