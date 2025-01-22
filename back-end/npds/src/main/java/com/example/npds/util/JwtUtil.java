package com.example.npds.util;

import io.jsonwebtoken.*;

import org.springframework.beans.factory.annotation.Value;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    @Value("${jwt.secret-key}")
    private String SECRET_KEY;

    // JWT 생성
    public String generateToken(String userId, String name) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("name", name) // name 필드 추가
                .setIssuedAt(new Date()) 
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 만료 시간: 1일 (밀리초 단위)
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // HMAC SHA-256 서명 알고리즘 사용
                .compact(); // JWT 생성
    }

    // JWT에서 사용자 ID 추출
    public String extractUserId(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY) // 서명 키를 사용해 토큰 파싱
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject(); // 사용자 ID 추출
    }

    // JWT 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true; 
        } catch (JwtException | IllegalArgumentException e) {
            return false; 
        }
    }
}