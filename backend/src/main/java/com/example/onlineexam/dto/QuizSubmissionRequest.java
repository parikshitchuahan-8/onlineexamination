package com.example.onlineexam.dto;
import lombok.Data;
import java.util.Map;
@Data public class QuizSubmissionRequest { private Map<Long, Integer> answers; } // Map<QuestionID, SelectedOptionIndex>
