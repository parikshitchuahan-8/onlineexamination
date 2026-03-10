package com.example.onlineexam.controller;

import com.example.onlineexam.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    @GetMapping("/question")
    public String question(@RequestParam String topic){
        return interviewService.generateQuestion(topic);
    }

    @PostMapping("/evaluate")
    public String evaluate(@RequestBody Map<String,String> req){

        return interviewService.evaluateAnswer(
                req.get("question"),
                req.get("answer")
        );
    }
}