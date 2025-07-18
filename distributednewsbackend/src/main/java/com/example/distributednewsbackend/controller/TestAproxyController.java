package com.example.distributednewsbackend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestAproxyController {
    //Clase para probar que el balanceo de haproxy funciona correctamente
    @Value("${server.instance}")
    private String serverInstance;

    @Value("${server.port}")
    private String serverPort;

    @GetMapping("/test")
    public String test() {
        return "Test successful! from " + serverInstance + " at port " + serverPort;
    }
    
}
