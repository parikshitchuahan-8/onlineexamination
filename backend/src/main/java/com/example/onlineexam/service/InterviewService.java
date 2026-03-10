package com.example.onlineexam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final ChatClient chatClient;

    public String generateQuestion(String topic){

        return chatClient
                .prompt()
                .user("""
Generate a technical interview question about %s
Difficulty: medium
""".formatted(topic))
                .call()
                .content();
    }

    public String evaluateAnswer(String question, String answer){

        return chatClient
                .prompt()
                .user("""
You are a technical interviewer.

Question:
%s

Candidate Answer:
%s

Evaluate and return:

Score (0-10)
Strengths
Weakness
Improvement tips
""".formatted(question, answer))
                .call()
                .content();
    }
}
