package com.example.npds.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.npds.entity.User;

public interface UserRepository extends MongoRepository<User, String>{
    User findByEmail(String email);
}
