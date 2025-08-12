package com.example.onlineexam.service;

import com.example.onlineexam.dto.QuizSubmissionRequest;
import com.example.onlineexam.model.Question;
import com.example.onlineexam.model.Quiz;
import com.example.onlineexam.model.Result;
import com.example.onlineexam.model.User;
import com.example.onlineexam.repository.QuestionRepository;
import com.example.onlineexam.repository.QuizRepository;
import com.example.onlineexam.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuestionRepository questionRepository;
    private final ResultRepository resultRepository;
    private final QuizRepository quizRepository;

    public Result calculateResult(User user, Long quizId, QuizSubmissionRequest submission) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        Map<Long, Integer> answers = submission.getAnswers();
        int score = 0;

        for (Map.Entry<Long, Integer> entry : answers.entrySet()) {
            Question question = questionRepository.findById(entry.getKey()).orElse(null);
            if (question != null && question.getCorrectAnswerIndex() == entry.getValue()) {
                score++;
            }
        }

        Result result = new Result();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setScore(score);
        result.setTotalQuestions(quiz.getQuestions().size());
        result.setSubmissionTime(LocalDateTime.now());

        return resultRepository.save(result);
    }
}
