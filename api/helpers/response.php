<?php
    function success_response($response) {
        return [
            "ok"   => true,
            "data" => $response
        ];
    }
    
     function error_response($response) {
        return [
            "ok"   => false,
            "error" => $response
        ];
    }