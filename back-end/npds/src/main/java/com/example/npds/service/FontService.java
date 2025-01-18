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
    private static final int MAX_SIZE = 10*1024*1024;
    @Autowired
    private FontRepository fontRepository;
    @Autowired
    private UserRepository userRepository;

    //@Transactional
    public List<Font> getFontByUserId(Long userId) {
        List<Font> fonts = fontRepository.findByUserId(userId);
        if (fonts.isEmpty()) {
            throw new RuntimeException("No fonts found for user ID: " + userId);
        }
        // User 필드 초기화 (Lazy 로딩 방지)
        fonts.forEach(font -> {
            if (font.getUser() != null) {
                font.getUser().getId(); // 강제 초기화
            }
        });
        return fonts;
    }


    
    public Font saveFont(Font font) {
        if (font.getFontFile() == null || font.getFontFile().length == 0) {
            throw new IllegalArgumentException("font cannot be null or empty");
        }
        if (font.getFontFile().length > MAX_SIZE) {
            throw new IllegalArgumentException("font file size exceeds the allowed limit");
        }
        User user = userRepository.findById(font.getUser().getId())
                        .orElseThrow(() -> new RuntimeException("user not found"));
        font.setUser(user);
        if (font.getFontFile() == null || font.getFontFile().length == 0) {
            throw new IllegalArgumentException("Font file cannot be empty");
        }
        if (font.getFontFile().length > 5 * 1024 * 1024) { // 5MB 제한
            throw new IllegalArgumentException("Font file size exceeds the allowed limit");
        }
        return fontRepository.save(font);
    }
}
