package com.example.distributednewsbackend.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "ollama")
@Getter
@Setter
public class OllamaConfig {
    
    // Base prompt template for news processing
    private String basePrompt = """
        You are an AI assistant specialized in processing and analyzing news content.
        Your task is to process the following input and provide a structured response.
        
        Please analyze the content, identify key themes, and provide insights about:
        - Main topics and themes
        - Sentiment analysis
        - Key entities mentioned
        - Summary of the content
        
        Input to process:
        {input}
        
        Please provide your response in a clear, structured format.
        """;

    @Bean
    public ChatClient chatClient(OllamaChatModel ollamaChatModel) {
        return ChatClient.builder(ollamaChatModel).build();
    }
}
