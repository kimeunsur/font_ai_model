package com.example.npds.service;


import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Service;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.springframework.beans.factory.annotation.Value;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class StabilityAIService {

    @Value("${stabilityai.api.url}")
    private String API_URL;
    @Value("${stabilityai.api.key}")
    private String API_KEY;


    public byte[] generateImage(String prompt, int width, int height, int samples, int steps) throws Exception {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            HttpPost post = new HttpPost(API_URL);

            // 헤더 설정            
            post.setHeader("Authorization", "Bearer " + API_KEY);

            // 요청 본문 설정 (multipart/form-data)
            MultipartEntityBuilder builder = MultipartEntityBuilder.create();
            builder.addTextBody("prompt", prompt, ContentType.TEXT_PLAIN); // 프롬프트 추가
            builder.addTextBody("width", String.valueOf(width), ContentType.TEXT_PLAIN);   // 이미지 폭
            builder.addTextBody("height", String.valueOf(height), ContentType.TEXT_PLAIN); // 이미지 높이
            builder.addTextBody("samples", String.valueOf(samples), ContentType.TEXT_PLAIN);  // 생성 샘플 수
            builder.addTextBody("steps", String.valueOf(steps), ContentType.TEXT_PLAIN);   // 디퓨전 단계 수
            post.setEntity(builder.build());

            // API 호출
            try (CloseableHttpResponse response = client.execute(post)) {
                int statusCode = response.getStatusLine().getStatusCode();

                // 오류 처리
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
                        return buffer.toByteArray();
                    }
            }
        }
    }
}