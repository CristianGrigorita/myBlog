<?php
require_once "DB.php";

class CommentsModel extends DB {
    function selectComments($item){
        $params = [ $item['article_id']
                    ];
        $query = "SELECT comments.*, users.last_name, users.first_name FROM comments INNER JOIN users ON comments.user_id=users.id WHERE comments.article_id = ?";
        $sth = $this->db->prepare($query);
        $sth->execute($params);
        
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }
    
    function addItem($item){
        $params = [$item['title'],
                    $item['comment'],
                    $item['article_id'],
                    $item['user_id'] = $_SESSION['user_id']];
        $query = "INSERT INTO comments (title, comment, article_id, user_id) VALUES (?,?,?,?)";
        $sth = $this->db->prepare($query);
        $sth->execute($params);
        return $this->db->lastInsertId();
    }
}