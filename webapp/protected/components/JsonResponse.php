<?php

/**
 * Description
 * 
 * @since 1.0.0
 * @package StructureWiki
 * @author Levi Putna <levi.putna@gmail.com>
 */
class JsonResponse {
    public $status;
    public $success;
    public $message = "";
    public $total;
    public $data = array();

    public function toJSON(){
        json_encode(get_object_vars($this));
    }
}
