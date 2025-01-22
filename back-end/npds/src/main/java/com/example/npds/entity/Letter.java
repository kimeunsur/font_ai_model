package com.example.npds.entity;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.PrePersist;

@Document(collection = "letter") 
@Getter
@Setter
public class Letter {
    @Id
    private String id; 

    private String userId; 

    private byte[] content;

    private LocalDateTime addedAt;

    @PrePersist
    public void onPrePersist() {
        if (this.addedAt == null) {
            this.addedAt = LocalDateTime.now();
        }
    }
}