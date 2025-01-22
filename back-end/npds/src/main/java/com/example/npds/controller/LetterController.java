package com.example.npds.controller;

import java.util.List;

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

    @GetMapping("/user")
    public ResponseEntity<List<Letter>> getLetterByUserId(
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
        return ResponseEntity.ok(letters);
    }
    
    @PostMapping("/upload")
    public ResponseEntity<String> createLetter(
        @RequestParam("file") MultipartFile file,
        @RequestHeader("Authorization") String authorizationHeader
    ) throws IOException {
        System.out.println("autho header" + authorizationHeader);
        System.out.println("received file name" + file.getOriginalFilename());
        System.out.println("received  file sizer" + file.getSize());
        String token = authorizationHeader.startsWith("Bearer ")
        ? authorizationHeader.substring(7)
        : authorizationHeader;

        String userId = jwtUtil.extractUserId(token);
        // Letter 객체 생성
        Letter letter = new Letter();
        letter.setUserId(userId);
        letter.setContent(new String(file.getBytes())); // 바이너리로 저장
        letter.setAddedAt(LocalDateTime.now());
        letterService.saveLetter(letter);
        return ResponseEntity.ok("파일 저장 성공");
    }
}
