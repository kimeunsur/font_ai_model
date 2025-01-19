package com.example.npds.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.npds.entity.Font;

public interface FontRepository extends MongoRepository<Font, String>{
    List<Font> findByUserId(String userId);
}
