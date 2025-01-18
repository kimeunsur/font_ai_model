package com.example.npds.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.npds.service.LetterService;
import com.example.npds.entity.Letter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/letter")
public class LetterController {
    @Autowired
    private LetterService letterService;

    @GetMapping("/user/{userId}")
    public List<Letter> getLetterByUserId(@PathVariable Long userId) {
        return letterService.getLetterByUserId(userId);
    }
 
    @PostMapping("post")
    public Letter createLetter(@RequestBody Letter letter) {        
        return letterService.saveLetter(letter);
    }
    
}
