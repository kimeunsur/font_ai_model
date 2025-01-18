package com.example.npds.entity;

import java.time.LocalDateTime;

public class FontDto {
    private Long id;
    private String fontName;
    private String fontFile; // Base64로 인코딩된 폰트 파일
    private LocalDateTime createdAt;

    public FontDto(Long id, String fontName, String fontFile, LocalDateTime createdAt) {
        this.id = id;
        this.fontName = fontName;
        this.fontFile = fontFile;
        this.createdAt = createdAt;
    }

    // Getter와 Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFontName() {
        return fontName;
    }

    public void setFontName(String fontName) {
        this.fontName = fontName;
    }

    public String getFontFile() {
        return fontFile;
    }

    public void setFontFile(String fontFile) {
        this.fontFile = fontFile;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}