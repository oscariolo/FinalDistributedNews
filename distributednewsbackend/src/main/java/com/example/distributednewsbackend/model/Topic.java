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
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="topics", uniqueConstraints = {@UniqueConstraint(columnNames = {"topicName"})})
@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor

public class Topic {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)

  private Long id;

  @Column(nullable = false)
  private String topicName;

  // Constructor que acepta solo topicName (para cuando la DB genera el ID)
  public Topic(String topicName) {
      this.topicName = topicName;
  }
}


