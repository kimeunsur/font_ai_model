package com.example.npds.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.npds.entity.User; // Ensure this path is correct

public interface UserRepository extends MongoRepository<User, String>{
    User findByEmail(String email);
}
