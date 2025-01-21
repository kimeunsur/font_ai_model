package com.example.npds.controller;


import com.example.npds.service.StabilityAIService;

import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.http.HttpHeaders;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/text-to-image")
public class TextToImageController {

    private final StabilityAIService stabilityAIService;

    public TextToImageController(StabilityAIService stabilityAIService) {
        this.stabilityAIService = stabilityAIService;
    }

    @PostMapping(consumes = "multipart/form-data", produces = "image/png")
    public ResponseEntity<byte[]> generateImage(
            @RequestParam("prompt") String prompt,
            @RequestParam(value = "width", required = false, defaultValue = "512") int width,
            @RequestParam(value = "height", required = false, defaultValue = "512") int height,
            @RequestParam(value = "samples", required = false, defaultValue = "1") int samples,
            @RequestParam(value = "steps", required = false, defaultValue = "50") int steps) {
        try {
            System.out.println("요청 파라미터: prompt=" + prompt + ", width=" + width + ", height=" + height + ", samples=" + samples + ", steps=" + steps);
            byte[] imageData = stabilityAIService.generateImage(prompt, width, height, samples, steps);

            return ResponseEntity.ok()
                    .header("Content-Type", "image/png")
                    .body(imageData);

                } catch (Exception e) {
                    e.printStackTrace();
                    return ResponseEntity.status(500).body(null);
        }
    }
}