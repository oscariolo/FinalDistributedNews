package com.example.distributednewsbackend.services;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.distributednewsbackend.config.OllamaConfig;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AIProcessorService {
    
    @Autowired
    private ChatClient chatClient;
    
    @Autowired
    private OllamaConfig ollamaConfig;
    
    /**
     * Process raw input data using Ollama AI model
     * @param rawInput The raw input data to be processed
     * @return Processed output from the AI model
     */
    public String processInput(String rawInput) {
        try {
            log.info("Processing input with AI model");

            String formattedInput = ollamaConfig.getBasePrompt().replace("{input}", rawInput);
            String response = chatClient.prompt()
                    .user(formattedInput)
                    .call()
                    .content();
            log.info("AI processing completed successfully");
            return response;
        } catch (Exception e) {
            log.error("AI processing failed: {}", e.getMessage(), e);
            throw new RuntimeException("AI processing failed", e);
        }
    }
        
}
