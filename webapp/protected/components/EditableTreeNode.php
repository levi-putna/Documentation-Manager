<?php


interface EditableTreeNode extends TreeNode{

    public function isEnabled();

    public function canEnabled();

    public function isEditable();
}