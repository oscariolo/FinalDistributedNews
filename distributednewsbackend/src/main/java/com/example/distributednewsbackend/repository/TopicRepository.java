package com.example.distributednewsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.distributednewsbackend.model.Topic;

public interface TopicRepository extends JpaRepository<Topic, Long>{}