package com.example.distributednewsbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.distributednewsbackend.model.User;

public interface UserRepository extends JpaRepository<User, Long>{}

