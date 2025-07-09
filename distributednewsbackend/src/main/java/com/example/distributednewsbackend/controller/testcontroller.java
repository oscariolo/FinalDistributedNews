package com.example.distributednewsbackend.controller;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@SpringBootApplication
@RestController
public class testcontroller {

    @RequestMapping("/")
    public String home() {
        return "Test service is running!";
    }

}
