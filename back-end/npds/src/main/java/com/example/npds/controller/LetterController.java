package com.example.npds.controller;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.npds.service.LetterService;
import com.example.npds.util.JwtUtil;
import com.example.npds.entity.Letter;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/letter")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // React 개발 서버 URL
public class LetterController {
    @Autowired
    private LetterService letterService;
    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/upload")
    public ResponseEntity<String> createLetter(
        @RequestParam("file") MultipartFile file,
        @RequestHeader("Authorization") String authorizationHeader
    ) throws IOException {
        String token = authorizationHeader.startsWith("Bearer ")
            ? authorizationHeader.substring(7)
            : authorizationHeader;
    
        String userId = jwtUtil.extractUserId(token);
    
        // 파일 MIME 타입 검증 추가
        String contentType = file.getContentType();
        if (contentType == null || (!contentType.startsWith("image/") && !contentType.equals("application/octet-stream"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unsupported file type");
        }
    
        // 파일 데이터 검증 및 변환
        byte[] fileBytes = file.getBytes();
        if (fileBytes == null || fileBytes.length == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty or invalid");
        }
    
        // Letter 객체 저장
        Letter letter = new Letter();
        letter.setUserId(userId);
        letter.setContent(fileBytes); // 바이너리 데이터로 저장
        letter.setAddedAt(LocalDateTime.now());
        letterService.saveLetter(letter);
    
        return ResponseEntity.ok("File uploaded successfully");
    }
    
    @GetMapping("/user")
    public ResponseEntity<List<Map<String, Object>>> getLetterByUserId(
        @RequestHeader("Authorization") String authorizationHeader
    ) {
        String token = authorizationHeader.startsWith("Bearer ")
            ? authorizationHeader.substring(7)
            : authorizationHeader;
    
        String userId = jwtUtil.extractUserId(token);
        List<Letter> letters = letterService.getLetterByUserId(userId);
    
        if (letters.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    
        List<Map<String, Object>> result = letters.stream().map(letter -> {
            Map<String, Object> letterMap = new HashMap<>();
            letterMap.put("id", letter.getId());
            letterMap.put("addedAt", letter.getAddedAt());
    
            // Base64로 변환 시 예외 처리 추가
            try {
                String encodedContent = Base64.getEncoder().encodeToString(letter.getContent());
                letterMap.put("content", encodedContent);
            } catch (Exception e) {
                letterMap.put("content", "Error: Invalid content data");
            }
    
            return letterMap;
        }).collect(Collectors.toList());
    
        return ResponseEntity.ok(result);
    }

}
