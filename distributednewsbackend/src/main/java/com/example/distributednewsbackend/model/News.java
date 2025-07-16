package com.example.distributednewsbackend.model;

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
@Table(name="news")
public class News {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)

  private Long id;

  private String title;
  private String desc;
  private String topic;

  public News(){

  }

  public News(String title, String desc, String topic){
    this.title = title;
    this.desc = desc;
    this.topic = topic;
  }

}
