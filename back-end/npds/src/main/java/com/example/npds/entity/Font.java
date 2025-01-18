package com.example.npds.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Font {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private byte[] fontFile;

    @Column(nullable = false)
    private String fontName;

    @Column(nullable = true, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
