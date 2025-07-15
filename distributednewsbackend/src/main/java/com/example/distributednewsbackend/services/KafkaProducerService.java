package com.example.distributednewsbackend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class KafkaProducerService {
    
    private static final Logger logger = LoggerFactory.getLogger(KafkaProducerService.class);
    
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
    
    public void sendMessage(String topic, String message) {
        CompletableFuture<SendResult<String, String>> future = kafkaTemplate.send(topic, message);
        
        future.whenComplete((result, ex) -> {
            if (ex == null) {
                logger.info("Sent message=[{}] with offset=[{}]", 
                    message, result.getRecordMetadata().offset());
            } else {
                logger.error("Unable to send message=[{}] due to: {}", message, ex.getMessage());
            }
        });
    }
    
    public void sendMessage(String topic, String key, String message) {
        CompletableFuture<SendResult<String, String>> future = kafkaTemplate.send(topic, key, message);
        
        future.whenComplete((result, ex) -> {
            if (ex == null) {
                logger.info("Sent message=[{}] with key=[{}] with offset=[{}]", 
                    message, key, result.getRecordMetadata().offset());
            } else {
                logger.error("Unable to send message=[{}] with key=[{}] due to: {}", 
                    message, key, ex.getMessage());
            }
        });
    }
}
