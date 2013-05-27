<?php

/**
 * Description
 *
 * @since   1.0.0
 * @package StructureWiki
 * @author  Levi Putna <levi.putna@gmail.com>
 */
class SubDomain extends CApplicationComponent {

    private $domain;
    private $site;

    public function init() {
        $parsedUrl = parse_url($_SERVER['HTTP_HOST']);
        $host      = explode('.', $parsedUrl['host']);

        // check the url is not a www.mysite.com or mysite.com site
        if (count($host) > 2 && $host[0] !== 'www') {
            $this->domain = $host[0];
            //$this->site   = Site::findeByDomain($this->domain);
        }
    }

    public function getSubDomain() {
        return $this->domain;
    }

    public function isSubDomain() {
        return ($this->domain)? true : false;
    }

    public function getSite() {
        return $this->site;
    }
}
