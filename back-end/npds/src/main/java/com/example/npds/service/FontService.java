package com.example.npds.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.npds.repository.FontRepository;
import com.example.npds.repository.UserRepository;
import com.example.npds.entity.Font;
import com.example.npds.entity.User;

@Service
public class FontService {
    private static final int MAX_SIZE = 10 * 1024 * 1024; // 10MB 제한

    @Autowired
    private FontRepository fontRepository;

    @Autowired
    private UserRepository userRepository;

    // userId로 폰트를 검색
    public List<Font> getFontByUserId(String userId) {
        List<Font> fonts = fontRepository.findByUserId(userId);
        if (fonts.isEmpty()) {
            throw new RuntimeException("No fonts found for user ID: " + userId);
        }
        return fonts;
    }

    // 폰트를 저장
    public Font saveFont(Font font) {
        // 폰트 파일 검증
        if (font.getFontFile() == null || font.getFontFile().length == 0) {
            throw new IllegalArgumentException("Font file cannot be null or empty");
        }
        if (font.getFontFile().length > MAX_SIZE) {
            throw new IllegalArgumentException("Font file size exceeds the allowed limit");
        }

        // 사용자 확인
        User user = userRepository.findById(font.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + font.getUserId()));

        // User ID 설정
        font.setUserId(user.getId());

        return fontRepository.save(font);
    }
}