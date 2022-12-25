<?php
namespace App\Http\Controllers\CreateID;

class create_id {
    public  function createIdUser(String $rule) {
        $id = $rule;
        for($i = 0 ; $i < 11; $i++) {
            $id = $id . dechex(rand(0, 15));
            if (($i % 3) == 1 && ($i < 10)) $id = $id . '-';
        }

        return $id;
    } // createIdUser()

    public static function createIdProduct() {
        $id = '';
        for($i = 0 ; $i < 15; $i++) {
            $id = $id . dechex(rand(0, 15));
            if (($i % 3) == 2 && ($i < 11)) $id = $id . '-';
        }
        return $id;
    } //createIdProduct()

    public static function workPlateId() {
        $id = '';
        for($i = 0 ; $i < 12; $i++) {
            $id = $id . dechex(rand(0, 15));
            if (($i % 3) == 2 && ($i < 11)) $id = $id . '-';
        }

        return $id;
    } // workPlateId()
} // create_id
