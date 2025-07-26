package com.example.distributednewsbackend.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.distributednewsbackend.dto.UserDto;
import com.example.distributednewsbackend.model.Topic;
import com.example.distributednewsbackend.model.User;
import com.example.distributednewsbackend.repository.TopicRepository;
import com.example.distributednewsbackend.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {
  private final UserRepository userRepository;
  private final TopicRepository topicRepository; // <-- aquí lo agregas

  public UserController(UserRepository userRepository, TopicRepository topicRepository) {
    this.userRepository = userRepository;
    this.topicRepository = topicRepository;
  }

  @GetMapping("/users")
  public Iterable<User> findAllUsers() {
    return this.userRepository.findAll();
  }

  @GetMapping("/users/{id}")
  public Optional<User> findUserById(@PathVariable Long id) {
    return this.userRepository.findById(id);
  }

  @GetMapping("/users/username/{username}")
  public Optional<User> findUserByUsername(@PathVariable String username) {
    return this.userRepository.findByUsername(username);
  }

  @PostMapping("/users")
  public User addOneUser(@RequestBody User user) {
    return this.userRepository.save(user);
  }

  @GetMapping("/users/me")
  public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal User user) {
    UserDto dto = new UserDto(
        user.getUsername(),
        user.getName(),
        user.getEmail(),
        user.getBirthday());
    return ResponseEntity.ok(dto);
  }

  @PostMapping("/users/topic/{topicId}")
  @Transactional
  public ResponseEntity<?> subscribeToTopic(
      @AuthenticationPrincipal User principalUser,
      @PathVariable Long topicId) {

    User user = userRepository.findById(principalUser.getId()).orElseThrow();

    Optional<Topic> topicOpt = topicRepository.findById(topicId);
    if (topicOpt.isEmpty()) {
      return ResponseEntity.badRequest().body("Tópico no encontrado");
    }

    Topic topic = topicOpt.get();

    if (user.getSubs().contains(topic)) {
      return ResponseEntity.badRequest().body("Ya estás suscrito a este tópico");
    }

    user.getSubs().add(topic);
    userRepository.save(user);

    return ResponseEntity.ok("Suscripción agregada correctamente");
  }

  @DeleteMapping("/users/topic/{topicId}")
  @Transactional
  public ResponseEntity<?> unsubscribeFromTopic(
      @AuthenticationPrincipal User principalUser,
      @PathVariable Long topicId) {

    // Carga el usuario con contexto de persistencia activo
    User user = userRepository.findById(principalUser.getId()).orElseThrow();

    Optional<Topic> optionalTopic = topicRepository.findById(topicId);
    if (optionalTopic.isEmpty()) {
      return ResponseEntity.notFound().build();
    }

    Topic topic = optionalTopic.get();

    if (!user.getSubs().contains(topic)) {
      return ResponseEntity.badRequest().body("No estás suscrito a este tópico.");
    }

    user.getSubs().remove(topic);
    userRepository.save(user);

    return ResponseEntity.ok("Te has desuscrito del tópico");
  }

}
