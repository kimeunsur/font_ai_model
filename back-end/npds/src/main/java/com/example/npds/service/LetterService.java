package com.example.npds.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.npds.repository.LetterRepository;
import com.example.npds.entity.Letter;

@Service
public class LetterService {
    @Autowired
    private LetterRepository letterRepository;

    public List<Letter> getLetterByUserId(String userId) {
        return letterRepository.findByUserId(userId);
    }

    public Letter saveLetter(Letter letter) {
        return letterRepository.save(letter);
    }
}
