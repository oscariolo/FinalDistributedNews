package com.example.distributednewsbackend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.distributednewsbackend.model.Topic;
import com.example.distributednewsbackend.repository.TopicRepository;

@SpringBootApplication
public class DistributednewsbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(DistributednewsbackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initTopics(TopicRepository topicRepository) {
		return args -> {
			if (topicRepository.count() == 0) {
				topicRepository.save(new Topic("Fútbol"));
				topicRepository.save(new Topic("Tecnología"));
			}
		};
	}

}
