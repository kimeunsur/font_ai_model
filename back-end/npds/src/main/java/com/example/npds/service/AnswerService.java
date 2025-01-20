package com.example.npds.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.npds.client.GptApiClient;

@Service
public class AnswerService {

    private final GptApiClient gptApiClient;

    public AnswerService(GptApiClient gptApiClient) {
        this.gptApiClient = gptApiClient;
    }

    public List<String> generateAnswers(String question) {
        return gptApiClient.getAnswers(question);
    }
}