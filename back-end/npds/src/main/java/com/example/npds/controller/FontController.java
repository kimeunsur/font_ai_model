package com.example.npds.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.npds.service.FontService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import com.example.npds.entity.Font;
import com.example.npds.entity.User;
import com.example.npds.entity.FontDto;



@RestController
@RequestMapping("/font")
public class FontController {
    @Autowired
    private FontService fontService;

    public FontController(FontService fontService) {
        this.fontService = fontService;
    }

    @GetMapping("/user/{userId}")
    public List<FontDto> getFontByUserId(@PathVariable String userId) {
        return fontService.getFontByUserId(userId).stream()
            .map(font -> new FontDto(
                font.getId(),
                font.getFontName(),
                font.getFontFile() != null ? Base64.getEncoder().encodeToString(font.getFontFile()) : null,
                //Base64.getEncoder().encodeToString(font.getFontFile()), // Base64 인코딩
                font.getCreatedAt()
            ))
            .collect(Collectors.toList());
    }
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFont(
        @RequestParam("userId") String userId,
        @RequestParam("fontName") String fontName,
        @RequestParam("fontFile") MultipartFile fontFile) {
        try {
            // 파일 데이터를 byte[]로 변환
            byte[] fontData = fontFile.getBytes();

            // Font 객체 생성
            Font font = new Font();
            font.setFontName(fontName);
            font.setFontFile(fontData);

            // User 설정
            User user = new User();
            user.setId(userId);
            font.setUser(user);

            fontService.saveFont(font); // 서비스 계층 호출
            return ResponseEntity.ok("Font uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading font: " + e.getMessage());
        }
    }
    
    
}
