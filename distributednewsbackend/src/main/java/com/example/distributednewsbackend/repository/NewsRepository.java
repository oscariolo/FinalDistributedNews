package com.example.distributednewsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.distributednewsbackend.model.News;

public interface NewsRepository extends JpaRepository<News, Long> {}
