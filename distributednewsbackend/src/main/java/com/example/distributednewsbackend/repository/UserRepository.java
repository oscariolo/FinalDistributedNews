package com.example.distributednewsbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.distributednewsbackend.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
  Optional<User> findByUsername(String username);
}

