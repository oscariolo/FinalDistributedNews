package com.example.distributednewsbackend.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;


@SpringBootApplication
@RestController
public class testcontroller {

    @RequestMapping("/")
    public String home() {
        return "Test service is running!";
    }

}
