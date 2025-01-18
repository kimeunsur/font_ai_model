package com.example.npds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.npds.service.FontService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Base64;
import java.util.List;
import com.example.npds.entity.Font;



@RestController
@RequestMapping("/font")
public class FontController {
    @Autowired
    private FontService fontService;

    @GetMapping("/user/{userId}")
    public List<Font> getFontByUserId(@PathVariable Long userId) {
        List<Font> fonts = fontService.getFontByUserId(userId);
        fonts.forEach(font -> {
            if (font.getFontFile() != null) {
                String encodedFile = Base64.getEncoder().encodeToString(font.getFontFile());
                font.setFontFile(encodedFile.getBytes());
            }
        });
        return fonts;
    }

    @PostMapping("post")
    public Font createFont(@RequestBody Font font) {      
        try { 
            if (font.getFontFile() != null) {
                byte[] decoderFile = Base64.getDecoder().decode(font.getFontFile());
                font.setFontFile(decoderFile);
            } 
            return fontService.saveFont(font);
        } catch (Exception e) {
            throw new RuntimeException("error in saving font:"+e.getMessage(), e);
        }
    }
    
    
}
