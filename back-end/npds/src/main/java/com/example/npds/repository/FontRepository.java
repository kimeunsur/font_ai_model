package com.example.npds.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.npds.entity.Font;

public interface FontRepository extends JpaRepository<Font, Long>{
    List<Font> findByUserId(Long userId);
}
