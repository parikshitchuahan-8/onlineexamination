package com.example.onlineexam.dto;
import lombok.Data;
import java.util.List;
// A DTO to send questions to the client without the correct answer
@Data public class QuestionDto {
    private Long id;
    private String text;
    private List<String> options;
}