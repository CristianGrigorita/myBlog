<?php

$routes['/articles'] = ["class" => "Articles", "method" => "getAll"];
$routes['/articles/one'] = ["class" => "Articles", "method" => "getArticle"];
$routes['/articles/search'] = ["class" => "Articles", "method" => "searchArticles"];
$routes['/articles/delete'] = ["class" => "Articles", "method" => "deleteArticle"];
$routes['/articles/create'] = ["class" => "Articles", "method" => "createArticle"];
$routes['/articles/edit'] = ["class" => "Articles", "method" => "editArticle"];
$routes['/comments'] = ["class" => "Comments", "method" => "getComments"];
$routes['/comments/add'] = ["class" => "Comments", "method" => "addComments"];
$routes['/accounts/signUp'] = ["class" => "Accounts", "method" => "signUp"];
$routes['/accounts/logIn'] = ["class" => "Accounts", "method" => "logIn"];
$routes['/accounts/logOut'] = ["class" => "Accounts", "method" => "logOut"];
$routes['/contact'] = ["class" => "Contact", "method" => "sendInfo"];
$routes['/accounts/role'] = ["class" => "Accounts", "method" => "checkRole"];


$routes['/articles/art'] = ["class" => "Accounts", "method" => "displayArt"];