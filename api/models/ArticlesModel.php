<?php
require_once "DB.php";

class ArticlesModel extends DB {
    function selectAll() { 
        $query = 'SELECT articles.*, users.last_name, users.first_name  FROM articles INNER JOIN users ON articles.user_id=users.id';
        return  $result = $this->executeQuery($query);
    }
    
    function selectOne($item){
        $params = [ $item['id'],
                    ];
        $query = "SELECT articles.*, users.last_name, users.first_name FROM articles INNER JOIN users ON articles.user_id=users.id where articles.id = ?";
        $sth = $this->db->prepare($query);
        $sth->execute($params);
        
        return $result = $sth->fetch(PDO::FETCH_ASSOC);
    }
    
    function searchFor($item){
        $params = [$item['search']];
        $query = "SELECT * FROM articles INNER JOIN users ON articles.user_id=users.id WHERE title LIKE '%" . $item['search']. "%'";
        $sth = $this->db->prepare($query);
        $sth->execute();
        
        return  $result = $sth->fetchAll(PDO::FETCH_ASSOC);
    }
    
    function deleteItem($id){
        $params = [$id];
        $query = "UPDATE articles SET published = 0 where id = ? ";
        $sth = $this -> db -> prepare($query);
        $sth->execute($params);
        
        return $sth->rowCount();
    }
    
     function addItem($item) {
        $params = [ $item["title"],
                    $item["content"],
                    $item["published"],
                    $item["image"],
                    $item["user_id"] = $_SESSION["user_id"]];
        $query = 'INSERT INTO `articles`(`title`, `content`, `published`, `image`, user_id) VALUES (?,?,?,?,?)';
        $sth = $this->db->prepare($query);
        $sth->execute($params);
        return $this->db->lastInsertId();
    }
    
    function updateProfile($item){
        $params = [ $item['title'],
                    $item['content'],
                    $item['image'],
                    $item['user_id'] = $_SESSION['user_id'],
                    $item['id']];
        $query = "UPDATE articles SET title = ?, content = ?, image = ?, user_id = ? WHERE id = ?";
        $sth = $this -> db -> prepare($query);
        $sth->execute($params);
        
        return $sth->rowCount();
    }
    
    function updateItem($item){
        $params = [ $item['content'],
                    $item['title'],
                    $item['user_id'] = $_SESSION['user_id'],
                    $item['image'],
                    $item['id']];
        $query = "UPDATE articles SET content = ?, title = ?, user_id = ?, image = ? where id = ? ";
        $sth = $this -> db -> prepare($query);
        $sth->execute($params);
        
        return $sth->rowCount();
    }
}