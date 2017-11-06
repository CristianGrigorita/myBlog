<?php
require_once "DB.php";

class AccountsModel extends DB {
    function addUser($item) {
        $params = [ $item["first_name"],
                    $item["last_name"],
                    $item["email"],
                    $item["password"]];
        $query = 'INSERT INTO users(first_name, last_name, email, password) VALUES (?,?,?,?)';
        $sth = $this->db->prepare($query);
        $sth->execute($params);
        return $this->db->lastInsertId();
    }
    
    function getUser($item) {
        $params = [ $item['email'],
                    $item['password']];
        $query = 'select * from users where email = ? and password = ?';
        
        $sth = $this -> db ->prepare($query);
        $sth ->execute($params);
        return $sth -> fetch(PDO::FETCH_ASSOC);
    }
}