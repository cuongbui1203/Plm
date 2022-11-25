<?php
namespace App;
class Base{
    public static function CreateId(int $num){
        $res = "";
        $res = ""+$num;
        return $res;
    }
}
