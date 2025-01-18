package com.example.npds.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.npds.entity.User; // Ensure this path is correct

public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email);
}
