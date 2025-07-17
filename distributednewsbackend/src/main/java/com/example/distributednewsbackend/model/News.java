package com.example.distributednewsbackend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="news")
@AllArgsConstructor
public class News {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)

  private Long id;

  private String title;
  private String desc;
  private String lead; //Lead es como el resumen o gancho de la noticia
  private String author;
  private String topic;
  private Date publishedDate;

  public News(){

  }

  public News(String title, String desc, String topic){
    this.title = title;
    this.desc = desc;
    this.topic = topic;
  }

}
