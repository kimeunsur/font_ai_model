package com.example.npds.repository;

import com.example.npds.entity.Letter;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LetterRepository extends MongoRepository<Letter, String>{
    List<Letter> findByUserId(String userId);
}
