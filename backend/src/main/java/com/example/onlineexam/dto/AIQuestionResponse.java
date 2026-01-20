package com.example.onlineexam.dto;

import lombok.Data;

import java.util.List;

@Data
public class AIQuestionResponse {
    private String question;
    private List<String> options;
    private int correctAnswerIndex;
}
