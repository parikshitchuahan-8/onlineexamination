package com.example.onlineexam.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyAssistantService {

    private final ChatClient chatClient;

    public String askQuestion(String question) {

        return chatClient
                .prompt()
                .user("""
You are a programming tutor.

Explain clearly and simply.

Question:
%s
""".formatted(question))
                .call()
                .content();
    }
}