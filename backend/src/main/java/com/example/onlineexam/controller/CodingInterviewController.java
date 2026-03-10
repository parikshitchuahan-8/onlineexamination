package com.example.onlineexam.controller;

import com.example.onlineexam.service.CodingInterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/coding")
@RequiredArgsConstructor
public class CodingInterviewController {

    private final CodingInterviewService service;

    @GetMapping("/question")
    public String question(@RequestParam String topic) {
        return service.generateCodingQuestion(topic);
    }

    @PostMapping("/evaluate")
    public String evaluate(@RequestBody Map<String,String> req) {

        return service.evaluateCode(
                req.get("question"),
                req.get("code")
        );
    }
}