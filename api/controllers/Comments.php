<?php
require "../api/models/CommentsModel.php";
require "../api/helpers/response.php";

class Comments{
    private $commentsModel;
    
    function __construct(){
        $this->commentsModel = new CommentsModel();    
    }
    
    function getComments() {
        if(empty($_POST['article_id'])) {
            return error_response("Invalid Fields");
        } else {
            return success_response($this->commentsModel->selectComments($_POST));
        }
    }
    
    function addComments(){
        if (empty($_POST['article_id']) || empty($_POST['title']) || empty($_POST['comment'])){
            return error_response("Invalid Fields");
        } else {
            return success_response($this->commentsModel->addItem($_POST));
        }
    }
}