package com.example.distributednewsbackend.controller;

import com.example.distributednewsbackend.services.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class PublisherController {
    
    @Autowired
    private KafkaProducerService kafkaProducerService;
    
    @PostMapping("/publish")
    public ResponseEntity<String> publishNews(@RequestParam String topic, 
                                            @RequestBody String message) {
        try {
            kafkaProducerService.sendMessage(topic, message);
            return ResponseEntity.ok("Message sent successfully to topic: " + topic);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send message: " + e.getMessage());
        }
    }
    
    @PostMapping("/publish/{topic}")
    public ResponseEntity<String> publishNewsToTopic(@PathVariable String topic, 
                                                    @RequestBody String message) {
        try {
            kafkaProducerService.sendMessage(topic, message);
            return ResponseEntity.ok("Message sent successfully to topic: " + topic);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send message: " + e.getMessage());
        }
    }
    
    @PostMapping("/publish/{topic}/{key}")
    public ResponseEntity<String> publishNewsWithKey(@PathVariable String topic,
                                                    @PathVariable String key,
                                                    @RequestBody String message) {
        try {
            kafkaProducerService.sendMessage(topic, key, message);
            return ResponseEntity.ok("Message sent successfully to topic: " + topic + " with key: " + key);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send message: " + e.getMessage());
        }
    }
}
