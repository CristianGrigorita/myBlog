<?php
require "../api/models/ContactModel.php";
require "../api/helpers/response.php";
require_once "../api/helpers/emailAddressValidator.php";


class Contact{
    private $contactModel;
    
    function __construct(){
        $this->contactModel = new ContactModel();    
    }
    
    function sendInfo() {
        if(empty($_POST['first_name']) || empty($_POST['last_name']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])){
            return error_response("Invalid Fields");
        }
        $validator = new EmailAddressValidator;
        if (!$validator->check_email_address($_POST['email'])){
            return error_response("Incorrect email input");
        } else {
            return success_response($this->contactModel->sendContactInfo($_POST));
        }
    }
}