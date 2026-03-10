package com.example.onlineexam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CodingInterviewService {

    private final ChatClient chatClient;

    public String generateCodingQuestion(String topic) {

        return chatClient
                .prompt()
                .user("""
Generate a coding interview question about %s.
Difficulty: medium.
Provide only the problem statement.
""".formatted(topic))
                .call()
                .content();
    }

    public String evaluateCode(String question, String code) {

        return chatClient
                .prompt()
                .user("""
You are a senior software engineer.

Coding Question:
%s

Candidate Code:
%s

Evaluate the solution.

Return:

Score (0-10)
Strengths
Weakness
Optimization suggestions
Time Complexity
""".formatted(question, code))
                .call()
                .content();
    }
}