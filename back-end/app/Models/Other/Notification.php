<?php

namespace App\Models\Other;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $fillable = [
        'idSender',
        'idReceiver',
        'sender',
        'receiver',
        'data',
        'accepted',
        'updated_at',
        'created_at',
        'addId'
    ];


}