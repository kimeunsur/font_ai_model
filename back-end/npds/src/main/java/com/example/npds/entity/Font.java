package com.example.npds.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "font")
@Getter
@Setter
public class Font {
    @Id
    private String id; // MongoDB의 ID는 String 타입(ObjectId)으로 매핑됩니다.

    private String userId; // 관계형 데이터 대신 사용자 ID를 문자열로 저장

    private byte[] fontFile;

    private String fontName;

    private LocalDateTime createdAt = LocalDateTime.now();
    private User user; // Add this field

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}

