<?php
session_start();
require "configs/routes.php";
define ("APP_FOLDER", "/api");
$currentRoute = str_replace(APP_FOLDER, "", $_SERVER["REDIRECT_URL"]);
if (!empty($currentRoute)) {
    if (array_key_exists($currentRoute, $routes)) {
        $class = $routes[$currentRoute]["class"];
        $method = $routes[$currentRoute]["method"];
        
        require "controllers/".$class.".php";
        $controller = new $class();
        $response = $controller->$method();
        
        header("Content-Type: application/json");
        echo json_encode($response);
        
    } else {
        http_response_code(404);
    }
} else {
    http_response_code(403);
    echo "ACCESS FORBIDDEN!";
}