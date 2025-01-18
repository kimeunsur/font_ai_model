package com.example.npds.repository;

import com.example.npds.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LetterRepository extends JpaRepository<Letter, Long>{
    List<Letter> findByUserId(Long userId);
}
