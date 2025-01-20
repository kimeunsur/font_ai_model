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

    
    private final WebClient webClient;

    public GptApiClient(WebClient webClient) {
        this.webClient = webClient;
    }

    
    public List<String> getAnswers(String question) {
        if (question == null || question.trim().isEmpty()) {
            question = "Please provide a valid question.";  // 기본 질문
        }

        try {
            List<GptRequest.Message> messages = List.of(
                new GptRequest.Message("system", "You are a helpful assistant."),
                new GptRequest.Message("user", "Generate 3 responses for the following question: " + question)
            );
            
            
            GptRequest request = new GptRequest(
                "gpt-3.5-turbo",
                messages,
                150,
                0.7
            );
            // API 호출
            ObjectMapper mapper = new ObjectMapper();
            try {
                String requestJson = mapper.writeValueAsString(request);
                System.out.println("Request 제발 되라 JSON: " + requestJson);
            } catch (Exception e) {
                System.err.println("Error serializing request: " + e.getMessage());
            }
            
            GptResponse response = webClient.post()
                    .bodyValue(request)
                    .retrieve()
                    .onStatus(
                        status -> status.is4xxClientError(),
                        clientResponse -> {
                            return clientResponse.bodyToMono(String.class)
                                .flatMap(errorBody -> {
                                    System.err.println("Error response body: " + errorBody);
                                    return Mono.error(new RuntimeException("GPT API returned an error: " + errorBody));
                                });
                        }
                    )                    
                    .onStatus(
                        status -> status.is5xxServerError(),
                        clientResponse -> Mono.error(new RuntimeException("5xx Server Error"))
                    )
                    .bodyToMono(GptResponse.class)
                    .doOnNext(resp -> {
                        System.out.println("GPT API Response: " + resp);
                    })
                    .block();
            // 응답 파싱
            if (response != null && response.getChoices() != null) {
                return response.getChoices().stream()
                        .map(choice -> choice.getMessage().getContent())
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