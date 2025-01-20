package com.example.npds.dto;

import java.time.LocalDateTime;

public class FontDto {
    private String id; // MongoDB의 ID는 String으로 사용
    private String fontName;
    private String fontFile; // Base64로 인코딩된 폰트 파일
    private LocalDateTime createdAt;

    public FontDto(String id, String fontName, String fontFile, LocalDateTime createdAt) {
        this.id = id;
        this.fontName = fontName;
        this.fontFile = fontFile;
        this.createdAt = createdAt;
    }

    // Getter와 Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
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