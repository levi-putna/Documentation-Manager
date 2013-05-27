<?php


interface TreeNode {

    public function hasChildren();

    public function isLeaf();

    public function getIcon();

    public function getDisplayName();

    public function getChildren();

    public function setIndex($index);

    public function getIndex();

    public function setParent($parent_type, $parent_id);

}