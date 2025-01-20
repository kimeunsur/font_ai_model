package com.example.npds.client;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import com.example.npds.dto.GptRequest;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import com.example.npds.dto.GptResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.npds.dto.GptChoice;
import reactor.core.publisher.Mono;
import java.util.stream.Stream;
import io.github.cdimascio.dotenv.Dotenv;




@Component
public class GptApiClient {

    private static final String API_URL = "https://api.openai.com/v1/chat/completions";
    // .env 파일에서 API 키 읽기
    private static final Dotenv dotenv = Dotenv.load();
    private static final String GPT_API_KEY = dotenv.get("GPT_API_KEY");
    private final WebClient webClient;

    public GptApiClient() {
        Dotenv dotenv = Dotenv.load();
        String GPT_API_KEY = dotenv.get("GPT_API_KEY");
        if (GPT_API_KEY == null || GPT_API_KEY.isEmpty()) {
            throw new RuntimeException("GPT_API_KEY가 설정되지 않았습니다.");
        }
        this.webClient = WebClient.builder()
                .baseUrl(API_URL)
                .defaultHeader("Authorization", "Bearer " + GPT_API_KEY)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    
    public List<String> getAnswers(String question) {
        try {
            // 요청 생성
            List<Map<String, String>> messages = List.of(
                Map.of("role", "system", "content", "You are a helpful assistant."),
                Map.of("role", "user", "content", "Generate 3 responses for the following question: " + question)
            );
            
            GptRequest request = new GptRequest(
                "gpt-3.5-turbo",
                messages,
                100,
                0.7
            );
            // API 호출

                    // 요청 JSON 출력
            ObjectMapper mapper = new ObjectMapper();
            String requestJson = mapper.writeValueAsString(request);
            System.out.println("Request JSON: " + requestJson);

            GptResponse response = webClient.post()
                    .bodyValue(request)
                    .retrieve()
                    .onStatus(
                        status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> {
                            System.err.println("Error Status Code: " + clientResponse.statusCode());
                            return Mono.error(new RuntimeException("GPT API returned an error."));
                        }
                    )
                    .bodyToMono(GptResponse.class)
                    .block();
            // 응답 파싱
            if (response != null && response.getChoices() != null) {
                return response.getChoices().stream()
                        .map(GptChoice::getText)
                        .collect(Collectors.toList());
            }
        } catch (Exception e) {
            System.err.println("Error during GPT API call: " + e.getMessage());
        }
                // 실패 시 기본 응답
        return Stream.of("Unable to generate answers. Please try again later.")
                .collect(Collectors.toList());
    }
}