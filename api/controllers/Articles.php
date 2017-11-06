<?php
require "../api/models/ArticlesModel.php";
require "../api/helpers/response.php";

class Articles{
    private $articlesModel;
    
    function __construct(){
        $this->articlesModel = new ArticlesModel();    
    }
    
    function getAll() {
        return success_response($this->articlesModel->selectAll());
    }
    
    function getArticle(){
        if(empty($_POST['id'])) {
            return error_response("Invalid Fields");
        } else {
            return success_response($this->articlesModel->selectOne($_POST));
        }
    }
    
    function searchArticles(){
        if(empty($_POST["search"])) {
            return error_response("Invalid Fields");
        } else {
            return success_response($this->articlesModel->searchFor($_POST));
        }
    }
    
    function deleteArticle(){
        if (empty($_POST["id"])){
            return error_response("Invalid Fields");
        } else {
            return success_response($this->articlesModel->deleteItem($_POST["id"]));
        }
    }
    
    function createArticle(){
        if(empty($_POST["title"]) || empty($_POST["content"])){
            return error_response("Invalid Fields");
        } else if (empty ($_FILES['image'])) {
            return error_response("Image field empty");
        } else {
            $file = $_FILES['image'];
            if (!exif_imagetype($file["tmp_name"])) {
                return error_response("Not an image!");
            } else {
                move_uploaded_file($file['tmp_name'], '../ui/assets/images/' . $file['name']);
                $_POST['image'] = "ui/assets/images/" . $file['name'];
                return success_response($this->articlesModel->addItem($_POST));
            }
        }
    }
    
    function editArticle() {
        if(empty($_POST['id']) || empty($_POST['title']) || empty($_POST['content'])) {
            return error_response("Invalid Fields");
        } else if (empty ($_FILES['image'])) {
            $_POST['image'] = $_POST['defaultImage'];
            return success_response($this->articlesModel->updateItem($_POST));
        } else {
            $file = $_FILES['image'];
            if (!exif_imagetype($file["tmp_name"])) {
                echo error_response("Not an image!");
            } else {
                move_uploaded_file($file['tmp_name'], '../ui/assets/images/' . $file['name']);
                $_POST['image'] = "/ui/assets/images/" . $file['name'];
                return success_response($this->articlesModel->updateItem($_POST));
            }
        }
    }
}