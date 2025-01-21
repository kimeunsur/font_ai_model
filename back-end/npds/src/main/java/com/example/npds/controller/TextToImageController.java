package com.example.npds.controller;

import com.example.npds.service.StabilityAIService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/text-to-image")
public class TextToImageController {

    private static final Logger logger = LoggerFactory.getLogger(TextToImageController.class);
    private final StabilityAIService stabilityAIService;

    public TextToImageController(StabilityAIService stabilityAIService) {
        this.stabilityAIService = stabilityAIService;
    }

    @PostMapping(consumes = "multipart/form-data", produces = "application/json")
    public ResponseEntity<Map<String, String>> generateImage(
            @RequestParam(value = "prompt", required = false, defaultValue = "puppy") String prompt,
            @RequestParam(value = "width", required = false, defaultValue = "512") int width,
            @RequestParam(value = "height", required = false, defaultValue = "512") int height,
            @RequestParam(value = "samples", required = false, defaultValue = "3") int samples,
            @RequestParam(value = "steps", required = false, defaultValue = "50") int steps) {
        try {
            logger.info("요청 파라미터: prompt={}, width={}, height={}, samples={}, steps={}", prompt, width, height, samples, steps);
    
            List<byte[]> imageDataList = stabilityAIService.generateImages(prompt, width, height, samples, steps);
    
            if (imageDataList.size() < samples) {
                throw new Exception("생성된 이미지 개수가 요청한 sample 개수보다 적습니다.");
            }
    
            Map<String, String> images = new HashMap<>();
            for (int i = 0; i < imageDataList.size(); i++) {
                String base64Image = "data:image/png;base64," + Base64.getEncoder().encodeToString(imageDataList.get(i));
                logger.info("Base64 이미지 {} (샘플): {}", i, base64Image.substring(0, 100)); // 디버깅용 로그
                images.put("image_" + i, base64Image);
            }
    
            return ResponseEntity.ok(images);
    
        } catch (Exception e) {
            logger.error("이미지 생성 중 오류 발생: ", e);
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "서버 오류 발생: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}