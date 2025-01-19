package com.example.npds.entity;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "letter") // MongoDB 컬렉션 이름 지정
@Getter
@Setter
public class Letter {
    @Id
    private String id; // MongoDB의 ID는 String 타입 사용 (ObjectId 매핑)

    private String userId; // User 엔티티 참조 대신 userId 문자열로 저장

    private String content;

    private LocalDateTime addedAt = LocalDateTime.now();
}