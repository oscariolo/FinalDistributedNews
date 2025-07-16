package com.example.distributednewsbackend.controller;
import com.example.distributednewsbackend.services.AIProcessorService;
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
    
    @Autowired
    private AIProcessorService aiProcessorService;
    
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

    @PostMapping("/ai-process")
    public ResponseEntity<String> aiProcess(@RequestBody String rawInput) {
        try {
            String processedOutput = aiProcessorService.processInput(rawInput);
            return ResponseEntity.ok(processedOutput);    
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("AI processing failed: " + e.getMessage());
        }
    }

   
}
