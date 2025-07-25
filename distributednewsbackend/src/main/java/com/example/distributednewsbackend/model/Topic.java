package com.example.distributednewsbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="topics", uniqueConstraints = {@UniqueConstraint(columnNames = {"topicName"})})
@AllArgsConstructor
@Setter
@Getter

public class Topic {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)

  private Long id;

  @Column(nullable = false)
  private String topicName;

  public Topic(){
  
  }
}


