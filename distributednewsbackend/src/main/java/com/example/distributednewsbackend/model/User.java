package com.example.distributednewsbackend.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
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

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public java.util.List<String> getSubs() {
    return subs;
  }

  public void setSubs(java.util.List<String> subs) {
    this.subs = subs;
  }

}
