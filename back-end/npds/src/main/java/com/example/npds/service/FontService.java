package com.example.npds.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.npds.repository.FontRepository;
import com.example.npds.entity.Font;

@Service
public class FontService {
    private static final int MAX_SIZE = 10*1024*1024;
    @Autowired
    private FontRepository fontRepository;

    public List<Font> getFontByUserId(Long userId) {
        return fontRepository.findByUserId(userId);
    }

    public Font saveFont(Font font) {
        if (font.getFontFile() == null || font.getFontFile().length == 0) {
            throw new IllegalArgumentException("font cannot be null or empty");
        }
        if (font.getFontFile().length > MAX_SIZE) {
            throw new IllegalArgumentException("font file size exceeds the allowed limit");
        }
        return fontRepository.save(font);
    }
}
