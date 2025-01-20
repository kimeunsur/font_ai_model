package com.example.npds.config;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    Dotenv dotenv = Dotenv.configure()
    .directory("./.env") // .env 파일이 위치한 경로
    .load();
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + Dotenv.load().get("GPT_API_KEY"))
                .defaultHeader("Content-Type", "application/json")
                .build();
        
    }
    
}