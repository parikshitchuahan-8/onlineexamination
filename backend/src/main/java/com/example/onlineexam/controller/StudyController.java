package com.example.onlineexam.controller;

import com.example.onlineexam.service.StudyAssistantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/study")
@RequiredArgsConstructor
public class StudyController {

    private final StudyAssistantService service;

    @PostMapping("/ask")
    public String ask(@RequestBody Map<String, String> req) {

        return service.askQuestion(req.get("question"));
    }
}