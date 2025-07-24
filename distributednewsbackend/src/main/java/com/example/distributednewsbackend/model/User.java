package com.example.distributednewsbackend.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String username;
  private String password;

  @ElementCollection
  private java.util.List<String> subs;

  public User(){

  }

  public User(String name, String username, String password, java.util.List<String> subs) {
      this.name = name;
      this.username = username;
      this.password = password;
      this.subs = subs;
  }
}
