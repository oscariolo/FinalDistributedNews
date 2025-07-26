package com.example.distributednewsbackend.dto;

import lombok.Data;

@Data
public class UserDto {
  private String username;
  private String name;
  private String email;
  private String birthday;

  public UserDto(String username, String name, String email, String birthday) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.birthday = birthday;
  }
  
}
