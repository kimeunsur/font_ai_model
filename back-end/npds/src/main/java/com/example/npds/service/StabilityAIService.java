package com.example.npds.service;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.springframework.beans.factory.annotation.Value;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class StabilityAIService {

    private static final Logger logger = LoggerFactory.getLogger(StabilityAIService.class);

    @Value("${stabilityai.api.url}")
    private String API_URL;
    @Value("${stabilityai.api.key}")
    private String API_KEY;

    public List<byte[]> generateImages(String prompt, int width, int height, int samples, int steps) throws Exception {
        List<byte[]> imageList = new ArrayList<>();
    
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            for (int i = 0; i < samples; i++) { // 요청 반복
                HttpPost post = new HttpPost(API_URL);
    
                // 헤더 설정
                post.setHeader("Authorization", "Bearer " + API_KEY);
    
                // 요청 본문 설정
                MultipartEntityBuilder builder = MultipartEntityBuilder.create();
                builder.addTextBody("prompt", prompt, ContentType.TEXT_PLAIN);
                builder.addTextBody("width", String.valueOf(width), ContentType.TEXT_PLAIN);
                builder.addTextBody("height", String.valueOf(height), ContentType.TEXT_PLAIN);
                builder.addTextBody("steps", String.valueOf(steps), ContentType.TEXT_PLAIN);
                post.setEntity(builder.build());
    
                // API 호출
                try (CloseableHttpResponse response = client.execute(post)) {
                    int statusCode = response.getStatusLine().getStatusCode();
    
                    if (statusCode != 200) {
                        throw new Exception("API 호출 실패: HTTP " + statusCode + ", " + response.getStatusLine().getReasonPhrase());
                    }
    
                    try (InputStream is = response.getEntity().getContent();
                         ByteArrayOutputStream buffer = new ByteArrayOutputStream()) {
                        byte[] data = new byte[1024];
                        int nRead;
    
                        while ((nRead = is.read(data, 0, data.length)) != -1) {
                            buffer.write(data, 0, nRead);
                        }
    
                        logger.info("API 응답 데이터 크기: {}", buffer.size()); // 디버깅용 로그
                        imageList.add(buffer.toByteArray()); // 데이터 추가
                    }
                }
            }
    
            logger.info("최종 리스트 크기: {}", imageList.size()); // 디버깅용 로그
        } catch (Exception e) {
            logger.error("이미지 생성 중 오류 발생", e);
            throw e;
        }
    
        if (imageList.size() < samples) {
            throw new Exception("요청된 sample 개수보다 적은 이미지가 생성되었습니다.");
        }
    
        return imageList;
    }
}