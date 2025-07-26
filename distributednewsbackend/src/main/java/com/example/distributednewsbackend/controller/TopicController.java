package com.example.distributednewsbackend.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.distributednewsbackend.model.Topic;
import com.example.distributednewsbackend.repository.TopicRepository;




@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class TopicController {
  private final TopicRepository topicRepository;

  public TopicController(TopicRepository topicRepository){
    this.topicRepository = topicRepository;
  }

  @GetMapping("/topics")
  public Iterable<Topic> findAllTopics(){
    return this.topicRepository.findAll();
  }

  @GetMapping("/topics/{id}")
  public Optional<Topic> findTopicById (@PathVariable Long id) {
      return this.topicRepository.findById(id);
  }
  
  @PostMapping("/topics")
  public Topic addOneTopic(@RequestBody Topic topic){
    return this.topicRepository.save(topic);
  }
}
