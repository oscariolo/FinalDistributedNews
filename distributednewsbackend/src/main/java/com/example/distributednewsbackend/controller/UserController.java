package com.example.distributednewsbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.distributednewsbackend.model.User;
import com.example.distributednewsbackend.repository.UserRepository;


@RestController
public class UserController {
  private final UserRepository userRepository;

  public UserController(UserRepository userRepository){
    this.userRepository = userRepository;
  }

  @GetMapping("/users")
  public Iterable<User> findAllUsers(){
    return this.userRepository.findAll();
  }

  @PostMapping("/users")
  public User addOneUser(@RequestBody User user){
    return this.userRepository.save(user);
  }
}
