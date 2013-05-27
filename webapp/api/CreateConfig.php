<?php

/**
 * Description
 * 
 * @since 1.0.0
 * @package StructureWiki
 * @author Levi Putna <levi.putna@gmail.com>
 */
class CreateConfig {

    public $c = array(
        'client' => array(
            'class' => 'Client',
            'fields' => array('id', 'name', 'client_type_id','email'),
        ),
        'invoice' => array(),
    );
}