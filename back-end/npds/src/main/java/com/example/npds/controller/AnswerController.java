package com.example.npds.controller;

import org.springframework.web.bind.annotation.*;
import com.example.npds.service.AnswerService;
import com.example.npds.dto.QuestionDto;
import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping
    public List<String> generateAnswers(@RequestBody QuestionDto questionDto) {
        // questionDto에서 question 추출 후 AnswerService로 전달
        return answerService.generateAnswers(questionDto.getQuestion());
    }
}
