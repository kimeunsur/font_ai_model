package com.example.npds;

import com.example.npds.client.GptApiClient;
import com.example.npds.config.WebClientConfig;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        // WebClientConfig를 통해 WebClient 인스턴스를 생성하고 GptApiClient에 전달
        GptApiClient client = new GptApiClient(new WebClientConfig().webClient());
        
        // 질문을 넘겨주고 응답을 가져옴
        List<String> responses = client.getAnswers("What are the benefits of AI in healthcare?");
        
        // 응답 출력
        responses.forEach(System.out::println);
    }
}
