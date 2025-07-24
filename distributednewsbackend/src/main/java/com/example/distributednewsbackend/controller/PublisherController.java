package com.example.distributednewsbackend.controller;
import com.example.distributednewsbackend.model.News;
import com.example.distributednewsbackend.repository.NewsRepository;
import com.example.distributednewsbackend.services.AIProcessorService;
import com.example.distributednewsbackend.services.KafkaProducerService;

import java.util.Date;

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

    @Autowired
    private NewsRepository newsRepository;

    
    @PostMapping("/publish")
    public ResponseEntity<String> publishNews(@RequestBody News news) {
        try {
            // Guardar en la base de datos
            news.setPublishedDate(new Date());
            newsRepository.save(news);

            // Mandar a kafka
            String message = String.format("""
            {
                "title": "%s",
                "desc": "%s",
                "lead": "%s",
                "author": "%s",
                "topic": "%s",
                "publishedDate": "%s"
            }
            """, news.getTitle(), news.getDescription(), news.getLead(), news.getAuthor(), news.getTopic(), news.getPublishedDate());

             kafkaProducerService.sendMessage(news.getTopic(), message);
            logger.info("News published and sent to Kafka topic: {}", news.getTopic());
            return ResponseEntity.ok("News saved and sent to topic: " + news.getTopic());
        } catch (Exception e) {
            logger.error("Error publishing news: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Failed to publish news: " + e.getMessage());
        }
    }

    @GetMapping("/publish")
    public Iterable<News> findAllNews(){
        return this.newsRepository.findAll();
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
