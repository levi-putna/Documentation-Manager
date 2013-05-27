<?php


class Currency {

    public static function format($value, $decimal = 2){
        return number_format($value, $decimal, '.', ',');
    }

}