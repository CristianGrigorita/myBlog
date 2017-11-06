<?php
require "../api/models/AccountsModel.php";
require "../api/helpers/response.php";
require_once "../api/helpers/emailAddressValidator.php";

class Accounts{
    private $accountsModel;
    
    function __construct(){
        $this->accountsModel = new AccountsModel();    
    }
    //ADD PASS CRYPT! AND VALIDATIONS!
    function signUp(){
        if(empty($_POST['first_name']) || empty($_POST['last_name']) || empty($_POST['email']) || empty($_POST['password'])){
            return error_response("Invalid Fields");
        }
        $validator = new EmailAddressValidator;
        if (!$validator->check_email_address($_POST['email'])){
            return error_response("Incorrect email input");
        }
        if (strlen($_POST["password"]) < 6) {
            return error_response("Password to short");
        } else {
            $salt = '123!@#ASD56$$H$J$K<?123>';
            $_POST['password'] = crypt($_POST['password'], $salt);
            return success_response($this->accountsModel->addUser($_POST));
        }
    }
    
    function logIn(){
        if(empty($_POST['email']) || empty($_POST['password'])){
            return error_response("Invalid Fields");
        } else {
            $salt = '123!@#ASD56$$H$J$K<?123>';
            $_POST['password'] = crypt($_POST['password'], $salt);
            
            $user = $this->accountsModel->getUser($_POST);
            if  (!empty($user)) {
                $_SESSION["isLogged"]=TRUE;
                $_SESSION["email"]= $_POST["email"];
                $_SESSION["name"] = $user["last_name"] . " " . $user["first_name"];
                $_SESSION["role"] = $user["role"];
                $_SESSION['user_id'] = $user["id"];
                return success_response($_SESSION);
            } else {
                return error_response("User not found");
            }
        }
    }
    
    function checkRole(){
        if (isset($_SESSION['isLogged'])){
            if ($_SESSION["isLogged"]=TRUE){
            return success_response($_SESSION["role"]);
            }
        } else {
            return success_response("guest");
        }
    }
    
    function logOut(){
        if ($_SESSION["isLogged"]=TRUE){
            $_SESSION["isLogged"]=FALSE;
            session_destroy();
            return success_response("Logged Out");
        }
    }
}