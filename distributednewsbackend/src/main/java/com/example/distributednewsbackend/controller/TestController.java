package com.example.distributednewsbackend.controller;

import com.example.distributednewsbackend.services.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {
    
    @Autowired
    private KafkaProducerService kafkaProducerService;
    
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("service", "distributednews-backend");
        status.put("status", "running");
        status.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        status.put("kafka_enabled", true);
        return ResponseEntity.ok(status);
    }
    
    @PostMapping("/generate-news/{topic}")
    public ResponseEntity<String> generateTestNews(@PathVariable String topic,
                                                  @RequestParam(defaultValue = "5") int count) {
        try {
            for (int i = 1; i <= count; i++) {
                String testNews = String.format(
                    "{\"title\": \"Test News #%d\", \"content\": \"This is test news content generated at %s\", \"category\": \"%s\", \"timestamp\": \"%s\"}",
                    i,
                    LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                    topic.replace("news-", ""),
                    LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
                );
                
                kafkaProducerService.sendMessage(topic, "test-" + i, testNews);
                
                // Small delay between messages
                Thread.sleep(500);
            }
            
            return ResponseEntity.ok(String.format("Generated %d test news messages for topic: %s", count, topic));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to generate test news: " + e.getMessage());
        }
    }
    
    @PostMapping("/single-news/{topic}")
    public ResponseEntity<String> sendSingleTestNews(@PathVariable String topic) {
        try {
            String testNews = String.format(
                "{\"title\": \"Breaking: Single Test News\", \"content\": \"This is a single test news message sent at %s\", \"category\": \"%s\", \"timestamp\": \"%s\"}",
                LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                topic.replace("news-", ""),
                LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
            );
            
            kafkaProducerService.sendMessage(topic, "single-test", testNews);
            return ResponseEntity.ok("Single test news sent to topic: " + topic);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send test news: " + e.getMessage());
        }
    }
    
    @GetMapping("/topics")
    public ResponseEntity<String[]> getAvailableTopics() {
        String[] topics = {
            "news-general",
            "news-tech", 
            "news-sports",
            "news-politics"
        };
        return ResponseEntity.ok(topics);
    }
}
