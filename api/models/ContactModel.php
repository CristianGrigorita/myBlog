<?php
require_once "DB.php";

class ContactModel extends DB {
    function sendContactInfo($item){
        $params = [ $item["first_name"],
                    $item["last_name"],
                    $item["email"],
                    $item["subject"],
                    $item["message"],
                    ];
        $query = "INSERT INTO contact (first_name, last_name, email, subject, message) VALUES (?, ?, ?, ?, ?)";
        $sth = $this->db->prepare($query);
        $sth->execute($params);
        return $this->db->lastInsertId();
    }
}