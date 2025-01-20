package com.example.npds.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.npds.service.AnswerService;
import java.util.List;
import com.example.npds.dto.QuestionDto;


@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping
    public List<String> generateAnswers(@RequestBody QuestionDto questionDto) {
        return answerService.generateAnswers(questionDto.getQuestion());
    }
}