<?php
class DB{
    protected $db;
    
    function __construct(){
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "blog";
        
        try {
            $this->db = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
            $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch(PDOException $e) {
            die ('Unable to connect');
        }
    }
    
    function executeQuery($query, $onlyOne = false){
        $sth = $this->db->prepare($query);
        $sth->execute();
    
        if ($onlyOne) {
            return $sth->fetch(PDO::FETCH_ASSOC);
        }
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }
}