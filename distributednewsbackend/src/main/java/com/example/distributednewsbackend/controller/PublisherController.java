package com.example.distributednewsbackend.controller;
import com.example.distributednewsbackend.services.AIProcessorService;
import com.example.distributednewsbackend.services.KafkaProducerService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class PublisherController {

    private static final Logger logger = LoggerFactory.getLogger(PublisherController.class);
    
    @Autowired
    private KafkaProducerService kafkaProducerService;
    
    @Autowired
    private AIProcessorService aiProcessorService;


    
    @PostMapping("/publish")
    public ResponseEntity<String> publishNews(@RequestParam String topic, 
                                            @RequestBody String message) {
        try {
            kafkaProducerService.sendMessage(topic, message);
            logger.info("Message sent to topic: {}", topic);
            return ResponseEntity.ok("Message sent successfully to topic: " + topic);
        } catch (Exception e) {
            logger.error("Failed to send message to topic: {}. Error: {}", topic, e.getMessage());
            return ResponseEntity.badRequest().body("Failed to send message: " + e.getMessage());
        }
    }

    @PostMapping("/ai-process")
    public ResponseEntity<String> aiProcess(@RequestBody String rawInput) {
        try {
            String processedOutput = aiProcessorService.processInput(rawInput);
            logger.info("AI processing completed successfully with prompt: {}", processedOutput);
            return ResponseEntity.ok(processedOutput);    
        } catch (Exception e) {
            logger.error("AI processing failed: {}", e.getMessage());
            return ResponseEntity.internalServerError().body("AI processing failed: " + e.getMessage());
        }
    }

   
}
