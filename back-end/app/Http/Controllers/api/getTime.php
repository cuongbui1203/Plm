<?php

namespace app\Http\Controllers\Api;

use Carbon\Carbon;

class getTime {
    public static function getTime() {
        return Carbon::now()->timezone('Asia/Phnom_Penh')->format('Y-m-d H:i:s');
    }
}