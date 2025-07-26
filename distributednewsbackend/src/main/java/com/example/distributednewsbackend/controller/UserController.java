package com.example.distributednewsbackend.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.distributednewsbackend.dto.UserDto;
import com.example.distributednewsbackend.model.User;
import com.example.distributednewsbackend.repository.UserRepository;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {
  private final UserRepository userRepository;

  public UserController(UserRepository userRepository){
    this.userRepository = userRepository;
  }

  @GetMapping("/users")
  public Iterable<User> findAllUsers(){
    return this.userRepository.findAll();
  }

  @GetMapping("/users/{id}")
  public Optional<User> findUserById(@PathVariable Long id){
    return this.userRepository.findById(id);
  }

  @GetMapping("/users/username/{username}")
  public Optional<User> findUserByUsername(@PathVariable String username){
    return this.userRepository.findByUsername(username);
  }


  @PostMapping("/users")
  public User addOneUser(@RequestBody User user){
    return this.userRepository.save(user);
  }

  @GetMapping("/users/me")
  public ResponseEntity<UserDto> getCurrentUser (@AuthenticationPrincipal User user) {
      UserDto dto = new UserDto(
        user.getUsername(),
        user.getName(),
        user.getEmail(),
        user.getBirthday()
    );
    return ResponseEntity.ok(dto);
  }
  
}
