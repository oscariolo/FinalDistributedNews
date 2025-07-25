package com.example.distributednewsbackend.auth;

import com.example.distributednewsbackend.model.Topic;

import jakarta.persistence.ElementCollection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter

public class RegisterRequest {
  private String name;
  private String username;
  private String email;
  private String birthday;
  private String password;

  @ElementCollection
  private java.util.Set<Topic> subs;
  
}
